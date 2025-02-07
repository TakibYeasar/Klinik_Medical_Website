"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Doctors } from "../../constants";

const AppointmentForm = ({ type = "create", appointment, setOpen }) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      doctor: appointment ? appointment?.doctor : "",
      appointmentDate: appointment ? new Date(appointment?.appointment_date).toISOString().slice(0, 10) : "",
      appointmentTime: appointment ? appointment?.appointment_time : "",
      reason: appointment ? appointment.reason : "",
      note: appointment?.note || "",
      status: appointment ? appointment.status : "scheduled",
      cancellationReason: appointment?.cancellation_reason || "",
      visitDuration: appointment?.visit_duration || "",
      followUpRequired: appointment?.follow_up_required || false,
      followUpDate: appointment ? new Date(appointment?.follow_up_date).toISOString().slice(0, 10) : "",
    },
  });

  const onSubmit = (values) => {
    setIsLoading(true);

    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "canceled";
        break;
      default:
        status = "pending";
    }

    // Simulate successful submission
    setTimeout(() => {
      setIsLoading(false);
      form.reset();
      if (setOpen) setOpen(false);
      console.log("Form Submitted: ", values, "with status:", status);
    }, 1500);
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
          <h1 className="text-2xl font-semibold text-gray-900">New Appointment</h1>
          <p className="text-gray-700">Request a new appointment in 10 seconds.</p>
        </section>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {type !== "cancel" && (
          <>
            <div className="space-y-4">
              <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">
                Doctor
              </label>
              <select
                id="doctor"
                {...form.register("doctor", { required: "Doctor selection is required" })}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select a doctor</option>
                {Doctors.map((doctor, i) => (
                  <option key={doctor.name + i} value={doctor.name}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full">
                <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700">
                  Appointment Date
                </label>
                <input
                  type="date"
                  id="appointmentDate"
                  {...form.register("appointmentDate", { required: "Appointment date is required" })}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="w-full">
                <label htmlFor="appointmentTime" className="block text-sm font-medium text-gray-700">
                  Appointment Time
                </label>
                <input
                  type="time"
                  id="appointmentTime"
                  {...form.register("appointmentTime", { required: "Appointment time is required" })}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full">
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                  Appointment Reason
                </label>
                <textarea
                  id="reason"
                  {...form.register("reason", { required: "Reason is required" })}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Annual check-up"
                />
              </div>

              <div className="w-full">
                <label htmlFor="note" className="block text-sm font-medium text-gray-700">
                  Comments/Notes
                </label>
                <textarea
                  id="note"
                  {...form.register("note")}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Prefer afternoon appointments, if possible"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full">
                <label htmlFor="visitDuration" className="block text-sm font-medium text-gray-700">
                  Visit Duration (minutes)
                </label>
                <input
                  type="number"
                  id="visitDuration"
                  {...form.register("visitDuration")}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Duration in minutes"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="followUpRequired"
                  {...form.register("followUpRequired")}
                  className="h-4 w-4 border-gray-300 rounded"
                />
                <label htmlFor="followUpRequired" className="ml-2 text-sm font-medium text-gray-700">
                  Follow-up Required
                </label>
              </div>
            </div>

            {form.watch("followUpRequired") && (
              <div className="space-y-4">
                <label htmlFor="followUpDate" className="block text-sm font-medium text-gray-700">
                  Follow-up Date
                </label>
                <input
                  type="date"
                  id="followUpDate"
                  {...form.register("followUpDate")}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            )}
          </>
        )}

        {type === "cancel" && (
          <div className="space-y-4">
            <label htmlFor="cancellationReason" className="block text-sm font-medium text-gray-700">
              Reason for Cancellation
            </label>
            <textarea
              id="cancellationReason"
              {...form.register("cancellationReason", { required: "Cancellation reason is required" })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Urgent meeting came up"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full rounded-md py-2 text-white ${isLoading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} transition`}
        >
          {isLoading ? "Processing..." : buttonLabel}
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
