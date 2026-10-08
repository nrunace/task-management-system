import { useState } from 'react';
import { useData } from '../context/DataContext';
import Sidebar from '../components/Sidebar';
import AppNavbar from '../components/AppNavbar';
import KanbanView from '../components/KanbanView';
import ListView from '../components/ListView';
import CreateTaskModal from '../components/CreateTaskModal';
import TaskDetailsModal from '../components/TaskDetailsModal';
import { 
    LayoutList, Kanban, Filter, ArrowUpDown, Search, Check 
} from 'lucide-react';

export default function Tasks() {
    const { tasks, handleAddTask, handleUpdateTask, handleDeleteTask } = useData();
    
    const [viewMode, setViewMode] = useState('list');

    const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const [searchQuery, setSearchQuery] = useState('');

    const [sortOption, setSortOption] = useState('default');
    const [sortCoords, setSortCoords] = useState(null);

    const [filterProject, setFilterProject] = useState('All');
    const [filterCoords, setFilterCoords] = useState(null);

    const uniqueProjects = ['All', ...new Set(tasks.map(task => task.project))];

    const filteredTasks = tasks
        .filter(task => filterProject === 'All' || task.project === filterProject)
        .filter(task => {
            const lowerQuery = searchQuery.toLowerCase().trim();
            return !lowerQuery ||
                task.name.toLowerCase().includes(lowerQuery) ||
                task.project.toLowerCase().includes(lowerQuery);
        })
        .sort((a, b) => {
            if (sortOption === 'date-asc') {
                return new Date(a.dueDate) - new Date(b.dueDate);
            }
            if (sortOption === 'date-desc') {
                return new Date(b.dueDate) - new Date(a.dueDate);
            }
            if (sortOption === 'name-asc') {
                return a.name.localeCompare(b.name);
            }
            return 0;
        });

    const activeTask = tasks.find(t => t.id === selectedTaskId);

    const handleTaskClick = (task) => {
        setSelectedTaskId(task.id);
    };

    return (
        <div className="flex min-h-screen bg-slate-50/50 font-sans">
            <Sidebar isMobileMenuOpen={isMobileMenuOpen} onMobileMenuClose={() => setIsMobileMenuOpen(false)} />
            
            <main className="flex-1 flex flex-col h-screen min-h-0 overflow-hidden">
                <AppNavbar
                    title="All Tasks"
                    breadcrumbs={[
                        { label: 'Home', to: '/dashboard' },
                        { label: 'Tasks' }
                    ]}
                    onMenuClick={() => setIsMobileMenuOpen(true)}
                />

                <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 lg:px-10 py-5 sm:py-8 relative custom-scrollbar">
                    <div className="mb-6 sticky top-0 bg-slate-50/95 backdrop-blur-md z-10 pt-2 pb-2">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-800 mb-2">Master Task List</h1>
                                <p className="text-sm text-slate-500">View and manage tasks across all your projects.</p>
                            </div>
                            <div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                                <div className="relative w-full sm:w-auto sm:shrink-0">
                                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input 
                                        type="text" 
                                        placeholder="Search tasks..." 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full sm:w-44 md:w-auto pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 bg-white"
                                    />
                                </div>
                                <button 
                                    onClick={() => setIsCreateTaskModalOpen(true)}
                                    className="w-full justify-center bg-emerald-400 hover:bg-emerald-500 text-white px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 sm:gap-2 shadow-sm sm:w-auto sm:shrink-0 sm:whitespace-nowrap"
                                >
                                    <span className="text-base sm:text-lg leading-none">+</span> 
                                    <span className="hidden xs:inline sm:inline">Create Task</span>
                                    <span className="inline xs:hidden sm:hidden">New</span>
                                </button>
                            </div>
                        </div>
                        
                        <div className="flex flex-row items-center justify-between gap-2 sm:gap-4 border-b border-slate-200 overflow-x-auto pb-0 custom-scrollbar relative">
                            <div className="flex items-center gap-3 sm:gap-6 shrink-0">
                                <button 
                                    onClick={() => setViewMode('list')} 
                                    className={`flex items-center gap-1.5 sm:gap-2 pb-3 text-xs sm:text-sm font-medium border-b-2 transition-colors ${viewMode === 'list' ? 'border-slate-800 text-slate-800' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                                >
                                    <LayoutList className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> List View
                                </button>
                                <button 
                                    onClick={() => setViewMode('kanban')} 
                                    className={`flex items-center gap-1.5 sm:gap-2 pb-3 text-xs sm:text-sm font-medium border-b-2 transition-colors ${viewMode === 'kanban' ? 'border-slate-800 text-slate-800' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                                >
                                    <Kanban className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Kanban
                                </button>
                            </div>

                            <div className="flex items-center gap-2 text-slate-500">
                                {/* Sort Button & Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={(e) => {
                                            const rect = e.currentTarget.getBoundingClientRect();
                                            setSortCoords(sortCoords ? null : rect);
                                            setFilterCoords(null);
                                        }}
                                        className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors ${sortOption !== 'default' ? 'bg-emerald-100 text-emerald-600' : 'text-slate-600 hover:bg-slate-100'}`}
                                    >
                                        <ArrowUpDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Sort
                                    </button>
                                    
                                    {sortCoords && (
                                        <>
                                            <div className="fixed inset-0 z-40" onClick={() => setSortCoords(null)} />
                                            <div
                                                style={{
                                                    position: 'fixed',
                                                    top: sortCoords.bottom + 1,
                                                    left: window.innerWidth < 640 ? 16 : undefined,
                                                    right: window.innerWidth < 640 ? 16 : window.innerWidth - sortCoords.right
                                                }}
                                                className="w-auto sm:w-48 bg-white border border-slate-100 rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95"
                                            >
                                                <p className="px-3 pb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">Sort Tasks</p>
                                                {[
                                                    { id: 'default', label: 'Default Order' },
                                                    { id: 'date-asc', label: 'Due Date (Earliest)' },
                                                    { id: 'date-desc', label: 'Due Date (Latest)' },
                                                    { id: 'name-asc', label: 'Name (A-Z)' }
                                                ].map(option => (
                                                    <button
                                                        key={option.id}
                                                        onClick={() => { setSortOption(option.id); setSortCoords(null); }}
                                                        className="w-full flex items-center justify-between px-4 py-2 text-sm text-left hover:bg-slate-50 transition-colors"
                                                    >
                                                        <span className={sortOption === option.id ? 'font-medium text-emerald-600' : 'text-slate-600'}>
                                                            {option.label}
                                                        </span>
                                                        {sortOption === option.id && <Check className="w-4 h-4 text-emerald-500" />}
                                                    </button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Filter Button & Dropdown */}
                                <div>
                                    <button
                                        onClick={(e) => {
                                            const rect = e.currentTarget.getBoundingClientRect();
                                            setFilterCoords(filterCoords ? null : rect);
                                            setSortCoords(null);
                                        }}
                                        className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors ${filterProject !== 'All' ? 'bg-emerald-100 text-emerald-600' : 'text-slate-600 hover:bg-slate-100'}`}
                                    >
                                        <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Filter
                                    </button>
                                    
                                    {filterCoords && (
                                        <>
                                            <div className="fixed inset-0 z-40" onClick={() => setFilterCoords(null)} />
                                            <div 
                                                style={{ 
                                                    position: 'fixed', 
                                                    top: filterCoords.bottom + 1,
                                                    left: window.innerWidth < 640 ? 16 : undefined,
                                                    right: window.innerWidth < 640 ? 16 : window.innerWidth - filterCoords.right
                                                }}
                                                className="w-auto sm:w-48 bg-white border border-slate-100 rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95"
                                            >
                                                <p className="px-3 pb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                                                    Filter by Project
                                                </p>
                                                {uniqueProjects.map(project => (
                                                    <button
                                                        key={project}
                                                        onClick={() => { setFilterProject(project); setFilterCoords(null); }}
                                                        className="w-full flex items-center justify-between px-4 py-2 text-sm text-left hover:bg-slate-50 transition-colors"
                                                    >
                                                        <span className={`truncate ${filterProject === project ? 'font-medium text-emerald-600' : 'text-slate-600'}`}>
                                                            {project}
                                                        </span>
                                                        {filterProject === project && <Check className="w-4 h-4 text-emerald-500 shrink-0" />}
                                                    </button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        {viewMode === 'list' ? (
                            <ListView 
                                tasks={filteredTasks} 
                                onTaskClick={handleTaskClick}
                            />
                        ) : (
                            <KanbanView 
                                tasks={filteredTasks} 
                                onTaskClick={handleTaskClick}
                                onCreateClick={() => setIsCreateTaskModalOpen(true)} 
                            />
                        )}
                    </div>
                </div>
            </main>

            {isCreateTaskModalOpen && (
                <CreateTaskModal 
                    onClose={() => setIsCreateTaskModalOpen(false)} 
                    onAddTask={handleAddTask}
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