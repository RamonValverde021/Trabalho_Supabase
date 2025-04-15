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

--Atualização de View --
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


--Atualização de View --
create view perguntas_com_respostas as
select 
  p.*, 
  u.raw_user_meta_data ->> 'nome' as nome_autor,
  (select count(*) from respostas r where r.id_perguntas = p.id_perguntas) as total_respostas
from perguntas p
join auth.users u on u.id = p.id_autor;
