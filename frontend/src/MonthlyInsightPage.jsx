// MonthlyInsightPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const MonthlyInsightPage = () => {
    const { month } = useParams();

    return (
        <div>
            <h1>Monthly Insight for {month}</h1>
            <div className="chart-container">
                <div className="chart-wrapper">
                    <div className="chart-title">Mood Chart</div>
                    <div id="moodChart">Mood Chart Placeholder</div>
                </div>
                <div className="chart-wrapper">
                    <div className="chart-title">Energy Level Chart</div>
                    <div id="energyChart">Energy Level Chart Placeholder</div>
                </div>
                <div className="chart-wrapper">
                    <div className="chart-title">Diet Chart</div>
                    <div id="dietChart">Diet Chart Placeholder</div>
                </div>
                <div className="chart-wrapper">
                    <div className="chart-title">Activity Chart</div>
                    <div id="activityChart">Activity Chart Placeholder</div>
                </div>
                <div className="chart-wrapper">
                    <div className="chart-title">Physical Symptoms Chart</div>
                    <div id="physicalSymptomsChart">Physical Symptoms Chart Placeholder</div>
                </div>
                <div className="chart-wrapper">
                    <div className="chart-title">Sleep Duration Chart</div>
                    <div id="sleepDurationChart">Sleep Duration Chart Placeholder</div>
                </div>
            </div>
        </div>
    );
};

export default MonthlyInsightPage;
