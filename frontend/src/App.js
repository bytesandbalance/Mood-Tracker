// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CalendarPage from './CalendarPage';
import MonthlyInsightPage from './MonthlyInsightPage';
import MoodTrackerPage from './MoodTrackerPage';
import './App.css'; // Include your basic styling

function App() {
  const [selectedDate, setSelectedDate] = React.useState(null);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<CalendarPage setSelectedDate={setSelectedDate} />}
          />
          <Route
            path="/track/:date"
            element={<MoodTrackerPage />}
          />
          <Route
            path="/insight/:month"
            element={<MonthlyInsightPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}
// I am about to create a new feature something to do with the mood-chart

export default App;
