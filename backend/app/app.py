from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)


@app.route("/save", methods=["POST"])
def save_entry():
    data = request.json
    date = data.get("date")
    journal_entry = data.get("journalEntry")
    triggers = data.get("triggers")
    sleep_duration = data.get("sleepDuration")
    diet = data.get("diet")
    physical_symptoms = data.get("physicalSymptoms")
    activity = data.get("activity")
    energy_level = data.get("energyLevel")
    mood_values = data.get("moodValues", {})
    mood_weights = data.get("moodWeights", {})

    conn = sqlite3.connect("mood_tracker.db")
    cursor = conn.cursor()

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
            date,
            journal_entry,
            triggers,
            sleep_duration,
            diet,
            physical_symptoms,
            activity,
            energy_level,
            mood_values.get("happy", 0),
            mood_weights.get("happy", 1),
            mood_values.get("calm", 0),
            mood_weights.get("calm", 1),
            mood_values.get("motivated", 0),
            mood_weights.get("motivated", 1),
            mood_values.get("focused", 0),
            mood_weights.get("focused", 1),
            mood_values.get("energetic", 0),
            mood_weights.get("energetic", 1),
            mood_values.get("confident", 0),
            mood_weights.get("confident", 1),
            mood_values.get("grateful", 0),
            mood_weights.get("grateful", 1),
            mood_values.get("excited", 0),
            mood_weights.get("excited", 1),
            mood_values.get("content", 0),
            mood_weights.get("content", 1),
            mood_values.get("loving", 0),
            mood_weights.get("loving", 1),
        ),
    )

    conn.commit()
    conn.close()

    return jsonify({"status": "success"}), 201


@app.route("/get_entry/<date>", methods=["GET"])
def get_entry(date):
    conn = sqlite3.connect("mood_tracker.db")
    cursor = conn.cursor()
    cursor.execute(
        """
        SELECT
            journal_entry, triggers, sleep_duration, diet, physical_symptoms, activity,
            energy_level, happy_value, happy_weight, calm_value, calm_weight,
            motivated_value, motivated_weight, focused_value, focused_weight,
            energetic_value, energetic_weight, confident_value, confident_weight,
            grateful_value, grateful_weight, excited_value, excited_weight,
            content_value, content_weight, loving_value, loving_weight
        FROM mood_entries
        WHERE date = ?
    """,
        (date,),
    )
    entry = cursor.fetchone()
    conn.close()

    if entry:
        return jsonify(
            {
                "date": date,
                "journalEntry": entry[0],
                "triggers": entry[1],
                "sleepDuration": entry[2],
                "diet": entry[3],
                "physicalSymptoms": entry[4],
                "activity": entry[5],
                "energyLevel": entry[6],
                "moodValues": {
                    "happy": entry[7],
                    "calm": entry[9],
                    "motivated": entry[11],
                    "focused": entry[13],
                    "energetic": entry[15],
                    "confident": entry[17],
                    "grateful": entry[19],
                    "excited": entry[21],
                    "content": entry[23],
                    "loving": entry[25],
                },
                "moodWeights": {
                    "happy": entry[8],
                    "calm": entry[10],
                    "motivated": entry[12],
                    "focused": entry[14],
                    "energetic": entry[16],
                    "confident": entry[18],
                    "grateful": entry[20],
                    "excited": entry[22],
                    "content": entry[24],
                    "loving": entry[26],
                },
            }
        )
    else:
        return jsonify({"message": "No entry found for this date"}), 404


@app.route("/get_monthly_data/<month>", methods=["GET"])
def get_monthly_data(month):
    conn = sqlite3.connect("mood_tracker.db")
    cursor = conn.cursor()
    cursor.execute(
        """
        SELECT
            date, journal_entry, triggers, sleep_duration, diet, physical_symptoms, activity,
            energy_level, happy_value, happy_weight, calm_value, calm_weight,
            motivated_value, motivated_weight, focused_value, focused_weight,
            energetic_value, energetic_weight, confident_value, confident_weight,
            grateful_value, grateful_weight, excited_value, excited_weight,
            content_value, content_weight, loving_value, loving_weight
        FROM mood_entries
        WHERE strftime('%Y-%m', date) = ?
    """,
        (month,),
    )
    entries = cursor.fetchall()
    conn.close()

    data = [
        {
            "date": entry[0],
            "journalEntry": entry[1],
            "triggers": entry[2],
            "sleepDuration": entry[3],
            "diet": entry[4],
            "physicalSymptoms": entry[5],
            "activity": entry[6],
            "energyLevel": entry[7],
            "moodValues": {
                "happy": entry[8],
                "calm": entry[10],
                "motivated": entry[12],
                "focused": entry[14],
                "energetic": entry[16],
                "confident": entry[18],
                "grateful": entry[20],
                "excited": entry[22],
                "content": entry[24],
                "loving": entry[26],
            },
            "moodWeights": {
                "happy": entry[9],
                "calm": entry[11],
                "motivated": entry[13],
                "focused": entry[15],
                "energetic": entry[17],
                "confident": entry[19],
                "grateful": entry[21],
                "excited": entry[23],
                "content": entry[25],
                "loving": entry[27],
            },
        }
        for entry in entries
    ]

    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
