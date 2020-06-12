import * as Rockets from './rockets.js';

let imgSrc = "assets/rocket.png";
let imgSrc2 = "assets/rocket_top.png";
let imgSrc3 = "assets/rocket_bottom.png";
let imgSrcFuel = "assets/thrust.png";

export default class Rocket {
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
      //console.log(`draw rocket${this.id} stage ${this.stageNumber}`);
      animRocket(fragment, pos);
      rocketVisualizer.appendChild(fragment);
    }
  }
  move() {
    const moveAnimation = anime.timeline({
      targets: '.canvasDiv div',
      translateY: -580,
      duration: 60000,
      easing: 'easeInOutSine',
      loop: true
    });

    moveAnimation
    .add({
      targets: '.canvasDiv div',
      translateY: -580,
      duration: 60000,
    });
  }
}
