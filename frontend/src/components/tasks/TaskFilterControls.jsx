import React from 'react';
import { Filter, ArrowDownUp } from 'lucide-react';

const TaskFilterControls = ({ filter, setFilter, sort, setSort }) => {
    return (
        <div className="flex items-center gap-2 sm:gap-4 bg-slate-800/50 p-1.5 rounded-lg border border-slate-700 text-sm">
            <div className="flex items-center gap-1 sm:gap-2">
                <Filter className="text-orange-400" size={16}/>
                <select value={filter} onChange={e => setFilter(e.target.value)} className="bg-slate-800 rounded p-1 focus:outline-none focus:ring-1 focus:ring-orange-500">
                    <option value="all" className="bg-slate-800">All</option>
                    <option value="completed" className="bg-slate-800">Completed</option>
                    <option value="pending" className="bg-slate-800">Pending</option>
                </select>
            </div>
             <div className="flex items-center gap-1 sm:gap-2">
                <ArrowDownUp className="text-blue-400" size={16}/>
                <select value={sort} onChange={e => setSort(e.target.value)} className="bg-slate-800 rounded p-1 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="time" className="bg-slate-800">Sort by Time</option>
                    <option value="name" className="bg-slate-800">Sort by Name</option>
                </select>
            </div>
        </div>
    );
};
export default TaskFilterControls;