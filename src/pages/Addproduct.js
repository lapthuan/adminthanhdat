import { React, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import {
  getAProduct,
  getProducts,
  resetState,
} from "../features/product/productSlice";
import { getcContainers } from "../features/CategoryContainer/cContainerSlice";

import { config } from "../utils/axiosconfigs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Addproduct = () => {
  const { id } = useParams();
  const [image, setImage] = useState([]);
  const brandState = useSelector((state) => state.brand.brands);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [Idcategory, setIdcategory] = useState("");
  const [brand, setBrand] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrands());

    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getcContainers());
  }, []);

  const catState = useSelector((state) => state.pCategory.pCategories);
  const newProduct = useSelector((state) => state.product);

  const { isSuccess, isError, isLoading, createdProduct, product } = newProduct;

  useEffect(() => {
    if (id != undefined) {
      dispatch(getAProduct(id));
    } else {
      dispatch(resetState());
      setName("");
      setDescription("");
      setIdcategory("");
      setBrand("");
    }
  }, [id]);

  useEffect(() => {
    if (product != undefined) {
      setName(product.name);
      setDescription(product.description);
      setIdcategory(product.idCategory);
      setBrand(product.idBrand);
    } else {
      setName("");
      setDescription("");
      setIdcategory("");
      setBrand("");
    }
  }, [product]);

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(name, description, Idcategory, brand, image);
    let formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("idCategory", Idcategory);
    formData.append("idBrand", brand);
    for (let i = 0; i < image.length; i++) {
      formData.append(`image`, image[i]);
    }
    axios
      .post(`${process.env.REACT_APP_API_URL}products/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((Response) => {
        console.log(Response);
        toast.success("Thêm thành công");
      })
      .catch((error) => {

        console.log(error);

      });
  };

  const submitform = (e) => {
    e.preventDefault();
    console.log(name, description, Idcategory, brand, image);
    let formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("idCategory", Idcategory);
    formData.append("idBrand", brand);
    for (let i = 0; i < image.length; i++) {
      formData.append(`image`, image[i]);
    }
    axios
      .put(`${process.env.REACT_APP_API_URL}products/${id}`, formData, config)
      .then((response) => {
        console.log(response);
        toast("Sửa thành công");
      })
      .catch((error) => {
        console.log(error);
        toast("Sửa không thành công");
      });
  };

  return (
    <>
      <div className="max-w-full lg:w-[100%]">
        <h3 className="mb-4 text-xl font-bold">
          {id !== undefined ? "Sửa sản phẩm" : "Thêm sản phẩm"}
        </h3>
        <div>
          <form
            encType="multipart/form-data"
            className="d-flex gap-3 flex-column"
            onSubmit={id !== undefined ? submitform : handleFormSubmit}
          >
            <input
              type="text"
              name="name"
              id="default-input"
              className="bg-gray-50 border border-gray-300 text-gray-900   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[98%]"
              placeholder="Nhập tiêu tên sản phẩm"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />

            <div className="">
              <ReactQuill
                theme="snow"
                name="description"
                onChange={setDescription}
                value={description}
                required
              />
            </div>
            <select
              name="category"
              className="form-control py-2 mb-3 "
              onChange={(e) => setIdcategory(e.target.value)}
              value={Idcategory}
              required
            >
              <option>Chọn danh mục sản phẩm</option>
              {catState.map((i, j) => {
                return (
                  <option key={j} value={i._id}>
                    {i.name}
                  </option>
                );
              })}
            </select>
            <select
              name="brand"
              className="form-control py-2 mb-3 "
              onChange={(e) => setBrand(e.target.value)}
              value={brand}
              required
            >
              <option>Chọn danh mục thương hiệu</option>
              {brandState.map((i, j) => {
                return (
                  <option key={j} value={i._id}>
                    {i.title}
                  </option>
                );
              })}
            </select>
            <input
              type="file"
              class="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
              multiple
              onChange={(e) => setImage(e.target.files)}
            />

            <button
              className="bg-blue-500 text-white lg:h-[40px] lg:w-[250px] rounded-3 text-center my-5 w-[210px] h-[40px] "
              type="submit"
            >
              {id !== undefined ? <>Sửa</> : <>Thêm</>}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Addproduct;
