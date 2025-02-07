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
                    Patient Management
                </button>
            </li>
            <li>
                <button onClick={() => setActiveSection('appointments')} className="w-full text-left p-2 rounded hover:bg-gray-700">
                    Appointment Scheduling
                </button>
            </li>
            <li>
                <button onClick={() => setActiveSection('feedback')} className="w-full text-left p-2 rounded hover:bg-gray-700">
                    Feedback Management
                </button>
            </li>
            <li>
                <button onClick={() => setActiveSection('changepass')} className="w-full text-left p-2 rounded hover:bg-gray-700">
                    Change Password
                </button>
            </li>
        </ul>
    );
};

export default DocLeftSidebar;
