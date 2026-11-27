const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const OrdemServicoFactory = require('../src/factories/OrdemServicoFactory');

describe('OrdemServicoFactory (Factory Method)', () => {
  it('deve criar uma OS urgente com prioridade alta e status Em Análise', () => {
    const os = OrdemServicoFactory.criar('urgente', {
      clienteId: 1,
      equipamento: 'Switch Core',
      defeitoRelatado: 'Falha crítica na porta uplink',
    }).toJSON();

    assert.equal(os.tipo, 'urgente');
    assert.equal(os.prioridade, 'alta');
    assert.equal(os.status, 'Em Análise');
  });

  it('deve criar uma OS preventiva com prioridade baixa e status Aberta', () => {
    const os = OrdemServicoFactory.criar('preventiva', {
      clienteId: 2,
      equipamento: 'Impressora Térmica',
      defeitoRelatado: 'Limpeza de cabeça de impressão',
    }).toJSON();

    assert.equal(os.tipo, 'preventiva');
    assert.equal(os.prioridade, 'baixa');
    assert.equal(os.status, 'Aberta');
  });
});