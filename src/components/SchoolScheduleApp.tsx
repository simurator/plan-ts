import { SchoolDay, Lesson } from "./Models";
import { Routes, Route } from "react-router-dom";
import LessonForm from "./LessonForm";
import LessonList from "./LessonList";

interface Props {
  schedule: SchoolDay[];
  onAddLesson: (lesson: Lesson, day: string) => void;
  onEditLesson: (day: string, lesson: Lesson) => void;
  onDeleteLesson: (day: string, lessonId: number) => void;
  onNavigate: (path: string) => void;
}

const SchoolScheduleApp: React.FC<Props> = ({
  schedule,
  onAddLesson,
  onEditLesson,
  onDeleteLesson,
  onNavigate,
}) => {
  return (
    <div className="schedule-container">
      <h1>Plan Lekcji</h1>
      <Routes>
        <Route
          path="/"
          element={
            <div className="day-list">
              {schedule.map((day) => (
                <div key={day.day} className="day-item">
                  <h2>{day.day}</h2>
                  <button
                    onClick={() => onNavigate(`/day/${day.day}`)}
                    className="view-btn"
                  >
                    Pokaż Lekcje
                  </button>
                  <button
                    onClick={() => onNavigate(`/add-lesson/${day.day}`)}
                    className="add-btn"
                  >
                    Dodaj Lekcje
                  </button>
                </div>
              ))}
            </div>
          }
        />

        {schedule.map((day) => (
          <Route
            key={day.day}
            path={`/day/${day.day}`}
            element={
              <div className="day-details">
                <h2>{day.day}</h2>
                <LessonList
                  lessons={day.lessons}
                  onEdit={(lesson) =>
                    onNavigate(`/edit-lesson/${day.day}/${lesson.id}`)
                  }
                  onDelete={(lessonId) => onDeleteLesson(day.day, lessonId)}
                />
                <div className="day-actions">
                  <button
                    onClick={() => onNavigate(`/add-lesson/${day.day}`)}
                    className="add-btn"
                  >
                    Dodaj Lekcje
                  </button>
                  <button onClick={() => onNavigate("/")} className="back-btn">
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
                onAddLesson(lesson, day);
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
                onEditLesson(day, lesson);
              }}
              teachers={[]}
              lesson={schedule
                .find((d) => d.day === window.location.pathname.split("/")[2])
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
