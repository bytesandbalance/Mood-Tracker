import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import CalendarPage from './CalendarPage';
import MoodTrackerPage from './MoodTrackerPage';
import MonthlyInsightPage from './MonthlyInsightPage';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CalendarPageWrapper setSelectedDate={setSelectedDate} />} />
        <Route path="/track/:date" element={<MoodTrackerPage date={selectedDate} />} />
        <Route path="/insight/:month" element={<MonthlyInsightPage />} />
      </Routes>
    </Router>
  );
}

function CalendarPageWrapper({ setSelectedDate }) {
  const navigate = useNavigate();
  return <CalendarPage setSelectedDate={setSelectedDate} navigate={navigate} />;
}

export default App;
