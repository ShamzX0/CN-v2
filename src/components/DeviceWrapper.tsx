'use client'

import { useState, useEffect } from 'react'
import { isMobile, isTablet } from 'react-device-detect'

const MobileMessage = () => (
    <div className="min-h-screen flex items-center justify-center px-2">
        <div className="text-center bg-slate-800 p-6 rounded-lg shadow-lg max-w-md">
            <h1 className="text-xl font-bold text-white mb-4">Desktop Only</h1>
            <p className="text-slate-300 text-sm">
                Sorry, this application is designed for desktop viewing only. Please access it from a desktop computer for the best experience.
            </p>
        </div>
    </div>
)

interface DeviceWrapperProps {
    children: React.ReactNode
}

export default function DeviceWrapper({ children }: DeviceWrapperProps) {
    const [isNonDesktop, setIsNonDesktop] = useState(false);

    useEffect(() => {
        setIsNonDesktop(isMobile || isTablet);
    }, []);

    if (isNonDesktop) {
        return <MobileMessage />;
    }

    return <>{children}</>;
}