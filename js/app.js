window.onload = function() {
    displayDateTime();
    setInterval(displayDateTime, 1000);
    document.getElementById("addButton").onclick = addTask;
    document.getElementById("priorityFormBtn").onclick = inputPriority;
    
}

//this needs work (how to store these as objects??)
let tasks = [];
let task = {
    content: "",
    priority: "none",
    completed: "false"
}
let trackClick = 0;

/**
 * 
 * @param {Adds the desired task to the list. Checks first whether there is any input. 
 * If there is, it moves to check the priority of the task, and changes the "icon" color accordingly.}
 */
const addTask = function(event) {
    event.preventDefault();
    input = document.getElementById("addedTask").value;
    if (input == "" || input == null) {
        return;
    } 
    else {
        // intentionally empty
    }
    tasks.push(input);
    document.getElementById("addedTask").value = "";
    const list = document.getElementById("ul");
    let newItem = document.createElement("li");
    newItem.innerHTML = input;

    if (document.getElementById("priorityFormBtn").style.color == "red") {
        newItem.style.borderColor = "red";
        document.getElementById("priorityFormBtn").style.color = "black";
        trackClick++;
    }
    else {
        newItem.style.borderColor = "white";
    }
    list.append(newItem);
}

/**
 * 
 * @param {Manages form's priority button's color. Uses a simple counter to check what color
 * the button should be -- either red or black.}
 */
const inputPriority = function(event) {
    event.preventDefault();
    trackClick++
    if (trackClick % 2 != 0) {
        document.getElementById("priorityFormBtn").style.color = "red";
    }
    else {
        document.getElementById("priorityFormBtn").style.color = "black";
    }
}

const completeTask = function() {

}

const incompleteTask = function() {

}

const removeTask = function() {

}



const highPriority = function() {

}

const lowPriority = function() {

}

const displayDateTime = function() {
    var dt = new Date();
    document.getElementById("dateTime").innerHTML = dt.toLocaleString();
}