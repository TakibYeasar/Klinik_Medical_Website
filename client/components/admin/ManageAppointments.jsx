"use client"

import React from 'react';
import { StatCard, DataTable, columns } from '../../components'; // Assume StatCard and DataTable are pre-built components

const ManageAppointments = ({ appointments }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Manage Appointments</h2>
            <section className="flex space-x-4 mb-4">
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

            <h3 className="text-xl font-bold mb-3">Appointment Details</h3>
            <DataTable columns={columns} data={appointments.documents} />
        </div>
    );
};

export default ManageAppointments;