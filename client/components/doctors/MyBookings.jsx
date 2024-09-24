import React from 'react';

const daysOfWeek = ["SAT", "SUN", "MON", "TUE", "WED", "THU", "FRI"];

const MyBookings = ({ docSlot, slotIndex, setSlotIndex, slotTime, setSlotTime }) => {
  return (
      <div id="booking" className='mt-6'>
          <h3 className='font-semibold text-lg text-gray-900'>Booking Slots</h3>
          <div className='flex gap-4 overflow-x-auto mt-4'>
              {docSlot.length > 0 && docSlot.map((item, index) => (
                  <div
                      key={index}
                      onClick={() => setSlotIndex(index)}
                      className={`text-center py-3 px-4 rounded-full cursor-pointer transition-colors duration-200 ${slotIndex === index ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 border border-gray-300'}`}
                  >
                      <p className='font-medium'>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                      <p className='font-light'>{item[0] && item[0].datetime.getDate()}</p>
                  </div>
              ))}
          </div>
          <div className='flex items-center gap-4 overflow-x-auto mt-4'>
              {docSlot.length > 0 && docSlot[slotIndex].map((item, index) => (
                  <p
                      key={index}
                      onClick={() => setSlotTime(item.time)}
                      className={`text-sm font-light flex-shrink-0 px-4 py-2 rounded-full cursor-pointer transition-colors duration-200 ${item.time === slotTime ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400 border border-gray-300'}`}
                  >
                      {item.time}
                  </p>
              ))}
          </div>
          <button className='bg-primary text-white text-sm font-medium px-6 py-3 rounded-full my-6 hover:bg-primary-dark transition duration-200'>
              Book an Appointment
          </button>
      </div>
  )
}

export default MyBookings;


// Fetch doctor info from API
export async function getServerSideProps({ params }) {
    const { docId } = params;
    const res = await fetch(`http://your-django-api-url.com/doctors/${docId}/`);
    const initialDocInfo = await res.json();

    return { props: { initialDocInfo } };
}

