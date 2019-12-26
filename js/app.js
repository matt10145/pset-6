window.onload = function() {
    document.getElementById("addButton").onclick = addTask;

}

let tasks = [];

const addTask = function(event) {
    event.preventDefault();
    input = document.getElementById("addedTask").value;
    if (input == "" || input == null) {
        alert("You haven't entered a task.");
        return;
    } 
    else {
        // intentionally empty
    }
    tasks.push(input);
    const list = document.getElementById("ul");
    let lineBreak = document.createElement("br");
    let newItem = document.createElement("li");
    newItem.innerHTML = input;
    list.append(lineBreak);
    list.append(newItem);
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