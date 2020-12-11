// this code for a graph, and its traversal was found at
// https://www.freecodecamp.org/news/8-essential-graph-algorithms-in-javascript/
// i am reusing and modifying the source code to fit this applicaiton
class Graph {
  constructor(){
    this.adjacencyList = new Map();
  }
  addVertex(vertex){
    if(!this.adjacencyList[vertex]){
      this.adjacencyList.set(vertex, []);
    }
  }
  addEdge(source, destination){
    if(!this.adjacencyList[source]){
      this.addVertex(source);
    }
    if(!this.adjacencyList[destination]){
      this.addVertex(destination);
    }
    this.adjacencyList.get(source).push(destination);
    this.adjacencyList.get(destination).push(source);
    //this.adjacencyList[destination].push(source);
  }
  print2dArray(){
    console.log("print")
    console.log(this.adjacencyList.size)

    var iterator_obj = this.adjacencyList.entries();
    for(let i = 0; i < this.adjacencyList.size; i++){
      document.getElementById("array").innerHTML= JSON.stringify(iterator_obj.next().value), "<br>";
    }

  }
  /* this section shouldn't be necessary for this project
  removeEdge(source, destination) {
    this.adjacencyList[source] = this.adjacencyList[source].filter(vertex => vertex !== destination);
    this.adjacencyList[destination] = this.adjacencyList[destination].filter(vertex => vertex !== source);
  }
  removeVertex(vertex) {
    while (this.adjacencyList[vertex]) {
      const adjacentVertex = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, adjacentVertex);
    }
    delete this.adjacencyList[vertex];
  }
  */
//  dfs(){

//  }
}
