import React, { useState, useContext, useEffect, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/common/Header';
import AccountSettingsPage from './AccountSettingsPage';
import api from '../services/api';
import TaskView from '../components/tasks/TaskView';
import BMIModal from '../components/common/BMIModal';
import Footer from '../components/common/Footer';

const DashboardPage = () => {
    const { user } = useContext(AuthContext);
    const [activeView, setActiveView] = useState('dashboard');
    const [tasks, setTasks] = useState({ workouts: [], meals: [] });
    const [loadingTasks, setLoadingTasks] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showBmiModal, setShowBmiModal] = useState(false);

    const fetchTasks = useCallback(async (date) => {
        setLoadingTasks(true);
        try {
            const dateString = date.toISOString().split('T')[0];
            const [workoutsRes, mealsRes] = await Promise.all([
                api.get(`/workouts?date=${dateString}`),
                api.get(`/meals?date=${dateString}`)
            ]);
            setTasks({
                workouts: workoutsRes.data.data,
                meals: mealsRes.data.data
            });
        } catch (error) {
            console.error("Failed to fetch tasks", error);
        } finally {
            setLoadingTasks(false);
        }
    }, []);

    useEffect(() => {
        if (activeView === 'dashboard') {
            fetchTasks(selectedDate);
        }
    }, [selectedDate, fetchTasks, activeView]);

    const renderActiveView = () => {
        switch (activeView) {
            case 'dashboard':
                return <TaskView tasks={tasks} loading={loadingTasks} date={selectedDate} onRefresh={() => fetchTasks(selectedDate)} />;
            case 'settings':
                return <AccountSettingsPage />;
            default:
                return <TaskView tasks={tasks} loading={loadingTasks} date={selectedDate} onRefresh={() => fetchTasks(selectedDate)} />;
        }
    };

    if (!user) return null;

    return (
        <div className="relative min-h-screen w-full">
            <video 
                src="/banner.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            />
            <div className="absolute inset-0 bg-black/60 z-10"></div>
            
            <div className="relative z-20 flex flex-col min-h-screen">
                <Header user={user} setActiveView={setActiveView} />
                
                <div className="flex-grow">
                    <div className="container mx-auto p-4 max-w-7xl">
                        <main className="mt-8">
                            {activeView === 'dashboard' && (
                                <>
                                    <div className="text-center py-8 md:py-16">
                                        <div className="inline-block bg-black/20 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-white/10">
                                            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                                                Welcome, <br className="sm:hidden" />
                                                <span className="text-orange-400">{user.name}!</span>
                                            </h1>
                                            <p className="mt-4 text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
                                                Welcome to your personal fitness command center, where every rep, every meal, and every goal is tracked with purpose. Plan your workouts, organize your meals, stay consistent, and crush your health goals with clarity and control
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                                        <button 
                                            onClick={() => setShowBmiModal(true)}
                                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition-colors w-full sm:w-auto"
                                        >
                                            Calculate My BMI
                                        </button>
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-300">Date:</span>
                                            <input 
                                                type="date"
                                                value={selectedDate.toISOString().split('T')[0]}
                                                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                                                className="bg-slate-800/70 p-2 rounded-lg border border-slate-600 text-white"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                            {renderActiveView()}
                        </main>
                    </div>
                </div>
                
                <Footer />
            </div>
            {showBmiModal && <BMIModal onClose={() => setShowBmiModal(false)} />}
        </div>
    );
};
export default DashboardPage;
