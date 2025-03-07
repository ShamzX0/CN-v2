import React from 'react';

interface NewsSkeletonProps {
    count?: number;
}

const NewsSkeleton: React.FC<NewsSkeletonProps> = ({ count = 5 }) => {
    return (
        <div className="space-y-1">
            {[...Array(count)].map((_, index) => (
                <div key={index} className="bg-navy-800 rounded-xl p-2 animate-pulse">
                    <div className="flex justify-between mb-1">
                        <div className='flex gap-2'>
                            <div className="h-4 w-20 bg-slate-700 rounded-xl"></div>
                            <div className="flex items-center">
                                <div className="h-4 w-4 bg-slate-700 rounded-full mr-1"></div>
                                <div className="h-4 w-32 bg-slate-700 rounded-xl"></div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="h-4 w-8 bg-slate-700 rounded-xl"></div>
                            <div className="h-4 w-8 bg-slate-700 rounded-xl"></div>
                            <div className="h-4 w-4 bg-slate-700 rounded-xl"></div>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="h-4 w-full bg-slate-700 rounded-xl"></div>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default NewsSkeleton;