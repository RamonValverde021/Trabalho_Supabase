/*-- LISTANDO TODOS OS ITENS DA TABELA --*/

async function fetchTabelaTeste() {
    const { data, error } = await supabase         // "await" A chamada é assíncrona. O código “pausa” aqui até receber resposta do Supabase.
        .from('tabela_teste')                      // Indica a tabela do banco que vamos consultar.
        .select('*')                               // Especifica que queremos todas as colunas ou especifique colunas: 'id, nome, criado_em'
        .order('criado_em', { ascending: false }); // Ordena os resultados pela coluna criado_em em ordem decrescente (false). Se não quiser ordenar, basta remover este método.

    // Tratamento de erros
    if (error) {
        console.error('Erro ao buscar tabela_teste:', error.message);
        document.getElementById('product-list').innerHTML =
            `<li style="color:red">Erro: ${error.message}</li>`;
        return;
    }

    // Verificação de dados vazios
    if (!data || data.length === 0) {
        document.getElementById('product-list').innerHTML =
            '<li>Nenhum registro encontrado.</li>';
        return;
    }

    // Preparação da lista
    const ul = document.getElementById('product-list');
    ul.innerHTML = "";                                                              // Limpa todo conteúdo anterior (se houver), garantindo que a lista não seja duplicada em múltiplas chamadas.

    // Renderização dos registros
    data.forEach(row => {                                                           // Itera sobre cada objeto (registro) do array data.
        const li = document.createElement('li');                                    // Cria um novo elemento <li> para cada registro.
        li.textContent = `ID: ${row.id} – Nome: ${row.nome} – Preço: ${row.preco}`; // Define o texto exibido no <li>. Aqui usamos template string para interpolar row.id e row.nome.
        ul.appendChild(li);                                                         // Adiciona o <li> recém-criado como filho da <ul>.
    })
}

// Disparo no carregamento da página
window.addEventListener('DOMContentLoaded', fetchTabelaTeste); //

/*
    Desestruturação { data, error }
    O Supabase retorna um objeto com duas propriedades principais:
    data: um array com os registros retornados.
    error: objeto de erro (ou null se tudo der certo).


    window.addEventListener('DOMContentLoaded', …)
    Aguarda até que o HTML seja completamente carregado e parseado (mas antes de imagens e estilos externos).
    Então chama a função fetchTabelaTeste, iniciando todo o fluxo de busca e renderização.
*/


/*-- INCREMENTANDO TABELA --*/

// Seleciona elementos do DOM
const form = document.getElementById('form-adicionar');
const feedback = document.getElementById('feedback');

// Captura do evento submit
form.addEventListener('submit', async (e) => {                     // Adiciona listener de submit
    e.preventDefault();                                            //  impede o comportamento padrão (recarregar a página).

    // Leitura dos valores - Extrai valores dos campos
    const nome = document.getElementById('nome').value.trim();     // .trim(): remove espaços extras.
    const preco = document.getElementById('preco').value;

    // Inserção com Supabase - Chama o Supabase para inserir
    const { data, error } = await supabase
        .from('tabela_teste')
        .insert([                                                  // recebe um array de objetos. Cada objeto é uma linha a ser inserida.
            { nome, preco }                                        // adicione outros campos: { nome, outro }
        ]);

    // Tratamento de erro
    if (error) {
        console.error('Erro ao inserir:', error);
        feedback.textContent = `Erro: ${error.message}`;
        feedback.style.color = 'red';
        return;
    } else {
        feedback.textContent = 'Adicionado!';
        form.reset();
        fetchTabelaTeste();  // atualiza a listagem
    }

    // Feedback de sucesso
    feedback.textContent = 'Registro adicionado com sucesso! 🎉';
    feedback.style.color = 'green';
    form.reset();                     // limpa os campos
});


/*-- MODIFICANDO ITEM DA TABELA --*/

  const formEditar = document.getElementById('form-editar');
  const feedbackEditar = document.getElementById('feedback-editar');

  formEditar.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. Extrai ID, novo nome e novo preço
    const id = document.getElementById('id-editar').value.trim();
    const novoNome = document.getElementById('nome-editar').value.trim();
    const novoPreco = document.getElementById('preco-editar').value;

    // Chamada de update - Chama o Supabase para atualizar
    const { data, error } = await supabase
      .from('tabela_teste')
      .update({ nome: novoNome, preco: novoPreco })   // objeto com os campos e novos valores - campos a serem alterados
      .eq('id', id);                                  // adiciona WHERE id = '...' à query - WHERE id = '...'

    // Tratamento de erro
    if (error) {
      console.error('Erro ao atualizar:', error);
      feedbackEditar.textContent = `Erro: ${error.message}`;
      feedbackEditar.style.color = 'red';
      return;
    }

    // Feedback de sucesso
    feedbackEditar.textContent = 'Registro atualizado com sucesso! 🎉';
    feedbackEditar.style.color = 'green';
    formEditar.reset();

    // Atualizar a listagem
    fetchTabelaTeste(); // Função no começo da pagina aonde lista os itens da tabela
  });


 /*-- EXCLUINDO DADOS DA TABELA --*/

  // 2. Seleciona elementos
  const formExcluir = document.getElementById('form-excluir');
  const feedbackExcluir = document.getElementById('feedback-excluir');

  // 3. Listener de submit
  formExcluir.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 4. Pega o ID
    const id = document.getElementById('id-excluir').value.trim();

    // 5. Chama o Supabase para deletar
    const { data, error } = await supabase
      .from('tabela_teste')
      .delete()           // operação DELETE
      .eq('id', id);       // WHERE id = '...'

    // 6. Trata erro
    if (error) {
      console.error('Erro ao excluir:', error);
      feedbackExcluir.textContent = `Erro: ${error.message}`;
      feedbackExcluir.style.color = 'red';
      return;
    }

    // 7. Sucesso
    feedbackExcluir.textContent = 'Registro excluído com sucesso! 🗑️';
    feedbackExcluir.style.color = 'green';
    formExcluir.reset();

    // 8. (Opcional) Atualiza a lista
    fetchTabelaTeste();
  });
