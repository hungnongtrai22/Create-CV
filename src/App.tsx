import  {  useState } from "react";

import CreateCV from "./components/form";
import NewInvoice from "./components/NewInvoice";


  function convertVietnameseToJapaneseKatakana(vietnameseName: string): string {
    // Bảng chuyển đổi phụ âm đầu
    const initialConsonants: { [key: string]: string } = {
      b: "バ",
      c: "カ",
      ch: "チ",
      d: "ダ",
      đ: "ド",
      g: "ガ",
      gh: "ガ",
      gi: "ジ",
      h: "ハ",
      k: "カ",
      kh: "ク",
      l: "ラ",
      m: "マ",
      n: "ナ",
      ng: "ン",
      ngh: "ン",
      nh: "ニ",
      p: "パ",
      ph: "フ",
      q: "ク",
      qu: "ク",
      r: "ラ",
      s: "サ",
      t: "タ",
      th: "ト",
      tr: "チュ",
      v: "ヴ",
      x: "サ",
    };

    // Bảng chuyển đổi nguyên âm
    const vowels: { [key: string]: string } = {
      a: "ア",
      à: "ア",
      á: "ア",
      ả: "ア",
      ã: "ア",
      ạ: "ア",
      ă: "ア",
      ằ: "ア",
      ắ: "ア",
      ẳ: "ア",
      ẵ: "ア",
      ặ: "ア",
      â: "ア",
      ầ: "ア",
      ấ: "ア",
      ẩ: "ア",
      ẫ: "ア",
      ậ: "ア",
      e: "エ",
      è: "エ",
      é: "エ",
      ẻ: "エ",
      ẽ: "エ",
      ẹ: "エ",
      ê: "エ",
      ề: "エ",
      ế: "エ",
      ể: "エ",
      ễ: "エ",
      ệ: "エ",
      i: "イ",
      ì: "イ",
      í: "イ",
      ỉ: "イ",
      ĩ: "イ",
      ị: "イ",
      o: "オ",
      ò: "オ",
      ó: "オ",
      ỏ: "オ",
      õ: "オ",
      ọ: "オ",
      ô: "オ",
      ồ: "オ",
      ố: "オ",
      ổ: "オ",
      ỗ: "オ",
      ộ: "オ",
      ơ: "オ",
      ờ: "オ",
      ớ: "オ",
      ở: "オ",
      ỡ: "オ",
      ợ: "オ",
      u: "ウ",
      ù: "ウ",
      ú: "ウ",
      ủ: "ウ",
      ũ: "ウ",
      ụ: "ウ",
      ư: "ウ",
      ừ: "ウ",
      ứ: "ウ",
      ử: "ウ",
      ữ: "ウ",
      ự: "ウ",
      y: "イ",
      ỳ: "イ",
      ý: "イ",
      ỷ: "イ",
      ỹ: "イ",
      ỵ: "イ",
    };

    // Bảng chuyển đổi phụ âm cuối
    const finalConsonants: { [key: string]: string } = {
      c: "ック",
      ch: "ック",
      m: "ム",
      n: "ン",
      ng: "ン",
      nh: "ン",
      p: "ップ",
      t: "ット",
    };

    // Trường hợp đặc biệt cho toàn bộ từ
    const wholeWordSpecialCases: { [key: string]: string } = {
      cao: "カオ",
      van: "ヴァン",
      truong: "チュオン",
      long: "ロン",
      thanh: "タン",
      mai: "マイ",
    };

    // Chuẩn hóa đầu vào
    const normalized = vietnameseName.toLowerCase().trim().replace(/\s+/g, " ");
    const words = normalized.split(" ");
    let result = [];

    for (const word of words) {
      // Kiểm tra trường hợp đặc biệt trước
      if (wholeWordSpecialCases[word]) {
        result.push(wholeWordSpecialCases[word]);
        continue;
      }

      let katakana = "";
      let i = 0;

      while (i < word.length) {
        let found = false;

        // Kiểm tra phụ âm đầu (tối đa 2 ký tự)
        for (let len = 2; len >= 1; len--) {
          const substr = word.substr(i, len);

          if (initialConsonants[substr]) {
            katakana += initialConsonants[substr];
            i += len;
            found = true;
            break;
          }
        }

        if (!found) {
          // Kiểm tra nguyên âm
          if (vowels[word[i]]) {
            katakana += vowels[word[i]];
            i++;
            found = true;
          }
        }

        if (!found) {
          // Kiểm tra phụ âm cuối
          for (let len = 2; len >= 1; len--) {
            const substr = word.substr(i, len);

            if (finalConsonants[substr]) {
              katakana += finalConsonants[substr];
              i += len;
              found = true;
              break;
            }
          }
        }

        if (!found) {
          // Nếu không tìm thấy, giữ nguyên ký tự
          katakana += word[i];
          i++;
        }
      }

      result.push(katakana);
    }

    return result.join("・");
  }


  function formatDateToJapanese(dateString: string): string {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
  }

  function calculateAge(birthday: string): number {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const hasHadBirthdayThisYear =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());

    if (!hasHadBirthdayThisYear) {
      age--;
    }

    return age;
  }

