//game.js

// initate variables
var width = window.innerWidth;
var width = window.innerWidth;

function loadImages(sources, callback) { // load images using the sources object 'key' names is to be use later on for referencing images instead of writing source directories and other assocciated values
	//assets directory to puzzle pieces
	var assetDir = 'assets/'; // mobile: '../assets/mobile/'
	var images = {}; // initate object to store image values
	var loadedImages = 0;
        var numImages = 0;
        for(var src in sources) {
            numImages++;
        }
        for(var src in sources) {
            images[src] = new Image();
            images[src].onload = function() {
                if(++loadedImages >= numImages) {
                    callback(images);
                }
            };
		images[src].src = assetDir + sources[src]; // example of output src: '../assets/piece1.png'
	}
}

function isNearZone(piece, outline) { // function to confirm if a puzzle piece is near an outline
	//used to shorten if statement
	var p = piece;
	var o = outline;
	var px = p.getX();
	var py = p.getY();

	// if a collision occurs between the puzzle piece and an outline(plus 20px around the outline) return true, as the puzzle piece is in the right area for snapping to the outline
	if(px > o.x - 15 && px < o.x + 15 && py > o.y - 15 && py < o.y + 15) {
		return true
	} else { // if no collision has occurred return false
		return false; 
	}
}

function drawBack(background, backImg) { // draw background img using image from the image object
	var context = background.getContext();
	context.drawImage(backImg, 124, 0); // background image position in the top center of the stage
}


// main function for drawing puzzle pieces and outline, then giving the pieces drag events 
function initStage(images) { //using image object created in the loadImages function
	var stage = new Konva.Stage({ // initate canvas stage: container and dimersions
		container: 'gameDesktop',
		width: 510,
		height: 440
	});
	var background = new Konva.Layer(); // new layer to hold background
	var puzzleLayer = new Konva.Layer(); // puzzle layer 
	var puzzleShapes = []; //intiate puzzle pieces array

	// Object for puzzle piece positions
	var puzzlePieces = {
		piece_1: {
			x: 445,
			y: 200
		},
		piece_2: {
			x: 100,
			y: 380
		},
		piece_3: {
			x: 360,
			y: 300
		},
		piece_4: {
			x: 0,
			y: 150
		},
		piece_5: {
			x: 435,
			y: 0
		},
		piece_6: {
			x: 0,
			y: 0
		},
		piece_7: {
			x: 0,
			y: 350
		},
		piece_8: {
			x: 445,
			y: 100
		}
	};
	// Object for outline positions
	var outlines = {
		piece_1_outline: {
			x: 266,
			y: 191
		},
		piece_2_outline: {
			x: 182,
			y: 297
		},
		piece_3_outline: {
			x: 225.8,
			y: 191.2
		},
		piece_4_outline: {
			x: 221,
			y: 83
		},
		piece_5_outline: {
			x: 214,
			y: 83
		},
		piece_6_outline: {
			x: 182,
			y: 151
		},
		piece_7_outline: {
			x: 182,
			y: 83
		},
		piece_8_outline: {
			x: 182,
			y: 238
		}
	};

	// loop through puzzle pieces and manage drag events
	for(var key in puzzlePieces) {

		//run an anonymous function
		(function() {
			var currentPiece = key;
			var piecePos = puzzlePieces[key];
			var outkey = key + '_outline';
			var outPos = outlines[outkey];

			var piece = new Konva.Image({
				image: images[key], // get image from image object using key from puzzlePieces object
				x: piecePos.x,
				y: piecePos.y,
				draggable: true,
				id: key // id is the same as the key in the 'puzzlePieces'
			});
			

            var outline = new Konva.Image({
                image: images[outkey],
                x: outPos.x,
                y: outPos.y,
                visible: false // visibly turn off so background show on obvious 'cracks' where the outlines join, visibly does not distrupt the functionally 
            });
            puzzleLayer.add(outline); // add outline first to layer so if there is any overlapping the puzzle piece is on top
            puzzleLayer.add(piece); // add piece above outline
            
            

			// function to snap piece to outlines, uses 'isNearZone' function to test if the piece is near the outline.
			function snapTo(piece, outkey) {
                var outline = outlines[outkey]; // get outline from 'outlines' object
                if(isNearZone(piece, outline)) { // if piece is near matching outline
                    piece.position({ // change the position of the puzzle piece to match the outline
                        x : outline.x,
                        y : outline.y
                    });
					puzzleLayer.draw(); // draw new piece in position
				if(!piece.inRightPlace) { // statement stops a puzzle piece going into the puzzleShapes array more than once
						if(piece.id() == currentPiece){ // double check if piece id matches current piece held by users
							setTimeout(function() {	// short timeout function to allow function to understand what is to be changed, prevents function from skipping pieces
								piece.inRightPlace = true; // set to true now that the puzzle piece has been in the right place once
	                            puzzleShapes.push(piece);  // push piece to array
								console.log("number..."+ puzzleShapes.length); // test to see if number of piece currently being viewed match the number of pieces in the array. 
								// this maybe be more if a piece than was moved from right spot
								if(puzzleShapes.length == 8){ // array matches the max number of puzzle pieces
									console.log("working..."); // test that this if statement has worked
									// add modal success 
								}
	                            puzzleLayer.draw();// draw pieces again
	                        }, 50);
						} 
					}
				}
				
			}
			piece.on('dragstart', function() {
                this.moveToTop(); // make sure current piece being drag is move top so it doesn't get stuck behind another piece or outline
                puzzleLayer.draw(); //redraw piece
            });
			piece.on('dragend', function() {
				snapTo(piece, outkey); // call snap function
			});

			// mouse events
			// make piece glow on mouseover
            piece.on('mouseover', function() {
            	piece.cache(); // cache image for filter use
                piece.filters([Konva.Filters.Brighten]); // get the brightness filter for use
				piece.brightness(0.3); // up the brightness by '30%'
                puzzleLayer.draw(); // draw pieces again
                document.body.style.cursor = 'pointer'; // change mouse to the pointer to show that the piece can be dragged
            });
            // return piece original brightness on mouseout
            piece.on('mouseout', function() {
                piece.cache(); // cache image for filter use
                piece.filters([Konva.Filters.Brighten]); // get the brightness filter for use
				piece.brightness(0); // change brightness back to zero
                puzzleLayer.draw(); // draw pieces again
                document.body.style.cursor = 'default'; // change mouse to the default
            });
            // change cursor
            piece.on('dragmove', function() {
                document.body.style.cursor = 'pointer'; // keep mouse as a pointer when draggin
            });

		})(); 
	}
	stage.add(background); // add background
    stage.add(puzzleLayer); // add puzzle pieces and outlines
	drawBack(background, images.background); // draw background after the layer is added
}

var sources = { // get img src from 'assets/'
	background: 'frame.png',
	piece_1: 'piece1.png',
	piece_2: 'piece2.png',
	piece_3: 'piece3.png',
	piece_4: 'piece4.png',
	piece_5: 'piece5.png',
	piece_6: 'piece6.png',
	piece_7: 'piece7.png',
	piece_8: 'piece8.png',
	piece_1_outline: 'piece1_outline.png',
	piece_2_outline: 'piece2_outline.png',
	piece_3_outline: 'piece3_outline.png',
	piece_4_outline: 'piece4_outline.png',
	piece_5_outline: 'piece5_outline.png',
	piece_6_outline: 'piece6_outline.png',
	piece_7_outline: 'piece7_outline.png',
	piece_8_outline: 'piece8_outline.png'
}

loadImages(sources, initStage); // load images and stage


