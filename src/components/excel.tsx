import  {  ChangeEvent } from 'react';
import * as XLSX from 'xlsx';

interface ExcelRow extends Array<string | number | boolean | null | undefined> {}
interface ExcelProps {
  excelData: ExcelRow[];
  handleChangeData: (data: ExcelRow[]) => void;
}
function Excel({ excelData, handleChangeData }: ExcelProps) {
  // const [excelData, setExcelData] = useState<ExcelRow[]>([]);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as ExcelRow[];
      handleChangeData(jsonData.slice(7));
      // handleChangeData(jsonData.slice(8,9));
      // setExcelData(jsonData);

    };

    reader.readAsArrayBuffer(file);
  };

  // const handleDownloadPdf = async () => {
  //   const pdfDoc = await PDFDocument.create();
  //   pdfDoc.registerFontkit(fontkit);
  //   const page = pdfDoc.addPage([600, 800]);
  //   const fontBytes = await fetch('/fonts/Roboto-Regular.ttf').then(res => res.arrayBuffer());
  //   const font = await pdfDoc.embedFont(fontBytes);
  //   const fontSize = 10;

  //   const cellPadding = 5;
  //   const cellHeight = 20;
  //   let xPosition = 50;
  //   let yPosition = 750;
  //   const tableWidth = 500;

  //   excelData.forEach((row, rowIndex) => {
  //     const numCells = row.length;
  //     const cellWidth = tableWidth / numCells;

  //     row.forEach((cell, cellIndex) => {
  //       const cellText = cell !== undefined && cell !== null ? String(cell) : '';

  //       page.drawRectangle({
  //         x: xPosition + cellIndex * cellWidth,
  //         y: yPosition,
  //         width: cellWidth,
  //         height: cellHeight,
  //         borderColor: rgb(0.75, 0.75, 0.75),
  //         borderWidth: 1,
  //       });

  //       page.drawText(cellText, {
  //         x: xPosition + cellIndex * cellWidth + cellPadding,
  //         y: yPosition + cellPadding,
  //         size: fontSize,
  //         font,
  //         color: rgb(0, 0, 0),
  //         maxWidth: cellWidth - cellPadding * 2,
  //       });
  //     });

  //     yPosition -= cellHeight;
  //   });

  //   const pdfBytes = await pdfDoc.save();
  //   const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  //   const link = document.createElement('a');
  //   link.href = URL.createObjectURL(blob);
  //   link.download = 'excel_to_pdf_table.pdf';
  //   link.click();
  // };

  return (
    <div className="container mt-4">
      <h1>Chuyển đổi file excel sang dạng CV</h1>

      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="form-control mb-4"
      />

      {excelData.length > 0 && (
        <div>
          {/* <h2>Excel Preview</h2>
          <table className="table table-bordered">
            <tbody>
              {excelData.slice(0, 2).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table> */}
          {/* <button onClick={handleDownloadPdf} className="btn btn-primary mt-3">
            Download as PDF
          </button> */}
        </div>
      )}
    </div>
  );
}

export default Excel;
