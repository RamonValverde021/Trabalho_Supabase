const tabelaTopicos = document.querySelector('#topicos_tabela tbody');          // da tabela de tópicos — onde vamos injetar as linhas.
const botaoPerguntar = document.getElementById('botao_perguntar');              // da tabela de tópicos — onde vamos injetar as linhas.zzz
const formularioPerguntar = document.getElementById('formulario_perguntar');   // formulário de nova pergunta — inicialmente oculto.
const botaoCancelar = document.getElementById('botao_cancelar');                // botão “Cancelar” dentro do form, para fechá‑lo.

// 2) Função para carregar tópicos + contagem de respostas
async function loadTopics(filtro) {
  const { data: perguntas, error } = await supabase
    .from('perguntas_com_respostas')                              // acessa a view no banco.
    .select('*')                                                  // seleciona todas as colunas disponíveis na view (id_perguntas, titulo, criado_em, total_respostas).
    .order('criado_em', { ascending: false });                    // ordena os resultados do mais recente para o mais antigo (descendente).
  /*
    O resultado vem como um objeto com dois campos:
    data → os dados da consulta (renomeado aqui para perguntas)
    error → erro, se houver algum
  */

  // Se houver algum erro na consulta, mostra no console e interrompe a função.
  // Isso evita que o restante do código tente renderizar dados inexistentes (undefined).
  if (error) {
    console.error(error);
    return;
  }

   // Se o filtro for por curtidas, ordena localmente o array
   if (filtro == "curtidas") {
    perguntas.sort((a, b) => b.curtidas - a.curtidas);
  }

  // Inicia um laço (for...of) que percorre cada pergunta recebida do Supabase.
  for (const p of perguntas) {                                 // Cada item p representa uma pergunta individual, com seus campos vindos da view.
    if (filtro == "recentes") {
      // Exibir pelo botão de Topicos 
      const tr = document.createElement('tr');
      tr.innerHTML = `
          <td class="td_pergunta"><a class="a_pergunta" href="pergunta.html?id=${p.id_perguntas}">${p.titulo}</a><br>
          <label class="categoria_label">🔹 Categoria: </label><span class="categoria_span" >${p.categoria}</span><br>
          <label class="categoria_label">➡︎ Por: </label><span class="categoria_span" >${p.nome_autor.toLowerCase()}</span><br></td>
          <td class="td_resposta">${p.total_respostas}</td>
          <td class="td_curtidas">${p.curtidas}</td>
          <td class="td_atividade">${formatarTempoDecorrido(p.criado_em)}</td>
        `; // Define o conteúdo dessa linha:
      tabelaTopicos.appendChild(tr); // Por fim, adiciona essa nova linha à tabela na tela (tabelaTopicos, que deve ser o <tbody> da tabela de tópicos).
    } else if (filtro == "categorias") {
      // cria um array de objetos. Cada objeto representa uma categoria de filtro com duas informações:
      // o id do checkbox no HTML (pra saber se ele está marcado).
      // o nome da categoria que aparece nos dados (p.categoria).
      const categorias = [
        { id: 'categoria_orientacao', nome: 'Orientações Gerais' },
        { id: 'categoria_configuracao', nome: 'Configuração' },
        { id: 'categoria_instalacao', nome: 'Instalação' },
        { id: 'categoria_funcionalidade', nome: 'Funcionalidade' },
        { id: 'categoria_compatibilidade', nome: 'Compatibilidade' },
        { id: 'categoria_problemas', nome: 'Problemas' },
        { id: 'categoria_erro', nome: 'Erro' },
        { id: 'categoria_sugestoes', nome: 'Sugestões' },
        { id: 'categoria_duvidas', nome: 'Duvidas' },
        { id: 'categoria_dicas', nome: 'Dicas' },
        { id: 'categoria_outros', nome: 'Outros' }
      ];

      // Percorre cada item do array categorias. Para cada um, a variável c vai conter um objeto com { id, nome }.
      categorias.forEach(c => {
        // Verifica se o checkbox correspondente (document.getElementById(c.id)) está marcado (checked).
        // Se estiver, verifica se a categoria da pergunta (p.categoria) é igual ao nome do checkbox (c.nome).
        if (document.getElementById(c.id).checked && p.categoria === c.nome) {
          // Se ambos os critérios forem verdadeiros, cria uma nova linha (tr) na tabela de tópicos.
          const tr = document.createElement('tr');
          tr.innerHTML = `
              <td class="td_pergunta">
                <a class="a_pergunta" href="pergunta.html?id=${p.id_perguntas}">${p.titulo}</a><br>
                <label class="categoria_label">🔹 Categoria: </label>
                <span class="categoria_span">${p.categoria}</span><br><br>
              </td>
              <td class="td_resposta">${p.total_respostas}</td>
              <td class="td_curtidas">${p.curtidas}</td>
              <td class="td_atividade">${formatarTempoDecorrido(p.criado_em)}</td>
            `;
          tabelaTopicos.appendChild(tr);
        }
      });
    } else if (filtro == "curtidas") {
      supabase
        .from('perguntas_com_respostas')
        .select('*')
        .order('curtidas', { ascending: false });
      const tr = document.createElement('tr');
      tr.innerHTML = `
          <td class="td_pergunta"><a class="a_pergunta" href="pergunta.html?id=${p.id_perguntas}">${p.titulo}</a><br>
          <label class="categoria_label">🔹 Categoria: </label><span class="categoria_span" >${p.categoria}</span><br><br></td>
          <td class="td_resposta">${p.total_respostas}</td>
          <td class="td_curtidas">${p.curtidas}</td>
          <td class="td_atividade">${formatarTempoDecorrido(p.criado_em)}</td>
        `;
      tabelaTopicos.appendChild(tr);

    }
  }
}

