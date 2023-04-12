// import { React, useEffect } from "react";
// import CustomInput from "../components/CustomInput";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import * as yup from "yup";
// import { useFormik } from "formik";
// import {
//   createMenu,
//   getABrand,
//   resetState,
//   updateABrand,
// } from "../features/brand/brandSlice";

// let schema = yup.object().shape({
//   title: yup.string().required("Brand Name is Required"),
// });
// const AddLink = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const getBrandId = location.pathname.split("/")[3];
//   const newBrand = useSelector((state) => state.menu);
//   const {
//     isSuccess,
//     isError,
//     isLoading,
//     createdBrand,
//     brandName,
//     updatedBrand,
//   } = newBrand;
//   useEffect(() => {
//     if (getBrandId !== undefined) {
//       dispatch(getABrand(getBrandId));
//     } else {
//       dispatch(resetState());
//     }
//   }, [getBrandId]);

//   useEffect(() => {
//     if (isSuccess && createdBrand) {
//       toast.success("Brand Added Successfullly!");
//     }
//     if (isSuccess && updatedBrand) {
//       toast.success("Brand Updated Successfullly!");
//       navigate("/admin/list-brand");
//     }

//     if (isError) {
//       toast.error("Something Went Wrong!");
//     }
//   }, [isSuccess, isError, isLoading]);
//   const formik = useFormik({
//     enableReinitialize: true,
//     initialValues: {
//       title: brandName || "",
//     },
//     validationSchema: schema,
//     onSubmit: (values) => {
//       if (getBrandId !== undefined) {
//         const data = { id: getBrandId, brandData: values };
//         dispatch(updateABrand(data));
//         dispatch(resetState());
//       } else {
//         dispatch(createMenu(values));
//         formik.resetForm();
//         setTimeout(() => {
//           dispatch(resetState());
//         }, 300);
//       }
//     },
//   });

//   return (
//     <div>
//       <h3 className="mb-4 title">
//         {/* {getBrandId !== undefined ? "Edit" : "Add"} Brand */} Quản lý Link
//       </h3>
//       <div>
//         <form action="" onSubmit={formik.handleSubmit}>
//           <CustomInput
//             type="text"
//             name="title"
//             onChng={formik.handleChange("title")}
//             onBlr={formik.handleBlur("title")}
//             val={formik.values.title}
//             label="Nhập Link"
//             id="link"
//           />
//           <div className="error">
//             {/* {formik.touched.title && formik.errors.title} */}
//           </div>
//           <button
//             className="bg-blue-500 text-white h-[40px] w-[120px] rounded-3 my-5"
//             type="submit"
//           >
//             {/* {getBrandId !== undefined ? "Edit" : "Add"} Brand */}
//             Thêm Link
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddLink;