////////////////////////////////////////////////////////////////////USED TO CREATE CANVAS///////////////////////////////////////////////////////////////////////////////////////////////
  var boxWidth;   // canvas width
  var boxHeight;  // canvas height
  var rightBoundary; 
  var bottomBoundary; // sets boundaries for canvas 
  var leftBoundary; 
  var topBoundary; 
  var ctx;  // used to load images 
  var canvas; // name of the window that shows our program
////////////////////////////////////////////////////////////////////USED TO CREATE CANVAS////////////////////////////////////////////////////////////////////////////////////////////////

  var intervalID;  // used in frame refresh rate to stop the animation of units image refreshing too fast and looking unrealistic

  var background = new Image(); // title screen background         
  var newbutton = new Image(); // the new game button
  var newbuttonglow = new Image(); // the new game button highlighted that’s drawn when the mouse hovers over the new button image
  var loadbutton = new Image(); // the load button
  var loadbuttonglow = new Image(); // the load button highlighted that’s drawn when the mouse hovers over the new button image
  var buttoncover = new Image(); // grey box that covers up the new game/load button and then moves out of the way when enter is pressed
  var startButtonPressed = false;  // start button on/off switch
  var GameHasStarted = false; // the game on/off switch
  var buttoncover1scrollX = -350; // used to move a box to covering up the enter button image 
  var buttoncover2scrollX = 250; // used to move a box that covers up the load/new game image

  var HUD = { // this is the main control panel  IT MUST ALWAYS BE ON TOP OF ANYTHING ELSE DRAWN IN THE CANVAS (unless stated otherwise)
  x: 0, 
  y: 400, 
  width: 800, 
  height: 199, // the entire HUD image's x,y,width,height
  buttonX: 350,  
  buttonY: 400, 
  buttonWidth: 88, 
  buttonHeight: 96, //the HUDs minimize button's x,y,width,height
  pictureX: 15, 
  pictureY: 495, 
  pictureWidth: 136, 
  pictureHeight: 86, // when an object is clicked on a small picture of that object appears in this box's x,y,width,height
  resourceX: 150, 
  resourceY: 440,
  resourceWidth: 204,
  resourceHeight: 46, // the players resources are drawn in the HUD resource box's x,y,width,height
  baseButtonX: 585,
  baseButtonY: 490,
  baseButtonWidth: 204,
  baseButtonHeight: 101, // a objects command buttons are drawn in the HUD command buttons box's x,y,width,height
  upgradeX: 470,
  upgradeY: 515,
  upgradeWidth: 105,
  upgradeHeight: 30,  // the HUD upgrade button is drawn in this box's x,y,widht,height
  attackY: 515,
  defenceY: 540,
  healthY: 570,
  resourceTextY: 465 // used to move the Y  coordinate of writing when HUD is moved so   
}
  var HUDvisible = true; // used to move the huds locations when a button is pressed
  var playerResource = 500; // resources used to make units and play the game
  var HUDImage = new Image(); // the main hud image
  var HUDbutton = new Image(); // the hud minimize button
  var HUDbuttonglow = new Image(); // the highlighted hud minimize button
  var HUDupgradebutton = new Image(); // upgrade button for the base
  var upgradeanimationFrames = [0,1,2];  // used to change the image of the upgrade button without having to load a new picture
  var upgradeframeIndex = 0; // when this changes the image changes 
  var HUDresource = new Image(); // the flashing £ on the hud
  var resourceanimationFrames = [0,1,2,3,4,5,6];  // each number represents a different image on a sprite sheet.
  var resourceframeIndex = 0; // +1 is added to this variable under the animation function every 1/5 of a second
  

  var mainBase = {
  x: 300,  // x location
  y: 300, // y location
  width: 50, // size changes when base is upgraded
  height: 50, // size changes when base is upgraded
  attack: 0, // attack points used to cause damage
  defence: 1000, // reduces damage taken
  health: 10000, // health points, once they are all gone the unit is destroyed 
  L1: true, // basic base
  L2: false, // upgraded base
  L3: false, // fully upgraded base
  resourceGen: 1, // rate at which the base generates resources 
  selected: false, // used to indicate whether or not the base has been clicked on
  buttonWidth: 46, // all buttons are the same width
  buttonHeight: 30, // all buttons are the same height
  buttonCol1X: 612, // first column has the same X coordinate                   using the row and column method i can i find any button i want/need e.g. button number 5 is at 664X 529Y
  buttonCol2X: 664, // second column has the same X coordinate
  buttonCol3X: 716, // third column has the same X coordinate
  buttonRow1Y: 495, // first row has the same Y
  buttonRow2Y: 529, // second row has the same Y
  buttonRow3Y: 560 // third row has the same Y
}
  var mainBaseimg = new Image(); // the main base image
  var mainBaseimg2 = new Image(); // the main base image after being clicked on
  var baseButtons = new Image(); // command button images
  var baseButtonanimationFrames = [0,1,2,3];  // used to change the image of command buttons when a base is upgraded and new units are available to be spawned
  var baseButtonframeIndex = 0; // +1 is added to this variable when base is upgraded

  var mouse = { 
  x:null, // get its value from an event listener 
  y:null, // get its value from an event listener 
  xSave: 0, // used to save the x location of the mouse when left clicked
  ySave: 0 // used to save the y location of the mouse when left clicked
}

  var KEY = {
  ENTER: 13 // key bindings to be used in game assigned under a name. each number represents a key, the name e.g. UP can be anything regardless of function
}
  var pressedKeys = []; // the array for pressed keys

  function spawnUnit(){   // a function for spawning units each if statement is a different unit
  if(unitType == 1){ //staphylococcus unit
     this.unit = 1; // used to set the right image
     this.x = x;
     this.y = y;                      
     this.width = 65; 
     this.height = 56;  // x,y,width and height of the unit is pre-set 
     this.selected = false; // unit is unselected 
     this.attack = 10; // attack points
     this.defence = 20; // defence points
     this.health = 100; // health points
}
  if(unitType == 2){ // streptococcus unit
     this.unit = 2; // used to set the right image
     this.x = x;
     this.y = y;                      
     this.width = 160; 
     this.height = 120; // x,y,width and height of the unit is pre-set
     this.selected = false; // unit is unselected
     this.attack = 100; // attack points
     this.defence = 200; // defence points
     this.health = 1000; // health points
}
  if(unitType == 3){ // bacillus unit
     this.unit = 3; // used to set the right image
     this.x = x;
     this.y = y;                      
     this.width = 160; 
     this.height = 120; // x,y,width and height of the unit is pre-set
     this.selected = false;  // unit is unselected
     this.attack = 500; // attack points
     this.defence = 700; // defence points
     this.health = 5000; // health points
}
  if(unitType == 4){ // E.coli unit
     this.unit = 4; // used to set the right image
     this.x = x;
     this.y = y;                      
     this.width = 80; 
     this.height = 60; // x,y,width and height of the unit is pre-set
     this.selected = false; // unit is unselected
     this.attack = 1000; // attack points
     this.defence = 500; // defence points
     this.health = 10; // health points
}
  if(unitType == 5){ // salmonella unit
     this.unit = 5;// used to set the right image
     this.x = x;
     this.y = y;                      
     this.width = 163; 
     this.height = 141; // x,y,width and height of the unit is pre-set
     this.selected = false; // unit is unselected
     this.attack = 1500;// attack points
     this.defence = 1000;// defence points
     this.health = 6000;// health points
}
  if(unitType == 6){ // tetanus unit
     this.unit = 6;// used to set the right image
     this.x = x;
     this.y = y;                      
     this.width = 400; 
     this.height = 300; // x,y,width and height of the unit is pre-set
     this.selected = false; // unit is unselected
     this.attack = 3000;// attack points
     this.defence = 100;// defence points
     this.health = 10000;// health points
}
  if(unitType == 7){ // common cold unit
     this.unit = 7; // used to set the right image
     this.x = x;
     this.y = y;                      
     this.width = 200; 
     this.height = 150; // x,y,width and height of the unit is pre-set
     this.selected = false; // unit is unselected
     this.attack = 10000;// attack points
     this.defence = 0;// defence points
     this.health = 10;// health points
}}
  var spawnUnits = []; // an array for spawning units
  var unitType = 0; // used in button clicking to determine what unit to spawn
  var staphylococusImg = new Image(); // normal image of the unit
  var staphylococusSelectedImg = new Image(); // image of the unit when it has been clicked on

