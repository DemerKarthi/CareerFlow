import React from 'react';
import { PageContainer } from '../components/ui/PageContainer';
import { TaskList } from '../features/tasks/components/TaskList';

const Tasks = () => {
  return (
    <PageContainer>
      <TaskList />
    </PageContainer>
  );
};

export default Tasks;
