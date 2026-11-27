const API_URL = '/api';

const loginSection = document.getElementById('loginSection');
const dashboardSection = document.getElementById('dashboardSection');
const btnLogout = document.getElementById('btnLogout');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const authFeedback = document.getElementById('authFeedback');
const dashFeedback = document.getElementById('dashFeedback');
const clienteSelect = document.getElementById('clienteSelect');
const osForm = document.getElementById('osForm');
const osLista = document.getElementById('osLista');
const filtroStatus = document.getElementById('filtroStatus');

function getToken() {
  return localStorage.getItem('techos_token');
}

function setToken(token) {
  if (token) {
    localStorage.setItem('techos_token', token);
  } else {
    localStorage.removeItem('techos_token');
  }
}

async function apiFetch(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.erro || 'Erro na requisição.');
  }
  return data;
}

function atualizarVisao() {
  const autenticado = Boolean(getToken());
  loginSection.classList.toggle('hidden', autenticado);
  dashboardSection.classList.toggle('hidden', !autenticado);
  btnLogout.classList.toggle('hidden', !autenticado);

  if (autenticado) {
    carregarClientes();
    carregarOrdens();
  }
}

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  authFeedback.textContent = 'Autenticando...';
  try {
    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
    });
    setToken(data.token);
    authFeedback.textContent = '';
    atualizarVisao();
  } catch (err) {
    authFeedback.textContent = err.message;
  }
});

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  authFeedback.textContent = 'Cadastrando...';
  try {
    const nome = document.getElementById('regNome').value;
    const email = document.getElementById('regEmail').value;
    const senha = document.getElementById('regSenha').value;
    await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ nome, email, senha }),
    });
    const login = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
    });
    setToken(login.token);
    authFeedback.textContent = '';
    atualizarVisao();
  } catch (err) {
    authFeedback.textContent = err.message;
  }
});

btnLogout.addEventListener('click', () => {
  setToken(null);
  atualizarVisao();
});

async function carregarClientes() {
  try {
    const clientes = await apiFetch('/clientes');
    clienteSelect.innerHTML = clientes
      .map((c) => `<option value="${c.id}">${c.nome}</option>`)
      .join('');
  } catch (err) {
    dashFeedback.textContent = err.message;
  }
}

async function carregarOrdens() {
  try {
    const status = filtroStatus.value;
    const ordens = await apiFetch(`/ordens?status=${encodeURIComponent(status)}`);
    if (!ordens.length) {
      osLista.innerHTML = '<p class="subtitle">Nenhuma ordem encontrada.</p>';
      return;
    }

    osLista.innerHTML = ordens
      .map(
        (os) => `
        <div class="os-item">
          <div class="os-item-top">
            <strong>#${os.id} — ${os.equipamento}</strong>
            <span class="badge">${os.status}</span>
          </div>
          <p class="subtitle">Cliente: ${os.cliente_nome} | Tipo: ${os.tipo} | Prioridade: ${os.prioridade}</p>
          <p>${os.defeito_relatado}</p>
          <div class="os-actions">
            <select onchange="alterarStatus(${os.id}, this.value)">
              <option value="">Alterar status...</option>
              <option value="Aberta">Aberta</option>
              <option value="Em Análise">Em Análise</option>
              <option value="Aguardando Peça">Aguardando Peça</option>
              <option value="Concluída">Concluída</option>
              <option value="Cancelada">Cancelada</option>
            </select>
            <button class="btn-danger" onclick="excluirOs(${os.id})">Excluir</button>
          </div>
        </div>
      `
      )
      .join('');
  } catch (err) {
    dashFeedback.textContent = err.message;
  }
}

osForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    await apiFetch('/ordens', {
      method: 'POST',
      body: JSON.stringify({
        cliente_id: Number(clienteSelect.value),
        equipamento: document.getElementById('equipamento').value,
        tipo: document.getElementById('tipoOs').value,
        defeito_relatado: document.getElementById('defeito').value,
      }),
    });
    osForm.reset();
    dashFeedback.textContent = 'Ordem de serviço criada com sucesso.';
    carregarOrdens();
  } catch (err) {
    dashFeedback.textContent = err.message;
  }
});

window.alterarStatus = async function alterarStatus(id, status) {
  if (!status) return;
  try {
    await apiFetch(`/ordens/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    dashFeedback.textContent = `Status da OS #${id} atualizado para "${status}".`;
    carregarOrdens();
  } catch (err) {
    dashFeedback.textContent = err.message;
  }
};

window.excluirOs = async function excluirOs(id) {
  try {
    await apiFetch(`/ordens/${id}`, { method: 'DELETE' });
    dashFeedback.textContent = `OS #${id} removida.`;
    carregarOrdens();
  } catch (err) {
    dashFeedback.textContent = err.message;
  }
};

filtroStatus.addEventListener('change', carregarOrdens);

atualizarVisao();