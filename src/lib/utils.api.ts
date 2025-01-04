import { dummyData } from "@/helpers/dummyData";
import { CryptopanicNewsData } from "./types";

const API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;

export const fetchCoinGeckoData = async (page: number) => {
    const headers = {
        'x-cg-demo-api-key': API_KEY || '',
        'accept': 'application/json'
    };

    try {
        const [globalData, trendingCoins, bitcoin, tableData] = await Promise.all([
            fetch('https://api.coingecko.com/api/v3/global', { headers }).then(res => res.json()),
            fetch('https://api.coingecko.com/api/v3/search/trending', { headers }).then(res => res.json()),
            fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true', { headers }).then(res => res.json()),
            fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${page}&sparkline=true&price_change_percentage=1h,24h,7d&locale=en`, { headers }).then(res => res.json())
        ]);

        return {
            globalData,
            trendingCoins,
            bitcoinData: bitcoin,
            tableData
        };
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

export const getFearGreedIndex = async () => {
    try {
        const response = await fetch('https://api.alternative.me/fng/?limit=1');
        const json = await response.json();
        return json.data[0];
    } catch (error) {
        console.error('Error fetching Fear & Greed Index:', error);
        return null;
    }
};
export const fetchCryptoPanicNews = async () => {
    const CRYPTOPANIC_API_KEY = process.env.NEXT_PUBLIC_CRYPTOPANIC_API_KEY; // Ensure it's loaded here
    const url = 'https://cryptopanic.com/api/v1/posts/?auth_token=add107fcd8027e1359adcba401377ac5174e859a&public=true';
    // const params = new URLSearchParams({
    //   auth_token: CRYPTOPANIC_API_KEY || '',
    //   public: 'true',
    // });
  
    try {
    //   const response = await fetch(`${url}`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });

    const response = await fetch(url)
  
      if (!response.ok) {
        console.error('API fetch error');
      }
  
      const data = await response.json();

      return data.results as CryptopanicNewsData
    } catch (error) {
      console.error('Error fetching crypto news:', error);
      return [];
    }
  };
  console.log(process.env.NEXT_PUBLIC_CRYPTOPANIC_API_KEY, 'from utils.api.ts');
  