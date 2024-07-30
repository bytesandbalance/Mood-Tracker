import sqlite3
import random
from datetime import datetime, timedelta

# Connect to the database
conn = sqlite3.connect("mood_tracker.db")
cursor = conn.cursor()

# Define possible values for activities, diet, etc.
activities = [
    "Running",
    "Reading",
    "Swimming",
    "Cycling",
    "Yoga",
    "Meditation",
    "Playing video games",
    "Watching TV",
    "Hanging out with friends",
    "Playing sports",
]
diets = ["Healthy", "Junk Food", "Balanced", "Vegetarian", "Vegan"]
physical_symptoms = ["None", "Headache", "Fatigue", "Muscle Pain", "Cold"]
triggers = [
    "None",
    "School Stress",
    "Family Issues",
    "Friendship Problems",
    "Health Issues",
]


# Function to generate mood values
def generate_mood_value(season):
    base_value = 50
    if season == "winter":
        adjustment = random.randint(-20, 0)
    elif season == "summer":
        adjustment = random.randint(0, 20)
    else:
        adjustment = random.randint(-10, 10)
    return max(0, min(100, base_value + adjustment))


# Function to generate mood weights
def generate_mood_weight():
    weight = random.randint(1, 5)
    assert 1 <= weight <= 5, f"Generated mood weight out of range: {weight}"
    return weight


# Function to determine the season based on the month
def get_season(month):
    if month in [12, 1, 2]:
        return "winter"
    elif month in [6, 7, 8]:
        return "summer"
    else:
        return "other"


# Start date
start_date = datetime.strptime("2023-07-27", "%Y-%m-%d")
end_date = datetime.strptime("2024-07-27", "%Y-%m-%d")
delta = timedelta(days=1)

current_date = start_date

while current_date <= end_date:
    date_str = current_date.strftime("%Y-%m-%d")
    season = get_season(current_date.month)

    # Generate random data for each column
    journal_entry = f"Journal entry for {date_str}"
    trigger = random.choice(triggers)
    activity = random.choice(activities)
    diet = random.choice(diets)
    sleep_duration = random.randint(6, 9)  # Random sleep duration between 6 and 9 hours
    physical_symptom = random.choice(physical_symptoms)
    energy_level = random.randint(40, 90)  # Random energy level between 40 and 90

    mood_values = {
        "happy": generate_mood_value(season),
        "calm": generate_mood_value(season),
        "motivated": generate_mood_value(season),
        "focused": generate_mood_value(season),
        "energetic": generate_mood_value(season),
        "confident": generate_mood_value(season),
        "grateful": generate_mood_value(season),
        "excited": generate_mood_value(season),
        "content": generate_mood_value(season),
        "loving": generate_mood_value(season),
    }

    mood_weights = {key: generate_mood_weight() for key in mood_values.keys()}

    # Debugging: Print mood weights to ensure they're within the correct range
    print(f"Date: {date_str}, Mood Weights: {mood_weights}")
    print(f"Date: {date_str}, Mood Valuess: {mood_values}")

    # Insert the generated data into the database
    cursor.execute(
        """
        INSERT OR REPLACE INTO mood_entries (
            date, journal_entry, triggers, sleep_duration, diet, physical_symptoms, activity, energy_level,
            happy_value, happy_weight, calm_value, calm_weight, motivated_value, motivated_weight,
            focused_value, focused_weight, energetic_value, energetic_weight, confident_value, confident_weight,
            grateful_value, grateful_weight, excited_value, excited_weight, content_value, content_weight,
            loving_value, loving_weight
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            date_str,
            journal_entry,
            trigger,
            sleep_duration,
            diet,
            physical_symptom,
            activity,
            energy_level,
            mood_values["happy"],
            mood_weights["happy"],
            mood_values["calm"],
            mood_weights["calm"],
            mood_values["motivated"],
            mood_weights["motivated"],
            mood_values["focused"],
            mood_weights["focused"],
            mood_values["energetic"],
            mood_weights["energetic"],
            mood_values["confident"],
            mood_weights["confident"],
            mood_values["grateful"],
            mood_weights["grateful"],
            mood_values["excited"],
            mood_weights["excited"],
            mood_values["content"],
            mood_weights["content"],
            mood_values["loving"],
            mood_weights["loving"],
        ),
    )

    current_date += delta

# Commit the transaction and close the connection
conn.commit()
conn.close()
