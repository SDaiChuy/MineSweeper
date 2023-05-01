const grid = document.getElementById("grid");
let lockGame = false;
//Set testMode to True if we want to see the mines
const testMode = false;
generateGrid();

//Generate the grid
function generateGrid(){
    console.log("clicked");
    lockGame = false;
    grid.innerHTML = "";
    for(var i = 0; i < 10; i++){
        row = grid.insertRow(i);
        for(var j = 0; j < 10; j++){
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
    generateMines();
}

//Generate mines randonly
function generateMines(){
    for (var i = 0; i < 20; i++){
        var row = Math.floor(Math.random() * 10);
        var col = Math.floor(Math.random() * 10);
        var cell = grid.rows[row].cells[col];
        cell.setAttribute("mine","true");
        if(testMode){
            cell.innerHTML = "X";
        }
    }
}

//Highlight all mines red
function revealMines(){
    for(var i = 0; i < 10; i++){
        for(var j = 0; j < 10; j++){
            var cell = grid.rows[i].cells[j];
            if(cell.getAttribute("mine") == "true"){
                cell.innerHTML = "X";
                cell.className = "mine";
            }
        }
    }
}

//Hide mines
function hideMines(){
    for(var i = 0; i < 10; i++){
        for(var j = 0; j < 10; j++){
            var cell = grid.rows[i].cells[j];
            if(cell.getAttribute("mine") == "true"){
                cell.className = "cell";
            }
        }
    }
}

function checkGameComplete(){
    var gameComplete = true;
    for(var i = 0; i < 10; i++){
        for(var j = 0; j < 10; j++){
            if((grid.rows[i].cells[j].getAttribute("mine") == "false") && (grid.rows[i].cells[j].innerHTML == "")){
                gameComplete = false;
            }
        }
    }
    
    if(gameComplete){
        alert("You Found All Mines");
        revealMines();
    }
}

// right click function to add a flag (color is green)
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

function init(cell){
    if(lockGame){
        return;
    }
    else{
        if(cell.getAttribute("mine") == "true"){
            revealMines();
            lockGame = true;
        }
        else{
            cell.className = "active";
            var mineCount = 0;
            var cellRow = cell.parentNode.rowIndex;
            var cellCol = cell.cellIndex;
            for(var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++){
                for(var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++){
                    if(grid.rows[i].cells[j].getAttribute("mine") == "true"){
                        mineCount++;
                    }
                }
            }
            cell.innerHTML = mineCount;
            if(mineCount == 0){
                for(var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++){
                    for(var j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++){
                        if(grid.rows[i].cells[j].innerHTML == ""){
                            init(grid.rows[i].cells[j]);
                        }
                    }
                }
            }
            checkGameComplete();
        }
    }
}