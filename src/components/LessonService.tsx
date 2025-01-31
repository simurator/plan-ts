const API_URL = "http://localhost:5000/api/lessons";

export const getLessons = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addLesson = async (newLesson: any) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newLesson),
  });
  return response.json();
};

export const updateLesson = async (lessonId: number, updatedLesson: any) => {
  const response = await fetch(`${API_URL}/${lessonId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedLesson),
  });
  return response.json();
};

export const deleteLesson = async (lessonId: number) => {
  const response = await fetch(`${API_URL}/${lessonId}`, {
    method: "DELETE",
  });
  return response.ok;
};
