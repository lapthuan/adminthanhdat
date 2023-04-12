import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getBlogNews = async () => {
  const response = await axios.get(`${base_url}blog/`);

  return response.data;
};
const createBlog = async (blog) => {
  const response = await axios.post(`${base_url}blog/`, blog, config);

  return response.data;
};
const updateBlog = async (blog) => {
  const response = await axios.put(
    `${base_url}blog/${blog.id}`,
    {
      title: blog.blogdate.title,
      description: blog.blogdate.description,
      category: blog.blogdate.category,
      imageThumbnail: blog.blogdate.imageThumbnail,
      video: blog.blogdate.video,
    },
    config
  );

  return response.data;
};
const getBlognews = async (id) => {
  const response = await axios.get(`${base_url}blog/${id}`, config);

  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(`${base_url}blog/${id}`, config);

  return response.data;
};
const blogService = {
  getBlogNews,
  createBlog,
  updateBlog,
  getBlognews,
  deleteBlog,
};

export default blogService;
