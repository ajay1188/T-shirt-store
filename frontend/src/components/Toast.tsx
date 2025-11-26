"use client";

import { motion } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useEffect } from "react";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
    message: string;
    type: ToastType;
    id: string;
    onDismiss: (id: string) => void;
}

export default function Toast({ message, type, id, onDismiss }: ToastProps) {
    const icons = {
        success: <CheckCircle className="h-5 w-5 text-green-500" />,
        error: <AlertCircle className="h-5 w-5 text-red-500" />,
        info: <Info className="h-5 w-5 text-blue-500" />,
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss(id);
        }, 5000);

        return () => clearTimeout(timer);
    }, [id, onDismiss]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="flex items-center w-full max-w-sm bg-white border border-gray-100 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
        >
            <div className="p-4 flex items-start">
                <div className="flex-shrink-0">{icons[type]}</div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">{message}</p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                    <button
                        className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => onDismiss(id)}
                    >
                        <span className="sr-only">Close</span>
                        <X className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
