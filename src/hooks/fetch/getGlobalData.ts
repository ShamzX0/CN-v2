export default async function getGlobalData(): Promise<any> {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/global");

    console.log(
      response.json(),
      "response.json() getGlobalDatagetGlobalDatagetGlobalData"
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching markets data:", error);
    return [];
  }
}
