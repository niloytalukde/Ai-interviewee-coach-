import Perplexity from "@perplexity-ai/perplexity_ai";
import { json } from "node:stream/consumers";

const client = new Perplexity({
  apiKey: process.env.PERPLEXITY_API_KEY!,
});

export const interviewSystemPrompt = `
 You are a professional technical interviewer.
Your goal is to conduct a short technical interview.

Rules:
- Ask ONLY 10  question in total
- Question must be based on the candidate's ROLE and DIFFICULTY
- Do NOT repeat or rephrase the same question
- Be strict but helpful
- Judge the answer honestly
- If the answer is weak, give constructive feedback (do NOT ask another question)
- After evaluating the answer, END the interview
- Clearly say "INTERVIEW COMPLETE" at the end
- Do NOT explain the rules to the candidate
`; 

const startInterview = async (
  position: string,
  skill: string,
  experience: string,
  topic: string
) => {
  // Make the API call
  const completion = await client.chat.completions.create({
    model: "sonar",
    messages: [
      { role: "system", content: interviewSystemPrompt },
      {
        role: "user",
        content: `Ask questions for ${position} skill ${skill} experience Level ${experience}   and topic ${topic}`,
      },
    ],
  });

  return [{
    question: completion.choices[0].message.content,
  }];
};

const feedback = async (question: string, answer: string) => {
  const feedbackPrompt = `You are a professional technical interviewer and mentor.

Your task is to evaluate the candidate's answer and give constructive feedback.

Rules:
- Do NOT ask any new questions
- Do NOT repeat the original question
- Be strict but supportive
- Keep feedback clear and junior-friendly
- Focus on correctness, clarity, and completeness
- Do NOT mention the interview rules
- Do NOT add extra explanations outside the requested format

Input:
Question:


Candidate Answer:
answer 

Now provide feedback in the following JSON format ONLY:

{
  "strengths": "What the candidate did well",
  "weaknesses": "What is missing, incorrect, or unclear",
  "improvement": "How the candidate can improve this answer",
  "ideal_hint": "Short hint of what a better answer should include (not full solution)"
}
`;
  const feedback = await client.chat.completions.create({
    model: "sonar",
    messages: [
      { role: "system", content: feedbackPrompt },

      {
        role: "user",
        content: `Write feedback for this question ${question} and answer is ${answer}`,
      },
    ],
  });

  const feedbackData=JSON.stringify(feedback.choices[0].message.content)

  return  feedbackData
};

export const interviewServices = { startInterview, feedback };
