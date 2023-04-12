import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createMenu,
  getABrand,
  resetState,
  updateABrand,
} from "../features/brand/brandSlice";

let schema = yup.object().shape({
  title: yup.string().required("Brand Name is Required"),
});
const Addconfigchat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getBrandId = location.pathname.split("/")[3];
  const newBrand = useSelector((state) => state.menu);
  
  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    brandName,
    updatedBrand,
  } = newBrand;
  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getABrand(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId]);

  useEffect(() => {
  
    if (isSuccess && updatedBrand) {
      toast.success("Cập nhật thành công!");
      navigate("/admin/list-brand");
    }

    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
    
        const data = { id: getBrandId, brandData: values };
        dispatch(updateABrand(data));
        dispatch(resetState());
     
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {/* {getBrandId !== undefined ? "Edit" : "Add"} Brand */} Cài Đặt
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="page_id"
            onChng={formik.handleChange("nameadmin")}
            onBlr={formik.handleBlur("nameadmin")}
            val={formik.values.nameadmin}
            label="Tên người sở hữu"
          />
        
          <CustomInput
            type="text"
            name="page_id"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            label="Tên Website"
          />
        
          <CustomInput
            type="text"
            name="page_id"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            label="Địa chỉ"
          />
          
          <CustomInput
            type="text"
            name="page_id"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            label="Số điện thoại"
          />
        
          <CustomInput
            type="text"
            name="page_id"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            label="Mã số thuế"
          />
        
          <CustomInput
            type="text"
            name="page_id"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            label="Page ID"
          />
         
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {/* {getBrandId !== undefined ? "Edit" : "Add"} Brand */}
            Cập nhật
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addconfigchat;
