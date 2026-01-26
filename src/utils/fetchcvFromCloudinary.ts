import axios from "axios";

export const downloadCV = async (url: string): Promise<Uint8Array> => {
  const res = await axios.get(url, {
    responseType: "arraybuffer",
  });

  // ✅ Always return Uint8Array
  return new Uint8Array(res.data);
};
