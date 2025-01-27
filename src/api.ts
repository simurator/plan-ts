import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/lessons";

export const fetchLessons = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const createLesson = async (lesson: any) => {
  const response = await axios.post(API_BASE_URL, lesson);
  return response.data;
};

export const updateLesson = async (id: number, updatedLesson: any) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, updatedLesson);
  return response.data;
};

export const deleteLesson = async (id: number) => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
