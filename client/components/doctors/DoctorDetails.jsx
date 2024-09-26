const DoctorDetails = ({ docInfo }) => (
    <div id="details" className='flex flex-col sm:flex-row gap-6 mb-8'>
        <div className='flex-shrink-0'>
            <img className='bg-primary w-full sm:w-72 rounded-lg shadow-md' src="/assets/images/doctor.jpg" alt={docInfo.name} />
        </div>
        <div className='flex-1 border border-gray-300 rounded-lg p-6 bg-white shadow-md'>
            <p className='flex items-center gap-2 text-2xl font-semibold text-gray-900'>
                {docInfo.name}
                <img className='w-5' src='/assets/icons/verified-icon.png' alt="verified" />
            </p>
            <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
                <p>{docInfo.degree} - {docInfo.specialty}</p>
                <span className='py-0.5 px-2 border border-gray-400 text-sm rounded-full'>{docInfo.experience} years</span>
            </div>
            <div className='mt-4'>
                <p className='flex items-center gap-1 text-sm text-gray-900 font-medium'>
                    About <img src='/assets/icons/info-icon.png' alt="info" />
                </p>
                <p className='text-sm text-gray-500 mt-1'>{docInfo.biography}</p>
            </div>
            <p className='text-gray-500 font-medium mt-4'>
                Appointment Fee: <span className='font-extrabold text-lg'>${docInfo.fees}</span>
            </p>
        </div>
    </div>
);

export default DoctorDetails;
