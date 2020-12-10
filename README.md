# CPSC355-Project3-BallonJuice

Juan Cocina, CPSC 335-03, Siska

Main.js passes the start balloon into manager
Manager.js creates a path generator
Paths.js is what makes the modification on each balloon and pushes it to graph.js's graph, once the balloon 3, 13, 3 is found
	tell the manager that we're done
	manager will use a panths.js function that tells graph.js to traverse the adjacency list
Graph.js has the functions to create the adjacency list, and traverse it

This is the basic gist of the js heirarchy

//current issues
Paths.js is not doing the moves and storing them properly
Ive created this.srcBalloon and destBalloon (source and destination respectivly).
this.srcBalloon is supposed to stay as the original Balloon that came into run(), and im only supposed to make modifications on destBalloon.
(look at paths.js run() function before continuing)

After making a modification to 0 13 6, i get 13 0 6, which is fine, so i push that
But even when i only modify destBalloon, it seems to me that this.srcBalloon changes, to what destBalloon is.
So i can't reset destBalloon to the one that came into run(), and continue to the next move

the moves should be as follows
start ---> 0 13 6
d <---- p (move all to d from p) = 13 0 6
d ----> p (move all to p from d) //doesn't reset to 0 13 6, so it just moves 13 0 6, back to 0 13 6
d ---->-P (move to limit on p from d) = doesn't matter right now

i think the issue might be that im passing a reference to the original balloon or a pointer, not sure how javascript works
So i have to go back to the original code, and make it a global variable instead. so that way modifying the destBalloon wont change the srcBalloon

//update
the balloon object is passed by reference, because its an object, so no matter what i do, its always going to change the original value.

//Update
i need a way to check if the balloon has been explored or not, because it keeps adding the same ones over and over.
The list grows exponentially, which is bad.
So i need a way to check if the balloon has been explored.
