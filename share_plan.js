/* ────── Share Functionality ───────────────────────────────────── */
// Share modal elements
const shareModal = document.getElementById('share-modal');
const shareModalClose = document.getElementById('share-modal-close');
const sharePlanBtn = document.getElementById('share-plan-btn');
const shareLinkInput = document.getElementById('share-link-input');
const copyLinkBtn = document.getElementById('copy-link-btn');
const shareTwitterBtn = document.getElementById('share-twitter');
const shareFacebookBtn = document.getElementById('share-facebook');
const shareLinkedInBtn = document.getElementById('share-linkedin');
const shareWhatsAppBtn = document.getElementById('share-whatsapp');

// Base URL for sharing
const baseShareUrl = 'https://nobody-qwert.github.io/training/plan_editor.html';

// Function to compress and encode the workout plan data
function encodeWorkoutPlan(plan) {
    try {
        // Make sure we're encoding the complete workout plan with all sessions and exercises
        // Deep clone the plan to avoid any reference issues
        const planToEncode = JSON.parse(JSON.stringify(plan));
        
        // Convert the plan object to a JSON string
        const jsonString = JSON.stringify(planToEncode);
        
        // Log the size of the data being encoded (for debugging)
        console.log(`Encoding workout plan: ${jsonString.length} characters`);
        
        // Use LZString for compression if available, otherwise use Base64
        let encodedData;
        if (typeof LZString !== 'undefined') {
            encodedData = LZString.compressToEncodedURIComponent(jsonString);
            console.log(`Compressed with LZString: ${encodedData.length} characters`);
        } else {
            // Fallback to Base64 encoding
            encodedData = btoa(encodeURIComponent(jsonString));
            console.log(`Encoded with Base64: ${encodedData.length} characters`);
        }
        
        return encodedData;
    } catch (error) {
        console.error('Error encoding workout plan:', error);
        alert('There was an error creating a shareable link. Please try again.');
        return null;
    }
}

// Function to decode the workout plan data from URL
function decodeWorkoutPlan(encodedData) {
    try {
        let jsonString;
        
        // Try LZString decompression first
        if (typeof LZString !== 'undefined') {
            try {
                jsonString = LZString.decompressFromEncodedURIComponent(encodedData);
                console.log(`Decompressed with LZString: ${jsonString ? jsonString.length : 0} characters`);
                
                // If result is null or undefined, fall back to Base64
                if (!jsonString) {
                    throw new Error('LZString decompression failed');
                }
            } catch (e) {
                console.log('LZString decompression failed, trying Base64');
                // Fallback to Base64 decoding
                try {
                    jsonString = decodeURIComponent(atob(encodedData));
                    console.log(`Decoded with Base64: ${jsonString.length} characters`);
                } catch (base64Error) {
                    console.error('Base64 decoding failed:', base64Error);
                    // Try direct URI decoding as last resort
                    jsonString = decodeURIComponent(encodedData);
                }
            }
        } else {
            // Fallback to Base64 decoding
            try {
                jsonString = decodeURIComponent(atob(encodedData));
            } catch (base64Error) {
                console.error('Base64 decoding failed:', base64Error);
                // Try direct URI decoding as last resort
                jsonString = decodeURIComponent(encodedData);
            }
        }
        
        // Parse the JSON string back to an object
        const decodedPlan = JSON.parse(jsonString);
        console.log('Successfully decoded plan:', decodedPlan);
        return decodedPlan;
    } catch (error) {
        console.error('Error decoding workout plan:', error);
        return null;
    }
}

// Function to generate a shareable URL
function generateShareableUrl() {
    const encodedPlan = encodeWorkoutPlan(workoutPlan);
    if (!encodedPlan) {
        alert('Error generating shareable link. Please try again.');
        return null;
    }
    
    return `${baseShareUrl}?plan=${encodedPlan}`;
}

// Function to open the share modal
function openShareModal() {
    const shareableUrl = generateShareableUrl();
    if (shareableUrl) {
        shareLinkInput.value = shareableUrl;
        shareModal.style.display = 'flex';
    }
}

// Function to close the share modal
function closeShareModal() {
    shareModal.style.display = 'none';
}

// Function to copy the share link to clipboard
function copyShareLink() {
    shareLinkInput.select();
    document.execCommand('copy');
    
    // Visual feedback
    const originalText = copyLinkBtn.textContent;
    copyLinkBtn.textContent = 'Copied!';
    setTimeout(() => {
        copyLinkBtn.textContent = originalText;
    }, 2000);
}

