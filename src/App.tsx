import React, { useState } from 'react';
import SchoolScheduleApp from './components/SchoolScheduleApp';
import { Teacher, Department } from './components/Models';

const App: React.FC = () => {
    const departments: Department[] = [
        { id: 1, name: 'Wydzia³ Matematyczno-Przyrodniczy', code: 'WMP' },
        { id: 2, name: 'Wydzia³ Humanistyczny', code: 'WH' }
    ];

    const [teachers] = useState<Teacher[]>([
        {
            id: 1,
            firstName: 'Jan',
            lastName: 'Kowalski',
            department: departments[0],
            subjects: ['Matematyka', 'Fizyka'],
            yearsOfExperience: 15,
            isFullTime: true,
            contact: {
                email: 'jan.kowalski@szkola.pl',
                phone: '555-123-456'
            }
        },
        {
            id: 2,
            firstName: 'Anna',
            lastName: 'Nowak',
            department: departments[1],
            subjects: ['Jêzyk Polski', 'Literatura'],
            yearsOfExperience: 10,
            isFullTime: true,
            contact: {
                email: 'anna.nowak@szkola.pl'
            }
        }
    ]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Plan Lekcji Szkoly</h1>
            {/* Przekazanie nauczycieli do SchoolScheduleApp */}
            <SchoolScheduleApp teachers={teachers} />
        </div>
    );
};

export default App;
