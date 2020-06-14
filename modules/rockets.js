export default class Rockets {
  constructor() {
    this.rocketsArray = [];
  }
  numberRocketsCreated = () => this.rocketsArray.length;
  numberRocketsStage3 = () => {
    let count = 0
    //console.log(this.rocketsArray[0].stageNumber);
    this.rocketsArray.forEach((item, i) => {
      if (this.rocketsArray[i].stageNumber == 3) {
         count ++;
      }
    });
    //console.log(count);
    return count;
  }
  manageStage = () => {
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
  hideRocket = (id) => {
    let elId = `i${id}`;
    document.getElementById(elId).classList.add("toggleDisplay");
  }
  hideRocketBottom = (id) => {
    let elId = `i${id}`;
    document.getElementById(elId).querySelector('.rBottom').classList.add("toggleDisplay");
  }
  successMessage = () => {
    let size = this.numberRocketsCreated();
    let succeededStage3 = this.numberRocketsStage3();
    //console.log(succeededStage3);
    if (size == succeededStage3) {
      document.getElementById("success").classList.remove("toggleDisplay");
      document.getElementById("successButton").classList.remove("toggleDisplay");
      //console.log("success");
    }
    return succeededStage3;
  }
};
