let alunos = [];
let aluno = {};
let alunosAbaixoDaMedia = [];

const btnAdicionarAluno = document.getElementById('adcaluno');
const divResultado = document.getElementById('divResultado');

function inserirDivResultadoApos(elemento) {
    elemento.insertAdjacentElement('afterend', divResultado);
}

btnAdicionarAluno.addEventListener('click', function(){
    var conteiner = document.createElement('div');
    conteiner.classList.add('conteiner_infoAluno');
    document.body.appendChild(conteiner);

    setTimeout(function() {
        conteiner.classList.add('show');
    }, 50);

    var nomeAluno = document.createElement('input');
    conteiner.appendChild(nomeAluno);
    nomeAluno.name = 'nomeAluno';
    nomeAluno.type = 'Text';
    nomeAluno.placeholder = "Nome do aluno";
    nomeAluno.classList.add('info_aluno');

    var nota1 = document.createElement('input');
    conteiner.appendChild(nota1);
    nota1.id = 'nota1';
    nota1.type = 'Number';
    nota1.min = '0'; nota1.max = '100';
    nota1.placeholder = "Nota 1°Bim";
    nota1.classList.add('info_aluno');

    var nota2 = document.createElement('input');
    conteiner.appendChild(nota2);
    nota2.id = 'nota2';
    nota2.type = 'Number';
    nota2.min = '0'; nota2.max = '100';
    nota2.placeholder = "Nota 2°Bim";
    nota2.classList.add('info_aluno');
    
    var nota3 = document.createElement('input');
    conteiner.appendChild(nota3);
    nota3.id = 'nota3';
    nota3.type = 'Number';
    nota3.min = '0'; nota3.max = '100';
    nota3.placeholder = "Nota 3°Bim";
    nota3.classList.add('info_aluno');

    var nota4 = document.createElement('input');
    conteiner.appendChild(nota4);
    nota4.id = 'nota4';
    nota4.type = 'Number';
    nota4.min = '0'; nota4.max = '100';
    nota4.placeholder = "Nota 4°Bim";
    nota4.classList.add('info_aluno');

    var mediaAluno = document.createElement('input');
    conteiner.appendChild(mediaAluno);
    mediaAluno.id = 'mediaAluno';
    mediaAluno.type ='Number';
    mediaAluno.placeholder = "Média final"
    mediaAluno.setAttribute('readonly', true);
    mediaAluno.classList.add('info_aluno');

    var situacaoAluno = document.createElement('input');
    situacaoAluno.id = 'situacaoAluno'; 
    conteiner.appendChild(situacaoAluno);
    situacaoAluno.placeholder = "Situação"
    situacaoAluno.setAttribute('readonly', true);
    situacaoAluno.classList.add('info_aluno');

    aluno = {
        nome: nomeAluno,
        notas: [nota1, nota2, nota3, nota4],
        media: mediaAluno,
        situacao: situacaoAluno
    };
    alunos.push(aluno);

    // Move a divResultado para baixo do último aluno adicionado
    inserirDivResultadoApos(conteiner);
});


function verificarAlunosAbaixoDaMedia(mediaTurma) {
    alunosAbaixoDaMedia = alunos.filter(function(teste){
        return parseFloat(teste.media.value) < mediaTurma;
    }).map(function(aluno) {
        return aluno.nome.value;
    });
}

const btn_verificarAluno = document.getElementById('verificarAluno');
const btn_verificarTurma = document.getElementById('verificarTurma');
let mediaTurma = 0;
let totalAlunos = 0;

btn_verificarAluno.addEventListener('click', function() {
    totalAlunos = alunos.length;
    let somaNotas = 0;
    let inputsInvalidas = [];
    
    for (const aluno of alunos) {
        const nomeAluno = aluno.nome.value.trim();
        const nota1 = parseFloat(aluno.notas[0].value);
        const nota2 = parseFloat(aluno.notas[1].value);
        const nota3 = parseFloat(aluno.notas[2].value);
        const nota4 = parseFloat(aluno.notas[3].value);
        
        aluno.nome.classList.remove('input-invalid');
        aluno.notas.forEach(notaInput => notaInput.classList.remove('input-invalid'));
        
        
        if (!nomeAluno) {
            window.alert("Digite um nome");
            aluno.nome.classList.add('input-invalid');
            inputsInvalidas.push(aluno.nome);
            return;
        } else if (!isNaN(nomeAluno)) {
            window.alert("Digite um nome válido");
            aluno.nome.classList.add('input-invalid');
            inputsInvalidas.push(aluno.nome);
            return;
        }
        
        const notas = [nota1, nota2, nota3, nota4];
        for (let i = 0; i < notas.length; i++) {
            if (isNaN(notas[i]) || notas[i] < 0 || notas[i] > 100) {
                window.alert("Digite uma nota válida");
                aluno.notas[i].classList.add('input-invalid');
                inputsInvalidas.push(aluno.notas[i]);
                return;
            } else if (notas[i] === 0) {
                window.alert("Digite um valor maior que 0");
                aluno.notas[i].classList.add('input-invalid');
                inputsInvalidas.push(aluno.notas[i]);
                return;
            }
        }
        
        somaNotas += nota1 + nota2 + nota3 + nota4;
    }
    
    // Remover classes de input inválida de todas as inputs
    inputsInvalidas.forEach(input => input.classList.remove('input-invalid'));
    
    mediaTurma = somaNotas / (totalAlunos * 4);
    
    console.log("Média da turma:", mediaTurma.toFixed(2));
    
    for (const aluno of alunos) {
        calcularMediaAluno(aluno);
    }
    verificarAlunosAbaixoDaMedia(mediaTurma);
    
    console.log("Alunos abaixo da média:", alunosAbaixoDaMedia);
    
});

