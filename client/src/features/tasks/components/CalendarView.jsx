import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { TASK_STATUS } from '../constants';

export const CalendarView = ({ tasks, onViewTask, onToggleComplete }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Generate days for the current month view
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay(); // 0 = Sunday, 1 = Monday...
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  // Group tasks by date string YYYY-MM-DD
  const tasksByDate = tasks.reduce((acc, task) => {
    if (!task.dueDate) return acc;
    const d = new Date(task.dueDate);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(task);
    return acc;
  }, {});

  const renderCells = () => {
    const cells = [];
    
    // Empty cells before the 1st of the month
    for (let i = 0; i < firstDay; i++) {
      cells.push(
        <div key={`empty-${i}`} className="min-h-[100px] sm:min-h-[120px] p-2 bg-slate-50/50 dark:bg-slate-900/20 border-r border-b border-slate-200 dark:border-slate-800"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayTasks = tasksByDate[dateStr] || [];

      cells.push(
        <div key={day} className={`min-h-[100px] sm:min-h-[120px] p-1 sm:p-2 border-r border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors hover:bg-slate-50 dark:hover:bg-slate-900`}>
          <div className="flex justify-between items-start mb-1">
            <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full text-xs font-medium ${isToday(day) ? 'bg-indigo-600 text-white' : 'text-slate-700 dark:text-slate-300'}`}>
              {day}
            </span>
            {dayTasks.length > 0 && (
              <span className="text-[10px] font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-sm">
                {dayTasks.length}
              </span>
            )}
          </div>
          
          <div className="space-y-1 overflow-y-auto max-h-[80px] sm:max-h-[100px] pr-1 custom-scrollbar">
            {dayTasks.map(task => {
              const completed = task.status === TASK_STATUS.COMPLETED;
              // Add red border if overdue and not completed
              const isOverdue = !completed && new Date(task.dueDate) < new Date();
              
              return (
                <div 
                  key={task.id}
                  onClick={(e) => { e.stopPropagation(); onViewTask(task); }}
                  className={`text-xs p-1 sm:p-1.5 rounded truncate cursor-pointer flex items-center gap-1.5 group transition-colors ${
                    completed 
                      ? 'bg-slate-100 text-slate-500 dark:bg-slate-800/50 dark:text-slate-400 line-through' 
                      : isOverdue
                        ? 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/50'
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/40'
                  }`}
                  title={task.title}
                >
                  <button 
                    onClick={(e) => { e.stopPropagation(); onToggleComplete(task.id); }}
                    className="flex-shrink-0 opacity-70 hover:opacity-100 focus:outline-none"
                  >
                    {completed ? (
                      <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-500" />
                    ) : (
                      <Circle className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    )}
                  </button>
                  <span className="truncate">{task.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return cells;
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Calendar Header */}
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>Today</Button>
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-md p-1 border border-slate-200 dark:border-slate-700">
            <button onClick={prevMonth} className="p-1 rounded text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-700 transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={nextMonth} className="p-1 rounded text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-700 transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
        {daysOfWeek.map(day => (
          <div key={day} className="py-2 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider border-r border-slate-200 dark:border-slate-800 last:border-r-0">
            <span className="hidden sm:inline">{day}</span>
            <span className="sm:hidden">{day.charAt(0)}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 border-l border-t border-slate-200 dark:border-slate-800">
        {renderCells()}
      </div>
    </div>
  );
};
