import React from 'react';
import { PageContainer } from '../components/ui/PageContainer';
import { PageHeader } from '../components/ui/PageHeader';
import { EmptyState } from '../components/ui/EmptyState';
import { FileText } from 'lucide-react';

const Resumes = () => {
  return (
    <PageContainer>
      <PageHeader 
        title="Resumes" 
        description="Manage your tailored resumes and cover letters."
      />
      <div className="mt-8">
        <EmptyState 
          icon={FileText}
          title="No resumes uploaded"
          description="Upload or create a resume to start managing different versions."
        />
      </div>
    </PageContainer>
  );
};

export default Resumes;
