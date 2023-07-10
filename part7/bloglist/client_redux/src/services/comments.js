import axios from "axios";
const baseUrl = "/api/comments";

const getComments = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addComment = async (newComment) => {
  const response = await axios.post(baseUrl, newComment);
  return response.data;
};

export default { getComments, addComment };
