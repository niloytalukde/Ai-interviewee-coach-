export const buildPrompt = (
  jobTitle: string,
  jobDescription: string,
  cvText: string
): string => {
  return `
You are an ATS (Applicant Tracking System).

Analyze the following resume strictly based on the job information.

Job Title:
${jobTitle}

Job Description:
${jobDescription}

Candidate Resume Text:
${cvText}

INSTRUCTIONS:
- Extract candidate full name and email from the resume
- Score suitability from 0 to 100
- Mark eligible true only if score >= 60
- Reasons must be short, clear, and technical
- If name or email not found, return empty string

RETURN ONLY VALID JSON (NO EXTRA TEXT):

{
  "name": "",
  "email": "",
  "score": 0,
  "eligible": false,
  "reasons": []
}
`;
};
