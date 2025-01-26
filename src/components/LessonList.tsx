import React, { useState } from 'react';
import { Lesson } from './Models';

type LessonListProps = {
    lessons: Lesson[];
    onEdit: (lesson: Lesson) => void;
    onDelete: (lessonId: number) => void;
};

const LessonList: React.FC<LessonListProps> = ({ lessons, onEdit, onDelete }) => {
    const [sortMethod, setSortMethod] = useState<'subject' | 'time'>('subject'); // Default sort by subject

    // Sort lessons based on the selected method
    const sortedLessons = [...lessons].sort((a, b) => {
        if (sortMethod === 'subject') {
            // Sorting alphabetically by subject
            if (a.subject < b.subject) return -1;
            if (a.subject > b.subject) return 1;
            return 0;
        } else if (sortMethod === 'time') {
            // Sorting by start time (chronologically)
            return a.startTime.localeCompare(b.startTime);
        }
        return 0;
    });

    return (
        <div>
            <h2>Lista Lekcji</h2>

            {/* Sort by dropdown */}
            <div>
                <label>Sortuj wed³ug: </label>
                <select value={sortMethod} onChange={(e) => setSortMethod(e.target.value as 'subject' | 'time')}>
                    <option value="subject">Przedmiot (alfabetycznie)</option>
                    <option value="time">Czas rozpoczêcia</option>
                </select>
            </div>

            <ul>
                {sortedLessons.map(lesson => (
                    <li key={lesson.id}>
                        <div>
                            <span>{lesson.subject}</span> - <span>{lesson.teacher.firstName} {lesson.teacher.lastName}</span>
                            <span> - {lesson.startTime} - {lesson.endTime}</span>
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
