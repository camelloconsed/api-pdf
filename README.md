# API PDF

API de microservicios para generar documentos en formato PDF.

## Iniciando

Clonar repositorio de git y cambiar a la rama que se usará.

```
git clone https://ntorrres@bitbucket.org/jumpitt_blockchain/pdf.git
git checkout "rama"
```

### Requisitos previos

Necesitas instalar las siguientes cosas en tu maquina para ejecutar la API:

```
Node JS
```

### Instalación

Lo primero a instalar son las dependencias del proyecto.

Al estar en el directorio donde se descargo la API se debe ejecutar el siguiente comando:

```
npm install
```

  

posterior a esto se debe crear el archivo .env para almacenar las variables de ambiente, este lo copiaremos del archivo de ejemplo que viene en el repositorio llamado ".env.example" con el siguiente comando:

```
cp .env.example .env
```
este archivo se debe modificar para satisfacer las necesidades del proyecto.
El ejemplo contiene lo siguiente:

```
API_NAME=Blockchain API
API_ENV=development
API_VERSION=1
```

Con esto tendremos la API configurada y lista para iniciar.

## Deployment

...

## Built With

* [KoaJS](https://koajs.com/) - The JS framework used

* [npm](https://www.npmjs.com/) - Dependency Management
