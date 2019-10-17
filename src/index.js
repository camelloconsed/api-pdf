import Koa from 'koa';
import bodyParser from 'koa-body';
import json from 'koa-json';
import KoaRouter from 'koa-router';
import cors from '@koa/cors';
import Documents from './services/documents';
import Env from './config/enviroment';
import Consts from './config/constants';

const Sentry = require('@sentry/node');

const koaBody = require('koa-body')({ multipart: true });

const CONSTS = Consts();
const app = new Koa();
const documents = Documents();
const env = Env();
const router = new KoaRouter({
  prefix: `/v${env.api.version}`,
});

Sentry.init({ dsn: env.api.sentry });

/* ----------Documents---------- */
/* Create document */
router.post('/documents', async ctx => {
  ctx.res.setHeader('Content-Type', 'application/pdf');
  ctx.res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
  ctx.body = await documents.create(
    ctx,
  );
});

app
  .use(cors())
  .use(json())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

const server = app.listen('4001');
console.log(`Server running on port ${server.address().port} ...`);
