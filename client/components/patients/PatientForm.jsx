"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "react-phone-number-input/style.css";
import { CustomFormField, SubmitButton } from "../../components";

const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);

    // Basic validation
    const { name, email, phone } = values;
    if (!name || !email || !phone) {
      alert("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    try {
      const user = {
        name,
        email,
        phone,
      };

      // Replace with your Django backend API endpoint
      const { data: newUser } = await axios.post('/api/patients', user);

      if (newUser) {
        router.push(`/patients/${newUser.id}/register`);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="text-2xl font-semibold">Hi there 👋</h1>
          <p className="text-gray-700">Get started with appointments.</p>
        </section>

        <CustomFormField
          fieldType="input"
          control={form.control}
          name="name"
          label="Full name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType="input"
          control={form.control}
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType="phone_input"
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="(555) 123-4567"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </div>
  );
};

export default PatientForm;
