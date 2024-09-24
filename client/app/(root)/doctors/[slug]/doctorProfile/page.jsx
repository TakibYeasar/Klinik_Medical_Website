// Mark the component as a Client Component
"use client";

import { useState, useEffect } from 'react';
import { DocLeftSidebar, MyBookings } from '../../../../../components';
import DoctorDetails from '../page';

const DoctorProfile = ({ params }) => {
    const { slug } = params; // Accessing slug from params
    const [docInfo, setDocInfo] = useState(null);
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

    // Dummy doctor data
    const dummyDocInfo = {
        id: slug,
        name: "Dr. John Doe",
        specialty: "Cardiologist",
        experience: 10,
        biography: "Dr. John Doe is an experienced cardiologist with a passion for heart health and wellness.",
        // Add more fields as needed
    };

    // Fetch doctor info (commenting out the API call)
    useEffect(() => {
        const fetchDocInfo = async () => {
            // Commented out the API call
            // if (slug) {
            //     const res = await fetch(`http://your-django-api-url.com/doctors/${slug}/`);
            //     const initialDocInfo = await res.json();
            //     setDocInfo(initialDocInfo);
            // }

            // Using dummy data instead
            setDocInfo(dummyDocInfo);
        };

        fetchDocInfo();
    }, [slug]);

    useEffect(() => {
        if (docInfo) {
            getAvailableSlot();
        }
    }, [docInfo]);

    return docInfo && (
        <div className="container mx-auto p-4 flex">
            <DocLeftSidebar />
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

// Export the default component
export default DoctorProfile;
