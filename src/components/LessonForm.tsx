import React, { useState, useEffect } from "react";
import { Lesson, Teacher } from "./Models";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";

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
    const containsNumber = (text: string) => /\d/.test(text);

    // Walidacja przedmiotu
    if (!subject.trim()) {
      newErrors.subject = "Przedmiot jest wymagany.";
    } else if (containsNumber(subject)) {
      newErrors.subject = "Przedmiot nie może zawierać cyfr.";
    } else if (subject.length > 25) {
      newErrors.subject = "Przedmiot może mieć maksymalnie 25 znaków.";
    }

    // Walidacja nauczyciela
    if (!teacherName.trim()) {
      newErrors.teacherName = "Imię i nazwisko nauczyciela są wymagane.";
    } else if (teacherName.trim().split(" ").length < 2) {
      newErrors.teacherName = "Podaj pełne imię i nazwisko nauczyciela.";
    } else if (containsNumber(teacherName)) {
      newErrors.teacherName =
        "Imię i nazwisko nauczyciela nie mogą zawierać cyfr.";
    } else if (teacherName.length > 40) {
      newErrors.teacherName =
        "Imię i nazwisko mogą mieć maksymalnie 40 znaków.";
    }

    // Walidacja godzin
    if (!startTime) newErrors.startTime = "Godzina rozpoczęcia jest wymagana.";
    if (!endTime) newErrors.endTime = "Godzina zakończenia jest wymagana.";
    if (startTime && endTime && startTime >= endTime) {
      newErrors.time =
        "Godzina rozpoczęcia musi być wcześniejsza niż zakończenia.";
    }

    // Walidacja klasy
    if (!classroom.trim()) {
      newErrors.classroom = "Klasa jest wymagana.";
    } else if (!/^\d+$/.test(classroom.trim())) {
      newErrors.classroom = "Klasa musi być liczbą całkowitą.";
    } else {
      const classroomNumber = parseInt(classroom.trim(), 10);
      if (classroomNumber < 1 || classroomNumber > 999) {
        newErrors.classroom = "Klasa musi być liczbą od 1 do 999.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

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
    navigate("/");
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
