export const DEFAULT_FEAR_GREED_DATA: FearGreedResponse = {
  name: "Fear and Greed Index",
  data: [
    {
      time_until_update: "0",
      timestamp: String(Math.floor(Date.now() / 1000)),
      value: "50",
      value_classification: "Neutral",
    },
  ],
  metadata: {
    error: null,
    name: "Fear and Greed Index",
  },
};

export default async function getFearGreed(): Promise<FearGreedResponse> {
  try {
    const response = await fetch("https://api.alternative.me/fng/?limit=1");

    if (!response.ok) {
      console.error("API response not ok:", response.status);
      return DEFAULT_FEAR_GREED_DATA;
    }

    const data: FearGreedResponse = await response.json();
    console.log(data, "TOHLE JSOU NEWS DATA");

    if (!data || !Array.isArray(data.data) || data.data.length === 0) {
      console.warn("No fear and greed data available, returning default");
      return DEFAULT_FEAR_GREED_DATA;
    }

    return data;
  } catch (error) {
    console.error("Error fetching fear and greed data:", error);
    return DEFAULT_FEAR_GREED_DATA;
  }
}