// 3) Verifica autenticação para exibir botão “Faça uma pergunta”
supabase.auth.onAuthStateChange((event, session) => {          // registra um callback que é chamado sempre que o usuário faz login ou logout.
  if (session && session.user) {                               // Se existir session.user, mostramos o botão de perguntar. Caso contrário, ocultamos o botão e também o formulário (caso estivesse aberto).
    botaoPerguntar.style.display = 'block';
  } else {
    botaoPerguntar.style.display = 'none';
    formularioPerguntar.style.display = 'none';
  }
});

// 4) Exibe formulário ao clicar no botão
botaoPerguntar.addEventListener('click', () => {                // Exibe o <form> (formularioPerguntar) e esconde o botão para evitar múltiplos cliques.
  formularioPerguntar.style.display = 'block';
  botaoPerguntar.style.display = 'none';
});

// 4.1) Fecha o formulário ao clicar no botão “Cancelar”
botaoCancelar.addEventListener('click', () => {                 // Fecha o form e volta a exibir o botão.
  document.getElementById('titulo_pergunta').value = '';        // Limpa o campo de título.
  document.getElementById('conteudo_pergunta').value = '';      // Limpa o campo de conteúdo.
  //formularioPerguntar.style.display = 'none';
  botaoPerguntar.style.display = 'block';
});

