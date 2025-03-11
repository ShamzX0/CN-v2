'use client';
import React, { useState, useRef, useEffect } from 'react';
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";

interface TooltipProps {
    tooltipText: string;
    className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ tooltipText, className = "" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState<{ top?: boolean, right?: boolean, bottom?: boolean, left?: boolean }>({ bottom: true });
    const tooltipRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isVisible && tooltipRef.current && iconRef.current) {
            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            const iconRect = iconRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // Check horizontal position - if tooltip would be off-screen to the left or right
            const isOffscreenRight = iconRect.left + (tooltipRect.width / 2) > viewportWidth;
            const isOffscreenLeft = iconRect.left - (tooltipRect.width / 2) < 0;

            // Check vertical position - if tooltip would be off-screen to the top
            const isOffscreenTop = iconRect.top - tooltipRect.height < 0;

            const newPosition = {
                bottom: !isOffscreenTop,
                top: isOffscreenTop,
                right: isOffscreenLeft,
                left: isOffscreenRight
            };

            setPosition(newPosition);
        }
    }, [isVisible]);

    const getPositionClasses = () => {
        let classes = "absolute z-10 w-64 p-3 text-[10px] bg-gray-800 text-gray-200 rounded-md shadow-lg ";

        if (position.bottom) {
            classes += "bottom-full mb-2 ";
        } else if (position.top) {
            classes += "top-full mt-2 ";
        }

        if (position.right) {
            classes += "left-0 ";
        } else if (position.left) {
            classes += "right-0 ";
        } else {
            classes += "-translate-x-1/2 left-1/2 ";
        }

        return classes;
    };

    return (
        <div className="relative inline-block">
            <div
                ref={iconRef}
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                className={`cursor-help ${className}`}
            >
                <HiOutlineQuestionMarkCircle className="w-3 h-3 text-gray-400" />
            </div>

            {isVisible && (
                <div
                    ref={tooltipRef}
                    className={getPositionClasses()}
                >
                    <div dangerouslySetInnerHTML={{ __html: tooltipText.replace(/\n/g, '<br />') }} />
                </div>
            )}
        </div>
    );
};

export default Tooltip;