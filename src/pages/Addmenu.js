// import { React, useEffect, useState } from "react";
// import CustomInput from "../components/CustomInput";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import * as yup from "yup";
// import { useFormik } from "formik";
// import {
  
//   createMenu,
//   getABrand,
//   resetState,
//   updateABrand,
// } from "../features/brand/brandSlice";
// import { EditorState } from "draft-js";

// let schema = yup.object().shape({
//   name: yup.string().required("Brand Name is Required"),
// });
// const Addmenu = () => {
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
//     menuName,
//     docs,
//     updatedBrand,
//   } = newBrand;

//   //Envent WYSIWYG
//   const [editorState, setEditorState] = useState("");
//   const handleEditorChange = (newEditorState) => {
//     setEditorState(newEditorState);
//   };
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
//       name: menuName || "",
//       doc: docs || "",
//     },
//     validationSchema: schema,
//     onSubmit: (values) => {
//       console.log(values);
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
//     <div className="max-w-full lg:w-[100%]">
//       <h3 className="mb-4 text-xl font-bold">
//         {/* {getBrandId !== undefined ? "Edit" : "Add"} Brand */} Quản Lý Menu
//       </h3>
//       <div>
//         <form
//           action=""
//           onSubmit={formik.handleSubmit}
//           className="d-flex gap-3 flex-column"
//         >
//           <CustomInput
//             type="text"
//             name="name"
//             onChng={formik.handleChange("name")}
//             onBlr={formik.handleBlur("name")}
//             val={formik.values.name}
//             label="Nhập Menu"
//             id="menu"
//           />
//           <div className="error">
//             {/* {formik.touched.title && formik.errors.title} */}
//           </div>

//           <div className="Mn_wysiwyg" style={{ marginTop: "30px" }}>
//             <Editor
//               onChange={(value) => formik.setFieldValue("doc", value)}
//               values={formik.values.doc}
//               label="Nhập Menu"
//               id="menu"
//             />
//             {/* <CustomInput
//             type="text"
//             name="doc"
//             onChng={formik.handleChange("doc")}
//             onBlr={formik.handleBlur("doc")}
//             val={formik.values.doc}
//             label="Nhập Menu"
//             id="menu"
//           /> */}
//           </div>
//           <button
//             className="bg-blue-500 text-white lg:h-[40px] lg:w-[250px] rounded-3 my-5 w-[210px] h-[40px] "
//             type="submit"
//           >
//             Thêm menu
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Addmenu;
