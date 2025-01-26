import { useState } from "react";
import { Lesson, SchoolDay } from "./Models";
import { useNavigate, Routes, Route } from "react-router-dom";
import LessonForm from "./LessonForm";
import LessonList from "./LessonList";

const initialState: SchoolDay[] = [
  { day: "Monday", lessons: [] },
  { day: "Tuesday", lessons: [] },
  { day: "Wednesday", lessons: [] },
  { day: "Thursday", lessons: [] },
  { day: "Friday", lessons: [] },
];

const SchoolScheduleApp: React.FC = () => {
  const [state, setState] = useState<SchoolDay[]>(initialState);
  const navigate = useNavigate();

  const handleAddLesson = (newLesson: Lesson, day: string) => {
    setState((prevState) =>
      prevState.map((d) =>
        d.day === day ? { ...d, lessons: [...d.lessons, newLesson] } : d
      )
    );
    navigate(`/day/${day}`);
  };

  const handleEditLesson = (day: string, updatedLesson: Lesson) => {
    setState((prevState) =>
      prevState.map((d) =>
        d.day === day
          ? {
              ...d,
              lessons: d.lessons.map((lesson) =>
                lesson.id === updatedLesson.id ? updatedLesson : lesson
              ),
            }
          : d
      )
    );
    navigate(`/day/${day}`);
  };

  const handleDeleteLesson = (day: string, lessonId: number) => {
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
  };

  return (
    <div>
      <h1>Plan Lekcji</h1>
      <Routes>
        {/* Strona główna - lista dni */}
        <Route
          path="/"
          element={
            <div>
              {state.map((day) => (
                <div key={day.day}>
                  <h2>{day.day}</h2>
                  <button onClick={() => navigate(`/day/${day.day}`)}>
                    Pokaż Lekcje
                  </button>
                  <button onClick={() => navigate(`/add-lesson/${day.day}`)}>
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
              <div>
                <h2>{day.day}</h2>
                <LessonList
                  lessons={day.lessons}
                  onEdit={(lesson) =>
                    navigate(`/edit-lesson/${day.day}/${lesson.id}`)
                  }
                  onDelete={(lessonId) => handleDeleteLesson(day.day, lessonId)}
                />
                <button onClick={() => navigate(`/add-lesson/${day.day}`)}>
                  Dodaj Lekcje
                </button>
                <button onClick={() => navigate("/")}>Powrót do planu</button>
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
