export default async function getFearGreed(): Promise<any> {
    try {
      const response = await fetch('https://api.alternative.me/fng/?limit=1')
  
      return response.json()
    } catch (error) {
      console.error('Error fetching markets data:', error)
      return []
    }
  }