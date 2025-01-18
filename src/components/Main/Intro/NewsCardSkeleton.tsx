const NewsCardSkeleton = () => {
    return (
        <div className="block py-3 px-3 rounded-lg animate-pulse">
            <div className="flex items-start">
                <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="bg-[#1a2842] h-6 w-24 rounded"></div>
                        <div className="flex items-center gap-1">
                            <div className="bg-[#1a2842] h-4 w-16 rounded"></div>
                        </div>
                    </div>
                    <div className="h-2 bg-[#1a2842] rounded w-full"></div>
                    <div className="h-2 bg-[#1a2842] rounded w-3/4 mt-2"></div>
                </div>
                <div className="w-4 h-4 bg-[#1a2842] rounded mt-1 flex-shrink-0"></div>
            </div>
        </div>
    );
};

export default NewsCardSkeleton;