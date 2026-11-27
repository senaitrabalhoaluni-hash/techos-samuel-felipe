# Dossiê de Concepção e Engenharia de Requisitos — Sistema TechOS

**Estudante:** Samuel Felipe  
**Instituição:** SENAI PE — Unidade Belo Jardim  
**Curso:** Técnico em Desenvolvimento de Sistemas  
**Docente:** Ryan Oliveira  

---

## 1. Visão Geral e Arquitetura
O **TechOS** é um sistema web de Gestão de Ordens de Serviço (OS) desenvolvido para a **TechServices**, permitindo o controle completo de chamados técnicos desde a abertura até o encerramento.

### Arquitetura em 3 Camadas (Cliente-Servidor)
1. **Camada de Apresentação (Frontend):** Desenvolvida em HTML5, CSS3 e JavaScript (Vanilla), responsável pela interface responsiva e consumo da API via `fetch`.
2. **Camada de Aplicação (Backend):** API RESTful desenvolvida em Node.js com Express, aplicando arquitetura MVC, Programação Orientada a Objetos (POO), padrões de projeto (Singleton e Factory Method) e autenticação JWT.
3. **Camada de Dados (Banco de Dados):** Banco relacional MySQL (`techos_db`) responsável pela persistência íntegra de usuários, clientes e ordens de serviço.

---

## 2. Requisitos Funcionais (RFs)
* **RF01 — Autenticação de Usuários:** O sistema deve permitir que técnicos e atendentes realizem login com e-mail e senha.
* **RF02 — Cadastro e Consulta de Clientes:** O sistema deve permitir cadastrar novos clientes (nome, documento, telefone, e-mail) e listar os clientes cadastrados.
* **RF03 — Abertura de Ordem de Serviço:** O sistema deve permitir abrir uma OS vinculada a um cliente, informando equipamento, descrição do defeito e tipo de atendimento (`preventiva`, `corretiva` ou `urgente`).
* **RF04 — Atualização de Status e Diagnóstico:** O sistema deve permitir atualizar o status da OS (`Aberta`, `Em Análise`, `Aguardando Peça`, `Concluída`, `Cancelada`) e registrar o parecer técnico.
* **RF05 — Listagem e Filtro de Ordens:** O sistema deve listar todas as ordens de serviço e permitir filtrá-las por status.
* **RF06 — Exclusão/Cancelamento de OS:** O sistema deve permitir remover registros de ordens de serviço quando necessário.

---

## 3. Requisitos Não-Funcionais (RNFs — Norma ISO/IEC 25010)
* **RNF01 — Segurança:** As senhas dos usuários devem ser armazenadas com hash criptográfico (`bcryptjs`) e as rotas protegidas devem exigir token JWT válido no cabeçalho `Authorization`.
* **RNF02 — Desempenho:** O tempo médio de resposta das requisições da API REST deve ser inferior a 500 ms em ambiente local.
* **RNF03 — Usabilidade:** A interface web deve ser responsiva, adaptando-se a telas de desktop e dispositivos móveis com feedback visual claro das ações.
* **RNF04 — Manutenibilidade:** O código-fonte deve seguir o padrão arquitetural MVC, encapsulamento em classes, Design Patterns (Singleton e Factory Method) e versionamento semântico com Conventional Commits.
* **RNF05 — Confiabilidade:** O banco de dados deve garantir integridade referencial por meio de chaves primárias e estrangeiras (`FOREIGN KEY`).

---

## 4. User Stories (INVEST + Critérios BDD) e Estimativas

### US01 — Login no Sistema (Estimativa: 3 pontos)
* **História:** Como técnico ou atendente, quero fazer login com meu e-mail e senha, para acessar o painel de ordens de serviço com segurança.
* **Critério de Aceitação (BDD):**
  * **Dado que** estou na tela de login e possuo um cadastro ativo,
  * **Quando** informo e-mail e senha válidos e clico em "Entrar",
  * **Então** o sistema gera um token JWT e me redireciona para o dashboard principal.

### US02 — Abertura de Ordem de Serviço (Estimativa: 5 pontos)
* **História:** Como atendente, quero registrar uma nova ordem de serviço informando o cliente, equipamento, defeito e tipo de atendimento, para iniciar o fluxo de manutenção.
* **Critério de Aceitação (BDD):**
  * **Dado que** estou autenticado no dashboard,
  * **Quando** preencho o formulário de nova OS e confirmo o envio,
  * **Então** o sistema instancia a OS com o status inicial "Aberta" e a exibe na listagem.

### US03 — Atualização de Status da OS (Estimativa: 3 pontos)
* **História:** Como técnico, quero alterar o status de uma OS e registrar a solução aplicada, para manter o histórico técnico atualizado.
* **Critério de Aceitação (BDD):**
  * **Dado que** visualizo uma OS cadastrada no painel,
  * **Quando** seleciono um novo status (ex.: "Concluída") e salvo,
  * **Então** o banco de dados atualiza o registro e os indicadores do dashboard são recalculados.

### US04 — Filtro de Ordens por Status (Estimativa: 2 pontos)
* **História:** Como técnico, quero filtrar as ordens de serviço por status, para priorizar os atendimentos pendentes.
* **Critério de Aceitação (BDD):**
  * **Dado que** existem ordens com diferentes status cadastradas,
  * **Quando** seleciono um status no filtro do painel,
  * **Então** a tabela exibe apenas as ordens correspondentes ao filtro escolhido.
