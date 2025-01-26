import React from 'react';

type DayHeaderProps = {
    day: string;
    lessonCount: number;
};

const DayHeader: React.FC<DayHeaderProps> = ({ day, lessonCount }) => (
    <div className="flex justify-between">
        <h2>{day}</h2>
        <span>Lekcji: {lessonCount}</span>
    </div>
);

export default DayHeader;