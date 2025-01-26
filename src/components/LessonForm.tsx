import React, { useState, useEffect } from 'react';
import { Lesson, Teacher } from './Models';

type LessonFormProps = {
    onSubmit: (lesson: Lesson) => void;
    teachers: Teacher[];
    lesson?: Lesson; // Optional prop for editing
};

const LessonForm: React.FC<LessonFormProps> = ({ onSubmit, teachers, lesson }) => {
    const [subject, setSubject] = useState<string>(lesson?.subject || '');
    const [teacher, setTeacher] = useState<Teacher | undefined>(lesson?.teacher);
    const [startTime, setStartTime] = useState<string>(lesson?.startTime || ''); // Default empty string
    const [endTime, setEndTime] = useState<string>(lesson?.endTime || ''); // Default empty string
    const [classroom, setClassroom] = useState<string>(lesson?.classroom || ''); // Default empty string

    useEffect(() => {
        if (lesson) {
            setSubject(lesson.subject);
            setTeacher(lesson.teacher);
            setStartTime(lesson.startTime);
            setEndTime(lesson.endTime);
            setClassroom(lesson.classroom);
        }
    }, [lesson]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (teacher) {
            // Pass all required properties to the onSubmit function
            const updatedLesson: Lesson = {
                id: lesson?.id || Date.now(), // Use the current time for a new lesson
                subject,
                teacher,
                startTime,
                endTime,
                classroom,
            };
            onSubmit(updatedLesson); // Pass the full Lesson object
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Przedmiot:</label>
            <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
            />
            <label>Nauczyciel:</label>
            <select
                value={teacher?.id}
                onChange={(e) =>
                    setTeacher(
                        teachers.find(t => t.id === Number(e.target.value))
                    )
                }
            >
                {teachers.map(t => (
                    <option key={t.id} value={t.id}>
                        {t.firstName} {t.lastName}
                    </option>
                ))}
            </select>
            <label>Godzina rozpoczêcia:</label>
            <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
            />
            <label>Godzina zakoñczenia:</label>
            <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
            />
            <label>Klasa:</label>
            <input
                type="text"
                value={classroom}
                onChange={(e) => setClassroom(e.target.value)}
            />
            <button type="submit">Zapisz lekcjê</button>
        </form>
    );
};

export default LessonForm;
