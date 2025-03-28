// Disable p5play intro animation globally
if (!window.p5play) {
    window.p5play = {};
}

window.p5play.playIntro = function() {
    console.log("p5play intro disabled");
    return Promise.resolve();
};

// Map of canvas instances by route
const canvasInstances = {};

// Map of div IDs to use for each route
const routeDivMap = {
    '/variable-declaration': 'overlapVariableDeclaration',
    '/box': 'box',
    '/const-declaration': 'overlapVariableDeclaration2',
    '/var-declaration': 'overlapVariableDeclaration3'
};

// Original sketch functions
const s1 = (p) => {
    let shipYellowimg, alienGreenimg, alienBiegeimg, alienYellowimg, shipYellowimg2;
    let currentSprite = null;

    p.preload = () => {
        shipYellowimg = p.loadImage("assets/ufoYellow.png");
        shipYellowimg2 = p.loadImage("assets/ufoYellow_damage2.png");
        alienBiegeimg = p.loadImage("assets/alienBiege_front.png");
        alienGreenimg = p.loadImage("assets/alienGreen_front.png");
        alienYellowimg = p.loadImage("assets/alienYellow_front.png");
    };

    p.setup = () => {
        p.createCanvas(600, 400);
        p.background("white");
        p.world.gravity.y = 10;
        let correctUFO = document.getElementById('callUFO');
        let UFOButton = document.getElementById('submitUFOName');

        if (correctUFO && UFOButton) {
            UFOButton.addEventListener("click", () => {
                let userAnswer = document.getElementById('inputUFO').value.trim(); 
                userAnswer = userAnswer.replace(/\s+/g, '');
                if (userAnswer === 'letufo;') {
                    shipYellow = new p.Sprite(100,270);
                    shipYellow.img = shipYellowimg;
                    shipYellow.image.scale = 2.5;
                    shipYellow.width = 100;
                    shipYellow.height = 20;
                    shipYellow.collider = 'static';
                    shipYellow.debug = true;
                    correctUFO.innerHTML = "Variable 'ufo' is created!"
                } 
            });
        }

        let alienValue = document.getElementById('callAlien');
        let alienButton = document.getElementById('submitAlien');
        
        if (alienValue && alienButton) {
            alienButton.addEventListener("click", () => {
                let answer = document.getElementById('inputAlien').value.trim(); 
                answer = answer.replace(/\s+/g,'');
                if (currentSprite) {
                    currentSprite.remove();
                    alienValue.innerHTML = "";
                }

                if (answer === "ufo='alien_Biege';" || answer === 'ufo="alien_Biege";') {
                    currentSprite = new p.Sprite(100, 70);
                    currentSprite.img = alienBiegeimg;
                    alienValue.innerHTML = "Value 'alien_Biege' is added! Value of the ufo is alien_Biege!";
                } else if (answer ===  "ufo='alien_Yellow';" || answer ===  'ufo="alien_Yellow";') {
                    currentSprite = new p.Sprite(100, 70);
                    currentSprite.img = alienYellowimg;
                    alienValue.innerHTML = "Value 'alien_Yellow' is added! Value of the ufo is alien_Yellow!";
                } else if (answer ===  "ufo='alien_Green';" || answer ===  'ufo="alien_Green";') {
                    currentSprite = new p.Sprite(100, 70);
                    currentSprite.debug = true;
                    currentSprite.img = alienGreenimg;
                    alienValue.innerHTML = "Value 'alien_Green' is added! Value of the ufo is alien_Green!";
                }
                if (currentSprite) {
                    currentSprite.image.scale = 1.5;
                    currentSprite.width = 100;
                    currentSprite.height = 140;
                    currentSprite.collider = 'dynamic';
                }
            });
        }
    };

    p.draw = () => {
        p.background("white");
    };
};

