"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { StatCard, columns, DataTable } from "../../components";

// Fetch appointments from Django backend API
const fetchAppointments = async () => {
  const response = await fetch("/api/appointments/recent");
  const data = await response.json();
  return data;
};

const AdminPage = () => {
  const [appointments, setAppointments] = useState({
    scheduledCount: 0,
    pendingCount: 0,
    cancelledCount: 0,
    documents: [],
  });

  useEffect(() => {
    // Fetch recent appointment list on component mount
    const getAppointments = async () => {
      const data = await fetchAppointments();
      setAppointments(data);
    };

    getAppointments();
  }, []);

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      {/* Header */}
      <header className="flex justify-between items-center py-6">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>

        <p className="text-xl font-semibold">Admin Dashboard</p>
      </header>

      {/* Main Content */}
      <main className="flex flex-col space-y-14">
        {/* Welcome Section */}
        <section className="space-y-4">
          <h1 className="text-2xl font-bold">Welcome 👋</h1>
          <p className="text-gray-600">
            Start the day with managing new appointments
          </p>
        </section>

        {/* Stats Section */}
        <section className="flex space-x-4">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Scheduled appointments"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending appointments"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Cancelled appointments"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>

        {/* Table Section */}
        <section className="w-full">
          <DataTable columns={columns} data={appointments.documents} />
        </section>
      </main>
    </div>
  );
};

export default AdminPage;
