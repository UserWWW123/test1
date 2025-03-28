// Global p5 instance that persists across page changes
let p5Instance = null;
let currentPage = "/";

// Initialize p5 only once when the page first loads
window.addEventListener('load', () => {
    if (!p5Instance) {
        createPersistentSketch();
    }
});

function createPersistentSketch() {
    let sketch = (p) => {
        p.setup = () => {
            // Create a canvas that will be used across all pages
            const canvas = p.createCanvas(600, 400);
            // We'll parent this canvas to the appropriate container later
        };

        p.draw = () => {
            // Change drawing based on current page
            if (currentPage === "/") {
                p.background("lightblue");
                p.fill(0);
                p.textSize(20);
                p.text("This is the Home Page Canvas", 100, 200);
            } else if (currentPage === "/about") {
                p.background("green");
                p.fill(0);
                p.textSize(20);
                p.text("This is the About Page Canvas", 100, 200);
            } else if (currentPage === "/lorem") {
                p.background("orange");
                p.fill(0);
                p.textSize(20);
                p.text("This is the Lorem Page Canvas", 100, 200);
            } else {
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
        
        // Update current page
        currentPage = path;
        
        // Initialize p5 if it doesn't exist
        if (!p5Instance) {
            createPersistentSketch();
        }
        
        // Move the canvas to the appropriate container
        if (p5Instance) {
            let containerId = 'canvas-container';
            if (path === '/about') {
                containerId = 'canvas-container2';
            } else if (path === '/lorem') {
                containerId = 'canvas-container3';
            }
            
            const container = document.getElementById(containerId);
            if (container) {
                container.appendChild(p5Instance.canvas);
            }
        }
        
    } catch (error) {
        console.error('Error loading page:', error);
        document.getElementById("main-page").innerHTML = '<h1>Error loading page</h1>';
    }
};

window.onpopstate = handleLocation;
window.route = route;

// Override p5play intro function globally
if (!window.p5play) {
    window.p5play = {};
}

window.p5play.playIntro = function() {
    console.log("p5play intro disabled");
    return Promise.resolve();
};

// Initialize the application
handleLocation();
