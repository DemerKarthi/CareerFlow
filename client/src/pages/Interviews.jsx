import React from 'react';
import { PageContainer } from '../components/ui/PageContainer';
import { PageHeader } from '../components/ui/PageHeader';
import { EmptyState } from '../components/ui/EmptyState';
import { MessageSquare } from 'lucide-react';

const Interviews = () => {
  return (
    <PageContainer>
      <PageHeader 
        title="Interviews" 
        description="Prepare for and track your upcoming job interviews."
      />
      <div className="mt-8">
        <EmptyState 
          icon={MessageSquare}
          title="No interviews scheduled"
          description="You don't have any upcoming interviews scheduled."
        />
      </div>
    </PageContainer>
  );
};

export default Interviews;
