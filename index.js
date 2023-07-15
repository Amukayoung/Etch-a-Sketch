let currentMode = 'color';
let displayLines = false;

const colorModeButton = document.querySelector('#color-button');
const rainbowModeButton = document.querySelector('#rainbow-button');
const eraserButton = document.querySelector('#eraser-button');
const toggleLinesButton = document.querySelector('#toggle-lines-button');
const clearButton = document.querySelector('#clear-button');

const grid = document.querySelector("#grid");
const sliderRange = document.querySelector('#slider input');
const colorPicker = document.querySelector('#colorpicker');

function deactivatePreviousButton() {
  const currentActiveButton = document.querySelector(`#${currentMode}-button`);
  currentActiveButton.classList.remove('active');
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function setCellBackground(event) {
  const isLeftButtonPressed = event.buttons === 1;

  if ((event.type === 'click') || (event.type === 'mouseover' && isLeftButtonPressed)) {
    switch (currentMode) {
      case 'color':
        event.target.style.backgroundColor = colorPicker.value;
        break;
      case 'rainbow':
        event.target.style.backgroundColor = getRandomColor();
        break;
      case 'eraser':
        event.target.style.backgroundColor = 'var(--alt-white)';
        break;
      default:
        break;
    }
  }
}

function createCell() {
  const newCell = document.createElement('div');
  newCell.classList.add('cell');
  newCell.addEventListener('click', setCellBackground);
  newCell.addEventListener('mouseover', setCellBackground);
  return newCell;
}

function createColumn(rowsNumber) {
  const newColumn = document.createElement('div');
  newColumn.classList.add('column');
  for (let j = 0; j < rowsNumber; j++) {
    const newCell = createCell();
    newColumn.appendChild(newCell);
  }
  return newColumn;
}

function setGridDimensions(columnsNumber, rowsNumber) {
  while (grid.hasChildNodes()) {
    grid.firstChild.remove();
  }

  document.querySelector('#slider div').textContent = `${columnsNumber} x ${rowsNumber}`;

  for (let i = 0; i < columnsNumber; i++) {
    const newColumn = createColumn(rowsNumber);
    grid.appendChild(newColumn);
  }
}

function updateGridDimensions() {
  const gridSize = sliderRange.value;
  setGridDimensions(gridSize, gridSize);
}

sliderRange.addEventListener('input', updateGridDimensions);

colorModeButton.addEventListener('click', () => {
  deactivatePreviousButton();
  currentMode = 'color';
  colorModeButton.classList.add('active');
});

rainbowModeButton.addEventListener('click', () => {
  deactivatePreviousButton();
  currentMode = 'rainbow';
  rainbowModeButton.classList.add('active');
});

eraserButton.addEventListener('click', () => {
  deactivatePreviousButton();
  currentMode = 'eraser';
  eraserButton.classList.add('active');
});

toggleLinesButton.addEventListener('click', () => {
  const gridCells = document.querySelectorAll('#grid .cell');
  gridCells.forEach((cell) => {
    if (displayLines) {
      cell.classList.remove('line');
    } else {
      cell.classList.add('line');
    }
  });
  displayLines = !displayLines;
});

clearButton.addEventListener('click', () => {
  const gridCells = document.querySelectorAll('#grid .cell');
  gridCells.forEach((cell) => {
    cell.style.backgroundColor = 'var(--alt-white)';
  });
});

setGridDimensions(16, 16);
