import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the calendar CSS
import './App.css'; // Import your custom CSS
import { format } from 'date-fns'; // Import date-fns for date formatting

function CalendarPage({ setSelectedDate, navigate }) {
    const [date, setDate] = useState(new Date()); // State to track the selected date
    const [viewDate, setViewDate] = useState(new Date()); // State to track the displayed month

    const onChange = (date) => {
        setDate(date);
        setSelectedDate(date);
        navigate(`/track/${format(date, 'yyyy-MM-dd')}`); // Navigate to mood tracker page with the selected date
    };

    const onActiveStartDateChange = ({ activeStartDate }) => {
        setViewDate(activeStartDate); // Update the displayed month when the calendar view changes
    };

    const getCurrentMonth = () => {
        return format(viewDate, 'yyyy-MM'); // Extract the displayed month in YYYY-MM format
    };

    const handleMonthlyInsight = () => {
        const month = getCurrentMonth();
        navigate(`/insight/${month}`);
    };

    return (
        <div className="calendar-container">
            <h2>Select a Date</h2>
            <Calendar
                onChange={onChange}
                value={date}
                onActiveStartDateChange={onActiveStartDateChange} // Listen to view changes
            />
            <button className="monthly-insight-button" onClick={handleMonthlyInsight}>
                Monthly Insight
            </button>
        </div>
    );
}

export default CalendarPage;
