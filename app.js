tipoSorteio();

function sortear(){
    let quantidade = parseInt(document.getElementById('quantidade').value);
    let de = parseInt(document.getElementById('de').value);
    let ate = parseInt(document.getElementById('ate').value);

     if (!quantidade || quantidade <= 0) {
      if(quantidade == 0){
        alert(`Você digitou ${quantidade}! Digite a quantidade de números que deseja sortear.`);
    return;
      }else{
         alert("Campo Quantidade de números vazio!");
    return;
      }
   
  }

    if(de > ate){
            
            alert("Campo 'Do número' deve ser inferior ao campo 'Até o número'. Verifique!");
            return;
    }else  if(quantidade > (ate - de + 1)){
            alert("Campo 'Quantidade de números' deve ser inferior aos campos 'Do número' e 'Até o número' para poder sortear dentro do intervalo. Verifique!");
            return;
    }
   

    
    let sorteados = [];
    let numero;

   
    for(let i = 0; i < quantidade; i++){

        numero = obterNumeroAleatorio(de, ate);

            

        
        
        
        
                
            while(sorteados.includes(numero)){
                numero = obterNumeroAleatorio(de, ate);
            }


        sorteados.push(numero);

        

        
    }

    let resultado = document.getElementById('resultado');
    resultado.innerHTML = `<label class="texto__resultado">Números sorteados: ${sorteados.join(", ")}</label>`
    alterarStatusBotao();
    
    document.getElementById("btn-pdf-numeros").classList.remove("hidden");


}


function obterNumeroAleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function alterarStatusBotao(){
    let botao = document.getElementById('btn-reiniciar');
    if(botao.classList.contains('container__botao-desabilitado')){
        botao.classList.remove('container__botao-desabilitado');
        botao.classList.add('container__botao');
        

    }else{
        botao.classList.remove('container__botao');
        botao.classList.add('container__botao-desabilitado');
    }
}

function reiniciar(){
    document.getElementById('quantidade').value = '';
    document.getElementById('de').value = '';
    document.getElementById('ate').value = '';
    document.getElementById('resultado').innerHTML = `<label class="texto__resultado">Números sorteados: nenhum até agora</label>`;
    document.getElementById("btn-pdf-numeros").classList.add("hidden");
    alterarStatusBotao();

}

  function tipoSorteio(){
  document.getElementById("tipoSorteio").addEventListener("change", function () {
  const tipo = this.value;
  const tipoSorteioContainer = document.getElementById("tipoSorteioContainer");
  const sorteioNumeros = document.getElementById("sorteioNumeros");
  const sorteioNomes = document.getElementById("sorteioNomes");
  const voltarContainer = document.getElementById("voltarContainer");

  // Esconde tudo primeiro
  sorteioNumeros.classList.add("hidden");
  sorteioNomes.classList.add("hidden");

  if (tipo === "numeros") {
    sorteioNumeros.classList.remove("hidden");
    tipoSorteioContainer.classList.add("hidden");
    voltarContainer.classList.remove("hidden");
  } else if (tipo === "nomes") {
    sorteioNomes.classList.remove("hidden");
    tipoSorteioContainer.classList.add("hidden");
    voltarContainer.classList.remove("hidden");
  }
});
  }


 
  function voltar() {
  reiniciar();
  reiniciarNomes();
  document.getElementById("sorteioNumeros").classList.add("hidden");
  document.getElementById("sorteioNomes").classList.add("hidden");
  document.getElementById("voltarContainer").classList.add("hidden");
  document.getElementById("tipoSorteioContainer").classList.remove("hidden");
  document.getElementById("tipoSorteio").value = "";
  
}

function sortearNomes() {
  let texto = document.getElementById("listaNomes").value.trim();
  let quantidade = parseInt(document.getElementById("quantidadeNomes").value);
  let resultadoDiv = document.getElementById("resultadoNomes");

  
  
  if (texto === "") {
    alert("Campo dos nomes não foi preenchido!");
    return;
  }

  let nomes = texto.split(",").map(nome => nome.trim()).filter(nome => nome !== "");

  if (quantidade >= nomes.length) {
    alert("A quantidade a sortear não pode ser maior ou igual que o total de nomes.");
    return;
  }
   if (!quantidade || quantidade <= 0 ) {
    alert("A quantidade a sortear não pode ser vazia ou menor que 1.");
    return;
  }

  let sorteados = [];
  while (sorteados.length < quantidade) {
    let indice = Math.floor(Math.random() * nomes.length);
    let nome = nomes[indice];
    if (!sorteados.includes(nome)) {
      sorteados.push(nome);
    }
  }

  resultadoDiv.innerHTML = `<label class="texto__resultado">Nomes sorteados: ${sorteados.join(", ")}</label>`;
  alterarStatusBotaoNomes();
  document.getElementById("btn-pdf-nomes").classList.remove("hidden");

}

function reiniciarNomes() {
  document.getElementById("listaNomes").value = "";
  document.getElementById("quantidadeNomes").value = "";
  document.getElementById("resultadoNomes").innerHTML = `<label class="texto__resultado">Nomes sorteados: nenhum até agora</label>`;
  document.getElementById("btn-pdf-nomes").classList.add("hidden");
  alterarStatusBotaoNomes();
}

function alterarStatusBotaoNomes() {
  let botao = document.getElementById("btn-reiniciar-nomes");
  if (botao.classList.contains("container__botao-desabilitado")) {
    botao.classList.remove("container__botao-desabilitado");
    botao.classList.add("container__botao");
  } else {
    botao.classList.remove("container__botao");
    botao.classList.add("container__botao-desabilitado");
  }
}

async function gerarPDFNumeros() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Captura o resultado atual
  const resultadoTexto = document.getElementById("resultado").innerText;

  // Cabeçalho do PDF
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Resultado do Sorteio de Números", 20, 20);

  // Corpo do PDF
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.text(resultadoTexto, 20, 40);

  // Rodapé com data e hora
  const data = new Date().toLocaleString("pt-BR");
  doc.setFontSize(10);
  doc.text(`Gerado em: ${data}`, 20, 280);

  // Baixa o arquivo
  doc.save("sorteio_numeros.pdf");
}

async function gerarPDFNomes() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const resultadoTexto = document.getElementById("resultadoNomes").innerText;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Resultado do Sorteio de Nomes", 20, 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.text(resultadoTexto, 20, 40);

  const data = new Date().toLocaleString("pt-BR");
  doc.setFontSize(10);
  doc.text(`Gerado em: ${data}`, 20, 280);

  doc.save("sorteio_nomes.pdf");
}