///////////////////////////////////////////////////////////// CREATES THE CANVAS AND SETS THE BOUNDARYS////////////////////////////////////////////////////////////////////
$(function(){ 
  canvas = document.getElementById('canvas'); // makes the canvas in the webpage and sets its limits
  ctx = canvas.getContext('2d'); // 2D images 
  boxWidth = ctx.canvas.width; // size of the box in the webpage is the same size as our 'canvas'
  boxHeight = ctx.canvas.height;
  rightBoundary = 800;                
  bottomBoundary = 600; // used in collisions stop units moving off the visible screen
  leftBoundary = 10;
  topBoundary = 10;	
	
  background.src = "background.png";       // loads pictures from file so they can be seen and used later on
  newbutton.src = "newbutton.png";
  newbuttonglow.src = "newbuttonglow.png";
  loadbutton.src = "loadbutton.png";
  loadbuttonglow.src = "loadbuttonglow.png";
  buttoncover.src = "buttoncover2.png";
  HUDImage.src = "HUD.png";
  HUDbuttonglow.src = "HUDbuttonglow.png";
  HUDbutton.src = "HUDbutton.png";
  staphylococusImg.src = "staphylococus.png";
  staphylococusSelectedImg.src = "staphylococusSelected.png";
  mainBaseimg.src = "mainBaseimg.png";
  mainBaseimg2.src = "mainBaseimg2.png";
  baseButtons.src = "baseButtons.png";
  HUDresource.src = "resource.png";
  HUDupgradebutton.src = "upgradebutton.png";

  background.onload = function(){
  intervalID = setInterval(gameLoop,30);		// frame rate in red, refreshes the function game loop at set rate
  setInterval(startScreenAnimation,200); // refreshes the animation function at set frame rate, useful for animation that should be slower than the frame refresh rate
}
  canvas.addEventListener("mousemove", mouseLocationConvert, false); //add listener for mouse movement uses a function later on in the code to convert to a int under mouse.x and y
  canvas.addEventListener("click", singleLeftClick, false); // adds an event listener for left clicking, uses the mouse location to determine certain events

	
  $(document).keydown(function(e){
  pressedKeys[e.which] = true;
});                               // used to detect when buttons are being pushed down or released
  $(document).keyup(function(e){
  pressedKeys[e.which] = false;
});
	
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function gameLoop(){
  clear();                   // always being used keeps the canvas refreshing
  if(GameHasStarted == false){ // keeps the menuscreen running until the game has been started
     menuscreen();
}
  if(GameHasStarted == true){ // menuscreen stops and the game screen is loaded. 
     gameScreen(); // graphics 
     collision(); // movement
}}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function mouseLocationConvert(e){  // used to track the location of the mouse 
	mouse.x = e.pageX - canvas.offsetLeft;
	mouse.y = e.pageY - canvas.offsetTop;  //changes the x and y of the mouse into a variable that can be used
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function singleLeftClick(e){
  if(mouse.x >= 250 && mouse.x <= 534 && mouse.y >= 250 && mouse.y <= 250 + 70 && startButtonPressed == true && GameHasStarted == false){ // if the mouse is ontop of the new game button and has been left clicked on 
     GameHasStarted = true; // start new game
}
  if(mouse.x >= HUD.buttonX && mouse.x <= HUD.buttonX + HUD.buttonWidth && mouse.y >= HUD.buttonY && mouse.y <= HUD.buttonY + HUD.buttonHeight && GameHasStarted == true && HUDvisible == true){ // if the mouse is ontop of the HUD button that hasn’t been lowered already 
     HUD.y += 100;
	 HUD.pictureY += 100;
	 HUD.resourceY += 100;
	 HUD.infoY += 100;
	 HUD.attackY += 100;
	 HUD.defenceY += 100;
	 mainBase.buttonRow1Y += 100;
	 mainBase.buttonRow2Y += 100;
	 mainBase.buttonRow3Y += 100;
	 HUD.healthY += 100;
	 HUD.resourceTextY += 100;
	 HUD.upgradeY += 100;
	 HUD.baseButtonY += 100;
     HUD.buttonY += 100;   // Y coordinate + 100  moves everything associated with the HUD 
     HUDvisible = false;  // keeps the button looped
}
  if(mouse.x >= HUD.buttonX && mouse.x <= HUD.buttonX + HUD.buttonWidth && mouse.y >= HUD.buttonY && mouse.y <= HUD.buttonY + HUD.buttonHeight && GameHasStarted == true && HUDvisible == false){ // if the mouse is ontop of the HUD button that has been lowered
     HUD.y -= 100;
	 HUD.pictureY -= 100;
	 HUD.resourceY -= 100;
	 HUD.infoY -= 100;
	 HUD.attackY -= 100;
	 HUD.defenceY -= 100;
	 mainBase.buttonRow1Y -= 100;
	 mainBase.buttonRow2Y -= 100;
	 mainBase.buttonRow3Y -= 100;
	 HUD.healthY -= 100;
	 HUD.resourceTextY -= 100;
	 HUD.upgradeY -= 100;
	 HUD.baseButtonY -= 100;
     HUD.buttonY -= 100;  // Y coordinate - 100  moves everything associated with the HUD 
     HUDvisible = true;  // keeps the button looped
}
  if(mouse.x >= mainBase.x && mouse.x <= mainBase.x + mainBase.width && mouse.y >= mainBase.y && mouse.y <= mainBase.y + mainBase.height && mainBase.selected == false){ // main base has been clicked on and now everything associated with it can now be seen 
     mainBase.selected = true; // bas is selected
}
  if(mouse.x >= HUD.upgradeX && mouse.x <= HUD.upgradeX + HUD.upgradeWidth && mouse.y >= HUD.upgradeY && mouse.y <= HUD.upgradeY + HUD.upgradeHeight && mainBase.L2 == false && mainBase.L3 == false && playerResource >= 500){ // player has enough resources to buy a base upgrade AND has clicked on the button
     mainBase.L2 = true; // L2 units can now be spawned
	 mainBase.width = 100; // base gets bigger
	 mainBase.height = 100; // base gets bigger
	 playerResource -= 500; // the cost of the upgrade is now subtracted
	 baseButtonframeIndex += 1; // changes the button picture to show new units are now available 
	 mainBase.resourceGen = 5; // the bases resource generation has in creased 
}
  if(mouse.x >= HUD.upgradeX && mouse.x <= HUD.upgradeX + HUD.upgradeWidth && mouse.y >= HUD.upgradeY && mouse.y <= HUD.upgradeY + HUD.upgradeHeight && mainBase.L2 == true && mainBase.L3 == false && playerResource >= 5000){
     mainBase.L3 = true; // L3 units can now be spawned
	 mainBase.width = 150;// base gets bigger
	 mainBase.height = 150;// base gets bigger
	 playerResource -= 5000;// the cost of the upgrade is now subtracted
	 baseButtonframeIndex += 1;// changes the button picture to show new units are now available
	 mainBase.resourceGen = 10;//the bases resource generation has in creased
}
  if(mouse.x >= HUD.upgradeX && mouse.x <= HUD.upgradeX + HUD.upgradeWidth && mouse.y >= HUD.upgradeY && mouse.y <= HUD.upgradeY + HUD.upgradeHeight && mainBase.L2 == true && mainBase.L3 == true){ // player has clicked on the button but all upgrades have been purchased
  // do nothing
}
  if(mouse.x >= mainBase.buttonCol1X && mouse.x <= mainBase.buttonCol1X + mainBase.buttonWidth && mouse.y >= mainBase.buttonRow1Y && mouse.y <= mainBase.buttonRow1Y + mainBase.buttonHeight && mainBase.selected == true && playerResource >= 100 && mainBase.L1 == true){
     unitType = 1;
	 playerResource -= 100;
	 spawnUnits.push(new spawnUnit(100, 100));
}
  if(mouse.x >= mainBase.buttonCol2X && mouse.x <= mainBase.buttonCol2X + mainBase.buttonWidth && mouse.y >= mainBase.buttonRow1Y && mouse.y <= mainBase.buttonRow1Y + mainBase.buttonHeight && mainBase.selected == true && playerResource >= 200 && mainBase.L1 == true){
     unitType = 2;
	 playerResource -= 200;
	 spawnUnits.push(new spawnUnit(100, 100));
}
  if(mouse.x >= mainBase.buttonCol3X && mouse.x <= mainBase.buttonCol3X + mainBase.buttonWidth && mouse.y >= mainBase.buttonRow1Y && mouse.y <= mainBase.buttonRow1Y + mainBase.buttonHeight && mainBase.selected == true && playerResource >= 500 && mainBase.L2 == true){
     unitType = 3;
	 playerResource -= 500;
	 spawnUnits.push(new spawnUnit(100, 100));
}
  if(mouse.x >= mainBase.buttonCol1X && mouse.x <= mainBase.buttonCol1X + mainBase.buttonWidth && mouse.y >= mainBase.buttonRow2Y && mouse.y <= mainBase.buttonRow2Y + mainBase.buttonHeight && mainBase.selected == true && playerResource >= 750 && mainBase.L2 == true){
     unitType = 4;
	 playerResource -= 750;
	 spawnUnits.push(new spawnUnit(100, 100));
}
  if(mouse.x >= mainBase.buttonCol2X && mouse.x <= mainBase.buttonCol2X + mainBase.buttonWidth && mouse.y >= mainBase.buttonRow2Y && mouse.y <= mainBase.buttonRow2Y + mainBase.buttonHeight && mainBase.selected == true && playerResource >= 2000 && mainBase.L2 == true){
     unitType = 5;
	 playerResource -= 2000;
	 spawnUnits.push(new spawnUnit(100, 100));
}
  if(mouse.x >= mainBase.buttonCol3X && mouse.x <= mainBase.buttonCol3X + mainBase.buttonWidth && mouse.y >= mainBase.buttonRow2Y && mouse.y <= mainBase.buttonRow2Y + mainBase.buttonHeight && mainBase.selected == true && playerResource >= 5000 && mainBase.L3 == true){
     unitType = 6;
	 playerResource -= 5000;
	 spawnUnits.push(new spawnUnit(100, 100));
}
  if(mouse.x >= mainBase.buttonCol1X && mouse.x <= mainBase.buttonCol1X + mainBase.buttonWidth && mouse.y >= mainBase.buttonRow3Y && mouse.y <= mainBase.buttonRow3Y + mainBase.buttonHeight && mainBase.selected == true && playerResource >= 3000 && mainBase.L3 == true){
     unitType = 7;
	 playerResource -= 3000;
	 spawnUnits.push(new spawnUnit(100, 100));
}}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function clear() {	
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height); // clears the page and refreshes
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function startScreenAnimation(){
  if(GameHasStarted == true){ // game is in progress
     resourceframeIndex++; // resource image needs animated +1 to change image 
}}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function menuscreen(){
  ctx.drawImage(background, 0, 0, 800, 600); // draws the background image
  ctx.drawImage(newbutton, 250, 250, 284, 70); // new game draw the normal image
  ctx.drawImage(loadbutton, 250, 350, 284, 72); // load game draw the normal image

  if(mouse.x >= 250 && mouse.x <= 534 && mouse.y >= 250 && mouse.y <= 250 + 70){ // if the mouse is within the picture change it to a glowing picture
     ctx.drawImage(newbuttonglow, 250, 250, 284, 70); // draw the new picture
}
  if(mouse.x >= 250 && mouse.x <= 534 && mouse.y >= 350 && mouse.y <= 350 + 72){ // if the mouse is within the picture change it to a glowing picture
     ctx.drawImage(loadbuttonglow, 250, 350, 284, 72); // draw the new picture
}
  ctx.drawImage(buttoncover, buttoncover2scrollX, 250, 284, 171); // this covers up the new game and load game option and moves out of the way once enter is pressed, needs to be loaded last so its ontop of the other images.
  ctx.drawImage(buttoncover, buttoncover1scrollX, 500, 502,84); // if the enter button has been pressed draw the cover image that moves over the enter button image.
	
  if(pressedKeys[KEY.ENTER]){   // press enter to start game as prompted
     startButtonPressed = true;
}

  if(startButtonPressed == true){
     buttoncover1scrollX += 10; // moves the image right at set speed
     buttoncover2scrollX += 6; // moves the image right at set speed
	
  if(buttoncover1scrollX >= 150){ // when in the right place 
	 buttoncover1scrollX = 150; //stop moving
}
  if(buttoncover2scrollX >= 800){ // in the right place
	 buttoncover2scrollX = 800; // stop moving
}
}}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function gameScreen(){
  ctx.drawImage(background, 0, 0, 800, 600); // draws the background image

  if(mainBase.selected == false){ // the base hasn’t been clicked on
     ctx.drawImage(mainBaseimg, mainBase.x, mainBase.y, mainBase.width, mainBase.height); // draw the unselected image of the base
}
  if(mainBase.selected == true){ // the base has been clicked on
     ctx.drawImage(mainBaseimg2, mainBase.x, mainBase.y, mainBase.width, mainBase.height); // draw the selected image for the base
}

  for(var key in spawnUnits) {  
  if(spawnUnits[key] != undefined) {
  
  if(spawnUnit[key].unit == 1){
     ctx.drawImage(staphylococusImg, spawnUnits[key].x, spawnUnits[key].y, spawnUnits[key].width, spawnUnits[key].height);
	 }}}

// ALWAYS DRAW THE HUD ABOVE UNITS
  ctx.drawImage(HUDImage, HUD.x, HUD.y, HUD.width, HUD.height); // draws the HUD
  ctx.drawImage(HUDbutton, HUD.buttonX, HUD.buttonY, HUD.buttonWidth, HUD.buttonHeight); // draws the HUD button
  
  var upgradeSourceX = Math.floor(upgradeanimationFrames[upgradeframeIndex]) * 722; // the number in red is the size of the image that is being loaded from the sprite sheet
  ctx.drawImage(HUDupgradebutton, upgradeSourceX, 0, 722, 221, HUD.upgradeX, HUD.upgradeY, HUD.upgradeWidth, HUD.upgradeHeight); // draws the upgrade image from the sprite sheet
  
  if(mainBase.L2 == false && mainBase.L3 == false && playerResource >= 500){ // upgrade picture is lit up because the player can afford it
    upgradeframeIndex = 0; // show lit up upgrade button
}
  if(mainBase.L2 == false && mainBase.L3 == false && playerResource <= 500){ // upgrade picture isn’t lit up because they can’t afford it
    upgradeframeIndex = 1; // show unlit up upgrade button
}
  if(mainBase.L2 == true && mainBase.L3 == false && playerResource >= 5000){ // player has upgraded once and can afford to upgrade a second time
     upgradeframeIndex = 0; // show lit up upgrade button
}
  if(mainBase.L2 == true && mainBase.L3 == false && playerResource <= 5000){ // player can’t afford second upgrade
     upgradeframeIndex = 1; // show unlit up upgrade button
}
  if(mainBase.L2 == true && mainBase.L3 == true){ // all upgrades have been purchased
     upgradeframeIndex = 1; // show unlit up upgrade button
}
  if(resourceframeIndex == resourceanimationFrames.length-1) {    // animation  method for the resources image
     resourceframeIndex = 0; // resets to keep looping
}
  var resourceSourceX = Math.floor(resourceanimationFrames[resourceframeIndex]) * 204; // the number in red is the size of the image that is being loaded from the sprite sheet
  ctx.drawImage(HUDresource, resourceSourceX, 0, 204, 46, HUD.resourceX, HUD.resourceY, HUD.resourceWidth, HUD.resourceHeight); // draws the resource image from the sprite sheet
  
  if(mouse.x >= HUD.buttonX && mouse.x <= HUD.buttonX + HUD.buttonWidth && mouse.y >= HUD.buttonY && mouse.y <= HUD.buttonY + HUD.buttonHeight){ // if the mouse is ontop of the button 
     ctx.drawImage(HUDbuttonglow, HUD.buttonX, HUD.buttonY, HUD.buttonWidth, HUD.buttonHeight); // change the image to indicated a possible function is available
}
   playerResource += mainBase.resourceGen; // spawns resources from the base constantly to keep gameplay progressing
  
  ctx.textAlign = "left"; // sets alignment
  ctx.font = "10pt Calibri";  // font
  ctx.fillStyle = "white"; // colour
  ctx.fillText(+playerResource+ "", 200, HUD.resourceTextY); // draws amount of resources
  
//ALWAYS DRAW UNIT STATS, BUTTONS AND HUD PICTURE AFTER THE HUD
  if(mainBase.selected == true){ // the base has been selected and the HUD image is above unit images
	 ctx.drawImage(mainBaseimg, HUD.pictureX, HUD.pictureY, HUD.pictureWidth, HUD.pictureHeight); // draw the base picture in hud picture box
	 
  ctx.textAlign = "left"; // sets alignment
  ctx.font = "10pt Calibri";  // font
  ctx.fillStyle = "white"; // colour
  ctx.fillText(+mainBase.attack+ "", 210, HUD.attackY); // writes "blahblahblah" at x/y 
  ctx.fillText(+mainBase.defence+ "", 210, HUD.defenceY);
  ctx.fillText(+mainBase.health+ "", 210, HUD.healthY);
 
  var baseButtonSourceX = Math.floor(baseButtonanimationFrames[baseButtonframeIndex]) * 204; // the number in red is the size of the image that is being loaded from the sprite sheet
  ctx.drawImage(baseButtons, baseButtonSourceX, 0, 204, 101, HUD.baseButtonX, HUD.baseButtonY, HUD.baseButtonWidth, HUD.baseButtonHeight); // draws the resource image from the sprite sheet
}}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function collision(){
}
