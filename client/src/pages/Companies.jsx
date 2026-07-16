import React from 'react';
import { PageContainer } from '../components/ui/PageContainer';
import { PageHeader } from '../components/ui/PageHeader';
import { EmptyState } from '../components/ui/EmptyState';
import { Building2 } from 'lucide-react';

const Companies = () => {
  return (
    <PageContainer>
      <PageHeader 
        title="Companies" 
        description="Keep track of target companies and your interactions with them."
      />
      <div className="mt-8">
        <EmptyState 
          icon={Building2}
          title="No companies added"
          description="You haven't added any target companies yet."
        />
      </div>
    </PageContainer>
  );
};

export default Companies;
