import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import SchoolScheduleApp from './components/SchoolScheduleApp';  // Import komponentu Plan Lekcji
import { Teacher } from './components/Models';  // Import interfejsu nauczyciela

const App: React.FC = () => {
    // Stw�rz przyk�adowych nauczycieli
    const [teachers] = useState<Teacher[]>([
        { id: 1, firstName: 'Jan', lastName: 'Kowalski' },
        { id: 2, firstName: 'Anna', lastName: 'Nowak' },
    ]);

    return (
        // Router dla ca�ej aplikacji
        <BrowserRouter>
            {/* Przekazujemy nauczycieli do SchoolScheduleApp */}
            <SchoolScheduleApp teachers={teachers} />
        </BrowserRouter>
    );
};

export default App;
