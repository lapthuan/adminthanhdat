import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getcContainers = async () => {
  const response = await axios.get(`${base_url}categorycontainer/`);
  return response.data;
};

const createcContainer = async (cCon) => {
  const response = await axios.post(`${base_url}categorycontainer/`, cCon, config);
  return response.data;
}
const updatecContainer = async (cContainer) => {
  const response = await axios.put(
    `${base_url}categorycontainer/${cContainer.id}`,
    {
      name: cContainer.cConData.name,
    },
    config
  );
  return response.data;
};
const getcContainer = async (id) => {
  const response = await axios.get(`${base_url}categorycontainer/${id}`, config);
  return response.data;
};

const deletecContainer = async (id) => {
  const response = await axios.delete(`${base_url}categorycontainer/${id}`, config);
  return response.data;
};

const cContainerService = {
getcContainers,
createcContainer,
updatecContainer,
getcContainer,
deletecContainer,
};

export default cContainerService;
