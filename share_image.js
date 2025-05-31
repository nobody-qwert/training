/* ────── Share Image Functionality ───────────────────────────────────── */

// Function to determine optimal image dimensions based on number of days
function getImageDimensions(dayCount) {
    if (dayCount <= 3) {
        return { width: 1200, height: 630, columns: 3 }; // Facebook optimal
    } else if (dayCount <= 6) {
        return { width: 1200, height: 900, columns: 3, rows: 2 };
    } else if (dayCount <= 9) {
        return { width: 1200, height: 1200, columns: 3, rows: 3 };
    } else if (dayCount <= 12) {
        return { width: 1200, height: 1400, columns: 3, rows: 4 };
    } else {
        // For very large plans, we'll use a fixed height and show what fits
        return { width: 1200, height: 1600, columns: 3, rows: Math.ceil(dayCount / 3) };
    }
}

// Function to generate the workout image template
function generateWorkoutImageTemplate(workoutPlan, planName = 'My Workout Plan') {
    const dayCount = Object.keys(workoutPlan).length;
    const dimensions = getImageDimensions(dayCount);
    
    // Create a container for the image
    const container = document.createElement('div');
    container.className = 'workout-image-container';
    container.style.cssText = `
        width: ${dimensions.width}px;
        height: ${dimensions.height}px;
        background-color: #fff;
        font-family: 'Helvetica Neue', Arial, sans-serif;
        position: absolute;
        left: -9999px;
        top: -9999px;
        overflow: hidden;
    `;
    
    // Create header
    const header = document.createElement('div');
    header.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 30px 40px;
        height: 100px;
        box-sizing: border-box;
    `;
    
    const logo = document.createElement('div');
    logo.textContent = 'Training Hub';
    logo.style.cssText = `
        font-size: 36px;
        font-weight: bold;
    `;
    
    const title = document.createElement('div');
    title.textContent = planName;
    title.style.cssText = `
        font-size: 24px;
        opacity: 0.95;
    `;
    
    header.appendChild(logo);
    header.appendChild(title);
    container.appendChild(header);
    
    // Create content area
    const content = document.createElement('div');
    content.style.cssText = `
        padding: 30px;
        height: calc(100% - 160px);
        box-sizing: border-box;
        overflow: hidden;
    `;
    
    // Create days grid
    const daysGrid = document.createElement('div');
    daysGrid.style.cssText = `
        display: grid;
        grid-template-columns: repeat(${dimensions.columns}, 1fr);
        gap: 20px;
        height: 100%;
    `;
    
    // Add each day
    Object.entries(workoutPlan).forEach(([dayKey, sessions]) => {
        const dayCard = createDayCard(dayKey, sessions);
        daysGrid.appendChild(dayCard);
    });
    
    content.appendChild(daysGrid);
    container.appendChild(content);
    
    // Create footer
    const footer = document.createElement('div');
    footer.style.cssText = `
        position: absolute;
        bottom: 0;
        width: 100%;
        background-color: #f9f9f9;
        text-align: center;
        padding: 15px;
        font-size: 16px;
        color: #666;
        border-top: 1px solid #e0e0e0;
        box-sizing: border-box;
        height: 60px;
    `;
    footer.textContent = 'Created with Training Hub • https://nobody-qwert.github.io/training/';
    container.appendChild(footer);
    
    return container;
}

// Function to create a day card for the image
function createDayCard(dayKey, sessions) {
    const dayCard = document.createElement('div');
    dayCard.style.cssText = `
        background-color: #f9f9f9;
        border-radius: 12px;
        border: 1px solid #e0e0e0;
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    `;
    
    // Day header
    const dayHeader = document.createElement('div');
    dayHeader.style.cssText = `
        font-weight: bold;
        font-size: 22px;
        margin-bottom: 15px;
        color: #333;
        border-bottom: 2px solid #eaeaea;
        padding-bottom: 10px;
    `;
    dayHeader.textContent = dayKey;
    dayCard.appendChild(dayHeader);
    
    // Sessions container
    const sessionsContainer = document.createElement('div');
    sessionsContainer.style.cssText = `
        flex: 1;
        overflow: hidden;
    `;
    
    sessions.forEach((session, index) => {
        if (index > 0) {
            // Add spacing between sessions
            const spacer = document.createElement('div');
            spacer.style.height = '15px';
            sessionsContainer.appendChild(spacer);
        }
        
        const sessionEl = createSessionElement(session);
        sessionsContainer.appendChild(sessionEl);
    });
    
    dayCard.appendChild(sessionsContainer);
    return dayCard;
}

// Function to create a session element for the image
function createSessionElement(session) {
    const sessionDiv = document.createElement('div');
    
    // Session name
    const sessionName = document.createElement('div');
    sessionName.style.cssText = `
        font-weight: 600;
        font-size: 18px;
        margin-bottom: 10px;
        padding: 8px 12px;
        background-color: #f0f0f0;
        border-radius: 6px;
    `;
    sessionName.textContent = session.sessionName;
    sessionDiv.appendChild(sessionName);
    
    // Exercise list
    const exerciseList = document.createElement('div');
    exerciseList.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 6px;
    `;
    
    // Add exercises (limit to prevent overflow)
    const maxExercises = 5; // Adjust based on available space
    const exercises = session.exercises || [];
    const displayExercises = exercises.slice(0, maxExercises);
    
    displayExercises.forEach(exerciseId => {
        const exercise = byId(exerciseId);
        if (exercise) {
            const exerciseItem = document.createElement('div');
            exerciseItem.style.cssText = `
                background-color: ${getCategoryColor(exercise.category)};
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 16px;
                position: relative;
                padding-left: 24px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            `;
            
            // Add bullet point
            const bullet = document.createElement('span');
            bullet.style.cssText = `
                position: absolute;
                left: 10px;
                color: #007BFF;
            `;
            bullet.textContent = '•';
            exerciseItem.appendChild(bullet);
            
            const exerciseName = document.createElement('span');
            exerciseName.textContent = exercise.name;
            exerciseItem.appendChild(exerciseName);
            
            exerciseList.appendChild(exerciseItem);
        }
    });
    
    // If there are more exercises, show count
    if (exercises.length > maxExercises) {
        const moreCount = exercises.length - maxExercises;
        const moreItem = document.createElement('div');
        moreItem.style.cssText = `
            padding: 8px 12px;
            font-size: 14px;
            color: #666;
            font-style: italic;
        `;
        moreItem.textContent = `+${moreCount} more exercise${moreCount > 1 ? 's' : ''}`;
        exerciseList.appendChild(moreItem);
    }
    
    sessionDiv.appendChild(exerciseList);
    
    // Add category tags
    const categories = [...new Set(exercises.map(id => byId(id)?.category).filter(Boolean))];
    if (categories.length > 0) {
        const tagsContainer = document.createElement('div');
        tagsContainer.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 10px;
        `;
        
        categories.slice(0, 3).forEach(category => {
            const tag = document.createElement('span');
            tag.style.cssText = `
                display: inline-block;
                padding: 4px 10px;
                border-radius: 20px;
                font-size: 12px;
                border: 1px solid rgba(0,0,0,0.1);
                background-color: ${getCategoryColor(category)};
            `;
            tag.textContent = category;
            tagsContainer.appendChild(tag);
        });
        
        sessionDiv.appendChild(tagsContainer);
    }
    
    return sessionDiv;
}

// Function to convert the template to an image using html2canvas
async function convertTemplateToImage(templateElement) {
    // Ensure html2canvas is loaded
    if (typeof html2canvas === 'undefined') {
        throw new Error('html2canvas library is not loaded');
    }
    
    // Temporarily add to document body
    document.body.appendChild(templateElement);
    
    try {
        // Convert to canvas
        const canvas = await html2canvas(templateElement, {
            scale: 2, // Higher quality
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff'
        });
        
        // Convert canvas to blob
        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                resolve({ url, blob, canvas });
            }, 'image/png');
        });
    } finally {
        // Remove template from DOM
        document.body.removeChild(templateElement);
    }
}

// Function to show image preview modal
function showImagePreview(imageData) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'image-preview-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 20px;
        box-sizing: border-box;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background-color: white;
        border-radius: 12px;
        max-width: 90%;
        max-height: 90%;
        display: flex;
        flex-direction: column;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    `;
    
    // Create header
    const header = document.createElement('div');
    header.style.cssText = `
        padding: 20px;
        border-bottom: 1px solid #e0e0e0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;
    
    const title = document.createElement('h3');
    title.textContent = 'Share Workout Plan as Image';
    title.style.margin = '0';
    
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 28px;
        cursor: pointer;
        color: #666;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    closeBtn.onclick = () => modal.remove();
    
    header.appendChild(title);
    header.appendChild(closeBtn);
    modalContent.appendChild(header);
    
    // Create image container
    const imageContainer = document.createElement('div');
    imageContainer.style.cssText = `
        padding: 20px;
        overflow: auto;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f5f5f5;
    `;
    
    const img = document.createElement('img');
    img.src = imageData.url;
    img.style.cssText = `
        max-width: 100%;
        max-height: 100%;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
    `;
    
    imageContainer.appendChild(img);
    modalContent.appendChild(imageContainer);
    
    // Create actions container
    const actions = document.createElement('div');
    actions.style.cssText = `
        padding: 20px;
        border-top: 1px solid #e0e0e0;
        display: flex;
        gap: 10px;
        justify-content: center;
        flex-wrap: wrap;
    `;
    
    // Download button
    const downloadBtn = document.createElement('button');
    downloadBtn.textContent = 'Download Image';
    downloadBtn.style.cssText = `
        padding: 10px 20px;
        background-color: #667eea;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 500;
    `;
    downloadBtn.onclick = () => downloadImage(imageData.url, 'workout-plan.png');
    
    // Share info text
    const shareInfo = document.createElement('div');
    shareInfo.style.cssText = `
        width: 100%;
        text-align: center;
        color: #666;
        font-size: 14px;
        margin-top: 10px;
    `;
    shareInfo.textContent = 'Download the image and share it on your favorite social media platform!';
    
    actions.appendChild(downloadBtn);
    actions.appendChild(shareInfo);
    modalContent.appendChild(actions);
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Close on overlay click
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    };
}

// Function to download the image
function downloadImage(dataUrl, filename) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Function to load html2canvas library if not already loaded
function loadHtml2Canvas(callback) {
    if (typeof html2canvas === 'undefined') {
        console.log('Loading html2canvas library');
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
        script.onload = () => {
            console.log('html2canvas library loaded successfully');
            if (callback) callback();
        };
        script.onerror = () => {
            console.error('Failed to load html2canvas library');
            alert('Failed to load image generation library. Please try again.');
        };
        document.head.appendChild(script);
    } else {
        if (callback) callback();
    }
}
