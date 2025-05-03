import Image from 'next/image';
import { useState, useEffect } from 'react';

interface CoinHeaderProps {
    rank: number;
    imageUrl?: string;
    name: string;
    symbol: string;
}

export default function CoinHeader({ rank, imageUrl, name, symbol }: CoinHeaderProps) {
    const [imgSrc, setImgSrc] = useState(imageUrl || '');
    const [imgError, setImgError] = useState(false);
    const fallbackSrc = '/images/CNlogoMini.png';

    useEffect(() => {
        if (imageUrl) {
            setImgSrc(imageUrl);
            setImgError(false);
        }
    }, [imageUrl]);

    return (
        <div className="flex items-center gap-2">
            <div className='italic bg-slate-700 p-1 rounded-md'>
                #{rank}
            </div>
            <div className="w-10 h-10 bg-gray-800 rounded-full">
                {imageUrl ? (
                    <Image
                        src={imgError ? fallbackSrc : imgSrc}
                        alt={name}
                        width={64}
                        height={64}
                        className="rounded-full"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <span className="text-2xl">{symbol.charAt(0)}</span>
                )}
            </div>
            <div className='flex space-x-2'>
                <h1 className="text-3xl font-bold">{name}</h1>
            </div>
        </div>
    );
} 