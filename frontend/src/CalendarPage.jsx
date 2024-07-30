// CalendarPage.jsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the calendar CSS
import './App.css'; // Import your custom CSS
import { format } from 'date-fns'; // Import date-fns for date formatting
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function CalendarPage({ setSelectedDate }) {
    const [date, setDate] = useState(new Date()); // State to track the selected date
    const navigate = useNavigate(); // Hook to handle navigation

    const onChange = (date) => {
        setDate(date);
        setSelectedDate(date);
        // Navigate to mood tracker page with the selected date
        navigate(`/track/${format(date, 'yyyy-MM-dd')}`);
    };

    const getCurrentMonth = () => {
        return format(date, 'yyyy-MM'); // Extract the selected month in YYYY-MM format
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
            />
            <button className="monthly-insight-button" onClick={handleMonthlyInsight}>
                Monthly Insight
            </button>
        </div>
    );
}

export default CalendarPage;
