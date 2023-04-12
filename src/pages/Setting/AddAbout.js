import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import * as yup from "yup";

import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddAbout = () => {
  const [about, setAbout] = useState([]);
  const [imgheader, setImgHeader] = useState("");
  const [imgwhoarewe, setImgWhoAreWe] = useState("");
  const [imgstartupstory1, setImgStartUpStory1] = useState("");
  const [imgstartupstory2, setImgStartUpStory2] = useState("");
  const [imgslide1, setImgSlide1] = useState("");
  const [imgslide2, setImgSlide2] = useState("");
  const [imgslide3, setImgSlide3] = useState("");
  const [descriptionwhoarewe, setDescriptionWhoAreWe] = useState("");
  const [descriptionstartupstory1, setDescriptionStartupstory1] = useState("");
  const [descriptionstartupstory2, setDescriptionStartupstory2] = useState("");
  const [descriptionstartupstory3, setDescriptionStartupstory3] = useState("");
  const [chatluong, setChatluong] = useState("");
  const [chuyennghiep, setChuyennghiep] = useState("");
  const [tienphong, setTienphong] = useState("");
  const [tamnhin, setTamnhin] = useState("");
  const [sumang, setSumang] = useState("");

  useEffect(() => {
    const getdata = async () => {
      await axios
        .get("https://ecom-oto.vercel.app/api/about-us/")
        .then((response) => {
          const datasAboutUs = response.data[0];
          setImgHeader(datasAboutUs.imgheader.secure_url);
          setImgWhoAreWe(datasAboutUs.imgwhoarewe.secure_url);
          setImgStartUpStory1(datasAboutUs.imgstartupstory1.secure_url);
          setImgStartUpStory2(datasAboutUs.imgstartupstory2.secure_url);
          setImgSlide1(datasAboutUs.imgslide1.secure_url);
          setImgSlide2(datasAboutUs.imgslide2.secure_url);
          setImgSlide3(datasAboutUs.imgslide3.secure_url);
          setDescriptionWhoAreWe(datasAboutUs.descriptionwhoarewe);
          setDescriptionStartupstory1(datasAboutUs.descriptionstartupstory1);
          setDescriptionStartupstory2(datasAboutUs.descriptionstartupstory2);
          setDescriptionStartupstory3(datasAboutUs.descriptionstartupstory3);
          setChatluong(datasAboutUs.chatluong);
          setChuyennghiep(datasAboutUs.chuyennghiep);
          setTienphong(datasAboutUs.tienphong);
          setTamnhin(datasAboutUs.tamnhin);
          setSumang(datasAboutUs.sumang);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getdata();
  }, []);
  const handleUpdateAboutUs = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("imgheader", imgheader);
    formData.append("imgwhoarewe", imgwhoarewe);
    formData.append("imgstartupstory1", imgstartupstory1);
    formData.append("imgstartupstory2", imgstartupstory2);
    formData.append("imgslide1", imgslide1);
    formData.append("imgslide2", imgslide2);
    formData.append("imgslide3", imgslide3);
    formData.append("descriptionwhoarewe", descriptionwhoarewe);
    formData.append("descriptionstartupstory1", descriptionstartupstory1);
    formData.append("descriptionstartupstory2", descriptionstartupstory2);
    formData.append("descriptionstartupstory3", descriptionstartupstory3);
    formData.append("chatluong", chatluong);
    formData.append("chuyennghiep", chuyennghiep);
    formData.append("tienphong", tienphong);
    formData.append("tamnhin", tamnhin);
    formData.append("sumang", sumang);

    axios
      .put("https://ecom-oto.vercel.app/api/about-us/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((Response) => {
        toast.success("Cập nhật thành công");
      })
      .catch((error) => {
        if (error.response.status === 500) {
          console.log(error);
          toast.warning("Cập nhật không thành công");
        } else {
          console.error(error);
        }
      });
  };
  return (
    <div className="max-w-full lg:w-[100%]">
      <>
        <h3 className="mb-4 text-xl font-bold">
          {/* {getBrandId !== undefined ? "Edit" : "Add"} Brand */} Quản Lý
          Thông Tin Chúng Tôi Là Ai
        </h3>
        <div>
          <form
            encType="multipart/form-data"
            className="d-flex gap-3 flex-column"
            onSubmit={handleUpdateAboutUs}
          >
            <div>
              <label
                className="block mb-2 font-medium uppercase text-gray-700 "
                for="file_input"
              >
                Chỉnh sửa nội dung tiêu đề
              </label>
              <label
                className="block mb-2 font-medium text-blue-500 "
                for="file_input"
              >
                Ảnh tiêu đề
              </label>
              <div>
                <input
                  class="block w-[98%] text-lg text-black border border-gray-300  cursor-pointer bg-gray-50 mt-2"
                  id="large_size"
                  type="file"
                  onChange={(e) => setImgHeader(e.target.files[0])}
                />
                <img src={imgheader} alt="" width={100} height={80} />
              </div>
            </div>
            <div className="mt-5">
              <label
                className="block mb-2 font-medium uppercase text-gray-700 "
                for="file_input"
              >
                Chỉnh sửa nội dung chúng ta là ai
              </label>
              <label
                className="block mb-2 font-medium text-blue-500 "
                for="file_input"
              >
                Nội dung giới thiệu
              </label>
              <textarea
                type="text"
                id="default-input"
                className="bg-gray-50 borde r border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%] h-[200px]"
                value={descriptionwhoarewe}
                onChange={(e) => {
                  setDescriptionWhoAreWe(e.target.value);
                }}
              />
              <div>
                <label
                  className="block mb-2 font-medium text-blue-500 "
                  for="file_input"
                >
                  Ảnh giới thiệu
                </label>
                <input
                  class="block w-[98%] text-lg text-black border border-gray-300  cursor-pointer bg-gray-50 mt-2"
                  id="large_size"
                  type="file"
                  onChange={(e) => setImgWhoAreWe(e.target.files[0])}
                />
                <img src={imgwhoarewe} alt="" width={100} height={80} />
              </div>
            </div>
            <div className="mt-5">
              <label
                className="block mb-2 font-medium uppercase text-gray-700 "
                for="file_input"
              >
                Chỉnh sửa câu chuyện khởi nghiệp
              </label>
              <label
                className="block mb-2 font-medium text-blue-500 "
                for="file_input"
              >
                Ảnh câu chuyện khởi nghiệp 1
              </label>
              <div>
                <input
                  class="block w-[98%] mt-2 text-lg text-black border border-gray-300  cursor-pointer bg-gray-50"
                  id="large_size"
                  type="file"
                  onChange={(e) => setImgStartUpStory1(e.target.files[0])}
                />
                <img src={imgstartupstory1} alt="" width={100} height={80} />
              </div>
              <div>
                <label
                  className="block mb-2 font-medium text-blue-500 "
                  for="file_input"
                >
                  Ảnh câu chuyện khởi nghiệp 2
                </label>
                <input
                  class="block w-[98%] mt-2 text-lg text-black border border-gray-300  cursor-pointer bg-gray-50"
                  id="large_size"
                  type="file"
                  onChange={(e) => setImgStartUpStory2(e.target.files[0])}
                />
                <img src={imgstartupstory2} alt="" width={100} height={80} />
              </div>
              <label
                className="block mb-2 font-medium text-blue-500 mt-2"
                for="file_input"
              >
                Nội dung câu chuyện khởi nghiệp 1
              </label>
              <textarea
                type="text"
                id="default-input"
                value={descriptionstartupstory1}
                className="bg-gray-50 border mt-2 border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%] h-[200px]"
                onChange={(e) => {
                  setDescriptionStartupstory1(e.target.value);
                }}
              />
              <label
                className="block mb-2 font-medium text-blue-500 mt-2"
                for="file_input"
              >
                Nội dung câu chuyện khởi nghiệp 2
              </label>
              <textarea
                type="text"
                id="default-input"
                value={descriptionstartupstory2}
                className="bg-gray-50 border mt-2 border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%] h-[200px]"
                onChange={(e) => {
                  setDescriptionStartupstory2(e.target.value);
                }}
              />
              <label
                className="block mb-2 font-medium text-blue-500 mt-2"
                for="file_input"
              >
                Nội dung câu chuyện khởi nghiệp 3
              </label>
              <textarea
                type="text"
                id="default-input"
                value={descriptionstartupstory3}
                className="bg-gray-50 border mt-2 border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%] h-[200px]"
                onChange={(e) => {
                  setDescriptionStartupstory3(e.target.value);
                }}
              />
            </div>
            <div className="mt-5">
              <label
                className="block mb-2 font-medium uppercase text-gray-700 "
                for="file_input"
              >
                Chỉnh sửa ảnh slider
              </label>
              <div>
                <label
                  className="block mb-2 font-medium text-blue-500 mt-2"
                  for="file_input"
                >
                  Ảnh slide 1
                </label>
                <input
                  class="block w-[98%] mt-2 text-lg text-black border border-gray-300  cursor-pointer bg-gray-50"
                  id="large_size"
                  type="file"
                  onChange={(e) => setImgSlide1(e.target.files[0])}
                />
                <img src={imgslide1} alt="" width={100} height={80} />
              </div>
              <div>
                <label
                  className="block mb-2 font-medium text-blue-500 mt-2"
                  for="file_input"
                >
                  Ảnh slide 2
                </label>
                <input
                  class="block w-[98%] mt-2 text-lg text-black border border-gray-300  cursor-pointer bg-gray-50"
                  id="large_size"
                  type="file"
                  onChange={(e) => setImgSlide2(e.target.files[0])}
                />
                <img src={imgslide2} alt="" width={100} height={80} />
              </div>
              <div>
                <label
                  className="block mb-2 font-medium text-blue-500 mt-2"
                  for="file_input"
                >
                  Ảnh slide 3
                </label>
                <input
                  class="block w-[98%] mt-2 text-lg text-black border border-gray-300  cursor-pointer bg-gray-50"
                  id="large_size"
                  type="file"
                  onChange={(e) => setImgSlide3(e.target.files[0])}
                />
                <img src={imgslide3} alt="" width={100} height={80} />
              </div>
              <label
                className="block mb-2 font-medium text-blue-500 mt-2"
                for="file_input"
              >
                Chất lượng
              </label>
              <input
                type="text"
                id="default-input"
                className="bg-gray-50 border mt-2 border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                value={chatluong}
                onChange={(e) => {
                  setChatluong(e.target.value);
                }}
              />

              <label
                className="block mb-2 font-medium text-blue-500 mt-2"
                for="file_input"
              >
                Chuyên nghiệp
              </label>
              <textarea
                type="text"
                id="default-input"
                className="bg-gray-50 border mt-2 border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                value={chuyennghiep}
                onChange={(e) => {
                  setChuyennghiep(e.target.value);
                }}
              />
              <label
                className="block mb-2 font-medium text-blue-500 mt-2"
                for="file_input"
              >
                Tiên phong
              </label>
              <textarea
                type="text"
                id="default-input"
                className="bg-gray-50 border mt-2 border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                value={tienphong}
                onChange={(e) => {
                  setTienphong(e.target.value);
                }}
              />
              <label
                className="block mb-2 font-medium text-blue-500 mt-2"
                for="file_input"
              >
                Tầm nhìn
              </label>
              <textarea
                type="text"
                id="default-input"
                className="bg-gray-50 border mt-2 border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                value={tamnhin}
                onChange={(e) => {
                  setTamnhin(e.target.value);
                }}
              />
              <label
                className="block mb-2 font-medium text-blue-500 mt-2"
                for="file_input"
              >
                Sứ mạng
              </label>
              <textarea
                type="text"
                id="default-input"
                className="bg-gray-50 border mt-2 border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                value={sumang}
                onChange={(e) => {
                  setSumang(e.target.value);
                }}
              />
            </div>

            <button
              className="bg-blue-500 text-white lg:h-[40px] lg:w-[250px] rounded-3 my-5 w-[210px] h-[40px] "
              type="submit"
            >
              Chỉnh sửa Trang Chủ
            </button>
          </form>
        </div>
      </>
    </div>
  );
};

export default AddAbout;
