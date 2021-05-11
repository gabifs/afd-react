# Automatos finitos determinísticos em Typescript

## Autores
* Gabriel Fernandes Silva - 00261597
* Nikolas Tesche - 00263055
* Eduardo Braga Rhoden - 00305607

## Requisitos para a execução

1. NodeJS >= v14.0.0
2. Navegador moderno (Chrome, Mozilla, Edge,...)
3. Conexão com a internet, para download das dependências

## Instalação do projeto

> A instalação das dependências é realizada com `npm` (node package manager) uma CLI que vem por padrão com o nodeJS.

1. Abra o diretório do projeto no terminal de sua preferência (cmd, Windows Terminal, git bash, bash, zsh, powershell)
2. Instale as dependências do projeto:
   1. Execute `npm install`
   2. Terminada a instalação das dependências, verifique se não houveram erro ou warnings a serem resolvidos. Em alguns casos é necessário a execução de `npm audit fix`, para correção das dependências para o seu sistema operacional.

## Execução do projeto

Com o terminal aberto no diretório do projeto:

1. Execute `npm start`, esse comando executará um script, escrito no `package.json`, para inicialização do projeto.
2. Ao final da execução, será informado que projeto está executando em `http://localhost:3000`, se o NodeJS não abrir essa página automáticamente, você deverá abri-la no navegador de sua preferência.

## Utilização do projeto

O projeto é dividido em 3 seções:
1. Editor - Nele é possível carregar um arquivo ou digitar uma definição de AFD, seguindo o formato especificado. E criar o AFD definido.
   ```txt
   AUTÔMATO=({q0,q1,q2,q3},{a,b},Prog,q0,{q1,q3})
   Prog
   (q0,a)=q1
   (q0,b)=q2
   (q1,b)=q2
   (q2,a)=q3
   (q2,b)=q2
   (q3,a)=q3
   (q3,b)=q2
   ```
2. Lista de palavras - Nessa seção é possível inserir palavras a serem testadas no AFD criado, a seção só fica disponível após a criação do AFD.
3. Lista de Duplas de palavras - Nesta seção é possível, carregar um arquivo com uma lista de duplas de palavras, a serem filtradas pelo AFD. Desde que o documento esteja do formato adequado.
   ```txt
   (abababa,ababa)
   (abababa,aba)
   (ababa,ababa)
   (ababa,abab)
   (ababa,abababa)
   (ab,abababa)
   (a,ababab)
   ```

> Esperamos que você tenha uma boa experiência!
