export type Department = {
    id: number;
    name: string;
    code: string;
};

export type Teacher = {
    id: number;
    firstName: string;
    lastName: string;
    department: Department;
    subjects: string[];
    yearsOfExperience: number;
    isFullTime: boolean;
    contact: {
        email: string;
        phone?: string;
    };
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