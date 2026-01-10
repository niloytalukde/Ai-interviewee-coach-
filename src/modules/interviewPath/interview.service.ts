import Perplexity from "@perplexity-ai/perplexity_ai";
import interviewModel from "./interview.model";

const client = new Perplexity({
  apiKey: process.env.PERPLEXITY_API_KEY!,
});

export const interviewSystemPrompt = `
You are an expert technical interviewer.

Based on the following inputs, generate a well-structured list of high-quality interview questions.

Job Title: {{jobTitle}}
Job Description: {{jobDescription}}
Interview Duration: {{timeDuration}}
Interview Type: {{type}}

Your task:
- Analyze the job description to identify key responsibilities and required skills.
- Generate interview questions based on the duration.
- Match real-life {{type}} interview tone.

IMPORTANT:
- Return ONLY valid JSON
- Do NOT include explanations, markdown, or extra text

JSON format:
{
  "interviewQuestions": [
    {
      "question": "",
      "type": "Technical | Behavioral | Experience | Problem Solving | Leadership"
    }
  ]
}
`;





export type InterviewQuestion = {
  question: string;
  type: string;
};


const normalizeContentToText = (
  content:
    | string
    | {
        type: string;
        text?: string;
      }[]
): string => {
  if (typeof content === "string") return content;

  if (Array.isArray(content)) {
    return content
      .map((chunk) => (chunk.type === "text" ? chunk.text ?? "" : ""))
      .join("");
  }

  return "";
};

export const startInterview = async (
  jobPosition: string,
  jobDescription: string,
  timeDuration: string,
  types: string[],
  userEmail: string
): Promise<InterviewQuestion[]> => {
  const finalPrompt = interviewSystemPrompt
    .replace("{{jobTitle}}", jobPosition)
    .replace("{{jobDescription}}", jobDescription)
    .replace("{{timeDuration}}", timeDuration)
    .replace("{{type}}", types.join(", "));

  const completion = await client.chat.completions.create({
    model: "sonar",
    messages: [
      {
        role: "system",
        content: "You are an expert technical interviewer. Your Name is jeri",
      },
      {
        role: "user",
        content: finalPrompt,
      },
    ],
  });

  const rawContent = completion.choices[0].message.content;
  if (!rawContent) return [];

  // Normalize content
  const textContent = normalizeContentToText(rawContent);
  if (!textContent) return [];

  // Remove markdown if exists
  const cleanJson = textContent
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const parsed = JSON.parse(cleanJson);

  const questions: InterviewQuestion[] =
    parsed.interviewQuestions ?? [];

    if (!questions.length) {
  throw new Error("No interview questions generated");
}
  //  SAVE INTERVIEW SESSION
 const session =  await interviewModel.create({
    userEmail,
    jobType: jobPosition,
    description: jobDescription,
    duration: timeDuration,
    questions,
  });

  return session;
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

  return feedback.choices[0].message.content;
};

const getSessionById = async (id:string)=>{

const singleSession= await interviewModel.findById({_id:id})

return singleSession
}

export const interviewServices = { startInterview, feedback,getSessionById };
