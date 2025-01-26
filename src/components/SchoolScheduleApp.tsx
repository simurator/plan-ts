// SchoolScheduleApp.tsx
import React, { useState, useReducer } from 'react';
import DayHeader from './DayHeader';
import LessonForm from './LessonForm';
import LessonList from './LessonList';
import { Lesson, Teacher, SchoolDay } from './Models';

type SchoolScheduleAppProps = {
    teachers: Teacher[];
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
                        lessons: day.lessons.filter(lesson => lesson.id !== action.payload.lessonId)
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
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

    const handleAddLesson = (lesson: Lesson) => {
        dispatch({
            type: 'ADD_LESSON',
            payload: { day: selectedDay, lesson }
        });
    };

    const handleEditLesson = (lesson: Lesson) => {
        setSelectedLesson(lesson);
    };

    const handleUpdateLesson = (updatedLesson: Lesson) => {
        dispatch({
            type: 'UPDATE_LESSON',
            payload: { day: selectedDay, lesson: updatedLesson }
        });
        setSelectedLesson(null); // Close the form after updating
    };

    const handleDeleteLesson = (lessonId: number) => {
        dispatch({
            type: 'DELETE_LESSON',
            payload: { day: selectedDay, lessonId }
        });
    };

    const handleDayChange = (day: string) => {
        setSelectedDay(day);
        setSelectedLesson(null); // Reset selected lesson when switching days
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

            {/* Formularz do dodawania lekcji lub edytowania istniej¹cej */}
            {selectedLesson ? (
                <LessonForm
                    onSubmit={handleUpdateLesson}
                    teachers={teachers}
                    lesson={selectedLesson}
                />
            ) : (
                <LessonForm onSubmit={handleAddLesson} teachers={teachers} />
            )}

            {/* Lista lekcji dla wybranego dnia */}
            <LessonList
                lessons={state.find(day => day.day === selectedDay)?.lessons || []}
                onEdit={handleEditLesson}
                onDelete={handleDeleteLesson}
            />
        </div>
    );
};

export default SchoolScheduleApp;
