"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Doctors } from "../../../../../constants";

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
    return <p>Loading...</p>;
  }

  return (
    <div className="flex h-screen max-h-screen px-[5%] flex-col items-center justify-center space-y-8">
      {/* Logo */}
      <Link href="/">
        <Image
          src="/assets/icons/logo-full.svg"
          height={40}
          width={160}
          alt="logo"
          className="h-10 w-auto"
        />
      </Link>

      {/* Success Section */}
      <section className="flex flex-col items-center">
        <Image
          src="/assets/gifs/success.gif"
          height={300}
          width={280}
          alt="success"
          className="mb-6"
        />
        <h2 className="text-2xl font-bold text-center mb-4 max-w-lg">
          Your <span className="text-green-500">appointment request</span> has
          been successfully submitted!
        </h2>
        <p>We&apos;ll be in touch shortly to confirm.</p>
      </section>

      {/* Appointment Details Section */}
      <section className="w-full max-w-lg space-y-4">
        <p className="font-semibold">Requested appointment details:</p>
        <div className="flex items-center gap-3">
          <Image
            src={doctor.image}
            alt="doctor"
            width={100}
            height={100}
            className="rounded-full"
          />
          <p className="text-lg font-medium whitespace-nowrap">Dr. {doctor.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src="/assets/icons/calendar.svg"
            height={24}
            width={24}
            alt="calendar"
          />
          <p>{formatDateTime(appointment.schedule).dateTime}</p>
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
