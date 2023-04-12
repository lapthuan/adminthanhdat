import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getLink = async () => {
  const response = await axios.get(`${base_url}links/`);
  return response.data.Link;
};
const createLinks = async (link) => {
  const response = await axios.post(`${base_url}links/`, link, config);

  return response.data;
};
const getLinks = async (id) => {
  const response = await axios.get(`${base_url}links/${id}`, config);

  return response.data;
};

// const updateColor = async (color) => {
//   const response = await axios.put(
//     `${base_url}color/${color.id}`,
//     { title: color.colorData.title },
//     config
//   );

//   return response.data;
// };
// const getLink = async (id) => {
//   const response = await axios.get(`${base_url}link/${id}`, config);

//   return response.data;
// };

// const deleteColor = async (id) => {
//   const response = await axios.delete(`${base_url}link/${id}`, config);

//   return response.data;
// };
const linkService = {
  getLinks,
  getLink,
  // createColor,
  // updateColor,
  // getColor,
  // deleteColor,
  createLinks,
};

export default linkService;
