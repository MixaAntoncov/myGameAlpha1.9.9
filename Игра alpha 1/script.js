const clickQueen = document.querySelector('#Queen');
const clickEat = document.querySelector('#Eat');
const clickStart = document.querySelector('#start');
const divOfCell = document.getElementById("countOfCell");
const divOfPoint = document.getElementById("countOfPoint");
let speedBar = {
    speed05: document.getElementById("divspeed05"),
    speed1: document.getElementById("divspeed1"),
    speed2: document.getElementById("divspeed2"),
    speed4: document.getElementById("divspeed4"),
}
let box = document.getElementById('pixBox');
let ctxBox = box.getContext('2d');
let ArrayCell = [];
let ArrayQueen = [];
let ArrayEat = [];
let ArrayPoint = [];
let ArrayPeople = [];
let ArrayRocket = [];
let setup = {
    particleColor: "rgb(200,200,200)",
    lineColor: "rgb(200,200,200)",
    eatOnStart: 25,
    queenOnStart: 5,
    cellOnStart: 100,
    PointOnSrart: 5,

    defaultSpeed: 1,
    variantSpeed: 2,
    speedPeople: 0.1,
    speedOfRocket: 0.5,

    defaultRadius: 1,
    screamRadius: 50,
    radiusOfEat: 5,
    radiusOfQueen: 5,
    radiusOfPoint: 5,
    radiusOfPeople: 10,
    radiusPeopleSee: 800,
    radiusPeopleBang: 300,
    radiusRocketExplosion: 50,

    maxhealthQueen: 1000,
    maxPoint: 10,
    healthOfPeople: 500,
    chargeOfRocket: 50,

    indexPriceCell: 6,

    points: 0,

    cooldownPeople: 50,
}
let CountOfEat = 0;
let CountOfQueen = 0;
let CountOfPoint = 0;

let delay = 200, tid;

window.addEventListener("resize", function(){
 deBouncer();
});

let deBouncer = function() {
 clearTimeout(tid);
 tid = setTimeout(function() {
 resizeReset();
 }, delay);
};

clickQueen.addEventListener("click", function(){
    bornQueen();
    
});

clickEat.addEventListener("click", function(){
    generateEat();
});

clickStart.addEventListener("click", function(){
    for (let i = 0; i < 10; i++){
        ArrayQueen[0].bornCell();
    }
});

let resizeReset = function() {
    w = box.width = window.innerWidth -5;
    h = box.height = window.innerHeight - 5;
   }

function start(){
    resizeReset();
    for (let i = 0; i < setup.queenOnStart; i++){
        bornQueen();
    }

    speedBar.speed1.style.backgroundColor = "#4350ff";
    StartbornCell();
    
    for (let i = 0; i < setup.eatOnStart; i++){
        generateEat();
    }

    for (let i = 0; i < setup.PointOnSrart; i++){
        generatePoint();
    }

    window.requestAnimationFrame(live);
   }

class Cell {

    constructor(options){
        this.eat = false;
        this.point = false;
        this.angle = Math.floor(Math.random() * 2 * Math.PI);
        this.posX = options.posX;
        this.posY = options.posY;
        this.speed = setup.defaultSpeed + Math.random() * setup.variantSpeed; 
        this.color = setup.particleColor;
        this.radius = setup.defaultRadius; 
        this.distanceQueen = 0;
        this.distanceEat = 1000;
        this.vector = {
            x: Math.cos(this.angle) * this.speed,
            y: Math.sin(this.angle) * this.speed,
        }
        this.border = function(){ 
            if (this.posX >= w || this.posX <= 0) { 
                this.vector.x *= -1;
                this.angle = Math.acos(this.vector.x/this.speed);
            }
            if (this.posY >= h || this.posY <= 0) {
                this.vector.y *= -1;
                this.angle = Math.asin(this.vector.y/this.speed);
            }
            if (this.posX > w) this.posX = w;
            if (this.posY > h) this.posY = h;
            if (this.posX < 0) this.posX = 0;
            if (this.posY < 0) this.posY = 0; 
            };
            this.draw = function(){ 
            ctxBox.beginPath();
            ctxBox.arc(this.posX, this.posY, 3, 0, Math.PI*2);
            ctxBox.closePath();
            ctxBox.fillStyle = this.color;
            ctxBox.fill();
            };
    }

