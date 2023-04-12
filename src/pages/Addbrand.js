import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import {
  createBrand,
  getABrand,
  resetState,
  updateABrand,
} from "../features/brand/brandSlice";

import { getcContainers } from "../features/CategoryContainer/cContainerSlice";

let schema = yup.object().shape({
  title: yup.string().required("Chưa nhập nhãn hàng"),
});

const Addbrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [categoryCTN, setCategoryContainer] = useState("");
  const getBrandId = location.pathname.split("/")[3];
  const newBrand = useSelector((state) => state.brand);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    brandName,
    updatedBrand,
  } = newBrand;

  useEffect(() => {
    dispatch(getcContainers());
  }, []);

  const CategoryContainer = useSelector((state) => state.catectn.cContainers);

  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getABrand(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId]);

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Thêm nhãn hàng thành công!");
    }
    if (isSuccess && updatedBrand) {
      toast.success("Sửa nhãn hàng thành công!");
      navigate("/admin/list-brand");
    }
    if (isError) {
      toast.warning("Đã xảy ra lỗi!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
      idCategoriesContainer: categoryCTN || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { id: getBrandId, brandData: values };
      
      if (getBrandId !== undefined) {
        dispatch(updateABrand(data));
        dispatch(resetState());
      } else {
        dispatch(createBrand(values));
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
        {getBrandId !== undefined ? "Sửa" : "Thêm"} Nhãn hàng
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
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            label="Nhập tên nhãn hàng"
            id="brand"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="bg-blue-500 text-white lg:h-[40px] lg:w-[250px] rounded-3 my-5 w-[210px] h-[40px] "
            type="submit"
          >
            {getBrandId !== undefined ? "Sửa" : "Thêm"} Nhãn hàng
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addbrand;
