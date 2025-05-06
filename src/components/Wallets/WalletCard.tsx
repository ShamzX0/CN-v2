import Image from 'next/image';
import { ShieldMinus, ShieldPlus } from 'lucide-react';
import Link from 'next/link';

interface WalletCardProps {
    wallet: {
        name: string;
        rank: string;
        description: string;
        pros: string;
        cons: string;
        price: number;
        rating: number;
        link: string;
    };
    imageSrc: any;
}

const WalletCard = ({ wallet, imageSrc }: WalletCardProps) => {
    return (
        <div className="space-y-10 bg-gray-800/30 rounded-xl p-8">
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-4">
                    <span className="text-[#208282]">{wallet.rank}</span>
                    <span className="border-l-4 border-[#208282] pl-4 italic">
                        {wallet.name} Hardware Wallet
                    </span>
                </h3>

                <div className="flex justify-center">
                    <Image
                        src={imageSrc}
                        alt={`${wallet.name} device`}
                        width={400}
                        height={10}
                        className="rounded-lg"
                    />
                </div>
            </div>

            <div className="space-y-8 text-gray-400">
                <p className="text-lg leading-relaxed">
                    {wallet.description}
                </p>

                {/* Pros */}
                <div className="p-6 bg-gray-800/50 rounded-lg space-y-4">
                    <div className="flex items-center gap-2 text-2xl text-green-500 font-semibold">
                        <ShieldPlus />
                        <span>Positives</span>
                    </div>
                    <p className="text-lg leading-relaxed">
                        {wallet.pros}
                    </p>
                </div>

                {/* Cons */}
                <div className="p-6 bg-gray-800/50 rounded-lg space-y-4">
                    <div className="flex items-center gap-2 text-2xl text-red-400 font-semibold">
                        <ShieldMinus />
                        <span>Negatives</span>
                    </div>
                    <p className="text-lg leading-relaxed">
                        {wallet.cons}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WalletCard; 