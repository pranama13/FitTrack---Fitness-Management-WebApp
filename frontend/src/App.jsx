import React from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import LoadingSpinner from './components/common/LoadingSpinner';
import Toast from './components/common/Toast';

function App() {
    return (
        <AuthProvider>
            <ToastProvider>
                <div className="bg-slate-900 min-h-screen text-white font-sans antialiased">
                    <MainContent />
                    <Toast />
                </div>
            </ToastProvider>
        </AuthProvider>
    );
}

function MainContent() {
    const { token, loading, user } = React.useContext(AuthContext);
    const isLoading = loading || (token && !user);

    return (
        <>
            {token ? <DashboardPage /> : <AuthPage />}
            {isLoading && <LoadingSpinner />}
        </>
    );
}

export default App;