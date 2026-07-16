import React, { useState } from 'react';
import {
  useGetRecruiters,
  useCreateRecruiter,
  useUpdateRecruiter,
  useDeleteRecruiter,
} from '../api/useRecruiters';
import { useGetCompanies } from '../../companies/api/useCompanies';
import { RecruiterFilters } from './RecruiterFilters';
import { RecruiterTable } from './RecruiterTable';
import { RecruiterForm } from './RecruiterForm';
import { RecruiterDeleteDialog } from './RecruiterDeleteDialog';
import { RecruiterDetailsDrawer } from './RecruiterDetailsDrawer';
import { EmptyState } from '../../../components/ui/EmptyState';
import { PageHeader } from '../../../components/ui/PageHeader';
import { Button } from '../../../components/ui/button';
import { Skeleton } from '../../../components/ui/skeleton';
import { Users, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

export const RecruiterList = () => {
  // Query state
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    companyId: '',
    department: '',
    isPrimaryContact: '',
  });

  // Modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [recruiterToDelete, setRecruiterToDelete] = useState(null);

  // Queries
  const { data: response, isLoading, isError } = useGetRecruiters({
    page,
    limit: 10,
    search,
    ...filters,
  });

  const { data: companiesResponse } = useGetCompanies({ limit: 100 });
  const companiesList = companiesResponse?.data || [];

  // Mutations
  const createMutation = useCreateRecruiter();
  const updateMutation = useUpdateRecruiter();
  const deleteMutation = useDeleteRecruiter();

  const recruiters = response?.data || [];
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

  const handleOpenForm = (rec = null) => {
    setSelectedRecruiter(rec);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedRecruiter(null);
  };

  const handleFormSubmit = async (data) => {
    if (selectedRecruiter) {
      await updateMutation.mutateAsync({ id: selectedRecruiter.id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
    handleCloseForm();
  };

  const handleViewRecruiter = (rec) => {
    setSelectedRecruiter(rec);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedRecruiter(null);
  };

  const handleOpenDelete = (rec) => {
    setRecruiterToDelete(rec);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDelete = () => {
    setIsDeleteDialogOpen(false);
    setRecruiterToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (recruiterToDelete) {
      await deleteMutation.mutateAsync(recruiterToDelete.id);
      if (recruiters.length === 1 && page > 1) {
        setPage(page - 1);
      }
      handleCloseDelete();
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Recruiters"
        description="Manage your recruiter network and professional contacts."
      >
        <Button onClick={() => handleOpenForm()}>
          <Plus className="mr-2 h-4 w-4" /> Add Recruiter
        </Button>
      </PageHeader>

      <RecruiterFilters
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
        <div className="p-4 bg-red-50 text-red-700 rounded-md">Error loading recruiters. Please try again.</div>
      ) : recruiters.length === 0 ? (
        <EmptyState
          icon={Users}
          title={search || Object.values(filters).some(Boolean) ? 'No matching recruiters' : 'No recruiters found'}
          description={
            search || Object.values(filters).some(Boolean)
              ? 'Try adjusting your search or filters.'
              : 'Start building your recruiter network by adding your first contact.'
          }
          action={
            <Button onClick={() => handleOpenForm()}>
              <Plus className="mr-2 h-4 w-4" /> Add First Recruiter
            </Button>
          }
        />
      ) : (
        <>
          <RecruiterTable
            recruiters={recruiters}
            onEdit={handleOpenForm}
            onDelete={handleOpenDelete}
            onView={handleViewRecruiter}
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
      <RecruiterForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        initialData={selectedRecruiter}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        companies={companiesList}
      />

      <RecruiterDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        recruiter={selectedRecruiter}
      />

      <RecruiterDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        recruiterName={recruiterToDelete?.name}
        companyName={recruiterToDelete?.company?.companyName}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
};
