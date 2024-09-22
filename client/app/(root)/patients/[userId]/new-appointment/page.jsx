"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AppointmentForm } from "../../../../components";

// Function to fetch patient data from Django backend
const fetchPatient = async (userId) => {
  const response = await fetch(`/api/patients/${userId}`);
  const data = await response.json();
  return data;
};

const Appointment = ({ params: { userId } }) => {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const getPatientDetails = async () => {
      const patientData = await fetchPatient(userId);
      setPatient(patientData);
    };

    getPatientDetails();
  }, [userId]);

  if (!patient) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex h-screen">
      <section className="flex flex-col justify-center items-center w-full max-w-lg mx-auto">
        <div className="flex flex-col items-center justify-between w-full max-w-3xl">
          {/* Logo */}
          <Image
            src="/assets/icons/logo-full.svg"
            height={40}
            width={160}
            alt="logo"
            className="mb-12 h-10 w-auto"
          />

          {/* Appointment Form */}
          <div className="w-full">
            <AppointmentForm
              patientId={patient.id}
              userId={userId}
              type="create"
            />
          </div>

          {/* Footer */}
          <p className="text-gray-500 text-sm mt-10 py-12">© 2024 CarePluse</p>
        </div>
      </section>

      {/* Side Image */}
      <div className="hidden md:block">
        <Image
          src="/assets/images/appointment-img.png"
          height={750}
          width={750}
          alt="appointment"
          className="object-contain max-w-[390px]"
        />
      </div>
    </div>
  );
};

export default Appointment;
