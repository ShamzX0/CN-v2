export default async function getBitcoin(): Promise<any> {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true')
  
      return response.json()
    } catch (error) {
      console.error('Error fetching markets data:', error)
      return []
    }
  }