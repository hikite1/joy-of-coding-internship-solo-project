'use client';

import { useGlobalState } from '@/app/Context/globalProvider';
import { edit, trash } from '@/app/Utils/icons';
import React from 'react'
import styled from 'styled-components';
import formatDate  from '@/app/Utils/formatDate';
import CreateContent from '../Models/CreateContent';

interface Props {
    title: string;
    description: string;
    date: string;
    isCompleted: boolean;
    id: string;

}

const TaskItem = ({ title, description, date, isCompleted, id  }: Props) => {
  const {theme, deleteTask, updateTask} = useGlobalState();
  console.log(theme)

  return (
    <TaskItemStyled> {/*adding theme={theme} breaks the page render. globalProvider.js has useEffect hook that should be passed from calling useGlobalState hook. Do I need a useEffect hook here? Why doesnt useGlobalState work like it does in Sidebar.tsx when it is being exported from globalProvider.js? */}
        <h1>{title}</h1>
        <p>{description}</p>
        <p className='date'>{formatDate( date )}</p>
        <div className="task-footer">
          {isCompleted ? (
            <button className='completed' onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted,
              };
              updateTask(task);
            }}>Completed</button> 
          ) : ( 
            <button className='incomplete' onClick={() => {
              const task = {
                id, 
                isCompleted: !isCompleted,
              };
              updateTask(task);
            }}>Incomplete</button>
          )}
          <button className='edit'>{edit}</button>
          <button className='delete' 
            onClick={() => {
              deleteTask(id);
            }}>{trash}</button>
        </div>
    </TaskItemStyled>
  );
}

const TaskItemStyled = styled.div`
  padding: 1rem 1rem;
  border-radius: 1rem;
  background-color: rgba(249, 249, 249, 0.08); /* ${(props) => props.theme.borderColor2}; */
  box-shadow: 1px 7px 12px rgba(8, 18, 69, 0.1); /* ${(props) => props.theme.shadow7}; */
  border-color: #6FCF97; /* ${(props) => props.theme.colorPrimaryGreen}; */
  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;


  .date { 
    margin-top: auto;
  }

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }

  button {
    border: none;
    outline: none;
    cursor: pointer;

    i {
      font-size: 1.4rem;
      color: #b2becd; /*${(props) => props.theme.colorGrey2};*/
    }
  }

  .edit {
    margin-left: auto;
  }

  .completed, .incomplete {
    display: inline-block;
    padding: 0.4rem 1rem;
    border-radius: 30px;
    background: #fe6854; /* ${(props) => props.theme.colorDanger}; */
  }

  .completed {
      background: #27AE60; /* ${(props) => props.theme.colorGreenDark}; */
  }
`;

export default TaskItem