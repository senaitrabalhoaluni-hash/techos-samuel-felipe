# techos-samuel-felipe/Sistema TechOS — Gestão de Ordens de Serviço

Projeto desenvolvido de forma individual na Unidade Curricular de **Desenvolvimento de Sistemas** (200h / 40 Encontros).

* **Estudante:** Samuel Felipe
* **Instituição:** SENAI PE — Unidade Belo Jardim
* **Curso:** Técnico em Desenvolvimento de Sistemas
* **Docente:** Ryan Oliveira

## Arquitetura e Padrões Aplicados
* **Arquitetura:** Cliente-Servidor em 3 camadas (Frontend HTML/CSS/JS, API REST em Node.js/Express e Banco Relacional MySQL).
* **Padrões e POO:** Encapsulamento em `OrdemServico`, **Singleton** em `src/config/Database.js` e **Factory Method** em `src/factories/OrdemServicoFactory.js`.
* **Autenticação e Documentação:** JWT (`jsonwebtoken` + `bcryptjs`) e documentação interativa em `/api-docs` (Swagger).

## Como Executar Localmente
1. Instale as dependências:
   ```bash
   npm install