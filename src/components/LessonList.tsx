import React, { useState } from "react";
import { Lesson } from "./Models";
import LessonInfo from "./LessonInfo"; // Import the new reusable component

type LessonListProps = {
  lessons: Lesson[];
  onEdit: (lesson: Lesson) => void;
  onDelete: (lessonId: number) => void;
};

const LessonList: React.FC<LessonListProps> = ({
  lessons,
  onEdit,
  onDelete,
}) => {
  const [sortMethod, setSortMethod] = useState<"subject" | "time" | "teacher">(
    "subject"
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const toggleSortDirection = () => {
    setSortDirection((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );
  };

  const sortedLessons = [...lessons].sort((a, b) => {
    let comparison = 0;

    // Sorting based on the selected method
    if (sortMethod === "subject") {
      comparison = a.subject.localeCompare(b.subject);
    } else if (sortMethod === "time") {
      comparison = a.startTime.localeCompare(b.startTime);
    } else if (sortMethod === "teacher") {
      // Sorting by teacher's full name (firstName + lastName)
      const teacherA = `${a.teacher.firstName} ${a.teacher.lastName}`;
      const teacherB = `${b.teacher.firstName} ${b.teacher.lastName}`;
      comparison = teacherA.localeCompare(teacherB);
    }

    // Reverse the order if the direction is descending
    return sortDirection === "asc" ? comparison : -comparison;
  });

  return (
    <div className="lesson-list-container">
      <div className="sort-controls">
        <label>Sortuj według: </label>
        <select
          value={sortMethod}
          onChange={(e) =>
            setSortMethod(e.target.value as "subject" | "time" | "teacher")
          }
          className="sort-select"
        >
          <option value="subject">Przedmiot</option>
          <option value="time">Godzina</option>
          <option value="teacher">Nauczyciel</option> {/* New sorting option */}
        </select>

        {/* Sorting direction toggle */}
        <button
          onClick={toggleSortDirection}
          className={`sort-direction-btn ${
            sortDirection === "asc" ? "asc" : "desc"
          }`}
        >
          {sortDirection === "asc" ? "↑" : "↓"}
        </button>
      </div>

      <ul className="lesson-list">
        {sortedLessons.map((lesson) => (
          <li key={lesson.id} className="lesson-item">
            <LessonInfo lesson={lesson} />
            <div className="lesson-actions">
              <button onClick={() => onEdit(lesson)} className="edit-btn">
                Edytuj
              </button>
              <button
                onClick={() => onDelete(lesson.id)}
                className="delete-btn"
              >
                Usuń
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LessonList;
