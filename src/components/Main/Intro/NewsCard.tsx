import { ArrowBigDown, ArrowBigUp, ArrowDown, ArrowUp, Clock, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

interface NewsItem {
    domain: string;
    url: string;
    published_at: string;
    title: string;
}

const NewsCard = ({ news, index }: { news: NewsItem; index: number }) => {
    const [upvotes, setUpvotes] = useState(0);
    const [downvotes, setDownvotes] = useState(0);
    const [hasUpvoted, setHasUpvoted] = useState(false);
    const [hasDownvoted, setHasDownvoted] = useState(false);


    if (news.domain === 'youtube.com') return null;
    if (index > 4) return null;

    const generateRandomVote = () => {
        return Math.floor(Math.random() * (12 - 1 + 1)) + 3;
    };

    const handleUpvote = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!hasUpvoted) {
            setUpvotes(prev => prev + 1);
            setHasUpvoted(true);
        }
    };

    const handleDownvote = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!hasDownvoted) {
            setDownvotes(prev => prev - 1);
            setHasDownvoted(true);
        }
    };


    useEffect(() => {
        setUpvotes(generateRandomVote());
        setDownvotes(generateRandomVote());
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor(diff / (1000 * 60));

        if (hours > 0) {
            return `${hours}h ago`;
        }
        return `${minutes}m ago`;
    };

    return (
        <a
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:bg-[#24385d] transition-colors duration-200 py-[2px] px-3 rounded-lg"
        >
            <div className="opacity-90 hover:opacity-100 hover:brightness-125">
                <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-1">
                        <span className="bg-[#ff7301ce] px-2 rounded">
                            {news.domain}
                        </span>
                        <Clock size={12} />
                        <span className="text-[9px]">{formatDate(news.published_at)}</span>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="flex items-center pr-3 rounded w-[60px]">
                            <ArrowBigUp
                                size={26}
                                strokeWidth={3}
                                className={`scale-[0.5] ${hasUpvoted ? 'text-green-700' : 'text-green-500 hover:scale-[0.65] cursor-pointer'}`}
                                onClick={handleUpvote}
                            />
                            <span className="ml-[-6px] text-[9px]">{upvotes}</span>
                            <div className="mx-[2px]" />
                            <ArrowBigDown
                                size={26}
                                strokeWidth={3}
                                className={`scale-[0.5] ${hasDownvoted ? 'text-red-700' : 'text-red-500 hover:scale-[0.65] cursor-pointer'}`}
                                onClick={handleDownvote}
                            />
                            <span className="ml-[-6px] text-[9px]">{downvotes}</span>
                        </div>
                        <ExternalLink size={16} className="text-gray-400" />
                    </div>
                </div>
                <p className="text-xs text-gray-200">
                    {news.title}
                </p>
            </div>
        </a>
    );
};

export default NewsCard;

