"use client";

import React, { useState } from 'react';

// Dummy data for invoices and payments
const dummyInvoices = [
    { id: 1, patientName: 'John Doe', amount: 150, dateIssued: '2024-09-15', status: 'Paid' },
    { id: 2, patientName: 'Jane Smith', amount: 200, dateIssued: '2024-09-20', status: 'Pending' },
    { id: 3, patientName: 'Michael Johnson', amount: 300, dateIssued: '2024-09-25', status: 'Claimed' },
];

const FinanceManagement = () => {
    const [invoices, setInvoices] = useState(dummyInvoices);
    const [newInvoice, setNewInvoice] = useState({ patientName: '', amount: '', dateIssued: '', status: 'Pending' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewInvoice((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddInvoice = () => {
        setInvoices([...invoices, { ...newInvoice, id: invoices.length + 1 }]);
        setNewInvoice({ patientName: '', amount: '', dateIssued: '', status: 'Pending' });
    };

    const handlePaymentStatusChange = (id) => {
        setInvoices(invoices.map((invoice) =>
            invoice.id === id ? { ...invoice, status: invoice.status === 'Paid' ? 'Pending' : 'Paid' } : invoice
        ));
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-3xl font-bold text-center mb-6">Billing and Finance Management</h2>

            {/* Invoices Section */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h3 className="text-2xl font-semibold mb-4">Invoices</h3>
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left">Patient</th>
                            <th className="px-4 py-2 text-left">Amount ($)</th>
                            <th className="px-4 py-2 text-left">Date Issued</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice) => (
                            <tr key={invoice.id} className="border-b">
                                <td className="px-4 py-2">{invoice.patientName}</td>
                                <td className="px-4 py-2">{invoice.amount}</td>
                                <td className="px-4 py-2">{invoice.dateIssued}</td>
                                <td className="px-4 py-2">
                                    <span className={`inline-block px-2 py-1 text-sm rounded ${invoice.status === 'Paid' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                        {invoice.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handlePaymentStatusChange(invoice.id)}
                                        className="text-sm bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
                                    >
                                        {invoice.status === 'Paid' ? 'Mark as Pending' : 'Mark as Paid'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add New Invoice Section */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-4">Add New Invoice</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="patientName"
                        value={newInvoice.patientName}
                        onChange={handleInputChange}
                        placeholder="Patient Name"
                        className="border rounded p-2"
                    />
                    <input
                        type="number"
                        name="amount"
                        value={newInvoice.amount}
                        onChange={handleInputChange}
                        placeholder="Amount ($)"
                        className="border rounded p-2"
                    />
                    <input
                        type="date"
                        name="dateIssued"
                        value={newInvoice.dateIssued}
                        onChange={handleInputChange}
                        className="border rounded p-2"
                    />
                </div>
                <button
                    onClick={handleAddInvoice}
                    className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                >
                    Add Invoice
                </button>
            </div>
        </div>
    );
};

export default FinanceManagement;
