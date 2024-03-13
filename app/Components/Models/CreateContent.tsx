'use client';

import { useGlobalState } from '@/app/Context/globalProvider';
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import styled from 'styled-components';
import Button from '../Button/Button';
import { plus } from '@/app/Utils/icons';

const CreateContent = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [completed, setCompleted] = useState(false);
    const [important, setImportant] = useState(false);
    const {theme} = useGlobalState();

const handleChange = (name: string) => (e: any) => {
    switch (name) {
        case 'title':
            setTitle(e.target.value);
            break;
        case 'description':
            setDescription(e.target.value);
            break;
        case 'date':
            setDate(e.target.value);
            break;
        case 'completed':
            setCompleted(e.target.checked);
            break;
        case 'important':
            setImportant(e.target.checked);
            break;
        default:
            break;
    }
};

const handleSubmit = async (e: any) => {
    e.preventDefault();

    const task = {
        title,
        description,
        date,
        completed, 
        important,
    };

    try {
        const res = await axios.post('/api/tasks', task);

        if(res.data.error) {
            toast.error(res.data.error);
        }
        toast.success('Task created successfully.');
    } catch (error) {
        toast.error('Something went wrong.');
        console.log(error);
    }

};

  return (
    <CreateContentStyled onSubmit={handleSubmit} theme={theme}>
        <h1>Create a Task</h1>
        <div className='input-control'>
            <label htmlFor='title'>Title</label>
            <input 
                type='text' 
                id='title'
                value={title}
                name='title'
                onChange={handleChange('title')}
                placeholder='e.g., What is the title of your task?'
            />
        </div>
        <div className='input-control'>
            <label htmlFor='description'>Description</label>
            <textarea 
                value={description}
                onChange={handleChange('description')}
                name='description'
                id='descrition'
                rows={4}
                placeholder='e.g., What would you like to do in your task?'
            ></textarea>
        </div>
        <div className='input-control'>
            <label htmlFor='date'>Date</label>
            <input 
                value={date}
                onChange={handleChange('date')}
                type='date'
                name='date'
                id='date'
            />
        </div>
        <div className='input-control toggler'>
            <label htmlFor='completed'>Toggle Completed</label>
            <input
                value={completed.toString()}
                onChange={handleChange('completed')}
                type='checkbox'
                name='completed'
                id='completed'
            />
        </div>
        <div className='input-control toggler'>
            <label htmlFor='completed'>Toggle Important</label>
            <input
                value={important.toString()}
                onChange={handleChange('important')}
                type='checkbox'
                name='important'
                id='important'
            />
        </div>
        <div className='submit-btn flex justify-end'>
            <Button type='submit'
                name='Create Task'
                icon={plus}
                padding={'0.5rem 1rem'}
                borderRad={'0.8rem'}
                fw={'500'}
                fs={'1.2rem'}
                background={theme.colorGrey6}
            />
        </div>
    </CreateContentStyled>
  );
}

const CreateContentStyled = styled.form`

    > h1 {
        font-size: clamp(1.2rem, 5vw, 1.6rem);
        font-weight: 600;
    }

    color: ${(props) => props.theme.colorGrey1};

    .input-control {
        position: relative;
        margin: .1rem 2;
        font-weight: 500;

        label {
            margin-bottom: .01rem;
            display: inline-block;
            font-size: clamp(0.9rem, 4vw, 1.2rem);

            span {
                color: ${(props) => props.theme.colorGrey3};
            }
        }

        input, textarea {
            width: 100%;
            border-radius: 1rem;
            padding: 1rem;
            resize: none;
            background-color: ${(props) => props.theme.colorGreyDark};
            color: ${(props) => props.theme.colorGrey2};
        }
    }

    .toggler {
        diplay: flex;
        align-items: center;
        justify-content: space-between;

        label {
            flex: 1;
        }

        input {
            width: initial;
            margin: 1rem;
        }
    }
`;

export default CreateContent