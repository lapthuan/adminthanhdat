// import React, { useEffect, useState } from "react";
// import { Table } from "antd";
// import { BiEdit } from "react-icons/bi";
// import { AiFillDelete } from "react-icons/ai";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   deleteAMenu,
//   getMenus,
//   resetState,
// } from "../features/brand/brandSlice";
// import CustomModal from "../components/CustomModal";

// const columns = [
//   {
//     title: "SNo",
//     dataIndex: "key",
//   },
//   {
//     title: "Page Id",
//     dataIndex: "name",
//     sorter: (a, b) => a.name.length - b.name.length,
//   },
//   {
//     title: "Action",
//     dataIndex: "action",
//   },
// ];

// const Menulist = () => {
//   const [open, setOpen] = useState(false);
//   const [brandId, setbrandId] = useState("");
//   const showModal = (e) => {
//     setOpen(true);
//     setbrandId(e);
//   };

//   const hideModal = () => {
//     setOpen(false);
//   };
  
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(resetState());
//     dispatch(getMenus());
//   }, []);
//   const brandState = useSelector((state) => state.menu.brands);
//   console.log(brandState.Menu);
//   const data1 = [];
//   for (let i = 0; i < brandState.length; i++) {
//     data1.push({
//       key: i + 1,
//       name: brandState[i].namee,
//       action: (
//         <>
//           <Link
//             to={`/admin/brand/${brandState[i]._id}`}
//             className=" fs-3 text-danger"
//           >
//             <BiEdit />
//           </Link>
//           <button
//             className="ms-3 fs-3 text-danger bg-transparent border-0"
//             onClick={() => showModal(brandState[i]._id)}
//           >
//             <AiFillDelete />
//           </button>
//         </>
//       ),
//     });
//   }
//   const deleteBrand = (e) => {
//     dispatch(deleteAMenu  (e));

//     setOpen(false);
//     setTimeout(() => {
//       dispatch(getMenus());
//     }, 100);
//   };
//   return (
//     <div>
//       <h3 className="mb-4 title">Danh sách Config</h3>
//       <div>
//         <Table columns={columns} dataSource={data1} />
//       </div>
//       <CustomModal
//         hideModal={hideModal}
//         open={open}
//         performAction={() => {
//           deleteBrand(brandId);
//         }}
//         title="Bạn muốn xóa chat bot này?"
//       />
//     </div>
//   );
// };

// export default Menulist;
