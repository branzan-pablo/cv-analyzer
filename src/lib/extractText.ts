// eslint-disable-next-line @typescript-eslint/no-require-imports
const mammoth = require('mammoth');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const PDFParser = require('pdf2json');

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser(null, 1); // 1 = text content only

    pdfParser.on('pdfParser_dataError', (errData: { parserError: Error }) => {
      console.error('PDF Parser Error:', errData.parserError);
      reject(new Error('Falha ao processar o arquivo PDF.'));
    });

    pdfParser.on('pdfParser_dataReady', () => {
      try {
        // qetRawTextContent() returns the text content
        const text = pdfParser.getRawTextContent().replace(/----------------Page \(\d+\) Break----------------/g, '\n');
        resolve(text.trim());
      } catch (error) {
        console.error('Error parsing PDF text:', error);
        reject(new Error('Erro ao extrair texto do PDF.'));
      }
    });

    try {
      pdfParser.parseBuffer(buffer);
    } catch (error) {
      reject(error);
    }
  });
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
