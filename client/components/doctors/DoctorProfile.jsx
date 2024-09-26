const DoctorProfile = ({ docInfo }) => (
    <div id="profile" className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h3 className="text-lg font-semibold">{docInfo?.name}</h3>
        <p className="text-gray-600">{docInfo?.specialty}</p>
        <p className="mt-2">{docInfo?.biography}</p>
    </div>
);

export default DoctorProfile;
