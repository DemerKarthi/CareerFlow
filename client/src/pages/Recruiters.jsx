import React from 'react';
import { PageContainer } from '../components/ui/PageContainer';
import { PageHeader } from '../components/ui/PageHeader';
import { EmptyState } from '../components/ui/EmptyState';
import { Users } from 'lucide-react';

const Recruiters = () => {
  return (
    <PageContainer>
      <PageHeader 
        title="Recruiters" 
        description="Manage your professional network and recruiter contacts."
      />
      <div className="mt-8">
        <EmptyState 
          icon={Users}
          title="No recruiters found"
          description="Start building your network by adding recruiter contacts."
        />
      </div>
    </PageContainer>
  );
};

export default Recruiters;
