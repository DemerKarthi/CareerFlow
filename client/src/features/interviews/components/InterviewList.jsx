import React, { useState } from 'react';
import {
  useGetInterviews,
  useCreateInterview,
  useUpdateInterview,
  useDeleteInterview,
} from '../api/useInterviews';
import { useGetApplications } from '../../applications/api/useApplications';
import { useGetRecruiters } from '../../recruiters/api/useRecruiters';
import { useGetCompanies } from '../../companies/api/useCompanies';

import { InterviewFilters } from './InterviewFilters';
import { InterviewTable } from './InterviewTable';
import { InterviewForm } from './InterviewForm';
import { InterviewDeleteDialog } from './InterviewDeleteDialog';
import { InterviewDetailsDrawer } from './InterviewDetailsDrawer';
import { EmptyState } from '../../../components/ui/EmptyState';
import { PageHeader } from '../../../components/ui/PageHeader';
import { Button } from '../../../components/ui/button';
import { Skeleton } from '../../../components/ui/skeleton';
import { MessageSquare, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

export const InterviewList = () => {
  // Query state
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    result: '',
    interviewType: '',
    companyId: '',
  });

  // Modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [interviewToDelete, setInterviewToDelete] = useState(null);

  // Queries
  const { data: response, isLoading, isError } = useGetInterviews({
    page,
    limit: 10,
    search,
    ...filters,
  });

  // Fetch dropdown data
  const { data: companiesResponse } = useGetCompanies({ limit: 100 });
  const companiesList = companiesResponse?.data || [];

  const { data: applicationsResponse } = useGetApplications({ limit: 100 });
  const applicationsList = applicationsResponse?.data || [];

  const { data: recruitersResponse } = useGetRecruiters({ limit: 100 });
  const recruitersList = recruitersResponse?.data || [];

  // Mutations
  const createMutation = useCreateInterview();
  const updateMutation = useUpdateInterview();
  const deleteMutation = useDeleteInterview();

  const interviews = response?.data || [];
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

  const handleOpenForm = (intv = null) => {
    setSelectedInterview(intv);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedInterview(null);
  };

  const handleFormSubmit = async (data) => {
    if (selectedInterview) {
      await updateMutation.mutateAsync({ id: selectedInterview.id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
    handleCloseForm();
  };

  const handleViewInterview = (intv) => {
    setSelectedInterview(intv);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedInterview(null);
  };

  const handleOpenDelete = (intv) => {
    setInterviewToDelete(intv);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDelete = () => {
    setIsDeleteDialogOpen(false);
    setInterviewToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (interviewToDelete) {
      await deleteMutation.mutateAsync(interviewToDelete.id);
      if (interviews.length === 1 && page > 1) {
        setPage(page - 1);
      }
      handleCloseDelete();
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Interviews"
        description="Schedule, manage, and track your job interviews."
      >
        <Button onClick={() => handleOpenForm()}>
          <Plus className="mr-2 h-4 w-4" /> Schedule Interview
        </Button>
      </PageHeader>

      <InterviewFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
        companies={companiesList}
      />

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      ) : isError ? (
        <div className="p-4 bg-red-50 text-red-700 rounded-md">Error loading interviews. Please try again.</div>
      ) : interviews.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title={search || Object.values(filters).some(Boolean) ? 'No matching interviews' : 'No interviews scheduled'}
          description={
            search || Object.values(filters).some(Boolean)
              ? 'Try adjusting your search or filters.'
              : 'You haven\'t scheduled any interviews yet. Start tracking your progress!'
          }
          action={
            <Button onClick={() => handleOpenForm()}>
              <Plus className="mr-2 h-4 w-4" /> Schedule First Interview
            </Button>
          }
        />
      ) : (
        <>
          <InterviewTable
            interviews={interviews}
            onEdit={handleOpenForm}
            onDelete={handleOpenDelete}
            onView={handleViewInterview}
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
      )}

      {/* Modals & Drawers */}
      <InterviewForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        initialData={selectedInterview}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        applications={applicationsList}
        recruiters={recruitersList}
      />

      <InterviewDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        interview={selectedInterview}
      />

      <InterviewDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        roundName={interviewToDelete?.roundName}
        companyName={interviewToDelete?.application?.company?.companyName}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
};
