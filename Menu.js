(function() {
  const intervalCheck = setInterval(function() {
    if (typeof Game !== 'undefined' && Game.cookies !== undefined) {
      clearInterval(intervalCheck);
      
      const game = Game;
      const menu = document.createElement('div');
      menu.style.position = 'absolute';
      menu.style.top = '10px';
      menu.style.right = '10px';
      menu.style.background = 'black';
      menu.style.color = 'green';
      menu.style.padding = '20px';
      menu.style.borderRadius = '10px';
      menu.style.fontFamily = 'monospace';
      menu.style.zIndex = '99999';
      menu.style.width = '250px';
      menu.style.height = 'auto';
      menu.style.boxShadow = '0 0 20px 2px rgba(0, 255, 0, 0.7)';
      menu.style.backgroundImage = 'url(https://www.transparenttextures.com/patterns/green-hexagons.png)';
      menu.style.backgroundSize = 'cover';
      menu.style.fontSize = '16px';
      menu.style.lineHeight = '1.5';
      menu.style.cursor = 'auto';

      let isDragging = false;
      let offsetX, offsetY;
      
      menu.onmousedown = function(e) {
        isDragging = true;
        offsetX = e.clientX - menu.offsetLeft;
        offsetY = e.clientY - menu.offsetTop;
        document.onmousemove = moveMenu;
        document.onmouseup = function() {
          isDragging = false;
          document.onmousemove = null;
        };
      };

      function moveMenu(e) {
        if (isDragging) {
          menu.style.left = (e.clientX - offsetX) + 'px';
          menu.style.top = (e.clientY - offsetY) + 'px';
        }
      }

      const closeButton = document.createElement('button');
      closeButton.textContent = 'X';
      closeButton.style.position = 'absolute';
      closeButton.style.top = '5px';
      closeButton.style.right = '5px';
      closeButton.style.background = 'green';
      closeButton.style.color = 'black';
      closeButton.style.border = 'none';
      closeButton.style.padding = '5px 10px';
      closeButton.style.fontSize = '16px';
      closeButton.style.cursor = 'pointer';
      closeButton.style.borderRadius = '5px';
      closeButton.onclick = function() {
        document.body.removeChild(menu);
      };

      menu.appendChild(closeButton);

      const title = document.createElement('h3');
      title.textContent = 'Cookie Clicker Cheat Menu';
      title.style.textAlign = 'center';
      title.style.color = 'lime';
      menu.appendChild(title);

      const gainCookiesInput = document.createElement('input');
      gainCookiesInput.type = 'number';
      gainCookiesInput.placeholder = 'Amount to gain';
      gainCookiesInput.style.marginBottom = '10px';
      gainCookiesInput.style.width = '100%';
      gainCookiesInput.style.padding = '5px';
      gainCookiesInput.style.background = 'black';
      gainCookiesInput.style.color = 'green';
      gainCookiesInput.style.border = '2px solid green';
      gainCookiesInput.style.marginBottom = '10px';
      menu.appendChild(gainCookiesInput);

      const gainCookiesButton = document.createElement('button');
      gainCookiesButton.textContent = 'Gain Cookies';
      gainCookiesButton.style.width = '100%';
      gainCookiesButton.style.padding = '10px';
      gainCookiesButton.style.marginBottom = '10px';
      gainCookiesButton.style.background = 'black';
      gainCookiesButton.style.color = 'green';
      gainCookiesButton.style.border = '2px solid green';
      gainCookiesButton.style.fontSize = '16px';
      gainCookiesButton.style.transition = 'all 0.1s ease';
      gainCookiesButton.onmousedown = () => { gainCookiesButton.style.transform = 'translateY(4px)'; };
      gainCookiesButton.onmouseup = () => { gainCookiesButton.style.transform = 'translateY(0)'; };
      gainCookiesButton.onclick = () => {
        const value = parseInt(gainCookiesInput.value);
        if (!isNaN(value)) {
          game.cookies += value;
          game.cookiesOwned += value;
          alert(`Gained ${value} cookies`);
        }
      };
      menu.appendChild(gainCookiesButton);

      const autoClickButton = document.createElement('button');
      autoClickButton.textContent = 'Enable Auto-Clicker';
      autoClickButton.style.width = '100%';
      autoClickButton.style.padding = '10px';
      autoClickButton.style.marginBottom = '10px';
      autoClickButton.style.background = 'black';
      autoClickButton.style.color = 'green';
      autoClickButton.style.border = '2px solid green';
      autoClickButton.style.fontSize = '16px';
      autoClickButton.style.transition = 'all 0.1s ease';
      autoClickButton.onmousedown = () => { autoClickButton.style.transform = 'translateY(4px)'; };
      autoClickButton.onmouseup = () => { autoClickButton.style.transform = 'translateY(0)'; };
      autoClickButton.onclick = () => {
        let interval;
        if (interval) clearInterval(interval);
        interval = setInterval(() => {
          document.getElementById('bigCookie').click();
        }, 1);
        alert('Auto-clicker enabled!');
      };
      menu.appendChild(autoClickButton);

      const resizeHandle = document.createElement('div');
      resizeHandle.style.position = 'absolute';
      resizeHandle.style.bottom = '5px';
      resizeHandle.style.right = '5px';
      resizeHandle.style.width = '15px';
      resizeHandle.style.height = '15px';
      resizeHandle.style.backgroundColor = 'green';
      resizeHandle.style.cursor = 'se-resize';
      resizeHandle.style.borderRadius = '5px';

      resizeHandle.onmousedown = function(e) {
        e.preventDefault();
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = menu.offsetWidth;
        const startHeight = menu.offsetHeight;
        
        document.onmousemove = function(e) {
          menu.style.width = (startWidth + e.clientX - startX) + 'px';
          menu.style.height = (startHeight + e.clientY - startY) + 'px';
        };
        
        document.onmouseup = function() {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };

      menu.appendChild(resizeHandle);
      document.body.appendChild(menu);
    }
  }, 100);
})();
