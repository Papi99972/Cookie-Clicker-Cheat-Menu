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
      menu.style.width = '300px';
      menu.style.boxShadow = '0 0 20px 2px rgba(0, 255, 0, 0.7)';
      menu.style.backgroundImage = 'url(https://www.transparenttextures.com/patterns/green-hexagons.png)';
      menu.style.backgroundSize = 'cover';
      menu.style.fontSize = '16px';

      const closeButton = document.createElement('button');
      closeButton.textContent = 'X';
      closeButton.style.position = 'absolute';
      closeButton.style.top = '5px';
      closeButton.style.right = '5px';
      closeButton.style.background = 'green';
      closeButton.style.color = 'black';
      closeButton.style.border = 'none';
      closeButton.style.padding = '5px';
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

      // Function to create buttons
      const createButton = (text, callback) => {
        const button = document.createElement('button');
        button.textContent = text;
        button.style.width = '100%';
        button.style.padding = '10px';
        button.style.marginBottom = '10px';
        button.style.background = 'black';
        button.style.color = 'green';
        button.style.border = '2px solid green';
        button.style.fontSize = '16px';
        button.style.transition = 'all 0.1s ease';
        button.onmousedown = () => { button.style.transform = 'translateY(4px)'; };
        button.onmouseup = () => { button.style.transform = 'translateY(0)'; };
        button.onclick = callback;
        menu.appendChild(button);
      };

      // Open Sesame (without achievement)
      createButton('Force Open Sesame', () => {
        Game.OpenSesame();
        alert('Developer tools opened!');
      });

      // Set cookies to a specific amount
      const setCookiesInput = document.createElement('input');
      setCookiesInput.type = 'number';
      setCookiesInput.placeholder = 'Set cookies amount';
      setCookiesInput.style.marginBottom = '10px';
      setCookiesInput.style.width = '100%';
      setCookiesInput.style.padding = '5px';
      setCookiesInput.style.background = 'black';
      setCookiesInput.style.color = 'green';
      setCookiesInput.style.border = '2px solid green';
      menu.appendChild(setCookiesInput);

      createButton('Set Cookies', () => {
        const value = parseInt(setCookiesInput.value);
        if (!isNaN(value)) {
          game.cookies = value;
          game.cookiesOwned = value;
          alert(`Cookies set to ${value}`);
        }
      });

      // Show game source code
      createButton('Show Source Code', () => {
        const sourceCode = JSON.stringify(Game, null, 2);
        const sourceWindow = window.open('', '_blank');
        sourceWindow.document.write('<pre>' + sourceCode + '</pre>');
        sourceWindow.document.title = 'Game Source Code';
      });

      // Buy as many properties as possible
      createButton('Buy Max Properties', () => {
        for (let building of game.ObjectsById) {
          while (game.cookies >= building.price) {
            building.buy(1);
          }
        }
        alert('Max properties purchased!');
      });

      // Set prestige and sugar lumps
      const prestigeInput = document.createElement('input');
      prestigeInput.type = 'number';
      prestigeInput.placeholder = 'Set Prestige';
      prestigeInput.style.marginBottom = '10px';
      prestigeInput.style.width = '100%';
      prestigeInput.style.padding = '5px';
      prestigeInput.style.background = 'black';
      prestigeInput.style.color = 'green';
      prestigeInput.style.border = '2px solid green';
      menu.appendChild(prestigeInput);

      const sugarLumpsInput = document.createElement('input');
      sugarLumpsInput.type = 'number';
      sugarLumpsInput.placeholder = 'Set Sugar Lumps';
      sugarLumpsInput.style.marginBottom = '10px';
      sugarLumpsInput.style.width = '100%';
      sugarLumpsInput.style.padding = '5px';
      sugarLumpsInput.style.background = 'black';
      sugarLumpsInput.style.color = 'green';
      sugarLumpsInput.style.border = '2px solid green';
      menu.appendChild(sugarLumpsInput);

      createButton('Set Prestige & Sugar Lumps', () => {
        const prestige = parseInt(prestigeInput.value);
        const sugarLumps = parseInt(sugarLumpsInput.value);
        if (!isNaN(prestige)) game.prestige = prestige;
        if (!isNaN(sugarLumps)) game.lumps = sugarLumps;
        alert(`Prestige set to ${prestige}, Sugar Lumps set to ${sugarLumps}`);
      });

      // Multiplier for cookies gained
      const multiplierInput = document.createElement('input');
      multiplierInput.type = 'number';
      multiplierInput.placeholder = 'Set Gain Multiplier';
      multiplierInput.style.marginBottom = '10px';
      multiplierInput.style.width = '100%';
      multiplierInput.style.padding = '5px';
      multiplierInput.style.background = 'black';
      multiplierInput.style.color = 'green';
      multiplierInput.style.border = '2px solid green';
      menu.appendChild(multiplierInput);

      createButton('Set Gain Multiplier', () => {
        const multiplier = parseFloat(multiplierInput.value);
        if (!isNaN(multiplier)) {
          game.cookiesPsMult = multiplier;
          alert(`Cookie gain multiplier set to ${multiplier}`);
        }
      });

      document.body.appendChild(menu);
    }
  }, 100);
})();
