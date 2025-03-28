// Single global p5 instance
let globalP5Instance = null;

// Track current page and sprites
let currentPage = '/';
let currentSprites = [];

// Initialize p5 only once
function initializeP5() {
    // Try to disable p5play intro animation
    if (!window.p5play) window.p5play = {};
    window.p5play.playIntro = () => Promise.resolve();
    window._hasP5PlayIntroPlayed = true;
    
    const sketch = (p) => {
        p.setup = () => {
            const canvas = p.createCanvas(600, 400);
            
            // Find or create canvas container
            let container = document.getElementById('canvas-container2');
            if (!container) {
                container = document.createElement('div');
                container.id = 'canvas-container2';
                document.querySelector('.page-container')?.appendChild(container);
            }
            canvas.parent(container);
            
            console.log("Global p5 instance initialized");
        };
        
        p.draw = () => {
            // Update based on current page
            if (currentPage === '/') {
                p.background('pink');
            } else if (currentPage === '/about') {
                p.background('lightblue');
            } else if (currentPage === '/lorem') {
                p.background('darkblue');
            } else {
                p.background(240);
            }
            
            // Any additional page-specific drawing can be done here
        };
    };
    
    globalP5Instance = new p5(sketch);
}

// Page-specific setup functions
const pageSetups = {
    '/': () => {
        clearSprites();
        
        // Create sprites for home page
        const p = globalP5Instance;
        
        const circle = new p.Sprite(200, 200, 50);
        circle.color = 'red';
        
        const rectangle = new p.Sprite(400, 200, 80, 40);
        rectangle.color = 'purple';
        
        // Store references to sprites
        currentSprites.push(circle, rectangle);
        
        // Add custom update behavior
        circle.update = function() {
            this.rotation += 0.01;
        };
        
        rectangle.update = function() {
            this.position.y = 200 + Math.sin(p.frameCount * 0.05) * 50;
        };
        
        console.log("Home page sprites created");
    },
    
    '/about': () => {
        clearSprites();
        
        // Create sprites for about page
        const p = globalP5Instance;
        
        const triangle = new p.Sprite(300, 200);
        triangle.color = 'yellow';
        triangle.collider = 'none';
        
        // Custom triangle shape
        triangle.draw = () => {
            p.fill(triangle.color);
            p.noStroke();
            p.triangle(0, 30, -30, -15, 30, -15);
        };
        
        // Add custom update behavior
        triangle.update = function() {
            this.scale = 1 + Math.sin(p.frameCount * 0.05) * 0.2;
            this.rotation += 0.02;
        };
        
        // Store reference to sprite
        currentSprites.push(triangle);
        
        console.log("About page sprites created");
    },
    
    '/lorem': () => {
        clearSprites();
        
        // Create sprites for lorem page
        const p = globalP5Instance;
        
        // Create stars
        for (let i = 0; i < 50; i++) {
            const star = new p.Sprite(
                p.random(p.width),
                p.random(p.height),
                p.random(2, 5)
            );
            star.color = 'white';
            star.collider = 'none';
            
            // Add custom update behavior
            star.update = function() {
                this.scale = 0.5 + Math.random() * 0.5;
            };
            
            // Store reference to sprite
            currentSprites.push(star);
        }
        
        console.log("Lorem page sprites created");
    }
};

// Helper function to clear all sprites
function clearSprites() {
    currentSprites.forEach(sprite => {
        if (sprite && sprite.remove) {
            sprite.remove();
        }
    });
    currentSprites = [];
    console.log("All sprites cleared");
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
        
        // Initialize p5 if not already done
        if (!globalP5Instance) {
            initializeP5();
        }
        
        // Setup page-specific sprites
        if (pageSetups[path]) {
            pageSetups[path]();
        } else {
            // Clear sprites for pages without specific setup
            clearSprites();
        }
        
        // Make sure canvas is in the right container
        const container = document.getElementById('canvas-container2');
        if (container && globalP5Instance.canvas && globalP5Instance.canvas.parentElement !== container) {
            container.appendChild(globalP5Instance.canvas);
        }
    } catch (error) {
        console.error('Error loading page:', error);
        document.getElementById("main-page").innerHTML = '<h1>Error loading page</h1>';
    }
};

window.onpopstate = handleLocation;
window.route = route;

// Initialize the application
handleLocation();
