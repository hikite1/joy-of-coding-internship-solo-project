"use client";

import React, { createContext, useState, useContext } from "react";
import themes from "./theme";
import axios from "axios";
import { useUser } from '@clerk/nextjs';
import toast  from 'react-hot-toast';

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const { user } = useUser();
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const theme = themes[selectedTheme];
  const [tasks, setTasks] = useState([]);
  const [model, setModel] = useState(false);
  const [collapsed, setCollapsed] = useState([]);

  const openModel = () => {
    setModel(true);
  };
  
const closeModel = () => {
  setModel(false);
};

  const allTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/tasks");
      setTasks(res.data);
      const sorted = res.data.sort((a, b) => {
       
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
      console.log(sorted);
      setTasks(sorted);
      setIsLoading(false);

    } catch (error) {
        console.log(error);
        toast.error('Something went wrong!');
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(`/api/tasks/${id}`);
      toast.success('Task deleted');
      allTasks();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  const updateTask = async (task) => {
    try {
      const res = await axios.put(`/api/tasks`, task);
      toast.success('Task updated');
      allTasks();

    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };
  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  console.log(completedTasks);
  const importantTasks = tasks.filter((task) => task.isImportant === true);
  console.log(importantTasks);
  const incompleteTasks = tasks.filter((task) => task.isCompleted === false);
  console.log(incompleteTasks);

  React.useEffect(() => {
    if (user) allTasks();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
        deleteTask,
        isLoading,
        completedTasks,
        importantTasks,
        incompleteTasks,
        updateTask,
        model,
        openModel,
        closeModel,
        allTasks,
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
