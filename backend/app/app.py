from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)


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


if __name__ == "__main__":
    app.run(debug=True)
