import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const AddService = () => {
  const [service, setService] = useState([]);
  const [imageheader, setImageHeader] = useState("");
  const [titleheaders, setTitleHeader] = useState("");
  const [imgbody1, setTitlebody1] = useState("");
  const [imgbody2, setTitlebody2] = useState("");
  const [titlebody, setTitleBody] = useState("");
  useEffect(() => {
    const getdata = async () => {
      await axios
        .get("https://ecom-oto.vercel.app/api/company-service/")
        .then((response) => {
          setImageHeader(response.data[0].imgheader.secure_url);
          setTitleHeader(response.data[0].titleheader);
          setTitlebody1(response.data[0].imgbody1.secure_url);
          setTitlebody2(response.data[0].imgbody2.secure_url);
          setTitleBody(response.data[0].titlebody1);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getdata();
  }, []);

  const handleUpdateService = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("imgheader", imageheader);
    formData.append("imgbody1", imgbody1);
    formData.append("imgbody2", imgbody2);
    formData.append("titleheader", titleheaders);
    formData.append("titlebody1", titlebody);

    axios
      .put("https://ecom-oto.vercel.app/api/company-service", formData, {
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
          alert("Cập nhật không thành");
        } else {
          console.error(error);
        }
      });
  };
  return (
    <div className="max-w-full lg:w-[100%]">
      <>
        <h3 className="mb-4 text-xl font-bold">
          {/* {getBrandId !== undefined ? "Edit" : "Add"} Brand */} Quản Lý Dịch
          Vụ
        </h3>
        <div>
          <form
            encType="multipart/form-data"
            className="d-flex gap-3 flex-column"
            onSubmit={handleUpdateService}
          >
            <div>
              <div>
                <label
                  className="block mb-2 font-medium text-blue-500 "
                  for="file_input"
                >
                  Thông tin header
                </label>
                <textarea
                  type="text"
                  id="default-input"
                  className="bg-gray-50 border border-gray-300 mt-2 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                  onChange={(e) => {
                    setTitleHeader(e.target.value);
                  }}
                  value={titleheaders}
                />
                <div>
                  <input
                    class="block w-[98%] text-lg text-black border border-gray-300  cursor-pointer bg-gray-50 mt-2"
                    id="large_size"
                    type="file"
                    onChange={(e) => setImageHeader(e.target.files[0])}
                  />
                  <img src={imageheader} alt="" width={100} height={80} />
                </div>
              </div>

              <div>
                <label
                  className="block mb-2 font-medium text-blue-500 mt-5 "
                  for="file_input"
                >
                  Nhập thông tin thân trang
                </label>
                <textarea
                  type="text"
                  id="default-input"
                  className="bg-gray-50 border border-gray-300 text-gray-900 mt-2   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%] h-[200px]"
                  value={titlebody}
                  onChange={(e) => {
                    setTitleBody(e.target.value);
                  }}
                />
              </div>
              <div>
                <input
                  class="block w-[98%] text-lg mt-2 text-black border border-gray-300  cursor-pointer bg-gray-50"
                  id="large_size"
                  type="file"
                  onChange={(e) => setTitlebody1(e.target.files[0])}
                />
                <img src={imgbody1} alt="" width={100} height={80} />
              </div>
              <div>
                <input
                  class="block w-[98%] text-lg mt-2 text-black border border-gray-300  cursor-pointer bg-gray-50"
                  id="large_size"
                  type="file"
                  onChange={(e) => setTitlebody2(e.target.files[0])}
                />
                <img src={imgbody2} alt="" width={100} height={80} />
              </div>
            </div>

            <button
              className="bg-blue-500 text-white lg:h-[40px]  lg:w-[250px] mt-2 rounded-3 my-5 w-[210px] h-[40px] "
              type="submit"
            >
              Chỉnh sửa dịch vụ
            </button>
          </form>
        </div>
      </>
    </div>
  );
};

export default AddService;
