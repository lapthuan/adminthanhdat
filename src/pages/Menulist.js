import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  convertToHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import DOMPurify from "dompurify";
import {
  deleteABrand,
  getBrands,
  resetState,
} from "../features/brand/brandSlice";
import CustomModal from "../components/CustomModal";
import CustomModalMenu from "../components/CustomModalMenu";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Tên Menu",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Nội dung",
    dataIndex: "doc",

    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Menulist = () => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [menuId, setMenuId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setMenuId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const showModal1 = (e) => {
    setOpen1(true);
    setMenuId(e);
  };
  const hideModal1 = () => {
    setOpen1(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
  }, []);
  const menuState = useSelector((state) => state.menu.menus);
  console.log(menuState);
  const data1 = [];
  for (let i = 0; i < menuState.length; i++) {
    const noidung = menuState[i].doc;
    // const contentState = convertFromRaw(noidung);
    // const editorState = EditorState.createWithContent(contentState);
    // const html = convertToHTML(editorState.getCurrentContent());
    console.log(noidung);
    data1.push({
      key: i + 1,
      name: menuState[i].name,
      // doc: draftToHtml(convertToRaw(brandState[i].doc.getCurrentContent())),
      // doc: menuState[i].doc.blocks.text,
      action: (
        <>
          <Link
            to={`/admin/menu/${menuState[i]._id}`}
            className=" fs-3 text-danger"
          ></Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal1(menuState[i]._id)}
          >
            <BiEdit />
          </button>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(menuState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteMenu = (e) => {
    dispatch(deleteABrand(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getBrands());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 text-xl font-bold">Danh Sách Menu</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteMenu(menuId);
        }}
        title="Bạn muốn xóa menu này?"
      />
      <CustomModalMenu hideModal={hideModal1} open={open1} />
    </div>
  );
};

export default Menulist;
