// Flag to track if intro has been played
let hasPlayedIntro = false;

// Store the current p5 instance
let p5Instance = null;

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
        
        // Remove existing p5 instance if it exists
        if (p5Instance) {
            p5Instance.remove();
            p5Instance = null;
        }
        
        document.getElementById("main-page").innerHTML = html;
        
        // Create the appropriate sketch based on the current path
        if (path === "/") {
            createHomeSketch();
        } else if (path === "/about") {
            createAboutSketch();
        }
        // Add more page-specific sketches as needed
        
    } catch (error) {
        console.error('Error loading page:', error);
        document.getElementById("main-page").innerHTML = '<h1>Error loading page</h1>';
    }
};

// Create the home page sketch
function createHomeSketch() {
    let sketch = (p) => {
        p.setup = () => {
            const canvas = p.createCanvas(600, 400);
            const container = document.getElementById('canvas-container');
            if (container) {
                canvas.parent(container);
            }
            p.background("lightblue");
        };

        p.draw = () => {
            p.background("lightblue");
            p.fill(0);
            p.textSize(20);
            p.text("This is the Home Page Canvas", 100, 200);
        };
    };

    // Create new p5 instance with the sketch
    p5Instance = new p5(sketch);
}

// Create the about page sketch
function createAboutSketch() {
    let sketch = (p) => {
        p.setup = () => {
            const canvas = p.createCanvas(600, 400);
            const container = document.getElementById('canvas-container2');
            if (container) {
                canvas.parent(container);
            }
            p.background("green");
        };

        p.draw = () => {
            p.background("green");
            p.fill(0);
            p.textSize(20);
            p.text("This is the About Page Canvas", 100, 200);
        };
    };

    // Create new p5 instance with the sketch
    p5Instance = new p5(sketch);
}

window.onpopstate = handleLocation;
window.route = route;

// Override p5play intro function globally
// This needs to be done before p5play is loaded
if (!window.p5play) {
    window.p5play = {};
}

// Store the original playIntro function if it exists
const originalPlayIntro = window.p5play.playIntro;

// Replace with our version that only plays once
window.p5play.playIntro = function() {
    if (hasPlayedIntro) {
        console.log("Skipping p5play intro (already played)");
        return Promise.resolve();
    }
    
    console.log("Playing p5play intro (first time only)");
    hasPlayedIntro = true;
    
    // Either call original or return resolved promise
    if (originalPlayIntro) {
        return originalPlayIntro.apply(this, arguments);
    }
    return Promise.resolve();
};

// Initialize the application
handleLocation();
