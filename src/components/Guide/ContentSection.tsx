import React from 'react';

interface ContentSectionProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
}

/**
 * A reusable content section component for guide pages
 * @param title - Optional title for the section
 * @param children - The content to be displayed
 * @param className - Additional CSS classes to apply
 */
const ContentSection = ({ title, children, className = '' }: ContentSectionProps) => (
    <section className={`mb-8 ${className}`}>
        {title && (
            <h2 className="text-2xl font-bold mb-4 text-white">
                {title}
            </h2>
        )}
        <div className="text-gray-400">
            {children}
        </div>
    </section>
);

export default ContentSection; 