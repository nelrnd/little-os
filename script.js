const button = document.querySelector('button');

// Remove context menu on whole page
window.addEventListener('contextmenu', event => {
  event.preventDefault();
})

function createWindow() {
  const windiv = document.createElement('div');

  windiv.classList.add('window');

  // Make window appear alongside the previous one
  const otherWindows = document.querySelectorAll('.window');
  if (otherWindows.length > 0) {
    windiv.style.left = otherWindows[otherWindows.length - 1].offsetLeft + 50 + 'px';
    windiv.style.top = otherWindows[otherWindows.length - 1].offsetTop + 50 + 'px';
  }

  // Make window appear on top of the others
  windiv.addEventListener('mousedown', event => {
    document.body.appendChild(event.target);
  });

  const winPos = {
    startPos: {x: null, y: null},
    newPos: {x: null, y: null}}
  ;

  windiv.addEventListener('mousedown', event => {
    if (event.button === 0) {
      winPos.startPos.x = event.clientX;
      winPos.startPos.y = event.clientY;
      windiv.addEventListener('mousemove', dragWindow);
    }
  });

  function dragWindow(event) {
    if (event.buttons === 0) {
      windiv.removeEventListener('mousemove', dragWindow);
    } else {
      winPos.newPos.x = winPos.startPos.x - event.clientX;
      winPos.newPos.y = winPos.startPos.y - event.clientY;
      windiv.style.left = windiv.offsetLeft - winPos.newPos.x + 'px';
      windiv.style.top = windiv.offsetTop - winPos.newPos.y + 'px';
      winPos.startPos.x = event.clientX;
      winPos.startPos.y = event.clientY;
    }
  }

  document.body.appendChild(windiv);
}

button.addEventListener('click', createWindow);

