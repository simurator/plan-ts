import React, { useState } from 'react';
import { Lesson } from './Models';

type LessonListProps = {
    lessons: Lesson[];
    onEdit: (lesson: Lesson) => void;
    onDelete: (lessonId: number) => void;
};

const LessonList: React.FC<LessonListProps> = ({ lessons, onEdit, onDelete }) => {
    const [sortMethod, setSortMethod] = useState<'subject' | 'time'>('subject');

    const sortedLessons = [...lessons].sort((a, b) => {
        if (sortMethod === 'subject') return a.subject.localeCompare(b.subject);
        return a.startTime.localeCompare(b.startTime);
    });

    return (
        <div>
            <label>Sortuj wed³ug: </label>
            <select value={sortMethod} onChange={(e) => setSortMethod(e.target.value as 'subject' | 'time')}>
                <option value="subject">Przedmiot</option>
                <option value="time">Godzina</option>
            </select>
            <ul>
                {sortedLessons.map((lesson) => (
                    <li key={lesson.id}>
                        {lesson.subject} - {lesson.teacher.firstName} {lesson.teacher.lastName} -{' '}
                        {lesson.startTime}-{lesson.endTime}
                        <button onClick={() => onEdit(lesson)}>Edytuj</button>
                        <button onClick={() => onDelete(lesson.id)}>Usuñ</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LessonList;
