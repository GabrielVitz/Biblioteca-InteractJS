let NumPredio = 0;
let NumBloco = 0;

// Opções da Paleta
interact('#PredioMain')
  .draggable({
    listeners: {
      start (event) {
        
        let NewPredio = document.createElement('div');
        let label = document.createElement('p');
        label.innerHTML = 'Predio ' + NumPredio;
        
        NewPredio.classList.add('PredioNovo'); 
        NewPredio.appendChild(label);
        
        document.body.appendChild(NewPredio);

        NewPredio.style.position = 'fixed';
        
        NewPredio.style.left = '0';
        NewPredio.style.top = '0';
        
        var x = event.x0;
        var y = event.y0;
        
        NewPredio.style.transform = `translate(${x}px, ${y}px)`;
        
        NewPredio.setAttribute('data-x', x);
        NewPredio.setAttribute('data-y', y);
        
        event.interaction.clonedElement = NewPredio;

      },

      move (event) {
        var clonedElement = event.interaction.clonedElement;
        if (!clonedElement) return; 
        

        var x = (parseFloat(clonedElement.getAttribute('data-x')) || 0);
        var y = (parseFloat(clonedElement.getAttribute('data-y')) || 0);

        x += event.dx;
        y += event.dy;

        clonedElement.style.transform = `translate(${x}px, ${y}px)`;
        clonedElement.setAttribute('data-x', x);
        clonedElement.setAttribute('data-y', y);
      },

      end (event) {
        var clonedElement = event.interaction.clonedElement;
        
        if (!event.interaction.dropped) {
          clonedElement.remove();
          console.log('sumiu');
        }

        delete event.interaction.clonedElement;
        delete event.interaction.dropped;
      }
    },
    inertia: true
  });

interact('#BlocoMain')
.draggable({
  listeners: {
      start (event) {
        
        let NewBloco = document.createElement('div');
        let label = document.createElement('p');
        label.innerHTML = 'Bloco ' + NumBloco;
        
        NewBloco.classList.add('BlocoNovo'); 
        NewBloco.appendChild(label);
        
        document.body.appendChild(NewBloco);

        NewBloco.style.position = 'fixed';
        
        NewBloco.style.left = '0';
        NewBloco.style.top = '0';
        
        var x = event.x0;
        var y = event.y0;
        
        NewBloco.style.transform = `translate(${x}px, ${y}px)`;
        
        NewBloco.setAttribute('data-x', x);
        NewBloco.setAttribute('data-y', y);
        
        event.interaction.clonedElement = NewBloco;

      },

      move (event) {
        var clonedElement = event.interaction.clonedElement;
        if (!clonedElement) return; 
        

        var x = (parseFloat(clonedElement.getAttribute('data-x')) || 0);
        var y = (parseFloat(clonedElement.getAttribute('data-y')) || 0);

        x += event.dx;
        y += event.dy;

        clonedElement.style.transform = `translate(${x}px, ${y}px)`;
        clonedElement.setAttribute('data-x', x);
        clonedElement.setAttribute('data-y', y);
      },

      end (event) {
        var clonedElement = event.interaction.clonedElement;
        
        if (!event.interaction.dropped) {
          clonedElement.remove();
          console.log('sumiu');
        }

        delete event.interaction.clonedElement;
        delete event.interaction.dropped;
      }
    },
    inertia: true
})

// Area de Drop dos Predo
interact('#Right')
.dropzone({
    accept: '.Predio',
    ondropactivate: function (event) {
      event.target.classList.add('drop-ativado');
    },

    ondragenter: function (event) {
      var dropzoneElement = event.target;
      var clonedElement = event.interaction.clonedElement;
      
      if (clonedElement) {
        //clonedElement.classList.add('can-drop');    
      }
    },

    ondrop: function (event) {
      
      var newElementPredio = event.interaction.clonedElement;
      var dropzoneElement = event.target; // A #Right

      var x = 0;
      var y = 0;
      x = (parseFloat(newElementPredio.getAttribute('data-x')) || 0);
      y = (parseFloat(newElementPredio.getAttribute('data-y')) || 0);

      if (!newElementPredio) return;
      NumPredio++; 

      dropzoneElement.appendChild(newElementPredio);

      newElementPredio.style.position = 'fixed';
      newElementPredio.style.transform = 'none';
      

      // newElementPredio.style.left = 'auto';
      // newElementPredio.style.top = 'auto';

      newElementPredio.style.transform = `translate(${x}px, ${y}px)`;
      newElementPredio.setAttribute('data-x', x);
      newElementPredio.setAttribute('data-y', y);

      event.interaction.dropped = true; 
      
      newElementPredio.classList.remove('can-drop');
    },

    ondragleave: function (event) {      
      var clonedElement = event.interaction.clonedElement;
      if (clonedElement) {
        clonedElement.classList.remove('can-drop');
      }
    },

    ondropdeactivate: function (event) {
      event.target.classList.remove('drop-ativado');
    }
});