// Function to share on social media
function shareOnSocialMedia(platform) {
    const shareableUrl = shareLinkInput.value;
    const text = 'Check out this workout plan I created!';
    
    let shareUrl;
    
    switch (platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareableUrl)}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareableUrl)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareableUrl)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + shareableUrl)}`;
            break;
        default:
            return;
    }
    
    window.open(shareUrl, '_blank');
}

// Function to check URL for shared plan data
function checkUrlForSharedPlan() {
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const encodedPlan = urlParams.get('plan');
    
    console.log('URL parameter found:', encodedPlan ? 'Yes' : 'No');
    
    if (encodedPlan) {
        try {
            console.log('Attempting to decode plan from URL parameter');
            const decodedPlan = decodeWorkoutPlan(encodedPlan);
            
            if (decodedPlan && Object.keys(decodedPlan).length > 0) {
                console.log('Successfully decoded plan with days:', Object.keys(decodedPlan));
                console.log('Decoded plan content:', JSON.stringify(decodedPlan));
                
                // Clear the predefined plan selection when loading a shared plan
                if (predefinedPlanSelect) {
                    predefinedPlanSelect.value = "";
                }
                
                // IMPORTANT: Make a deep copy of the decoded plan to ensure we're not working with references
                workoutPlan = JSON.parse(JSON.stringify(decodedPlan));
                
                // Force a complete re-render of the plan
                setTimeout(() => {
                    // Render the day blocks with the new plan
                    renderDayBlocks();
                    console.log('Plan rendered from shared URL');
                }, 100);
                
                // Add a notification that this is a shared plan
                const notification = document.createElement('div');
                notification.textContent = 'Shared workout plan loaded successfully!';
                notification.style.backgroundColor = '#d4edda';
                notification.style.color = '#155724';
                notification.style.padding = '0.75rem 1.25rem';
                notification.style.marginBottom = '1rem';
                notification.style.borderRadius = '0.25rem';
                notification.style.textAlign = 'center';
                
                // Insert the notification before the plan-controls div
                const planControls = document.querySelector('.plan-controls');
                if (planControls && planControls.parentNode) {
                    planControls.parentNode.insertBefore(notification, planControls);
                    
                    // Auto-remove the notification after 5 seconds
                    setTimeout(() => {
                        notification.style.transition = 'opacity 1s ease';
                        notification.style.opacity = '0';
                        setTimeout(() => notification.remove(), 1000);
                    }, 5000);
                }
                
                return true;
            } else {
                console.error('Decoded plan is empty or invalid:', decodedPlan);
            }
        } catch (error) {
            console.error('Error loading shared plan:', error);
        }
    }
    
    return false;
}

// Add LZString library for compression if not already included
function loadLZString(callback) {
    if (typeof LZString === 'undefined') {
        console.log('Loading LZString library');
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/lz-string@1.4.4/libs/lz-string.min.js';
        script.onload = () => {
            console.log('LZString library loaded successfully');
            if (callback) callback();
        };
        script.onerror = () => {
            console.error('Failed to load LZString library');
            if (callback) callback();
        };
        document.head.appendChild(script);
    } else {
        if (callback) callback();
    }
}

// Initialize share functionality
function initializeShareFunctionality() {
    // Event listeners for share functionality
    sharePlanBtn.addEventListener('click', openShareModal);
    shareModalClose.addEventListener('click', closeShareModal);
    copyLinkBtn.addEventListener('click', copyShareLink);
    shareTwitterBtn.addEventListener('click', () => shareOnSocialMedia('twitter'));
    shareFacebookBtn.addEventListener('click', () => shareOnSocialMedia('facebook'));
    shareLinkedInBtn.addEventListener('click', () => shareOnSocialMedia('linkedin'));
    shareWhatsAppBtn.addEventListener('click', () => shareOnSocialMedia('whatsapp'));

    // Close modal when clicking outside the content
    shareModal.addEventListener('click', (e) => {
        if (e.target === shareModal) {
            closeShareModal();
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load LZString first, then initialize share functionality
    loadLZString(() => {
        initializeShareFunctionality();
        
        // Check if there's a shared plan in the URL
        const hasSharedPlan = checkUrlForSharedPlan();
        console.log('Shared plan found in URL:', hasSharedPlan);
    });
});
