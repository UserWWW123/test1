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

handleLocation();

let p5Instance = null;
const startP5Sketch = () => {

    if (!localStorage.getItem('introPlayed')) {
        playIntro();
        localStorage.setItem('introPlayed', 'true');  // Mark as played
    }

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
            p.text("This is the About Page Canvas", 100, 200);
        };
    };

    p5Instance = new p5(sketch, "canvas-container"); // Attach to a div in about.html
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

    p5Instance = new p5(sketch, "canvas-container2"); // Attach to a div in about.html
};

const playIntro = () => {
    const introSprite = createSprite(300, 200, 50, 50);
    introSprite.setAnimation('introAnimation'); // Add your intro animation here
    introSprite.play(); // Example play intro animation
    console.log("IntroPlayed");
};