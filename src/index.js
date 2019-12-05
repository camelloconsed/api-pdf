import Koa from 'koa';
import bodyParser from 'koa-body';
import json from 'koa-json';
import KoaRouter from 'koa-router';
import cors from '@koa/cors';
import Documents from './services/documents';
import Env from './config/enviroment';
import Consts from './config/constants';
import Response from './responses';

require('dotenv').config();

const Sentry = require('@sentry/node');

const koaBody = require('koa-body')({ multipart: true });

const CONSTS = Consts();
const app = new Koa();
const documents = Documents();
const env = Env();
const router = new KoaRouter({
  prefix: `/v${env.api.version}`,
});

if (process.env.ENVIRONMENT === 'prod') {
  Sentry.init({ dsn: env.api.sentry });
}

/* ----------Documents---------- */

router.post('/convertPDF', async ctx => {
  ctx.res.setHeader('Content-Type', 'application/pdf');
  ctx.res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
  ctx.body = await documents.convertPDF(ctx);
});

/* Create document */
router.post('/documents', async ctx => {
  ctx.res.setHeader('Content-Type', 'application/pdf');
  ctx.res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
  try {
    ctx.body = await documents.create(
      ctx,
    );
  } catch (err) {
    ctx.status = CONSTS.HTTP.CODES.NOT_FOUND;
    ctx.body = new Response(
      CONSTS.RESPONSES.DOCUMENTS.TEMPLATE.NOT_FOUND,
      CONSTS.HTTP.CODES.NOT_FOUND,
      err.path,
    );
  }
});

router.post('/documents/annex', async ctx => {
  ctx.body = await documents.annex(
    ctx,
  );
});

app
  .use(cors())
  .use(json())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

const server = app.listen('4000');
console.log(`Server running on port ${server.address().port} ...`);
