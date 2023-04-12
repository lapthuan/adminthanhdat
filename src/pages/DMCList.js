import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    deleteAcContainer,
    getcContainers,
    resetState,
} from "../features/CategoryContainer/cContainerSlice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const DMCList = () => {
  const [open, setOpen] = useState(false);
  const [cConId, setcConId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcConId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getcContainers());
  }, []);
  const cConState = useSelector((state) => state.catectn.cContainers);
  console.log(cConState);
  const data1 = [];
  for (let i = 0; i < cConState.length; i++) {
    data1.push({
      key: i + 1,
      name: cConState[i].name,
      action: (
        <>
        <div className="flex">
          <Link
            to={`/admin/dmc/${cConState[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(cConState[i]._id)}
          >
            <AiFillDelete />
          </button>
          </div>
        </>
      ),
    });
  }
  const deletecc = (e) => {
    dispatch(deleteAcContainer(e));
    setOpen(false);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
  return (
    <div>
      <h3 className="mb-4 title text-xl font-bold">Danh mục sản phẩm chính</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deletecc(cConId);
        }}
        title="Bạn có chắc muốn xóa danh mục tin này không?"
      />
    </div>
  );
};

export default DMCList;
