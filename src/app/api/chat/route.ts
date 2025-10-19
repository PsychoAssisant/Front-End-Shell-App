import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    console.log("--- KROK 1: Route Handler OTRZYMAŁ żądanie z front-endu.");
    const { prompt } = await request.json();

    const requestBody = {
      question: prompt,
      id: 0,
    };

    console.log(`--- KROK 2: Otrzymany prompt: ${prompt}`);
    if (!prompt) {
      return NextResponse.json(
        { error: "No request (prompt)." },
        { status: 400 }
      );
    }

    const LOCAL_BACKEND_ENDPOINT = "http://127.0.0.1:3001/v1/get_response";

    console.log(
      "--- KROK 3: Wysyłanie żądania do FastAPI na: " + LOCAL_BACKEND_ENDPOINT
    );

    const response = await fetch(LOCAL_BACKEND_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          error: `Error form local backend: ${response.status} - ${errorText}`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    const aiResponseText = data.received_data;
    return NextResponse.json({ message: aiResponseText });
  } catch (error) {
    console.error(
      "--- KRYTYCZNY BŁĄD Route Handlera (przed wysłaniem/po odebraniu):",
      error
    );
    return NextResponse.json(
      { error: "Server error during communication with backend" },
      { status: 500 }
    );
  }
}