// Objetos Criados

interact('.PredioNovo')
.draggable({
  modifiers: [
    //o restrictRect considera a dimensão do elemento, enquanto apenas o restrict considera as coordenadas
    interact.modifiers.restrictRect({
      restriction: '#Right',
      endOnly: true
    })
  ],
  listeners: {
  
  move (event) {
        let target = event.target;

        var x = (parseFloat(target.getAttribute('data-x')) || 0);
        var y = (parseFloat(target.getAttribute('data-y')) || 0);

        x += event.dx;
        y += event.dy;

        target.style.transform = `translate(${x}px, ${y}px)`;
                      
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    },
  },
  inertia: true
}).resizable({
  modifiers: [
    interact.modifiers.restrictSize({
      min: {width:150, height:150}
    })
  ],
edges: { top: true, left: true, bottom: true, right: true },
    
    listeners: {
      move: function (event) {
        var target = event.target;

        var x = (parseFloat(target.getAttribute('data-x')) || 0);
        var y = (parseFloat(target.getAttribute('data-y')) || 0);

        target.style.width = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.transform = `translate(${x}px, ${y}px)`;

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      }
    },
      
}).dropzone({
  accept: '.Bloco',
  
  ondropactivate: function (event) {
    event.target.classList.add('drop-ativado');
  },
  ondragenter: function (event) {
    var clonedElement = event.interaction.clonedElement;
    event.target.classList.add('can-drop');
  },
  ondrop: function (event) {
      
      var newElementBloco = event.interaction.clonedElement;
      var dropzonePredio = event.target; // a dropzone da .PredioNovo
            
      var blocoX = (parseFloat(newElementBloco.getAttribute('data-x')) || 0);
      var blocoY = (parseFloat(newElementBloco.getAttribute('data-y')) || 0);

      var predioX = (parseFloat(dropzonePredio.getAttribute('data-x')) || 0);
      var predioY = (parseFloat(dropzonePredio.getAttribute('data-y')) || 0);

      
      var novoX = blocoX - predioX;
      var novoY = blocoY - predioY;

      if (!newElementBloco) return;
      NumBloco++; 

      dropzonePredio.appendChild(newElementBloco);

      newElementBloco.style.position = 'fixed';
      newElementBloco.style.transform = 'none';
      
      newElementBloco.style.transform = `translate(${novoX}px, ${novoY}px)`;
      newElementBloco.setAttribute('data-x', novoX);
      newElementBloco.setAttribute('data-y', novoY);

      event.interaction.dropped = true; 
      
      event.target.classList.remove('can-drop');
  },
  ondragleave: function (event) {                  
      event.target.classList.remove('can-drop');      
  },
  ondropdeactivate: function (event) {
      event.target.classList.remove('drop-ativado');
  }

})


interact('.BlocoNovo')
.draggable({
  modifiers: [
    //o restrictRect considera a dimensão do elemento, enquanto apenas o restrict considera as coordenadas
    interact.modifiers.restrictRect({
      restriction: '.PredioNovo',
      endOnly: true
    })
  ],
  listeners: {
  
  move (event) {
        let target = event.target;

        var x = (parseFloat(target.getAttribute('data-x')) || 0);
        var y = (parseFloat(target.getAttribute('data-y')) || 0);

        x += event.dx;
        y += event.dy;

        target.style.transform = `translate(${x}px, ${y}px)`;
                      
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    },
  },
  inertia: true
}).resizable({
  modifiers: [
    interact.modifiers.restrictSize({
      min: {width: 150, height:150},
      max: '.PredioNovo'
    })

  ],
edges: { top: true, left: true, bottom: true, right: true },
    
    listeners: {
      move: function (event) {
        var target = event.target;

        var x = (parseFloat(target.getAttribute('data-x')) || 0);
        var y = (parseFloat(target.getAttribute('data-y')) || 0);

        target.style.width = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.transform = `translate(${x}px, ${y}px)`;

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      }
    },
      
})
