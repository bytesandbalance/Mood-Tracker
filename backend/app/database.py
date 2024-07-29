# backend/database_setup.py
import sqlite3

conn = sqlite3.connect("mood_tracker.db")
cursor = conn.cursor()

# Create table with UNIQUE constraint on the date column
cursor.execute(
    """

CREATE TABLE IF NOT EXISTS mood_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL UNIQUE,
    journal_entry TEXT,
    triggers TEXT,
    sleep_duration INTEGER,
    diet TEXT,
    physical_symptoms TEXT,
    activity TEXT,
    energy_level INTEGER,
    happy_value INTEGER,
    happy_weight INTEGER,
    calm_value INTEGER,
    calm_weight INTEGER,
    motivated_value INTEGER,
    motivated_weight INTEGER,
    focused_value INTEGER,
    focused_weight INTEGER,
    energetic_value INTEGER,
    energetic_weight INTEGER,
    confident_value INTEGER,
    confident_weight INTEGER,
    grateful_value INTEGER,
    grateful_weight INTEGER,
    excited_value INTEGER,
    excited_weight INTEGER,
    content_value INTEGER,
    content_weight INTEGER,
    loving_value INTEGER,
    loving_weight INTEGER
)
"""
)

conn.commit()
conn.close()
