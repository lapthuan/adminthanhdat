import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";

import {
  createNewblogCat,
  getABlogCat,
  resetState,
  updateABlogCat,
} from "../features/bcategory/bcategorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Category Name is Required"),
});

const Addblogcat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogCatId = location.pathname.split("/")[3];
  const newBlogCategory = useSelector((state) => state.bCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createBlogCategory,
    blogCatName,
    updatedBlogCategory,
  } = newBlogCategory;

  useEffect(() => {
    if (getBlogCatId !== undefined) {
      dispatch(getABlogCat(getBlogCatId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogCatId]);

  useEffect(() => {
    if (isSuccess && createBlogCategory) {
      alert("Thêm danh mục tin tức thành công");
    }
    if (isSuccess && updatedBlogCategory) {
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
      title: blogCatName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { id: getBlogCatId, blogCatData: values };
      if (getBlogCatId !== undefined) {
        dispatch(updateABlogCat(data));
        dispatch(resetState());
      } else {
        dispatch(createNewblogCat(values));
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
        {getBlogCatId !== undefined ? "Sửa" : "Thêm"} Danh mục tin tức
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            label="Tên danh mục tin"
            id="blogcat"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="bg-blue-500 text-white lg:h-[40px] lg:w-[250px] rounded-3 my-5 w-[210px] h-[40px] "
            type="submit"
          >
            {getBlogCatId !== undefined ? "Sửa" : "Thêm"} Danh mục tin tức
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblogcat;
