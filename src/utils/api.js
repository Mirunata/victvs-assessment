import axios from "axios";

const api = axios.create({});

console.log("!!!!!!!!URLLLLL",process.env.REACT_APP_BASE_URL);

export const updateExamStatus = async(examId, newStatus) => {
  return api.patch(`/api/exams/${examId}/status`, { status: newStatus });
};

export default api;