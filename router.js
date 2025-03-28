const route = (event) => {
    event = event || window.event;
    event.preventDefault();  // Prevent default link behavior
    const url = event.target.href;  // Get the href of the clicked link
    window.history.pushState({}, "", url);  // Change the URL in the browser without reloading
    handleLocation();  // Handle the location change
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
    const route = routes[path] || routes[404];  // Default to 404 if route is not found
    const html = await fetch(route).then((data) => data.text());  // Fetch the HTML content for the route
    document.getElementById("main-page").innerHTML = html;  // Inject the content into the page

    // Trigger p5.js sketch based on the route
    if (path === "/") {
        startP5Sketch();
    } else if (path === "/about") {
        startP5Sketch2();
    }
};

// Handle the back/forward navigation
window.onpopstate = handleLocation;

// Run the initial load when the page is first loaded or reloaded
handleLocation();

// When links are clicked, route them correctly
document.querySelectorAll('a').forEach((link) => {
    link.onclick = route;
});

// p5.js Sketch for Home page
let p5Instance = null;
const startP5Sketch = () => {
    if (p5Instance) {
        p5Instance.remove();
    }
    let sketch = (p) => {
        p.setup = () => {
            p.createCanvas(600, 400);
            p.background("lightblue");
        };
        p.draw = () => {
            p.background("lightblue");
            p.fill(0);
            p.textSize(20);
            p.text("This is the Home Page Canvas", 100, 200);
        };
    };
    p5Instance = new p5(sketch, "canvas-container");
};

// p5.js Sketch for About page
const startP5Sketch2 = () => {
    if (p5Instance) {
        p5Instance.remove();
    }
    let sketch = (p) => {
        p.setup = () => {
            p.createCanvas(600, 400);
            p.background("lightblue");
        };
        p.draw = () => {
            p.background("green");
            p.fill(0);
            p.textSize(20);
            p.text("This is the About Page Canvas", 100, 200);
        };
    };
    p5Instance = new p5(sketch, "canvas-container2");
};
