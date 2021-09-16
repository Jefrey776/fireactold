import React from 'react'
import p5 from 'p5'




class Sketch extends React.Component {
    constructor(props) {
        super(props)
        //p5 instance mode requires a reference on the DOM to mount the sketch
        //So we use react's createRef function to give p5 a reference
        this.myRef = React.createRef()
    }

    // This uses p5's instance mode for sketch creation and namespacing
    Sketch = (p) => {


            let allRoots = Array();
            let fr = 25;
            let op = 0;
            let opAdd = 0.005;
            let thicc = 10;
            let globColor = p.color(255);

            function Root(posX, posY, size){
                this.horizontality = Math.random()*10;
                this.lifetime = Math.random()*205;
                this.opacity = p.noise(op)*255;
                this.splice = 0;
                this.timeout = Math.random()*30;
                this.prevX = 0;
                this.prevY = 0;
                this.posX = posX;
                this.posY = posY;
                this.direction = (Math.random() < 0.5) ? 1 : -1;
                this.size = size;
            }
            
            Root.prototype = {
                constructor: Root,
                //functions
                render: function (){
                    if(this.timeout < 0){
                        this.prevX = this.posX;
                        this.prevY = this.posY;
                        this.posX = this.posX + (10*p.noise(this.posY*150) * this.direction);
                        this.posY = this.posY + 15*p.noise(this.posX*150);
            
                        if(this.posY )
                        var makeSubRoot = (Math.random() < 0.05) ? true:false;
            
                        if(makeSubRoot && this.size > 0.5){
                            let r = new Root(this.posX, this.posY, this.size);
                            allRoots.push(r);
                            this.splice = allRoots.length-1;
                        }
            
                        /*if(this.posY > windowHeight){
                            allRoots.splice(this.splice, this.splice);
                        }*/
                        
                        p.strokeWeight(this.size);
                        p.stroke(this.opacity);
                        if(this.size <= 0 && this.lifetime <= 0){
                            p.stroke(0);
                        }
                        p.line(this.prevX, this.prevY, this.posX, this.posY);
                        
                        if(this.size > 0)
                            this.size-=0.2;
                        else this.lifetime--;
                        
                    }
                    else this.timeout--;
                }
            }


            function LetterF(posX, posY, h){
                this.prevXDown = 0;
                this.prevYDown = 0;
                this.posXDown = posX;
                this.posYDown = posY;
                
                this.prevXRight = 0;
                this.prevYRight = 0;
                this.fLineY = posY;
                this.fLineX = posX;
                
                this.prevXR2 = 0;
                this.prevYR2 = 0;
                this.fLineY2 = 0;
                this.fLineX2 = posX;
                
                this.count = 0;
                this.midpoint = 0;
                this.h = h;
                this.fHasStarted = false;
                this.perlin = Math.random();
                this.perlinMod = 0.05;
            }

            LetterF.prototype = {
                constructor: LetterF,

                render: function(){

                    if(this.count < this.h){
                        this.prevXDown = this.posXDown;
                        this.prevYDown = this.posYDown;
                        this.posYDown++;

                        this.prevXRight = this.fLineX;
                        this.fLineX++;
                        
                        var off1 = p.map(p.noise(this.perlin), 0, 1, -10, 30);
                        var off2 = p.map(p.noise(this.perlin-this.perlinMod), 0, 1, -30, 30);

                        p.strokeWeight(thicc);
                        p.stroke(255);

                        p.line(this.prevXDown + off2, this.prevYDown, this.posXDown+off1, this.posYDown);
                        p.line(this.prevXRight, this.fLineY + off1, this.fLineX, this.fLineY + off2);

                        if(this.fHasStarted){
                            this.prevXR2 = this.fLineX2;
                            this.prevXY2 = this.fLineY2;
                            this.fLineX2++;
                            p.line(this.prevXR2, this.midpoint+off1, this.fLineX2, this.midpoint+off2);
                        }

                        if(this.count == this.h/2){
                            this.midpoint = this.posYDown;
                            this.fHasStarted = true;

                        }

                        this.perlin+=this.perlinMod;
                        this.count++;
                    }
                }
            }




            function LetterO(posX, posY, r, speed){
                this.posX = posX;
                this.posY = posY;
                this.r = r;
                this.angle = 0;
                this.speed = speed;
                this.perlin = 0;
                this.perlinMod = 0.05;
            }

            LetterO.prototype = {
                constructor: LetterO,
                render: function(){
                    /*  Crazy Circle
                    var cx1 = this.posX + this.r * Math.cos(this.angle);
                    var cy1 = this.posY + this.r * Math.sin(this.angle);
                    
                    var cx2 = this.posX + this.r * Math.cos(this.angle-this.speed);
                    var cy2 = this.posY + this.r * Math.sin(this.angle-this.speed);
                    */
                    
                    var off = p.map(p.noise(this.perlin), 0, 1, -50, 50);
                    var off2 = p.map(p.noise(this.perlin-this.perlinMod), 0, 1, -50, 50);
                    
                    var cx1 = this.posX + (this.r + off) * Math.cos(this.angle);
                    var cy1 = this.posY + (this.r + off) * Math.sin(this.angle);
                    
                    var cx2 = this.posX + (this.r + off2) * Math.cos(this.angle-this.speed);
                    var cy2 = this.posY + (this.r + off2) * Math.sin(this.angle-this.speed);
                    
                    p.strokeWeight(thicc);

                    p.stroke(globColor);
                    p.line(cx1, cy1, cx2, cy2);
                    
                    this.angle+=this.speed;
                    this.perlin += this.perlinMod;
                }
            }




            function LetterR(posX, posY, r, h, speed){
                this.r = h/4;
                this.h = h;
                this.count = 0;
                
                this.posX = posX;
                this.posY = posY;
                this.prevX = 0;
                this.prevY = 0;
                
                this.bowX = posX;
                this.bowY = posY;
                this.prevBowX = 0;
                this.prevBowY = 0;
                this.angle = -1.5;
                this.speed = speed;
                
                this.bowFinished = false;
                
                this.perlin = 0;
                this.perlinMod = 0.05;
            }

            LetterR.prototype = {
                constructor: LetterR,
                render: function(){
                    if(this.count < this.h){
                        this.prevX = this.posX;
                        this.prevY = this.posY;
                        this.posY++;

                        var off = p.map(p.noise(this.perlin), 0, 1, -10, 20);
                        var off2 = p.map(p.noise(this.perlin-this.perlinMod), 0, 1, -10, 20);

                        var cx1 = this.bowX + (this.r+off) * Math.cos(this.angle);
                        var cy1 = this.bowY + (this.r+off) * Math.sin(this.angle) + this.r ;

                        var cx2 = this.prevBowX + (this.r + off2) * Math.cos(this.angle-this.speed);
                        var cy2 = this.prevBowY + (this.r + off2) * Math.sin(this.angle-this.speed);
                        
                        p.strokeWeight(thicc);
                        p.stroke(255);
                        p.line(this.prevX+off2, this.prevY, this.posX+off, this.posY);
            
                        if(this.angle < 1.5)
                        p.circle(cx1, cy1, 3);
                        
                        else if(this.angle >= 1.5 && !this.bowFinished){
                            this.bowFinished = true;
                            this.prevBowX = cx1;
                            this.prevBowY = cy1;
                        }
                        
                        if(this.bowFinished){
                            p.circle(this.prevBowX+off, this.prevBowY+off, 3);
                            this.prevBowX+=p.map(Math.abs(off), -10, 20, 1, 3);
                            this.prevBowY+= p.map(Math.abs(off2), -10, 20, -1, 5);
                        }

                        this.angle+=this.speed;
                        this.perlin+=this.perlinMod;
                        this.count++;
                    }
                }
            }



            function LetterE(posX, posY, h){
            /* One-p.Stroke-Version
                this.posX = posX;
                this.posY = posY;
                this.r = r;
                this.angle = 0;
                this.speed = speed;
                this.perlin = 0;
                this.perlinMod = 0.05;
                this.maxHeigth = maxHeight;

                //first e-Line 
                this.distanceFromPosX = 1;
                this.prevDistanceFromPosX = 0;

                //S-Variables
                this.sX = 0;
                this.sY = 0;
                this.prevSX = 0;
                this.prevSY = 0;
                this.sHasStarted = false;
                this.sHasStarted2 = false;
                this.sSecondeHalf = false;
                this.newY;
                */
                
                //F-Shape-E Version
                this.prevX = 0;
                this.prevXDown = 0;
                this.prevYDown = 0;
                this.posXDown = posX;
                this.posYDown = posY;
                
                this.prevXRight = 0;
                this.prevYRight = 0;
                this.fLineY = posY;
                this.fLineX = posX;
                this.eLineY = posY + h;
                this.eLineX = posX;
                
                this.prevXR2 = 0;
                this.prevYR2 = 0;
                this.fLineY2 = 0;
                this.fLineX2 = posX;
                this.eLineXPrev = posX;
                this.eLineYPrev = posY + h;
                
                this.count = 0;
                this.midpoint = 0;
                this.h = h;
                this.fHasStarted = false;
                this.perlin = Math.random();
                this.perlinMod = 0.05;


            }

            LetterE.prototype = {
                constructor: LetterE,
                render(){
                    /*
                        //p.noise Variablen
                        var off = p.map(p.noise(this.perlin), 0, 1, -50, 50);
                        var off2 = p.map(p.noise(this.perlin-this.perlinMod), 0, 1, -50, 50);
                        
                        p.strokeWeight(15);
                        p.stroke(255);
                    
                    
                        let eStart = (next) => {
                    
                            if(this.distanceFromPosX < this.posX + this.r) {
                                var x1 = this.posX + this.distanceFromPosX - this.r;
                                var x2 = this.posX + this.prevDistanceFromPosX - this.r;
                                
                                line(x1, this.posY + off/5, x2, this.posY + off2/5);
                    
                                this.prevDistanceFromPosX = this.distanceFromPosX;
                                this.distanceFromPosX += this.speed*30;
                            }
                            else {
                                next();
                            }
                        
                        }
                    
                        let eCircle = () => {
                            
                            
                            var cx1 = this.posX + (this.r + off) * Math.cos(this.angle);
                            var cy1 = this.posY + (this.r + off) * Math.sin(this.angle);
                            
                            var cx2 = this.posX + (this.r + off2) * Math.cos(this.angle-this.speed);
                            var cy2 = this.posY + (this.r + off2) * Math.sin(this.angle-this.speed);
                            
                        
                            line(cx1, cy1, cx2, cy2);
                            this.r++;
                            this.angle-=this.speed;
                        
                        }
                    
                        //eCircle()
                        eStart(eCircle);
                        
                        this.perlin += this.perlinMod;
                    }*/
                    if(this.count < 2*this.h) {
                        if(this.count < this.h){
                            this.prevXDown = this.posXDown;
                            this.prevYDown = this.posYDown;
                            this.posYDown++;

                            this.prevXRight = this.fLineX;
                            this.fLineX++;

                            var off1 = p.map(p.noise(this.perlin), 0, 1, -10, 10);
                            var off2 = p.map(p.noise(this.perlin-this.perlinMod), 0, 1, -10, 10);

                            p.strokeWeight(thicc);
                            p.stroke(255);

                            p.line(this.prevXDown + off2, this.prevYDown, this.posXDown + off1, this.posYDown);
                            p.line(this.prevXRight, this.fLineY + off1, this.fLineX, this.fLineY + off2);

                            if(this.fHasStarted){
                                this.prevXR2 = this.fLineX2;
                                this.prevXY2 = this.fLineY2;
                                this.fLineX2++;
                                p.line(this.prevXR2, this.midpoint+off1, this.fLineX2, this.midpoint+off2);
                            }

                            if(this.count == this.h/2){
                                this.midpoint = this.posYDown;
                                this.fHasStarted = true;

                            }

                            
                        } else {
                            
                            this.eLineXPrev = this.eLineX;
                            this.eLineYPrev = this.eLineY;
                            
                            this.eLineX++;
                            
                            var off1 = p.map(p.noise(this.perlin), 0, 1, -10, 30);
                            var off2 = p.map(p.noise(this.perlin-this.perlinMod), 0, 1, -10, 30);
                            console.log(off1)

                            p.strokeWeight(thicc*3);
                            p.stroke(255);
                            //console.log(`${this.eLineXPrev}, ${this.eLineYPrev}, ${this.eLineX}, ${this.eLineY}`)
                            p.line(this.eLineXPrev, this.eLineYPrev + off2, this.eLineX, this.eLineY + off1);
                        }
                        this.perlin+=this.perlinMod;
                    }
                    this.count++;

                }
            }
            //                                  69, 0.07,









            let LetterS = function(posX, posY, h, speed) {
                this.h = h;
                this.r = h/4;

                this.posX1 = posX;
                this.posY1 = posY;
                this.posX2 = posX;
                this.posY2 = posY + this.h/2;

                this.angle = -1;
                this.speed = speed;
                this.perlin = Math.random() * 100;
                this.perlinMod = 0.05;

                this.inSecondRound = false;
                this.done = false;
                this.thiccness = 2;
            }

            LetterS.prototype = {
                constructor: LetterS,
                render: function() {
                    if(!this.done && this.thiccness > 0) {
                        var off = p.map(p.noise(this.perlin), 0, 1, -50, 50);
                        var off2 = p.map(p.noise(this.perlin-this.perlinMod), 0, 1, -50, 50);

                        let firstHalf = () => {
                            var cx1 = this.posX1 + (this.r + off) * Math.cos(this.angle);
                            var cy1 = this.posY1 + (this.r + off) * Math.sin(this.angle);
                            
                            var cx2 = this.posX1 + (this.r + off2) * Math.cos(this.angle+this.speed);
                            var cy2 = this.posY1 + (this.r + off2) * Math.sin(this.angle+this.speed);
                            
                            console.log(`${cx1}, ${cy1}, ${cx2}, ${cy2}`)

                            p.strokeWeight(this.thiccness);
                    
                            p.stroke(255);
                            p.line(cx1, cy1, cx2, cy2);
                            
                            console.log(this.angle)
                            this.angle-=this.speed;
                            this.perlin += this.perlinMod;
                            this.thiccness += 0.5;
                        }

                        let secondHalf = () => {
                            var cx1 = this.posX2 + (this.r - off) * Math.cos(this.angle);
                            var cy1 = this.posY2 + (this.r - off) * Math.sin(this.angle);
                            
                            var cx2 = this.posX2 + (this.r - off2) * Math.cos(this.angle-this.speed);
                            var cy2 = this.posY2 + (this.r -off2) * Math.sin(this.angle-this.speed);
                            
                            console.log(`${cx1}, ${cy1}, ${cx2}, ${cy2}`)

                            p.strokeWeight(this.thiccness);
                    
                            p.stroke(255);
                            p.line(cx1, cy1, cx2, cy2);
                            
                            console.log(this.angle)
                            this.angle+=this.speed;
                            this.perlin += this.perlinMod;
                            this.thiccness -= 0.3;

                            if(!(this.angle < 2.7 && this.angle >= -1.7))
                            this.done = true;
                        }

                        if(this.angle > -4.5 && !this.inSecondRound)
                            firstHalf();
                        else {
                            if(!this.inSecondRound) {
                                this.angle = -1.7;
                                this.inSecondRound = true;
                            }
                            secondHalf();
                        }
                    }    
                }
            }







            let LetterT = function(posX, posY, h, speed) {
                this.posXDown = posX;
                this.posYDown = posY;
                this.posXRight = posX;
                this.posXLeft = posX;
                this.posYSides = posY;

                this.speed = speed;
                this.h = h;
                this.thiccness = 20;

                this.perlin = 88;
                this.perlinMod = 0.05;
            }

            LetterT.prototype = {
                constructor: LetterT,
                render: function() {
                    if(this.thiccness > 0) {
                        //console.log(this.posYDown);
                        var offR = p.map(p.noise(this.perlin), 0, 1, -10, 10);
                        var offR2 = p.map(p.noise(this.perlin-this.perlinMod), 0, 1, -10, 10);
                        var offL = p.map(p.noise(this.perlin+42), 0, 1, -10, 10);
                        var offL2 = p.map(p.noise(this.perlin+42-this.perlinMod), 0, 1, -10, 10);
                        var offD = p.map(p.noise(this.perlin+27), 0, 1, -50, 50);
                        var offD2 = p.map(p.noise(this.perlin+27-this.perlinMod), 0, 1, -10, 10);

                        p.strokeWeight(this.thiccness)
                        p.stroke(255)

                        p.line(this.posXDown + offD, this.posYDown, this.posXDown + offD2, this.posYDown + 1)
                        p.line(this.posXRight, this.posYSides  + offR, this.posXRight + 1, this.posYSides + offR2)
                        p.line(this.posXLeft, this.posYSides + offL, this.posXLeft - 1, this.posYSides + offL2)

                        this.posYDown+=1.5;
                        this.posXRight++;
                        this.posXLeft--;
                        this.perlin += this.perlinMod;
                        this.thiccness -= 0.1;
                    }
                }
            }




            
//________________________________________ I _________________________________________________

let LetterI = function(posX, posY, h, speed) {
    this.posX = posX;
    this.posY = posY;
    this.h = h;
    this.speed = speed;

    this.perlin = 69;
    this.perlinMod = 0.05;
}

LetterI.prototype = {
    constructor: LetterI,

    render: function() {
        var off1 = p.map(p.noise(this.perlin), 0, 1, -10, 15);
        var off2 = p.map(p.noise(this.perlin-this.perlinMod), 0, 1, -10, 15);

        //console.log(`LetterI.render(): [X: ${this.posX} | Y: ${this.posY} | off1: ${off1} | off2: ${off2} ]`)

        p.stroke(globColor)
        p.line(this.posX + off1, this.posY, this.posX + off2, this.posY-this.speed);

        this.posY++;
        this.perlin += this.perlinMod
    }

}




//______________________________________ L ___________________________________________________________________

let LetterL = function(posX, posY, h, w, speed) {
    this.posXMemory = posX;
    this.posX = posX
    this.posY = posY
    this.h = posY +  h
    this.w = w
    this.speed = speed

    this.perlin = 921;
    this.perlinMod = 0.05
}

LetterL.prototype = {
    constructor: LetterL,

    render: function() {
        if(this.posX < this.posXMemory + this.w) {
            var down = this.posY > this.h ? false : true;
            var off1 = p.map(p.noise(this.perlin), 0, 1, -20, 20);
            var off2= p.map(p.noise(this.perlin-this.perlinMod), 0, 1, -20, 20);

            p.stroke(globColor)
            p.strokeWeight(10)
            //console.log(`LetterL.render(): [X: ${this.posX} | Y: ${this.posY} | off1: ${off1} | off2: ${off2} , down: ${down}]`)

       
            if(!down)   p.line(this.posX, this.posY + off1, this.posX - 1, this.posY - off2);
            if(down)    p.line(this.posX + off1, this.posY, this.posX - off2, this.posY - 1);

            
            if(!down)   this.posX+=this.speed;
            if(down)    this.posY+=this.speed;
            
            this.perlin += this.perlinMod;
        }
    }
}



let LetterA = function(posX, posY, h, w, speed){
    this.posXLeft = posX
    this.posYLeft = posY

    this.posXRight = posX
    this.posYRight = posY

    this.posYMemory = posY

    this.posXMid = 0
    this.posYMid = 0
    this.h = h
    this.w = w
    this.speed = speed

    this.hasSplit = false

    this.perlin = 90
    this.perlinMod = 0.05
}

LetterA.prototype = {
constructor: LetterA,

render: function() {
        console.log(`LetterA.render(): [ hasSplit: ${this.hasSplit}]`)


        var off1M = p.map(p.noise(this.perlin), 0, 1, -20, 20);
        var off2M = p.map(p.noise(this.perlin-this.perlinMod), 0, 1, -20, 20);

        var off1L = p.map(p.noise(this.perlin+20), 0, 1, -20, 20);
        var off2L = p.map(p.noise(this.perlin+20-this.perlinMod), 0, 1, -20, 20);

        var off1R = p.map(p.noise(this.perlin-20), 0, 1, -20, 20);
        var off2R= p.map(p.noise(this.perlin-20-this.perlinMod), 0, 1, -20, 20);

        if(this.posYLeft < this.posYMemory + this.h){
            if(this.posYLeft > this.posYMemory + this.h/2 && this.posXMid == 0) {
                this.hasSplit = true;
                this.posXMid = this.posXLeft;
                this.posYMid = this.posYLeft;
            }

            p.strokeWeight(thicc);

            p.line(this.posXLeft + off1L, this.posYLeft, this.posXLeft + this.speed*2 + off2L, this.posYLeft - this.speed);
            p.line(this.posXRight + off1R, this.posYRight, this.posXRight - this.speed*2 + off2R, this.posYRight - this.speed);

            if(this.hasSplit) {
                p.line(this.posXMid, this.posYMid + off1M, this.posXMid - this.speed, this.posYMid - this.speed + off2M);
                this.posXMid += this.speed;
            }

            this.posXLeft -= this.speed/2;
            this.posYLeft += this.speed;

            this.posXRight += this.speed/2;
            this.posYRight += this.speed;

            this.perlin += this.perlinMod;
        }  
    }
}
//_________________________________________________________ Letters _____________________________________________________________________
let fLetter = new LetterF(50, 200, 200);
let OLetter = new LetterO(300, 300, 75, 0.07);
let RLetter = new LetterR(500, 200, 30, 200, 0.07);
let ELetter = new LetterE(700, 200, 120);
let SLetter = new LetterS(900, 200, 200, 0.07)
let TLetter = new LetterT(1200, 200, 200, 0.07)

let ILetter = new LetterI(50, 500, 200, 0.07);
let SLetter2 = new LetterS(300, 500, 200, 0.07);
let LLetter = new LetterL(500, 500, 200, 80, 3)
let ALetter = new LetterA(700, 500, 200, 100, 3)



        p.setup = () => {
            let page = document.getElementById("main-content");
            page.addEventListener('click',clickHandler);
            
            
            let r1 = new Root(p.map(Math.random(), 0, 1, p.windowWidth/3, p.windowWidth*0.66), -100, p.map(Math.random(), 0, 1, 15, 25));
            let r2 = new Root(p.map(Math.random(), 0, 1, p.windowWidth/3, p.windowWidth*0.66), -100, p.map(Math.random(), 0, 1, 15, 25));
            
            let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
            cnv.parent("main-content");
            cnv.position(0, 0, 'block');

            p.background(0, 0, 0);
            p.frameRate(fr);
            
            
            allRoots.push(r1);
            //allRoots.push(r2);
            p.stroke(255);
        }

        p.draw = () => {
            for(let root of allRoots){
                root.render();
             }


             fLetter.render();
             OLetter.render();
             RLetter.render();
             ELetter.render();
             SLetter.render();
             TLetter.render();

             ILetter.render();
             SLetter.render();
             LLetter.render();
             ALetter.render();
             SLetter2.render();
             TLetter.render();
         
             op+=opAdd;
             //console.log(allRoots.length);
             thicc -= 0.03;
        }

        function clickHandler(event){
            console.log("EventHandler: new Root");
            
            var x = p.map(Math.random(), 0, 1, p.windowWidth/3, p.windowWidth*0.66);
            var s = p.map(p.mouseY, 0, p.windowHeight,18, 0);
            let rNew = new Root(p.mouseX, p.mouseY, s);
            
            allRoots.push(rNew);
        }
    
    }

    componentDidMount() {
        //We create a new p5 object on component mount, feed it 
        this.myP5 = new p5(this.Sketch, this.myRef.current)
    }

    render() {
        const style = {
            zIndex: 0,
            position: 'relative'
        }

        return (
            //This div will contain our p5 sketch
            <div ref={this.myRef} style={style}>

            </div>
        )
    }
}

export default Sketch