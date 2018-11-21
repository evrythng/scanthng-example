EVT.setup({ apiUrl: 'https://api.evrythng.com' });

EVT.use(EVT.Scan);

const APPLICATION_API_KEY = '';
const CONTAINER_ID = 'stream_container';

let app;

const handleResults = (res) => {
  const anchor = document.getElementById('result');
  if (!res.length) {
    // No results
    anchor.innerHTML = 'No results';
    return;
  }

  if (res.length && !res[0].results.length) {
    // Raw URL
    anchor.innerHTML = res[0].meta.value;
    anchor.href = res[0].meta.value;
    return;
  }

  // Full result with redirections
  const url = res[0].results[0].redirections[0];
  anchor.innerHTML = url;
  anchor.href = url;

  return app.redirect(url);
};

const startCamera = () => {
  app.scanStream({
    filter: { method: '2d', type: 'qr_code' },
    containerId: CONTAINER_ID,
  })
    .then(handleResults)
    .catch(alert);
};

const main = () => {
  app = new EVT.App(APPLICATION_API_KEY);

  const button = document.getElementById('button');
  button.addEventListener('click', startCamera);
};

main();
