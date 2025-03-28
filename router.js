// Create a script element to inject code that will run before p5play loads
const disableIntroScript = document.createElement('script');
disableIntroScript.textContent = `
    // Override the playIntro function before it's defined
    window.p5play = window.p5play || {};
    window.p5play.playIntro = function() { 
        console.log("p5play intro disabled");
        return Promise.resolve(); // Return a resolved promise to continue initialization
    };
`;

// Insert this script at the beginning of the head to ensure it runs first
document.head.insertBefore(disableIntroScript, document.head.firstChild);

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
    document.getElementById("main-page").innerHTML = html;

    if (path === "/") {
        startP5Sketch();
    }
    if (path === "/about") {
        startP5Sketch2();
    }
};

window.onpopstate = handleLocation;
window.route = route;

let p5Instance = null;
const startP5Sketch = () => {
    if(p5Instance){
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

const startP5Sketch2 = () => {
    if(p5Instance){
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

// Initialize the application
handleLocation();
