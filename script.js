document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURE GIF DURATION HERE ---
    // Make sure to set this value accurately based on your actual GIF's length.
    const GIF_DURATION_MS = 1500; // Example: 1.5 seconds.
    const HALF_GIF_DURATION_MS = GIF_DURATION_MS / 2; // In this example: 750 ms
    // The cloud screen fade-out takes 0.5 seconds (matches CSS transition)
    const FADE_OUT_DURATION_MS = 500; 
    // ------------------------------------

    const initialDiv = document.getElementById('initialClick');
    const cloudsScreen = document.getElementById('cloudsScreen');
    const cloudImage = document.getElementById('cloud-image');
    const pageContent = document.querySelector('.page-content');
    
    // Get the GIF path from the data attribute
    const gifSrc = cloudImage.dataset.gifSrc;
    
    // ⭐ NEW: Check if the intro has already been completed (e.g., after submission) ⭐
    const introAlreadyDone = sessionStorage.getItem('introCompleted');
    
    // Function to skip the intro and show content immediately
    const skipIntro = () => {
        // Remove the initial click screen and the cloud screen immediately
        if (initialDiv) initialDiv.remove();
        if (cloudsScreen) cloudsScreen.remove(); 
        
        // Show content and enable scrolling
        pageContent.classList.add('loaded');
        document.body.style.overflowY = 'auto'; 
        document.body.style.overflowX = 'hidden';
    };

    // --- MAIN LOGIC ---

    if (introAlreadyDone) {
        // If the flag is set, skip the animation and show the content
        skipIntro();
        return; // Stop further execution of the intro logic
    }

    const finishIntro = () => {
        // 1. ***MODIFIED: DO NOT reduce opacity, just load content.***
        // cloudsScreen.classList.add('hidden'); <-- REMOVE THIS LINE
        
        // 2. Load the main content
        pageContent.classList.add('loaded');
        
         // 2. ***NEW: Start the cloud screen fade-out immediately***
        cloudsScreen.classList.add('fading'); 
        
        // 3. Remove the cloud screen element immediately to ensure content is interactive
        // We can do this immediately since there's no fade-out transition anymore.
        setTimeout(() => {
            cloudsScreen.remove(); 
            
            // ⭐ NEW: Enable the vertical scrollbar here! ⭐
            document.body.style.overflowY = 'auto'; 
        }, FADE_OUT_DURATION_MS); 
    };

    //initialDiv.addEventListener('click', () => {
    //    // 1. Initial button disappears immediately
    //    initialDiv.classList.add('hidden');
//
    //    // 2. Load the GIF source to start the animation
    //    cloudImage.src = gifSrc;
//
    //    // 3. Set the final timeout to trigger the completion when the GIF is done
    //    setTimeout(finishIntro, HALF_GIF_DURATION_MS); 
    //});
    if (initialDiv) {
        initialDiv.addEventListener('click', () => {
            initialDiv.classList.add('hidden');
            cloudImage.src = gifSrc;
            
            setTimeout(finishIntro, HALF_GIF_DURATION_MS); 
        });
    }
    
});