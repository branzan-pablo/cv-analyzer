import './pdf-polyfills';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const mammoth = require('mammoth');

// @ts-ignore
import pdf from 'pdf-parse';

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    const data = await pdf(buffer);
    return data.text.trim();
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error(`Falha ao ler o arquivo PDF: ${(error as Error).message}`);
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
