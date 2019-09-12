import Koa from 'koa';
import bodyParser from 'koa-body';
import json from 'koa-json';
import KoaRouter from 'koa-router';
import Documents from './services/documents';
import Env from './config/enviroment';

const koaBody = require('koa-body')({ multipart: true });

const app = new Koa();
const documents = Documents();
const env = Env();
const router = new KoaRouter({
  prefix: `/v${env.api.version}`,
});

/* ----------Documents---------- */
/* Create document */
router.post('/documents', koaBody, async (ctx) => {
  ctx.body = await documents.create(
    ctx.request.body.docTypeID,
    ctx.request.body.users,
  );
});

/* Create annex */
router.post('/documents/annexes', koaBody, async (ctx) => {
  ctx.body = await documents.createAnnex(
    ctx.request.body.docTypeID,
    ctx.request.body.users,
  );
});

app
  .use(json())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

const server = app.listen('4001');
console.log(`Server running on port ${server.address().port} ...`);
