window.onload = function() {
    displayDateTime();
    setInterval(displayDateTime, 1000);
    document.getElementById("addButton").onclick = addTask;
    document.getElementById("priorityFormBtn").onclick = inputPriority;
    
}

let tasks = [];
let trackClick = 0;

/**
 * The bulk of this to-do list program: it first adds the desired task to the list with the
 * proper icons. It then checks whether there is text in the input bar. If there is, it moves
 * to read the priority value, and changes the "icon" color accordingly.
 */
const addTask = function(event) {
    event.preventDefault();
    let task = {};
    input = document.getElementById("addedTask").value;
    if (input == "" || input == null) {
        return;
    } 
    else {
        // intentionally empty
    }

    // create variables and icons
    task.content = input;
    const list = document.getElementById("ul");
    let newItem = document.createElement("li");
    let lineBreak = document.createElement("br");

    let flag = document.createElement("button");
    let icon = document.createElement("i");
    icon.className = "far fa-flag";
    flag.prepend(icon);
    flag.id = "priorityTaskBtn";

    let checkmark = document.createElement("button");
    let icon1 = document.createElement("i");
    icon1.className = "far fa-check-square";
    checkmark.prepend(icon1);
    checkmark.id = "completeTaskBtn";

    let crossOff = document.createElement("button");
    let icon2 = document.createElement("i");
    icon2.className = "fas fa-times";
    crossOff.prepend(icon2);
    crossOff.id = "removeTaskBtn";

    if (document.getElementById("priorityFormBtn").style.color == "red") {
        flag.style.color = "red";
        newItem.style.borderColor = "red";
        document.getElementById("priorityFormBtn").style.color = "black";
        trackClick++;
        task.priority = "high";
    }
    else {
        flag.style.color = "black";
        newItem.style.borderColor = "white";
        task.priority = "low";
    }

    task.completed = "false";
    tasks.push(task);
    newItem.innerHTML = ("     " + task.content); 
    newItem.prepend(flag);
    newItem.append(checkmark);
    newItem.append(crossOff);

    // final display
    list.append(lineBreak);
    list.append(newItem);
    document.getElementById("addedTask").value = "";

}

/** 
 * Manages form's priority button's color. Uses a simple counter to check what color
 * the button should be -- either red or black.
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