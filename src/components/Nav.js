import MainLayout from "./MainLayout.js";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";

function RootLayout({ children }) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <div>
      <ToastContainer pauseOnHover={false} draggable={false} />
      <div className="flex lg:gap-5">
        <MainLayout />
        <main className="max-w-5xl flex-1 py-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default RootLayout;
