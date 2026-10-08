import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const projectColors = {
    'Capstone 2': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Advanced Web Final Project': 'bg-rose-100 text-rose-700 border-rose-200',
    NexusHive: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Coral Way Street Journal': 'bg-blue-100 text-blue-700 border-blue-200'
};

export default function Calendar({ tasks = [], searchQuery = '', filterProject = 'All', onTaskClick }) {
    const [currentDate, setCurrentDate] = useState(new Date(2026, 9, 1));

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
    const goToToday = () => setCurrentDate(new Date());

    const getTasksForDate = (day) => {
        if (!day) return [];

        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const normalizedSearchQuery = searchQuery.toLowerCase();

        return tasks.filter(task => {
            if (filterProject !== 'All' && task.project !== filterProject) {
                return false;
            }

            if (normalizedSearchQuery && !task.name.toLowerCase().includes(normalizedSearchQuery)) {
                return false;
            }

            if (task.startDate && task.dueDate) {
                return dateStr >= task.startDate && dateStr <= task.dueDate;
            }
            if (task.dueDate) return dateStr === task.dueDate;
            if (task.startDate) return dateStr === task.startDate;
            return false;
        });
    };

    const calendarGrid = Array.from({ length: firstDayOfMonth }, () => null)
        .concat(Array.from({ length: daysInMonth }, (_, index) => index + 1));
    const paddingCells = calendarGrid.length % 7 === 0 ? 0 : 7 - (calendarGrid.length % 7);
    const fullGrid = [
        ...calendarGrid,
        ...Array.from({ length: paddingCells }, () => null)
    ];
    const weekCount = fullGrid.length / 7;

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-slate-800">
                        {monthNames[month]} {year}
                    </h1>
                    <button
                        onClick={goToToday}
                        className="px-3 py-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors"
                    >
                        Today
                    </button>
                </div>
                <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
                    <button onClick={prevMonth} className="p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 rounded-md transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={nextMonth} className="p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 rounded-md transition-colors">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[calc(100vh-270px)] min-h-[360px] lg:h-[calc(100vh-220px)] lg:min-h-[500px]">
                <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
                    {daysOfWeek.map(day => (
                        <div key={day} className="py-2 sm:py-3 text-center text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            {day}
                        </div>
                    ))}
                </div>

                <div
                    className="flex-1 grid grid-cols-7 min-h-0"
                    style={{ gridTemplateRows: `repeat(${weekCount}, minmax(0, 1fr))` }}
                >
                    {fullGrid.map((day, index) => {
                        const dayTasks = getTasksForDate(day);
                        const today = new Date();
                        const isToday = day &&
                            today.getDate() === day &&
                            today.getMonth() === month &&
                            today.getFullYear() === year;

                        return (
                            <div
                                key={index}
                                className={`border-b border-r border-slate-100 p-1 sm:p-2 relative transition-colors ${!day ? 'bg-slate-50/50' : 'hover:bg-slate-50/30'} ${index % 7 === 6 ? 'border-r-0' : ''}`}
                            >
                                {day && (
                                    <>
                                        <div className="flex justify-between items-start mb-1.5">
                                            <span className={`text-xs sm:text-sm font-medium w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-600'}`}>
                                                {day}
                                            </span>
                                        </div>

                                        <div className="space-y-0.5 sm:space-y-1 mt-1 sm:mt-2 max-h-[45px] sm:max-h-[85px] overflow-hidden sm:overflow-y-auto custom-scrollbar pr-0 sm:pr-1">
                                            {dayTasks.map(task => {
                                                const colorClass = projectColors[task.project] || 'bg-slate-100 text-slate-700 border-slate-200';
                                                return (
                                                    <div
                                                        key={task.id}
                                                        onClick={() => onTaskClick?.(task)}
                                                        className={`text-[8px] sm:text-[10px] font-medium px-1 sm:px-2 py-0.5 sm:py-1 rounded truncate border cursor-pointer hover:brightness-95 transition-all ${colorClass}`}
                                                        title={task.name}
                                                    >
                                                        {task.name}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
