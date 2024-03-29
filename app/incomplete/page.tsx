'use client';

import React from 'react'
import { useGlobalState } from '../Context/globalProvider';
import Tasks from '../Components/Tasks/Tasks';

const page = () => {
  const { incompleteTasks } = useGlobalState();
  return (
    <Tasks title='Incomplete Tasks' tasks={incompleteTasks} />
  )
}

export default page