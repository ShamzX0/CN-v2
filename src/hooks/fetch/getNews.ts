export default async function getNews(): Promise<any> {
    try {
      const response = await fetch('https://cryptopanic.com/api/v1/posts/?auth_token=add107fcd8027e1359adcba401377ac5174e859a&public=true')
  
      return response.json()
    } catch (error) {
      console.error('Error fetching markets data:', error)
      return []
    }
  }