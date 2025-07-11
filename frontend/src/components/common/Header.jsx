import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Flame, LogOut, Settings, LayoutDashboard, Dot } from 'lucide-react';

const Header = ({ user, setActiveView }) => {
    const { setToken } = useContext(AuthContext);
    const [activeButton, setActiveButton] = React.useState('dashboard');

    const handleNavClick = (view) => {
        setActiveButton(view);
        setActiveView(view);
    };

    return (
        <header className="relative z-40 p-4">
            <div className="flex items-center justify-between max-w-7xl mx-auto gap-4">
                {/* Logo and Mobile User Info */}
                <div className="flex items-center justify-between w-full sm:w-auto">
                    <div className="flex items-center gap-2">
                        <Flame className="w-12 h-12 text-orange-500" />
                        <span className="font-bold text-3xl text-white">FitTrack</span>
                    </div>
                    {/* Mobile-only user/logout block */}
                    <div className="flex sm:hidden items-center gap-2">
                        
                        <button onClick={() => setToken(null)} className="flex items-center text-gray-400 hover:text-red-500 transition-colors p-2 bg-black/20 rounded-lg">
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                
                {/* Centered Navigation */}
                <nav className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md p-2 rounded-full border border-gray-800">
                        <NavButton label="Dashboard" icon={<LayoutDashboard size={16} />} isActive={activeButton === 'dashboard'} onClick={() => handleNavClick('dashboard')} />
                        <NavButton label="Settings" icon={<Settings size={16} />} isActive={activeButton === 'settings'} onClick={() => handleNavClick('settings')} />
                    </div>
                </nav>

                {/* Desktop-only User Info */}
                <div className="hidden sm:flex items-center gap-4">
                     <div className="flex items-center gap-3 text-right">
                       
                        <span className="text-large font-bold text-white">{user.name}</span>
                    </div>
                    <button onClick={() => setToken(null)} className="flex items-center text-gray-400 hover:text-red-500 transition-colors p-2 bg-black/20 rounded-lg">
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>
             {/* Mobile-only Navigation */}
             <nav className="mt-4 sm:hidden">
                <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md p-2 rounded-full border border-gray-800">
                    <NavButton label="Dashboard" icon={<LayoutDashboard size={16} />} isActive={activeButton === 'dashboard'} onClick={() => handleNavClick('dashboard')} />
                    <NavButton label="Settings" icon={<Settings size={16} />} isActive={activeButton === 'settings'} onClick={() => handleNavClick('settings')} />
                </div>
            </nav>
        </header>
    );
};

const NavButton = ({ label, icon, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex-1 sm:flex-none flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ease-in-out ${
            isActive ? 'bg-orange-500 text-white' : 'text-gray-300 hover:bg-gray-800'
        }`}
    >
        {icon}
        <span>{label}</span>
    </button>
);

export default Header;