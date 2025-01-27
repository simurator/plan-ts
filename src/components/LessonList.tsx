import React, { useState } from "react";
import { Lesson } from "./Models";

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
  const [sortMethod, setSortMethod] = useState<"subject" | "time">("subject");

  const sortedLessons = [...lessons].sort((a, b) => {
    if (sortMethod === "subject") return a.subject.localeCompare(b.subject);
    return a.startTime.localeCompare(b.startTime);
  });

  const convertToAMPM = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const adjustedHour = hours % 12 || 12; // Zamienia 0 na 12 (np. dla godziny 00:00).
    const formattedTime = `${adjustedHour}:${
      minutes < 10 ? "0" + minutes : minutes
    } ${period}`;
    return formattedTime;
  };

  return (
    <div className="lesson-list-container">
      <div className="sort-controls">
        <label>Sortuj według: </label>
        <select
          value={sortMethod}
          onChange={(e) => setSortMethod(e.target.value as "subject" | "time")}
          className="sort-select"
        >
          <option value="subject">Przedmiot</option>
          <option value="time">Godzina</option>
        </select>
      </div>
      <ul className="lesson-list">
        {sortedLessons.map((lesson) => (
          <li key={lesson.id} className="lesson-item">
            <div className="lesson-info">
              <span>{lesson.subject}</span> -{" "}
              <span>
                {lesson.teacher.firstName} {lesson.teacher.lastName}
              </span>{" "}
              --{" "}
              <span>
                {convertToAMPM(lesson.startTime)} -{" "}
                {convertToAMPM(lesson.endTime)}
              </span>{" "}
              -- <span>{lesson.classroom}</span> {/* Add classroom */}
            </div>
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
