// Track if intro has been played
let hasPlayedIntro = false;

// Disable p5play intro animation globally
if (!window.p5play) {
    window.p5play = {};
}

window.p5play.playIntro = function() {
    console.log("p5play intro disabled");
    return Promise.resolve();
};

// Current active p5 instance
let currentP5Instance = null;

// Define sketch functions for each route
const sketches = {
    '/': (p) => {
        let circle, rectangle;
        
        p.setup = () => {
            const canvas = p.createCanvas(600, 400);
            p.background('pink');
            
            // Create sprites for home page
            circle = new p.Sprite(200, 200, 50);
            circle.color = 'red';
            
            rectangle = new p.Sprite(400, 200, 80, 40);
            rectangle.color = 'purple';
            
            console.log("Home page canvas created with circle and rectangle");
        };
        
        p.draw = () => {
            p.background('pink');
            
            // Custom drawing/animation for home page
            circle.rotation += 0.01;
            rectangle.position.y = 200 + Math.sin(p.frameCount * 0.05) * 50;
        };
    },
    
    '/about': (p) => {
        let triangle;
        
        p.setup = () => {
            const canvas = p.createCanvas(600, 400);
            p.background('lightblue');
            
            // Create sprites for about page
            triangle = new p.Sprite(300, 200);
            triangle.color = 'yellow';
            triangle.collider = 'none'; // No physics collision
            
            // Custom triangle shape
            triangle.draw = () => {
                p.fill(triangle.color);
                p.noStroke();
                p.triangle(0, 30, -30, -15, 30, -15);
            };
            
            console.log("About page canvas created with triangle");
        };
        
        p.draw = () => {
            p.background('lightblue');
            
            // Custom drawing/animation for about page
            triangle.scale = 1 + Math.sin(p.frameCount * 0.05) * 0.2;
            triangle.rotation += 0.02;
        };
    },
    
    '/lorem': (p) => {
        let stars = [];
        
        p.setup = () => {
            const canvas = p.createCanvas(600, 400);
            p.background('darkblue');
            
            // Create stars for lorem page
            for (let i = 0; i < 50; i++) {
                let star = new p.Sprite(
                    p.random(canvas.width),
                    p.random(canvas.height),
                    p.random(2, 5)
                );
                star.color = 'white';
                star.collider = 'none';
                stars.push(star);
            }
            
            console.log("Lorem page canvas created with stars");
        };
        
        p.draw = () => {
            p.background('darkblue');
            
            // Make stars twinkle
            stars.forEach(star => {
                star.scale = 0.5 + Math.random() * 0.5;
            });
        };
    }
};

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
        
        // Store the current page
        window.currentPage = path;
        
        // Remove existing canvas if it exists
        if (currentP5Instance) {
            currentP5Instance.remove();
            currentP5Instance = null;
            console.log("Previous canvas removed");
        }
        
        // Create new canvas if there's a sketch for this route
        if (sketches[path]) {
            // Find or create canvas container
            let container = document.getElementById('canvas-container2');
            if (!container) {
                container = document.createElement('div');
                container.id = 'canvas-container2';
                document.querySelector('.page-container')?.appendChild(container);
            }
            
            // Create new p5 instance with the appropriate sketch
            currentP5Instance = new p5(sketches[path], 'canvas-container2');
            console.log(`Created new canvas for ${path}`);
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
