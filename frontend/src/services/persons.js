import axios from "axios";
const baseDomain = import.meta.env.VITE_EXTERNAL_URL || "http://localhost:3001";
const baseUrl = `${baseDomain}/api/persons`;

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default {
  getAll: getAll,
  create: create,
  update: update,
  delete: deletePerson,
};
