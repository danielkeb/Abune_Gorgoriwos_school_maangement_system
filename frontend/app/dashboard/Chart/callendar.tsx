import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const CalendarComponent: React.FC = () => {
  return (
    // <div className="min-h-screen flex flex-col w-full">
    //   <FullCalendar
    //     plugins={[dayGridPlugin]}
    //     initialView="dayGridMonth"
    //     events={[
    //       // Add your events here
    //       { title: 'Final Exam', date: '2024-02-15', color: 'red' }, // Set color for Event 1
    //       { title: 'Easter Holiday', date: '2024-02-16', color: 'blue' }, // Set color for Event 2
    //     ]}
      
    //   />
    // </div>
    <div className='min-h-screen flex flex-col w-full'>
      <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin,interactionPlugin]}
      initialView={"dayGridMonth"}
      events={[
              // Add your events here
              { title: 'Final Exam', date: '2024-02-15', color: 'red' }, // Set color for Event 1
              { title: 'Easter Holiday', date: '2024-02-16', color: 'blue' }, // Set color for Event 2
            ]}
      headerToolbar={{
        start:"",
        center:"title",
        end:"prev,next",

      }}
      height={"90vh"}
      //width={"80vh"}
      //titleFormat={"medium"}
      //titleFormat={"small"}
      
      />
    </div>
  );
};

export default CalendarComponent;
