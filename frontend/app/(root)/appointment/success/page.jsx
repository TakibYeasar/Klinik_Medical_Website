"use client";

import Link from "next/link";

// Dummy data for appointment and doctor
const appointment = {
  primaryPhysician: "Dr. Jane Smith",
  schedule: "2024-09-30T15:00:00Z", // Example appointment date and time
  reason: "Annual check-up",
  note: "Prefer afternoon appointments.",
  status: "scheduled",
};

const doctor = {
  name: "Dr. Jane Smith",
  specialty: "General Practice",
  location: "123 Health St, City, Country",
};

const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return {
    dateTime: date.toLocaleString(),
  };
};

const RequestSuccess = ({ params: { userId } }) => {
  return (
    <div className="flex h-screen max-h-screen px-4 flex-col items-center justify-center space-y-8">
      {/* Logo */}
      <Link href="/" className="text-lg font-semibold text-blue-600 hover:text-blue-700">
        Klinik
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
          <div>
            <p className="font-medium text-gray-700">Doctor Specialty: {doctor.specialty}</p>
            <p className="font-medium text-gray-700">Location: {doctor.location}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-medium">Appointment Date & Time:</p>
          <p className="text-gray-600">{formatDateTime(appointment.schedule).dateTime}</p>
          <p className="font-medium">Reason for Visit:</p>
          <p className="text-gray-600">{appointment.reason}</p>
          <p className="font-medium">Additional Notes:</p>
          <p className="text-gray-600">{appointment.note}</p>
        </div>
      </section>

      {/* New Appointment Button */}
      <Link href={`/appointment`} className="inline-block">
        <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
          Schedule New Appointment
        </button>
      </Link>
    </div>
  );
};

export default RequestSuccess;
