import React, { useEffect, useState } from "react";
import { Input, Modal, Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import imgerror from "../image/imgerror.png";
import {
  getProducts,
  deleteAProduct,
  resetState,
} from "../features/product/productSlice";
import { Link } from "react-router-dom";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getcContainers } from "../features/CategoryContainer/cContainerSlice";
import { getBrands } from "../features/brand/brandSlice";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Mã sản phẩm",
    dataIndex: "id",
    // sorter: (a, b) => a.title?.length - b.title?.length,
  },
  {
    title: "Tên",
    dataIndex: "name",
    // sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    render: (text) => (
      <div
        dangerouslySetInnerHTML={{
          __html: `${text}`,
        }} >

      </div>
    ),
  },
  {
    title: "Danh mục phụ",
    dataIndex: "idCategory",
    // sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Danh mục",
    dataIndex: "idContainerCategory",
    // sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Nhãn hàng",
    dataIndex: "brand",
    // sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Ảnh sản phẩm",
    dataIndex: "url",
    // sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Hành động",
    dataIndex: "action",
  },
];
const Productlist = () => {
  const productStates = useSelector((state) => state.product.products);
  const pCategory = useSelector((state) => state.pCategory.pCategories);
  const brands = useSelector((state) => state.brand.brands);

  const categorycontainer = useSelector((state) => state.catectn.cContainers);

  const dispatch = useDispatch();

  const data1 = [];
  const [popdtProduct, setProduct] = useState([]);
  const [popdtCategory, setdtCategory] = useState([]);

  const popProduct = (data) => {
    setProduct(data);
  };
  const popCategory = (data) => {
    setdtCategory(data);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteAProduct(id));

    setTimeout(async () => {
      await dispatch(getProducts());
      await dispatch(getCategories());
      await dispatch(getcContainers());
      await dispatch(getBrands());
    }, 100);
    toast.success("Xóa sản phẩm thành công ");
  };
  useEffect(() => {
    if (productStates?.length === 0) {
      dispatch(getProducts());
    }
    dispatch(getCategories());
    dispatch(getcContainers());
    dispatch(getBrands());
  }, [dispatch, productStates?.length, pCategory?.length, brands?.length]);

  const [showModalDelete, setshowModalDelete] = useState(false);
  const [showModalEdit, setshowModalEdit] = useState(false);
  const [fileList, setFileList] = useState([]);

  productStates?.map((productState, i) => {
    pCategory?.map((pCate) => {
      if (productState?.idCategory == pCate?._id) {
        const cateContainer = categorycontainer.filter((ct) => {
          return ct._id == productState.idContainerCategory;
        });
        const brand = brands.filter((brand) => {
          return brand._id == productState.idBrand;
        });
        data1.push({
          key: i + 1,
          id: productState._id ? productState._id : "undefined",
          name: productState.name ? productState.name : "undefined",
          description: productState.description
            ? productState.description
            : "undefined",
          idCategory: pCate.name ? pCate.name : "undefined",
          slug: productState.slug ? productState.slug : "undefined",
          brand: brand[0]?.title != null ? brand[0].title : "undefined",
          idContainerCategory: cateContainer[0]?.name
            ? cateContainer[0].name
            : "undefined",

          url: (
            <img
              className="w-20 object-cover"
              src={
                productState?.imagesDefault?.secure_url
                  ? productState?.imagesDefault?.secure_url
                  : imgerror
              }
            />
          ),
          action: (
            <>
              <span
                onClick={() => {
                  setshowModalEdit(true);
                  popProduct(productState);
                }}
                className=" fs-3 text-danger cursor-pointer"
              >
                <Link
                  to={`/admin/product/${productState._id}`}
                  className=" fs-3 text-danger"
                >
                  <BiEdit />
                </Link>
              </span>
              <span
                className="ms-3 fs-3 text-danger cursor-pointer"
                onClick={() => {
                  setshowModalDelete(true);
                  popProduct(productState);
                  popCategory(pCate);
                }}
              >
                <AiFillDelete />
              </span>
            </>
          ),
        });
      }
    });
  });
  return (
    <div>
      {showModalDelete ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setshowModalDelete(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3 sm:flex justify-center flex-col ">
                  <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-red-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="mt-2 text-center sm:ml-4 sm:text-left">
                    <h4 className="text-lg font-medium text-gray-800">
                      Xóa :{" "}
                      <span className="text-lg text-gray-500">
                        {popdtProduct?.name}
                      </span>
                    </h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                      Bạn chắc chắn muốn xóa {popdtProduct?.name}
                    </p>
                    <div className="items-center gap-2 mt-3 sm:flex">
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                        onClick={() => {
                          handleDelete(popdtProduct?._id);
                          setshowModalDelete(false);
                        }}
                      >
                        Xác nhận
                      </button>
                      <button
                        className="w-full mt-2 p-2.5 flex-1 text-gray-800 bg-success rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                        onClick={() => setshowModalDelete(false)}
                      >
                        Hủy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      <h3 className="mb-4 text-xl font-bold">Danh Mục Sản Phẩm</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Productlist;
