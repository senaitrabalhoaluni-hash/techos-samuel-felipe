const OrdemServico = require('../models/OrdemServico');

class OrdemServicoFactory {
  static criar(tipo = 'corretiva', dados = {}) {
    const tipoNormalizado = String(tipo).toLowerCase();

    const configuracoes = {
      preventiva: {
        tipo: 'preventiva',
        prioridade: dados.prioridade || 'baixa',
        status: dados.status || 'Aberta',
      },
      corretiva: {
        tipo: 'corretiva',
        prioridade: dados.prioridade || 'media',
        status: dados.status || 'Aberta',
      },
      urgente: {
        tipo: 'urgente',
        prioridade: 'alta',
        status: dados.status || 'Em Análise',
      },
    };

    const config = configuracoes[tipoNormalizado] || configuracoes.corretiva;

    return new OrdemServico({
      ...dados,
      tipo: config.tipo,
      prioridade: config.prioridade,
      status: config.status,
    });
  }
}

module.exports = OrdemServicoFactory;