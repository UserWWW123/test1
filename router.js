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
            canvas.parent('main-page');
            
            // Store that we've played the intro
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
    404: "/pages2/404.html",
    "/index.html": "/pages2/index.html",
    "/": "/pages2/index.html",
    "/about": "/pages2/about.html",
    "/lorem": "/pages2/lorem.html",
};

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    
    // Create a temporary container to hold the HTML
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = html;
    
    // Find the content element in the loaded HTML
    const contentElement = tempContainer.querySelector('#content') || tempContainer;
    
    // Update only the content part of the page
    const mainPage = document.getElementById("main-page");
    
    // Create or update the content div
    let contentDiv = mainPage.querySelector('#content');
    if (!contentDiv) {
        contentDiv = document.createElement('div');
        contentDiv.id = 'content';
        mainPage.appendChild(contentDiv);
    }
    
    contentDiv.innerHTML = contentElement.innerHTML;
    
    // Store the current page for the p5 sketch to use
    window.currentPage = path;
    
    // If p5 instance doesn't exist yet, create it
    if (!p5Instance) {
        initializeP5();
    }
};

window.onpopstate = handleLocation;
window.route = route;

// Initialize the application
handleLocation();
