import React, { useState } from 'react';

const daysOfWeek = ["SAT", "SUN", "MON", "TUE", "WED", "THU", "FRI"];

const AppointmentScheduling = () => {
    // Dummy data for appointments
    const dummyAppointments = [
        { patientName: 'John Doe', date: '2024-09-28', time: '10:00 AM' },
        { patientName: 'Jane Smith', date: '2024-09-29', time: '11:00 AM' },
        { patientName: 'Alice Johnson', date: '2024-09-30', time: '09:30 AM' },
    ];

    // Dummy data for available slots
    const dummyAvailableSlots = [
        { date: '2024-09-28', times: ['10:00 AM', '11:00 AM', '2:00 PM'] },
        { date: '2024-09-29', times: ['9:00 AM', '1:00 PM', '3:00 PM'] },
        { date: '2024-09-30', times: ['10:30 AM', '12:00 PM', '4:00 PM'] },
    ];

    const [appointments] = useState(dummyAppointments);
    const [availableSlots] = useState(dummyAvailableSlots);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');

    return (
        <div id="appointment-scheduling" className='mt-6'>
            <h3 className='font-semibold text-lg text-gray-900'>Appointment Scheduling</h3>

            {/* Upcoming Appointments Section */}
            <div className='mt-4'>
                <h4 className='font-medium text-md text-gray-800'>Upcoming Appointments</h4>
                <ul className='mt-2 space-y-2'>
                    {appointments.length > 0 ? appointments.map((appointment, index) => (
                        <li key={index} className='border p-4 rounded shadow-sm bg-white'>
                            <p className='font-semibold'>{appointment.patientName}</p>
                            <p className='text-sm text-gray-600'>Date: {appointment.date}</p>
                            <p className='text-sm text-gray-600'>Time: {appointment.time}</p>
                        </li>
                    )) : (
                        <p className='text-gray-500'>No upcoming appointments.</p>
                    )}
                </ul>
            </div>

            {/* Available Slots Section */}
            <div className='mt-6'>
                <h4 className='font-medium text-md text-gray-800'>Available Slots</h4>
                <div className='flex gap-4 overflow-x-auto mt-4'>
                    {availableSlots.length > 0 && availableSlots.map((slot, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedDate(slot.date)}
                            className={`text-center py-3 px-4 rounded-full cursor-pointer transition-colors duration-200 ${selectedDate === slot.date ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 border border-gray-300'}`}
                        >
                            <p className='font-medium'>{daysOfWeek[new Date(slot.date).getDay()]}</p>
                            <p className='font-light'>{new Date(slot.date).getDate()}</p>
                        </div>
                    ))}
                </div>

                {/* Time Slots for Selected Date */}
                <div className='flex items-center gap-4 overflow-x-auto mt-4'>
                    {availableSlots.length > 0 && availableSlots.find(slot => slot.date === selectedDate)?.times.map((time, index) => (
                        <p
                            key={index}
                            onClick={() => setSelectedTime(time)}
                            className={`text-sm font-light flex-shrink-0 px-4 py-2 rounded-full cursor-pointer transition-colors duration-200 ${time === selectedTime ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400 border border-gray-300'}`}
                        >
                            {time}
                        </p>
                    ))}
                </div>

                <button className='bg-primary text-white text-sm font-medium px-6 py-3 rounded-full my-6 hover:bg-primary-dark transition duration-200'>
                    Confirm Appointment
                </button>
            </div>
        </div>
    );
};

export default AppointmentScheduling;
