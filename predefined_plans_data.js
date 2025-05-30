const predefinedPlansData = [
  {
    "name": "3-Day Beginner Strength",
    "description": "A 3-day per week plan focusing on fundamental strength movements.",
    "days": {
      "Day 1 (Mon)": [
        {
          "sessionName": "Full Body A",
          "exercises": ["barbell_squat", "military_press", "iso_8"]
        }
      ],
      "Day 2 (Wed)": [
        {
          "sessionName": "Full Body B",
          "exercises": ["deadlift", "kettlebell_swing", "iso_6"]
        }
      ],
      "Day 3 (Fri)": [
        {
          "sessionName": "Full Body C",
          "exercises": ["barbell_squat", "iso_11", "sprints_interval"]
        }
      ]
    }
  },
  {
    "name": "7-Day Active Routine",
    "description": "A 7-day plan incorporating daily activity, skill work, and recovery.",
    "days": {
      "Monday": [
        { "sessionName": "Strength AM", "exercises": ["barbell_squat", "military_press"] },
        { "sessionName": "Skill PM", "exercises": ["iso_1"] }
      ],
      "Tuesday": [
        { "sessionName": "Cardio", "exercises": ["running_steady_state"] }
      ],
      "Wednesday": [
        { "sessionName": "Strength AM", "exercises": ["deadlift", "kb_snatch"] },
        { "sessionName": "Tendon/Rehab PM", "exercises": ["iso_6", "iso_20"] }
      ],
      "Thursday": [
        { "sessionName": "Active Recovery", "exercises": ["iso_8", "iso_26"] }
      ],
      "Friday": [
        { "sessionName": "Power AM", "exercises": ["box_jump", "kettlebell_swing"] },
        { "sessionName": "Skill PM", "exercises": ["iso_3"] }
      ],
      "Saturday": [
        { "sessionName": "Long Activity", "exercises": ["running_steady_state"] }
      ],
      "Sunday": [
        { "sessionName": "Rest/Light Mobility", "exercises": [] }
      ]
    }
  },
  {
    "name": "Empty Weekly Plan Template",
    "description": "A blank 7-day template with one session per day.",
    "days": {
      "Day 1": [
        { "sessionName": "Session 1", "exercises": [] }
      ],
      "Day 2": [
        { "sessionName": "Session 1", "exercises": [] }
      ],
      "Day 3": [
        { "sessionName": "Session 1", "exercises": [] }
      ],
      "Day 4": [
        { "sessionName": "Session 1", "exercises": [] }
      ],
      "Day 5": [
        { "sessionName": "Session 1", "exercises": [] }
      ],
      "Day 6": [
        { "sessionName": "Session 1", "exercises": [] }
      ],
      "Day 7": [
        { "sessionName": "Session 1", "exercises": [] }
      ]
    }
  },
  {
    "name": "14-Day Comprehensive Tri-Phasic Training",
    "description": "A 2-week plan covering all aspects of training (strength, power, endurance, skill, recovery) with two sessions per day, designed to prevent overtraining.",
    "days": {
      "Week 1 - Day 1": [
        { "sessionName": "Strength Focus A (AM)", "exercises": ["barbell_squat", "military_press", "pull_up"] },
        { "sessionName": "Skill & Mobility (PM)", "exercises": ["iso_1", "iso_3", "indian_club_front_swing"] }
      ],
      "Week 1 - Day 2": [
        { "sessionName": "Endurance Cardio (AM)", "exercises": ["running_steady_state"] },
        { "sessionName": "Active Recovery & Core (PM)", "exercises": ["iso_8", "iso_29", "iso_26"] }
      ],
      "Week 1 - Day 3": [
        { "sessionName": "Strength Focus B (AM)", "exercises": ["deadlift", "barbell_bench_press", "barbell_row"] },
        { "sessionName": "Skill & Mobility (PM)", "exercises": ["iso_6", "iso_11", "iso_30"] }
      ],
      "Week 1 - Day 4": [
        { "sessionName": "Power & Speed (AM)", "exercises": ["box_jump", "kettlebell_swing", "jumping_lunge"] },
        { "sessionName": "Active Recovery & Tendon (PM)", "exercises": ["iso_20", "iso_5", "iso_22"] }
      ],
      "Week 1 - Day 5": [
        { "sessionName": "Strength Focus C (AM)", "exercises": ["barbell_squat", "chin_up", "barbell_hip_thrust"] },
        { "sessionName": "HIIT Cardio (PM)", "exercises": ["sprints_interval", "burpee"] }
      ],
      "Week 1 - Day 6": [
        { "sessionName": "Long Endurance (AM)", "exercises": ["running_steady_state", "iso_13"] },
        { "sessionName": "Rest & Light Mobility (PM)", "exercises": ["iso_8", "iso_26", "band_pull_apart"] }
      ],
      "Week 1 - Day 7": [
        { "sessionName": "Full Rest Day", "exercises": [] }
      ],
      "Week 2 - Day 8": [
        { "sessionName": "Strength Focus A' (AM)", "exercises": ["air_squat", "push_up", "chin_up"] },
        { "sessionName": "Skill & Mobility (PM)", "exercises": ["iso_2", "iso_4", "indian_club_mill"] }
      ],
      "Week 2 - Day 9": [
        { "sessionName": "Endurance Cardio (AM)", "exercises": ["jump_rope", "running_steady_state"] },
        { "sessionName": "Active Recovery & Core (PM)", "exercises": ["iso_9", "iso_7", "iso_27"] }
      ],
      "Week 2 - Day 10": [
        { "sessionName": "Strength Focus B' (AM)", "exercises": ["deadlift", "push_up", "band_face_pull"] },
        { "sessionName": "Skill & Mobility (PM)", "exercises": ["iso_7", "iso_12", "band_good_morning"] }
      ],
      "Week 2 - Day 11": [
        { "sessionName": "Power & Speed (AM)", "exercises": ["jumping_lunge", "kb_snatch", "depth_jump"] },
        { "sessionName": "Active Recovery & Tendon (PM)", "exercises": ["iso_21", "iso_14", "iso_10"] }
      ],
      "Week 2 - Day 12": [
        { "sessionName": "Strength Focus C' (AM)", "exercises": ["pistol_squat", "military_press", "barbell_row"] },
        { "sessionName": "Moderate Interval Cardio (PM)", "exercises": ["heavy_bag_speed_intervals", "jump_rope"] }
      ],
      "Week 2 - Day 13": [
        { "sessionName": "Long Activity/Sport (AM)", "exercises": ["wrestling_live_rounds", "iso_17"] },
        { "sessionName": "Rest & Light Mobility (PM)", "exercises": ["iso_23", "iso_24", "iso_25"] }
      ],
      "Week 2 - Day 14": [
        { "sessionName": "Full Rest Day / Prep for next cycle", "exercises": [] }
      ]
    }
  },
  {
    "name": "7-Day Gentle Start & Recovery",
    "description": "A 1-week, low-impact plan perfect for beginners or those needing active recovery. Focuses on gentle movements, isometrics, and light cardio.",
    "days": {
      "Day 1": [
        { "sessionName": "Light Isometrics & Mobility", "exercises": ["iso_1", "iso_8", "iso_33", "iso_24"] }
      ],
      "Day 2": [
        { "sessionName": "Light Cardio", "exercises": ["running_steady_state"] }
      ],
      "Day 3": [
        { "sessionName": "Full Body Gentle Stretching & Isometrics", "exercises": ["iso_26", "iso_30", "iso_5", "iso_28"] }
      ],
      "Day 4": [
        { "sessionName": "Light Isometrics & Bodyweight", "exercises": ["iso_18", "air_squat", "iso_2", "iso_21"] }
      ],
      "Day 5": [
        { "sessionName": "Light Cardio & Mobility", "exercises": ["jump_rope", "iso_22", "iso_23"] }
      ],
      "Day 6": [
        { "sessionName": "Active Recovery", "exercises": ["iso_15", "iso_8", "iso_20"] }
      ],
      "Day 7": [
        { "sessionName": "Rest or Very Light Stretching", "exercises": ["iso_30"] }
      ]
    }
  }
];
