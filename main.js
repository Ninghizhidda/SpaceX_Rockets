import Rocket from './modules/rocket.js';
import Rockets from './modules/rockets.js';

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
      //console.log(rocketContainer.rocketsArray);
    });
    rocketContainer.rocketsArray.forEach((item, i) => {
       item.draw(i);
       item.move();
    });
    rocketContainer.displayFuel();
    rocketContainer.updateFuel();
    document.getElementById("successButton").addEventListener("click", function(){
      rocketContainer.rocketsArray.forEach((item, i) => {
         item.stageNumber = 1;
         item.fuelLeft = item.fuel1;
         item.animRestart();
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
