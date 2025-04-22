/* View criada em SQL para construir a exibição de numero de respostas de cada pergunta registrada */

create view perguntas_com_respostas as                      # Cria uma view chamada perguntas_com_respostas
select                                                      # Inicia a consulta. Aqui vamos selecionar os campos que queremos visualizar na view. 
                                                            # Uma view é como uma “tabela virtual” baseada numa consulta (SELECT). 
  p.id_perguntas,                                           # É o identificador único de cada pergunta.

  p.titulo,                                                 # Pegamos o titulo da pergunta (texto da pergunta).
  p.criado_em,                                              # Pegamos a data de criação da pergunta — usada pra ordenar depois.
  count(r.id_respostas) as total_respostas                  # A função count() conta quantas respostas existem para cada pergunta. 
                                                            # r.id_respostas vem da tabela respostas (apelidada de r). 
                                                            # O resultado é renomeado com as total_respostas. 
                                                            # Se a pergunta não tiver resposta, o resultado será 0 — por isso usamos LEFT JOIN

from perguntas p                                            # Dizemos que a tabela base é perguntas, e damos o apelido p pra ela (pra escrever menos).
left join respostas r on p.id_perguntas = r.id_perguntas    # Aqui é onde conectamos as duas tabelas:
                                                            # Usamos LEFT JOIN pra garantir que todas as perguntas apareçam, mesmo que não tenham respostas.
                                                            # A condição on p.id_perguntas = r.id_perguntas faz o relacionamento entre as tabelas pela chave estrangeira.

group by p.id_perguntas, p.titulo, p.criado_em              #  Como usamos count(), precisamos agrupar os resultados:
                                                            # Agrupamos por cada pergunta (usando seu ID).
                                                            # Também precisamos incluir titulo e criado_em no group by porque estão no SELECT.
                                                            # É como dizer: “Quero contar as respostas para cada pergunta única”.
order by p.criado_em desc;                                  # Por fim, ordenamos os resultados pela data de criação da pergunta (criado_em) em ordem decrescente (desc).
                                                            # Isso significa que as perguntas mais recentes aparecem primeiro.

-------------------------------------------

drop view if exists perguntas_com_respostas;         # Isso deleta a view antiga e limpa o caminho pra recriar sem erro.

--Atualização 1 de View --
create view perguntas_com_respostas as
select 
p.id_perguntas,
p.titulo,
p.criado_em,
p.categoria,
p.curtidas,
count(r.id_respostas) as total_respostas
from perguntas p 
left join respostas r on p.id_perguntas = r.id_perguntas
group by p.id_perguntas, p.titulo, p.criado_em, p.categoria, p.curtidas
order by p.criado_em desc; 


--Atualização 2 de View --
# Isso cria uma view, que é como uma tabela "virtual" baseada em uma consulta SQL.

create view perguntas_com_respostas as
select                                                                                           # Aqui é onde definimos o que vai ser exibido nessa view:
  p.*,                                                                                           # Puxa todas as colunas da tabela perguntas.
  u.raw_user_meta_data ->> 'nome' as nome_autor,                                                 # Esse é o truque pra pegar o nome do autor direto do Supabase Auth!
  (select count(*) from respostas r where r.id_perguntas = p.id_perguntas) as total_respostas    # Isso aqui é uma subquery (uma mini-consulta dentro da principal)
from perguntas p                                                                                 # Dizemos que a consulta está sendo feita a partir da tabela perguntas, e chamamos ela de p.
join auth.users u on u.id = p.id_autor;                                                          # Aqui é onde ligamos (join) a tabela de perguntas com a tabela de usuários do Supabase Auth:


/*
p.*
    Puxa todas as colunas da tabela perguntas.
        p é um apelido (alias) que demos pra tabela perguntas, logo abaixo no from perguntas p.
        Isso inclui coisas como id_perguntas, titulo, texto, id_autor, criado_em, etc.

u.raw_user_meta_data ->> 'nome' as nome_autor
    Esse é o truque pra pegar o nome do autor direto do Supabase Auth!
    Explicando:
        u é o alias da tabela auth.users (vem do join auth.users u).
        raw_user_meta_data é a coluna onde ficam os dados extras que você salvou quando o usuário se registrou.
        ->> é o operador do PostgreSQL para extrair um valor de um JSON como texto.
            Se fosse só ->, ele retornaria um JSON bruto.
        'nome' é a chave dentro do JSON que você salvou, ou seja, "nome": "RAMON AGUIAR VALVERDE".
        as nome_autor dá um nome bonito pra essa coluna na view. Agora você pode acessar esse campo com p.nome_autor no front.

(select count(*) from respostas r where r.id_perguntas = p.id_perguntas) as total_respostas
    Isso aqui é uma subquery (uma mini-consulta dentro da principal), que:
        Conta (count(*)) quantas linhas existem na tabela respostas (r é o alias).
        Mas só aquelas em que r.id_perguntas = p.id_perguntas, ou seja:
            Só conta as respostas que pertencem à pergunta atual do select.
        as total_respostas: nomeia essa coluna como total_respostas.
    Resultado: toda linha da view já vem com o total de respostas daquela pergunta.

join auth.users u on u.id = p.id_autor
    Aqui é onde ligamos (join) a tabela de perguntas com a tabela de usuários do Supabase Auth:
        auth.users é onde o Supabase salva todos os usuários registrados.
        u é um apelido pra ela.
        on u.id = p.id_autor significa:
            "pegue o usuário que tem o mesmo ID que está salvo em id_autor na tabela perguntas".
    Com isso, conseguimos puxar os dados do autor junto com a pergunta — sem precisar fazer isso manualmente no front.

*/






-- Permitir UPDATE apenas da coluna curtidas
CREATE POLICY "Permitir update da curtida por qualquer usuário"
ON perguntas
FOR UPDATE
USING (true)
WITH CHECK (auth.uid() IS NOT NULL)
