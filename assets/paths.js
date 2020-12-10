var srcBalloon;
class GeneratePaths {
  constructor(firstballoon, barray){
    this.doesExist = false;
    this.isJuice = false;
    srcBalloon = Object.assign({},firstballoon);
    this.listOfBalloons = barray;

    this.graph = new Graph();
    this.graph.addVertex(srcBalloon);
  }

  reset(){
    //this.doesExist = true;
    this.isJuice = false;
  }

  //once done, the manager will call done(), which will call DJS in graph.js
  done(barray){
    this.kappa = barray;
    this.graph.dfs(this.kappa[0]);
  }

  // check if the balloon exists in the

  run(balloot){ //one call to "run()" = 1 pass
    let destBalloon =  Object.assign({}, balloot); //pass values to destination balloon
    //this.listOfBalloons.push(destBalloon);
    //console.log("start of run");
    //console.log(balloot);
    //console.log(destBalloon)


    //check if the balloon is empty
    if(destBalloon.dark == 0 && destBalloon.pale == 0 && destBalloon.veined == 0){
      console.log("error, balloon is empty (all 0s)");
      this.isJuice = true;
    }
    //check if we have the balloon we want
    if(destBalloon.dark == 3 && destBalloon.pale == 13 && destBalloon.veined == 3){
      this.isJuice = true;
      this.graph.addVertex(destBalloon); //add to graph
      this.listOfBalloons.push(destBalloon); //add to list being used by manager

      console.log(destBalloon);
      console.log("found what we need");
    }
/*  this section will modify dark and pale -----------------------------------------------*/
    //first d <---- p
    if(destBalloon.dark + destBalloon.pale > 19){
      console.log("error, check sizes of dark and pale");
      console.log(destBalloon.dark);
      console.log(destBalloon.pale);
      this.isJuice = true;
    }
    //1.move all to D from p
    if(destBalloon.dark + destBalloon.pale <= 19){

      destBalloon.dark = destBalloon.dark + destBalloon.pale;
      destBalloon.pale = destBalloon.pale - destBalloon.pale

      if(destBalloon.dark == balloot.dark && destBalloon.pale == balloot.pale && destBalloon.veined == balloot.veined){
        console.log("same balloon, dont push");
      }
      else{
        //check if the balloon is already in the list
        for(let i = 0; i < this.listOfBalloons.length; i++){
          if(destBalloon.dark == this.listOfBalloons[i].dark && destBalloon.pale == this.listOfBalloons[i].pale && destBalloon.veined == this.listOfBalloons[i].veined){
            this.doesExist = true;
            break;
          }
        }
        if(this.doesExist == true){
          console.log("balloon exists in the list");
        }
        else{
          console.log("move all to D from P");

          this.graph.addEdge(balloot, destBalloon);//add to graphs
          this.listOfBalloons.push(destBalloon);//add to managers list
          console.log(destBalloon);
          console.log(balloot);
        }
      }
      //reset
      destBalloon =  Object.assign({}, balloot);
      this.doesExist = false;
    }
    //next d ----> p
    //2. move all to P from D
    if(destBalloon.dark + destBalloon.pale <= 13){

      destBalloon.pale = destBalloon.dark + destBalloon.pale;
      destBalloon.dark = destBalloon.dark - destBalloon.dark;

      if(destBalloon.dark == balloot.dark && destBalloon.pale == balloot.pale && destBalloon.veined == balloot.veined){
        console.log("same balloon, dont push");
      }
      else{
        for(let i = 0; i < this.listOfBalloons.length; i++){
          if(destBalloon.dark == this.listOfBalloons[i].dark && destBalloon.pale == this.listOfBalloons[i].pale && destBalloon.veined == this.listOfBalloons[i].veined){
            this.doesExist = true;
            break;
          }
        }
        if(this.doesExists == true){
          console.log("ballon exists in the list");
        }
        else{
          console.log("move all from P to D");

          this.graph.addEdge(balloot, destBalloon);//add to graphs
          this.listOfBalloons.push(destBalloon);//add to managers list
          console.log(destBalloon);
          console.log(balloot);
        }
      }
      //reset
      destBalloon = Object.assign({}, balloot);
      this.doesExist = false;
    }
    //3.move to limit on P from D
    if(destBalloon.dark + destBalloon.pale > 13 && destBalloon.pale != 13){
      let temp = 0;
      temp = 13 - destBalloon.pale; //checks how much space pale has left
      destBalloon.dark = (destBalloon.dark - temp);
      destBalloon.pale = (destBalloon.pale + temp);

      if(destBalloon.dark == balloot.dark && destBalloon.pale == balloot.pale && destBalloon.veined == balloot.veined){
        console.log("same balloon, dont push");
      }
      else{
        //if the current balloon is in the list of balloons already
        for(let i = 0; i < this.listOfBalloons.length; i++){
          if(destBalloon.dark == this.listOfBalloons[i].dark && destBalloon.pale == this.listOfBalloons[i].pale && destBalloon.veined == this.listOfBalloons[i].veined){
            this.doesExist = true;
            break;
          }
        }
        //if it exists, say so
        if(this.doesExist == true){
          console.log("balloon exists in the list");
        }
        else{//push
          console.log("move to LIMIT on P from D")

          this.graph.addEdge(balloot, destBalloon);//add to graphs
          this.listOfBalloons.push(destBalloon);//add to managers list
          console.log(destBalloon);
          console.log(balloot);
        }
      }
      //reset
      destBalloon = Object.assign({}, balloot);
      this.doesExist = false;
    }
//END OF D AND P mod section ------------------------------------------------------

    //this section will be modifying dark and veined
    if(destBalloon.dark + destBalloon.veined > 19){//error
      console.log("error, check dark and veined");
      console.log(destBalloon.dark);
      console.log(destBalloon.veined);
      this.isJuice = true;
    }
    //1. move all to D from V
    if(destBalloon.dark + destBalloon.veined <= 19){

      destBalloon.dark = destBalloon.dark + destBalloon.veined;
      destBalloon.veined = destBalloon.veined - destBalloon.veined;

      if(destBalloon.dark == balloot.dark && destBalloon.pale == balloot.pale && destBalloon.veined == balloot.veined){
        console.log("same balloon, dont push");
      }
      else{
        //if the current balloon is in the list of balloons already
        for(let i = 0; i < this.listOfBalloons.length; i++){
          if(destBalloon.dark == this.listOfBalloons[i].dark && destBalloon.pale == this.listOfBalloons[i].pale && destBalloon.veined == this.listOfBalloons[i].veined){
            this.doesExist = true;
            break;
          }
        }
        //if it exists, say so
        if(this.doesExist == true){
          console.log("balloon exists in the list");
        }
        else{//push
          console.log("move all to D from V")

          this.graph.addEdge(balloot, destBalloon);//add to graphs
          this.listOfBalloons.push(destBalloon);//add to managers list
          console.log(destBalloon);
          console.log(balloot);
        }
      }
      //reset
      destBalloon = Object.assign({}, balloot);
      this.doesExist = false;
    }
    //2. move all to V from D
    if(destBalloon.dark + destBalloon.veined <= 7){
      destBalloon.veined = destBalloon.dark + destBalloon.veined;
      destBalloon.dark = destBalloon.dark - destBalloon.dark;

      if(destBalloon.dark == balloot.dark && destBalloon.pale == balloot.pale && destBalloon.veined == balloot.veined){
        console.log("same balloon, dont push");
      }
      else{
        //if the current balloon is in the list of balloons already
        for(let i = 0; i < this.listOfBalloons.length; i++){
          if(destBalloon.dark == this.listOfBalloons[i].dark && destBalloon.pale == this.listOfBalloons[i].pale && destBalloon.veined == this.listOfBalloons[i].veined){
            this.doesExist = true;
            break;
          }
        }
        //if it exists, say so
        if(this.doesExist == true){
          console.log("balloon exists in the list");
        }
        else{//push
          console.log("move all to V from D")

          this.graph.addEdge(balloot, destBalloon);//add to graphs
          this.listOfBalloons.push(destBalloon);//add to managers list
          console.log(destBalloon);
          console.log(balloot);
        }
      }

      //reset
      destBalloon = Object.assign({}, balloot);
      this.doesExist = false;
    }
    //3. move to limit on V from D
    if(destBalloon.dark + destBalloon.veined > 7 && destBalloon.veined != 7){
      let temp = 0;
      temp = 7 - destBalloon.veined;

      destBalloon.dark = destBalloon.dark - temp;
      destBalloon.veined = destBalloon.veined + temp;

      if(destBalloon.dark == balloot.dark && destBalloon.pale == balloot.pale && destBalloon.veined == balloot.veined){
        console.log("same balloon, dont push");
      }
      else{
        //if the current balloon is in the list of balloons already
        for(let i = 0; i < this.listOfBalloons.length; i++){
          if(destBalloon.dark == this.listOfBalloons[i].dark && destBalloon.pale == this.listOfBalloons[i].pale && destBalloon.veined == this.listOfBalloons[i].veined){
            this.doesExist = true;
            break;
          }
        }
        //if it exists, say so
        if(this.doesExist == true){
          console.log("balloon exists in the list");
        }
        else{//push
          console.log("move to LIMIT on V from D");

          this.graph.addEdge(balloot, destBalloon);//add to graphs
          this.listOfBalloons.push(destBalloon);//add to managers list
          console.log(destBalloon);
          console.log(balloot);
        }
      }

      //reset
      destBalloon = Object.assign({}, balloot);
      this.doesExist = false;
    }
//END OF D AND V mod section -------------------------------------------------------

    //this section will be modifying pale and veined
    //1. move all to P from V
    if(destBalloon.pale + destBalloon.veined <= 13){
      destBalloon.pale = destBalloon.pale + destBalloon.veined;
      destBalloon.veined = destBalloon.veined - destBalloon.veined;

      if(destBalloon.dark == balloot.dark && destBalloon.pale == balloot.pale && destBalloon.veined == balloot.veined){
        console.log("same balloon, dont push");
      }
      else{
        //if the current balloon is in the list of balloons already
        for(let i = 0; i < this.listOfBalloons.length; i++){
          if(destBalloon.dark == this.listOfBalloons[i].dark && destBalloon.pale == this.listOfBalloons[i].pale && destBalloon.veined == this.listOfBalloons[i].veined){
            this.doesExist = true;
            break;
          }
        }
        //if it exists, say so
        if(this.doesExist == true){
          console.log("balloon exists in the list");
        }
        else{
          console.log("move all to P from V");

          this.graph.addEdge(balloot, destBalloon);//add to graphs
          this.listOfBalloons.push(destBalloon);//add to managers list
          console.log(destBalloon);
          console.log(balloot);
        }
      }
      //reset
      destBalloon = Object.assign({}, balloot);
      this.doesExist = false;
    }
    //2. move to LIMIT on P from V
    if(destBalloon.pale + destBalloon.veined > 13 && destBalloon.pale != 13){
      let temp = 0;
      temp = 13 - destBalloon.pale;

      destBalloon.veined = destBalloon.veined - temp;
      destBalloon.pale = destBalloon.pale + temp;

      if(destBalloon.dark == balloot.dark && destBalloon.pale == balloot.pale && destBalloon.veined == balloot.veined){
        console.log("same balloon, dont push");
      }
      else{
        //if the current balloon is in the list of balloons already
        for(let i = 0; i < this.listOfBalloons.length; i++){
          if(destBalloon.dark == this.listOfBalloons[i].dark && destBalloon.pale == this.listOfBalloons[i].pale && destBalloon.veined == this.listOfBalloons[i].veined){
            this.doesExist = true;
            break;
          }
        }
        //if it exists, say so
        if(this.doesExist == true){
          console.log("balloon exists in the list");
        }
        else{
          console.log("move to LIMIT on P from V");
          this.graph.addEdge(balloot, destBalloon);//add to graphs
          this.listOfBalloons.push(destBalloon);//add to managers list
          console.log(destBalloon);
          console.log(balloot);
        }
      }

      //reset
      destBalloon = Object.assign({}, balloot);
      this.doesExist = false;
    }
    //3. move all to V from P
    if(destBalloon.pale + destBalloon.veined <= 7){
      destBalloon.veined = destBalloon.veined + destBalloon.pale;
      destBalloon.pale = destBalloon.pale - destBalloon.pale;

      if(destBalloon.dark == balloot.dark && destBalloon.pale == balloot.pale && destBalloon.veined == balloot.veined){
        console.log("same balloon, dont push");
      }
      else{
        //if the current balloon is in the list of balloons already
        for(let i = 0; i < this.listOfBalloons.length; i++){
          if(destBalloon.dark == this.listOfBalloons[i].dark && destBalloon.pale == this.listOfBalloons[i].pale && destBalloon.veined == this.listOfBalloons[i].veined){
            this.doesExist = true;
            break;
          }
        }
        //if it exists, say so
        if(this.doesExist == true){
          console.log("balloon exists in the list");
        }
        else{//push
          console.log("move all to V from P");

          this.graph.addEdge(balloot, destBalloon);//add to graphs
          this.listOfBalloons.push(destBalloon);//add to managers list
          console.log(destBalloon);
          console.log(balloot);
        }
      }

      //reset
      destBalloon = Object.assign({}, balloot);
      this.doesExist = false;
    }
    //4. move to LIMIT on V from P
    if(destBalloon.pale + destBalloon.veined > 7 && destBalloon.veined != 7){
      let temp = 0;
      temp = 7 - destBalloon.veined;

      destBalloon.pale = destBalloon.pale - temp;
      destBalloon.veined = destBalloon.veined + temp;

      if(destBalloon.dark == balloot.dark && destBalloon.pale == balloot.pale && destBalloon.veined == balloot.veined){
        console.log("same balloon, dont push");
      }
      else{
        //if the current balloon is in the list of balloons already
        for(let i = 0; i < this.listOfBalloons.length; i++){
          if(destBalloon.dark == this.listOfBalloons[i].dark && destBalloon.pale == this.listOfBalloons[i].pale && destBalloon.veined == this.listOfBalloons[i].veined){
            this.doesExist = true;
            break;
          }
        }
        //if it exists, say so
        if(this.doesExist == true){
          console.log("balloon exists in the list");
        }
        else{
          console.log("move to LIMIT on V from P");

          this.graph.addEdge(balloot, destBalloon);//add to graphs
          this.listOfBalloons.push(destBalloon);//add to managers list
          console.log(destBalloon);
          console.log(balloot);
        }
      }

      //reset
      destBalloon = Object.assign({}, balloot);
      this.doesExist = false;
    }
    console.log("got to the end of run")

  }//end of run()
}
