CREATE DATABASE IF NOT EXISTS techos_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE techos_db;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    cargo ENUM('tecnico', 'atendente', 'admin') DEFAULT 'tecnico',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    documento VARCHAR(20) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    email VARCHAR(120),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ordens_servico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    tecnico_id INT NULL,
    equipamento VARCHAR(120) NOT NULL,
    defeito_relatado TEXT NOT NULL,
    solucao_tecnica TEXT NULL,
    tipo ENUM('preventiva', 'corretiva', 'urgente') NOT NULL DEFAULT 'corretiva',
    prioridade ENUM('baixa', 'media', 'alta') NOT NULL DEFAULT 'media',
    status ENUM('Aberta', 'Em Análise', 'Aguardando Peça', 'Concluída', 'Cancelada') NOT NULL DEFAULT 'Aberta',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_os_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE RESTRICT,
    CONSTRAINT fk_os_tecnico FOREIGN KEY (tecnico_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

INSERT INTO clientes (nome, documento, telefone, email) VALUES
('Escola Técnica Belo Jardim', '12.345.678/0001-90', '(81) 99999-1111', 'ti@escolabj.edu.br'),
('Comércio Central Ltda', '98.765.432/0001-10', '(81) 98888-2222', 'contato@comerciocentral.com');

INSERT INTO ordens_servico (cliente_id, equipamento, defeito_relatado, tipo, prioridade, status) VALUES
(1, 'Servidor Dell PowerEdge', 'Superaquecimento e limpeza interna programada', 'preventiva', 'baixa', 'Aberta'),
(2, 'Terminal PDV Caixa 02', 'Não liga após queda de energia', 'urgente', 'alta', 'Em Análise');