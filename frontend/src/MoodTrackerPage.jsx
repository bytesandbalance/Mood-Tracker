import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './App.css';

const MOODS = [
    { name: 'happy', opposite: 'sad', emojis: ['😢', '😀'] },
    { name: 'calm', opposite: 'anxious', emojis: ['😰', '🧘'] },
    { name: 'motivated', opposite: 'lethargic', emojis: ['🥱', '💪'] },
    { name: 'focused', opposite: 'distracted', emojis: ['🤪', '🧐'] },
    { name: 'energetic', opposite: 'tired', emojis: ['😫', '⚡'] },
    { name: 'confident', opposite: 'insecure', emojis: ['😔', '😎'] },
    { name: 'grateful', opposite: 'ungrateful', emojis: ['😒', '🙏'] },
    { name: 'excited', opposite: 'bored', emojis: ['😑', '🤩'] },
    { name: 'content', opposite: 'discontent', emojis: ['😞', '😊'] },
    { name: 'loving', opposite: 'hateful', emojis: ['💔', '❤️'] },
];


function MoodTrackerPage() {
    const { date } = useParams(); // Get the date from URL parameters
    const [hoveredMood, setHoveredMood] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        journalEntry: '',
        triggers: '',
        sleepDuration: '',
        diet: '',
        physicalSymptoms: '',
        activities: '',
        energyLevel: 0,
        moodValues: MOODS.reduce((acc, mood) => ({ ...acc, [mood.name]: 0 }), {}),
        moodWeights: MOODS.reduce((acc, mood) => ({ ...acc, [mood.name]: 1 }), {}),
    });

    useEffect(() => {
        const fetchEntry = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/get_entry/${date}`);
                if (response.status === 200) {
                    const data = response.data;
                    setFormData({
                        journalEntry: data.journalEntry || '',
                        triggers: data.triggers || '',
                        sleepDuration: data.sleepDuration || '',
                        diet: data.diet || '',
                        physicalSymptoms: data.physicalSymptoms || '',
                        activities: data.activity || '',
                        energyLevel: data.energyLevel || 0,
                        moodValues: data.moodValues || {},
                        moodWeights: data.moodWeights || {},
                    });
                } else {
                    setFormData({
                        journalEntry: '',
                        triggers: '',
                        sleepDuration: '',
                        diet: '',
                        physicalSymptoms: '',
                        activities: '',
                        energyLevel: 0,
                        moodValues: MOODS.reduce((acc, mood) => ({ ...acc, [mood.name]: 0 }), {}),
                        moodWeights: MOODS.reduce((acc, mood) => ({ ...acc, [mood.name]: 1 }), {}),
                    });
                }
            } catch (error) {
                console.error('Error fetching entry:', error);
                setFormData({
                    journalEntry: '',
                    triggers: '',
                    sleepDuration: '',
                    diet: '',
                    physicalSymptoms: '',
                    activities: '',
                    energyLevel: 0,
                    moodValues: MOODS.reduce((acc, mood) => ({ ...acc, [mood.name]: 0 }), {}),
                    moodWeights: MOODS.reduce((acc, mood) => ({ ...acc, [mood.name]: 1 }), {}),
                });
            }
            setLoading(false);
        };

        fetchEntry();
    }, [date]);

    const handleSliderChange = (name, value) => {
        setFormData(prevData => ({
            ...prevData,
            moodValues: {
                ...prevData.moodValues,
                [name]: value
            }
        }));
    };

    const handleWeightChange = (name, event) => {
        setFormData(prevData => ({
            ...prevData,
            moodWeights: {
                ...prevData.moodWeights,
                [name]: parseInt(event.target.value, 10)
            }
        }));
    };

    const handleJournalChange = (event) => {
        setFormData(prevData => ({
            ...prevData,
            journalEntry: event.target.value
        }));
    };

    const handleTriggersChange = (event) => {
        setFormData(prevData => ({
            ...prevData,
            triggers: event.target.value
        }));
    };

    const handleSleepChange = (event) => {
        setFormData(prevData => ({
            ...prevData,
            sleepDuration: event.target.value
        }));
    };

    const handleDietChange = (event) => {
        setFormData(prevData => ({
            ...prevData,
            diet: event.target.value
        }));
    };

    const handlePhysicalSymptomsChange = (event) => {
        setFormData(prevData => ({
            ...prevData,
            physicalSymptoms: event.target.value
        }));
    };

    const handleActivityChange = (event) => {
        setFormData(prevData => ({
            ...prevData,
            activities: event.target.value
        }));
    };

    const handleEnergyLevelChange = (event) => {
        setFormData(prevData => ({
            ...prevData,
            energyLevel: event.target.value
        }));
    };

    const handleSave = async () => {
        try {
            const response = await axios.post('http://localhost:5000/save', {
                date,
                journalEntry: formData.journalEntry,
                triggers: formData.triggers,
                sleepDuration: formData.sleepDuration,
                diet: formData.diet,
                physicalSymptoms: formData.physicalSymptoms,
                activity: formData.activity,
                energyLevel: formData.energyLevel,
                moodValues: formData.moodValues,
                moodWeights: formData.moodWeights,
            });
            if (response.status === 201) {
                alert('Entry saved successfully');
            }
        } catch (error) {
            console.error('Error saving entry:', error);
            alert('Error saving entry');
        }
    };

    const displayDate = new Date(date).toDateString(); // Format the date as needed

    return (
        <div className="app-container">
            <div className="mood-tracker">
                <h1>My Mood Tracker</h1>
                <p>Date: {displayDate}</p>
                {MOODS.map(({ name, emojis: [leftEmoji, rightEmoji] }) => (
                    <div
                        key={name}
                        className="mood-slider"
                        onMouseEnter={() => setHoveredMood(name)}
                        onMouseLeave={() => setHoveredMood(null)}
                    >
                        <span className="emoji">{leftEmoji}</span>
                        <input
                            type="range"
                            id={name}
                            min="0"
                            max="100"
                            value={formData.moodValues[name] || 0}
                            onChange={(e) => handleSliderChange(name, e.target.value)}
                        />
                        {hoveredMood === name && (
                            <span className="slider-value">{formData.moodValues[name] || 0}</span>
                        )}
                        <span className="emoji">{rightEmoji}</span>
                        <label htmlFor={name}>{name}</label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={formData.moodWeights[name] || 1}
                            onChange={(e) => handleWeightChange(name, e)}
                            className="weight-input"
                        />
                    </div>
                ))}
            </div>

            <div className="journal-and-tracker">
                <div className="journal">
                    <h2>Journal</h2>
                    <div className="datetime">
                        <p>Date: {displayDate}</p>
                    </div>
                    <textarea
                        value={formData.journalEntry}
                        onChange={handleJournalChange}
                        placeholder={formData.journalEntry}
                    />

                    {/* Additional Trackers (Under the Journal) */}
                    <h3>Activities</h3>
                    <textarea
                        value={formData.activities} // Join array items with new lines for textarea
                        onChange={handleActivityChange}
                        placeholder="Add activities..."
                    />

                    <h3>Sleep</h3>
                    <input
                        type="text"
                        value={formData.sleepDuration}
                        onChange={handleSleepChange}
                        placeholder="Hours slept"
                    />

                    <h3>Diet</h3>
                    <textarea
                        value={formData.diet}
                        onChange={handleDietChange}
                        placeholder="What did you eat today?"
                    />

                    <h3>Physical Symptoms</h3>
                    <textarea
                        value={formData.physicalSymptoms}
                        onChange={handlePhysicalSymptomsChange}
                        placeholder="Any physical symptoms?"
                    />

                    <h3>Triggers</h3>
                    <textarea
                        value={formData.triggers}
                        onChange={handleTriggersChange}
                        placeholder="What triggered your emotions?"
                    />

                    <h3>Energy Level</h3>
                    <div className="energy-slider-container">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={formData.energyLevel || 0}
                            onChange={handleEnergyLevelChange}
                            className="energy-slider"
                        />
                        <span className="energy-value">{formData.energyLevel || 0}</span>
                    </div>
                </div>
            </div>

            <div className="save-button-container">
                <button onClick={handleSave} className="save-button">
                    Save
                </button>
            </div>
        </div>
    );
}

export default MoodTrackerPage;