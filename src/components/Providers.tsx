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
    polygon,
    optimism,
    arbitrum,
    base,
} from 'wagmi/chains';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
    appName: 'CN-V2',
    projectId: 'b484a6d745f59bf0fc555e0d347124de', // WalletConnect Cloud ID
    chains: [mainnet, polygon, optimism, arbitrum],
    ssr: true,
});


const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider
                    theme={darkTheme({
                        accentColor: '',
                        accentColorForeground: '#61d9f1',
                        borderRadius: 'none',
                        fontStack: 'system',
                        overlayBlur: 'small',

                    })}
                >
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}

