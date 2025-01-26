export type Teacher = {
    id: number;
    firstName: string;
    lastName: string;
};


export type Lesson = {
    id: number;
    subject: string;
    teacher: Teacher;
    startTime: string;
    endTime: string;
    classroom: string;
};

export type SchoolDay = {
    day: string;
    lessons: Lesson[];
};