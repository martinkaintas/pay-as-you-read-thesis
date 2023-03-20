import { default as apiInstance } from '../api';

const CONTROLLER_PATH = '/posts';

export const getPostById = (id?: number | string) => {
  return apiInstance.get(`${CONTROLLER_PATH}/${id}`);
};

export const getPosts = () => {
  return apiInstance.get(`${CONTROLLER_PATH}`);
};

const PostServiceApi = {
  getPostById,
  getPosts,
};

export default PostServiceApi;
