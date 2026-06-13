import { NextResponse } from 'next/server';
import { aiSystemPrompt } from '@/data/portfolio';

export async function POST(request: Request) {
  try {
    const { jobDescription } = await request.json();
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'Anthropic API key is not configured.' }, { status: 500 });
    }

    const prompt = `You are a recruiter helper. Below is Arya Shah's professional profile system prompt:
${aiSystemPrompt}

Please analyze the following Job Description (JD) and provide:
1. MATCH SCORE: A percentage fit (e.g. 85%) based on alignment with his skills and experiences.
2. SKILLS MATCHED: Bullet points of matched skills.
3. SKILLS GAPS / AREAS TO DEVELOP: Bullet points of technologies or areas in the JD that Arya hasn't listed or might need to brush up on.
4. COVER LETTER SNIPPET: A short, high-impact 3-4 sentence paragraph highlighting why Arya is perfect for this role (written in first-person from Arya's perspective).

JD to Analyze:
${jobDescription}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 600,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json({ error: `Anthropic API error: ${errorData}` }, { status: response.status });
    }

    const data = await response.json();
    const analysis = data.content?.[0]?.text || "I'm sorry, I couldn't perform the analysis.";
    return NextResponse.json({ analysis });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
  }
}
