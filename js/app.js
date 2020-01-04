window.onload = function() {
    displayDateTime();
    setInterval(displayDateTime, 1000);
    document.getElementById("priorityFormBtn").onclick = inputPriority;

    setListeners();
}

let tasks = [];
let trackClick = 0;
let initialPriority;

/**
 * Establishes HTML event listeners that check for mouse clicks. Manages both the form buttons 
 * (form flag and add) and list element buttons (priority, complete, and remove). Note that this is a
 * much more efficient and manageable method than using individual "onlick" events in window.onload().
 */
const setListeners = function() {
    let addButton = document.getElementById("addButton");
    addButton.addEventListener("click", function() {
        let input = document.getElementById("userInput").value;
        submitTask(input);
        if (getInitialPriority() === "high" && input != null && input != "") {
            togglePriority((tasks.length - 1));
            finalDisplay();
        } else {
            finalDisplay();
        }
    });

    let todoList = document.getElementById("ul");
    todoList.addEventListener("click", function(event) {
        let clicked = event.target;

        if (clicked.id === "removeTaskBtn") {
            let index = clicked.value;
            removeItem(index);
            finalDisplay();
        }
        if (clicked.id === "completeTaskBtn") {
            let index = clicked.value;
            toggleCompleteTask(index);
            finalDisplay();
        }
        if (clicked.id === "priorityTaskBtn") {
            let index = clicked.value;
            togglePriority(index);
            finalDisplay();
        }

    });
}

/**
 * Manages form's priority button. Uses a simple counter to check what color
 * the button should be -- either red or black.
 */
const inputPriority = function(event) {
    event.preventDefault();
    trackClick++
    if (trackClick % 2 != 0) {
        document.getElementById("priorityFormBtn").style.color = "red";
        initialPriority = "high";
    } else {
        document.getElementById("priorityFormBtn").style.color = "black";
        initialPriority = "low";
    }
}

/**
 * Returns the initial priority state.
 */
const getInitialPriority = function() {
    return initialPriority;
}

/**
 * Inputs submissions into the task array. First checks whether there is any actual input and moves on accordingly.
 */
const submitTask = function(event) {
    if (event == null || event === "") return; // one-liner

    let task = {}; // create object
    task.content = event;
    task.checked = false;
    task.priorityHigh = false;
    tasks.push(task);
    let input = document.getElementById("userInput");
    input.value = "";
}

/**
 * Completes the overall display of tasks by running through the "create" functions.
 * Checks for completedness and priority value and updates styles accordingly.
 */
const finalDisplay = function() {
    let list = document.getElementById("ul");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let listElement = document.createElement("li");
        let lineBreak = document.createElement("br");
        if (tasks[index].checked) {
            listElement.style.color = "#42ed70";
            listElement.style.borderColor = "#42ed70";
            listElement.style.textDecoration = "line-through";
        } else {
            // intentionally empty
        }        
        if (tasks[index].priorityHigh) {
            listElement.style.color = "red";
            listElement.style.borderColor = "red";
            listElement.style.textDecoration = "none";
        } else {
            // intentionally empty
        }
        listElement.innerHTML += ("     " + task.content);
        listElement.append(createCompletedBtn(index));
        listElement.append(createRemoveBtn(index));
        listElement.prepend(createPriorityBtn(index));

        list.append(lineBreak);
        list.append(listElement);
    });
}

/**
 * Removes task completely from the list and array and rerenders the list.
 */
const removeItem = function(index) {
    tasks.splice(index, 1);
}

/**
 * Toggles priority state of the task and rerenders the list.
 */
const togglePriority = function(index) {
    tasks[index].priorityHigh = !(tasks[index].priorityHigh);
    let priority = tasks[index].priorityHigh;
    let content = tasks[index];

    if (priority) {
        tasks.splice(index, 1);
        tasks.unshift(content);
    } else {
        tasks.splice(index, 1);
        tasks.push(content);
    }
}

/**
 * Toggles completeness state of the task.
 */
const toggleCompleteTask = function(index) {
    tasks[index].checked = !(tasks[index].checked);
}

/**
 * Creates button that toggles the priority state of an element.
 */
const createPriorityBtn = function(index) {
    let flag = document.createElement("i");
    flag.className = "far fa-flag";
    flag.id = "priorityTaskBtn";
    flag.value = index;

    if (tasks[index].priorityHigh) {
        flag.style.color = "red";
    } else {
        // intentionally empty
    }

    return flag;
}

/**
 * Creates button that checks off an element.
 */
const createCompletedBtn = function(index) {
    let checkmark = document.createElement("i");
    checkmark.className = "far fa-check-square";
    checkmark.id = "completeTaskBtn";
    checkmark.value = index;

    if (tasks[index].checked == true) {
        checkmark.style.color = "#42ed70";
    } else {
        // intentionally empty
    }

    return checkmark;
}

/**
 * Creates button that removes an element.
 */
const createRemoveBtn = function(index) {
    let crossOff = document.createElement("i");
    crossOff.className = "fas fa-times";
    crossOff.id = "removeTaskBtn";
    crossOff.value = index;

    return crossOff;
}

/**
 * Function that runs periodically to display the current date and time.
 */
const displayDateTime = function() {
    var dt = new Date();
    document.getElementById("dateTime").innerHTML = dt.toLocaleString();
}
