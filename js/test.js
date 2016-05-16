// uses http://konvajs.github.io/, and following the 'animals on the beach' demo,
// modified for use in major project, uses the original functions such as 'loadImages' and 'isNearOutline' etc
// events and such are part of the konvaJS framework
// main changes are the addition of jQuery send messages and form to collection requests,
// creation of functions to allow drag objects to snap to any 'snappable' area

var width = window.innerWidth;
var height = window.innerHeight;
score = 0;
// initiate scores for dislay and input
$('.scoreMessage').html("It's okay, you can try again next time. REMEMBER: <code>&lt;opening&gt;</code> and <code>&lt;/closing&gt;</code>");
// put score in results modal
$('.score').html(score);
$('#newScore').val(score);

    function loadImages(sources, callback) {
        // change to match which level it is
        var assetDir = 'assets/';
        var images = {};
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
            images[src].src = assetDir + sources[src];
        }
    }
    function isNearOutline(code, outline) {
        var a = code;
        var o = outline;
        var ax = a.getX();
        var ay = a.getY();

        // distance the object are be before it snaps into place
        if(ax > o.x - 50 && ax < o.x + 50 && ay > o.y - 50 && ay < o.y + 50) {
            return true;
        }
        else {
            return false;
        }
    }
    function drawBackground(background, backImg, text) {
        var context = background.getContext();
        context.drawImage(backImg, 0, 0);
        // text properties, text only used for debugging
        context.setAttr('font', '20pt Calibri');
        context.setAttr('textAlign', 'center');
        context.setAttr('fillStyle', 'black');
        context.fillText(text, background.getStage().getWidth() / 2, 300);
    }

    function initStage(images) {
        var stage = new Konva.Stage({
            container: 'gameDesktop',
            width: 410,
            height: 430
        });
        var background = new Konva.Layer();
        var codeLayer = new Konva.Layer();
        var codeShapes = [];
        score = 0;

        // image positions
        var codes = {
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
        // image outlines/snapping areas positions
        var outlines = {
            piece_1_black: {
            x: 0,
            y: 0
        },
        piece_2_black: {
            x: 0,
            y: 0
        },
        piece_3_black: {
            x: 0,
            y: 0
        },
        piece_4_black: {
            x: 0,
            y: 0
        },
        piece_5_black: {
            x: 0,
            y: 0
        },
        piece_6_black: {
            x: 0,
            y: 0
        },
        piece_7_black: {
            x: 0,
            y: 0
        },
        piece_8_black: {
            x: 0,
            y: 0
        }
        };

        // create draggable code
        for(var key in codes) {

            (function() {
                var privKey = key;
                var snip = codes[key];

                var code = new Konva.Image({
                    image: images[key],
                    x: snip.x,
                    y: snip.y,
                    draggable: true,
                    id: key
                });
                console.log("snip:"+ JSON.stringify(snip));

                // function to created to take any code image so it can be dragged and snapped into place
                function snapTo(code, outlineSnap) {
                    var outline = outlines[outlineSnap + '_black'];
                    if(isNearOutline(code, outline)) {
                        code.position({
                            x : outline.x,
                            y : outline.y
                        });

                        console.log("privKey:"+ privKey);
                        console.log("Key:"+ key);
                        console.log(code.id());
                        codeLayer.draw();
                        var testKey = privKey+ "_black";


                        // removes drag ability to object
                        // commented out incase score bug is though to be easily abused
                        /*if(code.id() == outlineSnap) {
                            setTimeout(function() {
                                code.draggable(false);
                            }, 50);
                        }*/
                    }
                }


                code.on('dragstart', function() {
                    this.moveToTop();
                    codeLayer.draw();
                });
                console.log("key before:"+ key);
                /*
               * check if code is in the right spot and
               * snap into place if it is
               */
                code.on('dragend', function() {
                    snapTo(code, "piece_1");
                    snapTo(code, "piece_1");



                    // if in right place give 1 point
                    if(isNearOutline(code, outlines[privKey + '_black'])) {
                        if(privKey == code.id()){
                            score += 1;
                            //update score in sumbit modal
                            $('.score').html(score);
                            $('#newScore').val(score);
                            //change to match score
                            if(score >= 2) {
                                // text kept for debugging purposes
                                var text = '';
                                // put max score in modal
                                $('.scoreMessage').html("You've learnt you first Element! Keep this up and you'll beat those HexaBunnies back to their planet!");
                                $('.score').html(score);
                                $('#newScore').val(score);
                                drawBackground(background, images.background, text);
                            }
                            // keep track of score, for debugging
                            console.log(score);
                        }
                    }

                    // not in right place take away score
                    if(!isNearOutline(code, outlines[privKey + '_black'])) {
                        codeLayer.draw();
                        if(score == 0){
                            $('#newScore').val(score); 
                            console.log("no score")
                        }
                        else {

                           score -= 1;
                           $('#newScore').val(score);
                        }
                        console.log(score);
                    }

                });
                // make code glow on mouseover
                code.on('mouseover', function() {
                    code.image(images[privKey + '_glow']);
                    codeLayer.draw();
                    document.body.style.cursor = 'pointer';
                });
                // return code on mouseout
                code.on('mouseout', function() {
                    code.image(images[privKey]);
                    codeLayer.draw();
                    document.body.style.cursor = 'default';
                });

                code.on('dragmove', function() {
                    document.body.style.cursor = 'pointer';
                });

                codeLayer.add(code);
                codeShapes.push(code);
            })();
        }

        // create code outlines
        for(var key in outlines) {

            (function() {
                var imageObj = images[key];
                var out = outlines[key];

                var outline = new Konva.Image({
                    image: imageObj,
                    x: out.x,
                    y: out.y
                });

                codeLayer.add(outline);
            })();
        }

        stage.add(background);
        stage.add(codeLayer);
        drawBackground(background, images.background, " ");
    }
    // images uses in game level
    var sources = {
        background: 'frame.png',
    piece_1: 'piece1.png',
    piece_2: 'piece2.png',
    piece_3: 'piece3.png',
    piece_4: 'piece4.png',
    piece_5: 'piece5.png',
    piece_6: 'piece6.png',
    piece_7: 'piece7.png',
    piece_8: 'piece8.png',
    piece_1_black: 'piece1_outline.png',
    piece_2_black: 'piece2_outline.png',
    piece_3_black: 'piece3_outline.png',
    piece_4_black: 'piece4_outline.png',
    piece_5_black: 'piece5_outline.png',
    piece_6_black: 'piece6_outline.png',
    piece_7_black: 'piece7_outline.png',
    piece_8_black: 'piece8_outline.png'
    };
    // called function to get images and initate stage
    loadImages(sources, initStage);
