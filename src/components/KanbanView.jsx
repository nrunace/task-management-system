import { Plus, MoreHorizontal, Calendar } from 'lucide-react';

export default function KanbanView({ tasks, onTaskClick, onCreateClick }) {
    const TaskCard = ({ task }) => {
        const formattedDate = new Date(task.dueDate).toLocaleDateString('en-US', {
            month: 'long', day: 'numeric', year: 'numeric'
        });

        return (
            <div 
                // Pass the whole task object here
                onClick={() => onTaskClick(task)}
                className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-3 cursor-pointer hover:shadow-md hover:border-emerald-200 transition-all active:scale-[0.98]"
            >
                <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-slate-800 text-sm truncate pr-2">{task.name}</h4>
                </div>
                <p className="text-xs text-slate-400 mb-4 line-clamp-2">{task.description}</p>
                
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-3 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formattedDate}</span>
                </div>
                
                <div className="flex flex-wrap gap-1.5">
                    {task.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-slate-100 text-slate-500 rounded-md text-[10px] font-medium">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 items-start gap-4 sm:gap-6 animate-in fade-in duration-300">
            {/* Not Started */}
            <div className="bg-[#EBF3FF] border border-[#D1E4FF] rounded-2xl p-4 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                        <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-xs">
                            {tasks.filter(t => t.status === 'Not Started').length}
                        </span>
                        Not Started
                    </div>
                    <div className="flex items-center gap-1 text-blue-500">
                        <Plus className="w-4 h-4 cursor-pointer" onClick={() => onCreateClick('Not Started')} />
                        
                    </div>
                </div>
                <div className="pr-1">
                    {tasks.filter(t => t.status === 'Not Started').length > 0 ? (
                        tasks.filter(t => t.status === 'Not Started').map(task => (
                            <TaskCard key={task.id} task={task} />
                        ))
                    ) : (
                        <p className="py-6 text-center text-xs text-blue-500/70">No task yet</p>
                    )}
                </div>
            </div>

            {/* In Progress */}
            <div className="bg-[#FFF8E6] border border-[#FFE7A0] rounded-2xl p-4 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-yellow-600 font-semibold text-sm">
                        <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-xs">
                            {tasks.filter(t => t.status === 'In Progress').length}
                        </span>
                        In Progress
                    </div>
                    <div className="flex items-center gap-1 text-yellow-600">
                        <Plus className="w-4 h-4 cursor-pointer" onClick={() => onCreateClick('In Progress')} />
                    </div>
                </div>
                <div className="pr-1">
                    {tasks.filter(t => t.status === 'In Progress').length > 0 ? (
                        tasks.filter(t => t.status === 'In Progress').map(task => (
                            <TaskCard key={task.id} task={task} />
                        ))
                    ) : (
                        <p className="py-6 text-center text-xs text-yellow-600/70">No task yet</p>
                    )}
                </div>
            </div>

            {/* Completed */}
            <div className="bg-[#E6FFF2] border border-[#A0F0C8] rounded-2xl p-4 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm">
                        <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-xs">
                            {tasks.filter(t => t.status === 'Completed').length}
                        </span>
                        Completed
                    </div>
                    <div className="flex items-center gap-1 text-emerald-600">
                        <Plus className="w-4 h-4 cursor-pointer" onClick={() => onCreateClick('Completed')} />
                        
                    </div>
                </div>
                <div className="pr-1">
                    {tasks.filter(t => t.status === 'Completed').length > 0 ? (
                        tasks.filter(t => t.status === 'Completed').map(task => (
                            <TaskCard key={task.id} task={task} />
                        ))
                    ) : (
                        <p className="py-6 text-center text-xs text-emerald-600/70">No task yet</p>
                    )}
                </div>
            </div>

            {/* Overdue */}
            <div className="bg-[#FFEBEB] border border-[#FFC2C2] rounded-2xl p-4 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-rose-500 font-semibold text-sm">
                        <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-xs">
                            {tasks.filter(t => t.status === 'Overdue').length}
                        </span>
                        Overdue
                    </div>
                    <div className="flex items-center gap-1 text-rose-500">
                        <Plus className="w-4 h-4 cursor-pointer" onClick={() => onCreateClick('Overdue')} />
                        
                    </div>
                </div>
                <div className="pr-1">
                    {tasks.filter(t => t.status === 'Overdue').length > 0 ? (
                        tasks.filter(t => t.status === 'Overdue').map(task => (
                            <TaskCard key={task.id} task={task} />
                        ))
                    ) : (
                        <p className="py-6 text-center text-xs text-rose-500/70">No task yet</p>
                    )}
                </div>
            </div>
        </div>
    );
}