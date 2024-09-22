"use client";

import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Doctors } from "../../../constants";
import { formatDateTime } from "../../../lib/utils";
import { AppointmentModal, StatusBadge } from "../../../components";

const Columns = () => {
  const columns = [
    {
      header: "#",
      cell: ({ row }) => {
        return <p className="text-sm font-medium">{row.index + 1}</p>;
      },
    },
    {
      accessorKey: "patient",
      header: "Patient",
      cell: ({ row }) => {
        const appointment = row.original;
        return <p className="text-sm font-medium">{appointment.patient.name}</p>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const appointment = row.original;
        return (
          <div className="min-w-[115px]">
            <StatusBadge status={appointment.status} />
          </div>
        );
      },
    },
    {
      accessorKey: "schedule",
      header: "Appointment",
      cell: ({ row }) => {
        const appointment = row.original;
        return (
          <p className="text-sm font-normal min-w-[100px]">
            {formatDateTime(appointment.schedule).dateTime}
          </p>
        );
      },
    },
    {
      accessorKey: "primaryPhysician",
      header: "Doctor",
      cell: ({ row }) => {
        const appointment = row.original;

        const doctor = Doctors.find(
          (doctor) => doctor.name === appointment.primaryPhysician
        );

        return (
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image || "/default-doctor-image.png"}
              alt="doctor"
              width={100}
              height={100}
              className="rounded-full"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="pl-4">Actions</div>,
      cell: ({ row }) => {
        const appointment = row.original;
        const [showScheduleModal, setShowScheduleModal] = useState(false);
        const [showCancelModal, setShowCancelModal] = useState(false);

        const handleSchedule = async () => {
          try {
            await axios.post("/api/appointments/schedule", {
              patientId: appointment.patient.$id,
              userId: appointment.userId,
              appointmentId: appointment.id,
            });
            setShowScheduleModal(false);
          } catch (error) {
            console.error(error);
          }
        };

        const handleCancel = async () => {
          try {
            await axios.post("/api/appointments/cancel", {
              patientId: appointment.patient.$id,
              userId: appointment.userId,
              appointmentId: appointment.id,
            });
            setShowCancelModal(false);
          } catch (error) {
            console.error(error);
          }
        };

        return (
          <div className="flex gap-2">
            <button
              onClick={() => setShowScheduleModal(true)}
              className="text-blue-500 hover:underline"
            >
              Schedule
            </button>
            <button
              onClick={() => setShowCancelModal(true)}
              className="text-red-500 hover:underline"
            >
              Cancel
            </button>

            {showScheduleModal && (
              <AppointmentModal
                onConfirm={handleSchedule}
                onClose={() => setShowScheduleModal(false)}
                title="Schedule Appointment"
                description="Please confirm the following details to schedule."
              />
            )}

            {showCancelModal && (
              <AppointmentModal
                onConfirm={handleCancel}
                onClose={() => setShowCancelModal(false)}
                title="Cancel Appointment"
                description="Are you sure you want to cancel your appointment?"
              />
            )}
          </div>
        );
      },
    },
  ];

  return <div>Columns</div>;
};

export default Columns;
