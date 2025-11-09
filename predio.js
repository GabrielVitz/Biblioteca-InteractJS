import Bloco from './bloco.js';

export default class Predio {
    
    constructor(id, nomePredio, qtdPisos){
        this.id = id;
        this.nomePredio = nomePredio;
        this.qtdPisos = qtdPisos;
        this.blocos = [];
    }
    
    adicionarBloco(bloco) {
        this.bloco.push(bloco);
    }

    atualizarDados(nome, pisos) {
        this.nomePredio = nome;
        this.qtdPisos = pisos;
        
    }
    
}