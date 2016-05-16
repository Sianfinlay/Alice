//game.js

// initate variables
var width = window.innerWidth;
var width = window.innerWidth;

function loadImages(sources, callback) { // load images using the sources object 'key' names is to be use later on for referencing images instead of writing source directories and other assocciated values
	//assets directory to puzzle pieces
	var assetDir = '../assets/'; // mobile: '../assets/mobile/'
	var images = {}; // initate object to store image values
	var loadedImages = 0;
	var numImages = 0;
	for (var src in sources) {
		images[src] = new Image();
		images[src].onload = function() {
			if(++loadImages >= numImages) {
				callback(images);
			}
		};
		images[src].src = assetsDir + sources[src]; // example of output src: '../assets/piece1.png'
	}
}

function isNearZone(piece, outline) { // function to confirm if a puzzle piece is near an outline
	//used to shorten if statement
	var p = piece;
	var o = outline;
	var px = p.getX();
	var py = p.getY();

	// if a collision occurs between the puzzle piece and an outline(plus 20px around the outline) return true, as the puzzle piece is in the right area for snapping to the outline
	if(px > o.x - 20 && px < o.x + 20 && py > o.y - 20 && py < o.y + 20) {
		return true
	} else { // if no collision has occurred return false
		return false; 
	}
}

function drawBack(background, backImg) { // draw background img using image from the image object
	var context = background.getContext();
	context.drawImage(backImg, getStage().getWidth() / 2, 0); // background image position in the top center of the stage
}

// main function for drawing puzzle pieces and outline, then giving the pieces drag events 
function initStage (images) { //using image object created in the loadImages function
	var stage = new Konva.Stage({ // initate canvas stage: container and dimersions
		container: 'gameDesktop',
		width: 510,
		height: 440
	});
	var background = new Konva.layer(); // new layer to hold background
	var puzzleLayer = new Konva.Layer(); // puzzle layer 
	var puzzleShapes = []; intiate puzzle pieces array

	// Object for puzzle piece positions
	var puzzlePieces = {
		piece_1: {
			x: 0,
			y: 0
		},
		piece_2: {
			x: 0,
			y: 0
		},
		piece_3: {
			x: 0,
			y: 0
		},
		piece_4: {
			x: 0,
			y: 0
		},
		piece_5: {
			x: 0,
			y: 0
		},
		piece_6: {
			x: 0,
			y: 0
		},
		piece_7: {
			x: 0,
			y: 0
		},
		piece_8: {
			x: 0,
			y: 0
		}
	};
	// Object for outline positions
	var outlines = {
		piece_1_outline: {
			x: 0,
			y: 0
		},
		piece_2_outline: {
			x: 0,
			y: 0
		},
		piece_3_outline: {
			x: 0,
			y: 0
		},
		piece_4_outline: {
			x: 0,
			y: 0
		},
		piece_5_outline: {
			x: 0,
			y: 0
		},
		piece_6_outline: {
			x: 0,
			y: 0
		},
		piece_7_outline: {
			x: 0,
			y: 0
		},
		piece_8_outline: {
			x: 0,
			y: 0
		}
	};

	// loop through puzzle pieces and manage drag events
	for(var key in puzzlePieces) {

		//run an anonymous function
		(function() {
			var currentKey = key;
			var initPos = puzzlePieces[key];

			var piece = new Konva.Image({
				image: images[key], // get image from image object using key from puzzlePieces object
				x: initPos.x,
				y: initPos.y,
				draggable: true,
				id: key,
				name: wrong // used as a subsitute boolean for calling 'winning' screen when all pieces' 'name' becomes 'right'.
			});

		})(); 
	}
}




