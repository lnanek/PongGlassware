
	document.write('test');

	 console.log('pong.js loaded');
	 
/*
     var currentXPts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; 
     var currentYPts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; 
     var xPosPts     = [100, 150, 200, 250, 180, 120, 180, 130, 220, 250]; 
     var yPosPts     = [250, 200, 150, 100,  50,  80,  30, 180, 130, 250]; 
     var dirXPts     = [1, -1, 1, -1, 1, 1, -1, 1, -1, 1]; 
     var dirYPts     = [-1, 1, 1, -1, 1, -1, 1, 1, -1, 1]; 
     var deltaXPts   = [5, 10, 15, 20, 25, 15, 10, 25, 10, 20];
     var deltaYPts   = [25, 20, 15, 10, 5, 15, 10, 25, 10, 20];
*/
     var currentXPts = [0];
     var currentYPts = [0];
     var xPosPts     = [150];
     var yPosPts     = [250];
     var dirXPts     = [1];
     var dirYPts     = [1];
     var deltaXPts   = [8];
     var deltaYPts   = [15];

     var leftX = 10, rightX = 400, topY = 0, bottomY = 300;
     var topBorder = 60, bottomBorder = 50, padding = 20;
     var loopCount = 0, maxCount = 500, shortPause = 100; 
     var currWidth = 0, currHeight = 0, tapCount = 0;
     var index = 0, radius = 10, circleRadius=40, color=""; 
     var ballColors = ['#f00','#ff0','#0f0','#00f','#f0f'];

     var paddleLeftX = 25, paddleLeftY = 140;
     var paddleLeftWidth = 10, paddleLeftHeight = 90;
     var paddleRightX = 400, paddleRightY = 140;
     var paddleRightWidth = 10, paddleRightHeight = 90;
     var currPaddleLeftX = 0, currPaddleLeftY = 0;
     var currPaddleRightX = 0, currPaddleRightY = 0;

     var leftCollisionCount = 0, rightCollisionCount = 0;
     var paddleLeftPts = 0, paddleRightPts = 0; 
     var playerScores = "", winnerMsg = "", theTimeout;

     function initializePaddles() {
         var thePaddleLeft = $("#paddleLeft");

         $(thePaddleLeft).css('left',         paddleLeftX+'px');
         $(thePaddleLeft).css('top',          paddleLeftY+'px');
         $(thePaddleLeft).css('width',        paddleLeftWidth+'px');
         $(thePaddleLeft).css('height',       paddleLeftHeight+'px');
         $(thePaddleLeft).css('background',   "#00f");

         var thePaddleRight  = $("#paddleRight");
         $(thePaddleRight).css('left',         paddleRightX+'px');
         $(thePaddleRight).css('top',          paddleRightY+'px');
         $(thePaddleRight).css('width',        paddleRightWidth+'px');
         $(thePaddleRight).css('height',       paddleRightHeight+'px');
         $(thePaddleRight).css('background',   "#00f");
     }

     function updatePosition() {
        for(var i=0; i<currentXPts.length; i++) { 
          xPosPts[i] += dirXPts[i]*deltaXPts[i];
          yPosPts[i] += dirYPts[i]*deltaYPts[i];
 
          if(xPosPts[i] < leftX+radius) {
             xPosPts[i] = leftX+radius;
             dirXPts[i] *= -1;
             ++paddleRightPts;

             playerScores = "Player 1: "+paddleLeftPts+" Player 2: "+paddleRightPts;
             $("#footer").html(playerScores);
          }
  
          if(xPosPts[i] >= rightX-2*radius) {
             xPosPts[i] = rightX-2*radius;
             dirXPts[i] *= -1;
             ++paddleLeftPts; 

             playerScores = "Player 1: "+paddleLeftPts+" Player 2: "+paddleRightPts;
             $("#footer").html(playerScores);
          }
  
          if(yPosPts[i] <= topY+topBorder) {
             yPosPts[i] = topY+topBorder;
             dirYPts[i] *= -1;
          }
  
          if(yPosPts[i] >= bottomY-2*radius+topBorder-padding) {
             yPosPts[i] = bottomY-2*radius+topBorder-padding;
             dirYPts[i] *= -1;
          }

          checkForCollision(i);
        }
  
        displayBalls();

        // bounce again?
        if(++loopCount < maxCount) {
           if(theTimeout != null) { 
             theTimeout = setTimeout("updatePosition()",
                                     shortPause);
           }
        } else {
           if(paddleLeftPts > paddleRightPts) { 
              winnerMsg = "Player 1 Wins!";
           } else {
              winnerMsg = "Player 2 Wins!";
           } 

           $("#gameover").html(winnerMsg);
           $("#gameover").css('visibility', 'visible');
        }
     }


     function checkForCollision(i) {
        currPaddleLeftX = $("#paddleLeft").css('left').replace('px','');
        currPaddleLeftY = $("#paddleLeft").css('top').replace('px','');
        currPaddleLeftX = parseInt(currPaddleLeftX, 10); 
        currPaddleLeftY = parseInt(currPaddleLeftY, 10); 

        currPaddleRightX = $("#paddleRight").css('left').replace('px','');
        currPaddleRightY = $("#paddleRight").css('top').replace('px','');
        currPaddleRightX = parseInt(currPaddleRightX, 10); 
        currPaddleRightY = parseInt(currPaddleRightY, 10); 

        if((xPosPts[i] <= currPaddleLeftX) &&
           (xPosPts[i] >= currPaddleLeftX-paddleLeftWidth/2) &&
           (yPosPts[i] >= currPaddleLeftY) &&
           (yPosPts[i] <= currPaddleLeftY+paddleLeftHeight)) 
        {
//console.log("plx: "+currPaddleLeftX+" ply: "+paddleLeftY+
//            " prx: "+currPaddleRightX+" pry: "+paddleRightY);

           ++leftCollisionCount;
           xPosPts[i] = currPaddleLeftX+paddleLeftWidth;
           dirXPts[i] *= -1;
//console.log("left collision: "+leftCollisionCount+
//           "NEW xpospts: "+xPosPts[i]+" dirxpts: "+dirXPts[i]+" dirypts: "+dirYPts[i]);
         }

        if((xPosPts[i] >= currPaddleRightX-circleRadius-3*paddleRightWidth/4) &&
           (xPosPts[i] <= currPaddleRightX-circleRadius+0*paddleRightWidth) &&
           (yPosPts[i] >= currPaddleRightY) &&
           (yPosPts[i] <= currPaddleRightY+paddleRightHeight)) 
        {
           ++rightCollisionCount;
//console.log("right collision: "+rightCollisionCount);

           xPosPts[i] = currPaddleRightX-circleRadius-2*paddleRightWidth;
           dirXPts[i] *= -1;
//console.log("right collision: "+rightCollisionCount+
//           "NEW xpospts: "+xPosPts[i]+" dirxpts: "+dirXPts[i]+" dirypts: "+dirYPts[i]);
        }
     }

     function displayBalls() {
      //index = loopCount % 40;
        index = Math.floor(loopCount/40);

        if(index % 2 == 0) {
          currWidth  = (5+loopCount%40)+'px';
          currHeight = (5+loopCount%40)+'px';
        } else {
          currWidth  = (45-(loopCount%40))+'px';
          currHeight = (45-(loopCount%40))+'px';
        }
 
        for(var i=0; i<currentXPts.length; i++) { 
          color = ballColors[i % ballColors.length];
        //color = ballColors[(i+loopCount) % ballColors.length];

          var theCircle = $("#circle"+i);
          // update the attributes of the ball... 
          $(theCircle).css('left',         xPosPts[i]+'px');
          $(theCircle).css('top',          yPosPts[i]+'px');
          $(theCircle).css('background',   color);

        //$("#circle"+i).css('width',        currWidth);
        //$("#circle"+i).css('height',       currHeight);
        //$("#circle"+i).css('borderRadius', (loopCount%50)+"%");
        }
     }

	 console.log('setting events');
	 $(document).on('pageinit', "#page1", (function(event){ 
    	 console.log('pageinit ran');
    	 
        event.preventDefault();

        theTimeout = setTimeout("updatePosition()",
                                shortPause);

        initializePaddles();
        updatePosition();

        $("#page1").bind('vmousemove', function(e){
           e.preventDefault();
           var xPos = e.pageX;
           var yPos = e.pageY;

           if(xPos < 50) {
             currPaddleLeftY = $("#paddleLeft").css('top').replace('px','')
             currPaddleLeftX = parseInt(currPaddleLeftX, 10); 

             if((yPos > 55) && (yPos < 300-paddleLeftHeight+65)) {
                $("#paddleLeft").css('top',  yPos+'px');
             }
           }
           else if(xPos > 350) {
             currPaddleRightY = $("#paddleRight").css('top').replace('px','')
             currPaddleRightY = parseInt(currPaddleRightY, 10); 

             if((yPos > 55) && (yPos < 300-paddleRightHeight+65)) {
                $("#paddleRight").css('top',  yPos+'px');
             }
           }
        });

        $("#paddleLeft").bind("vmousedown",function(e, ui){
           e.preventDefault();
         //var xPos = e.pageX;
           var yPos = e.pageY;
           $("#paddleLeft").css('top',  yPos+'px');
        });

        $("#paddleRight").bind("vmousedown",function(e, ui){
           e.preventDefault();
         //var xPos = e.pageX;
           var yPos = e.pageY;
           $("#paddleRight").css('top',  yPos+'px');
        });

/*
        $("#page1").bind('vmousedown', function(event){
          ++tapCount;

          if(tapCount % 2 == 1) {
            theTimeout = null;
          } else {
            loopCount = 0;
            theTimeout = setTimeout("updatePosition()",
                                    shortPause);
          }
        });
*/
     }));