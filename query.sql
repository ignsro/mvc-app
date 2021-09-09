use pruebas;

create table empresa(
    id int not null auto_increment primary key ,
    nombre varchar(150),
    estado boolean
);

create table persona(
    id int not null auto_increment primary key ,
    nombre varchar(150),
    estado boolean,
    empresa_id integer
);

create table vehiculo(
    id int not null auto_increment primary key ,
    tipo varchar(150),
    descripcion varchar(250),
    persona_id integer
);


-- 1
select e.nombre as Empresa, p.nombre, v.descripcion, v.tipo from persona p
inner join vehiculo v on p.id = v.persona_id
inner join empresa e on p.empresa_id = e.id
where v.tipo = 1;

-- 2
select p.id as PersonaID, p.nombre, p.estado from persona p
join empresa e on p.empresa_id = e.id
where e.id = 3 and
      p.estado = 1;

-- 3
select e.nombre as Empresa, p.nombre as Persona, v.descripcion as Descripcion from persona p
left join vehiculo v on p.id = v.persona_id
join empresa e on p.empresa_id = e.id
order by e.id , p.nombre;