const s2 = (p) => {
    let boximg, woodbimg, woodwimg, woodgimg;
    let currentSprite = null;

    p.preload = () => {
        boximg = p.loadImage("assets/box.png");
        woodbimg = p.loadImage("assets/wood-brown.png");
        woodwimg = p.loadImage("assets/wood-white.png");
        woodgimg = p.loadImage("assets/wood-green.png");    
    };

    p.setup = () => {
        p.createCanvas(600, 400);
        p.background("white");
        p.world.gravity.y = 10;

        let correctBox = document.getElementById('callBox');
        let variableButton = document.getElementById('submitBoxName');

        if (correctBox && variableButton) {
            variableButton.addEventListener("click", () => {
                let userAnswer = document.getElementById('inputBox').value.trim(); 
                userAnswer = userAnswer.replace(/\s+/g, '');
                if (userAnswer === 'letbox;') {
                    box = new p.Sprite(100,270,100,100);
                    box.img = boximg;
                    box.image.scale = 2.5;
                    box.width = 100;
                    box.height = 20;
                    box.collider = 'static';
                    correctBox.innerHTML = "Variable 'box' is created!"
                } 
            });
        }

        let brownValue = document.getElementById('callValue');
        let boxButton = document.getElementById('submitVariableName');
        
        if (brownValue && boxButton) {
            boxButton.addEventListener("click", () => {
                let answer = document.getElementById('inputVariable').value.trim(); 
                answer = answer.replace(/\s+/g,'');
                if (currentSprite) {
                    currentSprite.remove();
                    brownValue.innerHTML = "";
                }

                if (answer === "box='wood-brown';" || answer === 'box="wood-brown";') {
                    currentSprite = new p.Sprite(100, 70, 100, 100);
                    currentSprite.img = woodbimg;
                    brownValue.innerHTML = "Value 'wood_brown' is added! Value of the Box is wood_brown!";
                } else if (answer === "box='wood-white';" || answer === 'box="wood-white";') {
                    currentSprite = new p.Sprite(100, 70, 100, 100);
                    currentSprite.img = woodwimg;
                    brownValue.innerHTML = "Value 'wood_white' is added! Value of the Box is wood_white!";
                } else if (answer === "box='wood-green';" || answer === 'box="wood-green";') {
                    currentSprite = new p.Sprite(100, 70, 100, 100);
                    currentSprite.img = woodgimg;
                    brownValue.innerHTML = "Value 'wood_green' is added! Value of the Box is wood_green!";
                }
                if (currentSprite) {
                    currentSprite.image.scale = 1.5;
                    currentSprite.width = 100;
                    currentSprite.height = 100;
                    currentSprite.collider = 'dynamic';
                }
            });
        }
    };

    p.draw = () => {
        p.background("white");
    };
};

const s3 = (p) => {
    let shipYellowimg, alienGreenimg, alienBiegeimg, alienYellowimg, shipYellowimg2;
    let currentSprite = null;
    let spriteCount = 0;

    p.preload = () => {
        shipYellowimg = p.loadImage("assets/ufoYellow.png");
        shipYellowimg2 = p.loadImage("assets/ufoYellow_damage2.png");
        alienBiegeimg = p.loadImage("assets/alienBiege_front.png");
        alienGreenimg = p.loadImage("assets/alienGreen_front.png");
        alienYellowimg = p.loadImage("assets/alienYellow_front.png");
    };

    p.setup = () => {
        p.createCanvas(600, 400);
        p.background("white");
        p.world.gravity.y = 10;
        let correctUFO = document.getElementById('callUFO2');
        let UFOButton = document.getElementById('submitUFOName2');

        if (correctUFO && UFOButton) {
            UFOButton.addEventListener("click", () => {
                let userAnswer = document.getElementById('inputUFO2').value.trim(); 
                userAnswer = userAnswer.replace(/\s+/g, '');
                if (userAnswer === 'constufo;') {
                    shipYellow = new p.Sprite(100,270);
                    shipYellow.img = shipYellowimg;
                    shipYellow.image.scale = 2.5;
                    shipYellow.width = 100;
                    shipYellow.height = 20;
                    shipYellow.collider = 'static';
                    shipYellow.debug = true;
                    correctUFO.innerHTML = "Variable 'ufo' is created!"
                } 
            });
        }

        let alienValue = document.getElementById('callAlien2');
        let alienButton = document.getElementById('submitAlien2');
        
        if (alienValue && alienButton) {
            alienButton.addEventListener("click", () => {
                let answer = document.getElementById('inputAlien2').value.trim(); 
                answer = answer.replace(/\s+/g,'');

                if (answer === "ufo='alien_Biege';" || answer === 'ufo="alien_Biege";') {
                    alienBiege = new p.Sprite(100, 70);
                    alienBiege.img = alienBiegeimg;
                    alienValue.innerHTML = "Value 'alien_Biege' is added! Value of the ufo is alien_Biege!";
                    alienBiege.image.scale = 1.5;
                    alienBiege.width = 100;
                    alienBiege.height = 140;
                    alienBiege.collider = 'dynamic';
                    spriteCount++;
                } else if (answer ===  "ufo='alien_Yellow';" || answer ===  'ufo="alien_Yellow";') {
                    alienYellow = new p.Sprite(100, 70);
                    alienYellow.img = alienYellowimg;
                    alienValue.innerHTML = "Value 'alien_Yellow' is added! Value of the ufo is alien_Yellow!";
                    alienYellow.image.scale = 1.5;
                    alienYellow.width = 100;
                    alienYellow.height = 140;
                    alienYellow.collider = 'dynamic';
                    spriteCount++;
                } else if (answer ===  "ufo='alien_Green';" || answer ===  'ufo="alien_Green";') {
                    alienGreen = new p.Sprite(100, 70);
                    alienGreen.debug = true;
                    alienGreen.img = alienGreenimg;
                    alienValue.innerHTML = "Value 'alien_Green' is added! Value of the ufo is alien_Green!";
                    alienGreen.image.scale = 1.5;
                    alienGreen.width = 100;
                    alienGreen.height = 140;
                    alienGreen.collider = 'dynamic';
                    spriteCount++;
                }
            });
        }
    };

    p.draw = () => {
        p.background("white");
        if (spriteCount>1){
            shipYellow.img = shipYellowimg2;
            shipYellow.image.scale = 2.5;
            let alienValue = document.getElementById("callAlien2");
            if (alienValue) {
                alienValue.innerHTML = "A 'const' variable cannot be reassigned once it is assigned a value! To assign a new value, you must delete the existing value and type your new value. Restart the page and choose a new value to try again!";
            }
        }
    };
};

