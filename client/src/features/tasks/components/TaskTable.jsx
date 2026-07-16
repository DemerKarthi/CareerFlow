import React from 'react';
import { MoreHorizontal, Edit, Trash2, Eye, Calendar as CalendarIcon, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { TaskStatusBadge, TaskPriorityBadge, TaskTypeBadge } from './TaskBadges';
import { TASK_STATUS } from '../constants';

export const TaskTable = ({ tasks, onEdit, onDelete, onView, onToggleComplete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return '—';
    // If it's overdue and not completed, maybe highlight it? We'll just show the date for now.
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const isCompleted = (status) => status === TASK_STATUS.COMPLETED;

  if (!tasks || tasks.length === 0) return null;

  const DesktopView = () => (
    <div className="hidden md:block overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="w-12 px-4 py-4"></th>
              <th className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">Task</th>
              <th className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">Context</th>
              <th className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">Due Date</th>
              <th className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">Priority</th>
              <th className="px-6 py-4 font-medium text-slate-900 dark:text-slate-200">Status</th>
              <th className="px-6 py-4 font-medium text-right text-slate-900 dark:text-slate-200">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {tasks.map((task) => (
              <tr key={task.id} className={`transition-colors ${isCompleted(task.status) ? 'bg-slate-50/50 dark:bg-slate-900/20' : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/50'}`}>
                <td className="px-4 py-4 text-center">
                  <button 
                    onClick={() => onToggleComplete(task.id)}
                    className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus:outline-none"
                    aria-label={isCompleted(task.status) ? "Mark as pending" : "Mark as completed"}
                  >
                    {isCompleted(task.status) ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className={`font-medium cursor-pointer hover:text-indigo-600 transition-colors ${isCompleted(task.status) ? 'text-slate-500 line-through' : 'text-slate-900 dark:text-white'}`} onClick={() => onView(task)}>
                    {task.title}
                  </div>
                  <div className="mt-1">
                    <TaskTypeBadge type={task.taskType} />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-900 dark:text-slate-200">
                    {task.application?.company?.companyName || '—'}
                  </div>
                  <div className="text-xs text-slate-500">
                    {task.application?.jobTitle || ''}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className={`flex items-center gap-1.5 text-sm ${
                    !isCompleted(task.status) && task.dueDate && new Date(task.dueDate) < new Date() 
                      ? 'text-red-600 dark:text-red-400 font-medium' 
                      : 'text-slate-600 dark:text-slate-400'
                  }`}>
                    <CalendarIcon className="h-3.5 w-3.5" />
                    {formatDate(task.dueDate)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <TaskPriorityBadge priority={task.priority} />
                </td>
                <td className="px-6 py-4">
                  <TaskStatusBadge status={task.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView(task)}>
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(task)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(task)} className="text-red-600 focus:text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const MobileView = () => (
    <div className="grid grid-cols-1 gap-4 md:hidden">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`rounded-lg border p-4 shadow-sm ${
            isCompleted(task.status) 
              ? 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20' 
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950'
          }`}
          onClick={() => onView(task)}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <button 
                onClick={(e) => { e.stopPropagation(); onToggleComplete(task.id); }}
                className="mt-0.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none"
              >
                {isCompleted(task.status) ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                ) : (
                  <Circle className="h-5 w-5" />
                )}
              </button>
              <div>
                <h3 className={`font-medium ${isCompleted(task.status) ? 'text-slate-500 line-through' : 'text-slate-900 dark:text-white'}`}>
                  {task.title}
                </h3>
                {task.application && (
                  <p className="text-sm text-slate-500 mt-0.5">
                    {task.application.company?.companyName} • {task.application.jobTitle}
                  </p>
                )}
              </div>
            </div>
            <div onClick={(e) => e.stopPropagation()}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onView(task)}>
                    <Eye className="mr-2 h-4 w-4" /> View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEdit(task)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(task)} className="text-red-600 focus:text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <TaskStatusBadge status={task.status} />
            <TaskPriorityBadge priority={task.priority} />
            <TaskTypeBadge type={task.taskType} />
          </div>

          <div className={`mt-3 flex items-center gap-1.5 text-sm ${
            !isCompleted(task.status) && task.dueDate && new Date(task.dueDate) < new Date() 
              ? 'text-red-600 dark:text-red-400 font-medium' 
              : 'text-slate-600 dark:text-slate-400'
          }`}>
            <CalendarIcon className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">{formatDate(task.dueDate)}</span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <DesktopView />
      <MobileView />
    </>
  );
};
