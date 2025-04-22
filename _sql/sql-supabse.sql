create view perguntas_com_respostas as
select                                                                                           
  p.*,                                                                                           
  u.raw_user_meta_data ->> 'nome' as nome_autor,                                                
  (select count(*) from respostas r where r.id_perguntas = p.id_perguntas) as total_respostas   
from perguntas p                                                                               
join auth.users u on u.id = p.id_autor;   

create table curtidas_perguntas (
  id_pergunta uuid references perguntas(id_perguntas),
  id_usuario uuid references auth.users(id),
  primary key (id_pergunta, id_usuario)
);