const s4 = (p) => {
    let shipYellowimg, alienGreenimg, alienBiegeimg, alienYellowimg, shipYellowimg2;
    let currentSprite = null;

    p.preload = () => {
        shipYellowimg = p.loadImage("assets/ufoYellow.png");
        shipYellowimg2 = p.loadImage("assets/ufoYellow_damage2.png");
        alienBiegeimg = p.loadImage("assets/alienBiege_front.png");
        alienGreenimg = p.loadImage("assets/alienGreen_front.png");
        alienYellowimg = p.loadImage("assets/alienYellow_front.png");
    };

    p.setup = () => {
        p.createCanvas(600, 400);
        p.background("white");
        p.world.gravity.y = 10;
        let correctUFO = document.getElementById('callUFO3');
        let UFOButton = document.getElementById('submitUFOName3');

        if (correctUFO && UFOButton) {
            UFOButton.addEventListener("click", () => {
                let userAnswer = document.getElementById('inputUFO3').value.trim(); 
                userAnswer = userAnswer.replace(/\s+/g, '');
                if (userAnswer === 'varufo;') {
                    shipYellow = new p.Sprite(100,270);
                    shipYellow.img = shipYellowimg;
                    shipYellow.image.scale = 2.5;
                    shipYellow.width = 100;
                    shipYellow.height = 20;
                    shipYellow.collider = 'static';
                    shipYellow.debug = true;
                    correctUFO.innerHTML = "Variable 'ufo' is created!"
                } 
            });
        }

        let alienValue = document.getElementById('callAlien3');
        let alienButton = document.getElementById('submitAlien3');
        
        if (alienValue && alienButton) {
            alienButton.addEventListener("click", () => {
                let answer = document.getElementById('inputAlien3').value.trim(); 
                answer = answer.replace(/\s+/g,'');
                if (currentSprite) {
                    currentSprite.remove();
                    alienValue.innerHTML = "";
                }

                if (answer === "ufo='alien_Biege';" || answer === 'ufo="alien_Biege";') {
                    currentSprite = new p.Sprite(100, 70);
                    currentSprite.img = alienBiegeimg;
                    alienValue.innerHTML = "Value 'alien_Biege' is added! Value of the ufo is alien_Biege!";
                } else if (answer ===  "ufo='alien_Yellow';" || answer ===  'ufo="alien_Yellow";') {
                    currentSprite = new p.Sprite(100, 70);
                    currentSprite.img = alienYellowimg;
                    alienValue.innerHTML = "Value 'alien_Yellow' is added! Value of the ufo is alien_Yellow!";
                } else if (answer ===  "ufo='alien_Green';" || answer ===  'ufo="alien_Green";') {
                    currentSprite = new p.Sprite(100, 70);
                    currentSprite.debug = true;
                    currentSprite.img = alienGreenimg;
                    alienValue.innerHTML = "Value 'alien_Green' is added! Value of the ufo is alien_Green!";
                }
                if (currentSprite) {
                    currentSprite.image.scale = 1.5;
                    currentSprite.width = 100;
                    currentSprite.height = 140;
                    currentSprite.collider = 'dynamic';
                }
            });
        }
    };

    p.draw = () => {
        p.background("white");
    };
};

// Map sketch functions to routes
const sketchMap = {
    '/variable-declaration': s1,
    '/box': s2,
    '/const-declaration': s3,
    '/var-declaration': s4
};

// Function to create or show canvas for current route
function setupCanvasForRoute(path) {
    // Get the div ID for this route
    const divId = routeDivMap[path];
    
    if (!divId || !sketchMap[path]) {
        console.log(`No canvas setup for path: ${path}`);
        return;
    }
    
    // Hide all existing canvases
    for (const route in canvasInstances) {
        if (canvasInstances[route]) {
            const canvasDiv = document.getElementById(routeDivMap[route]);
            if (canvasDiv) {
                const canvasElements = canvasDiv.querySelectorAll('canvas');
                canvasElements.forEach(canvas => {
                    canvas.style.display = 'none';
                });
            }
        }
    }
    
    // Create or show canvas for current route
    if (!canvasInstances[path]) {
        // Create new p5 instance for this route
        canvasInstances[path] = new p5(sketchMap[path], divId);
    } else {
        // Show existing canvas
        const canvasDiv = document.getElementById(divId);
        if (canvasDiv) {
            const canvasElements = canvasDiv.querySelectorAll('canvas');
            canvasElements.forEach(canvas => {
                canvas.style.display = 'block';
            });
        }
    }
}

// Modify your router's handleLocation function
async function handleLocation() {
    const path = window.location.pathname;
    
    // Load the HTML content for the route
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById('app').innerHTML = html;
    
    // Setup canvas for this route
    setupCanvasForRoute(path);
}

// Define route function for navigation
window.route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

// Initial setup
window.onpopstate = handleLocation;
window.onload = () => {
    // Handle the initial route
    handleLocation();
};
