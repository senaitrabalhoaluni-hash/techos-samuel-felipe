class OrdemServico {
  constructor(dados = {}) {
    this.id = dados.id ?? null;
    this.titulo = dados.titulo ?? '';
    this.descricao = dados.descricao ?? '';
    this.tipo = dados.tipo ?? 'corretiva';
    this.prioridade = dados.prioridade ?? 'media';
    this.status = dados.status ?? 'Aberta';
    this.tecnico_id = dados.tecnico_id ?? null;
    this.criado_em = dados.criado_em ?? new Date();
  }

  atualizarStatus(novoStatus) {
    this.status = novoStatus;
    return this.status;
  }

  atualizarPrioridade(novaPrioridade) {
    this.prioridade = novaPrioridade;
    return this.prioridade;
  }

  toJSON() {
    return {
      id: this.id,
      titulo: this.titulo,
      descricao: this.descricao,
      tipo: this.tipo,
      prioridade: this.prioridade,
      status: this.status,
      tecnico_id: this.tecnico_id,
      criado_em: this.criado_em,
    };
  }
}

module.exports = OrdemServico;