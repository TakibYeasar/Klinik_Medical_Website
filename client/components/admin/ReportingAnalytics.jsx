"use client";

import React, { useState } from 'react';

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
};

const ReportingAnalytics = () => {
    const [selectedMetric, setSelectedMetric] = useState('patientDemographics');

    const renderMetricData = () => {
        switch (selectedMetric) {
            case 'patientDemographics':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h4 className="text-xl font-semibold">Patient Gender Distribution</h4>
                            <p>Male: {dummyData.patientDemographics.male}%</p>
                            <p>Female: {dummyData.patientDemographics.female}%</p>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h4 className="text-xl font-semibold">Patient Age Groups</h4>
                            {Object.entries(dummyData.patientDemographics.ageGroups).map(([ageGroup, percentage]) => (
                                <p key={ageGroup}>{ageGroup}: {percentage}%</p>
                            ))}
                        </div>
                    </div>
                );

            case 'treatmentOutcomes':
                return (
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h4 className="text-xl font-semibold">Treatment Outcomes</h4>
                        <p>Successful Treatments: {dummyData.treatmentOutcomes.successful}</p>
                        <p>Unsuccessful Treatments: {dummyData.treatmentOutcomes.unsuccessful}</p>
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
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h3 className="text-2xl font-semibold mb-4">Key Performance Indicators (KPIs)</h3>
                <p>Total Patient Visits: {dummyData.totalVisits}</p>
                <p>No-Show Rate: {dummyData.noShowRate}%</p>
                <p>Total Revenue: ${dummyData.totalRevenue}</p>
            </div>

            {/* Metric Selection */}
            <div className="flex justify-center mb-6">
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
            <div>
                {renderMetricData()}
            </div>
        </div>
    );
};

export default ReportingAnalytics;
