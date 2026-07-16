import React from 'react';
import { PageContainer } from '../components/ui/PageContainer';
import { CompanyList } from '../features/companies/components/CompanyList';

const Companies = () => {
  return (
    <PageContainer>
      <CompanyList />
    </PageContainer>
  );
};

export default Companies;
