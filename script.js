// Backend code
// Steven Dai Chuy
const grid = document.getElementById("grid");
let lockGame = false;
let diff = "easy";
let diffSize = 9;

generateGrid(diff);

// 3 temp functions to get the diff from the HTML button
// Still trying to figure out a concise way to do this
function easy(){
    diff = "easy";
}

function normal(){
    diff = "normal";
}

function hard(){
    diff = "hard";
}
// Generate the grid based on the difficulty
function generateDiff(diff){
    switch(diff){
        case "easy":
            generateGrid(diff);
            break;
        
        case "normal":
            generateGrid(diff);
            break;
        
        case "hard":
            generateGrid(diff);
            break;
    }
}

//Generate the grid
function generateGrid(diff){
    lockGame = false;
    grid.innerHTML = "";
    if(diff === "easy"){
        diffSize == 9;
    }
    else if(diff === "normal"){
        diffSize == 16;
    }

    for(var i = 0; i < diffSize; i++){
        row = grid.insertRow(i);
        for(var j = 0; j < diffSize; j++){
            cell = row.insertCell(j);
            cell.oncontextmenu = function() {
                putFlag(this);
            };
            cell.onclick = function () { 
                init(this); 
            };
            var mine = document.createAttribute("mine");
            mine.value = "false";
            cell.setAttributeNode(mine);
        }
    }
    generateMines(diff);
}

// Generate mines randonly
// Trying to find a way to set a number of mines 
// depending on the level of difficulty
function generateMines(diff){
    if(diff === "easy"){
        diffSize = 9;
    }
    else if(diff == "normal"){
        diffSize = 16;
    }
    for (var i = 0; i < diffSize; i++){
        var row = Math.floor(Math.random() * diffSize);
        var col = Math.floor(Math.random() * diffSize);
        var cell = grid.rows[row].cells[col];
        cell.setAttribute("mine","true");
    }
}
    

// Highlight all mines red
function revealMines(diff){
    if(diff === "easy"){
        diffSize = 9;
    }
    else if(diff === "normal"){
        diffSize = 16;
    }
    for(var i = 0; i < diffSize; i++){
        for(var j = 0; j < diffSize; j++){
            var cell = grid.rows[i].cells[j];
            if(cell.getAttribute("mine") == "true"){
                cell.innerHTML = "X";
                cell.className = "mine";
            }
        }
    }
}

// Hide mines
function hideMines(diff){
    if(diff === "easy"){
        diffSize = 9;
    }
    else if(diff === "normal"){
        diffSize = 16;
    }
    for(var i = 0; i < diffSize; i++){
        for(var j = 0; j < diffSize; j++){
            var cell = grid.rows[i].cells[j];
            if(cell.getAttribute("mine") == "true"){
                cell.innerHTML = "";
                cell.className = "cell";
            }
        }
    }
}

function checkGameComplete(diff){
    var gameComplete = true;
    if(diff === "easy"){
        diffSize = 9;
    }
    if(diff === "normal"){
        diffSize = 16;
    }
    for(var i = 0; i < diffSize; i++){
        for(var j = 0; j < diffSize; j++){
            if((grid.rows[i].cells[j].getAttribute("mine") == "false") && (grid.rows[i].cells[j].innerHTML == "")){
                gameComplete = false;
            }
        }
    }
    if(gameComplete){
        alert("You Found All Mines!");
        revealMines(diff);
    }
}


// Right click function to add a flag (color is green)
function putFlag(cell){
    if(lockGame){
        return;
    }
    else if(cell.className == "flag"){
        cell.className = "grid";
    }
    else{
        cell.className = "flag";
    }

}

// Main code to run the game
function init(cell){
    if(lockGame){
        return;
    }
    switch(diff){
        case "easy":
            diffSize = 9;
        
        case "normal":
            diffSize = 16;
    }

    if(cell.getAttribute("mine") == "true"){
        alert("You hit a mine!");
        revealMines(diff);
        lockGame = true;
    }
    else{
        cell.className = "active";
        var mineCount = 0;
        var cellRow = cell.parentNode.rowIndex;
        var cellCol = cell.cellIndex;
        for(var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, (diffSize - 1)); i++){
            for(var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, (diffSize - 1)); j++){
                if(grid.rows[i].cells[j].getAttribute("mine") == "true"){
                    mineCount++;
                }
            }
        }
        cell.innerHTML = mineCount;
        if(mineCount == 0){
            for(var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, (diffSize - 1)); i++){
                for(var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, (diffSize - 1)); j++){
                    if(grid.rows[i].cells[j].innerHTML == ""){
                        init(grid.rows[i].cells[j]);
                    }
                }
            }
        }
        checkGameComplete(diff);
    }
}
    