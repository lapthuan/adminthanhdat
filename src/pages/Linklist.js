import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getLinks,
  getLink,
  resetState,
  createLinks,
  getALink,
} from "../features/link/linkSlice";
import CustomModal from "../components/CustomModal";
import CustomModalMenu from "../components/CustomModalMenu";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Tên",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Đường dẫn",
    dataIndex: "url",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Linklist = () => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [linkId, setlinkId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setlinkId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const showModal1 = (e) => {
    setOpen1(true);
    setlinkId(e);
  };
  const hideModal1 = () => {
    setOpen1(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getLinks());
  }, []);
  const linkState = useSelector((state) => state.link.links);
  console.log(linkState);
  const data1 = [];
  for (let i = 0; i < linkState.length; i++) {
    data1.push({
      key: i + 1,
      name: linkState[i].name,
      url: linkState[i].url,
      action: (
        <>
          <Link
            to={`/admin/link/${linkState[i]._id}`}
            className=" fs-3 text-danger"
          ></Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal1(linkState[i]._id)}
          >
            <BiEdit />
          </button>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(linkState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  // const deleteBrand = (e) => {
  //   dispatch(deleteABrand(e));

  //   setOpen(false);
  //   setTimeout(() => {
  //     dispatch(getLinks());
  //   }, 100);
  // };
  return (
    <div>
      <h3 className="mb-4 title">Danh sách Link</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          // deleteBrand(brandId);
        }}
        title="Are you sure you want to delete this link?"
      />
      <CustomModalMenu hideModal={hideModal1} open={open1} />
    </div>
  );
};

export default Linklist;
