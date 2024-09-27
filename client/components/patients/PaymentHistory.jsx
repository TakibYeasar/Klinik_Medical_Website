"use client";

import React, { useState } from 'react';
import { FaFileInvoiceDollar, FaCreditCard, FaShieldAlt, FaRegFileAlt } from 'react-icons/fa';

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
        },
        {
            id: 2,
            date: '2024-08-10',
            amount: '$200',
            status: 'Paid',
            invoice: 'INV-12344',
            insuranceClaim: 'Pending',
        },
        {
            id: 3,
            date: '2024-07-15',
            amount: '$250',
            status: 'Pending',
            invoice: 'INV-12343',
            insuranceClaim: 'Not Filed',
        },
    ]);

    // Handler to make a payment (placeholder functionality)
    const handleMakePayment = (id) => {
        alert(`Payment for Invoice ID: ${id} functionality not implemented.`);
    };

    // Handler to manage insurance claims (placeholder functionality)
    const handleManageClaim = (id) => {
        alert(`Manage insurance claim for Invoice ID: ${id} functionality not implemented.`);
    };

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payment History</h2>

            {/* Payment History Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Invoices & Payment History</h3>
                <ul className="space-y-4">
                    {payments.map((payment) => (
                        <li key={payment.id} className="flex justify-between items-center p-4 border-b">
                            <div>
                                <p className="font-medium text-gray-800">
                                    Invoice: {payment.invoice} - {payment.date}
                                </p>
                                <p className="text-gray-600">Amount: {payment.amount}</p>
                                <p className="text-gray-500">Status: {payment.status}</p>
                                <p className="text-gray-500">
                                    Insurance Claim: {payment.insuranceClaim}
                                </p>
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