    correctAngle(){
        let count = Math.random()*2;
        if (count < 1) this.angle -= Math.random() * 0.2;
        else this.angle += Math.random() * 0.2;
        this.vector.x = Math.cos(this.angle) * this.speed;
        this.vector.y = Math.sin(this.angle) * this.speed;
    }

    

    go(){
        this.border(); 
        this.posX += this.vector.x; 
        this.posY += this.vector.y;
        this.correctAngle();
        this.distanceEat++;
        this.distanceQueen++;
    }

    eating(){
        this.eat = !this.eat;
    }

    takePoint(){
        this.point = !this.point;
    }
}

class Eat {

    constructor(options){
        this.count = 1000;
        this.posX = Math.random() * w;
        this.posY = Math.random() * h;
        this.radius = setup.radiusOfEat;
        this.color = '#a83e00';
        this.draw = function(){ 
            ctxBox.beginPath();
            ctxBox.arc(this.posX, this.posY, this.count/100, 0, Math.PI*2);
            ctxBox.closePath();
            ctxBox.fillStyle = this.color;
            ctxBox.fill();
            };
    }
}

class Queen{

    constructor(options){
        this.health = 1000;
        this.posX = Math.random() * w;
        this.posY = Math.random() * h;
        this.radius = setup.radiusOfQueen;
        this.color = '#ff3b3b';
        this.draw = function(){ 
            ctxBox.beginPath();
            ctxBox.arc(this.posX, this.posY, this.health/100, 0, Math.PI*2);
            ctxBox.closePath();
            ctxBox.fillStyle = this.color;
            ctxBox.fill();
            };
    }

    bornCell(){ 
            let c = new Cell({
                posX: this.posX,
                posY: this.posY,
            });
            ArrayCell.push(c);
            this.health = this.health - (setup.indexPriceCell/225000) * Math.pow(ArrayCell.length, 2);
    }

}

class Point{

    constructor(options){
        this.stock = 500;
        this.posX = Math.random() * w;
        this.posY = Math.random() * h;
        this.radius = setup.radiusOfPoint;
        this.color = '#3363ff';
        this.draw = function(){ 
            ctxBox.beginPath();
            ctxBox.arc(this.posX, this.posY, this.stock/100, 0, Math.PI*2);
            ctxBox.closePath();
            ctxBox.fillStyle = this.color;
            ctxBox.fill();
            };
    }
}

class People {

    constructor(options){
        this.health = setup.healthOfPeople;
        this.posX = options.posX;
        this.posY = options.posY;
        this.angle = Math.atan2(this.posY-w/2, this.posX-h/2);
        this.target = false;
        this.cooldown = setup.cooldownPeople;
        this.speed = setup.defaultSpeed + Math.random() * setup.speedPeople; 
        this.color = "#000000";
        this.radius = setup.radiusOfPeople; 
        this.distanceQueen = 0;
        this.vector = {
            x: Math.cos(this.angle) * this.speed,
            y: Math.sin(this.angle) * this.speed,
        }
            this.draw = function(){ 
            ctxBox.beginPath();
            ctxBox.arc(this.posX, this.posY, 3, 0, Math.PI*2);
            ctxBox.closePath();
            ctxBox.fillStyle = this.color;
            ctxBox.fill();
            };
    }

    correctAngle(){
        let count = Math.random()*2;
        if (count < 1) this.angle -= Math.random() * 0.2;
        else this.angle += Math.random() * 0.2;
        this.vector.x = Math.cos(this.angle) * this.speed;
        this.vector.y = Math.sin(this.angle) * this.speed;
    }

    border(){ 
            if (this.posX >= w + 100 || this.posX <= 0 - 100) { 
                this.vector.x *= -1;
                this.angle = Math.acos(this.vector.x/this.speed);
            }
            if (this.posY >= h + 100 || this.posY <= 0 - 100) {
                this.vector.y *= -1;
                this.angle = Math.asin(this.vector.y/this.speed);
            }
            if (this.posX > w + 100) this.posX = w;
            if (this.posY > h + 100) this.posY = h;
            if (this.posX < 0 - 100) this.posX = 0;
            if (this.posY < 0 - 100) this.posY = 0; 
            }

    go(){
        this.border();
        this.posX += this.vector.x; 
        this.posY += this.vector.y;
        this.correctAngle();
    }

