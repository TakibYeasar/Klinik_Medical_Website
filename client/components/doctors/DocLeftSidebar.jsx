const DocLeftSidebar = ({ setActiveSection }) => {
    return (
        <ul className="space-y-4">
            <li>
                <button onClick={() => setActiveSection('profile')} className="w-full text-left p-2 rounded hover:bg-gray-700">
                    Doctor Profile
                </button>
            </li>
            <li>
                <button onClick={() => setActiveSection('patients')} className="w-full text-left p-2 rounded hover:bg-gray-700">
                    Patient List
                </button>
            </li>
            <li>
                <button onClick={() => setActiveSection('appointments')} className="w-full text-left p-2 rounded hover:bg-gray-700">
                    Appointment Calendar
                </button>
            </li>
            <li>
                <button onClick={() => setActiveSection('feedback')} className="w-full text-left p-2 rounded hover:bg-gray-700">
                    Patient Feedback
                </button>
            </li>
        </ul>
    );
};

export default DocLeftSidebar;
