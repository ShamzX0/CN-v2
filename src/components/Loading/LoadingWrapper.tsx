'use client'

import { useState, useEffect } from 'react'
import Loading from '@/components/Loading/Loading'

interface LoadingWrapperProps {
    children: React.ReactNode
}

export function LoadingWrapper({ children }: LoadingWrapperProps) {
    const [showLoading, setShowLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoading(false)
        }, 5000)

        return () => clearTimeout(timer)
    }, [])

    if (showLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loading />
            </div>
        )
    }

    return <>{children}</>
}
