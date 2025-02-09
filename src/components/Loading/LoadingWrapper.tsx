'use client'

import { useState, useEffect } from 'react'
import Loading from '@/components/Loading/Loading'

interface LoadingWrapperProps {
    children: React.ReactNode
}

export function LoadingWrapper({ children }: LoadingWrapperProps) {
    const [isMinLoadingComplete, setIsMinLoadingComplete] = useState(false)
    const [isDataLoaded, setIsDataLoaded] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMinLoadingComplete(true)
        }, 4200)

        return () => clearTimeout(timer)
    }, [])

    // Listen for data loading completion
    useEffect(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && !mutation.target.textContent?.includes('Loading')) {
                    setIsDataLoaded(true)
                    observer.disconnect()
                }
            })
        })

        // Start observing the document for data loading completion
        observer.observe(document.body, {
            childList: true,
            subtree: true
        })

        return () => observer.disconnect()
    }, [])

    // Only hide loading when both conditions are met
    if (!isMinLoadingComplete || !isDataLoaded) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loading />
            </div>
        )
    }

    return <>{children}</>
}