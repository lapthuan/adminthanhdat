import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Input, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CustomModal from "../components/CustomModal";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Link } from "react-router-dom";

import {
  getBlogNews,
  deleteBlog,
  resetState,
} from "../features/blogNews/blogSlice";

import Modal from "antd/es/modal/Modal";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import imgerror from "../image/imgerror.png";
import {
  getCategories,
  createNewblogCat,
  getABlogCat,
  updateABlogCat,
  deleteABlogCat,
} from "../features/bcategory/bcategorySlice";
const Listnews = () => {
  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Tiêu đề ",
      dataIndex: "title",

      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      render: (text, record) => (
        <Button onClick={() => showModal(text)}>Xem mô tả</Button>
      ),
      // render: (text) => text.slice(0, 20),
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      title: "Ảnh tin tức",
      dataIndex: "imageThumbnail",
      render: (url) =>
        url == undefined ? (
          <img src={imgerror} alt="" width={100} height={100} />
        ) : (
          <img src={url.secure_url} alt="" width={100} height={100} />
        ),
    },
    {
      title: "Video tin tức",
      dataIndex: "video",
      render: (id) => (
        <iframe
          width="100"
          height="50"
          src={`https://www.youtube.com/embed/${id}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ),
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      sorter: (a, b) => a.category.length - b.category.length,
    },

    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  const [visible, setVisible] = useState(false);
  const [pNewID, setpNewID] = useState("");
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openEditDes, setOpenEditDes] = useState(false);

  const [editingBlog, setEditingBlog] = useState([]);
  const [editingVideos, setEditingVideos] = useState("");
  const [editImg, setEditingImg] = useState("");
  const [editingCategory, setEditingCategory] = useState("");
  const [editorContent, setEditorContent] = useState(EditorState.createEmpty());
  const [edtTitle, setEdtTitle] = useState("");
  const [edtID, setEdtid] = useState("");
  const [editorContentEdit, setEditorContentEdit] = useState(
    EditorState.createEmpty()
  );
  const handleEditorChange = (editorState) => {
    setEditorContentEdit(editorState);
  };

  const showModelNews = (e) => {
    setOpen(true);
    setpNewID(e);
  };
  const showModalEdit = (blog) => {
    setOpenEdit(true);
    setEdtid(blog._id);
    setEditingBlog(blog);
    setEdtTitle(blog.title);
    setEditingVideos(blog.video);
    setEditingImg(blog.imageThumbnail.secure_url);
    setEditingCategory(blog.category);
    setEditorContentEdit(
      EditorState.createWithContent(
        convertFromRaw(JSON.parse(blog.description))
      )
    );
  };

  

 
  const hideModal = () => {
    setOpen(false);
  };
  const hideModalEdit = () => {
    setOpenEdit(false);
  };
  const hideModalEditDes = () => {
    setOpenEditDes(false);
  };
  const showModal = (desc) => {
    setEditorContent(
      EditorState.createWithContent(convertFromRaw(JSON.parse(desc)))
    );
    setVisible(true);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogNews());
    dispatch(resetState());
    dispatch(getCategories());
  }, []);

  const blogState = useSelector((state) => state.blognew.blogs);
  const blogcategoryState = useSelector((state) => state.bCategory.bCategories);

  const data = [];
  for (let i = 0; i < blogState.length; i++) {
    data.push({
      key: i + 1,
      title: blogState[i].title,
      description: blogState[i].description,
      category: blogState[i].category,
      imageThumbnail: blogState[i].imageThumbnail,
      video: blogState[i].video,
      action: (
        <>
          <div className="flex">
            <Link
              className="fs-3 text-primary bg-transparent border-0"
              to={`/admin/news/${blogState[i]._id}`}
              // onClick={() => showModalEdit(blogState[i])}
            >
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModelNews(blogState[i]._id)}
            >
              <AiFillDelete />
            </button>
          </div>
        </>
      ),
    });
  }
  const deleteCategory = (e) => {
    dispatch(deleteBlog(e));
    setOpen(false);
    toast.success("Xóa thành công");
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  return (
    <>
      <div>
        <h3 className="mb-4 text-xl font-bold">Danh Mục Tin Tức</h3>
        <div>
          <Table columns={columns} dataSource={data} />
        </div>

        <div className="mt-4">
          <CustomModal
            hideModal={hideModal}
            open={open}
            performAction={() => {
              deleteCategory(pNewID);
            }}
            title="Bạn có chắc chắn muốn xóa loại sản phẩm này không?"
          />
        </div>

        <Modal
          open={visible}
          onCancel={() => setVisible(false)}
          title="Description"
          footer={null}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: draftToHtml(
                convertToRaw(editorContent.getCurrentContent())
              ),
            }}
          ></div>
        </Modal>
      </div>
    </>
  );
};

export default Listnews;
