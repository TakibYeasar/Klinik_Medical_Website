import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DoctorDetails from './DoctorDetails';
import MyBookings from '../../../../../components';
import Sidebar from './Sidebar'; // Importing the Sidebar component

const DoctorProfile = ({ initialDocInfo }) => {
    const router = useRouter();
    const { docId } = router.query;
    const [docInfo, setDocInfo] = useState(initialDocInfo);
    const [docSlot, setDocSlot] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');

    const getAvailableSlot = async () => {
        setDocSlot([]);
        let today = new Date();

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);
            let endTime = new Date(currentDate);
            endTime.setHours(21, 0, 0, 0);

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }

            let timeSlots = [];
            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                timeSlots.push({
                    datetime: new Date(currentDate),
                    time: formattedTime,
                });
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }
            setDocSlot(prev => [...prev, timeSlots]);
        }
    };

    useEffect(() => {
        getAvailableSlot();
    }, [docInfo]);

    return docInfo && (
        <div className="container mx-auto p-4 flex">
            <Sidebar /> {/* Sidebar component */}
            <div className="flex-1 ml-4">
                <DoctorDetails docInfo={docInfo} />
                <MyBookings
                    docSlot={docSlot}
                    slotIndex={slotIndex}
                    setSlotIndex={setSlotIndex}
                    slotTime={slotTime}
                    setSlotTime={setSlotTime}
                />
            </div>
        </div>
    );
};

export async function getServerSideProps({ params }) {
    const { docId } = params;
    const res = await fetch(`http://your-django-api-url.com/doctors/${docId}/`);
    const initialDocInfo = await res.json();

    return { props: { initialDocInfo } };
}

export default DoctorProfile;
