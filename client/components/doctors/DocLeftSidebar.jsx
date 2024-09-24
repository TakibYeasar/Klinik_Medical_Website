const DocLeftSidebar = () => (
    <div className="w-64 bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Doctor's Dashboard</h2>
        <ul>
            <li className="mb-2">
                <a href="#details" className="text-gray-700 hover:text-primary">Profile Details</a>
            </li>
            <li className="mb-2">
                <a href="#booking" className="text-gray-700 hover:text-primary">Booking</a>
            </li>
        </ul>
    </div>
);

export default DocLeftSidebar;