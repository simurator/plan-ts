import React, { useState, useReducer } from 'react';
import DayHeader from './DayHeader';
import LessonForm from './LessonForm';
import LessonList from './LessonList';
import TeacherList from './TeacherList';
import { Lesson, SchoolDay, Teacher } from './Models';

type SchoolScheduleAppProps = {
    teachers: Teacher[]; // Dodano w³aœciwoœæ teachers
};

type ScheduleAction =
    | { type: 'ADD_LESSON'; payload: { day: string; lesson: Lesson } }
    | { type: 'UPDATE_LESSON'; payload: { day: string; lesson: Lesson } }
    | { type: 'DELETE_LESSON'; payload: { day: string; lessonId: number } };

const scheduleReducer = (state: SchoolDay[], action: ScheduleAction): SchoolDay[] => {
    switch (action.type) {
        case 'ADD_LESSON':
            return state.map(day =>
                day.day === action.payload.day
                    ? { ...day, lessons: [...day.lessons, action.payload.lesson] }
                    : day
            );
        case 'UPDATE_LESSON':
            return state.map(day =>
                day.day === action.payload.day
                    ? {
                        ...day,
                        lessons: day.lessons.map(lesson =>
                            lesson.id === action.payload.lesson.id
                                ? action.payload.lesson
                                : lesson
                        )
                    }
                    : day
            );
        case 'DELETE_LESSON':
            return state.map(day =>
                day.day === action.payload.day
                    ? {
                        ...day,
                        lessons: day.lessons.filter(lesson =>
                            lesson.id !== action.payload.lessonId
                        )
                    }
                    : day
            );
        default:
            return state;
    }
};

const SchoolScheduleApp: React.FC<SchoolScheduleAppProps> = ({ teachers }) => {
    const [state, dispatch] = useReducer(scheduleReducer, [
        { day: 'Poniedzia³ek', lessons: [] },
        { day: 'Wtorek', lessons: [] },
        { day: 'Œroda', lessons: [] },
        { day: 'Czwartek', lessons: [] },
        { day: 'Pi¹tek', lessons: [] }
    ]);

    const [selectedDay, setSelectedDay] = useState<string>('Poniedzia³ek');

    const handleAddLesson = (lesson: Lesson) => {
        dispatch({
            type: 'ADD_LESSON',
            payload: { day: selectedDay, lesson }
        });
    };

    const handleDayChange = (day: string) => {
        setSelectedDay(day);
    };

    return (
        <div>
            <h1>Plan Lekcji</h1>

            {/* Wyœwietlenie dni tygodnia */}
            <div>
                {state.map(day => (
                    <DayHeader
                        key={day.day}
                        day={day.day}
                        lessonCount={day.lessons.length}
                    />
                ))}
            </div>

            {/* Wybór dnia tygodnia */}
            <div>
                {state.map(day => (
                    <button key={day.day} onClick={() => handleDayChange(day.day)}>
                        {day.day}
                    </button>
                ))}
            </div>

            {/* Formularz do dodawania lekcji */}
            <LessonForm onSubmit={handleAddLesson} teachers={teachers} />

            {/* Lista lekcji dla wybranego dnia */}
            <LessonList
                lessons={state.find(day => day.day === selectedDay)?.lessons || []}
                onEdit={() => { }}
                onDelete={() => { }}
            />

            {/* Lista nauczycieli */}
            <TeacherList teachers={teachers} onSelect={(teacher) => console.log(teacher)} />
        </div>
    );
};

export default SchoolScheduleApp;
