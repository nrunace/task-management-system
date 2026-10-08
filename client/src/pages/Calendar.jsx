import { useState } from 'react';
import { useData } from '../context/DataContext';
import Sidebar from '../components/Sidebar';
import AppNavbar from '../components/AppNavbar';
import Calendar from '../components/CalendarView';
import CreateTaskModal from '../components/CreateTaskModal';
import TaskDetailsModal from '../components/TaskDetailsModal';
import { 
    Filter, Search, Check
} from 'lucide-react';

export default function CalendarView() {
    const { tasks, handleAddTask, handleUpdateTask, handleDeleteTask } = useData();
    
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [createModalInitialStatus, setCreateModalInitialStatus] = useState('Not Started');
    
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterProject, setFilterProject] = useState('All');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const activeTask = tasks.find(t => t.id === selectedTaskId);
    const uniqueProjects = ['All', ...new Set(tasks.map(task => task.project))];

    return (
        <div className="flex min-h-screen bg-slate-50/50 font-sans">
            <Sidebar isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={() => setIsMobileMenuOpen(false)} />
            
            <main className="flex-1 flex flex-col h-screen min-h-0 overflow-hidden">
                <AppNavbar
                    title="Calendar"
                    breadcrumbs={[
                        { label: 'Home', to: '/dashboard' },
                        { label: 'Calendar' }
                    ]}
                    onMenuClick={() => setIsMobileMenuOpen(true)}
                >
                    <div className="flex items-center gap-3">
                        <div className="relative mr-2">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="Search calendar..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                            />
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className={`p-2 border rounded-lg transition-colors ${
                                    filterProject !== 'All'
                                        ? 'border-emerald-200 bg-emerald-50 text-emerald-600'
                                        : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                                }`}
                                aria-label="Filter calendar by project"
                                aria-expanded={isFilterOpen}
                            >
                                <Filter className="w-4 h-4" />
                            </button>
                            {isFilterOpen && (
                                <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-100 rounded-lg shadow-xl py-2 z-50">
                                    <p className="px-3 pb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                                        Filter by Project
                                    </p>
                                    {uniqueProjects.map(project => (
                                        <button
                                            key={project}
                                            onClick={() => { setFilterProject(project); setIsFilterOpen(false); }}
                                            className="w-full flex items-center justify-between px-4 py-2 text-sm text-left hover:bg-slate-50 transition-colors"
                                        >
                                            <span className={`truncate ${filterProject === project ? 'font-medium text-emerald-600' : 'text-slate-600'}`}>
                                                {project}
                                            </span>
                                            {filterProject === project && <Check className="w-4 h-4 text-emerald-500 shrink-0" />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button 
                            onClick={() => { setCreateModalInitialStatus('Not Started'); setIsCreateModalOpen(true); }}
                            className="bg-emerald-400 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
                        >
                            <span className="text-lg leading-none">+</span> Create Task
                        </button>
                    </div>
                </AppNavbar>

                <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 lg:px-10 py-5 sm:py-8 custom-scrollbar">
                    
                    <Calendar
                        tasks={tasks}
                        searchQuery={searchQuery}
                        filterProject={filterProject}
                        onTaskClick={(task) => setSelectedTaskId(task.id)}
                    />
                </div>
            </main>

            {/* Modals */}
            {isCreateModalOpen && (
                <CreateTaskModal 
                    onClose={() => setIsCreateModalOpen(false)} 
                    onAddTask={handleAddTask}
                    initialStatus={createModalInitialStatus}
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
        </div>
    );
}