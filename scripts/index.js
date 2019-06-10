/** The EVRYTHNG API URL */
const API_URL = 'https://api.evrythng.com';
/** ID of the element to place the video stream inside */
const CONTAINER_ID = 'stream_container';

evrythng.setup({ apiUrl: API_URL });

// Install the SDK plugin
evrythng.use(ScanThng);

let app;

/**
 * Get a URL parameter value.
 *
 * @param {string} name - Name of the param to find.
 * @returns {string} The value, if found.
 */
const getUrlParam = name => new URLSearchParams(window.location.search).get(name);

/**
 * Handle the scan results from the API.
 *
 * @param {object} res - Results object, an array of results containing identifications.
 * @returns {Promise}
 */
const onScanSuccess = (res) => {
  const anchor = document.getElementById('result');

  // No results
  if (!res.length) {
    anchor.innerHTML = 'No results';
    return;
  }

  // Raw URL, but not resources identified
  if (res.length && !res[0].results.length) {
    anchor.innerHTML = res[0].meta.value;
    anchor.href = res[0].meta.value;
    return;
  }

  // Full identification result with redirections
  const [url] = res[0].results[0].redirections;
  anchor.innerHTML = url;
  anchor.href = url;

  return app.redirect(url);
};

/**
 * Stard the camera stream and handle results.
 */
const startCamera = () => {
  const opts = {
    // Required filter for local QR scanning
    filter: { method: '2d', type: 'qr_code' },
    // Element to contain the video stream
    containerId: CONTAINER_ID,
  };

  app.scanStream(opts).then(onScanSuccess).catch(alert);
};

/**
 * Main function.
 */
const main = () => {
  const apiKey = getUrlParam('app');
  if (!apiKey) {
    alert('Please specify \'app\' URL parameter with the Application API Key.');
    return;
  }

  app = new evrythng.Application(apiKey);

  const button = document.getElementById('button');
  button.addEventListener('click', startCamera);
};

main();
