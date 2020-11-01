export const N_elementary_cellular_automata = {
    "true false false": 1, 
    "true false true": 0,
    "true true false": 0,
    "true true true": 1,
    "false false false": 1,
    "false false true": 0,
    "false true false": 0,
    "false true true": 1
} 

let configuations = {
    "CELL_SIZE": 6,
    "RENDER_INTERVAL": 0,
    "PREFIX_CSS": "celaut_",
    "render_target": '',
    "RULE": N_elementary_cellular_automata,
}

const getBinaryRandom = () => Math.floor(Math.random() * 2)

const addDiv = (className) => {
    const div = document.createElement('div');
    div.className = className;
    
    const root = configuations.render_target !== '' 
        ? document.getElementById(configuations.render_target)
        : document.body;
    root.appendChild(div)
    return div;
}

const isValidCell = (node) => {
    const self = node.classList.contains('active')
    const previous = node.previousSibling 
        ? node.previousSibling.classList.contains('active') 
        : node.parentNode.childNodes[node.parentNode.childNodes.length - 1].classList.contains('active')
    const next = node.nextSibling 
        ? node.nextSibling.classList.contains('active') 
        : node.parentNode.childNodes[0].classList.contains('active')
    
    return configuations.RULE[ previous + " " + self + " " + next ];
}

const drawCells = (row, previewsRow) => {

    row.style.height = configuations.CELL_SIZE + 'px';
    
    for (let i = 0; i < configuations.MAX_CELL; i++) {
        const div = document.createElement('div');
        div.style.width = configuations.CELL_SIZE + 'px';
        div.style.height = configuations.CELL_SIZE + 'px';
        
        if(previewsRow) {
            isValidCell(previewsRow.childNodes[i]) 
            ? div.className = 'cell inactive' 
            : div.className = 'cell active';
        } else {
            getBinaryRandom() 
            ? div.className = 'cell inactive' 
            : div.className = 'cell active';
        }
        row.appendChild(div);
    }
}

let interval;
let currentRow;

const row_render = () => {
    const newRow = addDiv(configuations.PREFIX_CSS + 'row');

    drawCells(newRow, currentRow);
    currentRow = newRow;
    configuations.MAX_ROW--;
    configuations.MAX_ROW ? '' : clearInterval(interval);
} 

export const draw = params => {
    configuations.render_target = params.target;
    configuations.MAX_ROW = Math.round((window.innerHeight/configuations.CELL_SIZE)-configuations.CELL_SIZE) || 10;
    configuations.MAX_CELL = Math.round((window.innerWidth/configuations.CELL_SIZE)-configuations.CELL_SIZE) || 70;
    
    currentRow = addDiv(configuations.PREFIX_CSS + 'row');
    drawCells(currentRow);
    
    interval = setInterval(() => { 
        row_render()
    }, configuations.RENDER_INTERVAL);
}
