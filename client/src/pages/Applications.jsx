import React from 'react';
import { PageContainer } from '../components/ui/PageContainer';
import { ApplicationList } from '../features/applications/components/ApplicationList';

const Applications = () => {
  return (
    <PageContainer>
      <ApplicationList />
    </PageContainer>
  );
};

export default Applications;
