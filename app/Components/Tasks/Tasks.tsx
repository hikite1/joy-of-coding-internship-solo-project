'use client';

import { useGlobalState } from '@/app/Context/globalProvider';
import React from 'react'
import styled from 'styled-components';
import CreateContent from '../Models/CreateContent';
import TaskItem from '../TaskItem/TaskItem';
import { plus } from '@/app/Utils/icons';
import Model from '../Models/Model'

interface Props {
    title: string;
    tasks: any[];
}

const Tasks = ({ title, tasks}: Props) => {
    const {theme, isLoading, openModel, model} = useGlobalState();

  return (
    <TaskStyled theme={theme}> 
        {model && <Model content={<CreateContent />} />}
        <h1>{title}</h1>
        {!isLoading ? ( <div className="tasks grid"> 
            {tasks.map((task) => (
                <TaskItem 
                    key={task._id} 
                    title={task.title}
                    description={task.description}
                    date={task.date}
                    isCompleted={task.isCompleted}
                    id={task.id}
                />                   
            ))}
            <button className="create-task" onClick={openModel}>
                {plus}
                Add New Task
            </button>
        </div> 
        ) : ( 
        <div className='tasks-loader w-full h-full flex items-center justify-center'>
            <span className='loader'></span>
        </div>
        )}          
    </TaskStyled>
  );
}

//CSS for task container
const TaskStyled = styled.main`
    padding: 2rem;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.colorBg2};
    border: 2px solid ${(props) => props.theme.borderColor2};
    border-radius: 1rem; 
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 0.5rem;
    }

    .tasks {
        margin: 4rem 0;
    }

    > h1 {
        font-size: clamp(1.5rem, 2vw, 2rem);
        font-weight: 800;
        position: relative;
        margin: 1rem;

        &::after {
            content: '';
            position: absolute;
            bottom: -0.1rem;
            left: 0;
            width: 7.2rem;
            height: 0.2rem;
            background-color: ${(props) => props.theme.colorPrimaryGreen};
            border-radius: 0.5rem;
        }
    }

    .create-task {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        height: 16rem;
        color: ${(props) => props.theme.colorGrey2};
        font-weight: 600;
        cursor: pointer;
        border-radius: 1rem;
        border: 3px dashed ${(props) => props.theme.colorGrey5};
        transition: all 0.3s ease;

        &:hover {
            background-color: ${(props) => props.theme.colorGrey5};
            color: ${(props) => props.theme.colorGrey0};
        }
    }
`;


export default Tasks