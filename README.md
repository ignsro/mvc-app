
# MVC APP

Recruitment project.



## Instalación

Para instalar las dependencias del proyecto, ejecutar lo siguente.
```bash
  cd /backend
  npm i
  cd ..
  cd /frontend
  npm i
```

Es necesario una base de datos MySql.



    
## Environment Variables

#### .ENV

Para ejecutar el projecto, es necesario completar las variables de entorno, 
siguiendo en ejemplo de .env.example

`PORT`: Puerto que usara el servidor HTTP. *Debe estar libre

`MYSQL_URI` : String conector de la base de datos

`DB_USER`: Usuario de la base de datos

`DB_PWD`: Contraseña de la base de datos

`DB_NAME`: Nombre de la base de datos

`DB_HOST=`: Host de la base de datos

`DB_PORT`: Puerto de la base de datos (Mysql - 3306)

`APPLICATION_NAME`: Nombre de la APP 

#### config.json

Archivo de configuración para sequelize, completar con los datos de la db

*Solo la seccion 'development' es necesaria
## Ejectuar localmente

#### Servidor web

Para ejecutar el projecto, ejecutar lo siguente

```bash
`cd /backend
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
npm start
```

Esto iniciara el servidor web en el puerto indicado.

#### Frontend

Para visualizar  en Frontend ejecutar en una consola nueva 
```bash
`cd /frontend
ng serve
```



  