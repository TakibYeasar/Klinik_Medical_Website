"use client";

import { useState } from "react";
import axios from "axios";
import { AppointmentForm } from "../../components";
import "react-datepicker/dist/react-datepicker.css";

const AppointmentModal = ({
  patientId,
  userId,
  appointment,
  type,
  title,
  description,
}) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      if (type === "schedule") {
        await axios.post("/api/appointments/schedule", {
          patientId,
          userId,
          ...formData,
        });
      } else if (type === "cancel") {
        await axios.post("/api/appointments/cancel", {
          patientId,
          userId,
          ...formData,
        });
      }
      setOpen(false);
    } catch (error) {
      console.error("Error submitting appointment:", error);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`capitalize p-2 rounded ${type === "schedule" ? "text-green-500" : "text-red-500"} border border-transparent hover:border-gray-300`}
      >
        {type}
      </button>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-4">
            <header className="mb-4">
              <h2 className="text-lg font-semibold capitalize">{title}</h2>
              <p className="text-gray-600">{description}</p>
            </header>
            <AppointmentForm
              userId={userId}
              patientId={patientId}
              type={type}
              appointment={appointment}
              onSubmit={handleSubmit}
            />
            <button
              onClick={() => setOpen(false)}
              className="mt-4 p-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black opacity-50"
          />
        </div>
      )}
    </>
  );
};

export default AppointmentModal;