    Bang(targetX, targetY, n, d){ 
        let c = new Rocket({
            posX: this.posX,
            posY: this.posY,
            angle: Math.atan2(this.posY-targetY, this.posX-targetX),
            tx: targetX,
            ty: targetY,
            nomber: n,
            distance: d,
        });
        ArrayRocket.push(c);
        this.cooldown = setup.cooldownPeople;

    }  

}

class Rocket {

    constructor(options){
        this.charge = setup.chargeOfRocket;
        this.target = {
            tx: options.tx,
            ty: options.ty,
            nomber: options.nomber,
            distance: options.distance,
        }
        this.posX = options.posX;
        this.posY = options.posY;
        this.angle = options.angle;
        this.speed = setup.defaultSpeed + Math.random() * setup.speedOfRocket; 
        this.color = "#1edd4e";
        this.radius = setup.radiusRocketExplosion; 
        this.vector = {
            x: Math.cos(this.angle) * this.speed,
            y: Math.sin(this.angle) * this.speed,
        }

            this.draw = function(){ 
                ctxBox.beginPath();
                ctxBox.arc(this.posX, this.posY, 3, 0, Math.PI*2);
                ctxBox.closePath();
                ctxBox.fillStyle = this.color;
                ctxBox.fill();
                };
    }

    correctAngle(){
        let count = Math.random()*2;
        if (count < 1) this.angle -= Math.random() * 0.005;
        else this.angle += Math.random() * 0.005;
        this.vector.x = Math.cos(this.angle) * this.speed;
        this.vector.y = Math.sin(this.angle) * this.speed;
    }

    go(){
        this.posX += this.vector.x; 
        this.posY += this.vector.y;
        this.correctAngle();
    }

}


function setSpeed05(){
    speedBar.speed05.style.backgroundColor = "#4350ff";
    speedBar.speed1.style.backgroundColor = "#333333";
    speedBar.speed2.style.backgroundColor = "#333333";
    speedBar.speed4.style.backgroundColor = "#333333";
    setup.defaultSpeed = 0.5;
    updateSpeed(setup.defaultSpeed);
}

function setSpeed1(){
    speedBar.speed05.style.backgroundColor = "#333333";
    speedBar.speed1.style.backgroundColor = "#4350ff";
    speedBar.speed2.style.backgroundColor = "#333333";
    speedBar.speed4.style.backgroundColor = "#333333";
    setup.defaultSpeed = 1;
    updateSpeed(setup.defaultSpeed);
}

function setSpeed2(){
    speedBar.speed05.style.backgroundColor = "#333333";
    speedBar.speed1.style.backgroundColor = "#333333";
    speedBar.speed2.style.backgroundColor = "#4350ff";
    speedBar.speed4.style.backgroundColor = "#333333";
    setup.defaultSpeed = 2.5;
    updateSpeed(setup.defaultSpeed);
}

function setSpeed4(){
    speedBar.speed05.style.backgroundColor = "#333333";
    speedBar.speed1.style.backgroundColor = "#333333";
    speedBar.speed2.style.backgroundColor = "#333333";
    speedBar.speed4.style.backgroundColor = "#4350ff";
    setup.defaultSpeed = 5;
    updateSpeed(setup.defaultSpeed);
}

function updateSpeed(newspeed){
    for (let i = 0; i < ArrayCell.length; i++){
        ArrayCell[i].speed = setup.defaultSpeed + Math.random() * setup.variantSpeed;
    }
}

function StartbornCell(){
    for (let i = 0; i < setup.cellOnStart; i++){
        let c = new Cell({
            posX: Math.random() * w,
            posY: Math.random() * h,
        });
        ArrayCell.push(c);
    }
}

function generateEat(){
    let e = new Eat();
    ArrayEat.push(e);
    CountOfEat++;
}

function generatePoint(){
    let e = new Point();
    ArrayPoint.push(e);
    CountOfPoint++;
}

function bornQueen(){
    let q = new Queen();
    ArrayQueen.push(q);
    CountOfQueen++;
}

function generatePeople(){
    let X;
    let Y;
    if (Math.random() * 2 < 1){
        X = Math.random() * 100 - 100;
    }else{
        X = Math.random() * 100 + w;
    }
    if (Math.random() * 2 < 1){
        Y = Math.random() * 100 - 100;
    }else{
        Y = Math.random() * 100 + h;
    }
    let e = new People({
        posX: X,
        posY: Y,
    });
    ArrayPeople.push(e);
}

