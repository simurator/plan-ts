import React, { useState, useReducer } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom'; // Import Link
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

    const [selectedDay] = useState<string>('Poniedzia³ek');
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

    const navigate = useNavigate();  // Hook do nawigacji

    const handleAddLesson = (lesson: Lesson) => {
        dispatch({
            type: 'ADD_LESSON',
            payload: { day: selectedDay, lesson }
        });
        navigate(`/day/${selectedDay}`);  // Nawigacja po dodaniu lekcji
    };

    const handleEditLesson = (lesson: Lesson) => {
        setSelectedLesson(lesson);
        navigate(`/edit-lesson/${lesson.id}`);  // Nawigacja do edytowania lekcji
    };

    const handleUpdateLesson = (updatedLesson: Lesson) => {
        dispatch({
            type: 'UPDATE_LESSON',
            payload: { day: selectedDay, lesson: updatedLesson }
        });
        setSelectedLesson(null); // Zamkniêcie formularza po edycji
        navigate(`/day/${selectedDay}`);  // Powrót do widoku dnia
    };

    const handleDeleteLesson = (lessonId: number) => {
        dispatch({
            type: 'DELETE_LESSON',
            payload: { day: selectedDay, lessonId }
        });
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

            {/* Linki do przejœcia do poszczególnych dni */}
            <div>
                {state.map(day => (
                    <Link key={day.day} to={`/day/${day.day}`} style={{ margin: '0 10px' }}>
                        {day.day}
                    </Link>
                ))}
            </div>

            {/* Poni¿ej dodajemy link do formularza lekcji */}
            <div style={{ marginTop: '20px' }}>
                <Link to="/add-lesson" style={{ margin: '10px', padding: '10px', background: '#4CAF50', color: '#fff', textDecoration: 'none' }}>
                    Dodaj now¹ lekcjê
                </Link>
            </div>

            {/* Routing dla poszczególnych dni */}
            <Routes>
                {state.map(day => (
                    <Route
                        key={day.day}
                        path={`/day/${day.day}`}
                        element={
                            <div>
                                <h2>{day.day}</h2>
                                {/* Lista lekcji dla wybranego dnia */}
                                <LessonList
                                    lessons={day.lessons}
                                    onEdit={handleEditLesson}
                                    onDelete={handleDeleteLesson}
                                />
                            </div>
                        }
                    />
                ))}

                {/* Routing do formularza edycji lekcji */}
                <Route
                    path="/edit-lesson/:lessonId"
                    element={
                        selectedLesson ? (
                            <LessonForm
                                onSubmit={handleUpdateLesson}
                                teachers={teachers}
                                lesson={selectedLesson}
                            />
                        ) : (
                            <div>£adowanie lekcji...</div>
                        )
                    }
                />

                {/* Routing do formularza dodawania lekcji */}
                <Route
                    path="/add-lesson"
                    element={<LessonForm onSubmit={handleAddLesson} teachers={teachers} />}
                />
            </Routes>
        </div>
    );
};

export default SchoolScheduleApp;
