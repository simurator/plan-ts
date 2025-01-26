import React, { useState } from 'react';
import { Teacher } from './Models';

type TeacherListProps = {
    teachers: Teacher[];
    onSelect: (teacher: Teacher) => void;
};

const TeacherList: React.FC<TeacherListProps> = ({ teachers, onSelect }) => {
    const [sortBy, setSortBy] = useState<keyof Teacher>('lastName');

    const sortedTeachers = [...teachers].sort((a, b) => {
        const valueA = a[sortBy];
        const valueB = b[sortBy];
        return String(valueA).localeCompare(String(valueB));
    });

    return (
        <div>
            <div>
                <button onClick={() => setSortBy('lastName')}>Nazwisko</button>
                <button onClick={() => setSortBy('yearsOfExperience')}>Staz</button>
            </div>
            {sortedTeachers.map(teacher => (
                <div key={teacher.id}>
                    <span>{teacher.firstName} {teacher.lastName}</span>
                    <span>{teacher.department.name}</span>
                    <button onClick={() => onSelect(teacher)}>Wybierz</button>
                </div>
            ))}
        </div>
    );
};

export default TeacherList;