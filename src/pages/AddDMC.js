import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";

import {
  createNewcContainer,
  getAcContainer,
  resetState,
  updateAcContainer,
} from "../features/CategoryContainer/cContainerSlice";

let schema = yup.object().shape({
  name: yup.string().required("Lỗi"),
});

const AddDMC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getcConId = location.pathname.split("/")[3];
  const newcCon = useSelector((state) => state.catectn);
  const {
    isSuccess,
    isError,
    isLoading,
    createcContainer,
    cConName,
    updatedcCon,
  } = newcCon;

  useEffect(() => {
    if (getcConId !== undefined) {
      dispatch(getAcContainer(getcConId));
    } else {
      dispatch(resetState());
    }
  }, [getcConId]);

  useEffect(() => {
    if (isSuccess && createcContainer) {
      alert("Thêm danh mục tin tức thành công");
    }
    if (isSuccess && updatedcCon) {
      alert("Cập nhật danh mục tin tức thành công");
      navigate("/admin/blog-category-list");
    }
    if (isError) {
      alert("Đã xảy ra lỗi!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: cConName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { id: getcConId, cConData: values };
      if (getcConId !== undefined) {
        dispatch(updateAcContainer(data));
        dispatch(resetState());
      } else {
        dispatch(createNewcContainer(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title text-xl font-bold">
        {getcConId !== undefined ? "Sửa" : "Thêm"} Danh mục sản phẩm chính
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="name"
            onChng={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            val={formik.values.name}
            label="Tên danh mục sản phẩm chính"
            id="id"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <button
            className="bg-blue-500 text-white lg:h-[40px] lg:w-[250px] rounded-3 my-5 w-[210px] h-[40px] "
            type="submit"
          >
            {getcConId !== undefined ? "Sửa" : "Thêm"} Danh mục sản phẩm chính
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDMC;
