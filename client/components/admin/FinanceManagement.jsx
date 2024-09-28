"use client";

import React, { useState } from 'react';
import { FaSortAlphaDown, FaSortAlphaUp, FaFilter, FaSearch } from 'react-icons/fa';

// Dummy data for invoices
const dummyInvoices = [
    { id: 1, patientName: 'John Doe', amount: 150, dateIssued: '2024-09-15', status: 'Paid' },
    { id: 2, patientName: 'Jane Smith', amount: 200, dateIssued: '2024-09-20', status: 'Pending' },
    { id: 3, patientName: 'Michael Johnson', amount: 300, dateIssued: '2024-09-25', status: 'Claimed' },
];

const FinanceManagement = () => {
    const [invoices, setInvoices] = useState(dummyInvoices);
    const [newInvoice, setNewInvoice] = useState({ patientName: '', amount: '', dateIssued: '', status: 'Pending' });
    const [sortDirection, setSortDirection] = useState('asc'); // For sorting
    const [filterStatus, setFilterStatus] = useState(''); // For filtering
    const [searchQuery, setSearchQuery] = useState(''); // For searching

    // Function to handle input change for new invoices
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewInvoice((prev) => ({ ...prev, [name]: value }));
    };

    // Function to add a new invoice
    const handleAddInvoice = () => {
        setInvoices([...invoices, { ...newInvoice, id: invoices.length + 1 }]);
        setNewInvoice({ patientName: '', amount: '', dateIssued: '', status: 'Pending' });
    };

    // Function to change the payment status
    const handlePaymentStatusChange = (id) => {
        setInvoices(invoices.map((invoice) =>
            invoice.id === id ? { ...invoice, status: invoice.status === 'Paid' ? 'Pending' : 'Paid' } : invoice
        ));
    };

    // Function to sort invoices by patient name
    const handleSort = () => {
        const sortedInvoices = [...invoices].sort((a, b) => {
            if (sortDirection === 'asc') {
                return a.patientName.localeCompare(b.patientName);
            } else {
                return b.patientName.localeCompare(a.patientName);
            }
        });
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        setInvoices(sortedInvoices);
    };

    // Function to filter invoices by status
    const handleFilterChange = (status) => {
        setFilterStatus(status);
    };

    // Function to search invoices by patient name
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter and search logic
    const filteredInvoices = invoices
        .filter(invoice => filterStatus ? invoice.status === filterStatus : true)
        .filter(invoice => invoice.patientName.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-3xl font-bold text-center mb-6">Finance & Billing Dashboard</h2>

            {/* Finance Overview Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">Total Revenue</h3>
                    <p className="text-2xl font-bold">$650</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">Outstanding Payments</h3>
                    <p className="text-2xl font-bold">$200</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">Total Invoices</h3>
                    <p className="text-2xl font-bold">{invoices.length}</p>
                </div>
            </div>

            {/* Search, Filter, and Sort Section */}
            <div className="flex justify-between mb-6">
                <input
                    type="text"
                    placeholder="Search by Patient Name"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="border rounded p-2 w-1/3"
                />
                <div className="flex items-center">
                    <button
                        onClick={handleSort}
                        className="bg-blue-500 text-white py-2 px-4 rounded-l hover:bg-blue-600 transition flex items-center"
                    >
                        {sortDirection === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
                        <span className="ml-2">Sort by Name</span>
                    </button>
                    <select
                        onChange={(e) => handleFilterChange(e.target.value)}
                        value={filterStatus}
                        className="border-l-0 rounded-r p-2 border"
                    >
                        <option value="">All Statuses</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                        <option value="Claimed">Claimed</option>
                    </select>
                </div>
            </div>

            {/* Invoices Table Section */}
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
                        {filteredInvoices.map((invoice) => (
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
