import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { getcContainers } from "../features/CategoryContainer/cContainerSlice";

import {
  createCategory,
  getAProductCategory,
  resetState,
  updateAProductCategory,
} from "../features/pcategory/pcategorySlice";

let schema = yup.object().shape({
  name: yup.string().required("Bạn chưa nhập tên danh mục"),
  // idCategoriesContainer: yup.string().required("Bạn chưa nhập danh mục lớn"),
});

const Addcat = () => {
  const [categoryCTN, setCategoryContainer] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const getPCatId = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const newCategory = useSelector((state) => state.pCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    categoryName,
    createdCategory,
    updatedCategory,
  } = newCategory;

  useEffect(() => {
    dispatch(getcContainers());
  }, []);

  const CategoryContainer = useSelector((state) => state.catectn.cContainers);

  useEffect(() => {
    if (getPCatId !== undefined) {
      dispatch(getAProductCategory(getPCatId));
    } else {
      dispatch(resetState());
    }
  }, [getPCatId]);

  useEffect(() => {
    if (isSuccess && createdCategory) {
      alert("Thêm danh mục thành công!");
    }
    if (isSuccess && updatedCategory) {
      alert("Cập nhật danh mục thành công!");
      navigate("/admin/category");
    }
    if (isError) {
      alert("Đã xảy ra lỗi!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: categoryName || "",
      idCategoriesContainer: categoryCTN || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { id: getPCatId, cateData: values };
      console.log(data);
      if (getPCatId !== undefined) {
        dispatch(updateAProductCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div className="max-w-full lg:w-[100%]">
      <h3 className="mb-4  title text-xl font-bold">
        {getPCatId !== undefined ? "Sửa" : "Thêm"} Danh Mục Sản Phẩm
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <select
            name="brand"
            className="form-control py-2 mb-3 "
            onChange={(e) => setCategoryContainer(e.target.value)}
          >
            <option>Chọn Danh mục chính</option>
            {CategoryContainer.map((i, j) => {
              return (
                <option key={j} value={i._id}>
                  {i.name}
                </option>
              );
            })}
          </select>
          <CustomInput
            type="text"
            name="name"
            label="Nhập danh mục sản phẩm"
            onChng={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            val={formik.values.name}
            id="category"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <br />
          <button
            className="bg-blue-500 text-white lg:h-[40px] lg:w-[250px] rounded-3 my-5 w-[210px] h-[40px] "
            type="submit"
          >
            {getPCatId !== undefined ? "Sửa" : "Thêm"} Loại danh mục
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcat;
