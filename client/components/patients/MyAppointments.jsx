"use client";

import React, { useState } from "react";
import { FaCalendarAlt, FaRegEdit, FaTrash, FaStar } from "react-icons/fa";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const MyAppointments = () => {
  // Sample appointment data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: "2024-09-30",
      time: "10:00 AM",
      doctor: "Dr. John Doe",
      department: "Cardiology",
      status: "Upcoming",
      feedbackGiven: false,
      rating: 0,
      review: "",
    },
    {
      id: 2,
      date: "2024-10-05",
      time: "2:00 PM",
      doctor: "Dr. Jane Smith",
      department: "Dermatology",
      status: "Upcoming",
      feedbackGiven: false,
      rating: 0,
      review: "",
    },
    {
      id: 3,
      date: "2024-08-20",
      time: "1:00 PM",
      doctor: "Dr. John Doe",
      department: "Cardiology",
      status: "Completed",
      feedbackGiven: false,
      rating: 0,
      review: "",
    },
  ]);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

  // Handler functions
  const handleBookAppointment = () => {
    alert("Book Appointment functionality not implemented.");
  };

  const handleRescheduleAppointment = (id) => {
    alert(`Reschedule Appointment ID: ${id} functionality not implemented.`);
  };

  const handleCancelAppointment = (id) => {
    setAppointments(appointments.filter((appt) => appt.id !== id));
    alert(`Appointment ID: ${id} has been canceled.`);
  };

  const handleOpenFeedback = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleFeedbackSubmit = (id, rating, review) => {
    setAppointments(
      appointments.map((appt) => {
        if (appt.id === id) {
          return { ...appt, feedbackGiven: true, rating, review };
        }
        return appt;
      })
    );
    setSelectedAppointment(null);
  };

  // Pagination logic
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const filteredAppointments = appointments.filter((appt) => {
    if (filter === "All") return true;
    return appt.status === filter;
  });
  const currentAppointments = filteredAppointments
    .filter((appt) =>
      appt.doctor.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstAppointment, indexOfLastAppointment);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        My Appointments Dashboard
      </h2>

      {/* Appointment Booking Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Book a New Appointment
          </h3>
          <button
            onClick={handleBookAppointment}
            className="bg-primary text-white py-3 px-6 rounded-md shadow-lg hover:bg-secondary transition duration-300"
          >
            Book Appointment
          </button>
        </div>
      </div>

      {/* Filter & Search Section */}
      <div className="flex justify-between items-center bg-white shadow-lg rounded-lg p-6 mb-8">
        <div>
          <label className="text-gray-700 font-medium">Filter by Status:</label>
          <select
            className="border p-2 ml-2"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search by Doctor"
            className="border p-2 w-64 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Appointment List Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          My Appointments
        </h3>
        <ul className="space-y-4">
          {currentAppointments.length > 0 ? (
            currentAppointments.map((appt) => (
              <li
                key={appt.id}
                className="flex justify-between items-center p-4 border-b"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {`${appt.date} at ${appt.time}`}
                  </p>
                  <p className="text-gray-600">{`With: ${appt.doctor}, ${appt.department}`}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleRescheduleAppointment(appt.id)}
                    className="text-blue-500 hover:text-blue-700 transition duration-300"
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    onClick={() => handleCancelAppointment(appt.id)}
                    className="text-red-500 hover:text-red-700 transition duration-300"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No appointments found.</li>
          )}
        </ul>
      </div>

      {/* Pagination */}
      {filteredAppointments.length > appointmentsPerPage && (
        <div className="flex justify-center space-x-4 my-6">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-500 hover:text-blue-700"
              } transition duration-300`}
          >
            <BsChevronLeft size={20} />
          </button>
          <span className="text-gray-600">
            Page {currentPage} of{" "}
            {Math.ceil(filteredAppointments.length / appointmentsPerPage)}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage ===
              Math.ceil(filteredAppointments.length / appointmentsPerPage)
            }
            className={`${currentPage ===
                Math.ceil(filteredAppointments.length / appointmentsPerPage)
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-500 hover:text-blue-700"
              } transition duration-300`}
          >
            <BsChevronRight size={20} />
          </button>
        </div>
      )}

      {/* Feedback Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Provide Feedback for {selectedAppointment.doctor}
            </h3>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Rating:</label>
              <select
                className="border p-2 w-full"
                onChange={(e) =>
                  setSelectedAppointment({
                    ...selectedAppointment,
                    rating: e.target.value,
                  })
                }
                value={selectedAppointment.rating}
              >
                <option value={0}>Select Rating</option>
                {[1, 2, 3, 4, 5].map((rate) => (
                  <option key={rate} value={rate}>
                    {rate} Stars
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Review:</label>
              <textarea
                className="border p-2 w-full"
                rows="3"
                onChange={(e) =>
                  setSelectedAppointment({
                    ...selectedAppointment,
                    review: e.target.value,
                  })
                }
                value={selectedAppointment.review}
              ></textarea>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setSelectedAppointment(null)}
                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md shadow hover:bg-gray-300 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  handleFeedbackSubmit(
                    selectedAppointment.id,
                    selectedAppointment.rating,
                    selectedAppointment.review
                  )
                }
                className="bg-primary text-white py-2 px-4 rounded-md shadow hover:bg-secondary transition duration-300"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
