const forsetBox = document.querySelector(".forestNone");

function showForestTechnologieBox(){
    forsetBox.style.left = '10%';
}

function noneForestTechnologieBox(){
    forsetBox.style.left = '101%';
}

let price = {
    HP1: 100,
    HP2: 150,
    HP3: 200,
    HP4: 250,
    HP5: 300,

    PR1: 100,
    PR2: 150,
    PR3: 200,
    PR4: 250,
    PR5: 300,

    RS1: 500,
    RS2: 600,
    RS3: 700,
    RS4: 800,
    RS5: 900,

    CE1: 300,
    CE2: 400,
    CE3: 500,
    CE4: 600,
    CE5: 700,

    CP1: 500,
    CP2: 700,
    CP3: 900,
    CP4: 1100,
    CP5: 1300,
}
const HP1 = document.querySelector("#maxHealthQueen1");
const HP2 = document.querySelector('#maxHealthQueen2');
const HP3 = document.querySelector('#maxHealthQueen3');
const HP4 = document.querySelector('#maxHealthQueen4');
const HP5 = document.querySelector('#maxHealthQueen5');

const PR1 = document.querySelector('#priceCell1');
const PR2 = document.querySelector('#priceCell2');
const PR3 = document.querySelector('#priceCell3');
const PR4 = document.querySelector('#priceCell4');
const PR5 = document.querySelector('#priceCell5');

const RS1 = document.querySelector('#radiusScream1');
const RS2 = document.querySelector('#radiusScream2');
const RS3 = document.querySelector('#radiusScream3');
const RS4 = document.querySelector('#radiusScream4');
const RS5 = document.querySelector('#radiusScream5');

const CE1 = document.querySelector('#countOfEat1');
const CE2 = document.querySelector('#countOfEat2');
const CE3 = document.querySelector('#countOfEat3');
const CE4 = document.querySelector('#countOfEat4');
const CE5 = document.querySelector('#countOfEat5');

