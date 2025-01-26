import React, { useState } from 'react';
import TimePicker from './TimePicker';
import { Lesson, Teacher } from './Models';

type LessonFormProps = {
    onSubmit: (lesson: Lesson) => void;
    teachers: Teacher[];
    initialLesson?: Lesson;
};

const LessonForm: React.FC<LessonFormProps> = ({
    onSubmit,
    teachers,
    initialLesson
}) => {
    const [lesson, setLesson] = useState<Partial<Lesson>>(
        initialLesson || {
            subject: '',
            classroom: '',
            startTime: '',
            endTime: ''
        }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (lesson.subject && lesson.teacher) {
            onSubmit(lesson as Lesson);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={lesson.subject || ''}
                onChange={(e) => setLesson({ ...lesson, subject: e.target.value })}
                placeholder="Przedmiot"
            />

            <select
                value={lesson.teacher?.id || ''}
                onChange={(e) => {
                    const selectedTeacher = teachers.find(
                        t => t.id === Number(e.target.value)
                    );
                    setLesson({ ...lesson, teacher: selectedTeacher });
                }}
            >
                {teachers.map(teacher => (
                    <option key={teacher.id} value={teacher.id}>
                        {teacher.firstName} {teacher.lastName}
                    </option>
                ))}
            </select>

            <TimePicker
                value={lesson.startTime || ''}
                onChange={(time) => setLesson({ ...lesson, startTime: time })}
                label="Poczatek"
            />

            <TimePicker
                value={lesson.endTime || ''}
                onChange={(time) => setLesson({ ...lesson, endTime: time })}
                label="Koniec"
            />

            <input
                value={lesson.classroom || ''}
                onChange={(e) => setLesson({ ...lesson, classroom: e.target.value })}
                placeholder="Sala"
            />

            <button type="submit">
                {initialLesson ? 'Aktualizuj' : 'Dodaj'}
            </button>
        </form>
    );
};

export default LessonForm;