import React, { useState } from 'react';
import { useGetCompanies, useCreateCompany, useUpdateCompany, useDeleteCompany } from '../api/useCompanies';
import { CompanyFilters } from './CompanyFilters';
import { CompanyTable } from './CompanyTable';
import { CompanyForm } from './CompanyForm';
import { CompanyDeleteDialog } from './CompanyDeleteDialog';
import { EmptyState } from '../../../components/ui/EmptyState';
import { PageHeader } from '../../../components/ui/PageHeader';
import { Button } from '../../../components/ui/button';
import { Skeleton } from '../../../components/ui/skeleton';
import { Building2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

export const CompanyList = () => {
  // State for querying
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    workMode: '',
  });

  // State for modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);

  // Queries and Mutations
  const { data: response, isLoading, isError } = useGetCompanies({
    page,
    limit: 10,
    search,
    ...filters
  });
  
  const createMutation = useCreateCompany();
  const updateMutation = useUpdateCompany();
  const deleteMutation = useDeleteCompany();

  const companies = response?.data || [];
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

  const handleOpenForm = (company = null) => {
    setEditingCompany(company);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingCompany(null);
  };

  const handleFormSubmit = async (data) => {
    if (editingCompany) {
      await updateMutation.mutateAsync({ id: editingCompany.id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
    handleCloseForm();
  };

  const handleOpenDelete = (company) => {
    setCompanyToDelete(company);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDelete = () => {
    setIsDeleteDialogOpen(false);
    setCompanyToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (companyToDelete) {
      await deleteMutation.mutateAsync(companyToDelete.id);
      // If we deleted the last item on a page > 1, go back a page
      if (companies.length === 1 && page > 1) {
        setPage(page - 1);
      }
      handleCloseDelete();
    }
  };

  // Rendering
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Companies" 
        description="Manage your target companies and networking efforts."
      >
        <Button onClick={() => handleOpenForm()}>
          <Plus className="mr-2 h-4 w-4" /> Add Company
        </Button>
      </PageHeader>

      <CompanyFilters 
        filters={filters} 
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
      />

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      ) : isError ? (
        <div className="p-4 bg-red-50 text-red-700 rounded-md">Error loading companies. Please try again.</div>
      ) : companies.length === 0 ? (
        <EmptyState 
          icon={Building2}
          title={search || Object.values(filters).some(Boolean) ? "No matching companies" : "No companies added"}
          description={search || Object.values(filters).some(Boolean) 
            ? "Try adjusting your search or filters." 
            : "You haven't added any target companies yet. Start building your list!"}
          action={
            <Button onClick={() => handleOpenForm()}>
              <Plus className="mr-2 h-4 w-4" /> Add First Company
            </Button>
          }
        />
      ) : (
        <>
          <CompanyTable 
            companies={companies} 
            onEdit={handleOpenForm}
            onDelete={handleOpenDelete}
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

      {/* Dialogs */}
      <CompanyForm 
        isOpen={isFormOpen} 
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        initialData={editingCompany}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />

      <CompanyDeleteDialog 
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        companyName={companyToDelete?.companyName}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
};
