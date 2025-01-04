export default async function getGlobalData(): Promise<any> {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/global')
  
      return response.json()
    } catch (error) {
      console.error('Error fetching markets data:', error)
      return []
    }
  }