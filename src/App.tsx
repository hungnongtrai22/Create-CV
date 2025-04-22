import { useState } from "react";

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

function calculateCountYear(startDate: any, endDate: any): number {
  let year = endDate.getFullYear() - startDate.getFullYear();
  // console.log("YEAR", year)

  if (startDate.getMonth() > endDate.getMonth()) {
    year--;
  }
  console.log("YEAR", year);

  return year;
}

type SchoolEntry = {
  timeFrom: string;
  timeTo: string;
  name: string;
  content: string;
  current: string;
};

type CompanyEntry = {
  timeFrom: string;
  timeTo: string;
  name: string;
  content: string;
};

type FamilyEntry = {
  relationship: string;
  name: string;
  year: string;
  location: string;
  occupation: string;
};

// type User = {
//   // các field khác...
//   school: SchoolEntry[];
//   company: CompanyEntry[];
// };

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
  school: [
    {
      timeFrom: "",
      timeTo: "",
      name: "",
      content: "",
      current: "",
    },
    {
      timeFrom: "",
      timeTo: "",
      name: "",
      content: "",
      current: "",
    },
    {
      timeFrom: "",
      timeTo: "",
      name: "",
      content: "",
      current: "",
    },
  ],
  avatar: "",
  company: [
    {
      timeFrom: "",
      timeTo: "",
      name: "",
      content: "",
    },
  ],
  family: [
    {
      relationship: "",
      name: "",
      year: "",
      location: "",
      occupation: "",
    },
    {
      relationship: "",
      name: "",
      year: "",
      location: "",
      occupation: "",
    },
  ],
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
  moveForeign: "",
};

