// utils.api.ts
const API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;

export const fetchCoinGeckoData = async () => {
    const headers = {
        'x-cg-demo-api-key': API_KEY || '',
        'accept': 'application/json'
    };

    try {
        const [globalData, trendingCoins, bitcoin] = await Promise.all([
            fetch('https://api.coingecko.com/api/v3/global', { headers }).then(res => res.json()),
            fetch('https://api.coingecko.com/api/v3/search/trending', { headers }).then(res => res.json()),
            fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true', { headers }).then(res => res.json())
        ]);

        console.log('Global Data:', globalData);
        console.log('Trending:', trendingCoins);
        console.log('Bitcoin:', bitcoin);

        return {
            globalData,
            trendingCoins,
            bitcoinData: bitcoin
        };
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};