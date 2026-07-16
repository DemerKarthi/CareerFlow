import React from 'react';
import { PageContainer } from '../components/ui/PageContainer';
import { PageHeader } from '../components/ui/PageHeader';
import { EmptyState } from '../components/ui/EmptyState';
import { Briefcase } from 'lucide-react';

const Applications = () => {
  return (
    <PageContainer>
      <PageHeader 
        title="Applications" 
        description="Track and manage all your job applications in one place."
      />
      <div className="mt-8">
        <EmptyState 
          icon={Briefcase}
          title="No applications found"
          description="You haven't added any job applications yet."
        />
      </div>
    </PageContainer>
  );
};

export default Applications;
