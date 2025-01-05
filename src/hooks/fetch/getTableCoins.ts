import { dummyData } from "@/helpers/dummyData"

export default async function getTableCoins(): Promise<any> {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h,24h,7d&locale=en')
  
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      
      return response.json()
    } catch (error) {
      console.error('Error fetching markets data:', error)
      return dummyData
    }
  }