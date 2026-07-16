import React, { useState } from 'react';
import {
  useGetTasks,
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
  useToggleTaskCompletion,
} from '../api/useTasks';
import { useGetApplications } from '../../applications/api/useApplications';
import { useGetInterviews } from '../../interviews/api/useInterviews';

import { TaskFilters } from './TaskFilters';
import { TaskTable } from './TaskTable';
import { CalendarView } from './CalendarView';
import { TaskForm } from './TaskForm';
import { TaskDeleteDialog } from './TaskDeleteDialog';
import { TaskDetailsDrawer } from './TaskDetailsDrawer';
import { EmptyState } from '../../../components/ui/EmptyState';
import { PageHeader } from '../../../components/ui/PageHeader';
import { Button } from '../../../components/ui/button';
import { Skeleton } from '../../../components/ui/skeleton';
import { CheckSquare, Plus, ChevronLeft, ChevronRight, LayoutList, Calendar } from 'lucide-react';

export const TaskList = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  
  // Query state
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    taskType: '',
    applicationId: '',
  });

  // Modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Queries
  const { data: response, isLoading, isError } = useGetTasks({
    page: viewMode === 'list' ? page : 1, // Calendar fetches all (or unpaginated max) for simplicity, but let's just use limit 100 for calendar
    limit: viewMode === 'list' ? 10 : 100, 
    search,
    ...filters,
  });

  // Fetch dropdown data
  const { data: applicationsResponse } = useGetApplications({ limit: 100 });
  const applicationsList = applicationsResponse?.data || [];

  const { data: interviewsResponse } = useGetInterviews({ limit: 100 });
  const interviewsList = interviewsResponse?.data || [];

  // Mutations
  const createMutation = useCreateTask();
  const updateMutation = useUpdateTask();
  const deleteMutation = useDeleteTask();
  const toggleMutation = useToggleTaskCompletion();

  const tasks = response?.data || [];
  const pagination = response?.pagination || { page: 1, totalPages: 1 };

  // Handlers
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleOpenForm = (task = null) => {
    setSelectedTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedTask(null);
  };

  const handleFormSubmit = async (data) => {
    if (selectedTask) {
      await updateMutation.mutateAsync({ id: selectedTask.id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
    handleCloseForm();
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedTask(null);
  };

  const handleOpenDelete = (task) => {
    setTaskToDelete(task);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDelete = () => {
    setIsDeleteDialogOpen(false);
    setTaskToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (taskToDelete) {
      await deleteMutation.mutateAsync(taskToDelete.id);
      if (tasks.length === 1 && page > 1) {
        setPage(page - 1);
      }
      handleCloseDelete();
    }
  };

  const handleToggleComplete = (id) => {
    toggleMutation.mutate(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Tasks & Calendar"
          description="Manage action items, follow-ups, and reminders."
        />
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'list' 
                  ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-950 dark:text-white' 
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
              onClick={() => setViewMode('list')}
            >
              <LayoutList className="h-4 w-4" />
              <span className="hidden sm:inline">List</span>
            </button>
            <button
              className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'calendar' 
                  ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-950 dark:text-white' 
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
              onClick={() => setViewMode('calendar')}
            >
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Calendar</span>
            </button>
          </div>
          <Button onClick={() => handleOpenForm()}>
            <Plus className="mr-2 h-4 w-4" /> New Task
          </Button>
        </div>
      </div>

      <TaskFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
        applications={applicationsList}
      />

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      ) : isError ? (
        <div className="p-4 bg-red-50 text-red-700 rounded-md">Error loading tasks. Please try again.</div>
      ) : tasks.length === 0 ? (
        <EmptyState
          icon={CheckSquare}
          title={search || Object.values(filters).some(Boolean) ? 'No matching tasks' : 'No tasks created'}
          description={
            search || Object.values(filters).some(Boolean)
              ? 'Try adjusting your search or filters.'
              : 'You have no action items right now. Add a task to stay organized.'
          }
          action={
            <Button onClick={() => handleOpenForm()}>
              <Plus className="mr-2 h-4 w-4" /> Create First Task
            </Button>
          }
        />
      ) : (
        <>
          {viewMode === 'list' ? (
            <>
              <TaskTable
                tasks={tasks}
                onEdit={handleOpenForm}
                onDelete={handleOpenDelete}
                onView={handleViewTask}
                onToggleComplete={handleToggleComplete}
              />
              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 sm:px-6 rounded-lg mt-4 shadow-sm">
                  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        Showing page <span className="font-medium">{pagination.page}</span> of{' '}
                        <span className="font-medium">{pagination.totalPages}</span>
                      </p>
                    </div>
                    <div>
                      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <Button
                          variant="outline"
                          className="rounded-l-md rounded-r-none px-2"
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          disabled={page === 1}
                        >
                          <span className="sr-only">Previous</span>
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-r-md rounded-l-none px-2"
                          onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                          disabled={page === pagination.totalPages}
                        >
                          <span className="sr-only">Next</span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </nav>
                    </div>
                  </div>

                  <div className="flex flex-1 justify-between sm:hidden">
                    <Button variant="outline" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                      disabled={page === pagination.totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <CalendarView 
              tasks={tasks} 
              onViewTask={handleViewTask} 
              onToggleComplete={handleToggleComplete}
            />
          )}
        </>
      )}

      {/* Modals & Drawers */}
      <TaskForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        initialData={selectedTask}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        applications={applicationsList}
        interviews={interviewsList}
      />

      <TaskDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        task={selectedTask}
      />

      <TaskDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        taskTitle={taskToDelete?.title}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
};
