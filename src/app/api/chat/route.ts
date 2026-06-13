import { NextResponse } from 'next/server';
import { aiSystemPrompt } from '@/data/portfolio';

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'Anthropic API key is not configured.' }, { status: 500 });
    }

    // Call Anthropic Messages API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 400,
        system: aiSystemPrompt,
        messages: messages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json({ error: `Anthropic API error: ${errorData}` }, { status: response.status });
    }

    const data = await response.json();
    const reply = data.content?.[0]?.text || "I'm sorry, I couldn't process that.";
    return NextResponse.json({ response: reply });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
  }
}
