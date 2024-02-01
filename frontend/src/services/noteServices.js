import axios from 'axios';

const url = 'http://localhost:3001/notes';

const get = () => {
  return axios.get(url).then((response) => response.data);
};

const create = (newNote) => {
  return axios.post(url, newNote).then((response) => response.data);
};

const remove = (id) => {
  return axios.delete(`${url}/${id}`).then((response) => response.data);
};

const update = (id, newNote) => {
  return axios.put(`${url}/${id}`, newNote).then((response) => response.data);
};

export const noteServices = {
  url,
  get,
  create,
  remove,
  update,
};
