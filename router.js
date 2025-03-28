// Global p5 instance that persists across page changes
let p5Instance = null;
let hasPlayedIntro = false;

// Initialize p5 only once when the page first loads
window.addEventListener('load', () => {
    if (!p5Instance) {
        initializeP5();
    }
});

function initializeP5() {
    let sketch = (p) => {
        p.setup = () => {
            // Create a canvas that will be used across all pages
            const canvas = p.createCanvas(600, 400);
            // Find or create canvas container
            let container = document.getElementById('canvas-container2');
            if (!container) {
                container = document.createElement('div');
                container.id = 'canvas-container2';
                document.querySelector('.page-container')?.appendChild(container);
            }
            canvas.parent(container);
            hasPlayedIntro = true;
        };

        p.draw = () => {
            // This will be updated based on the current page
            if (window.currentPage === '/') {
                p.background('lightblue');
                p.fill(0);
                p.textSize(20);
                p.text("This is the Home Page Canvas", 100, 200);
            } else if (window.currentPage === '/about') {
                p.background('green');
                p.fill(0);
                p.textSize(20);
                p.text("This is the About Page Canvas", 100, 200);
            } else {
                // Default for other pages
                p.background(240);
            }
        };
    };

    p5Instance = new p5(sketch);
}

const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const routes = {
    "/404": "/pages2/404.html",
    "/index.html": "/pages2/index.html",
    "/": "/pages2/index.html",
    "/about": "/pages2/about.html",
    "/lorem": "/pages2/lorem.html"
};

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes["/404"];
    
    try {
        const response = await fetch(route);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        
        document.getElementById("main-page").innerHTML = html;
        
        // Store the current page for the p5 sketch to use
        window.currentPage = path;
        
        // If p5 instance doesn't exist yet, create it
        if (!p5Instance) {
            initializeP5();
        } else {
            // If canvas container was replaced, re-parent the canvas
            const container = document.getElementById('canvas-container2');
            if (container && p5Instance.canvas.parentElement !== container) {
                container.appendChild(p5Instance.canvas);
            }
        }
    } catch (error) {
        console.error('Error loading page:', error);
        // Handle the error appropriately
        document.getElementById("main-page").innerHTML = '<h1>Error loading page</h1>';
    }
};

window.onpopstate = handleLocation;
window.route = route;

// Initialize the application
handleLocation();
