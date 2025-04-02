// app/api/one-inch-proxy/route.ts (for App Router)
import { NextResponse } from "next/server";
import axios from "axios";

let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1100;

export async function GET(request: any) {
  try {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;

    // Check if we need to wait before making the request
    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
      const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
      console.log(`Rate limiting: Waiting ${waitTime}ms before making request`);
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }

    // Update last request time
    lastRequestTime = Date.now();

    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get("endpoint");

    // Validate the endpoint
    if (!endpoint) {
      return NextResponse.json(
        { error: "Endpoint is required" },
        { status: 400 }
      );
    }

    // Create a new URLSearchParams object without the endpoint parameter
    const forwardParams = new URLSearchParams();
    searchParams.forEach((value, key) => {
      if (key !== "endpoint") {
        forwardParams.append(key, value);
      }
    });

    // Get your API key from environment variable
    const apiKey = process.env.NEXT_PUBLIC_1INCH_API_KEY;

    // Make the request to 1inch API - Using v5.2 to match your original code
    const response = await axios.get(
      `https://api.1inch.dev/swap/v6.0/1/${endpoint}`,
      {
        params: Object.fromEntries(forwardParams),
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "application/json",
        },
      }
    );

    // Return the response from 1inch
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Proxy error:", error);

    // Forward error response if available
    if (error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
