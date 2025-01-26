import React, { useState } from 'react';
import SchoolScheduleApp from './components/SchoolScheduleApp';
import { Teacher } from './components/Models';

const App: React.FC = () => {
    

    const [teachers] = useState<Teacher[]>([
        {
            id: 1,
            firstName: 'Jan',
            lastName: 'Kowalski',
            // Removing department, subjects, and other fields since the Teacher type now only has id, firstName, and lastName
        },
        {
            id: 2,
            firstName: 'Anna',
            lastName: 'Nowak',
            // Removing department, subjects, and other fields
        }
    ]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Plan Lekcji Szkoly</h1>
            {/* Passing the teachers array to the SchoolScheduleApp */}
            <SchoolScheduleApp teachers={teachers} />
        </div>
    );
};

export default App;