function scream(cell1, cells){
    for (let i = 0; i < cells.length; i++) {
    let distance = checkDistance(cell1.posX, cell1.posY, cells[i].posX, cells[i].posY);
    if (distance <= setup.screamRadius){
            if (cell1.distanceEat > cells[i].distanceEat + setup.screamRadius){
                cell1.distanceEat = cells[i].distanceEat + setup.screamRadius;
                if (!cell1.eat) {cell1.angle = Math.atan2(cells[i].posY-cell1.posY, cells[i].posX-cell1.posX);   //изменить направление
                return 0;}
            }

            if (cell1.distanceQueen > cells[i].distanceQueen + setup.screamRadius){
                cell1.distanceQueen = cells[i].distanceQueen + setup.screamRadius;
                if(cell1.eat){cell1.angle = Math.atan2(cells[i].posY-cell1.posY, cells[i].posX-cell1.posX);   //изменить направление
                return 0;}
            }
    }
}
}

let checkDistance = function(x1, y1, x2, y2){ 
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
   }

function live(){
    window.requestAnimationFrame(live);
    ctxBox.clearRect(0,0,w,h);
    divOfCell.innerHTML = ArrayCell.length;
    divOfPoint.innerHTML = setup.points;
    for (let i = 0; i < CountOfQueen; i++){
        if (ArrayQueen[i].health < 0){
            ArrayQueen.splice(i, 1);
            CountOfQueen--;
        }else {
            if (Math.random() < 1)
            {
                ArrayQueen[i].health--;
            }
            if (ArrayQueen[i].health > setup.maxhealthQueen - 100)
            {
                ArrayQueen[i].bornCell();
            }
            ArrayQueen[i].draw();
        }
    }
    if (ArrayCell.length > setup.maxhealthQueen){
        if (Math.random() * 1000 < 1){
            bornQueen();
        }
    }
    for (let i = 0; i < CountOfEat; i++){
        if (ArrayEat[i].count < 0){
            ArrayEat.splice(i, 1);
            CountOfEat--;
        }else {
            ArrayEat[i].draw();
        }
    }

    if (CountOfEat < setup.eatOnStart){
        generateEat();
    }

    for (let i = 0; i < CountOfPoint; i++){
        if (ArrayPoint[i].stock < 0){
            ArrayPoint.splice(i, 1);
            CountOfPoint--;
        }else {
            
            ArrayPoint[i].draw();
        }

    }
    if (ArrayPoint.length < setup.maxPoint){
        if (Math.random() * 500 < 1){
            generatePoint();
        }
    }

    for (let i = 0; i < ArrayPeople.length; i++){
        ArrayPeople[i].go();
        if (ArrayPeople[i].health < 0){
            ArrayPeople.splice(i, 1);
        }else {
            
            ArrayPeople[i].draw();
        }
        ArrayPeople[i].cooldown--;
            for (j = 0; j < ArrayQueen.length; j++){
                let dist = checkDistance(ArrayPeople[i].posX, ArrayPeople[i].posY, ArrayQueen[j].posX, ArrayQueen[j].posY);
                if (ArrayPeople[i].target == false){
                    if (dist < setup.radiusPeopleSee){
                        ArrayPeople[i].angle = Math.atan2(ArrayPeople[i].posY-ArrayQueen[j].posY, ArrayPeople[i].posX-ArrayQueen[j].posX);
                        ArrayPeople[i].target = true;
                    }
                }
                if (dist < setup.radiusPeopleBang){
                    if (ArrayPeople[i].cooldown <= 0){
                        ArrayPeople[i].Bang(ArrayQueen[j].posX, ArrayQueen[j].posY, j, dist + setup.radiusRocketExplosion);
                        console.log("Ракета пошла");
                    }
                }
            }
    }

    for (let i = 0; i < ArrayRocket.length; i++){
        ArrayRocket[i].go();
        if (ArrayRocket[i].posX < 0 || ArrayRocket[i].posX > h || ArrayRocket[i].posY < 0 || ArrayRocket[i].posY > w || ArrayRocket[i].target.distance < 0){
            ArrayRocket.splice(i, 1);
        }else{
            ArrayRocket[i].draw();
        }
        if (ArrayRocket[i].posX > ArrayRocket[i].target.tx - ArrayRocket[i].radius && ArrayRocket[i].posX < ArrayRocket[i].target.tx + ArrayRocket[i].radius && ArrayRocket[i].posY > ArrayRocket[i].target.ty - ArrayRocket[i].radius && ArrayRocket[i].posY < ArrayRocket[i].target.ty + ArrayRocket[i].radius){
            if (ArrayRocket[i].target.tx == ArrayQueen[ArrayRocket[i].target.nomber].posX && ArrayRocket[i].target.ty == ArrayQueen[ArrayRocket[i].target.nomber].posY){
                ArrayQueen[ArrayRocket[i].target.nomber].health -= ArrayRocket[i].charge;
                console.log(ArrayQueen[ArrayRocket[i].target.nomber].health);
            }
            ArrayRocket.splice(i, 1);
        }
    }

        for (let i = 0; i < ArrayCell.length; i++){
            ArrayCell[i].go();
            ArrayCell[i].draw();
            for (let j = 0; j < CountOfEat; j++){
                if (ArrayCell[i].posX > ArrayEat[j].posX - ArrayEat[j].radius && ArrayCell[i].posX < ArrayEat[j].posX + ArrayEat[j].radius && ArrayCell[i].posY > ArrayEat[j].posY - ArrayEat[j].radius && ArrayCell[i].posY < ArrayEat[j].posY + ArrayEat[j].radius){
                    ArrayCell[i].distanceEat = 0;
                    if(ArrayCell[i].eat == false){
                        ArrayCell[i].eating();
                        ArrayEat[j].count--;
                        ArrayCell[i].vector.x *= -1;
                        ArrayCell[i].vector.y *= -1;
                        ArrayCell[i].angle = Math.acos(ArrayCell[i].vector.x/ArrayCell[i].speed);
                        ArrayCell[i].angle = Math.asin(ArrayCell[i].vector.y/ArrayCell[i].speed);

                    }
                }
            }
            for (let j = 0; j < CountOfQueen; j++){
                if (ArrayCell[i].posX > ArrayQueen[j].posX - ArrayQueen[j].radius && ArrayCell[i].posX < ArrayQueen[j].posX + ArrayQueen[j].radius && ArrayCell[i].posY > ArrayQueen[j].posY - ArrayQueen[j].radius && ArrayCell[i].posY < ArrayQueen[j].posY + ArrayQueen[j].radius){
                    ArrayCell[i].distanceQueen = 0;
                    if(ArrayCell[i].eat == true){
                        ArrayCell[i].eating();
                        if (ArrayQueen[j].health < setup.maxhealthQueen){
                          ArrayQueen[j].health++;  
                        }
                        ArrayCell[i].vector.x *= -1;
                        ArrayCell[i].vector.y *= -1;
                        ArrayCell[i].angle = Math.acos(ArrayCell[i].vector.x/ArrayCell[i].speed);
                        ArrayCell[i].angle = Math.asin(ArrayCell[i].vector.y/ArrayCell[i].speed);
                    }
                    if(ArrayCell[i].point == true){
                        ArrayCell[i].takePoint();
                        setup.points++;
                    }
                }
            }
            for (let j = 0; j < CountOfPoint; j++){
                if (ArrayCell[i].posX > ArrayPoint[j].posX - ArrayPoint[j].radius && ArrayCell[i].posX < ArrayPoint[j].posX + ArrayPoint[j].radius && ArrayCell[i].posY > ArrayPoint[j].posY - ArrayPoint[j].radius && ArrayCell[i].posY < ArrayPoint[j].posY + ArrayPoint[j].radius){
                    if(ArrayCell[i].point == false){
                        ArrayCell[i].takePoint();
                        ArrayPoint[j].stock--;
                        ArrayCell[i].vector.x *= -1;
                        ArrayCell[i].vector.y *= -1;
                        ArrayCell[i].angle = Math.acos(ArrayCell[i].vector.x/ArrayCell[i].speed);
                        ArrayCell[i].angle = Math.asin(ArrayCell[i].vector.y/ArrayCell[i].speed);
                    }
                }
            }
            scream(ArrayCell[i], ArrayCell);
        }
}



resizeReset();
start();