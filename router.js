// Store p5 instances for each route
let canvasInstances = {
    '/': null,
    '/variable-declaration': null,
    '/box': null,
    '/const-declaration': null,
    '/var-declaration': null
  };
  
  // Define sketch functions for each route
  const sketches = {
    '/': null, // Home page might not need a canvas
    
    '/variable-declaration': (p) => {
      let currentSprite = null;
  
      p.setup = () => {
        p.createCanvas(600, 400);
        p.background("white");
        p.world.gravity.y = 10;
        
        // Your existing setup code for this canvas
        let correctUFO = document.getElementById('callUFO');
        let UFOButton = document.getElementById('submitUFOName');
        
        // Add event listeners only if elements exist
        if (correctUFO && UFOButton) {
          UFOButton.addEventListener("click", () => {
            let userAnswer = document.getElementById('inputUFO').value.trim(); 
            userAnswer = userAnswer.replace(/\s+/g, '');
            if (userAnswer === 'letufo;') {
              shipYellow = new p.Sprite(100, 270);
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
              alienValue.innerHTML = "Value 'alien_Biege' is added! Value of the ufo is alien_Biege!";
            } else if (answer === "ufo='alien_Yellow';" || answer === 'ufo="alien_Yellow";') {
              currentSprite = new p.Sprite(100, 70);
              alienValue.innerHTML = "Value 'alien_Yellow' is added! Value of the ufo is alien_Yellow!";
            } else if (answer === "ufo='alien_Green';" || answer === 'ufo="alien_Green";') {
              currentSprite = new p.Sprite(100, 70);
              currentSprite.debug = true;
              alienValue.innerHTML = "Value 'alien_Green' is added! Value of the ufo is alien_Green!";
            }
            
            if (currentSprite) {
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
    },
    
    '/box': (p) => {
      let currentSprite = null;
  
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
              box = new p.Sprite(100, 270, 100, 100);
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
              brownValue.innerHTML = "Value 'wood_brown' is added! Value of the Box is wood_brown!";
            } else if (answer === "box='wood-white';" || answer === 'box="wood-white";') {
              currentSprite = new p.Sprite(100, 70, 100, 100);
              brownValue.innerHTML = "Value 'wood_white' is added! Value of the Box is wood_white!";
            } else if (answer === "box='wood-green';" || answer === 'box="wood-green";') {
              currentSprite = new p.Sprite(100, 70, 100, 100);
              brownValue.innerHTML = "Value 'wood_green' is added! Value of the Box is wood_green!";
            }
            
            if (currentSprite) {
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
    },
    
    '/const-declaration': (p) => {
      let currentSprite = null;
      let spriteCount = 0;
  
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
              shipYellow = new p.Sprite(100, 270);
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
              alienValue.innerHTML = "Value 'alien_Biege' is added! Value of the ufo is alien_Biege!";
              alienBiege.width = 100;
              alienBiege.height = 140;
              alienBiege.collider = 'dynamic';
              spriteCount++;
            } else if (answer === "ufo='alien_Yellow';" || answer === 'ufo="alien_Yellow";') {
              alienYellow = new p.Sprite(100, 70);
              alienValue.innerHTML = "Value 'alien_Yellow' is added! Value of the ufo is alien_Yellow!";
              alienYellow.width = 100;
              alienYellow.height = 140;
              alienYellow.collider = 'dynamic';
              spriteCount++;
            } else if (answer === "ufo='alien_Green';" || answer === 'ufo="alien_Green";') {
              alienGreen = new p.Sprite(100, 70);
              alienGreen.debug = true;
              alienValue.innerHTML = "Value 'alien_Green' is added! Value of the ufo is alien_Green!";
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
        if (spriteCount > 1) {
          let alienValue = document.getElementById("callAlien2");
          if (alienValue) {
            alienValue.innerHTML = "A 'const' variable cannot be reassigned once it is assigned a value! To assign a new value, you must delete the existing value and type your new value. Restart the page and choose a new value to try again!";
          }
        }
      };
    },
    
    '/var-declaration': (p) => {
      let currentSprite = null;
  
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
              shipYellow = new p.Sprite(100, 270);
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
              alienValue.innerHTML = "Value 'alien_Biege' is added! Value of the ufo is alien_Biege!";
            } else if (answer === "ufo='alien_Yellow';" || answer === 'ufo="alien_Yellow";') {
              currentSprite = new p.Sprite(100, 70);
              alienValue.innerHTML = "Value 'alien_Yellow' is added! Value of the ufo is alien_Yellow!";
            } else if (answer === "ufo='alien_Green';" || answer === 'ufo="alien_Green";') {
              currentSprite = new p.Sprite(100, 70);
              currentSprite.debug = true;
              alienValue.innerHTML = "Value 'alien_Green' is added! Value of the ufo is alien_Green!";
            }
            
            if (currentSprite) {
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
    }
  };
  
  // Function to create or show canvas for current route
  function setupCanvasForRoute(path) {
    // Hide all canvases first
    for (let route in canvasInstances) {
      if (canvasInstances[route]) {
        let canvasElement = document.getElementById(getCanvasIdForRoute(route));
        if (canvasElement) {
          canvasElement.style.display = 'none';
        }
      }
    }
    
    // Create or show canvas for current route
    if (sketches[path]) {
      if (!canvasInstances[path]) {
        // Create container for this canvas if it doesn't exist
        let containerId = getCanvasIdForRoute(path);
        let container = document.getElementById(containerId);
        
        if (!container) {
          container = document.createElement('div');
          container.id = containerId;
          document.getElementById('app').appendChild(container);
        }
        
        // Create new p5 instance for this route
        canvasInstances[path] = new p5(sketches[path], containerId);
      } else {
        // Show existing canvas
        let canvasElement = document.getElementById(getCanvasIdForRoute(path));
        if (canvasElement) {
          canvasElement.style.display = 'block';
        }
      }
    }
  }
  
  // Helper to generate canvas container IDs
  function getCanvasIdForRoute(route) {
    return 'canvas-' + route.substring(1).replace(/\//g, '-') || 'home';
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
  
  // Disable p5play intro animation
  if (!window.p5play) {
    window.p5play = {};
  }
  
  window.p5play.playIntro = function() {
    console.log("p5play intro disabled");
    return Promise.resolve();
  };
  