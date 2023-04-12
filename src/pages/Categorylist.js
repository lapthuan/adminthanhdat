import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteAProductCategory,
  getCategories,
  resetState,
} from "../features/pcategory/pcategorySlice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Tên danh mục",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },

  {
    title: "Hoạt động",
    dataIndex: "action",
  },
];

const Categorylist = () => {
  const [open, setOpen] = useState(false);
  const [pCatId, setpCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setpCatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  const pCatStat = useSelector((state) => state.pCategory);
  const { isSuccess, isError, deletedCategory, pCategories } = pCatStat;

  const data1 = [];
  for (let i = 0; i < pCategories.length; i++) {
    data1.push({
      key: i + 1,
      name: pCategories[i].name,
      action: (
        <>
          <div className="flex">
            <Link
              to={`/admin/category/${pCategories[i]._id}`}
              className=" fs-3 text-danger"
            >
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(pCategories[i]._id)}
            >
              <AiFillDelete />
            </button>
          </div>
        </>
      ),
    });
  }
  const deleteCategory = (e) => {
    dispatch(deleteAProductCategory(e));
    setOpen(false);

    setTimeout(() => {
      window.location.reload();
    }, 2000);
    
  };

  return (
    <div className="md:flex md:flex-col md:items-start">
      <h3 className="mb-4 text-xl font-bold">Danh Mục Loại Sản Phẩm</h3>
      <div className="overflow-x-auto w-full">
        <Table
          columns={columns}
          dataSource={data1}
          className="table-auto w-full border-collapse"
        />
      </div>
      <div className="mt-4">
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteCategory(pCatId);
          }}
          title="Bạn có chắc chắn muốn xóa loại sản phẩm này không?"
        />
      </div>
    </div>
  );
};

export default Categorylist;
