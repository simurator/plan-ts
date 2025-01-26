import React, { useState, useEffect } from 'react';
import { Lesson, Teacher } from './Models';

type LessonFormProps = {
    onSubmit: (lesson: Lesson) => void;
    teachers: Teacher[];
    lesson?: Lesson;
};

const LessonForm: React.FC<LessonFormProps> = ({ onSubmit, lesson }) => {
    const [subject, setSubject] = useState<string>(lesson?.subject || '');
    const [teacherName, setTeacherName] = useState<string>(
        lesson?.teacher ? `${lesson.teacher.firstName} ${lesson.teacher.lastName}` : ''
    );
    const [startTime, setStartTime] = useState<string>(lesson?.startTime || '');
    const [endTime, setEndTime] = useState<string>(lesson?.endTime || '');
    const [classroom, setClassroom] = useState<string>(lesson?.classroom || '');

    useEffect(() => {
        if (lesson) {
            setSubject(lesson.subject);
            setTeacherName(`${lesson.teacher.firstName} ${lesson.teacher.lastName}`);
            setStartTime(lesson.startTime);
            setEndTime(lesson.endTime);
            setClassroom(lesson.classroom);
        }
    }, [lesson]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!subject || !teacherName || !startTime || !endTime || !classroom) {
            alert('Wszystkie pola musz� by� wype�nione.');
            return;
        }

        if (startTime >= endTime) {
            alert('Godzina rozpocz�cia musi by� wcze�niejsza ni� godzina zako�czenia.');
            return;
        }

        const teacher: Teacher = {
            id: Date.now(),
            firstName: teacherName.split(' ')[0],
            lastName: teacherName.split(' ')[1] || ''
        };

        const updatedLesson: Lesson = {
            id: lesson?.id || Date.now(),
            subject,
            teacher,
            startTime,
            endTime,
            classroom
        };

        onSubmit(updatedLesson);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{lesson ? 'Edytuj Lekcj�' : 'Dodaj Lekcj�'}</h2>
            <label>Przedmiot:</label>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} />
            <label>Nauczyciel:</label>
            <input value={teacherName} onChange={(e) => setTeacherName(e.target.value)} />
            <label>Godzina Rozpocz�cia:</label>
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            <label>Godzina Zako�czenia:</label>
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            <label>Klasa:</label>
            <input value={classroom} onChange={(e) => setClassroom(e.target.value)} />
            <button type="submit">Zapisz</button>
        </form>
    );
};

export default LessonForm;
