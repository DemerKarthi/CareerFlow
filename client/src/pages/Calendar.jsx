import React from 'react';
import { PageContainer } from '../components/ui/PageContainer';
import { PageHeader } from '../components/ui/PageHeader';
import { EmptyState } from '../components/ui/EmptyState';
import { CalendarDays } from 'lucide-react';

const Calendar = () => {
  return (
    <PageContainer>
      <PageHeader 
        title="Calendar" 
        description="View your upcoming events, deadlines, and interviews."
      />
      <div className="mt-8">
        <EmptyState 
          icon={CalendarDays}
          title="No events scheduled"
          description="Your calendar is clear. Events will appear here once scheduled."
        />
      </div>
    </PageContainer>
  );
};

export default Calendar;
