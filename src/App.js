import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/Forgotpassword";
import MainLayout from "./components/MainLayout";
import Enquiries from "./pages/Enquiries";
import Bloglist from "./pages/Bloglist";
import Blogcatlist from "./pages/Blogcatlist";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Colorlist from "./pages/Colotlist";
import Categorylist from "./pages/Categorylist";
import Brandlist from "./pages/Brandlist";
import Productlist from "./pages/Productlist";
import Addblog from "./pages/Addblog";
import Addblogcat from "./pages/Addblogcat";
import Addcolor from "./pages/Addcolor";
import Addcat from "./pages/Addcat";
import Addbrand from "./pages/Addbrand";
import Addproduct from "./pages/Addproduct";
import Couponlist from "./pages/Couponlist";
import AddCoupon from "./pages/AddCoupon";
import ViewEnq from "./pages/ViewEnq";
import ViewOrder from "./pages/ViewOrder";
import Addmenu from "./pages/Addmenu";
import Menulist from "./pages/Menulist";
import Setting from "./pages/Setting";
import ConfigChatlist from "./pages/ConfigChatlist";
import AddLink from "./pages/Addlink";
import Linklist from "./pages/Linklist";
import Nav from "../src/components/Nav";
import News from "../src/pages/Addnews";
import NewsList from "../src/pages/Newslist";
import AddHome from "./pages/Setting/AddHome";
import AddFooter from "./pages/Setting/AddFooter";
import AddService from "./pages/Setting/AddContact";
import AddAbout from "./pages/Setting/AddAbout";
import AddDMC from "./pages/AddDMC";
import DMCList from "./pages/DMCList";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/admin" element={<Nav />}>
          <Route index element={<Dashboard />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="enquiries/:id" element={<ViewEnq />} />
          <Route path="blog-list" element={<Bloglist />} />
          <Route path="blog" element={<Addblog />} />
          <Route path="blog/:id" element={<Addblog />} />
          <Route path="coupon-list" element={<Couponlist />} />
          <Route path="coupon" element={<AddCoupon />} />
          <Route path="coupon/:id" element={<AddCoupon />} />
          <Route path="blog-category-list" element={<Blogcatlist />} />
          <Route path="blog-category" element={<Addblogcat />} />
          <Route path="blogcategory/:id" element={<Addblogcat />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order/:id" element={<ViewOrder />} />
          <Route path="customers" element={<Customers />} />
          <Route path="list-color" element={<Colorlist />} />
          <Route path="color" element={<Addcolor />} />
          <Route path="color/:id" element={<Addcolor />} />
          <Route path="list-category" element={<Categorylist />} />
          <Route path="category" element={<Addcat />} />
          <Route path="category/:id" element={<Addcat />} />
          <Route path="list-brand" element={<Brandlist />} />
          <Route path="brand" element={<Addbrand />} />
          <Route path="brand/:id" element={<Addbrand />} />
          <Route path="menu/:id" element={<Addbrand />} />
          <Route path="list-product" element={<Productlist />} />
          <Route path="product" element={<Addproduct />} />
          <Route path="product/:id" element={<Addproduct />} />
          <Route path="news/:id" element={<News />} />
          <Route path="news" element={<News />} />
          <Route path="list-news" element={<NewsList />} />
          <Route path="dmc" element={<AddDMC />} />
          <Route path="dmc/:id" element={<AddDMC />} />
          <Route path="dmc-list" element={<DMCList />} />
          <Route path="menu" element={<Addmenu />} />
          <Route path="menu-list" element={<Menulist />} />
          <Route path="setting" element={<Setting />} />
          <Route path="config-list" element={<ConfigChatlist />} />
          <Route path="add-link" element={<AddLink />} />
          <Route path="link-list" element={<Linklist />} />
          <Route path="add-home" element={<AddHome />} />
          <Route path="add-footer" element={<AddFooter />} />
          <Route path="add-service" element={<AddService />} />
          <Route path="add-about" element={<AddAbout />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
