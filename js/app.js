window.onload = function() {
    displayDateTime();
    setInterval(displayDateTime, 1000);

    setListeners();

    document.getElementById("priorityFormBtn").onclick = inputPriority;
}

/**
 * Establishes HTML event listeners that check for button clicks. Manages the "add" button
 * along with the list element buttons (priority, complete, and remove). This is much more
 * efficient than using individual "onlick" events in window.onload().
 */
const setListeners = function() {
    let addButton = document.getElementById("addButton");
    addButton.addEventListener("click", function() {
        let input = document.getElementById("userInput").value;
        submitTask(input);
        finalDisplay();
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
let trackClick = 0;
const inputPriority = function(event) {
    event.preventDefault();
    trackClick++
    if (trackClick % 2 != 0) {
        document.getElementById("priorityFormBtn").style.color = "red";
    } else {
        document.getElementById("priorityFormBtn").style.color = "black";
    }
}

let tasks = [];

/**
 * Inputs submissions into the task array. First checks whether there is any actual input and moves on accordingly.
 */
const submitTask = function(event) {
    if (event == null || event === "") return;

    let task = {}; // create object
    task.content = event;
    task.checked = false;
    if (document.getElementById("priorityFormBtn").style.color == "red") {
        task.priorityHigh = true;
        document.getElementById("priorityFormBtn").style.color = "black";
    } else {
        task.priorityHigh = false;
    }
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
        } else if (tasks[index].priorityHigh) {
            listElement.style.color = "red";
            listElement.style.borderColor = "red";
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
    let choice = String(prompt("Are your sure you want to remove this task? (Answer with y / n)."));
    choice = choice.toLowerCase();
    if (choice === "y") tasks.splice(index, 1);
        else return;
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
    let flag = document.createElement("button");
    let icon = document.createElement("i");
    icon.className = "far fa-flag";
    flag.prepend(icon);
    flag.id = "priorityTaskBtn";
    flag.value = index;

    if (tasks[index].priority === "high") {
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
    let checkmark = document.createElement("button");
    let icon1 = document.createElement("i");
    icon1.className = "far fa-check-square";
    checkmark.prepend(icon1);
    checkmark.id = "completeTaskBtn";
    checkmark.value = index;

    if (tasks[index].checked == true) {
        checkmark.style.color = "green";
    } else {
        // intentionally empty
    }

    return checkmark;    
}

/**
 * Creates button that removes an element.
 */
const createRemoveBtn = function(index) {
    let crossOff = document.createElement("button");
    let icon2 = document.createElement("i");
    icon2.className = "fas fa-times";
    crossOff.prepend(icon2);
    crossOff.id = "removeTaskBtn";
    crossOff.value = index;

    return crossOff;
}

/**
 * Function that runs periodically to display date and time.
 */
const displayDateTime = function() {
    var dt = new Date();
    document.getElementById("dateTime").innerHTML = dt.toLocaleString();
}