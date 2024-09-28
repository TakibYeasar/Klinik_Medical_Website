"use client";

import React, { useState } from 'react';

const daysOfWeek = ["SAT", "SUN", "MON", "TUE", "WED", "THU", "FRI"];

const AppointmentScheduling = () => {
    // Dummy data for appointments
    const dummyAppointments = [
        { id: 1, patientName: 'John Doe', date: '2024-09-28', time: '10:00 AM' },
        { id: 2, patientName: 'Jane Smith', date: '2024-09-29', time: '11:00 AM' },
        { id: 3, patientName: 'Alice Johnson', date: '2024-09-30', time: '09:30 AM' },
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
    const [patientName, setPatientName] = useState('');

    const handleConfirmAppointment = () => {
        if (selectedDate && selectedTime && patientName) {
            // Here you can handle the appointment confirmation logic
            alert(`Appointment confirmed for ${patientName} on ${selectedDate} at ${selectedTime}`);
            // Reset selections
            setSelectedDate(null);
            setSelectedTime('');
            setPatientName('');
        } else {
            alert('Please select a date, time, and enter patient name.');
        }
    };

    return (
        <div id="appointment-scheduling" className='mt-6'>
            <h3 className='font-semibold text-lg text-gray-900'>Appointment Scheduling</h3>

            {/* Upcoming Appointments Section */}
            <div className='mt-4'>
                <h4 className='font-medium text-md text-gray-800'>Upcoming Appointments</h4>
                <ul className='mt-2 space-y-2'>
                    {appointments.length > 0 ? appointments.map((appointment) => (
                        <li key={appointment.id} className='border p-4 rounded shadow-sm bg-white'>
                            <p className='font-semibold'>{appointment.patientName}</p>
                            <p className='text-sm text-gray-600'>Date: {appointment.date}</p>
                            <p className='text-sm text-gray-600'>Time: {appointment.time}</p>
                        </li>
                    )) : (
                        <p className='text-gray-500'>No upcoming appointments.</p>
                    )}
                </ul>
            </div>

            {/* Appointment Form Section */}
            <div className='mt-6 bg-white p-4 rounded shadow'>
                <h4 className='font-medium text-md text-gray-800'>Schedule New Appointment</h4>
                <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Enter Patient Name"
                    className='border rounded p-2 mb-2 w-full'
                />

                {/* Available Slots Section */}
                <h4 className='font-medium text-md text-gray-800 mt-4'>Available Dates</h4>
                <div className='flex gap-4 overflow-x-auto mt-2'>
                    {availableSlots.map((slot, index) => (
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
                {selectedDate && (
                    <>
                        <h4 className='font-medium text-md text-gray-800 mt-4'>Available Time Slots</h4>
                        <div className='flex items-center gap-4 overflow-x-auto mt-2'>
                            {availableSlots.find(slot => slot.date === selectedDate)?.times.map((time, index) => (
                                <p
                                    key={index}
                                    onClick={() => setSelectedTime(time)}
                                    className={`text-sm font-light flex-shrink-0 px-4 py-2 rounded-full cursor-pointer transition-colors duration-200 ${time === selectedTime ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400 border border-gray-300'}`}
                                >
                                    {time}
                                </p>
                            ))}
                        </div>
                    </>
                )}

                {/* Confirm Appointment Button */}
                <button
                    onClick={handleConfirmAppointment}
                    className='bg-primary text-white text-sm font-medium px-6 py-3 rounded-full my-6 hover:bg-primary-dark transition duration-200'
                >
                    Confirm Appointment
                </button>
            </div>
        </div>
    );
};

export default AppointmentScheduling;
