"use client";

import React, { useState } from 'react';
import { FaChartLine, FaPlusCircle, FaWeight, FaHeartbeat } from 'react-icons/fa';

const HealthTracking = () => {
    // Sample health metrics data
    const [healthMetrics, setHealthMetrics] = useState([
        {
            id: 1,
            date: '2024-09-25',
            weight: '70kg',
            bloodPressure: '120/80',
            symptoms: 'Feeling good',
        },
        {
            id: 2,
            date: '2024-09-15',
            weight: '71kg',
            bloodPressure: '122/82',
            symptoms: 'Mild headache',
        },
    ]);

    // Sample health goals data
    const [goals, setGoals] = useState([
        {
            id: 1,
            goal: 'Lose 5kg in 2 months',
            progress: '20%',
        },
        {
            id: 2,
            goal: 'Maintain blood pressure below 130/85',
            progress: '50%',
        },
    ]);

    // Handler to add a new health metric
    const handleAddMetric = () => {
        alert('Add health metric functionality not implemented.');
    };

    // Handler to add a new health goal
    const handleAddGoal = () => {
        alert('Add health goal functionality not implemented.');
    };

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Health Tracking</h2>

            {/* Health Metrics Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Health Metrics</h3>
                <ul className="space-y-4">
                    {healthMetrics.map((metric) => (
                        <li key={metric.id} className="flex justify-between items-center p-4 border-b">
                            <div>
                                <p className="font-medium text-gray-800">{metric.date}</p>
                                <p className="text-gray-600">
                                    <FaWeight className="inline-block mr-2" /> Weight: {metric.weight}
                                </p>
                                <p className="text-gray-600">
                                    <FaHeartbeat className="inline-block mr-2" /> Blood Pressure: {metric.bloodPressure}
                                </p>
                                <p className="text-gray-500">Symptoms: {metric.symptoms}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <button
                    onClick={handleAddMetric}
                    className="mt-4 bg-primary text-white py-3 px-6 rounded-md shadow-lg hover:bg-secondary transition duration-300"
                >
                    <FaPlusCircle className="inline-block mr-2" /> Add New Metric
                </button>
            </div>

            {/* Health Goals Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Health Goals</h3>
                <ul className="space-y-4">
                    {goals.map((goal) => (
                        <li key={goal.id} className="p-4 border-b">
                            <div>
                                <p className="font-medium text-gray-800">{goal.goal}</p>
                                <p className="text-gray-600">Progress: {goal.progress}</p>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                    <div
                                        className="bg-green-500 h-2.5 rounded-full"
                                        style={{ width: goal.progress }}
                                    ></div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <button
                    onClick={handleAddGoal}
                    className="mt-4 bg-primary text-white py-3 px-6 rounded-md shadow-lg hover:bg-secondary transition duration-300"
                >
                    <FaPlusCircle className="inline-block mr-2" /> Add New Goal
                </button>
            </div>

            {/* Progress Chart Section */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Progress Overview</h3>
                <p className="text-gray-700">
                    Track your health goals and visualize progress over time.
                </p>
                <button
                    onClick={() => alert('View progress chart functionality not implemented.')}
                    className="mt-4 bg-primary text-white py-3 px-6 rounded-md shadow-lg hover:bg-secondary transition duration-300"
                >
                    <FaChartLine className="inline-block mr-2" /> View Progress Chart
                </button>
            </div>
        </div>
    );
};

export default HealthTracking;
