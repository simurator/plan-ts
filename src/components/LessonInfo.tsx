import React from "react";
import { Lesson } from "./Models";

type LessonInfoProps = {
  lesson: Lesson;
};

const LessonInfo: React.FC<LessonInfoProps> = ({ lesson }) => {
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
    <div className="lesson-info">
      <span>{lesson.subject}</span> -{" "}
      <span>
        {lesson.teacher.firstName} {lesson.teacher.lastName}
      </span>{" "}
      --{" "}
      <span>
        {convertToAMPM(lesson.startTime)} - {convertToAMPM(lesson.endTime)}
      </span>{" "}
      -- <span>{lesson.classroom}</span>
    </div>
  );
};

export default LessonInfo;
