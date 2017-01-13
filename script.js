var APP_API_KEY = 'YOUR_APP_API_KEY_HERE';

// Use SCANTHNG
EVT.use(EVT.Scan);

// Instantiate an EVRYTHNG Application Object
var app = new EVT.App(APP_API_KEY);

$('#scanAnything button').click(scanProduct);
$('#clearResults button').click(clearResults);

function addResults(header, results) {
  $('#output-area').attr('class', 'boxed')
  $('#header').html('<h3>' + header + '</h3><p>');
  $('#results').html(results + '<p>');
}

function addProduct(product) {
  $('#product').html(product);
}

function clearResults() {
  $('#output-area').removeAttr('class');
  $('#header').empty();
  $('#results').empty();
  $('#product').empty();
}

// Callback for when image detection returns an error
function scanError(error) {
  addResults('Scan Error', JSON.stringify(error, null, 2));
}

// Callback for when a product has been identified
function scanSuccess(res) {
  addResults('Scan Successful', JSON.stringify(res, null, 2));

  var result = res[0].results[0];
  addProduct(JSON.stringify(result.product, null, 2));
}

function scanProduct() {
  clearResults();
  app.scan({
    filter: 'method=2d&type=qr_code',
    createAnonymousUser: true
  }).then(scanSuccess)
    .catch(scanError);
}
