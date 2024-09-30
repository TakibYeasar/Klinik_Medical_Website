"use client";

import React, { useState } from 'react';

// Dummy feedback data
const dummyFeedbacks = [
    {
        id: 1,
        patientName: 'John Doe',
        feedback: 'The doctor was very attentive and answered all my questions. Highly recommended!',
        date: '2024-09-25',
        rating: 5
    },
    {
        id: 2,
        patientName: 'Jane Smith',
        feedback: 'Great experience, but the waiting time was a bit long.',
        date: '2024-09-24',
        rating: 4
    },
    {
        id: 3,
        patientName: 'Alice Johnson',
        feedback: 'The staff was friendly, and the facility was clean.',
        date: '2024-09-23',
        rating: 4.5
    },
];

const FeedbackManagement = () => {
    const [feedbacks, setFeedbacks] = useState(dummyFeedbacks);
    const [searchTerm, setSearchTerm] = useState('');
    const [ratingFilter, setRatingFilter] = useState('All');
    const [newFeedback, setNewFeedback] = useState({ patientName: '', feedback: '', rating: '' });

    // Handle adding new feedback
    const handleAddFeedback = () => {
        if (newFeedback.patientName && newFeedback.feedback && newFeedback.rating) {
            const newFeedbackEntry = {
                id: feedbacks.length + 1,
                patientName: newFeedback.patientName,
                feedback: newFeedback.feedback,
                date: new Date().toISOString().split('T')[0], // Use current date
                rating: parseFloat(newFeedback.rating)
            };
            setFeedbacks([...feedbacks, newFeedbackEntry]);
            setNewFeedback({ patientName: '', feedback: '', rating: '' });
        } else {
            alert('Please fill out all fields.');
        }
    };

    // Filter feedback based on search term and rating filter
    const filteredFeedbacks = feedbacks.filter(feedback => {
        return (
            feedback.patientName.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (ratingFilter === 'All' || feedback.rating === parseFloat(ratingFilter))
        );
    });

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Patient Feedback</h2>

            {/* Search and Filter Section */}
            <div className="flex justify-between items-center mb-6">
                {/* Search by Patient Name */}
                <input
                    type="text"
                    placeholder="Search by Patient Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border rounded px-4 py-2 text-gray-700 w-1/3"
                />

                {/* Filter by Rating */}
                <select
                    value={ratingFilter}
                    onChange={(e) => setRatingFilter(e.target.value)}
                    className="border rounded px-4 py-2 text-gray-700 w-1/3"
                >
                    <option value="All">All Ratings</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                </select>
            </div>

            {/* Feedback List */}
            <div className="space-y-6">
                {filteredFeedbacks.length > 0 ? (
                    filteredFeedbacks.map((feedback) => (
                        <div key={feedback.id} className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">{feedback.patientName}</h3>
                                    <p className="text-sm text-gray-500">{feedback.date}</p>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-lg font-medium text-yellow-500">{feedback.rating}</p>
                                    <span className="text-yellow-500 ml-1">★</span>
                                </div>
                            </div>
                            <p className="text-gray-700">{feedback.feedback}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No feedback available.</p>
                )}
            </div>

            {/* Add New Feedback Section */}
            <div className="mt-8 bg-gray-50 p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Feedback</h3>
                <input
                    type="text"
                    placeholder="Patient Name"
                    value={newFeedback.patientName}
                    onChange={(e) => setNewFeedback({ ...newFeedback, patientName: e.target.value })}
                    className="border rounded px-4 py-2 text-gray-700 w-full mb-4"
                />
                <textarea
                    placeholder="Enter feedback"
                    value={newFeedback.feedback}
                    onChange={(e) => setNewFeedback({ ...newFeedback, feedback: e.target.value })}
                    className="border rounded px-4 py-2 text-gray-700 w-full mb-4"
                    rows="3"
                ></textarea>
                <input
                    type="number"
                    placeholder="Rating (1-5)"
                    value={newFeedback.rating}
                    onChange={(e) => setNewFeedback({ ...newFeedback, rating: e.target.value })}
                    className="border rounded px-4 py-2 text-gray-700 w-full mb-4"
                    min="1"
                    max="5"
                />
                <button
                    onClick={handleAddFeedback}
                    className="bg-primary text-white font-medium px-6 py-2 rounded-full hover:bg-primary-dark transition duration-200"
                >
                    Add Feedback
                </button>
            </div>
        </div>
    );
};

export default FeedbackManagement;
