import { env } from '~config/env.config'; // Should be on top

env.ROOT_PATH = __dirname;

import { Bootstrap } from './core/bootstrap/bootstrap';

async function startApp() {
  const bootstrap = new Bootstrap();
  await bootstrap.initApp();
  bootstrap.initPipes();
  bootstrap.initCors();
  bootstrap.initStaticAsset();
  bootstrap.initJsonBodyLimit();
  await bootstrap.start();
  await bootstrap.enableHotReload();
}

startApp()
  .then(() => console.log('Init app success'))
  .catch(console.error);
