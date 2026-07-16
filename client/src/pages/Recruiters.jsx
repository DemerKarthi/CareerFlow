import React from 'react';
import { PageContainer } from '../components/ui/PageContainer';
import { RecruiterList } from '../features/recruiters/components/RecruiterList';

const Recruiters = () => {
  return (
    <PageContainer>
      <RecruiterList />
    </PageContainer>
  );
};

export default Recruiters;

