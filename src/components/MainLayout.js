import { useEffect, useState } from "react";
import { useRef } from "react";
import SubMenu from "./Menu.js";
import { motion } from "framer-motion";
import { Layout, Menu, theme } from "antd";
import { IoIosArrowBack } from "react-icons/io";
import { SlSettings } from "react-icons/sl";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { HiOutlineDatabase } from "react-icons/hi";
import { TbReportAnalytics } from "react-icons/tb";
import { RiBuilding3Line } from "react-icons/ri";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import Logoimage from "../image/logo.jpg";
import {
  FiShoppingBag,
  FiAlignCenter,
  FiHome,
  FiPocket,
  FiBox,
  FiList,
  FiBookmark,
  FiLink,
  FiMenu,
  FiLayers,
  FiSend,
  FiGrid,
  FiTrello,
  FiPlusSquare,
  FiPackage,
  FiPaperclip,
  FiSettings,
} from "react-icons/fi";
import { FaRegNewspaper } from "react-icons/fa";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import {
  NavLink,
  useLocation,
  useRouteRouter,
  Switch,
  useNavigate,
  Routes,
} from "react-router-dom";

const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "6rem",
          transition: {
            damping: 40,
          },
        },
      };

  // const subMenusList = [
  //   {
  //     name: "build",
  //     icon: RiBuilding3Line,
  //     menus: ["auth", "app settings", "stroage", "hosting"],
  //   },
  //   {
  //     name: "analytics",
  //     icon: TbReportAnalytics,
  //     menus: ["dashboard", "realtime", "events"],
  //   },
  // ];

  // const subCatalog = [
  //   {
  //     name: "Danh mục hàng hóa",
  //     icon: RiBuilding3Line,
  //     menus: ["Thêm danh mục hàng hóa", "Tổng hợp danh mục"],
  //   },
  // ];
  // const subProduct = [
  //   {
  //     name: "Hàng hóa",
  //     icon: RiBuilding3Line,
  //     menus: ["Thêm hàng hóa", "Danh sách hàng hóa"],
  //   },
  // ];

  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className=" bg-white text-gray shadow-xl z-[999] max-w-[16rem]  w-[16rem] 
            overflow-hidden md:relative fixed
         h-screen "
      >
        <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300  mx-3">
          <img src={Logoimage} width={70} className="ml-2" />
          {/* <span className="text-xl whitespace-pre text-[#205aa7]">
            THÀNH ĐẠT
          </span> */}
        </div>

        <div className="flex flex-col  h-full">
          <Menu
            // theme="dark"
            mode="inline"
            defaultSelectedKeys={[""]}
            onClick={({ key }) => {
              if (key == "signout") {
              } else {
                navigate(key);
              }
            }}
            items={[
              {
                key: "dmcs",
                icon: <FiTrello className="fs-4" />,
                label: "Danh mục sản phẩm chính",
                children: [
                  {
                    key: "dmc",
                    icon: <FiPlusSquare className="fs-4" />,
                    label: "Thêm danh mục sản phẩm chính",
                  },
                  {
                    key: "dmc-list",
                    icon: <FiMenu className="fs-4" />,
                    label: "Danh sách sản phẩm chính",
                  },
                ],
              },
              {
                key: "Catalogs",
                icon: <FiList className="fs-4" />,
                label: "Quản lý danh mục hàng hóa",
                children: [
                  {
                    key: "category",
                    icon: <FiPlusSquare className="fs-4" />,
                    label: "Thêm danh mục hàng hóa",
                  },
                  {
                    key: "list-category",
                    icon: <FiLayers className="fs-4" />,
                    label: "Tổng hợp danh mục",
                  },
                ],
              },
              {
                key: "Catalog",
                icon: <FiShoppingBag className="fs-4" />,
                label: "Hàng Hóa",
                children: [
                  {
                    key: "product",
                    icon: <FiPlusSquare className="fs-4" />,
                    label: "Thêm hàng hóa",
                  },
                  {
                    key: "list-product",
                    icon: <FiPackage className="fs-4" />,
                    label: "Danh sách hàng hóa",
                  },
                ],
              },
              {
                key: "Newss",
                icon: <FaRegNewspaper className="fs-4" />,
                label: "Quản lý tin tức",
                children: [
                  {
                    key: "news",
                    icon: <FiPlusSquare className="fs-4" />,
                    label: "Thêm tin tức",
                  },
                  {
                    key: "list-news",
                    icon: <FiGrid className="fs-4" />,
                    label: "Danh sách tin tức",
                  },
                ],
              },
              {
                key: "brands",
                icon: <FiPocket className="fs-4" />,
                label: "Quản lý nhãn hàng",
                children: [
                  {
                    key: "brand",
                    icon: <FiPlusSquare className="fs-4" />,
                    label: "Thêm nhãn hàng",
                  },
                  {
                    key: "list-brand",
                    icon: <FiMenu className="fs-4" />,
                    label: "Danh sách nhãn hàng",
                  },
                ],
              },
              {
                key: "blogcategory",
                icon: <FiBookmark className="fs-4" />,
                label: "Danh mục tin tức",
                children: [
                  {
                    key: "blog-category",
                    icon: <FiPlusSquare className="fs-4" />,
                    label: "Thêm danh mục tin tức",
                  },
                  {
                    key: "blog-category-list",
                    icon: <FiMenu className="fs-4" />,
                    label: "Danh sách danh mục tin",
                  },
                ],
              },
              {
                key: "setting",
                icon: <FiSettings className="fs-4" />,
                label: "Cài đặt",
                children: [
                  {
                    key: "add-home",
                    icon: <FiSettings className="fs-4" />,
                    label: "Chỉnh sửa trang chủ",
                  },
                  {
                    key: "add-footer",
                    icon: <FiSettings className="fs-4" />,
                    label: "Chỉnh sửa chân trang ",
                  },
                  {
                    key: "add-service",
                    icon: <FiSettings className="fs-4" />,
                    label: "Chỉnh sửa dịch vụ",
                  },
                  {
                    key: "add-about",
                    icon: <FiSettings className="fs-4" />,
                    label: "Chỉnh sửa About",
                  },
                ],
              },
            ]}
          />
          {open && (
            <div className="flex-1 text-sm z-50  max-h-48 my-auto  whitespace-pre   w-full  font-medium  ">
              {/* <div className="flex border-y border-slate-300 p-4 items-center justify-between">
                <div>
                  <p>Spark</p>
                  <small>No-cost $0/month</small>
                </div>
                <p className="text-teal-500 py-1.5 px-3 text-xs bg-teal-50 rounded-xl">
                  Upgrade
                </p>
              </div> */}
            </div>
          )}
        </div>
        <motion.div
          onClick={() => {
            setOpen(!open);
          }}
          animate={
            open
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
              : {
                  x: -10,
                  y: -200,
                  rotate: 180,
                }
          }
          transition={{ duration: 0 }}
          className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>
      <div className="m-3 md:hidden  " onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
