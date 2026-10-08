import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

import Sidebar from '../components/Sidebar';
import AppNavbar from '../components/AppNavbar';
import Calendar from '../components/CalendarView';
import KanbanView from '../components/KanbanView';
import ListView from '../components/ListView';
import CreateTaskModal from '../components/CreateTaskModal';
import TaskDetailsModal from '../components/TaskDetailsModal';
import CreateProjectModal from '../components/CreateProjectModal'; 
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { 
    LayoutGrid, 
    List, 
    Filter, 
    Plus, 
    ChevronRight, Trash2,
    LayoutList,
    Kanban,
    CalendarDays
} from 'lucide-react';

export default function Projects() {
    const { projectId } = useParams();
    const navigate = useNavigate();

    const folderThemes = {
        yellow: { back: 'bg-[#FBC02D]', front: 'bg-[#FDD835]/85' },
        rose: { back: 'bg-rose-500', front: 'bg-rose-400/85' },
        emerald: { back: 'bg-emerald-500', front: 'bg-emerald-400/85' },
        blue: { back: 'bg-blue-500', front: 'bg-blue-400/85' },
        purple: { back: 'bg-purple-500', front: 'bg-purple-400/85' },
    };

    const { tasks, projects, handleAddTask, handleUpdateTask, handleAddProject, handleDeleteTask, handleDeleteProject } = useData();
    
    // View modes
    const [directoryView, setDirectoryView] = useState('card'); // For the main projects page
    const [viewMode, setViewMode] = useState('list'); // For the specific project tasks page
    
    // Modal States
    const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
    const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
    const [createModalInitialStatus, setCreateModalInitialStatus] = useState('Not Started');
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [projectToDelete, setProjectToDelete] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const activeTask = tasks.find(t => t.id === selectedTaskId);

    const handleTaskClick = (task) => {
        setSelectedTaskId(task.id);
    };

    const handleProjectDelete = (project) => {
        setProjectToDelete(project);
    };

    const confirmProjectDelete = () => {
        if (!projectToDelete) return;

        const deletedProjectId = projectToDelete.id;
        handleDeleteProject(deletedProjectId);
        setProjectToDelete(null);
        if (projectId === deletedProjectId) {
            navigate('/projects');
        }
    };

    const getProjectProgress = (projectName) => {
        const projectTasks = tasks.filter(t => t.project === projectName);
        if (projectTasks.length === 0) return 0;
        const completed = projectTasks.filter(t => t.status === 'Completed').length;
        return Math.round((completed / projectTasks.length) * 100);
    };

    // --- VIEW 1: PROJECTS DIRECTORY ---
    if (!projectId) {
        return (
            <div className="flex min-h-screen bg-slate-50/50 font-sans">
                <Sidebar isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={() => setIsMobileMenuOpen(false)} />
                <main className="flex-1 flex flex-col h-screen min-h-0 overflow-hidden">
                    <AppNavbar
                        title="Projects"
                        breadcrumbs={[
                            { label: 'Home', to: '/dashboard' },
                            { label: 'Projects' }
                        ]}
                        onMenuClick={() => setIsMobileMenuOpen(true)}
                    />

                    <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 lg:px-10 py-5 sm:py-8 custom-scrollbar">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-800 mb-2">My Projects</h1>
                                <p className="text-sm text-slate-500 max-w-2xl">
                                    Manage and track the progress of all your active workspaces.
                                </p>
                            </div>
                            
                            <div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
                                <div className="flex w-full p-1 bg-slate-200/50 rounded-lg sm:w-auto sm:shrink-0">
                                    <button 
                                        onClick={() => setDirectoryView('card')}
                                        className={`flex flex-1 items-center justify-center gap-1.5 px-3 sm:flex-none sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                                            directoryView === 'card' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-800'
                                        }`}
                                    >
                                        <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Card
                                    </button>
                                    <button 
                                        onClick={() => setDirectoryView('list')}
                                        className={`flex flex-1 items-center justify-center gap-1.5 px-3 sm:flex-none sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                                            directoryView === 'list' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-800'
                                        }`}
                                    >
                                        <List className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> List
                                    </button>
                                </div>
                                <button 
                                    onClick={() => setIsCreateProjectModalOpen(true)}
                                    className="w-full justify-center bg-emerald-400 hover:bg-emerald-500 text-white px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 sm:gap-2 shadow-sm sm:w-auto sm:shrink-0 sm:whitespace-nowrap"
                                >
                                    <span className="text-base sm:text-lg leading-none">+</span> 
                                    <span className="hidden xs:inline sm:inline">Create New Project</span>
                                    <span className="inline xs:hidden sm:hidden">New Project</span>
                                </button>
                            </div>
                        </div>

                        {directoryView === 'card' ? (
                            <div className="grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-5 2xl:gap-6 justify-items-stretch animate-in fade-in duration-300">
                                {projects.map(project => {
                                    const progress = getProjectProgress(project.name);
                                    const theme = folderThemes[project.theme] || folderThemes.yellow;

                                    return (
                                        <div 
                                            key={project.id}
                                            onClick={() => navigate(`/projects/${project.id}`)}
                                            className="relative w-full h-[150px] cursor-pointer group hover:-translate-y-1.5 transition-all duration-300"
                                        >
                                            {/* Back Tab */}
                                            <div className={`absolute top-0 left-0 w-24 h-10 ${theme.back} rounded-tl-xl rounded-tr-2xl shadow-sm`}></div>
                                            
                                            {/* Back Body */}
                                            <div className={`absolute top-4 left-0 w-full h-[134px] ${theme.back} rounded-xl shadow-sm`}></div>
                                            
                                            {/* White Paper Insert */}
                                            <div className="absolute top-7 left-2.5 right-2.5 h-[90px] bg-white rounded-t-lg shadow-sm"></div>
                                            
                                            {/* Front Glass Flap */}
                                            <div className={`absolute bottom-0 left-0 w-full h-[100px] ${theme.front} backdrop-blur-md rounded-xl border-t border-l border-white/40 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] p-4 flex flex-col justify-end overflow-hidden`}>
                                                <div className="relative z-10">
                                                    <h3 className="font-bold text-white text-base tracking-tight mb-0.5 truncate">{project.name}</h3>
                                                    <p className="text-white/90 text-[11px] font-medium">Progress: {progress}%</p>
                                                </div>
                                                
                                                <div className="absolute inset-0 rounded-xl shadow-[inset_0_-8px_16px_rgba(0,0,0,0.1)] pointer-events-none"></div>
                                            </div>
                                            <button
                                                onClick={(event) => { event.stopPropagation(); handleProjectDelete(project); }}
                                                className="absolute top-5 right-2 z-20 p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-black/20 transition-colors"
                                                aria-label={`Delete ${project.name}`}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-x-auto animate-in fade-in duration-300">
                                <table className="w-full text-left text-sm text-slate-600">
                                    <thead className="border-b border-slate-100 text-xs text-slate-400 bg-slate-50/50">
                                        <tr>
                                            <th className="px-6 py-4 font-medium uppercase tracking-wider">Project Name</th>
                                            <th className="px-6 py-4 font-medium uppercase tracking-wider">Description</th>
                                            <th className="px-6 py-4 font-medium uppercase tracking-wider w-1/4">Progress</th>
                                            <th className="px-6 py-4 font-medium text-right uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {projects.map(project => {
                                            const progress = getProjectProgress(project.name);
                                            const theme = folderThemes[project.theme] || folderThemes.yellow;
                                            
                                            return (
                                                <tr 
                                                    key={project.id} 
                                                    onClick={() => navigate(`/projects/${project.id}`)}
                                                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                                                >
                                                    <td className="px-6 py-4 font-medium text-slate-800 flex items-center gap-3">
                                                        <div className={`w-9 h-9 rounded-lg ${theme.back} text-white flex items-center justify-center font-bold shadow-sm`}>
                                                            {project.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        {project.name}
                                                    </td>
                                                    <td className="px-6 py-4 max-w-[300px] truncate text-slate-500">
                                                        {project.description}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-full bg-slate-100 rounded-full h-2">
                                                                <div className={`${theme.back} h-2 rounded-full transition-all duration-500`} style={{ width: `${progress}%` }}></div>
                                                            </div>
                                                            <span className="text-xs font-medium text-slate-500 w-8">{progress}%</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-1">
                                                            <button
                                                                onClick={(event) => { event.stopPropagation(); handleProjectDelete(project); }}
                                                                className="p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all"
                                                                aria-label={`Delete ${project.name}`}
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                            <button className="p-2 rounded-lg text-slate-400 group-hover:text-emerald-500 group-hover:bg-emerald-50 transition-all">
                                                                <ChevronRight className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </main>

                {isCreateProjectModalOpen && (
                    <CreateProjectModal 
                        onClose={() => setIsCreateProjectModalOpen(false)} 
                        onCreateProject={handleAddProject} 
                    />
                )}
                {projectToDelete && (
                    <DeleteConfirmationModal
                        title="Delete Project?"
                        message={`Are you sure you want to delete "${projectToDelete.name}" and all of its tasks? This action cannot be undone.`}
                        onClose={() => setProjectToDelete(null)}
                        onConfirm={confirmProjectDelete}
                    />
                )}
            </div>
        );
    }

    // --- VIEW 2: SPECIFIC PROJECT DETAILS ---
    const currentProject = projects.find(p => p.id === projectId);
    const projectTasks = tasks.filter(t => t.project === currentProject?.name);

    if (!currentProject) {
        return (
            <div className="flex min-h-screen bg-slate-50 font-sans">
                <Sidebar isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={() => setIsMobileMenuOpen(false)} />
                <div className="flex-1 flex items-center justify-center flex-col">
                    <h2 className="text-xl font-semibold text-slate-800 mb-2">Project Not Found</h2>
                    <button onClick={() => navigate('/projects')} className="text-emerald-500 hover:underline">Return to Projects</button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-slate-50/50 font-sans">
            <Sidebar isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={() => setIsMobileMenuOpen(false)} />
            
            <main className="flex-1 flex flex-col h-screen min-h-0 overflow-hidden">
                <AppNavbar
                    title={currentProject.name}
                    breadcrumbs={[
                        { label: 'Home', to: '/dashboard' },
                        { label: 'Projects', to: '/projects' },
                        { label: currentProject.name }
                    ]}
                    onMenuClick={() => setIsMobileMenuOpen(true)}
                >
                    <button
                        onClick={() => handleProjectDelete(currentProject)}
                        className="ml-auto flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                        <Trash2 className="w-4 h-4" /> Delete Project
                    </button>
                </AppNavbar>

                <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 lg:px-10 py-5 sm:py-8 relative custom-scrollbar">
                    <div className="mb-6 sticky top-0 bg-slate-50 backdrop-blur-md z-10 pt-2 pb-2">
                        <h1 className="text-2xl font-bold text-slate-800 mb-6">{currentProject.name}</h1>
                        
                        <div className="flex items-center justify-between border-b border-slate-200">
                            <div className="flex items-center gap-6">
                                <button 
                                    onClick={() => setViewMode('list')}
                                    className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                                        viewMode === 'list' ? 'border-slate-800 text-slate-800' : 'border-transparent text-slate-500 hover:text-slate-800'
                                    }`}
                                >
                                    <LayoutList className="w-4 h-4" /> List View
                                </button>
                                <button 
                                    onClick={() => setViewMode('kanban')}
                                    className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                                        viewMode === 'kanban' ? 'border-slate-800 text-slate-800' : 'border-transparent text-slate-500 hover:text-slate-800'
                                    }`}
                                >
                                    <Kanban className="w-4 h-4" /> Kanban
                                </button>
                                <button
                                    onClick={() => setViewMode('calendar')}
                                    className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                                        viewMode === 'calendar' ? 'border-slate-800 text-slate-800' : 'border-transparent text-slate-500 hover:text-slate-800'
                                    }`}
                                >
                                    <CalendarDays className="w-4 h-4" /> Calendar
                                </button>
                            </div>

                            <div className="flex items-center gap-3 pb-3">
                                {/* <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors">
                                    <Filter className="w-4 h-4" /> Filter ({projectTasks.length})
                                </button> */}
                                <button 
                                    onClick={() => { setCreateModalInitialStatus('Not Started'); setIsCreateTaskModalOpen(true); }}
                                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-100 hover:ring-1 cursor-pointer rounded-lg transition-colors"
                                >
                                    <Plus className="w-4 h-4" /> Add Task
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        {viewMode === 'list' ? (
                            <ListView tasks={projectTasks} onTaskClick={handleTaskClick} />
                        ) : viewMode === 'kanban' ? (
                            <KanbanView 
                                tasks={projectTasks} 
                                onTaskClick={handleTaskClick} 
                                onCreateClick={(status) => { setCreateModalInitialStatus(status); setIsCreateTaskModalOpen(true); }} 
                            />
                        ) : (
                            <Calendar tasks={projectTasks} onTaskClick={handleTaskClick} />
                        )}
                    </div>
                </div>
            </main>

            {/* Reused Modals */}
            {isCreateTaskModalOpen && (
                <CreateTaskModal 
                    onClose={() => setIsCreateTaskModalOpen(false)} 
                    onAddTask={handleAddTask}
                    initialStatus={createModalInitialStatus}
                    initialProject={currentProject.name}
                />
            )}

            {activeTask && (
                <TaskDetailsModal 
                    task={activeTask}
                    onClose={() => setSelectedTaskId(null)}
                    onUpdateTask={handleUpdateTask}
                    onDeleteTask={handleDeleteTask}
                />
            )}

            {projectToDelete && (
                <DeleteConfirmationModal
                    title="Delete Project?"
                    message={`Are you sure you want to delete "${projectToDelete.name}" and all of its tasks? This action cannot be undone.`}
                    onClose={() => setProjectToDelete(null)}
                    onConfirm={confirmProjectDelete}
                />
            )}
        </div>
    );
}