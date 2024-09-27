"use client";
import { AppointmentForm } from "../../../components";

const Appointment = () => {
    return (
        <div className="flex h-screen">
            <section className="flex flex-col justify-center items-center w-full max-w-lg mx-auto px-4">
                <div className="flex flex-col items-center justify-between w-full max-w-3xl">
                    <div className="w-full bg-white shadow-md rounded-lg p-6">
                        <AppointmentForm patientId={1} userId={1} type="create" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Appointment;
