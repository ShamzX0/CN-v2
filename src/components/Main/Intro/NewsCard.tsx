import { Clock, ExternalLink } from "lucide-react";

const NewsCard = ({ news, index }: { news: NewsItem; index: number }) => {
    if (news.domain === 'youtube.com') return null;
    if (index > 4) return null;

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
            className="block hover:bg-[#1a2842] transition-colors duration-200 py-1 px-3 rounded-lg"
        >
            <div className="flex items-start my-[2px]">
                <div className="flex-grow opacity-80 hover:opacity-100">
                    <div className="flex items-center gap-1 text-[#f4f4f4] mb-1">
                        <span className="bg-[#ff862a] text-xs px-2 rounded">
                            {news.domain}
                        </span>
                        <div className="flex items-center gap-1">
                            <Clock size={12} />
                            <span className="text-[10px]">{formatDate(news.published_at)}</span>
                        </div>
                    </div>
                    <p className="text-xs text-gray-200 line-clamp-2">
                        {news.title}
                    </p>
                </div>
                <ExternalLink size={16} className="text-gray-400 mt-1 flex-shrink-0" />
            </div>
        </a>
    );
};
export default NewsCard