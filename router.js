// Global p5 instance that persists across page changes
let p5Instance = null;
let currentPage = "/";

// Separate sprite collections for each page
let homeSprites = {};
let aboutSprites = {};

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
            
            // Initialize each page's setup
            setupHomePage(p);
            setupAboutPage(p);
        };

        p.draw = () => {
            // Call the appropriate draw function based on current page
            if (currentPage === "/") {
                drawHomePage(p);
                updateHomePage(p);
            } else if (currentPage === "/about") {
                drawAboutPage(p);
                updateAboutPage(p);
            }
        };
    };

    p5Instance = new p5(sketch);
}

// Home page functions
function setupHomePage(p) {
    // Create rectangle for home page
    homeSprites.rectangle = new p.Sprite(300, 100, 100, 50);
    homeSprites.rectangle.color = 'blue';
    homeSprites.rectangle.gravity = 1;
    homeSprites.rectangle.bounciness = 0.7;
    
    // Add more home page sprites as needed
    // homeSprites.anotherSprite = new p.Sprite(...);
    
    // Hide all home sprites initially
    for (let sprite in homeSprites) {
        homeSprites[sprite].visible = false;
    }
}

function drawHomePage(p) {
    p.background("lightblue");
    
    // Show all home sprites
    for (let sprite in homeSprites) {
        homeSprites[sprite].visible = true;
    }
    
    // Hide all about sprites
    for (let sprite in aboutSprites) {
        aboutSprites[sprite].visible = false;
    }
}

function updateHomePage(p) {
    // Reset rectangle position if it goes off screen
    if (homeSprites.rectangle.y > p.height + 100) {
        homeSprites.rectangle.y = -50;
        homeSprites.rectangle.velocity.y = 0;
    }
    
    // Add more home page specific updates
}

// About page functions
function setupAboutPage(p) {
    // Create circle for about page
    aboutSprites.circle = new p.Sprite(300, 50, 40);
    aboutSprites.circle.color = 'red';
    aboutSprites.circle.gravity = 10;
    aboutSprites.circle.bounciness = 0.7;
    
    // Create triangle for about page
    aboutSprites.triangle = new p.Sprite(300, 300);
    aboutSprites.triangle.color = 'yellow';
    aboutSprites.triangle.static = true;
    aboutSprites.triangle.vertices = [
        {x: -40, y: 40},
        {x: 40, y: 40},
        {x: 0, y: -40}
    ];
    
    // Set up collisions
    aboutSprites.circle.collides(aboutSprites.triangle);
    
    // Hide all about sprites initially
    for (let sprite in aboutSprites) {
        aboutSprites[sprite].visible = false;
    }
}

function drawAboutPage(p) {
    p.background("green");
    
    // Show all about sprites
    for (let sprite in aboutSprites) {
        aboutSprites[sprite].visible = true;
    }
    
    // Hide all home sprites
    for (let sprite in homeSprites) {
        homeSprites[sprite].visible = false;
    }
}

function updateAboutPage(p) {
    // Reset circle position if it goes off screen
    if (aboutSprites.circle.y > p.height + 100) {
        aboutSprites.circle.y = -50;
        aboutSprites.circle.velocity.y = 0;
    }
    
    // Add more about page specific updates
}
