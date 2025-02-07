"use client";

import React, { useState } from 'react';
import { FaCreditCard, FaShieldAlt, FaDownload, FaSearch, FaFilter, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const PaymentHistory = () => {
    // Sample payment history data
    const [payments, setPayments] = useState([
        {
            id: 1,
            date: '2024-09-20',
            amount: '$150',
            status: 'Paid',
            invoice: 'INV-12345',
            insuranceClaim: 'Processed',
            details: 'Consultation with Dr. Smith, Prescription',
        },
        {
            id: 2,
            date: '2024-08-10',
            amount: '$200',
            status: 'Paid',
            invoice: 'INV-12344',
            insuranceClaim: 'Pending',
            details: 'MRI Scan, Blood Tests',
        },
        {
            id: 3,
            date: '2024-07-15',
            amount: '$250',
            status: 'Pending',
            invoice: 'INV-12343',
            insuranceClaim: 'Not Filed',
            details: 'Surgery Fees, Post-operation Consultation',
        },
    ]);

    // Sample filter options
    const [filter, setFilter] = useState('all');

    // Filter payment history
    const filteredPayments = payments.filter(payment =>
        filter === 'all' || payment.status.toLowerCase() === filter
    );

    // Handler to make a payment (placeholder functionality)
    const handleMakePayment = (id) => {
        alert(`Payment for Invoice ID: ${id} functionality not implemented.`);
    };

    // Handler to manage insurance claims (placeholder functionality)
    const handleManageClaim = (id) => {
        alert(`Manage insurance claim for Invoice ID: ${id} functionality not implemented.`);
    };

    // Handler to download invoice (placeholder functionality)
    const handleDownloadInvoice = (invoice) => {
        alert(`Download Invoice ${invoice} functionality not implemented.`);
    };

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Payment History</h2>

            {/* Filter and Search Section */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-4">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-primary text-white' : 'bg-gray-200'} hover:bg-secondary transition duration-300`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('paid')}
                        className={`px-4 py-2 rounded-md ${filter === 'paid' ? 'bg-primary text-white' : 'bg-gray-200'} hover:bg-secondary transition duration-300`}
                    >
                        Paid
                    </button>
                    <button
                        onClick={() => setFilter('pending')}
                        className={`px-4 py-2 rounded-md ${filter === 'pending' ? 'bg-primary text-white' : 'bg-gray-200'} hover:bg-secondary transition duration-300`}
                    >
                        Pending
                    </button>
                </div>
                <div className="flex items-center bg-gray-200 rounded-md px-3 py-2 space-x-2">
                    <FaSearch className="text-gray-600" />
                    <input
                        type="text"
                        placeholder="Search invoices"
                        className="bg-gray-200 outline-none text-gray-700"
                    />
                </div>
            </div>

            {/* Payment History Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Invoices & Payment History</h3>
                <ul className="space-y-4">
                    {filteredPayments.map((payment) => (
                        <li key={payment.id} className="p-4 border-b">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-medium text-gray-800">
                                        Invoice: {payment.invoice} - {payment.date}
                                    </p>
                                    <p className="text-gray-600">Amount: {payment.amount}</p>
                                    <p className={`text-sm ${payment.status === 'Paid' ? 'text-green-500' : 'text-red-500'}`}>
                                        {payment.status === 'Paid' ? (
                                            <FaCheckCircle className="inline-block mr-1" />
                                        ) : (
                                            <FaExclamationCircle className="inline-block mr-1" />
                                        )}
                                        {payment.status}
                                    </p>
                                    <p className="text-gray-500">Insurance Claim: {payment.insuranceClaim}</p>
                                    <p className="text-gray-500">Details: {payment.details}</p>
                                </div>
                                <div className="flex space-x-2">
                                    {payment.status === 'Pending' && (
                                        <button
                                            onClick={() => handleMakePayment(payment.id)}
                                            className="bg-primary text-white py-2 px-4 rounded-md shadow-lg hover:bg-secondary transition duration-300"
                                        >
                                            <FaCreditCard className="inline-block mr-2" /> Pay Now
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleManageClaim(payment.id)}
                                        className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-600 transition duration-300"
                                    >
                                        <FaShieldAlt className="inline-block mr-2" /> Manage Claim
                                    </button>
                                    <button
                                        onClick={() => handleDownloadInvoice(payment.invoice)}
                                        className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md shadow-lg hover:bg-gray-300 transition duration-300"
                                    >
                                        <FaDownload className="inline-block mr-2" /> Download Invoice
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Make a Payment Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Make a Payment</h3>
                <button
                    onClick={() => alert('Make a payment functionality not implemented.')}
                    className="bg-primary text-white py-3 px-6 rounded-md shadow-lg hover:bg-secondary transition duration-300"
                >
                    <FaCreditCard className="inline-block mr-2" /> Make Payment
                </button>
            </div>

            {/* Manage Insurance Claims Section */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Manage Insurance Claims</h3>
                <p className="text-gray-700 mb-4">
                    Review and manage your insurance claims related to medical services.
                </p>
                <button
                    onClick={() => alert('Manage insurance claims functionality not implemented.')}
                    className="bg-blue-500 text-white py-3 px-6 rounded-md shadow-lg hover:bg-blue-600 transition duration-300"
                >
                    <FaShieldAlt className="inline-block mr-2" /> Manage Claims
                </button>
            </div>
        </div>
    );
};

export default PaymentHistory;
