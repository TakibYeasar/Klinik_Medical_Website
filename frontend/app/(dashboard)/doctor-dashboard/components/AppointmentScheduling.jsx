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

    const [appointments, setAppointments] = useState(dummyAppointments);
    const [availableSlots] = useState(dummyAvailableSlots);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [patientName, setPatientName] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [appointmentToEdit, setAppointmentToEdit] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleConfirmAppointment = () => {
        if (!patientName || !selectedDate || !selectedTime) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        const newAppointment = {
            id: appointments.length + 1,
            patientName,
            date: selectedDate,
            time: selectedTime,
        };

        setAppointments([...appointments, newAppointment]);
        setPatientName('');
        setSelectedDate(null);
        setSelectedTime('');
        setErrorMessage('');
        alert(`Appointment confirmed for ${patientName} on ${selectedDate} at ${selectedTime}`);
    };

    const handleCancelAppointment = (id) => {
        setAppointments(appointments.filter(appointment => appointment.id !== id));
    };

    const handleEditAppointment = (appointment) => {
        setEditMode(true);
        setAppointmentToEdit(appointment);
        setPatientName(appointment.patientName);
        setSelectedDate(appointment.date);
        setSelectedTime(appointment.time);
    };

    const handleUpdateAppointment = () => {
        const updatedAppointments = appointments.map((appointment) =>
            appointment.id === appointmentToEdit.id
                ? { ...appointment, patientName, date: selectedDate, time: selectedTime }
                : appointment
        );

        setAppointments(updatedAppointments);
        setEditMode(false);
        setAppointmentToEdit(null);
        setPatientName('');
        setSelectedDate(null);
        setSelectedTime('');
        setErrorMessage('');
        alert('Appointment updated successfully.');
    };

    return (
        <div id="appointment-scheduling" className="p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Appointment Scheduling</h2>

            {/* Upcoming Appointments Section */}
            <div className="mb-10">
                <h3 className="text-2xl font-semibold text-gray-800">Upcoming Appointments</h3>
                <ul className="mt-4 space-y-4">
                    {appointments.length > 0 ? appointments.map((appointment) => (
                        <li key={appointment.id} className="border rounded-xl p-4 shadow-sm bg-gray-50 hover:bg-gray-100 transition-all">
                            <p className="text-xl font-semibold">{appointment.patientName}</p>
                            <p className="text-gray-600 mt-1">Date: {appointment.date}</p>
                            <p className="text-gray-600">Time: {appointment.time}</p>
                            <div className="flex justify-end mt-3">
                                <button
                                    onClick={() => handleEditAppointment(appointment)}
                                    className="text-blue-500 mr-4"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleCancelAppointment(appointment.id)}
                                    className="text-red-500"
                                >
                                    Cancel
                                </button>
                            </div>
                        </li>
                    )) : (
                        <p className="text-gray-500">No upcoming appointments.</p>
                    )}
                </ul>
            </div>

            {/* Appointment Form Section */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    {editMode ? 'Edit Appointment' : 'Schedule New Appointment'}
                </h3>

                <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Enter Patient Name"
                    className="w-full border-gray-300 rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Available Slots Section */}
                <h4 className="text-xl font-medium text-gray-800 mb-2">Available Dates</h4>
                <div className="flex gap-4 overflow-x-auto mb-4">
                    {availableSlots.map((slot, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedDate(slot.date)}
                            className={`text-center py-3 px-4 cursor-pointer transition-colors duration-200 rounded-xl ${selectedDate === slot.date ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                                }`}
                        >
                            <p className="font-medium">{daysOfWeek[new Date(slot.date).getDay()]}</p>
                            <p className="text-lg">{new Date(slot.date).getDate()}</p>
                        </div>
                    ))}
                </div>

                {/* Time Slots for Selected Date */}
                {selectedDate && (
                    <>
                        <h4 className="text-xl font-medium text-gray-800 mb-2">Available Time Slots</h4>
                        <div className="flex gap-4 overflow-x-auto mb-4">
                            {availableSlots.find(slot => slot.date === selectedDate)?.times.map((time, index) => (
                                <p
                                    key={index}
                                    onClick={() => setSelectedTime(time)}
                                    className={`px-6 py-2 cursor-pointer text-center transition-colors duration-200 rounded-full ${selectedTime === time ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                                        }`}
                                >
                                    {time}
                                </p>
                            ))}
                        </div>
                    </>
                )}

                {errorMessage && (
                    <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
                )}

                {/* Confirm or Update Appointment Button */}
                <button
                    onClick={editMode ? handleUpdateAppointment : handleConfirmAppointment}
                    className="w-full bg-blue-600 text-white text-lg font-medium py-3 rounded-xl hover:bg-blue-700 transition-all"
                >
                    {editMode ? 'Update Appointment' : 'Confirm Appointment'}
                </button>
            </div>
        </div>
    );
};

export default AppointmentScheduling;
