import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex justify-between items-center my-4">
            <button
                className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            <span>
                Page {currentPage} of {totalPages}
            </span>

            <button
                className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
