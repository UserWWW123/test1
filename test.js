
window.onload = function () {
    const path = window.location.pathname.split("/");

    switch (path[0]) {
        case "":
            loadPage("home");
            break;
        case "about":
            loadPage("about");
            break;
        case "pricing":
            loadPage("pricing");
            break;
        default:
            loadPage("404");
            break;
    }

    document.querySelectorAll(".menu__item").forEach((item) => {
        item.addEventListener("click", function () {
            const path = item.getAttribute("value");
            loadPage(path);
            window.history.pushState("", "", path);
        });
    });

    function loadPage($path) {
        if ($path == "") return;

        const container = document.getElementById("container");

        const request = new XMLHttpRequest();
        request.open("GET", "pages/" + $path + ".html");
        request.send();
        request.onload = function () {
            if (request.status == 200) {
                container.innerHTML = request.responseText;
                document.title = $path;

                removeAllCanvases(); // Remove all existing canvases before creating a new one

                if ($path === "home") {
                    setupCanvasHome(); // Create home canvas
                } else if ($path === "pricing") {
                    setupCanvasPricing(); // Create pricing canvas
                }
            }
        };
    }

    let homeCanvas = null;
    let pricingCanvas = null;

    function setupCanvasHome() {
        const box = document.getElementById("box");
        if (box && !homeCanvas) { //if canvas is not created yet. 
            homeCanvas = new p5(homeSketch, 'box');
        }
    }

    function setupCanvasPricing() {
        const pricingBox = document.getElementById("pricing-box");
        if (pricingBox && !pricingCanvas) {
            pricingCanvas = new p5(pricingSketch, 'pricing-box');
        }
    }

    function removeAllCanvases() {
        if (homeCanvas) {
            homeCanvas.remove();
            homeCanvas = null;
        }
        if (pricingCanvas) {
            pricingCanvas.remove();
            pricingCanvas = null;
        }
    }

    const homeSketch = (p) => {
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

    const pricingSketch = (p) => {
        p.setup = () => {
            p.createCanvas(600, 400);
            p.background("lightgreen");
        };

        p.draw = () => {
            p.background("lightgreen");
            p.fill(0);
            p.textSize(20);
            p.text("This is the Pricing Page Canvas", 100, 200);
        };
    };
};
