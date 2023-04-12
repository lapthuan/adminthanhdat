import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  getCategories,
  createNewblogCat,
  getABlogCat,
  updateABlogCat,
  deleteABlogCat,
} from "../features/bcategory/bcategorySlice";
import {
  createMenu,
  getABrand,
  resetState,
  updateABrand,
} from "../features/brand/brandSlice";
import axios from "axios";
import { config } from "../utils/axiospostformdata";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { getABlog } from "../features/blogNews/blogSlice";

const Addnews = () => {
  const { id } = useParams();
  const [titles, setTitles] = useState("");
  const [category, setCategory] = useState("");
  const [imageThumbnail, setImageThumbnail] = useState("");
  const [videos, setVideos] = useState("");
  const [editorContent, setEditorContent] = useState(EditorState.createEmpty());
  const blogState = useSelector((state) => state.blognew);
  const { ablogs } = blogState;
  const handleEditorChange = (editorState) => {
    setEditorContent(editorState);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getABlog(id));
    } else {
      setTitles("");
      setCategory("");
      setImageThumbnail("");
      setVideos("");
      setEditorContent("");
    }
  }, [id]);

  useEffect(() => {
    dispatch(getCategories());
  }, []);
  useEffect(() => {
    if (ablogs !== undefined) {
      setTitles(ablogs.title);
      setCategory(ablogs.category);
      if (ablogs.imageThumbnail.secure_url !== undefined) {
        setImageThumbnail(ablogs.imageThumbnail.secure_url);
      } else {
        setImageThumbnail = null;
      }
      setVideos(ablogs.video);
      setEditorContent(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(ablogs.description))
        )
      );
    } else {
      setTitles("");
      setCategory("");
      setImageThumbnail("");
      setVideos("");
      setEditorContent("");
    }
  }, [ablogs]);

  const editsubmitform = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", titles);
    formData.append("category", category);
    formData.append("image", imageThumbnail);
    formData.append("video", videos);
    formData.append(
      "description",
      JSON.stringify(convertToRaw(editorContent.getCurrentContent()))
    );

    axios
      .put(`${process.env.BACKENDAPI}blog/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((Response) => {
        console.log(Response);
        toast.success("Sửa thành công");
      })
      .catch((error) => {
        if (error.response.status === 500) {
          console.log(error);
          toast.warning("Tiêu đề đã tồn tại hoặc chưa chọn danh mục tin tức");
        } else {
          console.error(error);
        }
      });
  };

  const submitform = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", titles);
    formData.append("category", category);
    formData.append("image", imageThumbnail);
    formData.append("video", videos);
    formData.append(
      "description",
      JSON.stringify(convertToRaw(editorContent.getCurrentContent()))
    );

    axios
      .post(`${process.env.REACT_APP_API_URL}blog/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((Response) => {
        console.log(Response);
        toast.success("Thêm thành công");
      })
      .catch((error) => {
        if (error.response.status === 500) {
          console.log(error);
          toast.warning("Tiêu đề đã tồn tại hoặc chưa chọn danh mục tin tức");
        } else {
          console.error(error);
        }
      });
  };

  const blogcategoryState = useSelector((state) => state.bCategory.bCategories);
  const EditBlog = useSelector((state) => state.bCategory.bCategories);
  return (
    <div className="max-w-full lg:w-[100%]">
      <h3 className="mb-4 text-xl font-bold">
        {id !== undefined ? "Chỉnh sửa tin tức" : "Thêm tin tức"}
      </h3>
      <div>
        <form
          encType="multipart/form-data"
          className="d-flex gap-3 flex-column"
          onSubmit={id !== undefined ? editsubmitform : submitform}
        >
          <input
            type="text"
            id="default-input"
            className="bg-gray-50 border border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
            placeholder="Nhập tiêu đề tin tức"
            onChange={(e) => setTitles(e.target.value)}
            value={titles}
            required
          />
          <select
            name="brand"
            className="form-control py-2 mb-3 "
            onChange={(e) => setCategory(e.target.value)}
            required
            value={category}
          >
            {blogcategoryState.map((i, j) => {
              return (
                <option key={j} value={i._id}>
                  {i.title}
                </option>
              );
            })}
          </select>

          <div>
            <label
              className="block mb-2 font-medium text-black "
              for="file_input"
            >
              Chọn ảnh bìa
            </label>
            <input
              class="block w-[98%] text-lg text-black border border-gray-300  cursor-pointer bg-gray-50"
              id="large_size"
              type="file"
              onChange={(e) => setImageThumbnail(e.target.files[0])}
            />
            {id !== undefined ? (
              <img
                src={imageThumbnail}
                width={200}
                height={80}
                style={{ marginTop: "10px" }}
              />
            ) : (
              <></>
            )}
          </div>
          <div>
            <label>
              Nhập ID của video youtube (VD: https://www.youtube.com/watch?v=
              <b>4XZz3WXRw0A</b> )
            </label>
            <input
              type="text"
              id="youtube-id"
              className="bg-gray-50 border  border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
              name="youtube-id"
              placeholder="Nhập id video"
              onChange={(e) => setVideos(e.target.value)}
              value={videos}
            />
          </div>
          <div
            className="Mn_wysiwyg"
            style={{
              marginTop: "30px",
              width: "98%",
              backgroundColor: "white",
            }}
          >
            <Editor
              label="Nhập Tin Tức"
              className="text-sm"
              editorState={editorContent}
              onEditorStateChange={handleEditorChange}
            />
          </div>
          <button
            className="bg-blue-500 text-white lg:h-[40px] lg:w-[250px] rounded-3 my-5 w-[210px] h-[40px] "
            type="submit"
          >
            {id !== undefined ? "Sửa tin tức" : "Thêm tin tức"}
          </button>
        </form>
        {/* <div>
          <h2>Preview:</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: draftToHtml(
                convertToRaw(editorContent.getCurrentContent())
              ),
            }}
          ></div>
        </div> */}
      </div>
    </div>
  );
};

export default Addnews;
