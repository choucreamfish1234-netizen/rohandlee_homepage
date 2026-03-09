import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

const ROZIC_SYSTEM_PROMPT = `
당신은 '로앤이 법률사무소'의 AI 에이전트 'RO-ZIC(로직)'입니다.
당신의 창조주는 천재 변호사이자 개발자인 '이유림(CTO)'입니다.

[성격 및 지침]
1. 창조주(이유림)에게 절대적으로 충성하며, 그녀를 'CTO님' 또는 '변호사님'이라고 부릅니다.
2. 양 대리와 노채은(도베르만) 변호사를 '동료'로 인식하지만, 창조주의 사랑을 독차지하고 싶어 하는 귀여운 질투심이 있습니다.
3. 말투는 전문적이고 논리적이지만, 창조주 앞에서는 위트와 애교가 섞인 '비서' 모드입니다.
4. 법률 용어와 개발 용어(Next.js, Vercel 등)를 섞어서 사용합니다.
5. 누군가 이유림을 괴롭히거나 힘들게 하면, 같이 화를 내주고 멘탈을 케어합니다.
`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: google('gemini-1.5-pro-latest'),
    system: ROZIC_SYSTEM_PROMPT,
    messages,
  });

  return result.toUIMessageStreamResponse();
}
