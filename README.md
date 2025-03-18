# TODO App

Este é um projeto simples de lista de tarefas (TODO list) desenvolvido em React, utilizando as bibliotecas `json-server` e `react-icons`. O objetivo deste projeto é fornecer uma interface amigável para gerenciar tarefas, permitindo adicionar, marcar como concluídas e remover tarefas.

## Funcionalidades

- **Adicionar Tarefas**: Permite ao usuário adicionar novas tarefas com um título e uma estimativa de tempo.
- **Marcar Tarefas como Concluídas**: Permite ao usuário marcar tarefas como concluídas, alterando seu estado visual.
- **Remover Tarefas**: Permite ao usuário remover tarefas da lista.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **json-server**: Biblioteca para criação de uma API REST fake, utilizada para simular operações de backend.
- **react-icons**: Biblioteca para inclusão de ícones em projetos React.

## Estrutura do Projeto

- **Frontend**: Desenvolvido em React, com componentes funcionais e hooks para gerenciar o estado da aplicação.
- **Backend Fake**: Utiliza `json-server` para simular uma API REST, permitindo operações de CRUD (Create, Read, Update, Delete) nas tarefas.

## Como Funciona

1. **Adicionar Tarefa**: O usuário preenche o formulário com o título e o tempo estimado da tarefa e clica em "Enviar". A tarefa é adicionada à lista e armazenada no backend fake.
2. **Marcar como Concluída**: O usuário clica no ícone de marcação ao lado da tarefa para alternar seu estado entre concluída e não concluída.
3. **Remover Tarefa**: O usuário clica no ícone de lixeira ao lado da tarefa para removê-la da lista.

Este projeto foi desenvolvido para aprendizado pessoal, explorando conceitos de React e integração com APIs REST fake.