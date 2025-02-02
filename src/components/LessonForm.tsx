import React, { useState, useEffect } from "react";
import { Lesson, Teacher } from "./Models";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField"; // Importowanie komponentu InputField

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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
    let newErrors: { [key: string]: string } = {};

    if (!subject.trim()) newErrors.subject = "Przedmiot jest wymagany.";
    if (!teacherName.trim()) {
      newErrors.teacherName = "Imię i nazwisko nauczyciela są wymagane.";
    } else if (teacherName.trim().split(" ").length < 2) {
      newErrors.teacherName = "Podaj pełne imię i nazwisko nauczyciela.";
    }

    if (!startTime) newErrors.startTime = "Godzina rozpoczęcia jest wymagana.";
    if (!endTime) newErrors.endTime = "Godzina zakończenia jest wymagana.";

    if (startTime && endTime && startTime >= endTime) {
      newErrors.time =
        "Godzina rozpoczęcia musi być wcześniejsza niż zakończenia.";
    }

    if (!classroom.trim()) {
      newErrors.classroom = "Klasa jest wymagana.";
    } else if (classroom.trim().length > 10) {
      newErrors.classroom = "Nazwa klasy może mieć maksymalnie 10 znaków.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        error={errors.subject}
      />
      <InputField
        label="Nauczyciel"
        value={teacherName}
        onChange={(e) => setTeacherName(e.target.value)}
        type="text"
        error={errors.teacherName}
      />
      <InputField
        label="Godzina Rozpoczęcia"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        type="time"
        error={errors.startTime || errors.time}
      />
      <InputField
        label="Godzina Zakończenia"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        type="time"
        error={errors.endTime || errors.time}
      />
      <InputField
        label="Klasa"
        value={classroom}
        onChange={(e) => setClassroom(e.target.value)}
        type="text"
        error={errors.classroom}
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
