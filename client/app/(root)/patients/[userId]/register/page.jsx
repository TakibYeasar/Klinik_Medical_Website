"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RegisterForm } from "../../../../../components";

// Function to fetch user data from Django backend
const fetchUser = async (userId) => {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
};

// Function to fetch patient data from Django backend
const fetchPatient = async (userId) => {
  const response = await fetch(`/api/patients/${userId}`);
  return response.json();
};

const Register = ({ params: { userId } }) => {
  const [user, setUser] = useState(null);
  const [patient, setPatient] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      const userData = await fetchUser(userId);
      setUser(userData);
    };

    const getPatientData = async () => {
      const patientData = await fetchPatient(userId);
      setPatient(patientData);

      if (patientData) {
        router.push(`/patients/${userId}/new-appointment`);
      }
    };

    getUserData();
    getPatientData();
  }, [userId, router]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex h-screen">
      <section className="flex flex-col justify-center items-center w-full max-w-lg mx-auto">
        <div className="flex flex-col items-center justify-between w-full max-w-3xl py-10">
          {/* Logo */}
          <Image
            src="/assets/icons/logo-full.svg"
            height={40}
            width={160}
            alt="patient"
            className="mb-12 h-10 w-auto"
          />

          {/* Registration Form */}
          <div className="w-full">
            <RegisterForm user={user} />
          </div>

          {/* Footer */}
          <p className="text-gray-500 text-sm mt-10 py-12">© 2024 CarePluse</p>
        </div>
      </section>

      {/* Side Image */}
      <div className="hidden md:block">
        <Image
          src="/assets/images/register-img.png"
          height={750}
          width={750}
          alt="patient"
          className="object-contain max-w-[390px]"
        />
      </div>
    </div>
  );
};

export default Register;
