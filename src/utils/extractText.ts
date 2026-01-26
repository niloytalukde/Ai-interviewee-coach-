export const extractText = async (binary: Uint8Array): Promise<string> => {
  console.log(
    "TYPE CHECK:",
    binary.constructor.name,
    binary instanceof Uint8Array
  );

  const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");

  const loadingTask = (pdfjsLib as any).getDocument({
    data: binary, // ✅ Uint8Array only
  });

  const pdf = await loadingTask.promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    text += content.items.map((it: any) => it.str).join(" ") + " ";
  }

  return text.trim().slice(0, 12000);
};