const init = {
  userId: 0,
  name: "",
  nameJP: "",
  sex: "",
  blood: "",
  birthday: "",
  birthdayJP: "",
  age: 0,
  height: 0,
  weight: 0,
  BMI: 0,
  blindColor: "",
  leftEye: "",
  rightEye: "",
  hand: "",
  married: "",
  driverLicense: "",
  smoke: "",
  alcohol: "",
  tattoo: "",
  address: "",
  schoolTime1: "",
  schoolName1: "",
  schoolContent1: "",
  schoolCurrent1: "",
  schoolTime2: "",
  schoolName2: "",
  schoolContent2: "",
  schoolCurrent2: "",
  schoolTime3: "",
  schoolName3: "",
  schoolContent3: "",
  schoolCurrent3: "",
  schoolTime4: "",
  schoolName4: "",
  schoolContent4: "",
  schoolCurrent4: "",
  avatar: "",
  companyTime1: "",
  companyName1: "",
  companyContent1: "",
  companyTime2: "",
  companyName2: "",
  companyContent2: "",
  companyTime3: "",
  companyName3: "",
  companyContent3: "",
  relationship1: "",
  name1: "",
  year1: "",
  location1: "",
  occupation1: "",
  relationship2: "",
  name2: "",
  year2: "",
  location2: "",
  occupation2: "",
  relationship3: "",
  name3: "",
  year3: "",
  location3: "",
  occupation3: "",
  relationship4: "",
  name4: "",
  year4: "",
  location4: "",
  occupation4: "",
  relationship5: "",
  name5: "",
  year5: "",
  location5: "",
  occupation5: "",
  relationship6: "",
  name6: "",
  year6: "",
  location6: "",
  occupation6: "",
  interest: "",
  foreignLanguage: "",
  strong: "",
  weak: "",
  aim: "",
  plan: "",
  money: "",
  familyInJapan: "",
  moveForeign: ""
};

  

function App() {
  // const [excelData, setExcelData] = useState<ExcelRow[]>([]);
  // const [loading, setLoading] = useState(false);
  // const [currentCV, setCurrentCV] = useState(0);
  // const invoiceRefs = useRef<(any | null)[]>([]);

  // const handleDownloadAll = async () => {
  //   setLoading(true);
  //   const zip = new JSZip();

  //   for (let ref of invoiceRefs.current) {
  //     if (ref && ref.download) {
  //       const { filename, blob } = await ref.download();
  //       zip.file(filename, blob);
  //       setCurrentCV((pre) => pre + 1);
  //     }
  //   }

  //   const zipBlob = await zip.generateAsync({ type: "blob" });
  //   saveAs(zipBlob, "all_cvs.zip");
  //   setLoading(false);
  //   setCurrentCV(0);
  // };

  const [user, setUser] = useState(init);
  const [isShowCV, setIsShowCV] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setUser((prev) => {
      let newUser = { ...prev, [name]: value };

      if (name === "name") {
        newUser.nameJP = convertVietnameseToJapaneseKatakana(value);
      }

      if (name === "birthday") {
        const age = calculateAge(value);
        newUser.birthdayJP = formatDateToJapanese(value);
        newUser.age = age;
      }

      // Tính BMI nếu có đủ height và weight
      const height =
        name === "height"
          ? parseFloat(value)
          : parseFloat(newUser.height.toString());
      const weight =
        name === "weight"
          ? parseFloat(value)
          : parseFloat(newUser.weight.toString());

      if (!isNaN(height) && !isNaN(weight) && height > 0) {
        const bmi = weight / (height / 100) ** 2;
        newUser.BMI = parseFloat(bmi.toFixed(2)); // Làm tròn 2 chữ số thập phân
      }

      return newUser;
    });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsShowCV(true);
  }
  console.log(user);
  console.log(isShowCV);

  return (
    <>
      <CreateCV user={user} handleChange={handleChange} onSubmit={handleSubmit}/>
      {isShowCV && <NewInvoice cv={user}/>}
      {/* <Excel excelData={excelData} handleChangeData={setExcelData} />
      {loading && (
        <h3>
          Loading.... (Đã tải được: {currentCV} cv/{invoiceRefs.current.length}{" "}
          cv)
        </h3>
      )}
      {excelData.length > 0 && (
        <div className="my-4 flex justify-center">
          <button
            onClick={handleDownloadAll}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Tải tất cả CV
          </button>
        </div>
      )}

      {excelData.map((item, index) => (
        <Invoice
          key={index}
          ref={(el) => (invoiceRefs.current[index] = el)}
          cv={item}
        />
      ))} */}
    </>
  );
}

export default App;
