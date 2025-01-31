import { useState, useEffect } from "react";
import { Lesson, SchoolDay } from "./Models";
import { useNavigate, Routes, Route } from "react-router-dom";
import LessonForm from "./LessonForm";
import LessonList from "./LessonList";
import {
  getLessons,
  addLesson,
  updateLesson,
  deleteLesson,
} from "./LessonService";

const SchoolScheduleApp: React.FC = () => {
  const [state, setState] = useState<SchoolDay[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lessons = await getLessons();
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        const groupedDays = days.map((day) => ({
          day,
          lessons: lessons.filter((lesson: Lesson) => lesson.day === day),
        }));

        setState(groupedDays);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddLesson = async (newLesson: Lesson, day: string) => {
    try {
      const addedLesson = await addLesson({ ...newLesson, day });
      setState((prevState) =>
        prevState.map((d) =>
          d.day === day ? { ...d, lessons: [...d.lessons, addedLesson] } : d
        )
      );
      navigate(`/day/${day}`);
    } catch (error) {
      console.error("Error adding lesson:", error);
    }
  };

  const handleEditLesson = async (day: string, updatedLesson: Lesson) => {
    try {
      const editedLesson = await updateLesson(updatedLesson.id, updatedLesson);
      setState((prevState) =>
        prevState.map((d) =>
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
    } catch (error) {
      console.error("Error editing lesson:", error);
    }
  };

  const handleDeleteLesson = async (day: string, lessonId: number) => {
    try {
      const isDeleted = await deleteLesson(lessonId);
      if (isDeleted) {
        setState((prevState) =>
          prevState.map((d) =>
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
    <div className="schedule-container">
      <h1>Plan Lekcji</h1>
      <Routes>
        <Route
          path="/"
          element={
            <div className="day-list">
              {state.map((day) => (
                <div key={day.day} className="day-item">
                  <h2>{day.day}</h2>
                  <button
                    onClick={() => navigate(`/day/${day.day}`)}
                    className="view-btn"
                  >
                    Pokaż Lekcje
                  </button>
                  <button
                    onClick={() => navigate(`/add-lesson/${day.day}`)}
                    className="add-btn"
                  >
                    Dodaj Lekcje
                  </button>
                </div>
              ))}
            </div>
          }
        />
        {state.map((day) => (
          <Route
            key={day.day}
            path={`/day/${day.day}`}
            element={
              <div className="day-details">
                <h2>{day.day}</h2>
                <LessonList
                  lessons={day.lessons}
                  onEdit={(lesson) =>
                    navigate(`/edit-lesson/${day.day}/${lesson.id}`)
                  }
                  onDelete={(lessonId) => handleDeleteLesson(day.day, lessonId)}
                />
                <div className="day-actions">
                  <button
                    onClick={() => navigate(`/add-lesson/${day.day}`)}
                    className="add-btn"
                  >
                    Dodaj Lekcje
                  </button>
                  <button onClick={() => navigate("/")} className="back-btn">
                    Powrót do planu
                  </button>
                </div>
              </div>
            }
          />
        ))}
        <Route
          path="/add-lesson/:day"
          element={
            <LessonForm
              onSubmit={(lesson) => {
                const day = window.location.pathname.split("/")[2];
                handleAddLesson(lesson, day);
              }}
              teachers={[]}
            />
          }
        />
        <Route
          path="/edit-lesson/:day/:lessonId"
          element={
            <LessonForm
              onSubmit={(lesson) => {
                const day = window.location.pathname.split("/")[2];
                handleEditLesson(day, lesson);
              }}
              teachers={[]}
              lesson={state
                .find(
                  (day) => day.day === window.location.pathname.split("/")[2]
                )
                ?.lessons.find(
                  (lesson) =>
                    lesson.id ===
                    parseInt(window.location.pathname.split("/")[3])
                )}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default SchoolScheduleApp;
