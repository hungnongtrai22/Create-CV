import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import logo from "../assets/images/logo.jpg";
import "./style.css";

type InvoiceProps = {
  cv: any; // Ideally, replace `any` with a specific type
};

const NewInvoice = ({ cv }: InvoiceProps) => {
  const printRef = useRef(null);
  // const beforeRef = useRef(null);
  // const afterRef = useRef(null);
  console.log(cv);

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

    const pdfHeight =
      (imgProperties.height * pdfWidth) / imgProperties.width + 60;

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
    // pdf.save(cv[3]?.toString());
    pdf.save(
      `${cv.userId < 10 ? "0" + cv.userId : cv.userId}-${cv.name?.toString()}`
    );
  };

  // const jsDate = excelDateToJSDate(cv[2]);
  // const handleDownloadPdf = async () => {
  //   const beforeEl = beforeRef.current;
  //   const afterEl = afterRef.current;
  //   if (!beforeEl || !afterEl) return;

  //   const pdf = new jsPDF({
  //     orientation: "portrait",
  //     unit: "px",
  //     format: "a4",
  //   });
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pageHeight = pdf.internal.pageSize.getHeight();

  //   // Part 1: trước 職歴
  //   const canvasBefore = await html2canvas(beforeEl, { scale: 2 });
  //   const imgBefore = canvasBefore.toDataURL("image/png");
  //   const heightBefore = (canvasBefore.height * pdfWidth) / canvasBefore.width;

  //   let position = 0;
  //   while (position < heightBefore) {
  //     pdf.addImage(imgBefore, "PNG", 0, -position, pdfWidth, heightBefore);
  //     position += pageHeight;
  //     if (position < heightBefore) pdf.addPage();
  //   }

  //   // Part 2: từ 職歴 trở đi
  //   const canvasAfter = await html2canvas(afterEl, { scale: 2 });
  //   const imgAfter = canvasAfter.toDataURL("image/png");
  //   const heightAfter = (canvasAfter.height * pdfWidth) / canvasAfter.width;

  //   pdf.addPage();
  //   position = 0;
  //   while (position < heightAfter) {
  //     pdf.addImage(imgAfter, "PNG", 0, -position, pdfWidth, heightAfter);
  //     position += pageHeight;
  //     if (position < heightAfter) pdf.addPage();
  //   }

  //   pdf.save(`${cv.userId < 10 ? "0" + cv.userId : cv.userId}-${cv.name?.toString()}`);
  // };

  const changDateJP = (date: any) => {
    // const jsDate = new Date();
    const formatted = date.toLocaleDateString("ja-JP");
    const parts = formatted.split("/");
    const customFormat = `${parts[0]}年${parts[1]}月${parts[2]}日`;
    return customFormat;
  };
  const changMonthYearJP = (date: any) => {
    // const jsDate = new Date();
    if(date == null || date == ""){
      return "";
    }
    const formatted = date.toLocaleDateString("ja-JP");
    const parts = formatted.split("/");
    const customFormat = `${parts[0]}年${parts[1]}月`;
    return customFormat;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <div ref={printRef} className="p-8 bg-white border border-gray-200">
          {/* <div ref={beforeRef} className="p-8 bg-white border border-gray-200"> */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <img src={logo} style={{ width: "75px" }} />
            </div>
            <div className="text-right">
              <h2 className="font-semibold">NHAT TAN MANPOWER</h2>
              <p className=" text-gray-600">
                No. 8, TX01 Street
                <br />
                Thanh Xuan Ward, District 12
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-gray-700">
                面接番号: {cv.userId < 10 ? "0" + cv.userId : cv.userId}
                <br />
                {changDateJP(new Date())}
              </p>
            </div>
            <div className="text-right">
             
            </div>
          </div>

          <table className="w-full mb-2 border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-1 text-center" colSpan={10}>
                  技能実習生履歴書
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-1 text-center">氏名</td>
                <td className="border p-1 text-center" colSpan={3}>
                  {cv.name}
                </td>
                <td className="border p-1 text-center">性別</td>
                <td className="border p-1 text-center">{cv.sex}</td>
                <td className="border p-1 text-center">身長(cm)</td>
                <td className="border p-1 text-center">{cv.height}</td>

                <td className="border p-1 text-center" colSpan={2} rowSpan={5}>
                  <img
                    src={cv.avatar}
                    className="mx-auto h-40 w-40 object-cover  border"
                  />
                </td>
              </tr>

              <tr>
                <td className="border p-1 text-center">フリガナ</td>
                <td className="border p-1 text-center" colSpan={3}>
                  {cv.nameJP}
                </td>
                <td className="border p-1 text-center">年齢(歳)</td>
                <td className="border p-1 text-center">{cv.age}</td>

                <td className="border p-1 text-center">体重(Kg)</td>
                <td className="border p-1 text-center">{cv.weight}</td>
              </tr>

              <tr>
                <td className="border p-1 text-center">生年月日</td>
                <td className="border p-1 text-center">{cv.birthdayJP}</td>
                <td className="border p-1 text-center">血液型</td>
                <td className="border p-1 text-center">{cv.blood}</td>

                <td className="border p-1 text-center">配偶者</td>
                <td className="border p-1 text-center">{cv.married}</td>
                <td className="border p-1 text-center">BMI</td>
                <td className="border p-1 text-center">{cv.BMI}</td>
              </tr>

              <tr>
                <td className="border p-1 text-center">視力</td>
                <td className="border p-1 text-center">{`左目: ${cv.leftEye}/10、右目: ${cv.rightEye}/10`}</td>
                <td className="border p-1 text-center">色弱</td>
                <td className="border p-1 text-center">{cv.blindColor}</td>
                <td className="border p-1 text-center">利き手</td>
                <td className="border p-1 text-center">{cv.hand}</td>
                <td className="border p-1 text-center">運転免許（車）</td>
                <td className="border p-1 text-center">{cv.driverLicense}</td>
              </tr>

              <tr>
                <td className="border p-1 text-center">現住所</td>
                <td className="border p-1 text-center">{cv.address}</td>
                <td className="border p-1 text-center">喫煙</td>
                <td className="border p-1 text-center">{cv.smoke}</td>
                <td className="border p-1 text-center">飲酒</td>
                <td className="border p-1 text-center">{cv.alcohol}</td>

                <td className="border p-1 text-center">入れ墨</td>
                <td className="border p-1 text-center">{cv.tattoo}</td>
              </tr>

              <tr></tr>
            </tbody>
          </table>
          {/* <h3 className=" font-semibold mb-3">学 歴</h3> */}
          <table className="w-full mb-3 border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-1 text-center">期間</th>
                <th className="border p-1 text-center">学校名</th>
                <th className="border p-1 text-center">学習内容</th>
                <th className="border p-1 text-center">現在</th>
              </tr>
            </thead>
            <tbody>
              {cv.school.map((school: any, index: any) => {
                return (
                  <tr key={index}>
                    <td className="border p-1 text-center">
                      {`${changMonthYearJP(
                        school.timeFrom
                      )} - ${changMonthYearJP(school.timeTo)}` || <>&nbsp;</>}
                    </td>
                    <td className="border p-1 text-center">
                      {school.name || <>&nbsp;</>}
                    </td>
                    <td className="border p-1 text-center">
                      {school.content || <>&nbsp;</>}
                    </td>
                    <td className="border p-1 text-center">
                      {school.current || <>&nbsp;</>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* </div> */}
          {/* <div ref={afterRef} className="p-8 bg-white border border-gray-200"> */}
          {/* <h3 className="font-semibold mb-3 ">職歴</h3> */}
          <table className="w-full mb-2 border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-1 text-center">期間</th>
                <th className="border p-1 text-center">会社（職場）</th>
                <th className="border p-1 text-center">仕事の内容</th>
              </tr>
            </thead>
            <tbody>
              {cv.company.map((company: any, index: any) => {
                return (
                  <tr key={index}>
                    <td className="border p-1 text-center">
                      {`${changMonthYearJP(
                        company.timeFrom
                      )} - ${changMonthYearJP(company.timeTo)}` || <>&nbsp;</>}
                    </td>
                    <td className="border p-1 text-center">
                      {company.name || <>&nbsp;</>}
                    </td>
                    <td className="border p-1 text-center">
                      {company.content || <>&nbsp;</>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* <h3 className=" font-semibold mb-3 mt-3">家族構成</h3> */}
          <table className="w-full mb-2 border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-1 text-center">関係</th>
                <th className="border p-1 text-center">氏名</th>
                <th className="border p-1 text-center">生年</th>
                <th className="border p-1 text-center">会社名（場所）</th>
                <th className="border p-1 text-center">職業</th>
              </tr>
            </thead>
            <tbody>
            {cv.family.map((family: any, index: any) => {
                return (
                  <tr key={index}>
                  <td className="border p-1 text-center">
                    {family.relationship || <>&nbsp;</>}
                  </td>
                  <td className="border p-1 text-center">
                    {family.name || <>&nbsp;</>}
                  </td>
                  <td className="border p-1 text-center">
                    {(family.year != null && family.year != "") ? family.year.getFullYear() :  <>&nbsp;</>}
                  </td>
                  <td className="border p-1 text-center">
                    {family.location || <>&nbsp;</>}
                  </td>
                  <td className="border p-1 text-center">
                    {family.occupation || <>&nbsp;</>}
                  </td>
                </tr>
                );
              })}
            
             
            </tbody>
          </table>

          <table className="w-full mt-2 border-collapse">
            {/* <thead>
              <tr className="bg-gray-100">
                <th className="border p-1 text-center" colSpan={6}>技能実習生履歴書</th>
              </tr>
            </thead> */}
            <tbody>
              <tr>
                <td className="border p-1 text-center">
                  <b>趣味</b>
                </td>
                <td className="border p-1 text-center">{cv.interest}</td>
                <td className="border p-1 text-center">
                  <b>長所</b>
                </td>
                <td className="border p-1 text-center">{cv.strong}</td>
                <td className="border p-1 text-center">
                  <b>短所</b>
                </td>
                <td className="border p-1 text-center">{cv.weak}</td>
              </tr>
              <tr>
                <td className="border p-1 text-center">
                  <b>日本に行くの目的・志望・動機</b>
                </td>
                <td className="border p-1 text-center">{cv.aim}</td>
                <td className="border p-1 text-center">
                  <b>外国語</b>
                </td>
                <td className="border p-1 text-center">{cv.foreignLanguage}</td>
                <td className="border p-1 text-center">
                  <b>３年間後いくら貯金したいですか</b>
                </td>
                <td className="border p-1 text-center">{cv.money}</td>
              </tr>
              <tr>
                <td className="border p-1 text-center">
                  <b>実習期間が終了した後、どんな予定がありますか</b>
                </td>
                <td className="border p-1 text-center">{cv.plan}</td>
                <td className="border p-1 text-center">
                  <b>日本に親戚がいますか。</b>
                </td>
                <td className="border p-1 text-center">{cv.familyInJapan}</td>
                <td className="border p-1 text-center">
                  <b>外国へ行ったことがありますか。</b>
                </td>
                <td className="border p-1 text-center">{cv.moveForeign}</td>
              </tr>
            </tbody>
          </table>

          <table className="w-full mt-3 mb-8 border-collapse">
            {/* <thead>
              <tr className="bg-gray-100">
                <th className="border p-1 text-center" colSpan={6}>技能実習生履歴書</th>
              </tr>
            </thead> */}
            <tbody>
              <tr></tr>

              <tr></tr>
              <tr></tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleDownloadPdf}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            履歴書をダウンロードする
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewInvoice;
