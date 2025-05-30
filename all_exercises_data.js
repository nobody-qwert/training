// all_exercises_data.js
const allExercises = [
  // --- STRENGTH ---
  {
    id: "barbell_squat",
    name: "Barbell Squat",
    goal: ["Strength"],
    category: "Lower Body Strength",
    equipment: "Barbell, Squat Rack",
    description: "A compound exercise that primarily targets the quadriceps, hamstrings, and glutes.",
    tendons: null,
    fascia: null,
    isIsometric: false,
    image: "img/barbell_squat.jpg" // Placeholder image
  },
  {
    id: "deadlift",
    name: "Deadlift",
    goal: ["Strength"],
    category: "Full Body Strength",
    equipment: "Barbell",
    description: "A compound exercise targeting the posterior chain, including hamstrings, glutes, and back.",
    tendons: null,
    fascia: null,
    isIsometric: false,
    image: "img/deadlift.jpg" // Placeholder image
  },
  {
    id: "military_press",
    name: "Military Press",
    goal: ["Strength"],
    category: "Upper Body Strength",
    equipment: "Barbell",
    description: "An overhead pressing movement primarily targeting the shoulders and triceps.",
    tendons: null,
    fascia: null,
    isIsometric: false,
    image: "img/military_press.jpg" // Placeholder image
  },

  // --- POWER ---
  {
    id: "kettlebell_swing",
    name: "Kettlebell Swing",
    goal: ["Power"],
    category: "Hip Hinge Power",
    equipment: "Kettlebell",
    description: "A dynamic exercise developing explosive power in the hips and posterior chain.",
    tendons: null,
    fascia: null,
    isIsometric: false,
    image: "img/kb_swing.jpg" // Placeholder image
  },
  // ... (other non-isometric exercises from previous version) ...
  {
    id: "kb_power_clean",
    name: "Kettlebell Power Clean",
    goal: ["Power"],
    category: "Full Body Power",
    equipment: "Kettlebell",
    description: "An explosive movement bringing a kettlebell from the floor to a racked position.",
    tendons: null,
    fascia: null,
    isIsometric: false,
    image: "img/kb_power_clean.jpg"
  },
  {
    id: "barbell_power_clean",
    name: "Barbell Power Clean",
    goal: ["Power"],
    category: "Full Body Power",
    equipment: "Barbell",
    description: "An Olympic lift derivative for developing explosive full-body power.",
    tendons: null,
    fascia: null,
    isIsometric: false,
    image: "img/barbell_power_clean.jpg"
  },
  {
    id: "kb_snatch",
    name: "Kettlebell Snatch",
    goal: ["Power"],
    category: "Full Body Power",
    equipment: "Kettlebell",
    description: "A dynamic full-body exercise moving a kettlebell from between the legs to overhead in one motion.",
    tendons: null,
    fascia: null,
    isIsometric: false,
    image: "img/kb_snatch.jpg"
  },

  // --- SPEED ---
  {
    id: "box_jump",
    name: "Box Jump",
    goal: ["Speed", "Power"], 
    category: "Plyometrics",
    equipment: "Plyo Box",
    description: "An explosive plyometric exercise for developing lower body power and speed.",
    tendons: null,
    fascia: null,
    isIsometric: false,
    image: "img/box_jump.jpg"
  },
  {
    id: "depth_jump",
    name: "Depth Jump",
    goal: ["Speed", "Power"],
    category: "Plyometrics",
    equipment: "Plyo Box",
    description: "An advanced plyometric exercise involving stepping off a box and immediately jumping.",
    tendons: null,
    fascia: null,
    isIsometric: false,
    image: "img/depth_jump.jpg"
  },

  // --- TENDON STRENGTH / REHAB ---
  // All 33 original isometric exercises mapped:
  {
    id: "iso_1", name: "Front Lever", goal: "Tendon Strength / Rehab", category: "Upper Body Static Hold", equipment: "Pull-up Bar / Rings", description: "Advanced static hold for lats and core.",
    tendons: "Latissimus dorsi insertion, long‑head triceps", fascia: "Thoracolumbar fascia, Superficial Back Line (SBL)", isIsometric: true, image: "img/ex_1.jpg"
  },
  {
    id: "iso_2", name: "Back Lever", goal: "Tendon Strength / Rehab", category: "Upper Body Static Hold", equipment: "Pull-up Bar / Rings", description: "Static hold for shoulder extension and biceps.",
    tendons: "Distal biceps, pectoralis major, sub‑scapularis", fascia: "Anterior shoulder fascia, Thoracolumbar fascia", isIsometric: true, image: "img/ex_2.jpg"
  },
  {
    id: "iso_3", name: "Planche", goal: "Tendon Strength / Rehab", category: "Upper Body Static Hold", equipment: "Floor / Parallettes / Rings", description: "Advanced straight-arm shoulder strength hold.",
    tendons: "Wrist flexor/extensor groups, anterior deltoid, RC complex", fascia: "Palmar fascia, Superficial Front Line (SFL)", isIsometric: true, image: "img/ex_3.jpg"
  },
  {
    id: "iso_4", name: "Iron Cross (rings)", goal: "Tendon Strength / Rehab", category: "Upper Body Static Hold", equipment: "Gymnastic Rings", description: "Iconic strength hold on rings.",
    tendons: "Supraspinatus/infraspinatus, long‑head biceps, pec major", fascia: "Glenohumeral capsule fascia, Deep Arm Line", isIsometric: true, image: "img/ex_4.jpg" // Assuming img/ex_4.jpg exists or will be added
  },
  {
    id: "iso_5", name: "Maltese / Swallow", goal: "Tendon Strength / Rehab", category: "Upper Body Static Hold", equipment: "Gymnastic Rings / Floor", description: "Advanced version of Planche/Iron Cross.",
    tendons: "Iron‑cross tendons + elbow extensors", fascia: "Deep Arm Line, Sternocostal fascia", isIsometric: true, image: "img/ex_5.jpg" // Assuming img/ex_5.jpg exists
  },
  {
    id: "iso_6", name: "L-Sit", goal: "Tendon Strength / Rehab", category: "Core Static Hold", equipment: "Floor / Parallettes / Rings", description: "Core and hip flexor intensive hold.",
    tendons: "Iliopsoas & rectus femoris tendons, patellar tendon", fascia: "Anterior abdominal fascia, SFL", isIsometric: true, image: "img/ex_6.jpg"
  },
  {
    id: "iso_7", name: "V-Sit / Manna", goal: "Tendon Strength / Rehab", category: "Core Static Hold", equipment: "Floor / Parallettes", description: "Advanced core compression hold.",
    tendons: "Hip‑flexor & hamstring proximal tendons", fascia: "Posterior chain fascia, Spiral Line", isIsometric: true, image: "img/ex_7.jpg"
  },
  {
    id: "iso_8", name: "Dead Hang", goal: "Tendon Strength / Rehab", category: "Grip Static Hold", equipment: "Pull-up Bar", description: "Basic grip and shoulder health exercise.",
    tendons: "Flexor digitorum profundus/superficialis, rotator cuff", fascia: "Brachial fascia, Thoracolumbar fascia", isIsometric: true, image: "img/ex_8.jpg"
  },
  {
    id: "iso_9", name: "Fingerboard Crimp Hang", goal: "Tendon Strength / Rehab", category: "Grip Static Hold", equipment: "Fingerboard", description: "Specific finger strength hold for climbers.",
    tendons: "Finger pulley & FDP tendons", fascia: "Palmar aponeurosis", isIsometric: true, image: "img/ex_9.jpg"
  },
  {
    id: "iso_10", name: "Ring Support / Dip-Top Hold", goal: "Tendon Strength / Rehab", category: "Support Static Hold", equipment: "Gymnastic Rings", description: "Basic support position on rings.",
    tendons: "Triceps tendon, rotator cuff, sternal‑pec", fascia: "Deep Arm Line", isIsometric: true, image: "img/ex_10.jpg"
  },
  {
    id: "iso_11", name: "Handstand Hold", goal: "Tendon Strength / Rehab", category: "Support Static Hold", equipment: "Floor / Wall", description: "Inverted balance and shoulder strength hold.",
    tendons: "Triceps & RC tendons, wrist extensors", fascia: "Palmar & ante‑brachial fascia, SBL", isIsometric: true, image: "img/ex_11.jpg"
  },
  {
    id: "iso_12", name: "Pallof Press Hold", goal: "Tendon Strength / Rehab", category: "Core Static Hold", equipment: "Cable Machine / Resistance Band", description: "Anti-rotation core stability exercise.",
    tendons: "Oblique aponeuroses, erector‑spinae attachments", fascia: "Thoracolumbar fascia, Spiral Line", isIsometric: true, image: "img/ex_12.jpg"
  },
  {
    id: "iso_13", name: "Overhead Kettlebell Walk", goal: "Tendon Strength / Rehab", category: "Carries Static Hold", equipment: "Kettlebell", description: "Shoulder stability and core challenge.",
    tendons: "Rotator‑cuff, triceps, wrist extensor tendons", fascia: "Shoulder cuff fascia, SBL & SFL crossover", isIsometric: true, image: "img/ex_13.jpg"
  },
  {
    id: "iso_14", name: "Farmers Carry", goal: "Tendon Strength / Rehab", category: "Carries Static Hold", equipment: "Heavy Dumbbells / Kettlebells / Farmers Handles", description: "Full body strength and grip exercise.",
    tendons: "FDP/FDS, FCU/FCR, long‑head biceps, supraspinatus", fascia: "Brachial & palmar fascia", isIsometric: true, image: "img/ex_14.jpg"
  },
  {
    id: "iso_15", name: "Suitcase Carry", goal: "Tendon Strength / Rehab", category: "Carries Static Hold", equipment: "Dumbbell / Kettlebell", description: "Unilateral loaded carry for core stability.",
    tendons: "Same as #14 + QL/oblique tendons", fascia: "Lateral Line", isIsometric: true, image: "img/ex_15.jpg"
  },
  {
    id: "iso_16", name: "Hercules Hold", goal: "Tendon Strength / Rehab", category: "Carries Static Hold", equipment: "Pillars / Cable Machine", description: "Test of grip and upper body static strength.",
    tendons: "Grip tendons, deltoid/RC insertions", fascia: "Arm Lines, Thoracolumbar fascia", isIsometric: true, image: "img/ex_16.jpg"
  },
  {
    id: "iso_17", name: "Yoke Walk / Hold", goal: "Tendon Strength / Rehab", category: "Carries Static Hold", equipment: "Yoke", description: "Heavy loaded carry for structural strength.",
    tendons: "Trapezius & supraspinous tendons, patellar & Achilles", fascia: "IT‑band fascia, Thoracolumbar fascia", isIsometric: true, image: "img/ex_17.jpg"
  },
  {
    id: "iso_18", name: "Wall-Sit", goal: "Tendon Strength / Rehab", category: "Lower Body Static Hold", equipment: "Wall", description: "Quadriceps endurance hold.",
    tendons: "Patellar & quadriceps tendons, Achilles (static DF)", fascia: "IT‑band fascia, Plantar fascia", isIsometric: true, image: "img/ex_18.jpg"
  },
  {
    id: "iso_19", name: "Spanish-Squat Hold", goal: "Tendon Strength / Rehab", category: "Lower Body Static Hold", equipment: "Resistance Band, Anchor Point", description: "Patellar tendon focused squat hold.",
    tendons: "Patellar & quad tendon focus", fascia: "Fascia lata (anterior)", isIsometric: true, image: "img/ex_19.jpg"
  },
  {
    id: "iso_20", name: "Copenhagen Adductor Hold", goal: "Tendon Strength / Rehab", category: "Lower Body Static Hold", equipment: "Bench / Box", description: "Adductor strength and stability hold.",
    tendons: "Adductor longus/brevis/gracilis tendons", fascia: "Adductor fascial compartment", isIsometric: true, image: "img/ex_20.jpg"
  },
  {
    id: "iso_21", name: "Glute Bridge Hold", goal: "Tendon Strength / Rehab", category: "Lower Body Static Hold", equipment: "Floor", description: "Posterior chain activation and endurance.",
    tendons: "Hamstring proximal, glute max tendon", fascia: "Sacrotuberous ligament, Thoracolumbar fascia", isIsometric: true, image: "img/ex_21.jpg"
  },
  {
    id: "iso_22", name: "Tip-Toe / Calf-Raise Hold", goal: "Tendon Strength / Rehab", category: "Lower Body Static Hold", equipment: "Floor / Step", description: "Achilles tendon and calf endurance.",
    tendons: "Achilles tendon", fascia: "Plantar fascia, SBL", isIsometric: true, image: "img/ex_22.jpg"
  },
  {
    id: "iso_23", name: "Ballet \"Relevé\" / Pointe Hold", goal: "Tendon Strength / Rehab", category: "Lower Body Static Hold", equipment: "Floor / Barre", description: "Ankle stability and calf strength.",
    tendons: "Achilles & tibialis posterior", fascia: "Plantar fascia, Deep Front Line (DFL)", isIsometric: true, image: "img/ex_23.jpg"
  },
  {
    id: "iso_24", name: "Band Cervical Extension Hold", goal: "Tendon Strength / Rehab", category: "Neck Static Hold", equipment: "Resistance Band", description: "Neck extensor strengthening.",
    tendons: "Cervical erector & semispinalis tendons", fascia: "Nuchal ligament, Cervical fascia", isIsometric: true, image: "img/ex_24.jpg"
  },
  {
    id: "iso_25", name: "Wrestler Bridge (neck)", goal: "Tendon Strength / Rehab", category: "Neck Static Hold", equipment: "Floor / Mat", description: "Full neck and upper back strength.",
    tendons: "Neck tendons + SC joint capsule", fascia: "Nuchal ligament", isIsometric: true, image: "img/ex_25.jpg"
  },
  {
    id: "iso_26", name: "Scapular Retraction Hold", goal: "Tendon Strength / Rehab", category: "Postural Static Hold", equipment: "None / Resistance Band", description: "Upper back postural endurance.",
    tendons: "Rhomboid & lower‑trap tendons", fascia: "Thoracic fascia", isIsometric: true, image: "img/ex_26.jpg"
  },
  {
    id: "iso_27", name: "Band Lateral-Neck Hold", goal: "Tendon Strength / Rehab", category: "Neck Static Hold", equipment: "Resistance Band", description: "Lateral neck flexor strengthening.",
    tendons: "Sternocleidomastoid, upper‑trap tendons", fascia: "Cervical fascia", isIsometric: true, image: "img/ex_27.jpg"
  },
  {
    id: "iso_28", name: "Wrist-Roller Isometric", goal: "Tendon Strength / Rehab", category: "Postural Static Hold", equipment: "Wrist Roller", description: "Forearm and grip endurance.", // Also a Grip exercise
    tendons: "Wrist extensor tendons", fascia: "Dorsal carpal fascia", isIsometric: true, image: "img/ex_28.jpg"
  },
  {
    id: "iso_29", name: "RKC / Ring Plank", goal: "Tendon Strength / Rehab", category: "Core Static Hold", equipment: "Gymnastic Rings / Floor", description: "High tension plank variation.",
    tendons: "Rectus abdominis tendon, lats insertion", fascia: "Anterior abdominal & thoracolumbar fascia", isIsometric: true, image: "img/ex_29.jpg"
  },
  {
    id: "iso_30", name: "Hollow-Body Hold", goal: "Tendon Strength / Rehab", category: "Core Static Hold", equipment: "Floor", description: "Fundamental core stabilization exercise.",
    tendons: "Rectus sheath, hip‑flexor tendons", fascia: "SFL, Deep Front Line", isIsometric: true, image: "img/ex_30.jpg"
  },
  {
    id: "iso_31", name: "Plate Front Hold", goal: "Tendon Strength / Rehab", category: "Upper Body Static Hold", equipment: "Weight Plate", description: "Anterior deltoid and shoulder stability.",
    tendons: "Wrist flexor/extensor groups, anterior deltoid", fascia: "Palmar fascia, Superficial Front Line (SFL)", isIsometric: true, image: "img/ex_31.jpg"
  },
  {
    id: "iso_32", name: "Dumbbell Lateral Raise Hold", goal: "Tendon Strength / Rehab", category: "Upper Body Static Hold", equipment: "Dumbbells", description: "Medial deltoid and shoulder stability.",
    tendons: "Middle deltoid, supraspinatus, upper trapezius", fascia: "Deep Arm Line, Superficial Back Line (SBL)", isIsometric: true, image: "img/ex_32.jpg"
  },
  {
    id: "iso_33", name: "Band Cervical Flexion Hold", goal: "Tendon Strength / Rehab", category: "Neck Static Hold", equipment: "Resistance Band", description: "Neck flexor strengthening.",
    tendons: "Sternocleidomastoid & scalene tendons", fascia: "Cervical fascia, Deep Front Line (DFL)", isIsometric: true, image: "img/ex_33.jpg"
  },

  // --- CARDIO ---
  {
    id: "running_steady_state",
    name: "Steady State Run",
    goal: ["Cardio"],
    category: "Endurance Running",
    equipment: "None",
    description: "Running at a consistent, moderate pace for an extended duration.",
    tendons: null,
    fascia: null,
    isIsometric: false,
    image: "img/running.jpg" // Placeholder image
  },
  {
    id: "sprints_interval",
    name: "Interval Sprints",
    goal: ["Cardio", "Speed"],
    category: "Sprint Training",
    equipment: "None",
    description: "Short bursts of maximal effort running followed by recovery periods.",
    tendons: null,
    fascia: null,
    isIsometric: false,
    image: "img/sprints.jpg" // Placeholder image
  },

  // --- BODYWEIGHT (NEW) ---
  { id: "push_up", name: "Push‑Up", goal: ["Strength"], category: "Upper Body Strength", equipment: "None", description: "Classic bodyweight pressing movement targeting the chest, shoulders, triceps, and core.", tendons: null, fascia: null, isIsometric: false, image: "img/push_up.jpg" },

  { id: "pull_up", name: "Pull‑Up", goal: ["Strength"], category: "Upper Body Pull Strength", equipment: "Pull‑up Bar", description: "Vertical pulling exercise focusing on latissimus dorsi, biceps, and upper back.", tendons: null, fascia: null, isIsometric: false, image: "img/pull_up.jpg" },

  { id: "chin_up", name: "Chin‑Up", goal: ["Strength"], category: "Upper Body Pull Strength", equipment: "Pull‑up Bar", description: "Supinated‑grip vertical pull emphasizing biceps and lats.", tendons: null, fascia: null, isIsometric: false, image: "img/chin_up.jpg" },

  { id: "jumping_lunge", name: "Jumping Lunge", goal: ["Power", "Speed"], category: "Lower Body Plyometrics", equipment: "None", description: "Alternating lunge with an explosive jump to develop lower‑body power and coordination.", tendons: null, fascia: null, isIsometric: false, image: "img/jumping_lunge.jpg" },

  { id: "air_squat", name: "Bodyweight Squat", goal: ["Strength"], category: "Lower Body Strength", equipment: "None", description: "Fundamental squat pattern targeting quadriceps, glutes, and hamstrings with no external load.", tendons: null, fascia: null, isIsometric: false, image: "img/air_squat.jpg" },

  { id: "pistol_squat", name: "Pistol Squat", goal: ["Strength", "Balance"], category: "Single‑Leg Strength", equipment: "None", description: "Unilateral squat requiring strength, mobility, and balance; emphasizes quads and glutes.", tendons: null, fascia: null, isIsometric: false, image: "img/pistol_squat.jpg" },

  { id: "burpee", name: "Burpee", goal: ["Cardio", "Power"], category: "Full‑Body Conditioning", equipment: "None", description: "Full‑body movement combining squat, plank, push‑up, and jump for metabolic conditioning.", tendons: null, fascia: null, isIsometric: false, image: "img/burpee.jpg" },

  { id: "jump_rope", name: "Jump Rope", goal: ["Cardio", "Speed"], category: "Rhythmic Conditioning", equipment: "Jump Rope", description: "Rhythmic plyometric conditioning drill that improves coordination, foot speed, and endurance.", tendons: null, fascia: null, isIsometric: false, image: "img/jump_rope.jpg" },

  // --- BARBELL (NEW) ---
  { id: "barbell_bench_press", name: "Barbell Bench Press", goal: ["Strength"], category: "Upper Body Strength", equipment: "Barbell, Bench", description: "Horizontal pressing staple targeting pectorals, anterior deltoids, and triceps.", tendons: null, fascia: null, isIsometric: false, image: "img/barbell_bench_press.jpg" },

  { id: "barbell_row", name: "Barbell Bent‑Over Row", goal: ["Strength"], category: "Upper Body Pull Strength", equipment: "Barbell", description: "Compound rowing movement building upper‑back thickness and hip‑hinge stability.", tendons: null, fascia: null, isIsometric: false, image: "img/barbell_row.jpg" },

  { id: "barbell_hip_thrust", name: "Barbell Hip Thrust", goal: ["Strength"], category: "Glute Strength", equipment: "Barbell, Bench", description: "Posterior chain exercise emphasizing glute maximus strength and power.", tendons: null, fascia: null, isIsometric: false, image: "img/barbell_hip_thrust.jpg" },

  // --- INDIAN CLUB (NEW) ---
  { id: "indian_club_front_swing", name: "Indian Club Front Swing", goal: ["Mobility", "Strength"], category: "Shoulder Mobility", equipment: "Indian Clubs", description: "Rhythmic forward swing pattern improving shoulder mobility, coordination, and grip.", tendons: null, fascia: null, isIsometric: false, image: "img/indian_club_front_swing.jpg" },

  { id: "indian_club_mill", name: "Indian Club Mill", goal: ["Mobility", "Strength"], category: "Shoulder Mobility", equipment: "Indian Clubs", description: "Circular milling pattern developing shoulder endurance, cross‑body coordination, and forearm strength.", tendons: null, fascia: null, isIsometric: false, image: "img/indian_club_mill.jpg" },

  // --- RESISTANCE BAND (NEW) ---
  { id: "band_pull_apart", name: "Band Pull‑Apart", goal: ["Strength"], category: "Upper Back Activation", equipment: "Resistance Band", description: "Scapular‑retraction drill strengthening rear delts and rhomboids; great for posture.", tendons: null, fascia: null, isIsometric: false, image: "img/band_pull_apart.jpg" },

  { id: "band_face_pull", name: "Band Face Pull", goal: ["Strength"], category: "Shoulder External Rotation", equipment: "Resistance Band", description: "Posterior‑shoulder exercise improving rotator cuff strength and scapular stability.", tendons: null, fascia: null, isIsometric: false, image: "img/band_face_pull.jpg" },

  { id: "band_good_morning", name: "Band Good Morning", goal: ["Strength"], category: "Hip Hinge Strength", equipment: "Resistance Band", description: "Hip hinge pattern targeting hamstrings, glutes, and lower back using elastic resistance.", tendons: null, fascia: null, isIsometric: false, image: "img/band_good_morning.jpg" }

];

// Helper functions
function getExercisesByGoal(goalName) {
  return allExercises.filter(ex => {
    if (Array.isArray(ex.goal)) {
      return ex.goal.includes(goalName);
    }
    return ex.goal === goalName; // Handle single string goal
  });
}

function getExercisesByCategory(categoryName) {
  return allExercises.filter(ex => ex.category === categoryName);
}

function getIsometricExercises() {
  return allExercises.filter(ex => ex.isIsometric === true);
}
