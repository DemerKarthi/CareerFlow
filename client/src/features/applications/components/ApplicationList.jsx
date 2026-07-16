import React, { useState } from 'react';
import {
  useGetApplications,
  useCreateApplication,
  useUpdateApplication,
  useDeleteApplication
} from '../api/useApplications';
import { useGetCompanies } from '../../companies/api/useCompanies';
import { ApplicationFilters } from './ApplicationFilters';
import { ApplicationTable } from './ApplicationTable';
import { ApplicationForm } from './ApplicationForm';
import { ApplicationDeleteDialog } from './ApplicationDeleteDialog';
import { ApplicationDetailsDrawer } from './ApplicationDetailsDrawer';
import { EmptyState } from '../../../components/ui/EmptyState';
import { PageHeader } from '../../../components/ui/PageHeader';
import { Button } from '../../../components/ui/button';
import { Skeleton } from '../../../components/ui/skeleton';
import { Briefcase, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

export const ApplicationList = () => {
  // State for querying
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    companyId: '',
    stage: '',
    status: '',
    priority: '',
    platform: '',
  });

  // State for Modals/Drawers
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [selectedApplication, setSelectedApplication] = useState(null); // For Edit and View
  const [applicationToDelete, setApplicationToDelete] = useState(null);

  // Queries
  const { data: response, isLoading, isError } = useGetApplications({
    page,
    limit: 10,
    search,
    ...filters
  });

  // Fetch companies for dropdowns (limit 1000 to get all for dropdown, or rely on search)
  // We'll pass a large limit to get a flat list of companies for the dropdowns
  const { data: companiesResponse } = useGetCompanies({ limit: 100 });
  const companiesList = companiesResponse?.data || [];

  // Mutations
  const createMutation = useCreateApplication();
  const updateMutation = useUpdateApplication();
  const deleteMutation = useDeleteApplication();

  const applications = response?.data || [];
  const pagination = response?.pagination || { page: 1, totalPages: 1 };

  // Handlers
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1); // Reset to first page on filter change
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  // Form Handlers
  const handleOpenForm = (app = null) => {
    setSelectedApplication(app);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedApplication(null);
  };

  const handleFormSubmit = async (data) => {
    console.log("HandleFormSubmit in apllist: ", data);
    if (selectedApplication) {
      await updateMutation.mutateAsync({ id: selectedApplication.id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
    handleCloseForm();
  };

  // Drawer Handlers
  const handleViewApplication = (app) => {
    setSelectedApplication(app);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedApplication(null);
  };

  // Delete Handlers
  const handleOpenDelete = (app) => {
    setApplicationToDelete(app);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDelete = () => {
    setIsDeleteDialogOpen(false);
    setApplicationToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (applicationToDelete) {
      await deleteMutation.mutateAsync(applicationToDelete.id);
      if (applications.length === 1 && page > 1) {
        setPage(page - 1);
      }
      handleCloseDelete();
    }
  };

  // Rendering
  return (
    <div className="space-y-6">
      <PageHeader
        title="Applications"
        description="Track your job applications and hiring pipeline."
      >
        <Button onClick={() => handleOpenForm()}>
          <Plus className="mr-2 h-4 w-4" /> Add Application
        </Button>
      </PageHeader>

      <ApplicationFilters
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
        <div className="p-4 bg-red-50 text-red-700 rounded-md">Error loading applications. Please try again.</div>
      ) : applications.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title={search || Object.values(filters).some(Boolean) ? "No matching applications" : "No applications found"}
          description={search || Object.values(filters).some(Boolean)
            ? "Try adjusting your search or filters."
            : "You haven't added any job applications yet. Start tracking your progress!"}
          action={
            <Button onClick={() => handleOpenForm()}>
              <Plus className="mr-2 h-4 w-4" /> Add First Application
            </Button>
          }
        />
      ) : (
        <>
          <ApplicationTable
            applications={applications}
            onEdit={handleOpenForm}
            onDelete={handleOpenDelete}
            onView={handleViewApplication}
          />

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 sm:px-6 rounded-lg mt-4 shadow-sm">
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    Showing page <span className="font-medium">{pagination.page}</span> of <span className="font-medium">{pagination.totalPages}</span>
                  </p>
                </div>
                <div>
                  <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <Button
                      variant="outline"
                      className="rounded-l-md rounded-r-none px-2"
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-r-md rounded-l-none px-2"
                      onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                      disabled={page === pagination.totalPages}
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </nav>
                </div>
              </div>

              {/* Mobile pagination simplified */}
              <div className="flex flex-1 justify-between sm:hidden">
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
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
      <ApplicationForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        initialData={selectedApplication}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        companies={companiesList}
      />

      <ApplicationDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        application={selectedApplication}
      />

      <ApplicationDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        jobTitle={applicationToDelete?.jobTitle}
        companyName={applicationToDelete?.company?.companyName}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
};
