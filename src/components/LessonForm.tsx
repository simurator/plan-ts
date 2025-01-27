import React, { useState, useEffect } from "react";
import { Lesson, Teacher } from "./Models";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField"; // Import the new reusable component

type LessonFormProps = {
  onSubmit: (lesson: Lesson) => void;
  teachers: Teacher[];
  lesson?: Lesson;
};

const LessonForm: React.FC<LessonFormProps> = ({ onSubmit, lesson }) => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState<string>(lesson?.subject || "");
  const [teacherName, setTeacherName] = useState<string>(
    lesson?.teacher
      ? `${lesson.teacher.firstName} ${lesson.teacher.lastName}`
      : ""
  );
  const [startTime, setStartTime] = useState<string>(lesson?.startTime || "");
  const [endTime, setEndTime] = useState<string>(lesson?.endTime || "");
  const [classroom, setClassroom] = useState<string>(lesson?.classroom || "");

  useEffect(() => {
    if (lesson) {
      setSubject(lesson.subject);
      setTeacherName(`${lesson.teacher.firstName} ${lesson.teacher.lastName}`);
      setStartTime(lesson.startTime);
      setEndTime(lesson.endTime);
      setClassroom(lesson.classroom);
    }
  }, [lesson]);

  const validateForm = () => {
    if (!subject || !teacherName || !startTime || !endTime || !classroom) {
      alert("Wszystkie pola muszą być wypełnione.");
      return false;
    }

    if (startTime >= endTime) {
      alert(
        "Godzina rozpoczęcia musi być wcześniejsza niż godzina zakończenia."
      );
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const teacher: Teacher = {
      id: Date.now(),
      firstName: teacherName.split(" ")[0],
      lastName: teacherName.split(" ")[1] || "",
    };

    const updatedLesson: Lesson = {
      id: lesson?.id || Date.now(),
      subject,
      teacher,
      startTime,
      endTime,
      classroom,
    };

    onSubmit(updatedLesson);
  };

  const handleGoBack = () => {
    navigate("/"); // Powrót do planu lekcji (strona główna)
  };

  return (
    <form onSubmit={handleSubmit} className="lesson-form">
      <h2>{lesson ? "Edytuj Lekcje" : "Dodaj Lekcje"}</h2>

      <InputField
        label="Przedmiot"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        type="text"
      />
      <InputField
        label="Nauczyciel"
        value={teacherName}
        onChange={(e) => setTeacherName(e.target.value)}
        type="text"
      />
      <InputField
        label="Godzina Rozpoczęcia"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        type="time"
      />
      <InputField
        label="Godzina Zakończenia"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        type="time"
      />
      <InputField
        label="Klasa"
        value={classroom}
        onChange={(e) => setClassroom(e.target.value)}
        type="text"
      />

      <div className="form-actions">
        <button type="submit" className="submit-btn">
          Zapisz
        </button>
        <button type="button" onClick={handleGoBack} className="back-btn">
          Powrót do planu
        </button>
      </div>
    </form>
  );
};

export default LessonForm;
