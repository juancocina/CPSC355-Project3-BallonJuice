class GeneratePaths {
  constructor(balloon, barray){
    this.doesExist = false;
    this.isJuice = false;
    this.srcBalloon = balloon;
    this.listOfBalloons = barray;

    this.graph = new Graph();
    this.graph.addVertex(balloon);
  }

  reset(){
    this.doesExist = true;
    this.isJuice = false;
  }

  //once done, the manager will call done(), which will call DJS in graph.js
  done(){
    this.graph.dfs();
  }

  run(balloot){ //one call to "run()" = 1 pass
    //initialize array
    this.srcBalloon = balloot;
    console.log(this.srcBalloon);
    let destBalloon = balloot;
    console.log("source balloon has changed");

    //first check if balloon is empty/errored
    if(this.srcBalloon.dark == 0 && this.srcBalloon.pale == 0 && this.srcBalloon.veined == 0){
      console.log("error, all values at 0");
    }
    //check if we have the balloon we want
    if(this.srcBalloon.dark == 3 && this.srcBalloon.pale == 13 && this.srcBalloon.veined == 3){
      this.isJuice = true;

      addVertex(this.srcBalloon); //add to graph
      this.listOfBalloons.push(this.srcBalloon); //add to list being used by manager

      console.log(this.srcBalloon);
    }
//this section will be modifying dark and pale------------------------------------
    //first d <---- p
    if(this.srcBalloon.dark + this.srcBalloon.pale > 19){ //error check
      console.log("error, check sizes of dark and pale")
      console.log(this.srcBalloon.dark);
      console.log(this.srcBalloon.pale);
    }
    if(destBalloon.dark + destBalloon.pale <= 19){ //1.move all to D from P
      console.log("move all to D from P")
      destBalloon.dark = destBalloon.dark + destBalloon.pale;
      destBalloon.pale = destBalloon.pale - destBalloon.pale;

      this.graph.addEdge(this.srcBalloon, destBalloon);//add to graph
      this.listOfBalloons.push(destBalloon);//add to managers list
      console.log(destBalloon);
      console.log(this.srcBalloon);

      //reset balloon
      destBalloon = this.srcBalloon;
    }

    //next d ----> p
    if(this.srcBalloon.dark + this.srcBalloon.pale <= 13){//2. move all to P from D
      console.log("move all from P to D");
      destBalloon.pale = destBalloon.dark + destBalloon.pale;
      destBalloon.dark = destBalloon.dark - destBalloon.dark;

      this.graph.addEdge(this.srcBalloon, destBalloon);//add to graph
      this.listOfBalloons.push(destBalloon);//add to managers list
      console.log(destBalloon);
      console.log(this.srcBalloon);

      //reset balloon
      destBalloon = this.srcBalloon;
    }
    //3.move to limit on P from D
    if(this.srcBalloon.dark + this.srcBalloon.pale > 13 && this.srcBalloon.pale != 13){
      console.log("move to limit on P from D 3");
      let temp = 0;
      //let temp2 = 0;
      temp = 13 - destBalloon.pale; //checks how much space pale has left
      destBalloon.dark = (destBalloon.dark - temp);
      destBalloon.pale = (destBalloon.pale + temp);
      this.graph.addEdge(this.srcBalloon, destBalloon);
      this.listOfBalloons.push(destBalloon);
      console.log(destBalloon);
      console.log(this.srcBalloon);

      //reset balloon
      destBalloon = this.srcBalloon;
    }
    /*
//END OF D AND P mod section ------------------------------------------------------

    //this section will be modifying dark and veined
    //error check
    if(this.srcBalloon.dark + this.srcBalloon.veined > 19){
      console.log("error. check dark and veined");
      console.log(this.srcBalloon.dark);
      console.log(this.srcBalloon.veined)
    }
    //1. move all to D from V
    if(this.srcBalloon.dark + this.srcBalloon.veined <= 19){
      destBalloon.dark = (this.srcBalloon.dark + this.srcBalloon.veined);//dark = dark + veined
      destBalloon.veined = (this.srcBalloon.veined - this.srcBalloon.veined);//veined = veined - veined

      this.graph.addEdge(this.srcBalloon, destBalloon);//add to graph
      this.listOfBalloons.push(destBalloon);//add to managers list

      //reset balloon
      destBalloon.dark = this.srcBalloon.dark;
      destBalloon.veined = this.srcBalloon.veined;
    }
    //2. move all to V from D
    if(this.srcBalloon.dark + this.srcBalloon.veined <= 7){
      destBalloon.veined = (this.srcBalloon.dark + this.srcBalloon.veined);
      destBalloon.dark = (this.srcBalloon.dark - this.srcBalloon.dark);

      this.graph.addEdge(this.srcBalloon, destBalloon);//add to graph
      this.listOfBalloons.push(destBalloon);//add to managers list

      //reset balloon
      destBalloon.dark = this.srcBalloon.dark;
      destBalloon.veined = this.srcBalloon.veined;
    }
    //3. move to limit on V from D
    if(this.srcBalloon.dark + this.srcBalloon.veined > 7 && this.srcBalloon.veined != 7){
      let temp = 0;
      //let temp2 = 0;
      temp = 7 - this.srcBalloon.veined; //checks how much space pale has left
      destBalloon.dark = (this.srcBalloon.dark - temp); //dark = dark - temp (dark is the amount subtracted)
      destBalloon.veined = (this.srcBalloon.veined + temp); //add that to veined
      this.graph.addEdge(this.srcBalloon, destBalloon);
      this.listOfBalloons.push(destBalloon);

      //reset balloon
      destBalloon.dark = this.srcBalloon.dark;
      destBalloon.veined = this.srcBalloon.veined;
    }
//END OF D AND V mod section -------------------------------------------------------

    //this section will be modifying pale and veined
    //1. move all to P from V
    if(this.srcBalloon.pale + this.srcBalloon.veined <= 13){
      destBalloon.pale = (this.srcBalloon.pale + this.srcBalloon.veined)
      destBalloon.veined = (this.srcBalloon.veined - this.srcBalloon.veined);

      this.graph.addEdge(this.srcBalloon, destBalloon);//add to graph
      this.listOfBalloons.push(destBalloon);//add to managers list

      //reset balloon
      destBalloon.veined = this.srcBalloon.veined;
      destBalloon.pale = destBalloon.pale;
    }
    //2. move to LIMIT on P from V
    else if(this.srcBalloon.pale + this.srcBalloon.veined > 13 && this.srcBalloon.pale != 13){
      let temp = 0;
      temp = 13 - this.srcBalloon.pale;
      destBalloon.veined = (this.srcBalloon.veined - temp); //the amount you're taking from veined
      destBalloon.pale = (this.srcBalloon.pale + temp);//add that to pale

      this.graph.addEdge(this.srcBalloon, destBalloon);
      this.listOfBalloons.push(destBalloon);

      //reset balloons
      destBalloon.veined = this.srcBalloon.veined;
      destBalloon.pale = this.srcBalloon.pale;
    }
    //3. move all to V from P
    if(this.srcBalloon.pale + this.srcBalloon.veined <= 7){
      destBalloon.veined = (this.srcBalloon.veined + this.srcBalloon.pale);
      destBalloon.pale = (this.srcBalloon.pale - this.srcBalloon.pale);

      this.graph.addEdge(this.srcBalloon, destBalloon);//add to graph
      this.listOfBalloons.push(destBalloon);//add to managers list

      //reset balloons
      destBalloon.veined = this.srcBalloon.veined;
      destBalloon.pale = this.srcBalloon.pale;
    }
    //4. move to LIMIT on V from P
    else if(this.srcBalloon.pale + this.srcBalloon.veined > 7 && this.srcBalloon.vained != 7){
      let temp = 0;
      temp = 7 - this.srcBalloon.veined; // amount you can add to veined
      destBalloon.pale = (this.srcBalloon.pale - temp);//amount being removed from pale
      destBalloon.veined = (this.srcBalloon.veined + temp);

      this.graph.addEdge(this.srcBalloon, destBalloon);//add to graph
      this.listOfBalloons.push(destBalloon);//add to managers list

      //reset balloons
      destBalloon.veined = this.srcBalloon.veined;
      destBalloon.pale = this.srcBalloon.pale;
    }
      */
  }//end of run()
}
