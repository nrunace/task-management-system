import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function ListView({ tasks, onTaskClick }) {
    const [expanded, setExpanded] = useState({
        'Not Started': true,
        'In Progress': true,
        'Completed': false,
        'Overdue': true
    });

    const toggleSection = (status) => {
        setExpanded(prev => ({ ...prev, [status]: !prev[status] }));
    };

    const statusConfig = [
        { name: 'Not Started', bgHeader: 'bg-[#EBF3FF]', textHeader: 'text-blue-600' },
        { name: 'In Progress', bgHeader: 'bg-[#FFF8E6]', textHeader: 'text-yellow-600' },
        { name: 'Completed', bgHeader: 'bg-[#E6FFF2]', textHeader: 'text-emerald-600' },
        { name: 'Overdue', bgHeader: 'bg-[#FFEBEB]', textHeader: 'text-rose-500' }
    ];

    // Colors for the priority badges
    const priorityColors = {
        'Low': 'text-slate-600 bg-slate-100',
        'Medium': 'text-blue-600 bg-blue-50 border border-blue-100',
        'High': 'text-orange-600 bg-orange-50 border border-orange-100',
        'Urgent': 'text-rose-600 bg-rose-50 border border-rose-200'
    };

    return (
        <div className="space-y-4 pb-8 animate-in fade-in duration-300">
            {statusConfig.map(statusData => {
                const sectionTasks = tasks.filter(t => t.status === statusData.name);
                
                return (
                    <div key={statusData.name} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all">
                        <button 
                            onClick={() => toggleSection(statusData.name)} 
                            className={`w-full flex items-center gap-2 px-4 py-3 cursor-pointer ${statusData.bgHeader} ${statusData.textHeader} transition-colors hover:opacity-90`}
                        >
                            {expanded[statusData.name] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            <span className="font-semibold text-sm">{statusData.name}</span>
                            <span className="bg-white/60 px-2 py-0.5 rounded text-xs font-bold ml-2">
                                {sectionTasks.length}
                            </span>
                        </button>

                        {expanded[statusData.name] && (
                            <div className="bg-white overflow-x-auto">
                                {sectionTasks.length > 0 ? (
                                    <table className="min-w-[900px] w-full text-left text-sm text-slate-600">
                                        <thead className="border-b border-slate-100 text-xs text-slate-400 bg-slate-50/50">
                                            <tr>
                                                <th className="px-6 py-3 font-medium">Task Name</th>
                                                <th className="px-6 py-3 font-medium">Description</th>
                                                <th className="px-6 py-3 font-medium">Project</th>
                                                <th className="px-6 py-3 font-medium">Start Date</th>
                                                <th className="px-6 py-3 font-medium">Due Date</th>
                                                <th className="px-6 py-3 font-medium">Priority</th>
                                                <th className="px-6 py-3 font-medium">Tags</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {sectionTasks.map(task => (
                                                <tr 
                                                    key={task.id} 
                                                    onClick={() => onTaskClick(task)}
                                                    className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                                                >
                                                    <td className="px-6 py-4 font-medium text-slate-800 whitespace-nowrap">
                                                        {task.name}
                                                    </td>
                                                    <td className="px-6 py-4 max-w-[200px] truncate">
                                                        {task.description}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="px-2 py-1 bg-slate-100 rounded-md text-xs font-medium text-slate-600">
                                                            {task.project}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-xs">
                                                        {task.startDate ? new Date(task.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-xs">
                                                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {/* Fixed Priority Display */}
                                                        <span className={`px-2 py-1 rounded-md text-[11px] font-bold ${priorityColors[task.priority] || priorityColors['Medium']}`}>
                                                            {task.priority || 'Medium'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex gap-1 flex-wrap">
                                                            {task.tags.map((tag, idx) => (
                                                                <span key={idx} className="text-[10px] text-slate-400 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded">
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="px-6 py-8 text-center text-sm text-slate-400">
                                        No tasks in this section.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}