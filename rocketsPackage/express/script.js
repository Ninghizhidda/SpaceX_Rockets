let imgSrc = "assets/rocket.png";
let imgSrc2 = "assets/rocket_top.png";
let imgSrc3 = "assets/rocket_bottom.png";
let imgSrcFuel = "assets/thrust.png";


class Rockets {
  constructor() {
    this.rocketsArray = [];
  }
  numberRocketsCreated = () => this.rocketsArray.length;
  numberRocketsStage3 = () => {
    let count = 0
    this.rocketsArray.forEach((item, i) => {
      if (this.rocketsArray[i].stageNumber == 3) {
         count ++;
      }
    });
    console.log(count);
    return count;
  }
  hideRocket = (id) => {
    let elId = `i${id}`;
    document.getElementById(elId).classList.add("toggleDisplay");
  }
  hideRocketBottom = (id) => {
    let elId = `i${id}`;
    document.getElementById(elId).querySelector('.rBottom').classList.add("toggleDisplay");
  }
  successMessage() {
    let size = this.numberRocketsCreated();
    let succeededStage3 = this.numberRocketsStage3();
    //console.log(succeededStage3);
    if (size == succeededStage3) {
      document.getElementById("success").classList.remove("toggleDisplay");
      document.getElementById("successButton").classList.remove("toggleDisplay");
      console.log("success");
    }
    return succeededStage3;
  }
  manageStage() {
    this.rocketsArray.forEach((item, i) => {
      if ((this.rocketsArray[i].stageNumber == 1) && (this.rocketsArray[i].fuelLeft <= 0)) {
        this.rocketsArray[i].fuelLeft = this.rocketsArray[i].fuel2;
        this.rocketsArray[i].stageNumber = 2;
        this.hideRocketBottom(i);
      }
      else if (this.rocketsArray[i].stageNumber == 2 && this.rocketsArray[i].fuelLeft <= 0) {
        this.rocketsArray[i].stageNumber = 3;
        this.hideRocket(i);
        this.successMessage();
      }
    });
  }
  burnFuel = () => {
    this.rocketsArray.forEach((item, i) => {
      if (this.rocketsArray[i].fuelLeft > 0) {
        this.rocketsArray[i].fuelLeft -= 1;
      }
      else {
        this.manageStage();
      }
      //show fuel
      document.getElementById(`span${this.rocketsArray[i].id}`).innerHTML = ` R${this.rocketsArray[i].id}: ${this.rocketsArray[i].fuelLeft} ` ;
    });
  }
  displayFuel = () => {
    this.rocketsArray.forEach((item, i) => {
      let newFuelSpan = document.createElement("span");
      newFuelSpan.setAttribute("id", `span${this.rocketsArray[i].id}`);
      document.getElementById("showFuel").appendChild(newFuelSpan);
    });
  }
  updateFuel = () => {

    let burn = setInterval(this.burnFuel, 1000);
  }
}; // main object

//Rocket class
class Rocket {
  constructor(id,fuel1,fuel2) {
    this.fuelPerSecond = 1;
    this.id = id;
    this.fuel1 = Math.round(fuel1);
    this.fuel2 = Math.round(fuel2);
    this.fuelLeft = this.fuel1;
    this.stageNumber = 1;
  }

  draw(i) {
    const rocketVisualizer = document.querySelector('.canvasDiv');
    const animRockets = document.querySelectorAll('.animRockets');
    const fragment = document.createDocumentFragment();
    //let imgSrc = "assets/rocket.png";
    let pos = i * 150;

    function animRocket(fragment, pos) {
      let posLeft = `${pos}px`
      let dv = document.createElement("DIV");
      dv.classList.add("animRockets");
      dv.setAttribute("id", 'i' + i);
      let x = document.createElement("IMG");
      x.setAttribute("src", imgSrc2);
      x.classList.add("animImg");

      let x1 = document.createElement("IMG");
      x1.setAttribute("src", imgSrc3);
      x1.classList.add("rBottom");

      let x2 = document.createElement("IMG");
      x2.setAttribute("src", imgSrcFuel);
      x2.classList.add("thrust");

      dv.style.left = posLeft;
      x.setAttribute("alt", "Rocket");
      dv.appendChild(x);
      dv.appendChild(x1);
      dv.appendChild(x2);
      fragment.appendChild(dv);
    }

    if (this.stageNumber != 3) {
      console.log(`draw rocket${this.id} stage ${this.stageNumber}`);
      animRocket(fragment, pos);
      rocketVisualizer.appendChild(fragment);
    }
  }
  move() {
    //setInterval( draw, 1000, rocket );
    const moveAnimation = anime.timeline({
      targets: '.canvasDiv div',
    //anime({
      //targets: animRockets,
      translateY: -600,
      duration: 60000,
      easing: 'easeInOutSine',
      loop: true
    });

    moveAnimation
    .add({
      targets: '.canvasDiv div',
      translateY: -600,
      duration: 60000,
    });
  }
}

// Load page
function load() {
  let rocketContainer  = new Rockets();
  //fetch api data
  fetch('https://api.spacexdata.com/v3/rockets')
  .then(res => res.json())//response type
  .then(data => {
    console.log(data);
    data.forEach((rocket) => {
      const name = 'rocketID' + rocket.id;
      const rID =  rocket.id;
      //create rocket objects
      let r  = new Rocket(rocket.id,rocket.first_stage.fuel_amount_tons,rocket.second_stage.fuel_amount_tons);
      //console.log(r);
      //console.log(rocketContainer);
      rocketContainer.rocketsArray.push(r);
      console.log(rocketContainer.rocketsArray);
    });
    rocketContainer.rocketsArray.forEach((item, i) => {
      //console.log(i);
       item.draw(i);
       item.move();
    });
    rocketContainer.displayFuel();
    rocketContainer.updateFuel();
    document.getElementById("successButton").addEventListener("click", function(){
      rocketContainer.rocketsArray.forEach((item, i) => {
         item.stageNumber = 1;
         item.fuelLeft = item.fuel1;
      });
      document.querySelectorAll('.animRockets').forEach((item, i) => {
        item.classList.remove("toggleDisplay");
      });

      document.querySelectorAll('.rBottom').forEach((item, i) => {
        item.classList.remove("toggleDisplay");
      });

      document.getElementById("successButton").classList.add("toggleDisplay");
      document.getElementById("success").classList.add("toggleDisplay");
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
};

document.addEventListener('DOMContentLoaded', load);
