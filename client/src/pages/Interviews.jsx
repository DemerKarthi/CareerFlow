import React from 'react';
import { PageContainer } from '../components/ui/PageContainer';
import { InterviewList } from '../features/interviews/components/InterviewList';

const Interviews = () => {
  return (
    <PageContainer>
      <InterviewList />
    </PageContainer>
  );
};

export default Interviews;