const initError = {
  name: false,
  namejp: false,
  birthday: false,
  sex: false,
  blood: false,
  height: false,
  weight: false,
  blindColor: false,
  leftEye: false,
  rightEye: false,
  hand: false,
  married: false,
  driverLicense: false,
  smoke: false,
  alcohol: false,
  tattoo: false,
  address: false,
  userId: false,
  school: [
    {
      timeFrom: false,
      timeTo: false,
      name: false,
      content: false,
      current: false,
      error: "",
    },
    {
      timeFrom: false,
      timeTo: false,
      name: false,
      content: false,
      current: false,
      error: "",
    },
    {
      timeFrom: false,
      timeTo: false,
      name: false,
      content: false,
      current: false,
      error: "",
    },
  ],
  company: [
    {
      timeFrom: false,
      timeTo: false,
      name: false,
      content: false,
      error: "",
    },
  ],
  interest: false,
  foreignLanguage: false,
  strong: false,
  weak: false,
  aim: false,
  plan: false,
  money: false,
  familyInJapan: false,
  moveForeign: false,
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
  const [errors, setErrors] = useState(initError);
  const [isShowCV, setIsShowCV] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

    setErrors({ ...errors, [name]: value.trim() === "" });
    if (name == "height" || name == "weight" || name == "userId") {
      console.log("Height ", value);
      setErrors({ ...errors, [name]: value <= 0 });
    }
  };

  const handleFocus = (e: any) => {
    const { name, value } = e.target;

    // Validate ngay khi focus: nếu đang trống, báo lỗi
    setErrors((prev) => ({ ...prev, [name]: value.trim() === "" }));
    if (name == "height" || name == "weight" || name == "userId") {
      setErrors({ ...errors, [name]: value <= 0 });
    }
  };

  const checkSchoolYear = (content: any, year: any) => {
    let error = "";
    switch (content) {
      case "小学校":
        error = year < 5 ? "小学校は最低5年間通う必要があります。" : "";
        break;
      case "中学校":
        error = year < 4 ? "中学校は最低4年間通う必要があります。" : "";
        break;
      case "高校":
        error = year < 3 ? "高校は最低3年間通う必要があります。" : "";
        break;
      default:
        break;
    }

    return error;
  };

  const handleSchoolTimeChange = (
    index: number,
    field: keyof SchoolEntry, // ✅ dùng kiểu an toàn
    value: string
  ) => {
    let updatedSchool;
    setUser((prev) => {
      updatedSchool = [...prev.school];
      updatedSchool[index] = {
        ...updatedSchool[index],
        [field]: value,
      };
      return { ...prev, school: updatedSchool };
    });

    let year = 0;

    if (field == "timeFrom" || field == "timeTo") {
      const timeFrom =
        field == "timeFrom"
          ? value
          : user.school[index].timeFrom != ""
          ? user.school[index].timeFrom
          : "";

      const timeTo =
        field == "timeTo"
          ? value
          : user.school[index].timeTo != ""
          ? user.school[index].timeTo
          : "";

      if (timeFrom != "" && timeTo != "") {
        year = calculateCountYear(timeFrom, timeTo);
        const error = checkSchoolYear(user.school[index].content, year);
        console.log(timeFrom, timeTo);
        console.log(user.school[index].content, year);
        console.log("Error", error);
        setErrors((prev) => {
          const updatedError = [...prev.school];
          updatedError[index].error = error;
          return { ...prev, school: updatedError };
        });
      }
    }

    if (field == "content") {
      const timeFrom = user.school[index].timeFrom;
      const timeTo = user.school[index].timeTo;

      if (timeFrom != "" && timeTo != "") {
        year = calculateCountYear(timeFrom, timeTo);
        const error = checkSchoolYear(value, year);
        console.log(value, year);
        console.log("Error", error);
        setErrors((prev) => {
          const updatedError = [...prev.school];
          updatedError[index].error = error;
          return { ...prev, school: updatedError };
        });
      }
    }
  };

  const handleCompanyTimeChange = (
    index: number,
    field: keyof CompanyEntry, // ✅ dùng kiểu an toàn
    value: string
  ) => {
    let updatedCompany;
    setUser((prev) => {
      updatedCompany = [...prev.company];
      updatedCompany[index] = {
        ...updatedCompany[index],
        [field]: value,
      };
      return { ...prev, company: updatedCompany };
    });

    // let year = 0;

    // if (field == "timeFrom" || field == "timeTo") {

    //   const timeFrom =
    //     field == "timeFrom"
    //       ? value
    //       : user.company[index].timeFrom != ""
    //       ? user.company[index].timeFrom
    //       : "";

    //   const timeTo =
    //     field == "timeTo"
    //       ? value
    //       : user.company[index].timeTo != ""
    //       ? user.company[index].timeTo
    //       : "";

    //   if (timeFrom != "" && timeTo != "") {
    //     year = calculateCountYear(timeFrom, timeTo);
    //     const error = checkSchoolYear(user.company[index].content, year);
    //     console.log(timeFrom, timeTo);
    //     console.log(user.company[index].content, year);
    //     console.log("Error", error);
    //     setErrors((prev) => {
    //       const updatedError = [...prev.company];
    //       updatedError[index].error = error;
    //       return { ...prev, company: updatedError };
    //     });
    //   }
    // }
  };
  const handleFamilyTimeChange = (
    index: number,
    field: keyof FamilyEntry, // ✅ dùng kiểu an toàn
    value: string
  ) => {
    let updatedFamily;
    setUser((prev) => {
      updatedFamily = [...prev.family];
      updatedFamily[index] = {
        ...updatedFamily[index],
        [field]: value,
      };
      return { ...prev, family: updatedFamily };
    });

    // let year = 0;

    // if (field == "timeFrom" || field == "timeTo") {

    //   const timeFrom =
    //     field == "timeFrom"
    //       ? value
    //       : user.company[index].timeFrom != ""
    //       ? user.company[index].timeFrom
    //       : "";

    //   const timeTo =
    //     field == "timeTo"
    //       ? value
    //       : user.company[index].timeTo != ""
    //       ? user.company[index].timeTo
    //       : "";

    //   if (timeFrom != "" && timeTo != "") {
    //     year = calculateCountYear(timeFrom, timeTo);
    //     const error = checkSchoolYear(user.company[index].content, year);
    //     console.log(timeFrom, timeTo);
    //     console.log(user.company[index].content, year);
    //     console.log("Error", error);
    //     setErrors((prev) => {
    //       const updatedError = [...prev.company];
    //       updatedError[index].error = error;
    //       return { ...prev, company: updatedError };
    //     });
    //   }
    // }
  };

  const addSchool = () => {
    const newSchool = {
      timeFrom: "",
      timeTo: "",
      name: "",
      content: "",
      current: "",
    };
    setUser((prev) => {
      const updatedSchool = [...prev.school];
      updatedSchool.push(newSchool);
      return { ...prev, school: updatedSchool };
    });
    const newSchoolVal = {
      timeFrom: false,
      timeTo: false,
      name: false,
      content: false,
      current: false,
      error: "",
    };
    setErrors((prev) => {
      const updatedSchool = [...prev.school];
      updatedSchool.push(newSchoolVal);
      return { ...prev, school: updatedSchool };
    });
  };

  const addCompany = () => {
    const newCompany = {
      timeFrom: "",
      timeTo: "",
      name: "",
      content: "",
    };
    setUser((prev) => {
      const updatedCompany = [...prev.company];
      updatedCompany.push(newCompany);
      return { ...prev, company: updatedCompany };
    });
    const newCompanyVal = {
      timeFrom: false,
      timeTo: false,
      name: false,
      content: false,
      error: "",
    };
    setErrors((prev) => {
      const updatedCompany = [...prev.company];
      updatedCompany.push(newCompanyVal);
      return { ...prev, company: updatedCompany };
    });
  };
  const addFamily = () => {
    const newFamily = {
      relationship: "",
      name: "",
      year: "",
      location: "",
      occupation: "",
    };
    setUser((prev) => {
      const updatedFamily = [...prev.family];
      updatedFamily.push(newFamily);
      return { ...prev, family: updatedFamily };
    });
    // const newCompanyVal = {
    //   timeFrom: false,
    //   timeTo: false,
    //   name: false,
    //   content: false,
    //   error: "",
    // };
    // setErrors((prev) => {
    //   const updatedCompany = [...prev.company];
    //   updatedCompany.push(newCompanyVal);
    //   return { ...prev, company: updatedCompany };
    // });
  };

  // const handleBeforeSubmit = () => {
  //   setShowModal(true);
  // };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setShowModal(true);
    // setIsShowCV(true);
  };
  console.log(user);
  // console.log(isShowCV);

  return (
    <>
      <CreateCV
        user={user}
        errors={errors}
        handleChange={handleChange}
        handleFocus={handleFocus}
        onSubmit={handleSubmit}
        onChangeSchoolTime={handleSchoolTimeChange}
        onChangeCompanyTime={handleCompanyTimeChange}
        onChangeFamilyTime={handleFamilyTimeChange}
        onAddSchool={addSchool}
        onAddCompany={addCompany}
        onAddFamily={addFamily}
      />
      {isShowCV && <NewInvoice cv={user} />}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">
              氏名のフリガナを確認しましたか？
            </h2>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
              >
                まだ
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setIsShowCV(true);
                  // onSubmit();
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              >
                はい
              </button>
            </div>
          </div>
        </div>
      )}

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
