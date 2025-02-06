import { useState, useEffect } from "react";
import { Lesson, SchoolDay } from "./Models";
import SchoolScheduleApp from "./SchoolScheduleApp";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/lessons";

const SchoolScheduleContainer: React.FC = () => {
  const [schedule, setSchedule] = useState<SchoolDay[]>([]);
  const navigate = useNavigate();

  // Fetch schedule from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const lessons = await response.json();

        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        const groupedDays = days.map((day) => ({
          day,
          lessons: lessons.filter((lesson: Lesson) => lesson.day === day),
        }));

        setSchedule(groupedDays);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddLesson = async (newLesson: Lesson, day: string) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newLesson, day }),
      });

      if (response.ok) {
        const addedLesson = await response.json();
        setSchedule((prev) =>
          prev.map((d) =>
            d.day === day ? { ...d, lessons: [...d.lessons, addedLesson] } : d
          )
        );
        navigate(`/day/${day}`);
      }
    } catch (error) {
      console.error("Error adding lesson:", error);
    }
  };

  const handleEditLesson = async (day: string, updatedLesson: Lesson) => {
    try {
      const response = await fetch(`${API_URL}/${updatedLesson.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedLesson),
      });

      if (response.ok) {
        const editedLesson = await response.json();
        setSchedule((prev) =>
          prev.map((d) =>
            d.day === day
              ? {
                  ...d,
                  lessons: d.lessons.map((lesson) =>
                    lesson.id === editedLesson.id ? editedLesson : lesson
                  ),
                }
              : d
          )
        );
        navigate(`/day/${day}`);
      }
    } catch (error) {
      console.error("Error editing lesson:", error);
    }
  };

  const handleDeleteLesson = async (day: string, lessonId: number) => {
    try {
      const response = await fetch(`${API_URL}/${lessonId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSchedule((prev) =>
          prev.map((d) =>
            d.day === day
              ? {
                  ...d,
                  lessons: d.lessons.filter((lesson) => lesson.id !== lessonId),
                }
              : d
          )
        );
      }
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }
  };

  return (
    <SchoolScheduleApp
      schedule={schedule}
      onAddLesson={handleAddLesson}
      onEditLesson={handleEditLesson}
      onDeleteLesson={handleDeleteLesson}
      onNavigate={navigate}
    />
  );
};

export default SchoolScheduleContainer;
