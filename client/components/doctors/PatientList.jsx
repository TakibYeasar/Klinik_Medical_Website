const PatientList = ({ patients }) => (
    <div id="patients" className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h3 className="text-lg font-semibold">Patients</h3>
        <table className="min-w-full mt-2">
            <thead>
                <tr className="border-b">
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Age</th>
                    <th className="px-4 py-2 text-left">Last Visit</th>
                    <th className="px-4 py-2 text-left">History</th>
                </tr>
            </thead>
            <tbody>
                {patients.map((patient) => (
                    <tr key={patient.id} className="border-b hover:bg-gray-100">
                        <td className="px-4 py-2">{patient.name}</td>
                        <td className="px-4 py-2">{patient.age}</td>
                        <td className="px-4 py-2">{patient.lastVisit}</td>
                        <td className="px-4 py-2">{patient.history}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default PatientList;
