import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import  { forwardRef, useImperativeHandle, useRef } from "react";
import user from "../assets/images/user.jpg"
import logo from "../assets/images/logo.jpg"

interface ExcelRow extends Array<string | number | boolean | null | undefined> {}
interface ExcelProps {
  cv: ExcelRow;
}

// Chuyển serial number thành ngày
function excelDateToJSDate(serial: any): Date {
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400; // số giây
  const date_info = new Date(utc_value * 1000);
  return date_info;
}

const Invoice = forwardRef(({ cv }: ExcelProps, ref) => {
  const printRef = useRef(null);
  console.log(cv);

  useImperativeHandle(ref, () => ({
    async download(): Promise<{ filename: string, blob: Blob }> {
      const element = printRef.current;
      if (!element) return { filename: 'unknown.pdf', blob: new Blob() };
  
      const canvas = await html2canvas(element, { scale: 2 });
      const data = canvas.toDataURL("image/png");
  
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });
  
      const imgProps = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width + 60;
  
      // pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
// pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
let position = 0;
const pageHeight = pdf.internal.pageSize.getHeight();

// Nếu ảnh dài hơn 1 trang
while (position < pdfHeight) {
  pdf.addImage(data, "PNG", 0, -position, pdfWidth, pdfHeight);
  position += pageHeight;
  if (position < pdfHeight) {
    pdf.addPage();
  }
}  
      const blob = pdf.output("blob");
      const filename = `${cv[1]}-${cv[3]?.toString() || "invoice"}.pdf`;
  
      return { filename, blob };
    }
  }));

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) {
      return;
    }

    const canvas = await html2canvas(element, {
      scale: 2,
    });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width + 60;

    // pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    let position = 0;
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Nếu ảnh dài hơn 1 trang
    while (position < pdfHeight) {
      pdf.addImage(data, "PNG", 0, -position, pdfWidth, pdfHeight);
      position += pageHeight;
      if (position < pdfHeight) {
        pdf.addPage();
      }
    }
    // pdf.save("examplepdf.pdf");
    pdf.save(cv[3]?.toString());
  };

  const jsDate = excelDateToJSDate(cv[2]);
  const formatted = jsDate.toLocaleDateString('ja-JP'); 
  const parts = formatted.split('/');
  const customFormat = `${parts[0]}年${parts[1]}月${parts[2]}日`;

  const birthDay = excelDateToJSDate(cv[5]);
  const bformatted = birthDay.toLocaleDateString('ja-JP'); 
  const bparts = bformatted.split('/');
  const bcustomFormat = `${bparts[0]}年${bparts[1]}月${bparts[2]}日`;


  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <div ref={printRef} className="p-8 bg-white border border-gray-200">
          <div className="flex justify-between items-center mb-8">
            <div>
            <img src={logo} style={{width: "125px", height: "100px"}}/>
            </div>
            <div className="text-right">
              <h2 className="font-semibold">NHAT TAN MANPOWER</h2>
              <p className="text-sm text-gray-600">
              No. 8, TX01 Street
                <br />
                Thanh Xuan Ward, District 12
              </p>
            </div>
          </div>

         

          <div className="flex justify-between items-center mb-8">
            <div>
            {/* <h3 className="text-lg font-semibold mb-4">Bill To:</h3> */}
            <p className="text-gray-700">
            面接番号: {cv[1]}
              <br />
              {customFormat}
              {/* <br />
              City, State ZIP */}
            </p>
            </div>
            <div className="text-right">
            <img src={user} style={{
              width: "150px",
              aspectRatio: "4/3"
            }}/>
          </div>
          </div>

          <table className="w-full mb-8 border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-center" colSpan={6}>技能実習生履歴書</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 text-center">氏名</td>
                <td className="border p-2 text-center">{cv[3]}</td>
                <td className="border p-2 text-center">性別</td>
                <td className="border p-2 text-center">{cv[6]}</td>
                <td className="border p-2 text-center">年齢(歳)</td>
                <td className="border p-2 text-center">{cv[7]}</td>
              </tr>

              <tr>
                <td className="border p-2 text-center">フリガナ</td>
                <td className="border p-2 text-center">{cv[4]}</td>
                <td className="border p-2 text-center">身長(cm)</td>
                <td className="border p-2 text-center">{cv[8]}</td>
                <td className="border p-2 text-center">体重(Kg)</td>
                <td className="border p-2 text-center">{cv[9]}</td>
              </tr>

              <tr>
                <td className="border p-2 text-center">生年月日</td>
                <td className="border p-2 text-center">{bcustomFormat}</td>
                <td className="border p-2 text-center">血液型</td>
                <td className="border p-2 text-center">{cv[10]}</td>
                <td className="border p-2 text-center">BMI</td>
                <td className="border p-2 text-center">{cv[11] != null ? Number(cv[11]).toFixed(2) : ''}</td>
              </tr>

              <tr>
                <td className="border p-2 text-center">視力</td>
                <td className="border p-2 text-center">{cv[12]}</td>
                <td className="border p-2 text-center">色弱</td>
                <td className="border p-2 text-center">{cv[13]}</td>
                <td className="border p-2 text-center">利き手</td>
                <td className="border p-2 text-center">{cv[14]}</td>
              </tr>

              <tr>
                <td className="border p-2 text-center">現住所</td>
                <td className="border p-2 text-center">{cv[15]}</td>
                <td className="border p-2 text-center">配偶者</td>
                <td className="border p-2 text-center">{cv[16]}</td>
                <td className="border p-2 text-center">運転免許（車）</td>
                <td className="border p-2 text-center">{cv[17]}</td>
              </tr>

              <tr>
                <td className="border p-2 text-center">喫煙</td>
                <td className="border p-2 text-center">{cv[18]}</td>
                <td className="border p-2 text-center">飲酒</td>
                <td className="border p-2 text-center">{cv[19]}</td>
                <td className="border p-2 text-center">入れ墨</td>
                <td className="border p-2 text-center">{cv[20]}</td>
              </tr>
            </tbody>
          </table>
          <h3 className="text-lg font-semibold mb-4">学 歴</h3>
          <table className="w-full mb-8 border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-center">期間</th>
                <th className="border p-2 text-center">学校名</th>
                <th className="border p-2 text-center">学習内容</th>
                <th className="border p-2 text-center">現在</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 text-center">{cv[21]}</td>
                <td className="border p-2 text-center">{cv[22]}</td>
                <td className="border p-2 text-center">{cv[23]}</td>
                <td className="border p-2 text-center">{cv[24]}</td>
              </tr>
              <tr>
                <td className="border p-2 text-center">{cv[25]}</td>
                <td className="border p-2 text-center">{cv[26]}</td>
                <td className="border p-2 text-center">{cv[27]}</td>
                <td className="border p-2 text-center">{cv[28]}</td>
              </tr>
              <tr>
                <td className="border p-2 text-center">{cv[29]}</td>
                <td className="border p-2 text-center">{cv[30]}</td>
                <td className="border p-2 text-center">{cv[31]}</td>
                <td className="border p-2 text-center">{cv[32]}</td>
              </tr>
              <tr>
                <td className="border p-2 text-center">{cv[33]}</td>
                <td className="border p-2 text-center">{cv[34]}</td>
                <td className="border p-2 text-center">{cv[35]}</td>
                <td className="border p-2 text-center">{cv[36]}</td>
              </tr>

           
            </tbody>
          </table>
          <h3 className="text-lg font-semibold mb-4">職歴</h3>
          <table className="w-full mb-8 border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-center">期間</th>
                <th className="border p-2 text-center">会社（職場）</th>
                <th className="border p-2 text-center">仕事の内容</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              <td className="border p-2 text-center">{cv[37] || <>&nbsp;</>}</td>
              <td className="border p-2 text-center">{cv[38] || <>&nbsp;</>}</td>
                <td className="border p-2 text-center">{cv[39] || <>&nbsp;</>}</td>
              </tr>
              <tr>
                <td className="border p-2 text-center">{cv[40] || <>&nbsp;</>}</td>
                <td className="border p-2 text-center">{cv[41] || <>&nbsp;</>}</td>
                <td className="border p-2 text-center">{cv[42] || <>&nbsp;</>}</td>
              </tr>
              <tr>
                <td className="border p-2 text-center">{cv[43] || <>&nbsp;</>}</td>
                <td className="border p-2 text-center">{cv[44] || <>&nbsp;</>}</td>
                <td className="border p-2 text-center">{cv[45] || <>&nbsp;</>}</td>
              </tr>
        

           
            </tbody>
          </table>

          <h3 className="text-lg font-semibold mb-4">家族構成</h3>
          <table className="w-full mb-8 border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-center">関係</th>
                <th className="border p-2 text-center">氏名</th>
                <th className="border p-2 text-center">生年</th>
                <th className="border p-2 text-center">会社名（場所）</th>
                <th className="border p-2 text-center">職業</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 text-center">{cv[50]}</td>
                <td className="border p-2 text-center">{cv[46]}</td>
                <td className="border p-2 text-center">{cv[47]}</td>
                <td className="border p-2 text-center">{cv[48]}</td>
                <td className="border p-2 text-center">{cv[49]}</td>
              </tr>
              <tr>
                <td className="border p-2 text-center">{cv[55]}</td>
                <td className="border p-2 text-center">{cv[51]}</td>
                <td className="border p-2 text-center">{cv[52]}</td>
                <td className="border p-2 text-center">{cv[53]}</td>
                <td className="border p-2 text-center">{cv[54]}</td>
              </tr>
              <tr>
                <td className="border p-2 text-center">{cv[60]}</td>
                <td className="border p-2 text-center">{cv[56]}</td>
                <td className="border p-2 text-center">{cv[57]}</td>
                <td className="border p-2 text-center">{cv[58]}</td>
                <td className="border p-2 text-center">{cv[59]}</td>
              </tr>
              <tr>
                <td className="border p-2 text-center">{cv[65]}</td>
                <td className="border p-2 text-center">{cv[61]}</td>
                <td className="border p-2 text-center">{cv[62]}</td>
                <td className="border p-2 text-center">{cv[63]}</td>
                <td className="border p-2 text-center">{cv[64]}</td>
              </tr>
              <tr>
                <td className="border p-2 text-center">{cv[70]}</td>
                <td className="border p-2 text-center">{cv[66]}</td>
                <td className="border p-2 text-center">{cv[67]}</td>
                <td className="border p-2 text-center">{cv[68]}</td>
                <td className="border p-2 text-center">{cv[69]}</td>
              </tr>
              <tr>
                <td className="border p-2 text-center">{cv[75]}</td>
                <td className="border p-2 text-center">{cv[71]}</td>
                <td className="border p-2 text-center">{cv[72]}</td>
                <td className="border p-2 text-center">{cv[73]}</td>
                <td className="border p-2 text-center">{cv[74]}</td>
              </tr>
            </tbody>
          </table>

          <table className="w-full mb-8 border-collapse">
            {/* <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-center" colSpan={6}>技能実習生履歴書</th>
              </tr>
            </thead> */}
            <tbody>
              <tr>
                <td className="border p-2 text-center"><b>趣味</b></td>
                <td className="border p-2 text-center">{cv[76]}</td>
                <td className="border p-2 text-center"><b>長所</b></td>
                <td className="border p-2 text-center">{cv[78]}</td>
              </tr>
              <tr>
                <td className="border p-2 text-center"><b>外国語</b></td>
                <td className="border p-2 text-center">{cv[77]}</td>
                <td className="border p-2 text-center"><b>短所</b></td>
                <td className="border p-2 text-center">{cv[79]}</td>
              </tr>
            
            </tbody>
          </table>

          
          <table className="w-full mb-8 border-collapse">
            <tbody>
              <tr>
                <td className="border p-2 text-center"><b>日本に行くの目的・志望・動機</b></td>
                <td className="border p-2 text-center">{cv[80]}</td>
              </tr>
              <tr>
                <td className="border p-2 text-center"><b>３年間後いくら貯金したいですか</b></td>
                <td className="border p-2 text-center">{cv[81]}</td>
              </tr>
              <tr>
                <td className="border p-2 text-center"><b>実習期間が終了した後、どんな予定がありますか</b></td>
                <td className="border p-2 text-center">{cv[82]}</td>
              </tr>
              <tr>
                <td className="border p-2 text-center"><b>日本に親戚がいますか。</b></td>
                <td className="border p-2 text-center">{cv[83]}</td>
              </tr>
              <tr>
                <td className="border p-2 text-center"><b>外国へ行ったことがありますか。</b></td>
                <td className="border p-2 text-center">{cv[84]}</td>
              </tr>
            </tbody>
          </table>

          {/* <div className="flex justify-end">
            <div className="w-64">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>$1,750.00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax (10%):</span>
                <span>$175.00</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>$1,925.00</span>
              </div>
            </div>
          </div> */}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleDownloadPdf}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Tải CV
          </button>
        </div>
      </div>
    </div>
  );
});

export default Invoice;
