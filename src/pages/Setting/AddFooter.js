import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const AddFooter = () => {
  const [logofooter, setLogoFooter] = useState("");
  const [nameweb, setNameWeb] = useState("");
  const [address, setAddress] = useState("");
  const [hotline, setHotline] = useState("");
  const [slogan, setSlogan] = useState("");
  const [iframeggmap, setIfFrameggmap] = useState("");
  const [zalo, setZalo] = useState("");
  const [facebook, setFacebook] = useState("");
  const [gmail, setGmail] = useState("");
  useEffect(() => {
    const getdata = async () => {
      await axios
        .get("https://ecom-oto.vercel.app/api/info/")
        .then((response) => {
          const datas = response.data[0];
          setLogoFooter(datas.logo.secure_url);
          setNameWeb(datas.nameweb);
          setAddress(datas.address);
          setHotline(datas.hotline);
          setSlogan(datas.slogan);
          setIfFrameggmap(datas.iframeggmap);
          setZalo(datas.zalo);
          setFacebook(datas.facebook);
          setGmail(datas.gmail);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getdata();
  }, []);

  const handleUpdateFooter = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("logo", logofooter);
    formData.append("nameweb", nameweb);
    formData.append("address", address);
    formData.append("hotline", hotline);
    formData.append("slogan", slogan);
    formData.append("iframeggmap", iframeggmap);
    formData.append("zalo", zalo);
    formData.append("facebook", facebook);
    formData.append("gmail", gmail);
    axios
      .put("https://ecom-oto.vercel.app/api/info/", formData, {
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
          {/* {getBrandId !== undefined ? "Edit" : "Add"} Brand */} Quản Lý Chân
          Trang
        </h3>
        <div>
          <form
            encType="multipart/form-data"
            className="d-flex gap-3 flex-column"
            onSubmit={handleUpdateFooter}
          >
            <div>
              <label
                className="block font-medium text-blue-500 mb-2 mt-2"
                for="file_input"
              >
                Logo footer
              </label>
              <input
                class="block w-[98%] text-lg text-black border border-gray-300  cursor-pointer bg-gray-50 mt-2"
                id="large_size"
                type="file"
                onChange={(e) => setLogoFooter(e.target.files[0])}
              />
              <img src={logofooter} alt="" width={100} height={80} />
            </div>
            <div>
              {" "}
              <label
                className="block font-medium text-blue-500 mb-2 mt-2"
                for="file_input"
              >
                Coppy Right
              </label>
              <input
                type="text"
                id="default-input"
                value={nameweb}
                className="bg-gray-50 border border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                onChange={(e) => {
                  setNameWeb(e.target.value);
                }}
              />
              <label
                className="block font-medium text-blue-500 mb-2 mt-2"
                for="file_input"
              >
                Khẩu hiệu dưới logo
              </label>
              <input
                type="text"
                id="default-input"
                value={slogan}
                className="bg-gray-50 border border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                onChange={(e) => {
                  setSlogan(e.target.value);
                }}
              />
              <label
                className="block mb-2 font-medium text-blue-500 mt-2"
                for="file_input"
              >
                Thay đổi địa chỉ
              </label>
              <input
                type="text"
                id="default-input"
                value={address}
                className="bg-gray-50 border border-gray-300 mt-2 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
              <label
                className="block mb-2 font-medium text-blue-500 mt-2"
                for="file_input"
              >
                Thay đổi số điện thoại
              </label>
              <input
                type="text"
                id="default-input"
                value={hotline}
                className="bg-gray-50 border border-gray-300 text-gray-900  mt-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                onChange={(e) => {
                  setHotline(e.target.value);
                }}
              />
              <label
                className="block mb-2 font-medium text-blue-500 mt-2"
                for="file_input"
              >
                Thay đổi ifame google map
              </label>
              <input
                type="text"
                id="default-input"
                value={iframeggmap}
                className="bg-gray-50 border border-gray-300 text-gray-900 mt-2   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                onChange={(e) => {
                  setIfFrameggmap(e.target.value);
                }}
              />
              <label
                className="block mb-2 font-medium text-blue-500 mt-2"
                for="file_input"
              >
                Liên hệ zalo
              </label>
              <input
                type="text"
                id="default-input"
                value={zalo}
                className="bg-gray-50 border border-gray-300 text-gray-900 mt-2   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                onChange={(e) => {
                  setZalo(e.target.value);
                }}
              />
                 <label
                className="block mb-2 font-medium text-blue-500 mt-2"
                for="file_input"
              >
                Liên hệ Facebook
              </label>
              <input
                type="text"
                id="default-input"
                value={facebook}
                className="bg-gray-50 border border-gray-300 text-gray-900 mt-2   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                onChange={(e) => {
                  setFacebook(e.target.value);
                }}
              />
                 <label
                className="block mb-2 font-medium text-blue-500 mt-2"
                for="file_input"
              >
                Liên hệ Gmail
              </label>
              <input
                type="text"
                id="default-input"
                value={gmail}
                className="bg-gray-50 border border-gray-300 text-gray-900 mt-2   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
                onChange={(e) => {
                  setGmail(e.target.value);
                }}
              />
            </div>

            <button
              className="bg-blue-500 text-white lg:h-[40px] lg:w-[250px] mt-2 rounded-3 my-5 w-[210px] h-[40px] "
              type="submit"
            >
              Chỉnh sửa
            </button>
          </form>
        </div>
      </>
    </div>
  );
};

export default AddFooter;
