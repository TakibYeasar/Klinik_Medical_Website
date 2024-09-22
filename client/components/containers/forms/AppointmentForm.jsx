"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Doctors } from "../../../constants";
import { getAppointmentSchema } from "../../../lib/validation";
import {SubmitButton} from "../../../components";

const createAppointment = async (appointmentData) => {
  try {
    const response = await fetch("/api/appointments/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointmentData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }
};

const updateAppointment = async (appointmentId, appointmentData) => {
  try {
    const response = await fetch(`/api/appointments/${appointmentId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointmentData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating appointment:", error);
    throw error;
  }
};

const AppointmentForm = ({ userId, patientId, type = "create", appointment, setOpen }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment?.primaryPhysician : "",
      schedule: appointment ? new Date(appointment?.schedule) : new Date(),
      reason: appointment ? appointment.reason : "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);

    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
    }

    try {
      if (type === "create" && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason,
          status,
          note: values.note,
        };

        const newAppointment = await createAppointment(appointmentData);

        if (newAppointment) {
          form.reset();
          router.push(`/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.id}`);
        }
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.id,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          status,
          cancellationReason: values.cancellationReason,
        };

        const updatedAppointment = await updateAppointment(appointment?.id, appointmentToUpdate);

        if (updatedAppointment) {
          setOpen && setOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    default:
      buttonLabel = "Submit Appointment";
  }

  return (
    <div className="space-y-6">
      {type === "create" && (
        <section className="mb-12 space-y-4">
          <h1 className="text-2xl font-semibold">New Appointment</h1>
          <p className="text-gray-700">Request a new appointment in 10 seconds.</p>
        </section>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {type !== "cancel" && (
          <>
            <div className="space-y-4">
              <label htmlFor="primaryPhysician" className="block text-sm font-medium text-gray-700">
                Doctor
              </label>
              <select
                id="primaryPhysician"
                {...form.register("primaryPhysician")}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {Doctors.map((doctor, i) => (
                  <option key={doctor.name + i} value={doctor.name}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <label htmlFor="schedule" className="block text-sm font-medium text-gray-700">
                Expected appointment date
              </label>
              <input
                type="datetime-local"
                id="schedule"
                {...form.register("schedule")}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="flex flex-col xl:flex-row gap-6">
              <div className="w-full">
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                  Appointment reason
                </label>
                <textarea
                  id="reason"
                  {...form.register("reason")}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Annual check-up"
                />
              </div>

              <div className="w-full">
                <label htmlFor="note" className="block text-sm font-medium text-gray-700">
                  Comments/notes
                </label>
                <textarea
                  id="note"
                  {...form.register("note")}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Prefer afternoon appointments, if possible"
                />
              </div>
            </div>
          </>
        )}

        {type === "cancel" && (
          <div className="space-y-4">
            <label htmlFor="cancellationReason" className="block text-sm font-medium text-gray-700">
              Reason for cancellation
            </label>
            <textarea
              id="cancellationReason"
              {...form.register("cancellationReason")}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Urgent meeting came up"
            />
          </div>
        )}

        <SubmitButton isLoading={isLoading} className="w-full">
          {buttonLabel}
        </SubmitButton>
      </form>
    </div>
  );
};

export default AppointmentForm;
