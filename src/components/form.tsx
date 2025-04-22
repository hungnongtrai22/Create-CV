import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { ja } from "date-fns/locale/ja";
import "./form.css";
registerLocale("ja", ja);

type CreateCVProps = {
  user: any;
  errors: any;
  handleChange: any;
  onSubmit: any;
  onChangeSchoolTime: any;
  onAddSchool: any;
  handleFocus: any;
  onAddCompany: any;
  onChangeCompanyTime: any;
  onChangeFamilyTime: any;
  onAddFamily: any;
};

const CreateCV = ({
  user,
  handleChange,
  onSubmit,
  onChangeSchoolTime,
  onAddSchool,
  errors,
  handleFocus,
  onAddCompany,
  onChangeCompanyTime,
  onChangeFamilyTime,
  onAddFamily,
}: CreateCVProps) => {
  
  const handleChangeTime = (
    dates: [Date | null, Date | null] | null,
    index: any
  ) => {
    if (!dates) return;

    const [newStartDate, newEndDate] = dates;
    // console.log("Start " + index + ": " + newStartDate);

    if (newStartDate instanceof Date && !isNaN(newStartDate.getTime())) {
      // console.log("Start " + index + ": " + newStartDate);
      onChangeSchoolTime(index, "timeFrom", newStartDate);
    }

    if (newEndDate instanceof Date && !isNaN(newEndDate.getTime())) {
      // console.log("End " + index + ": " + newEndDate);
      onChangeSchoolTime(index, "timeTo", newEndDate);
    }
  };

  const handleChangeCompanyTime = (
    dates: [Date | null, Date | null] | null,
    index: any
  ) => {
    if (!dates) return;

    const [newStartDate, newEndDate] = dates;
    // console.log("Start " + index + ": " + newStartDate);

    if (newStartDate instanceof Date && !isNaN(newStartDate.getTime())) {
      // console.log("Start " + index + ": " + newStartDate);
      onChangeCompanyTime(index, "timeFrom", newStartDate);
    }

    if (newEndDate instanceof Date && !isNaN(newEndDate.getTime())) {
      // console.log("End " + index + ": " + newEndDate);
      onChangeCompanyTime(index, "timeTo", newEndDate);
    }
  };

  return (
    <form
      className="max-w-3xl mx-auto mt-5 border-2 border-solid p-5 shadow-xl"
      onSubmit={onSubmit}
    >
      
      <div className="grid md:grid-cols-4 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <div id="date-range-picker" className="flex items-center">
            <div className="relative ">
              <label
                htmlFor="userId"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                序数
              </label>

              <input
                id="userId"
                name="userId"
                type="number"
                required
                //className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                  dark:focus:ring-blue-500 dark:focus:border-blue-500
                  ${
                    errors.userId
                      ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                value={user.userId}
                onChange={handleChange}
                onFocus={handleFocus}
                min={1}
              />
            </div>
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group"></div>

        <div className="relative z-0 w-full mb-5 group">
          {/* {user.avatar && <input
            id="file-upload-new"
            name="file-upload"
            type="file"
            // value={user.avatar}
            // className="sr-only z-10"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  handleChange({
                    target: {
                      name: "avatar",
                      value: event.target?.result,
                    },
                  });
                };
                reader.readAsDataURL(file);
              }
            }}
          />} */}
        </div>
        <div className="relative  z-0 w-full mb-5 group">
          {user.avatar ? (
            <>
              {/* <img
                src={user.avatar}
                alt="Avatar"
                className="mx-auto h-40 w-40 object-cover  border"
              /> */}
              <label
                htmlFor="avatar-upload"
                className="cursor-pointer block text-center"
              >
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="mx-auto h-40 w-40 object-cover border  hover:opacity-80 transition-opacity"
                />
                <input
                  id="avatar-upload"
                  name="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        handleChange({
                          target: {
                            name: "avatar",
                            value: event.target?.result,
                          },
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                {/* <p className="text-sm text-gray-500 mt-2">画像をクリックして変更</p> */}
              </label>
            </>
          ) : (
            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium text-gray-900"
              >
                画像
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <div className="mt-4 flex text-sm text-gray-600 justify-center">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>ファイルを選択</span>
                      <input
                        required
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              handleChange({
                                target: {
                                  name: "avatar",
                                  value: event.target?.result,
                                },
                              });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                    <p className="pl-1">またはドラッグ＆ドロップ</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="name"
            // className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            氏名
          </label>
          <input
            type="text"
            name="name"
            id="name"
            // className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 dark:focus:border-blue-500
              ${
                errors.name
                  ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            placeholder=" "
            required
            onChange={handleChange}
            onFocus={handleFocus}
            value={user.name}
          />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="namejp"
            // className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            フリガナ
          </label>
          <input
            type="text"
            name="namejp"
            id="namejp"
            // className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 dark:focus:border-blue-500
              ${
                errors.namejp
                  ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            placeholder=" "
            required
            onChange={handleChange}
            onFocus={handleFocus}
            value={user.nameJP}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-4 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <div
            id="date-range-picker"
            date-rangepicker
            className="flex items-center"
          >
            <div className="relative ">
              <label
                htmlFor="birthday"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                生年月日
              </label>

              <input
                id="birthday"
                name="birthday"
                lang="ja"
                type="date"
                // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                  dark:focus:ring-blue-500 dark:focus:border-blue-500
                  ${
                    errors.birthday
                      ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                placeholder="Select date start"
                value={user.birthday}
                onChange={handleChange}
                onFocus={handleFocus}
                required
              />
            </div>
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <div
            id="date-range-picker"
            date-rangepicker
            className="flex items-center"
          >
            <div className="relative ">
              <label
                htmlFor="age"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                年齢(歳)
              </label>

              <input
                id="age"
                name="age"
                type="text"
                disabled
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={user.age}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="sex"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            性別
          </label>
          <select
            name="sex"
            id="sex"
            // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 dark:focus:border-blue-500
              ${
                errors.sex
                  ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            onChange={handleChange}
            onFocus={handleFocus}
            required
          >
            <option value="">--選択--</option>
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="blood"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            血液型
          </label>
          <select
            name="blood"
            id="blood"
            // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 dark:focus:border-blue-500
              ${
                errors.blood
                  ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            onChange={handleChange}
            onFocus={handleFocus}
            value={user.blood}
            required
          >
            <option value="">--選択--</option>
            <option value="A型">A型</option>
            <option value="B型">B型</option>
            <option value="AB型">AB型</option>
            <option value="O型">O型</option>
            <option value="未検査">未検査</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-4 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <div id="date-range-picker" className="flex items-center">
            <div className="relative ">
              <label
                htmlFor="height"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                身長(cm)
              </label>

              <input
                id="height"
                name="height"
                type="number"
                // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                  dark:focus:ring-blue-500 dark:focus:border-blue-500
                  ${
                    errors.height
                      ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                value={user.height}
                onChange={handleChange}
                onFocus={handleFocus}
                min="1"
                required
              />
            </div>
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <div id="date-range-picker" className="flex items-center">
            <div className="relative ">
              <label
                htmlFor="weight"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                体重(Kg)
              </label>

              <input
                id="weight"
                name="weight"
                type="number"
                // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                  dark:focus:ring-blue-500 dark:focus:border-blue-500
                  ${
                    errors.weight
                      ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                value={user.weight}
                onChange={handleChange}
                onFocus={handleFocus}
                required
                min="1"
              />
            </div>
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <div id="date-range-picker" className="flex items-center">
            <div className="relative ">
              <label
                htmlFor="BMI"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                BMI
              </label>

              <input
                id="BMI"
                name="BMI"
                disabled
                type="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={user.BMI}
                required
              />
            </div>
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="blindColor"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            色弱
          </label>
          <select
            name="blindColor"
            id="blindColor"
            // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 dark:focus:border-blue-500
              ${
                errors.blindColor
                  ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            onChange={handleChange}
            onFocus={handleFocus}
            value={user.blindColor}
            required
          >
            <option value="">--選択--</option>
            <option value="あり">あり</option>
            <option value="なし">なし</option>
          </select>
        </div>
      </div>
      <div className="grid md:grid-cols-4 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <div id="date-range-picker" className="flex items-center">
            <div className="relative w-full">
              <label
                htmlFor="eyes"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                視力
              </label>

              <select
                name="leftEye"
                id="eyes"
                // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                  dark:focus:ring-blue-500 dark:focus:border-blue-500
                  ${
                    errors.leftEye
                      ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                onChange={handleChange}
                onFocus={handleFocus}
                value={user.leftEye}
                required
              >
                <option value="">--左目--</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <div id="date-range-picker" className="flex items-center">
            <div className="relative w-full">
              <label
                htmlFor="rightEye"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white opacity-0"
              >
                視力
              </label>

              <select
                name="rightEye"
                id="rightEye"
                // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                  dark:focus:ring-blue-500 dark:focus:border-blue-500
                  ${
                    errors.rightEye
                      ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                onFocus={handleFocus}
                onChange={handleChange}
                value={user.rightEye}
                required
              >
                <option value="">--右目--</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="hand"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            利き手
          </label>
          <select
            name="hand"
            id="hand"
            // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 dark:focus:border-blue-500
              ${
                errors.hand
                  ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            onFocus={handleFocus}
            onChange={handleChange}
            value={user.hand}
            required
          >
            <option value="">--選択--</option>
            <option value="右手">右手</option>
            <option value="左手">左手</option>
            <option value="両手">両手</option>
          </select>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="married"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            配偶者
          </label>
          <select
            name="married"
            id="married"
            // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 dark:focus:border-blue-500
              ${
                errors.married
                  ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            onFocus={handleFocus}
            onChange={handleChange}
            value={user.married}
            required
          >
            <option value="">--選択--</option>
            <option value="未婚">未婚</option>
            <option value="既婚">既婚</option>
            <option value="既婚">離婚</option>
            <option value="既婚">死別</option>
          </select>
        </div>
      </div>
      <div className="grid md:grid-cols-4 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <div id="date-range-picker" className="flex items-center">
            <div className="relative w-full">
              <label
                htmlFor="driverLicense"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                運転免許
              </label>

              <select
                name="driverLicense"
                id="driverLicense"
                //className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                  dark:focus:ring-blue-500 dark:focus:border-blue-500
                  ${
                    errors.driverLicense
                      ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                onFocus={handleFocus}
                onChange={handleChange}
                value={user.driverLicense}
                required
              >
                <option value="">--選択--</option>
                <option value="二輪車">二輪車</option>
                <option value="普通自動車">普通自動車</option>
                <option value="なし">なし</option>
              </select>
            </div>
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <div id="date-range-picker" className="flex items-center">
            <div className="relative w-full">
              <label
                htmlFor="smoke"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                喫煙の有無
              </label>

              <select
                name="smoke"
                id="smoke"
                //className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                  dark:focus:ring-blue-500 dark:focus:border-blue-500
                  ${
                    errors.smoke
                      ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                onFocus={handleFocus}
                onChange={handleChange}
                value={user.smoke}
                required
              >
                <option value="">--選択--</option>
                <option value="なし">なし</option>
                <option value="あり">あり</option>
              </select>
            </div>
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="alcohol"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            飲酒の有無
          </label>
          <select
            name="alcohol"
            id="alcohol"
            //className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 dark:focus:border-blue-500
              ${
                errors.alcohol
                  ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            onFocus={handleFocus}
            onChange={handleChange}
            value={user.alcohol}
            required
          >
            <option value="">--選択--</option>
            <option value="なし">なし</option>
            <option value="あり">あり</option>
          </select>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="tattoo"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            刺青の有無
          </label>
          <select
            name="tattoo"
            id="tattoo"
            //className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 dark:focus:border-blue-500
              ${
                errors.tattoo
                  ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            onFocus={handleFocus}
            required
            onChange={handleChange}
            value={user.tattoo}
          >
            <option value="">--選択--</option>
            <option value="なし">なし</option>
            <option value="あり">あり</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-1 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="address"
            // className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            現住所
          </label>
          <input
            type="text"
            name="address"
            id="address"
            // className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            //className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 dark:focus:border-blue-500
              ${
                errors.address
                  ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            onFocus={handleFocus}
            placeholder=" "
            required
            onChange={handleChange}
            value={user.address}
          />
        </div>
      </div>
      <div className="border-2 border-solid p-3">
        <h3 className="mb-4 mt-2">学歴</h3>
        {user.school.map((school: any, index: any) => {
          return (
            <div className="grid md:grid-cols-6 md:gap-6">
              <div className="relative z-0 col-span-2 w-full mb-5 group">
                <label
                  htmlFor="schoolTime1"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  期間
                </label>
                <DatePicker
                  selected={
                    school.timeFrom instanceof Date ? school.timeFrom : null
                  }
                  startDate={
                    school.timeFrom instanceof Date ? school.timeFrom : null
                  }
                  endDate={school.timeTo instanceof Date ? school.timeTo : null}
                  onChange={(u) => handleChangeTime(u, index)}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  locale="ja"
                  selectsRange
                  placeholderText="mm/yyyy"
                  required
                  popperClassName="some-custom-class"
                  popperPlacement="top-end"
                  popperModifiers={[
                    {
                      name: "myModifier",
                      fn(state) {
                        // Do something with the state
                        return state;
                      },
                    },
                  ]}
                  className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                    dark:focus:ring-blue-500 dark:focus:border-blue-500
                    ${
                      errors.school[index].error != ""
                        ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                />
                <div>
                  <span className="text-xs text-red-500">
                    {errors.school[index].error}
                  </span>
                </div>
              </div>

              <div className="relative z-0 col-span-2 w-full mb-5 group">
                <label
                  htmlFor={`schoolName${index}`}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  学校名
                </label>
                <input
                  type="text"
                  name={`schoolName${index}`}
                  id={`schoolName${index}`}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=" "
                  onChange={(e) =>
                    onChangeSchoolTime(index, "name", e.target.value)
                  }
                  value={school.name}
                  required
                />
              </div>
              <div className="relative z-0  w-full mb-5 group">
                <label
                  htmlFor={`schoolContent${index}`}
                  // className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  学習内容
                </label>
                <select
                  name={`schoolContent${index}`}
                  id={`schoolContent${index}`}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) =>
                    onChangeSchoolTime(index, "content", e.target.value)
                  }
                  value={school.school}
                  required
                >
                  <option value="">--選択--</option>
                  <option value="小学校">小学校</option>
                  <option value="中学校">中学校</option>
                  <option value="高校">高校</option>
                  <option value="短期大学">短期大学</option>
                  <option value="専門学校">専門学校</option>
                  <option value="大学">大学</option>
                </select>
              </div>
              <div className="relative z-0  w-full mb-5 group">
                <label
                  htmlFor={`schoolCurrent${index}`}
                  // className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  現在
                </label>
                <input
                  type="text"
                  name={`schoolCurrent${index}`}
                  id={`schoolCurrent${index}`}
                  // className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=" "
                  onChange={(e: any) =>
                    onChangeSchoolTime(index, "current", e.target.value)
                  }
                  value={school.current}
                  required
                />
              </div>
            </div>
          );
        })}
        <div className="flex flex-row-reverse">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={onAddSchool}
          >
            学歴を追加する
          </button>
        </div>
      </div>
      <div className="border-2 border-solid p-3 mt-5 mb-5">
        <h3 className="mb-4 mt-2">職歴</h3>
        {user.company.map((company: any, index: any) => {
          return (
            <div className="grid md:grid-cols-6 md:gap-6">
              <div className="relative z-0 col-span-2 w-full mb-5 group">
                <label
                  htmlFor="companyTime1"
                  // className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  期間
                </label>
                <DatePicker
                  selected={
                    company.timeFrom instanceof Date ? company.timeFrom : null
                  }
                  startDate={
                    company.timeFrom instanceof Date ? company.timeFrom : null
                  }
                  endDate={
                    company.timeTo instanceof Date ? company.timeTo : null
                  }
                  onChange={(u) => handleChangeCompanyTime(u, index)}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  locale="ja"
                  selectsRange
                  placeholderText="mm/yyyy"
                  required
                  popperPlacement="top-start" // hoặc 'top'
                  className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                    dark:focus:ring-blue-500 dark:focus:border-blue-500
                    ${
                      errors.company[index].error != ""
                        ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                />
                <div>
                  <span className="text-xs text-red-500">
                    {errors.company[index].error}
                  </span>
                </div>
              </div>
              <div className="relative z-0 col-span-2 w-full mb-5 group">
                <label
                  htmlFor={`companyName${index}`}
                  // className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  会社（職場）
                </label>
                <input
                  type="text"
                  name={`companyName${index}`}
                  id={`companyName${index}`}
                  // className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=" "
                  onChange={(e) =>
                    onChangeCompanyTime(index, "name", e.target.value)
                  }
                  value={company.name}
                  required
                />
              </div>
              <div className="relative z-0 col-span-2 w-full mb-5 group">
                <label
                  htmlFor={`companyContent${index}`}
                  // className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  仕事の内容
                </label>
                <input
                  type="text"
                  name={`companyContent${index}`}
                  id={`companyContent${index}`}
                  // className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=" "
                  // onChange={handleChange}
                  onChange={(e) =>
                    onChangeCompanyTime(index, "content", e.target.value)
                  }
                  value={company.content}
                  required
                />
              </div>
            </div>
          );
        })}
        <div className="flex flex-row-reverse">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={onAddCompany}
          >
            職務経歴を追加
          </button>
        </div>
      </div>

      <div className="border-2 border-solid p-3 mt-5 mb-5">
        <h3 className="mb-4 mt-2">家族構成</h3>
        {user.family.map((family: any, index: any) => {
          return (
            <div className="grid md:grid-cols-9 md:gap-6" key={index}>
              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor={`relationship${index}`}
                  // className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  関係
                </label>
                {/* <input
                  type="text"
                  name={`relationship${index}`}
                  id={`relationship${index}`}
                  // className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=" "
                  onChange={(e) =>
                    onChangeFamilyTime(index, "relationship", e.target.value)
                  }
                  required
                  value={family.relationship}
                /> */}
                <select
                  name={`relationship${index}`}
                  id={`relationship${index}`}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) =>
                    onChangeFamilyTime(index, "relationship", e.target.value)
                  }
                  value={family.relationship}
                  required
                >
                  <option value="">--</option>
                  <option value="父">父</option>
                  <option value="母">母</option>
                  <option value="兄">兄</option>
                  <option value="姉">姉</option>
                  <option value="弟">弟</option>
                  <option value="妹">妹</option>
                  <option value="妻">妻</option>
                  <option value="夫">夫</option>
                  <option value="息子">息子</option>
                  <option value="娘">娘</option>
                </select>
              </div>
              <div className="relative z-0 col-span-3 w-full mb-5 group">
                <label
                  htmlFor={`name${index}`}
                  // className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  氏名
                </label>
                <input
                  type="text"
                  name={`name${index}`}
                  id={`name${index}`}
                  // className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=" "
                  onChange={(e) =>
                    onChangeFamilyTime(index, "name", e.target.value)
                  }
                  required
                  value={family.name}
                />
              </div>
              <div className="relative z-0  w-full mb-5 group">
                <label
                  htmlFor={`year${index}`}
                  // className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  生年
                </label>
                {/* <input
                  type="text"
                  name={`year${index}`}
                  id={`year${index}`}
                  // className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=" "
                  onChange={(e) =>
                    onChangeFamilyTime(index, "year", e.target.value)
                  }
                  required
                  value={family.year}
                /> */}
                <DatePicker
                  selected={family.year}
                  onChange={(date) => onChangeFamilyTime(index, "year", date)}
                  showYearPicker
                  required
                  dateFormat="yyyy"
                  value={family.year}
                  popperClassName="some-custom-class"
                  popperPlacement="top-end"
                  // popperModifiers={[
                  //   {
                  //     name: "myModifier",
                  //     fn(state) {
                  //       // Do something with the state
                  //       return state;
                  //     },
                  //   },
                  // ]}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="relative z-0 col-span-2 w-full mb-5 group">
                <label
                  htmlFor={`location${index}`}
                  // className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  会社名（場所）
                </label>
                <input
                  type="text"
                  name={`location${index}`}
                  id={`location${index}`}
                  // className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=" "
                  onChange={(e) =>
                    onChangeFamilyTime(index, "location", e.target.value)
                  }
                  required
                  value={family.location}
                />
              </div>
              <div className="relative z-0 col-span-2 w-full mb-5 group">
                <label
                  htmlFor={`occupation${index}`}
                  // className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  職業
                </label>
                <input
                  type="text"
                  name={`occupation${index}`}
                  id={`occupation${index}`}
                  // className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=" "
                  onChange={(e) =>
                    onChangeFamilyTime(index, "occupation", e.target.value)
                  }
                  required
                  value={family.occupation}
                />
              </div>
            </div>
          );
        })}
        <div className="flex flex-row-reverse">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={onAddFamily}
          >
            家族を追加
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="interest"
            // className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            趣味
          </label>
          <input
            type="text"
            name="interest"
            id="interest"
            // className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            //className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 dark:focus:border-blue-500
              ${
                errors.interest
                  ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            onFocus={handleFocus}
            required
            placeholder=" "
            onChange={handleChange}
            value={user.interest}
          />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="foreignLanguage"
            // className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            外国語
          </label>
          <input
            type="text"
            name="foreignLanguage"
            id="foreignLanguage"
            // className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            //className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 dark:focus:border-blue-500
              ${
                errors.foreignLanguage
                  ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            onFocus={handleFocus}
            required
            placeholder=" "
            onChange={handleChange}
            value={user.foreignLanguage}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="strong"
            // className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            長所
          </label>
          <input
            type="text"
            name="strong"
            id="strong"
            // className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            //className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 dark:focus:border-blue-500
              ${
                errors.strong
                  ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            onFocus={handleFocus}
            required
            placeholder=" "
            onChange={handleChange}
            value={user.strong}
          />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="weak"
            // className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            短所
          </label>
          <input
            type="text"
            name="weak"
            id="weak"
            // className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            //className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 dark:focus:border-blue-500
              ${
                errors.weak
                  ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            onFocus={handleFocus}
            required
            placeholder=" "
            onChange={handleChange}
            value={user.weak}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="aim"
            // className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            日本に行くの目的・志望・動機
          </label>
          <input
            type="text"
            name="aim"
            id="aim"
            // className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            //className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 dark:focus:border-blue-500
              ${
                errors.aim
                  ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            onFocus={handleFocus}
            required
            placeholder=" "
            onChange={handleChange}
            value={user.aim}
          />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="plan"
            // className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            実習期間が終了した後、どんな予定がありますか
          </label>
          <input
            type="text"
            name="plan"
            id="plan"
            // className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            //className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 dark:focus:border-blue-500
              ${
                errors.plan
                  ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            onFocus={handleFocus}
            required
            placeholder=" "
            onChange={handleChange}
            value={user.plan}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="money"
            // className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            ３年間後いくら貯金したいですか
          </label>
          <input
            type="text"
            name="money"
            id="money"
            // className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            //className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 dark:focus:border-blue-500
              ${
                errors.money
                  ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            onFocus={handleFocus}
            required
            placeholder=" "
            onChange={handleChange}
            value={user.money}
          />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="familyInJapan"
            // className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            日本に親戚がいますか。
          </label>
          <select
            name="familyInJapan"
            id="familyInJapan"
            //className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 dark:focus:border-blue-500
              ${
                errors.familyInJapan
                  ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            onFocus={handleFocus}
            required
            onChange={handleChange}
            value={user.familyInJapan}
          >
            <option value="">--選択--</option>
            <option value="なし">なし</option>
            <option value="はい">はい</option>
          </select>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="moveForeign"
            // className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            外国へ行ったことがありますか。
          </label>
          <select
            name="moveForeign"
            id="moveForeign"
            //className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
              dark:focus:ring-blue-500 dark:focus:border-blue-500
              ${
                errors.moveForeign
                  ? "border-red-500 dark:border-red-500 focus:border-red-500 dark:focus:border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            onFocus={handleFocus}
            required
            onChange={handleChange}
            value={user.moveForeign}
          >
            <option value="">--選択--</option>
            <option value="なし">なし</option>
            <option value="はい">はい</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        提出する
      </button>
    </form>
  );
};

export default CreateCV;
