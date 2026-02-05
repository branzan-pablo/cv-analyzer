// eslint-disable-next-line @typescript-eslint/no-require-imports
const mammoth = require('mammoth');

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  // Dynamic import to avoid build issues
  const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');

  try {
    const uint8Array = new Uint8Array(buffer);
    const loadingTask = pdfjsLib.getDocument({
      data: uint8Array,
      useWorkerFetch: false,
      isEvalSupported: false,
      useSystemFonts: true,
    });
    const pdf = await loadingTask.promise;

    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = (content.items as Array<{ str?: string }>)
        .filter((item) => item.str)
        .map((item) => item.str)
        .join(' ');
      text += pageText + '\n';
    }

    return text.trim();
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Falha ao ler o arquivo PDF. Verifique se o arquivo não está corrompido.');
  }
}

export async function extractTextFromDOCX(buffer: Buffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (error) {
    console.error('Error extracting text from DOCX:', error);
    throw new Error('Falha ao ler o arquivo DOCX. Verifique se o arquivo não está corrompido.');
  }
}

export async function extractText(
  file: File
): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = file.name.toLowerCase();

  if (fileName.endsWith('.pdf')) {
    return extractTextFromPDF(buffer);
  } else if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
    return extractTextFromDOCX(buffer);
  } else if (fileName.endsWith('.txt')) {
    return buffer.toString('utf-8');
  } else {
    throw new Error('Formato de arquivo não suportado. Use PDF, DOCX ou TXT.');
  }
}
