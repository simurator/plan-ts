import React, { useState, useEffect } from 'react';
import { Lesson, Teacher } from './Models';

type LessonFormProps = {
    onSubmit: (lesson: Lesson) => void;
    teachers: Teacher[];  // Lista nauczycieli, ale w tym przypadku nie u¿ywamy jej w formularzu
    lesson?: Lesson; // Opcjonalny props do edycji lekcji
};

const LessonForm: React.FC<LessonFormProps> = ({ onSubmit, lesson }) => {
    console.log('Rendering LessonForm');  // Debugowanie

    const [subject, setSubject] = useState<string>(lesson?.subject || '');
    const [teacherName, setTeacherName] = useState<string>(lesson?.teacher ? lesson.teacher.firstName + ' ' + lesson.teacher.lastName : ''); // Jeœli nie ma nauczyciela, ustaw pusty string
    const [startTime, setStartTime] = useState<string>(lesson?.startTime || '');
    const [endTime, setEndTime] = useState<string>(lesson?.endTime || '');
    const [classroom, setClassroom] = useState<string>(lesson?.classroom || '');

    useEffect(() => {
        if (lesson) {
            setSubject(lesson.subject);
            setTeacherName(lesson.teacher ? lesson.teacher.firstName + ' ' + lesson.teacher.lastName : '');  // Jeœli nauczyciel jest undefined, to ustaw pusty string
            setStartTime(lesson.startTime);
            setEndTime(lesson.endTime);
            setClassroom(lesson.classroom);
        }
    }, [lesson]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Walidacja danych
        if (!subject || !teacherName || !startTime || !endTime || !classroom) {
            alert("Wszystkie pola musz¹ byæ wype³nione.");
            return;
        }

        if (startTime >= endTime) {
            alert("Godzina rozpoczêcia musi byæ wczeœniejsza ni¿ godzina zakoñczenia.");
            return;
        }

        // Tworzymy obiekt nauczyciela z wpisanego imienia i nazwiska
        const teacher: Teacher = {
            id: Date.now(), // Tymczasowe id, które mo¿na dostosowaæ
            firstName: teacherName.split(' ')[0], // Pierwsze imiê
            lastName: teacherName.split(' ')[1] || '', // Drugie nazwisko
        };

        const updatedLesson: Lesson = {
            id: lesson?.id || Date.now(), // Jeœli edytujemy, to zachowujemy id
            subject,
            teacher,
            startTime,
            endTime,
            classroom,
        };

        onSubmit(updatedLesson); // Przekazujemy formularz do obs³ugi
    };

    return (
        <div>
            <h2>{lesson ? 'Edytuj lekcjê' : 'Dodaj now¹ lekcjê'}</h2> {/* Nag³ówek formularza */}
            <form onSubmit={handleSubmit}>
                <label>Przedmiot:</label>
                <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
                <label>Nauczyciel (imiê i nazwisko):</label>
                <input
                    type="text"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}  // Pozwól u¿ytkownikowi wpisaæ imiê i nazwisko nauczyciela
                />
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
        </div>
    );
};

export default LessonForm;
