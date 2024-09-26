"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Doctors } from "../../../../constants";

// Function to fetch appointment from Django backend
const fetchAppointment = async (appointmentId) => {
  const response = await fetch(`/api/appointments/${appointmentId}`);
  const data = await response.json();
  return data;
};

const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return {
    dateTime: date.toLocaleString(),
  };
};

const RequestSuccess = ({ searchParams, params: { userId } }) => {
  const [appointment, setAppointment] = useState(null);
  const [doctor, setDoctor] = useState(null);

  const appointmentId = searchParams?.appointmentId || "";

  useEffect(() => {
    const getAppointmentDetails = async () => {
      const appointmentData = await fetchAppointment(appointmentId);
      setAppointment(appointmentData);

      const foundDoctor = Doctors.find(
        (doc) => doc.name === appointmentData.primaryPhysician
      );
      setDoctor(foundDoctor);
    };

    getAppointmentDetails();
  }, [appointmentId]);

  if (!appointment || !doctor) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="flex h-screen max-h-screen px-4 flex-col items-center justify-center space-y-8">
      {/* Logo */}
      <Link href="/" className="text-lg font-semibold text-blue-600 hover:text-blue-700">
        CarePluse
      </Link>

      {/* Success Section */}
      <section className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-center mb-4 max-w-lg">
          Your <span className="text-green-500">appointment request</span> has
          been successfully submitted!
        </h2>
        <p className="text-gray-700">We&apos;ll be in touch shortly to confirm.</p>
      </section>

      {/* Appointment Details Section */}
      <section className="w-full max-w-lg space-y-4 bg-white shadow-md rounded-lg p-6">
        <p className="font-semibold text-lg">Requested appointment details:</p>
        <div className="flex items-center gap-3">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            <p className="text-xl font-medium">Dr. {doctor.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="font-medium">{formatDateTime(appointment.schedule).dateTime}</p>
        </div>
      </section>

      {/* New Appointment Button */}
      <Link href={`/patients/${userId}/new-appointment`} className="inline-block">
        <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
          New Appointment
        </button>
      </Link>

      {/* Footer */}
      <p className="text-gray-500 text-sm">© 2024 CarePluse</p>
    </div>
  );
};

export default RequestSuccess;
