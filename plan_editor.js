/* ────── Data ─────────────────────────────────────────────────── */
// allExercises is available from all_exercises_data.js
// predefinedPlansData is available from predefined_plans_data.js

let workoutPlan = {};
// predefinedPlansData will be populated by the included predefined_plans_data.js file

/* ────── Helpers ──────────────────────────────────────────────── */
const byId = id => allExercises.find(e => e.id === id);
const generateSessionId = () => `sess_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

/* ────── Category Colors ─────────────────────────────────────── */
const categoryColorMap = {
    "Lower Body Strength": "#FFCDD2", "Full Body Strength": "#F8BBD0", "Upper Body Strength": "#E1BEE7", 
    "Hip Hinge Power": "#D1C4E9", "Full Body Power": "#C5CAE9", "Plyometrics": "#BBDEFB",         
    "Upper Body Static Hold": "#B3E5FC", "Core Static Hold": "#B2EBF2", "Grip Static Hold": "#B2DFDB",       
    "Support Static Hold": "#C8E6C9", "Carries Static Hold": "#DCEDC8", "Lower Body Static Hold": "#F0F4C3", 
    "Neck Static Hold": "#FFF9C4", "Postural Static Hold": "#FFECB3", "Endurance Running": "#FFE0B2",      
    "Sprint Training": "#FFCCBC", "Default": "#CFD8DC" 
};
function getCategoryColor(category) { return categoryColorMap[category] || categoryColorMap["Default"]; }

/* ────── Render Sidebar (Available Exercises) ────────────────── */
const exListUl = document.getElementById('exercise-list');
const exercisesByGoalAndCategory = {};
if (typeof allExercises !== 'undefined' && Array.isArray(allExercises)) {
    allExercises.forEach(ex => {
    const goals = Array.isArray(ex.goal) ? ex.goal : [ex.goal]; 
    goals.forEach(g => {
        if (!g) return; 
        if (!exercisesByGoalAndCategory[g]) exercisesByGoalAndCategory[g] = {};
        if (!exercisesByGoalAndCategory[g][ex.category]) exercisesByGoalAndCategory[g][ex.category] = [];
        exercisesByGoalAndCategory[g][ex.category].push(ex);
    });
    });
    Object.keys(exercisesByGoalAndCategory).sort().forEach(goal => { 
    const goalHeading = document.createElement('div'); goalHeading.className = 'goal-heading'; goalHeading.textContent = goal; exListUl.appendChild(goalHeading);
    Object.keys(exercisesByGoalAndCategory[goal]).sort().forEach(category => { 
        const catEx = exercisesByGoalAndCategory[goal][category];
        const catHeading = document.createElement('div'); catHeading.className = 'category-heading'; catHeading.textContent = category; catHeading.style.backgroundColor = getCategoryColor(category); exListUl.appendChild(catHeading);
        catEx.sort((a,b) => a.name.localeCompare(b.name)).forEach(ex => {
        const li = document.createElement('li'); li.className = 'exercise-item'; li.dataset.id = ex.id; li.dataset.category = ex.category;
        li.textContent = ex.name; li.title = `${ex.category} • ${ex.equipment || 'N/A'}`; li.draggable = true; li.style.backgroundColor = getCategoryColor(ex.category);
        exListUl.appendChild(li);
        });
    });
    });
} else {
    console.error("allExercises data is not loaded or not an array.");
}


/* ────── Workout Plan Rendering & Management ─────────────────── */
const planSectionContainer = document.getElementById('plan-section-container');
const predefinedPlanSelect = document.getElementById('predefined-plan-select');

function generateSessionSummary(exerciseIds) { 
    const sessionExercises = exerciseIds.map(id => byId(id)).filter(ex => ex);
    if (!sessionExercises.length) return document.createElement('div'); 
    const categoriesInSession = [...new Set(sessionExercises.map(ex => ex.category))];
    const summary = document.createElement('div');
    summary.className = 'workout-summary session-summary'; 
    summary.innerHTML = categoriesInSession.map(cat => 
        `<span class="category-tag" style="background-color:${getCategoryColor(cat)};">${cat}</span>`
    ).join('');
    return summary;
}

function renderDayBlocks() {
    planSectionContainer.innerHTML = '';
    Object.entries(workoutPlan).forEach(([dayKey, sessions]) => {
        const dayBlock = document.createElement('div');
        dayBlock.className = 'day-block';
        dayBlock.dataset.dayKey = dayKey;

        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header';
        const dayHeading = document.createElement('h3');
        dayHeading.textContent = dayKey;
        dayHeading.title = "Click to edit day name";
        dayHeading.style.cursor = 'pointer';
        dayHeading.onclick = (e) => {
            e.stopPropagation();
            editDayName(dayKey, dayHeading);
        };
        const addSessBtn = document.createElement('button');
        addSessBtn.className = 'add-session-btn';
        addSessBtn.textContent = '+';
        addSessBtn.title = 'Add new session to this day';
        addSessBtn.onclick = () => addSessionToDay(dayKey);
        addSessBtn.classList.add('day-action-btn'); // For styling

        const removeDayBtn = document.createElement('button');
        removeDayBtn.className = 'remove-day-btn day-action-btn';
        removeDayBtn.textContent = '✕';
        removeDayBtn.title = 'Remove this day';
        removeDayBtn.onclick = () => removeDay(dayKey);

        const dayControls = document.createElement('div');
        dayControls.style.display = 'flex';
        dayControls.style.alignItems = 'center';
        dayControls.style.gap = '0.5rem';
        
        dayControls.appendChild(removeDayBtn);
        dayControls.appendChild(addSessBtn);
        
        dayHeader.appendChild(dayHeading);
        dayHeader.appendChild(dayControls);
        dayBlock.appendChild(dayHeader);

        (sessions || []).forEach(session => { // Add guard for sessions
            const sessionBlock = document.createElement('div');
            sessionBlock.className = 'session-block';
            sessionBlock.dataset.sessionId = session.sessionId;

            const sessionHeader = document.createElement('div');
            sessionHeader.className = 'session-header';
            const sessionNameEl = document.createElement('span');
            sessionNameEl.className = 'session-name';
            sessionNameEl.textContent = session.sessionName;
            sessionNameEl.title = "Click to edit session name";
            sessionNameEl.style.cursor = 'pointer';
            sessionNameEl.onclick = (e) => { 
                e.stopPropagation(); // Prevent other clicks if this element is nested
                editSessionName(dayKey, session.sessionId, sessionNameEl); 
            };
            
            const removeSessBtn = document.createElement('button');
            removeSessBtn.className = 'remove-session-btn';
            removeSessBtn.textContent = '×';
            removeSessBtn.title = 'Remove this session';
            removeSessBtn.onclick = () => removeSessionFromDay(dayKey, session.sessionId);
            
            sessionHeader.appendChild(sessionNameEl);
            sessionHeader.appendChild(removeSessBtn);
            sessionBlock.appendChild(sessionHeader);

            const ul = document.createElement('ul');
            ul.className = 'session-exercises-list dropzone'; 
            ul.dataset.dayKey = dayKey;
            ul.dataset.sessionId = session.sessionId;

            (session.exercises || []).forEach(exId => { // Add guard for exercises
                const ex = byId(exId);
                if (ex) {
                    const li = document.createElement('li');
                    li.dataset.id = ex.id;
                    li.dataset.category = ex.category;
                    li.style.backgroundColor = getCategoryColor(ex.category);
                    li.draggable = true;

                    // Exercise name span
                    const exNameSpan = document.createElement('span');
                    exNameSpan.textContent = ex.name;

                    // Remove exercise button (x)
                    const removeExBtn = document.createElement('button');
                    removeExBtn.className = 'remove-exercise-btn';
                    removeExBtn.textContent = '×';
                    removeExBtn.title = 'Remove this exercise from session';
                    removeExBtn.onclick = (e) => {
                        e.stopPropagation();
                        // Remove this exercise from the session's exercises array
                        const idx = session.exercises.indexOf(ex.id);
                        if (idx > -1) {
                            session.exercises.splice(idx, 1);
                            renderDayBlocks();
                        }
                    };

                    // Style the remove button to be round like the session remove button
                    removeExBtn.style.cursor = 'pointer';
                    removeExBtn.style.background = 'transparent';
                    removeExBtn.style.color = '#777';
                    removeExBtn.style.border = '1px solid #ddd';
                    removeExBtn.style.borderRadius = '50%';
                    removeExBtn.style.width = '18px';
                    removeExBtn.style.height = '18px';
                    removeExBtn.style.fontSize = '12px';
                    removeExBtn.style.textAlign = 'center';
                    removeExBtn.style.transition = 'background-color 0.2s ease, color 0.2s ease';
                    removeExBtn.style.fontWeight = 'bold';
                    removeExBtn.style.display = 'flex';
                    removeExBtn.style.alignItems = 'center';
                    removeExBtn.style.justifyContent = 'center';
                    removeExBtn.style.marginLeft = 'auto';
                    removeExBtn.style.marginRight = '0';
                    
                    // Add hover effect
                    removeExBtn.onmouseover = () => {
                        removeExBtn.style.backgroundColor = '#f0f0f0';
                        removeExBtn.style.color = '#d32f2f';
                    };
                    removeExBtn.onmouseout = () => {
                        removeExBtn.style.backgroundColor = 'transparent';
                        removeExBtn.style.color = '#777';
                    };
                    
                    // Create a container for the exercise item content to allow flex layout
                    const liContent = document.createElement('div');
                    liContent.style.display = 'flex';
                    liContent.style.width = '100%';
                    liContent.style.alignItems = 'center';
                    liContent.style.justifyContent = 'space-between';
                    
                    liContent.appendChild(exNameSpan);
                    liContent.appendChild(removeExBtn);
                    li.appendChild(liContent);
                    ul.appendChild(li);
                }
            });
            sessionBlock.appendChild(ul);
            sessionBlock.appendChild(generateSessionSummary(session.exercises || [])); 
            dayBlock.appendChild(sessionBlock);
        });
        planSectionContainer.appendChild(dayBlock);
    });
    
    // Add the "Add New Day" button as the last item in the plan section
    const addDayBlock = document.createElement('div');
    addDayBlock.className = 'day-block add-day-block';
    addDayBlock.style.display = 'flex';
    addDayBlock.style.alignItems = 'center';
    addDayBlock.style.justifyContent = 'center';
    addDayBlock.style.cursor = 'pointer';
    addDayBlock.style.backgroundColor = '#f5f5f5';
    addDayBlock.style.border = '1px dashed #ccc';
    addDayBlock.style.padding = '1rem';
    addDayBlock.style.marginBottom = '1.5rem';
    addDayBlock.style.transition = 'background-color 0.2s ease';
    
    // Create a container for the + icon and text
    const addDayContent = document.createElement('div');
    addDayContent.style.display = 'flex';
    addDayContent.style.alignItems = 'center';
    addDayContent.style.gap = '0.5rem';
    
    // Create the + icon
    const plusIcon = document.createElement('span');
    plusIcon.textContent = '+';
    plusIcon.style.fontSize = '1.5rem';
    plusIcon.style.fontWeight = 'bold';
    plusIcon.style.color = '#666';
    
    // Create the text
    const addDayText = document.createElement('span');
    addDayText.textContent = 'Add New Day';
    addDayText.style.fontSize = '1rem';
    addDayText.style.color = '#666';
    
    // Add hover effect
    addDayBlock.onmouseover = () => {
        addDayBlock.style.backgroundColor = '#e9e9e9';
    };
    addDayBlock.onmouseout = () => {
        addDayBlock.style.backgroundColor = '#f5f5f5';
    };
    
    // Add click handler
    addDayBlock.onclick = addDay;
    
    // Assemble the button
    addDayContent.appendChild(plusIcon);
    addDayContent.appendChild(addDayText);
    addDayBlock.appendChild(addDayContent);
    
    // Add to the plan section container
    planSectionContainer.appendChild(addDayBlock);
    
    addDropzoneEventListeners();
}

function addSessionToDay(dayKey) {
    const sessionName = prompt("Enter name for the new session:", `Session ${(workoutPlan[dayKey] || []).length + 1}`);
    if (sessionName === null || sessionName.trim() === "") return; 

    if (!workoutPlan[dayKey]) workoutPlan[dayKey] = []; // Ensure day exists
    workoutPlan[dayKey].push({
        sessionId: generateSessionId(),
        sessionName: sessionName.trim(),
        exercises: []
    });
    renderDayBlocks();
}

function editSessionName(dayKey, sessionId, nameElement) {
    // Prevent re-triggering if already in edit mode
    if (nameElement.firstChild && nameElement.firstChild.nodeName === 'INPUT') {
        return;
    }

    const currentName = nameElement.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentName;
    input.className = 'inline-edit-input'; 
    
    // Simple width setting, can be refined with CSS if needed
    input.style.minWidth = '100px'; 
    // Try to match the original element's width if it's reasonable
    if (nameElement.offsetWidth > 50) {
        input.style.width = nameElement.offsetWidth + 'px';
    } else {
        input.style.width = '150px'; // Default width if original is too small
    }

    nameElement.replaceChildren(input); // Replace content with input
    input.focus();
    input.select();

    const saveName = () => {
        const newName = input.value.trim();
        if (newName && newName !== currentName) {
            const day = workoutPlan[dayKey];
            if (day) {
                const session = day.find(s => s.sessionId === sessionId);
                if (session) {
                    session.sessionName = newName;
                }
            }
        }
        renderDayBlocks(); 
    };

    let blurTimeout;
    input.addEventListener('blur', () => {
        clearTimeout(blurTimeout); 
        blurTimeout = setTimeout(saveName, 100); // Reduced delay slightly
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            clearTimeout(blurTimeout); 
            saveName();
        } else if (e.key === 'Escape') {
            clearTimeout(blurTimeout); 
            input.value = currentName; 
            saveName(); 
        }
    });
}

function editDayName(currentDayKey, nameElement) {
    // Prevent re-triggering if already in edit mode
    if (nameElement.firstChild && nameElement.firstChild.nodeName === 'INPUT') {
        return;
    }
    const currentName = nameElement.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentName;
    input.className = 'inline-edit-input';
    if (nameElement.offsetWidth > 50) {
        input.style.width = nameElement.offsetWidth + 'px';
    } else {
        input.style.width = '150px'; // Default width
    }

    nameElement.replaceChildren(input);
    input.focus();
    input.select();

    const saveDayName = () => {
        const newProposedName = input.value.trim();
        // currentDayKey is the original key of the day being edited.
        // currentName is textContent of h3, should be same as currentDayKey at start of edit.

        if (!newProposedName) { // Empty name, revert to original
            renderDayBlocks(); // This will use currentDayKey from workoutPlan
            return;
        }

        if (newProposedName === currentDayKey) { // No change, or changed then reverted to original exact key
            renderDayBlocks(); // Just redraw to remove input
            return;
        }

        // Check if newProposedName (case-insensitively) clashes with any *other* existing day key
        let clashFound = false;
        const newProposedNameLower = newProposedName.toLowerCase();
        for (const existingKey in workoutPlan) {
            if (
                existingKey.trim().toLowerCase() === newProposedNameLower &&
                existingKey !== currentDayKey
            ) {
                clashFound = true;
                break;
            }
        }

        if (clashFound) {
            alert(`Day name "${newProposedName}" (or a similar name) is already in use by another day. Please choose a different name.`);
            // workoutPlan remains unchanged. renderDayBlocks will restore currentDayKey for the edited day.
        } else {
            // No clash with *other* days. Proceed to update the key.
            // Note: newProposedName might differ from currentDayKey only by case, e.g. "Day 1" to "day 1".
            // This is a valid rename if "day 1" doesn't clash with another day.
            const updatedWorkoutPlan = {};
            Object.keys(workoutPlan).forEach(key => { // Iterate to maintain order as much as possible
                if (key === currentDayKey) {
                    updatedWorkoutPlan[newProposedName] = workoutPlan[currentDayKey]; // Use newProposedName as the key
                } else {
                    updatedWorkoutPlan[key] = workoutPlan[key];
                }
            });
            workoutPlan = updatedWorkoutPlan;
        }
        renderDayBlocks(); 
    };

    let blurTimeout;
    input.addEventListener('blur', () => {
        clearTimeout(blurTimeout);
        blurTimeout = setTimeout(saveDayName, 100);
    });
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            clearTimeout(blurTimeout);
            saveDayName();
        } else if (e.key === 'Escape') {
            clearTimeout(blurTimeout);
            input.value = currentName; // Revert visual
            // No need to change workoutPlan, saveDayName will handle re-render
            saveDayName(); 
        }
    });
}

function removeSessionFromDay(dayKey, sessionId) {
    if (!workoutPlan[dayKey] || workoutPlan[dayKey].length <= 1) {
        alert("Each day must have at least one session.");
        return;
    }
    if (!confirm("Are you sure you want to remove this session?")) return;
    workoutPlan[dayKey] = workoutPlan[dayKey].filter(s => s.sessionId !== sessionId);
    renderDayBlocks();
}

function loadPredefinedPlan(planName) {
    if (typeof predefinedPlansData === 'undefined' || !Array.isArray(predefinedPlansData)) {
        console.error("predefinedPlansData is not available.");
        alert("Error: Predefined plans data not loaded.");
        return;
    }
    const plan = predefinedPlansData.find(p => p.name === planName);
    if (!plan) return;

    const newWorkoutData = {}; // This will be populated directly from the predefined plan

    // Create mapping for different day formats
    const dayMapping = {
        // Map full day names to Day numbers
        'Monday': 'Day 1', 'Tuesday': 'Day 2', 'Wednesday': 'Day 3',
        'Thursday': 'Day 4', 'Friday': 'Day 5', 'Saturday': 'Day 6', 'Sunday': 'Day 7',
        // Map abbreviated formats like "Day X (Mon)" - keeping original mappings
        'Day 1 (Mon)': 'Day 1', 'Day 2 (Tue)': 'Day 2', 'Day 2 (Wed)': 'Day 2',
        'Day 3 (Thu)': 'Day 3', 'Day 3 (Fri)': 'Day 3', 'Day 4 (Sat)': 'Day 4',
        'Day 5 (Sun)': 'Day 5', // Add other specific mappings as needed
    };

    Object.entries(plan.days).forEach(([planDayKey, sessionsData]) => {
        let targetDayKey = dayMapping[planDayKey] || planDayKey; // Attempt direct map or use original key

        // Normalize to "Day X" format if possible
        const dayNumberMatch = targetDayKey.match(/Day\s*(\d+)/i);
        if (dayNumberMatch && dayNumberMatch[1]) {
            targetDayKey = `Day ${dayNumberMatch[1]}`; // Standardize to "Day X"
        } else if (planDayKey.match(/^Day\s*\d+$/i)) {
            // If the original planDayKey from plan.days is already "Day X", use it
            targetDayKey = planDayKey;
        }
        else {
            // If it's not mappable to "Day X" and not already "Day X", skip it
            // This ensures workoutPlan keys are consistently "Day X"
            console.warn(`Predefined plan day key: "${planDayKey}" (processed as "${targetDayKey}") does not conform to a recognized "Day X" format and will be skipped.`);
            return; // Go to the next entry in plan.days
        }
        
        // Ensure sessionsData is an array before mapping, and exercises within sessions are also arrays
        const sessionsArray = Array.isArray(sessionsData) ? sessionsData : [];
        
        newWorkoutData[targetDayKey] = sessionsArray.map((sess, index) => ({
            sessionId: generateSessionId(),
            sessionName: sess.sessionName || `Session ${index + 1}`,
            exercises: Array.isArray(sess.exercises) ? [...sess.exercises] : [] 
        }));
    });
    
    // If newWorkoutData is empty after processing (e.g., plan was empty or all days were skipped), create a default Day 1
    if (Object.keys(newWorkoutData).length === 0) {
        console.warn("Predefined plan resulted in an empty schedule or all days were skipped. Defaulting to a single empty day.");
        newWorkoutData['Day 1'] = [{ sessionId: generateSessionId(), sessionName: 'Session 1', exercises: [] }];
    }
    
    // Sort the days in the newWorkoutData by "Day X" number before assigning to workoutPlan
    const sortedDaysPlan = {};
    Object.keys(newWorkoutData)
        .sort((a, b) => {
            // Extract numbers for sorting (e.g., "Day 1", "Day 10")
            const numA = parseInt(a.match(/(\d+)/)[0]);
            const numB = parseInt(b.match(/(\d+)/)[0]);
            return numA - numB;
        })
        .forEach(dayKey => {
            sortedDaysPlan[dayKey] = newWorkoutData[dayKey];
        });

    workoutPlan = sortedDaysPlan;
    renderDayBlocks();
}

function addDay() {
    const dayKeys = Object.keys(workoutPlan);
    let newDayNumber = 1;
    if (dayKeys.length > 0) {
        const dayNumbers = dayKeys.map(key => parseInt(key.replace('Day ', ''))).filter(num => !isNaN(num));
        if (dayNumbers.length > 0) {
            newDayNumber = Math.max(...dayNumbers) + 1;
        } else {
            newDayNumber = dayKeys.length + 1; // Fallback if no "Day X" keys exist
        }
    }
    const newDayKey = `Day ${newDayNumber}`;
    workoutPlan[newDayKey] = [{ sessionId: generateSessionId(), sessionName: 'Session 1', exercises: [] }];
    renderDayBlocks();
    
    // Scroll to the newly added day
    setTimeout(() => {
        const newDayElement = document.querySelector(`[data-day-key="${newDayKey}"]`);
        if (newDayElement) {
            // Scroll the plan container to show the new day
            const planContainer = document.getElementById('plan-section-container');
            planContainer.scrollTop = planContainer.scrollHeight;
            
            // Add a brief highlight effect to make the new day more noticeable
            newDayElement.style.transition = 'background-color 0.5s ease';
            newDayElement.style.backgroundColor = '#f0f7ff'; // Light blue highlight
            setTimeout(() => {
                newDayElement.style.backgroundColor = '#f9f9f9'; // Fade back to original color
            }, 1000);
        }
    }, 50); // Small delay to ensure the DOM has updated
}

function removeDay(dayKey) {
    if (Object.keys(workoutPlan).length <= 1) {
        alert("The plan must have at least one day.");
        return;
    }
    
    // Check if the day is empty (no exercises in any session)
    const dayIsEmpty = workoutPlan[dayKey].every(session => 
        !session.exercises || session.exercises.length === 0
    );
    
    // If the day is empty, remove without confirmation
    // If it has exercises, show confirmation to prevent accidental data loss
    let shouldRemove = dayIsEmpty;
    
    if (!dayIsEmpty) {
        shouldRemove = confirm(`Are you sure you want to remove ${dayKey}? This action cannot be undone.`);
    }
    
    if (shouldRemove) {
        delete workoutPlan[dayKey];
        renderDayBlocks();
    }
}


/* ────── Drag & drop logic (Session-aware) ─────────────────── */
document.addEventListener('dragstart', e => {
  if (e.target.classList.contains('exercise-item') || (e.target.tagName === 'LI' && e.target.parentElement.classList.contains('session-exercises-list'))) {
    e.dataTransfer.setData('text/plain', e.target.dataset.id);
    const sourceType = e.target.closest('#exercise-list-container') ? 'sidebar' : 'plan';
    e.dataTransfer.setData('source-type', sourceType);
    if (sourceType === 'plan') {
        const sourceSessionLi = e.target.closest('.session-exercises-list');
        if (sourceSessionLi) { // Add null check
            e.dataTransfer.setData('source-day-key', sourceSessionLi.dataset.dayKey);
            e.dataTransfer.setData('source-session-id', sourceSessionLi.dataset.sessionId);
        }
    }
  }
});

document.body.addEventListener('dragover', e => {
  const fromPlan = e.dataTransfer.getData('source-type') === 'plan';
  if (fromPlan && !e.target.closest('.dropzone') && !e.target.closest('#exercise-list-container')) {
    e.preventDefault(); 
  }
});

document.body.addEventListener('drop', e => {
  const isFromPlan = e.dataTransfer.getData('source-type') === 'plan';
  const sourceDayKey = e.dataTransfer.getData('source-day-key');
  const sourceSessionId = e.dataTransfer.getData('source-session-id');
  const exerciseId = e.dataTransfer.getData('text/plain');

  if (isFromPlan && sourceDayKey && sourceSessionId && exerciseId && 
      !e.target.closest('.dropzone') && !e.target.closest('#exercise-list-container')) {
    e.preventDefault();
    const daySessions = workoutPlan[sourceDayKey];
    if (daySessions) { // Add null check
        const session = daySessions.find(s => s.sessionId === sourceSessionId);
        if (session) {
        const index = session.exercises.indexOf(exerciseId);
        if (index > -1) session.exercises.splice(index, 1);
        renderDayBlocks();
        }
    }
  }
});

function addDropzoneEventListeners() {
    document.querySelectorAll('.session-exercises-list.dropzone').forEach(zone => {
      zone.addEventListener('dragover', e => e.preventDefault());
      zone.addEventListener('drop', e => {
        e.preventDefault();
        const exerciseId = e.dataTransfer.getData('text/plain');
        if (!exerciseId) return;
        
        const targetDayKey = zone.dataset.dayKey;
        const targetSessionId = zone.dataset.sessionId;
        
        const sourceType = e.dataTransfer.getData('source-type');
        const sourceDayKey = e.dataTransfer.getData('source-day-key');
        const sourceSessionId = e.dataTransfer.getData('source-session-id');

        if (sourceType === 'plan' && sourceDayKey && sourceSessionId) {
            if (sourceDayKey !== targetDayKey || sourceSessionId !== targetSessionId) {
                const originDaySessions = workoutPlan[sourceDayKey];
                if (originDaySessions) { // Add null check
                    const originSession = originDaySessions.find(s => s.sessionId === sourceSessionId);
                    if (originSession) {
                        const index = originSession.exercises.indexOf(exerciseId);
                        if (index > -1) originSession.exercises.splice(index, 1);
                    }
                }
            }
        }
        
        const targetDaySessions = workoutPlan[targetDayKey];
        if (targetDaySessions) { // Add null check
            const targetSession = targetDaySessions.find(s => s.sessionId === targetSessionId);
            if (targetSession && !targetSession.exercises.includes(exerciseId)) {
                targetSession.exercises.push(exerciseId);
            }
        }
        renderDayBlocks();
      });
    });
}

/* ────── Initial Setup ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    if (typeof predefinedPlansData !== 'undefined' && Array.isArray(predefinedPlansData)) {
        predefinedPlansData.forEach(plan => {
            const option = document.createElement('option');
            option.value = plan.name;
            option.textContent = plan.name;
            predefinedPlanSelect.appendChild(option);
        });
    } else {
        console.error("Could not load predefined_plans_data.js or it's not an array.");
        const option = document.createElement('option');
        option.value = "";
        option.textContent = "Error loading plans";
        option.disabled = true;
        predefinedPlanSelect.appendChild(option);
    }

    predefinedPlanSelect.addEventListener('change', (e) => {
        if (e.target.value) {
            loadPredefinedPlan(e.target.value);
        }
    });

    // The Add New Day button is now created dynamically in renderDayBlocks()

    // Load "3-Day Beginner Strength" by default if it exists
    const defaultPlanName = "3-Day Beginner Strength";
    const defaultPlanExists = Array.from(predefinedPlanSelect.options).some(opt => opt.value === defaultPlanName);
    if (defaultPlanExists) {
        predefinedPlanSelect.value = defaultPlanName;
        loadPredefinedPlan(defaultPlanName);
    } else {
        renderDayBlocks();
    }
});
