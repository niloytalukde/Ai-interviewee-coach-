import AppError from "../../middleware/AppError";
import { aiAnalyzer } from "../../utils/aiAnalyzer";
import { buildPrompt } from "../../utils/buildPrompt";
import { extractText } from "../../utils/extractText";
import { downloadCV } from "../../utils/fetchcvFromCloudinary";
import { CvUpload } from "../SortoutCv/sortout.model";


export const analyzeCv = async (userId: string) => {
  const isExistCv = await CvUpload.findOne({ userId:userId });

  console.log(isExistCv);
  if (!isExistCv) {
    throw new AppError(400, "User data does not exist");
  }

  const results = [];

  //  cvs is an ARRAY
  for (const cvUrl of isExistCv.cvs) {

      //  Download CV
      const buffer = await downloadCV(cvUrl);

      console.log(buffer,"Buffer");

      //  Extract text from PDF
      const cvText = await extractText(buffer);

      //  Build AI prompt
      const prompt = buildPrompt(
        isExistCv.jobTitle,
        isExistCv.jobDescription,
        cvText
      );

      //  AI analyze
      const aiResult = await aiAnalyzer(prompt);

      results.push({
        cvUrl,
        ...aiResult
      });

    } 

  return {
    totalCV: isExistCv.cvs.length,
    analyzed: results.length,
    results
  };
};
