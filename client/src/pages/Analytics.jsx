import React from 'react';
import { PageContainer } from '../components/ui/PageContainer';
import { PageHeader } from '../components/ui/PageHeader';
import { EmptyState } from '../components/ui/EmptyState';
import { LineChart } from 'lucide-react';

const Analytics = () => {
  return (
    <PageContainer>
      <PageHeader 
        title="Analytics" 
        description="Analyze your job search performance and success rates."
      />
      <div className="mt-8">
        <EmptyState 
          icon={LineChart}
          title="Not enough data"
          description="Continue adding applications and interviews to see your analytics."
        />
      </div>
    </PageContainer>
  );
};

export default Analytics;
