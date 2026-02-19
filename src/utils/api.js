import axios from "axios";

const api = axios.create({});

export const updateExamStatus = async(examId, newStatus) => {
  return api.patch(`/api/exams/${examId}/status`, { status: newStatus });
};

export default api;