const CP1 = document.querySelector('#countOfPoint1');
const CP2 = document.querySelector('#countOfPoint2');
const CP3 = document.querySelector('#countOfPoint3');
const CP4 = document.querySelector('#countOfPoint4');
const CP5 = document.querySelector('#countOfPoint5');

 function clickHP1(){
    if (HP1.className == 'buttonSkillDostup'){
        if (setup.points >= price.HP1){
            HP1.className = "buttonSkillActive";
            HP2.className = "buttonSkillDostup";
            setup.maxhealthQueen += 100;
            setup.points -= price.HP1;
        }
    }
 }

 function clickHP2(){
    if (HP2.className == 'buttonSkillDostup'){
        if (setup.points >= price.HP2){
            HP2.className = "buttonSkillActive";
            HP3.className = "buttonSkillDostup";
            setup.maxhealthQueen += 100;
            setup.points -= price.HP2;
        }
    }
 }

 function clickHP3(){
    if (HP3.className == 'buttonSkillDostup'){
        if (setup.points >= price.HP3){
            HP3.className = "buttonSkillActive";
            HP4.className = "buttonSkillDostup";
            setup.maxhealthQueen += 200;
            setup.points -= price.HP3;
        }
    }
 }

 function clickHP4(){
    if (HP4.className == 'buttonSkillDostup'){
        if (setup.points >= price.HP4){
            HP4.className = "buttonSkillActive";
            HP5.className = "buttonSkillDostup";
            setup.maxhealthQueen += 300;
            setup.points -= price.HP4;
        }
    }
 }

 function clickHP5(){
    if (HP5.className == 'buttonSkillDostup'){
        if (setup.points >= price.HP5){
            HP5.className = "buttonSkillActive";

            setup.maxhealthQueen += 500;
            setup.points -= price.HP5;
        }
    }
 }

 function clickPR1(){
    if (PR1.className == 'buttonSkillDostup'){
        if (setup.points >= price.PR1){
            PR1.className = "buttonSkillActive";
            PR2.className = "buttonSkillDostup";
            setup.indexPriceCell -= 1;
            setup.points -= price.PR1;
        }
    }
 }

 function clickPR2(){
    if (PR2.className == 'buttonSkillDostup'){
        if (setup.points >= price.PR2){
            PR2.className = "buttonSkillActive";
            PR3.className = "buttonSkillDostup";
            setup.indexPriceCell -= 1;
            setup.points -= price.PR2;
        }
    }
 }

 function clickPR3(){
    if (PR3.className == 'buttonSkillDostup'){
        if (setup.points >= price.PR3){
            PR3.className = "buttonSkillActive";
            PR4.className = "buttonSkillDostup";
            setup.indexPriceCell -= 1;
            setup.points -= price.PR3;
        }
    }
 }

 function clickPR4(){
    if (PR4.className == 'buttonSkillDostup'){
        if (setup.points >= price.PR4){
            PR4.className = "buttonSkillActive";
            PR5.className = "buttonSkillDostup";
            setup.indexPriceCell -= 1;
            setup.points -= price.PR4;
        }
    }
 }

 function clickPR5(){
    if (PR5.className == 'buttonSkillDostup'){
        if (setup.points >= price.PR5){
            PR5.className = "buttonSkillActive";
            
            setup.indexPriceCell -= 1;
            setup.points -= price.PR5;
        }
    }
 }

 function clickRS1(){
    if (RS1.className == 'buttonSkillDostup'){
        if (setup.points >= price.RS1){
            RS1.className = "buttonSkillActive";
            RS2.className = "buttonSkillDostup";
            setup.screamRadius += 1;
            setup.points -= price.RS1;
        }
    }
 }

 function clickRS2(){
    if (RS2.className == 'buttonSkillDostup'){
        if (setup.points >= price.RS2){
            RS2.className = "buttonSkillActive";
            RS3.className = "buttonSkillDostup";
            setup.screamRadius += 1;
            setup.points -= price.RS2;
        }
    }
 }

 function clickRS3(){
    if (RS3.className == 'buttonSkillDostup'){
        if (setup.points >= price.RS3){
            RS3.className = "buttonSkillActive";
            RS4.className = "buttonSkillDostup";
            setup.screamRadius += 2;
            setup.points -= price.RS3;
        }
    }
 }

 function clickRS4(){
    if (RS4.className == 'buttonSkillDostup'){
        if (setup.points >= price.RS4){
            RS4.className = "buttonSkillActive";
            RS5.className = "buttonSkillDostup";
            setup.screamRadius += 3;
            setup.points -= price.RS4;
        }
    }
 }

 function clickRS5(){
    if (RS5.className == 'buttonSkillDostup'){
        if (setup.points >= price.RS5){
            RS5.className = "buttonSkillActive";
            
            setup.screamRadius += 5;
            setup.points -= price.RS5;
        }
    }
 }

 function clickCE1(){
    if (CE1.className == 'buttonSkillDostup'){
        if (setup.points >= price.CE1){
            CE1.className = "buttonSkillActive";
            CE2.className = "buttonSkillDostup";
            setup.eatOnStart += 2;
            setup.points -= price.CE1;
        }
    }
 }

 function clickCE2(){
    if (CE2.className == 'buttonSkillDostup'){
        if (setup.points >= price.CE2){
            CE2.className = "buttonSkillActive";
            CE3.className = "buttonSkillDostup";
            setup.eatOnStart += 2;
            setup.points -= price.CE2;
        }
    }
 }

 function clickCE3(){
    if (CE3.className == 'buttonSkillDostup'){
        if (setup.points >= price.CE3){
            CE3.className = "buttonSkillActive";
            CE4.className = "buttonSkillDostup";
            setup.eatOnStart += 3;
            setup.points -= price.CE3;
        }
    }
 }

 function clickCE4(){
    if (CE4.className == 'buttonSkillDostup'){
        if (setup.points >= price.CE4){
            CE4.className = "buttonSkillActive";
            CE5.className = "buttonSkillDostup";
            setup.eatOnStart += 4;
            setup.points -= price.CE4;
        }
    }
 }

 function clickCE5(){
    if (CE5.className == 'buttonSkillDostup'){
        if (setup.points >= price.CE5){
            CE5.className = "buttonSkillActive";
            
            setup.eatOnStart += 5;
            setup.points -= price.CE5;
        }
    }
 }

 function clickCP1(){
    if (CP1.className == 'buttonSkillDostup'){
        if (setup.points >= price.CP1){
            CP1.className = "buttonSkillActive";
            CP2.className = "buttonSkillDostup";
            setup.maxPoint += 1;
            setup.points -= price.CP1;
        }
    }
 }

 function clickCP2(){
    if (CP2.className == 'buttonSkillDostup'){
        if (setup.points >= price.CP2){
            CP2.className = "buttonSkillActive";
            CP3.className = "buttonSkillDostup";
            setup.maxPoint += 1;
            setup.points -= price.CP2;
        }
    }
 }

 function clickCP3(){
    if (CP3.className == 'buttonSkillDostup'){
        if (setup.points >= price.CP3){
            CP3.className = "buttonSkillActive";
            CP4.className = "buttonSkillDostup";
            setup.maxPoint += 2;
            setup.points -= price.CP3;
        }
    }
 }

 function clickCP4(){
    if (CP4.className == 'buttonSkillDostup'){
        if (setup.points >= price.CP4){
            CP4.className = "buttonSkillActive";
            CP5.className = "buttonSkillDostup";
            setup.maxPoint += 3;
            setup.points -= price.CP4;
        }
    }
 }

 function clickCP5(){
    if (CP5.className == 'buttonSkillDostup'){
        if (setup.points >= price.CP5){
            CP5.className = "buttonSkillActive";
            
            setup.maxPoint += 4;
            setup.points -= price.CP5;
        }
    }
 }