// 5) Envia o formulário
formularioPerguntar.addEventListener('submit', async (e) => {
  e.preventDefault();                                          // evita que o navegador faça reload.
  const formData = new FormData(formularioPerguntar);          // facilita leitura de todos os campos do form.
  const titulo = formData.get('titulo');
  const conteudo = formData.get('conteudo');
  const categoria = document.getElementById('categoria_pergunta').value; // Obtém o valor da categoria selecionada no formulário.
  const arquivo = formData.getAll('arquivo');

  const { data: { user } } = await supabase.auth.getUser();    // Verifica se o usuário está logado
  if (!user) {
    alert('Faça login para postar.');
    return;
  }

  let media_url = null;
  let media_tipo = null;

  // 5.1) Faz upload dos arquivos para o Storage
  // Se houver arquivo, faz upload do primeiro
  if (arquivo.length > 0 && arquivo[0].size > 0) {
    const file = arquivo[0];
    const path = `perguntas/${crypto.randomUUID()}_${file.name}`;

    const { error: upErr } = await supabase
      .storage
      .from('uploads')
      .upload(path, file);

    if (upErr) {
      console.error('Erro no upload:', upErr);
    } else {
      const { data: urlData } = supabase
        .storage
        .from('uploads')
        .getPublicUrl(path);

      media_url = urlData.publicUrl;
      media_tipo = file.type;
    }
  } else {
    console.log('Nenhum arquivo enviado.');
  }

  // 5.2) Cria a pergunta
  const { data: pergunta, error: qErr } = await supabase
    .from('perguntas')
    .insert({                  // insere um novo registro em questions.
      titulo,
      conteudo,
      id_autor: user.id,       // Passa author_id como o id do usuário logado.
      media_url,
      media_tipo,
      categoria
    })
    .select('id_perguntas')    // pede de volta apenas o id da nova pergunta, para usarmos nos uploads.
    .single();

  if (qErr) {
    console.error(qErr);
    return;
  }

  // 5.3) Limpa e recarrega
  formularioPerguntar.reset();                  // limpa todos os campos do formulário.     
  formularioPerguntar.style.display = 'none';   // Oculta novamente o form.
  tabelaTopicos.innerHTML = " ";                // Limpa a tabela de tópicos (tabelaTopicos) para evitar duplicação de perguntas.
  loadTopics("recentes");                                 // Chama loadTopics() para atualizar a lista de perguntas na tela, já incluindo a nova.

  window.location.href = `pergunta.html?id=${pergunta.id_perguntas}`; // Redireciona para a página da pergunta recém-criada, usando o id retornado na inserção.
});

// 6) Carrega tudo ao abrir a página
window.addEventListener('DOMContentLoaded', loadTopics("recentes"));
// Quando o DOM estiver pronto, executa loadTopics() para popular a tabela de tópicos mesmo antes de qualquer interação.



/* ----------------------------------------------- Demais funções da pagina ----------------------------------------------- */

// Formatação do tempo decorrido desde que a pergunta foi criada
function formatarTempoDecorrido(dataCriadoEm) {
  const agora = new Date();
  const criado = new Date(dataCriadoEm);
  const diffMs = agora - criado;

  const diffHoras = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutos = Math.floor((diffMs / (1000 * 60)) % 60);
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDias < 1) { // Se for menos de 1 dia, mostra horas e minutos
    if (diffHoras < 1) {
      if (diffMinutos < 1) {
        return 'Agora Mesmo!';
      } else {
        return `${diffMinutos} m`;
      }
    } else {
      return `${diffHoras} h`;
    }
  } else {
    return `${diffDias} d`;
  }
}

// Funções para exibir e esconder o painel de criar pergunta
function togglePerguntar() {
  const painel = document.getElementById('painel_formulario');
  painel.classList.toggle('ativo_painel');
}

// Funções para exibir e esconder o menu de categorias
function toggleDropdownCategorias() {
  const submenu = document.getElementById('submenu_categorias');
  submenu.classList.toggle('ativo_categorias');
}

// Função para exibir todos os topicos no painel
document.getElementById('nav_botao_recentes').addEventListener('click', () => {                 // Fecha o form e volta a exibir o botão.
  // Fecha o menu de categorias, se estiver aberto.
  if (document.getElementById('submenu_categorias').classList.contains('ativo_categorias')) {
    toggleDropdownCategorias();
  }
  // Limpa os checkboxes de categorias
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.checked = false;
  });
  formularioPerguntar.reset();
  formularioPerguntar.style.display = 'none';
  tabelaTopicos.innerHTML = " ";
  loadTopics("recentes");
});

// Função para exibir os topicos filtrados por categorias
document.getElementById('nav_botao_filtrar').addEventListener('click', () => {
  toggleDropdownCategorias();
  formularioPerguntar.reset();
  formularioPerguntar.style.display = 'none';
  tabelaTopicos.innerHTML = " ";
  loadTopics("categorias");
});

// Função para exibir os topicos filtrados por mais curtidas
document.getElementById('nav_botao_curtidas').addEventListener('click', () => {
  formularioPerguntar.reset();
  formularioPerguntar.style.display = 'none';
  tabelaTopicos.innerHTML = " ";
  loadTopics("curtidas");
});