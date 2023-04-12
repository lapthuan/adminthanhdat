import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AddHome = () => {
  const [imgheader, setImgHeader] = useState("");
  const [imgservice, setImgService] = useState("");
  const [titleheader, setTitleheader] = useState("");
  const [titleprodcut1, setTitleProduct1] = useState("");
  const [titleprodcut2, setTitleProduct2] = useState("");
  const [titleservice, setitleService] = useState("");
  const [descriptionservices, setDescriptionService] = useState("");

  const [titlesanpham1, setTitlesanpham1] = useState("");
  const [titlesanpham2, setTitlesanpham2] = useState("");
  const [descriptionsanpham1, setDescriptionSanPham1] = useState("");
  const [descriptionsanpham2, setDescriptionSanPham2] = useState("");

  useEffect(() => {
    const getdata = async () => {
      await axios
        .get("https://ecom-oto.vercel.app/api/home/")
        .then((response) => {
          console.log(response.data);
          const dataHome = response.data[0];
          setImgHeader(dataHome.imgheader.secure_url);
          setTitleheader(dataHome.titleheader);
          setImgService(dataHome.imgservice.secure_url);
          setTitleProduct1(dataHome.titleprodcut1);
          setTitleProduct2(dataHome.titleprodcut2);
          setitleService(dataHome.titleservice);
          setDescriptionService(dataHome.descriptionservice);
          setTitlesanpham1(dataHome.titlesanpham1);
          setTitlesanpham2(dataHome.titlesanpham2);
          setDescriptionSanPham1(dataHome.descriptionsanpham1);
          setDescriptionSanPham2(dataHome.descriptionsanpham2);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getdata();
  }, []);

  const handleUpdateHome = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("imgheader", imgheader);
    formData.append("imgservice", imgservice);
    formData.append("titleheader", titleheader);
    formData.append("titleprodcut1", titleprodcut1);
    formData.append("titleprodcut2", titleprodcut2);
    formData.append("titleservice", titleservice);
    formData.append("descriptionservice", descriptionservices);
    formData.append("titlesanpham1", titlesanpham1);
    formData.append("titlesanpham2", titlesanpham2);
    formData.append("descriptionsanpham1", descriptionsanpham1);
    formData.append("descriptionsanpham2", descriptionsanpham2);
    axios
      .put("https://ecom-oto.vercel.app/api/home/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((Response) => {
        alert("Cập nhật thành công");
      })
      .catch((error) => {
        if (error.response.status === 500) {
          console.log(error);
          alert("Cập nhật không thành công");
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
          Trang Chủ
        </h3>
        <div>
          <form
            encType="multipart/form-data"
            className="d-flex gap-3 flex-column"
            onSubmit={handleUpdateHome}
          >
            <div>
              <label
                className="block mb-2 font-medium text-blue-500 "
                for="file_input"
              >
                Chỉnh sửa header
              </label>
              <textarea
                type="text"
                id="default-input"
                value={titleheader}
                className="bg-gray-50 border border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%] h-[200px]"
                onChange={(e) => {
                  setTitleheader(e.target.value);
                }}
              />
              <div>
                <input
                  class="block w-[98%] text-lg text-black border border-gray-300  cursor-pointer bg-gray-50 mt-2"
                  id="large_size"
                  type="file"
                  onChange={(e) => setImgHeader(e.target.files[0])}
                />
              </div>
              <img src={imgheader} alt="" width={100} height={80} />
            </div>
            <div className="mt-5">
              <label
                className="block mb-2 font-medium text-blue-500 "
                for="file_input"
              >
                Chỉnh sửa tiêu đề
              </label>
              <textarea
                type="text"
                id="default-input"
                value={titleprodcut1}
                className="bg-gray-50 border border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%] h-[200px]"
                onChange={(e) => {
                  setTitleProduct1(e.target.value);
                }}
              />
              <textarea
                type="text"
                id="default-input"
                value={titleprodcut2}
                className="bg-gray-50 border border-gray-300 text-gray-900 mt-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%] h-[200px]"
                onChange={(e) => {
                  setTitleProduct2(e.target.value);
                }}
              />
               <label
                className="block mb-2 font-medium text-blue-500 "
                for="file_input"
              >
                Title sản phẩm 1 (Sạc AC)
              </label>
              <input
                type="text"
                id="default-input"
                value={titlesanpham1}
                className="bg-gray-50 border border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                onChange={(e) => {
                  setTitlesanpham1(e.target.value);
                }}
              />
               <label
                className="block mb-2 font-medium text-blue-500 "
                for="file_input"
              >
                Mô tả sản phẩm 1 (Sạc AC)
              </label>
              <input
                type="text"
                id="default-input"
                value={descriptionsanpham1}
                className="bg-gray-50 border border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                onChange={(e) => {
                  setDescriptionSanPham1(e.target.value);
                }}
              />
               <label
                className="block mb-2 font-medium text-blue-500 "
                for="file_input"
              >
                Title sản phẩm 2(Sạc DC)
              </label>
              <input
                type="text"
                id="default-input"
                value={titlesanpham2}
                className="bg-gray-50 border border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                onChange={(e) => {
                  setTitlesanpham2(e.target.value);
                }}
              />
               <label
                className="block mb-2 font-medium text-blue-500 "
                for="file_input"
              >
                Mô tả sản phẩm 2 (Sạc DC)
              </label>
              <input
                type="text"
                id="default-input"
                value={descriptionsanpham2}
                className="bg-gray-50 border border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                onChange={(e) => {
                  setDescriptionSanPham2(e.target.value);
                }}
              />
            </div>
            <div className="mt-5">
              <label
                className="block mb-2 font-medium text-blue-500 "
                for="file_input"
              >
                Chỉnh sửa dịch vụ
              </label>
              <textarea
                type="text"
                id="default-input"
                value={titleservice}
                className="bg-gray-50 border border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%] h-[200px]"
                onChange={(e) => {
                  setitleService(e.target.value);
                }}
              />
              <div>
                <input
                  class="block w-[98%] mt-2 text-lg text-black border border-gray-300  cursor-pointer bg-gray-50"
                  id="large_size"
                  type="file"
                  onChange={(e) => setImgService(e.target.files[0])}
                />
              </div>
              <img src={imgservice} alt="" width={100} height={80} />
              <textarea
                type="text"
                id="default-input"
                value={descriptionservices}
                className="bg-gray-50 border mt-2 border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%] h-[200px]"
                onChange={(e) => setDescriptionService(e.target.value)}
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

export default AddHome;