btn_verificarTurma.addEventListener('click', function() {
    divResultado.classList.add('mostrar');

    if (verificarInputsAlunos()) {
        divResultado.classList.add('resultado');

        const fecharDivResultado = document.createElement('button');
        fecharDivResultado.textContent = 'X';
        fecharDivResultado.classList.add('fechar');
        divResultado.appendChild(fecharDivResultado);

        fecharDivResultado.addEventListener('click', function() {
        divResultado.style.display = 'none';
    });

        const tituloTurma = document.createElement('h1');
        tituloTurma.textContent = 'Informações da Turma';

        const pTotalAlunos = document.createElement('p');
        pTotalAlunos.textContent = `Número de alunos na sala: ${totalAlunos}`;

        const pMediaTurma = document.createElement('p');
        pMediaTurma.textContent = `Média geral da turma: ${mediaTurma.toFixed(2)}`;

        const pAlunosAbaixoMedia = document.createElement('p');
        pAlunosAbaixoMedia.textContent = `Alunos abaixo da média da turma: ${alunosAbaixoDaMedia.join(', ')}`;

        divResultado.innerHTML = '';

        divResultado.appendChild(fecharDivResultado);
        divResultado.appendChild(tituloTurma);
        divResultado.appendChild(pTotalAlunos);
        divResultado.appendChild(pMediaTurma);
        divResultado.appendChild(pAlunosAbaixoMedia);

        const ultimoAlunoAdicionado = document.querySelectorAll('.conteiner_infoAluno')[alunos.length - 1];

        ultimoAlunoAdicionado.insertAdjacentElement('afterend', divResultado);
        divResultado.style.display = 'block';
    } else {
        alert('Preencha todos os campos dos alunos corretamente antes de verificar a turma.');
    }
});

function verificarInputsAlunos() {
    for (const aluno of alunos) {
        const nomeAluno = aluno.nome.value.trim();
        const notas = aluno.notas.map(nota => parseFloat(nota.value));
        
        // Verifica se o nome do aluno está vazio ou se alguma nota não é um número válido
        if (!nomeAluno || notas.some(nota => isNaN(nota) || nota < 0 || nota > 100)) {
            return false;
        }
    }
    return true;
}

function calcularMediaAluno(aluno) {
    const nota1 = parseFloat(aluno.notas[0].value);
    const nota2 = parseFloat(aluno.notas[1].value);
    const nota3 = parseFloat(aluno.notas[2].value);
    const nota4 = parseFloat(aluno.notas[3].value);

    const mediaAluno = (nota1 + nota2 + nota3 + nota4) / 4;

    const situacaoInput = aluno.situacao;

    if (!isNaN(mediaAluno)) {
        if (mediaAluno >= 70) {
            situacaoInput.value = 'Aprovado';
            situacaoInput.classList.remove('situacao-recuperacao', 'situacao-reprovado');
            situacaoInput.classList.add('situacao-aprovado');

        } else if (mediaAluno >= 50 && mediaAluno < 70) {
            situacaoInput.value = 'Recuperação';
            situacaoInput.classList.remove('situacao-aprovado', 'situacao-reprovado');
            situacaoInput.classList.add('situacao-recuperacao');
            
        } else {
            situacaoInput.value = 'Reprovado';
            situacaoInput.classList.remove('situacao-aprovado', 'situacao-recuperacao');
            situacaoInput.classList.add('situacao-reprovado');
        }
    } else {
        situacaoInput.value = 'N/A';
    }

    aluno.media.value = mediaAluno.toFixed(2);
}
