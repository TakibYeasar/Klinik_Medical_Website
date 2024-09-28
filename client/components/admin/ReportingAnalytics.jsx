"use client";

import React, { useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

// Dummy data for reporting
const dummyData = {
    totalVisits: 1500,
    noShowRate: 5, // percentage
    totalRevenue: 300000, // in dollars
    patientDemographics: {
        male: 60,
        female: 40,
        ageGroups: {
            '0-18': 20,
            '19-35': 30,
            '36-50': 25,
            '51+': 25,
        },
    },
    treatmentOutcomes: {
        successful: 1200,
        unsuccessful: 300,
    },
    revenueByMonth: [25000, 27000, 30000, 35000, 40000, 42000, 50000, 48000, 60000, 70000, 75000, 80000],
};

const ReportingAnalytics = () => {
    const [selectedMetric, setSelectedMetric] = useState('patientDemographics');

    const renderMetricData = () => {
        switch (selectedMetric) {
            case 'patientDemographics':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h4 className="text-xl font-semibold mb-4">Patient Gender Distribution</h4>
                            <Pie
                                data={{
                                    labels: ['Male', 'Female'],
                                    datasets: [
                                        {
                                            label: 'Gender Distribution',
                                            data: [dummyData.patientDemographics.male, dummyData.patientDemographics.female],
                                            backgroundColor: ['#4CAF50', '#F44336'],
                                        },
                                    ],
                                }}
                            />
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h4 className="text-xl font-semibold mb-4">Patient Age Groups</h4>
                            <Pie
                                data={{
                                    labels: Object.keys(dummyData.patientDemographics.ageGroups),
                                    datasets: [
                                        {
                                            label: 'Age Groups',
                                            data: Object.values(dummyData.patientDemographics.ageGroups),
                                            backgroundColor: ['#2196F3', '#FFC107', '#FF5722', '#9C27B0'],
                                        },
                                    ],
                                }}
                            />
                        </div>
                    </div>
                );

            case 'treatmentOutcomes':
                return (
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h4 className="text-xl font-semibold mb-4">Treatment Outcomes</h4>
                        <Line
                            data={{
                                labels: ['Successful Treatments', 'Unsuccessful Treatments'],
                                datasets: [
                                    {
                                        label: 'Treatment Outcomes',
                                        data: [dummyData.treatmentOutcomes.successful, dummyData.treatmentOutcomes.unsuccessful],
                                        backgroundColor: ['#4CAF50', '#F44336'],
                                    },
                                ],
                            }}
                        />
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-3xl font-bold text-center mb-6">Reporting and Analytics</h2>

            {/* KPIs Section */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-blue-100 rounded-lg">
                    <h3 className="text-xl font-semibold text-blue-600 mb-2">Total Patient Visits</h3>
                    <p className="text-3xl font-bold">{dummyData.totalVisits}</p>
                </div>
                <div className="p-4 bg-yellow-100 rounded-lg">
                    <h3 className="text-xl font-semibold text-yellow-600 mb-2">No-Show Rate</h3>
                    <p className="text-3xl font-bold">{dummyData.noShowRate}%</p>
                </div>
                <div className="p-4 bg-green-100 rounded-lg">
                    <h3 className="text-xl font-semibold text-green-600 mb-2">Total Revenue</h3>
                    <p className="text-3xl font-bold">${dummyData.totalRevenue.toLocaleString()}</p>
                </div>
            </div>

            {/* Revenue Trend Section */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h3 className="text-2xl font-semibold mb-4">Revenue Trend (Monthly)</h3>
                <Line
                    data={{
                        labels: [
                            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                        ],
                        datasets: [
                            {
                                label: 'Monthly Revenue',
                                data: dummyData.revenueByMonth,
                                backgroundColor: '#4CAF50',
                                borderColor: '#4CAF50',
                                fill: false,
                                tension: 0.1,
                            },
                        ],
                    }}
                />
            </div>

            {/* Metric Selection */}
            <div className="flex justify-center mb-6 space-x-4">
                <button
                    onClick={() => setSelectedMetric('patientDemographics')}
                    className={`px-4 py-2 rounded ${selectedMetric === 'patientDemographics' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                    Patient Demographics
                </button>
                <button
                    onClick={() => setSelectedMetric('treatmentOutcomes')}
                    className={`px-4 py-2 rounded ${selectedMetric === 'treatmentOutcomes' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                    Treatment Outcomes
                </button>
            </div>

            {/* Metric Data Section */}
            <div>{renderMetricData()}</div>
        </div>
    );
};

export default ReportingAnalytics;
