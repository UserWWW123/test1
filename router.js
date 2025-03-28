// Global p5 instance and sprites that persist across page changes
let p5Instance = null;
let currentPage = "/";
let rectangle, circle, triangle;

// Initialize p5 only once when the page first loads
window.addEventListener('load', () => {
    if (!p5Instance) {
        createPersistentSketch();
    }
});

function createPersistentSketch() {
    let sketch = (p) => {
        p.setup = () => {
            const canvas = p.createCanvas(600, 400);
            
            // Create sprites
            // Rectangle for home page
            rectangle = new p.Sprite(300, 100, 100, 50);
            rectangle.color = 'blue';
            rectangle.gravity = 1;
            rectangle.bounciness = 0.7;
            
            // Circle and triangle for about page
            circle = new p.Sprite(300, 50, 40);
            circle.color = 'red';
            circle.gravity = 10;
            circle.bounciness = 0.7;
            
            // Static triangle
            triangle = new p.Sprite(300, 300);
            triangle.color = 'yellow';
            triangle.static = true;
            // Create triangle shape using vertices
            triangle.vertices = [
                {x: -40, y: 40},
                {x: 40, y: 40},
                {x: 0, y: -40}
            ];
            
            // Initially hide all sprites
            rectangle.visible = false;
            circle.visible = false;
            triangle.visible = false;
        };

        p.draw = () => {
            if (currentPage === "/") {
                p.background("lightblue");
                // Show only rectangle on home page
                rectangle.visible = true;
                circle.visible = false;
                triangle.visible = false;
                
                // Reset rectangle position if it goes off screen
                if (rectangle.y > p.height + 100) {
                    rectangle.y = -50;
                    rectangle.velocity.y = 0;
                }
                
            } else if (currentPage === "/about") {
                p.background("green");
                // Show only circle and triangle on about page
                rectangle.visible = false;
                circle.visible = true;
                triangle.visible = true;
                
                // Reset circle position if it goes off screen
                if (circle.y > p.height + 100) {
                    circle.y = -50;
                    circle.velocity.y = 0;
                }
                
            } else {
                // Hide all sprites on other pages
                rectangle.visible = false;
                circle.visible = false;
                triangle.visible = false;
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
        
        // Only show canvas on home and about pages
        if (p5Instance) {
            if (path === '/' || path === '/about') {
                const containerId = path === '/' ? 'canvas-container' : 'canvas-container2';
                const container = document.getElementById(containerId);
                if (container) {
                    container.appendChild(p5Instance.canvas);
                }
            } else {
                // Remove canvas from DOM if we're on any other page
                if (p5Instance.canvas.parentElement) {
                    p5Instance.canvas.parentElement.removeChild(p5Instance.canvas);
                }
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
