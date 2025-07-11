import React from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckCircle, XCircle } from 'lucide-react';

const Toast = () => {
    const { toast } = useToast();
    if (!toast.show) return null;

    const successClasses = 'bg-green-600 border-green-700';
    const errorClasses = 'bg-red-600 border-red-700';

    return (
        <div 
            className={`fixed bottom-5 right-5 flex items-center gap-4 p-4 rounded-lg border text-white shadow-2xl transition-transform transform ${toast.show ? 'translate-x-0' : 'translate-x-[calc(100%+2rem)]'} ${toast.type === 'success' ? successClasses : errorClasses}`}
        >
            {toast.type === 'success' ? <CheckCircle /> : <XCircle />}
            <span>{toast.message}</span>
        </div>
    );
};

export default Toast;