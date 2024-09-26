const AppointmentCalendar = ({ appointments }) => (
    <div id="appointments" className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
        <ul className="mt-2">
            {appointments.map((appointment) => (
                <li key={appointment.id} className="flex justify-between border-b py-2">
                    <span>{appointment.date} - {appointment.time}</span>
                    <span>{appointment.patient}</span>
                </li>
            ))}
        </ul>
    </div>
);

export default AppointmentCalendar;
