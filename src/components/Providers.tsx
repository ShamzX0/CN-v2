'use client';

import '@rainbow-me/rainbowkit/styles.css';
import {
    darkTheme,
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
    mainnet,
    sepolia,
} from 'wagmi/chains';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";
import Moralis from "moralis";
import ModalDetector from '../components/Modal/ModalDetector';

const config = getDefaultConfig({
    appName: 'CN-V2',
    projectId: 'b484a6d745f59bf0fc555e0d347124de',
    chains: [mainnet, sepolia],
    ssr: true,
});

const queryClient = new QueryClient();

Moralis.start({ apiKey: process.env.NEXT_PUBLIC_API_KEY });

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider
                    coolMode={true}
                    modalSize='compact'
                    theme={darkTheme({
                        accentColor: '',
                        accentColorForeground: '#51b7cb',
                        borderRadius: 'large',
                        fontStack: 'system',
                        overlayBlur: 'large',
                    })}
                    initialChain={mainnet}
                >
                    <ModalDetector />
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}