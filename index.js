import Predio from './predio.js';


const btnCadastrarPredio = document.getElementById('Cadastrar-Predio');
const btnClosePredio = document.getElementById('closeModalPredio');
const formCadastroPredio = document.getElementById('form-cadastro-predio');
const formCadastroBloco = document.getElementById('form-cadastro-bloco');

const listaPredio = new Map();


let NumPredio = 0;
let NumBloco = 0;
let complete;
let AlturaPredio = 0;


// Opções da Paleta
interact('#PredioMain')
  .draggable({
    listeners: {
      start (event) {
        
        let NewPredio = document.createElement('div');
        let label = document.createElement('p');
        label.classList.add('label-nome-predio');

        label.innerHTML = 'Predio ' + NumPredio;
        
        NewPredio.classList.add('PredioNovo'); 
        NewPredio.appendChild(label);
        NewPredio.id = NumPredio;

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

// Area de Drop do predio
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

// Predio & Blocos Criados

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
      min: {width: 150, height:150}
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

        // AlturaPredio = target.style.height;
        // console.log(AlturaPredio);
        
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

      complete = newElementBloco;

      var blocoX = (parseFloat(newElementBloco.getAttribute('data-x')) || 0);
      var blocoY = (parseFloat(newElementBloco.getAttribute('data-y')) || 0);

      var predioX = (parseFloat(dropzonePredio.getAttribute('data-x')) || 0);
      var predioY = (parseFloat(dropzonePredio.getAttribute('data-y')) || 0);

      
      var novoX = blocoX - predioX;
      var novoY = blocoY - predioY;

      if (!newElementBloco) return;
      NumBloco++; 

      dropzonePredio.appendChild(newElementBloco);      

      //newElementBloco.style.position = 'fixed';
      newElementBloco.style.transform = 'none'; 

      // permite que voce posicione o bloco onde quiser

      // newElementBloco.style.transform = `translate(${novoX}px, ${novoY}px)`;
      // newElementBloco.setAttribute('data-x', novoX);
      // newElementBloco.setAttribute('data-y', novoY);      

      newElementBloco.setAttribute('data-x', 0);
      newElementBloco.setAttribute('data-y', 0);

      newElementBloco.style.position = 'relative';
      
      newElementBloco.classList.add('BlocoNovoInside');
      newElementBloco.classList.remove('BlocoNovo');

      event.interaction.dropped = true; 
      
      event.target.classList.remove('can-drop');
  },
  ondragleave: function (event) {                  
      event.target.classList.remove('can-drop');      
  },
  ondropdeactivate: function (event) {
      event.target.classList.remove('drop-ativado');
  }

}).on('hold', function (event) {
  console.log(event.type, event.target)
}).on('doubletap', function(event) {

const verif = event.target.className; 
const idDaDiv = event.target.id;

formCadastroPredio.setAttribute('data-target-id', idDaDiv);

const predioSalvo = listaPredio.get(idDaDiv);

if(predioSalvo) {
  // edita
  document.getElementById('nomePredio').value = predioSalvo.nomePredio;
  document.getElementById('qtdPisos').value = predioSalvo.qtdPisos;
} else {
  // cadastra
  document.getElementById('nomePredio').value = '';
  document.getElementById('qtdPisos').value = '';
}
console.log(idDaDiv);

if (verif === 'PredioNovo') {
  formCadastroPredio.showModal();
}

})


btnClosePredio.addEventListener('click', () => {
  formCadastroPredio.close();
})

btnCadastrarPredio.addEventListener('click', () => {

    const nome = document.getElementById('nomePredio').value;
    const pisos = document.getElementById('qtdPisos').value;

    const salvarId = formCadastroPredio.getAttribute('data-target-id');

    const predioExistente = listaPredio.get(salvarId);

    if(predioExistente) {
      predioExistente.atualizarDados(nome, pisos);      
      console.log("predio atualizado", predioExistente);

    }else {

      const novoPredio = new Predio(salvarId ,nome, pisos);
      listaPredio.set(salvarId, novoPredio);
      console.log("predio cadastrado: ", novoPredio);
      
    }
    const AlterarNome = document.getElementById(salvarId);
    const alterarTitulo = document.getElementById('Title-predio');
    
    const labelPredio = AlterarNome.querySelector('.label-nome-predio');

    if(labelPredio){
      labelPredio.textContent = nome;
      alterarTitulo.innerHTML = nome;
    }
    
    formCadastroPredio.close();

})



interact('.BlocoNovoInside')
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

        var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
        var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // x += event.dx;
        // y += event.dy;

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
edges: {

    top: true,
    left: true,
    bottom: true,
    right: true
    
  },
    
    listeners: {
      move: function (event) {
        var target = event.target;

        var x = (parseFloat(target.getAttribute('data-x')) || 0);
        var y = (parseFloat(target.getAttribute('data-y')) || 0);

        target.style.width = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        // LarguraBloco = target.style.width;
        // AlturaBloco = target.style.height;

        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.transform = `translate(${x}px, ${y}px)`;

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      }
    },
      
}).on('tap', function (event) {
  complete.style.width = '0%';
  complete.style.height = '0%';
  complete.style.width = '100%';
  complete.style.height = '100%';
}).on('doubletap', function(event) {
const btnCloseBloco = document.getElementById('closeModalBloco');

formCadastroBloco.showModal();

btnCloseBloco.addEventListener('click', () => {
  formCadastroBloco.close();
})
})
