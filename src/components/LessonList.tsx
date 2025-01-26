import React from 'react';
import { Lesson } from './Models';

type LessonListProps = {
    lessons: Lesson[];
    onEdit: (lesson: Lesson) => void;
    onDelete: (lessonId: number) => void;
};

const LessonList: React.FC<LessonListProps> = ({ lessons, onEdit, onDelete }) => {
    return (
        <div>
            <h2>Lista Lekcji</h2>
            <ul>
                {lessons.map(lesson => (
                    <li key={lesson.id}>
                        <div>
                            <span>{lesson.subject}</span> - <span>{lesson.teacher.firstName} {lesson.teacher.lastName}</span>
                            <button onClick={() => onEdit(lesson)}>Edytuj</button>
                            <button onClick={() => onDelete(lesson.id)}>Usuñ</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LessonList;
