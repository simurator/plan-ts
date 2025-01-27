import { useState, useEffect } from "react";
import { Lesson, SchoolDay } from "./Models";
import { useNavigate, Routes, Route } from "react-router-dom";
import LessonForm from "./LessonForm";
import LessonList from "./LessonList";

const SchoolScheduleApp: React.FC = () => {
  const [state, setState] = useState<SchoolDay[]>([]);
  const navigate = useNavigate();

  // Fetch schedule from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/lessons");
        const lessons = await response.json();

        // Convert the flat lesson list to the SchoolDay structure
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
      const response = await fetch("http://localhost:5000/api/lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newLesson, day }),
      });

      if (response.ok) {
        const addedLesson = await response.json();
        setState((prevState) =>
          prevState.map((d) =>
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
      const response = await fetch(
        `http://localhost:5000/api/lessons/${updatedLesson.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedLesson),
        }
      );

      if (response.ok) {
        const editedLesson = await response.json();
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
      }
    } catch (error) {
      console.error("Error editing lesson:", error);
    }
  };

  const handleDeleteLesson = async (day: string, lessonId: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/lessons/${lessonId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
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
        {/* Strona główna - lista dni */}
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

        {/* Widok dla każdego dnia */}
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

        {/* Formularz dodawania lekcji */}
        <Route
          path="/add-lesson/:day"
          element={
            <LessonForm
              onSubmit={(lesson) => {
                const day = window.location.pathname.split("/")[2]; // Dzień z URL
                handleAddLesson(lesson, day);
              }}
              teachers={[]}
            />
          }
        />

        {/* Formularz edytowania lekcji */}
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
