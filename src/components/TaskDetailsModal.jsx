import { useState, useEffect } from 'react';
import { X, Calendar, Folder, Tag, Activity, Clock, Trash2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import DeleteConfirmationModal from './DeleteConfirmationModal';

export default function TaskDetailsModal({ task, onClose, onUpdateTask, onDeleteTask }) {
    const { projects } = useData();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    
    const [formData, setFormData] = useState({
        ...task,
        category: task.tags ? task.tags.join(', ') : '' 
    });

    // Only reset local state if we open a completely different task card
    useEffect(() => {
        if (task && task.id !== formData.id) {
            setFormData({
                ...task,
                category: task.tags ? task.tags.join(', ') : ''
            });
        }
    }, [task?.id]);

    if (!task) return null;

    // ONE function handles all typing, dates, and dropdowns instantly
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedData = { ...formData, [name]: value };
        
        // 1. Update UI instantly
        setFormData(updatedData);
        
        // 2. Format tags
        const tags = updatedData.category.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
        
        // 3. Push to global context immediately
        onUpdateTask({ 
            ...updatedData, 
            tags: tags.length > 0 ? tags : ['General'] 
        });
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const handleDelete = () => {
        onDeleteTask(task.id);
        onClose();
    };

    const statusColors = {
        'Not Started': 'bg-blue-100 text-blue-700',
        'In Progress': 'bg-yellow-100 text-yellow-700',
        'Completed': 'bg-emerald-100 text-emerald-700',
        'Overdue': 'bg-rose-100 text-rose-700'
    };

    const priorityColors = {
        'Low': 'text-slate-600 bg-slate-100',
        'Medium': 'text-blue-600 bg-blue-50',
        'High': 'text-orange-600 bg-orange-50',
        'Urgent': 'text-rose-600 bg-rose-50'
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[calc(100vh-2rem)] overflow-y-auto p-4 sm:p-8 relative animate-in zoom-in-95 duration-200">
                
                <div className="flex items-start justify-between mb-4 pr-8">
                    <div className="w-full pr-4">
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full text-2xl font-bold text-slate-800 bg-transparent hover:bg-slate-50 focus:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded -ml-2 px-2 py-1 transition-colors"
                        />
                        <select 
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className={`mt-2 text-xs font-bold rounded-md px-2 py-1 outline-none cursor-pointer border border-transparent hover:border-slate-200 focus:ring-2 focus:ring-emerald-400 ${priorityColors[formData.priority] || priorityColors['Medium']}`}
                        >
                            <option value="Low">Low Priority</option>
                            <option value="Medium">Medium Priority</option>
                            <option value="High">High Priority</option>
                            <option value="Urgent">Urgent Priority</option>
                        </select>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors absolute top-6 right-6">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-6 mt-4">
                    <div>
                        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Description</h4>
                        <textarea 
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Add details about this task..."
                            rows="3"
                            className="w-full text-sm text-slate-700 leading-relaxed bg-slate-50 hover:bg-slate-100 focus:bg-white p-4 rounded-xl border border-slate-100 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 resize-none transition-colors"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                        <div>
                            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                <Activity className="w-3.5 h-3.5" /> Status
                            </h4>
                            <select 
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className={`text-sm font-medium px-3 py-2 w-full rounded-lg border-0 cursor-pointer outline-none focus:ring-2 focus:ring-emerald-400 ${statusColors[formData.status] || 'bg-slate-100 text-slate-700'}`}
                            >
                                <option value="Not Started" className="bg-white text-slate-800">Not Started</option>
                                <option value="In Progress" className="bg-white text-slate-800">In Progress</option>
                                <option value="Completed" className="bg-white text-slate-800">Completed</option>
                                <option value="Overdue" className="bg-white text-slate-800">Overdue</option>
                            </select>
                        </div>
                        
                        <div>
                            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                <Folder className="w-3.5 h-3.5" /> Project
                            </h4>
                            <select 
                                name="project"
                                value={formData.project}
                                onChange={handleChange}
                                className="w-full text-sm font-medium text-slate-700 px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg outline-none cursor-pointer focus:ring-2 focus:ring-emerald-400 focus:bg-white transition-colors"
                            >
                                {projects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                            </select>
                        </div>

                        <div>
                            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" /> Start Date
                            </h4>
                            <input 
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className="w-full text-sm font-medium text-slate-700 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg outline-none cursor-pointer focus:ring-2 focus:ring-emerald-400 focus:bg-white transition-colors"
                            />
                        </div>

                        <div>
                            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" /> Due Date
                            </h4>
                            <input 
                                type="date"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                                className="w-full text-sm font-medium text-slate-700 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg outline-none cursor-pointer focus:ring-2 focus:ring-emerald-400 focus:bg-white transition-colors"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                <Tag className="w-3.5 h-3.5" /> Tags
                            </h4>
                            <input 
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                placeholder="e.g., Design, Frontend"
                                className="w-full text-sm font-medium text-slate-700 px-3 py-2 bg-slate-50 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-emerald-400 rounded-lg outline-none focus:ring-1 focus:ring-emerald-400 transition-colors"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-6 mt-8 border-t border-slate-100 flex items-center justify-between">
                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                        <Trash2 className="w-4 h-4" /> Delete Task
                    </button>
                    <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-white bg-slate-800 hover:bg-slate-900 rounded-lg transition-colors shadow-sm">
                        Done
                    </button>
                </div>
            </div>
            {showDeleteConfirm && (
                <DeleteConfirmationModal
                    title="Delete Task?"
                    message={`Are you sure you want to delete "${task.name}"? This action cannot be undone.`}
                    onClose={() => setShowDeleteConfirm(false)}
                    onConfirm={handleDelete}
                />
            )}
        </div>
    );
}