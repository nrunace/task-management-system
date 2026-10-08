import { createContext, useState, useContext } from 'react';

const DataContext = createContext();

// This custom hook must be exported
export const useData = () => useContext(DataContext);

// The Provider component must be exported
export const DataProvider = ({ children }) => {
    const [projects, setProjects] = useState([
        { id: 'capstone-2', name: 'Capstone 2', theme: 'yellow' },
        { id: 'advanced-web', name: 'Advanced Web Final Project', theme: 'rose' }
    ]);

    const [tasks, setTasks] = useState([
        { 
            id: '1', 
            name: 'Layout Figma', 
            status: 'Not Started', 
            project: 'Capstone 2',
            startDate: '2026-10-05',
            dueDate: '2026-10-12', 
            tags: ['Design', 'Frontend'], 
            priority: 'High'
        },
        { 
            id: '2', 
            name: 'Code Dashboard', 
            status: 'In Progress', 
            project: 'Advanced Web Final Project',
            startDate: '2026-10-05',
            dueDate: '2026-10-14', 
            tags: ['Frontend'],
            priority: 'High'
        }
    ]);

    const handleAddProject = (newProject) => setProjects(prev => [...prev, newProject]);
    const handleAddTask = (newTask) => setTasks(prev => [...prev, newTask]);
    const handleUpdateTask = (updatedTask) => {
        setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    };
    const handleDeleteTask = (taskId) => {
        setTasks(prev => prev.filter(task => task.id !== taskId));
    };
    const handleDeleteProject = (projectId) => {
        const project = projects.find(item => item.id === projectId);
        if (!project) return;

        setProjects(prev => prev.filter(item => item.id !== projectId));
        setTasks(prev => prev.filter(task => task.project !== project.name));
    };

    return (
        <DataContext.Provider value={{ 
            projects, handleAddProject, 
            tasks, handleAddTask, handleUpdateTask, handleDeleteTask, handleDeleteProject
        }}>
            {children}
        </DataContext.Provider>
    );
};