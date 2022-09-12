# DH - Quiosquito
## Proyecto de prueba para alumnxs de DH

## Instalación

- ` git clone git@github.com:mabregu/dh-quiosquito.git `
- ` cd dh-quiosquito `
- ` npm i `
- Crear un archivo en la raiz llamado ` .env ` con las variables de entorno que le correspondan ver ` .env.example `
- ` npx sequelize-cli db:create ` esto crea la base de datos si no la tuviesemos creada.
- ` npx sequelize-cli db:migrate ` esto corre las migraciones (crea las tablas).
- ` npx sequelize-cli db:seed:all ` esto corre los seeds (carga la data de prueba, para tener info).
- ` npm run dev `
- Y a cruzar los dedos 😅

### User de prueba

` username: johndoe@mail.com `
` password: 123456 `