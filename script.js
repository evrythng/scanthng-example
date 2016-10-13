var APP_API_KEY = 'YOUR_APP_API_KEY_HERE';

// Instantiate an EVRYTHNG Application Object
var app = new EVT.App(APP_API_KEY);

// Configure SCANTHNG
EVT.use(EVT.Scan);
EVT.Scan.setup({
  redirect: false,
});

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

// Call Back when image detection returns an error
function scanError(error) {
  addResults('Error', JSON.stringify(error, null, 2));
}

// Call back when a product has been identified
function scanSuccess(data) {
  addResults('Scan Successful', JSON.stringify(data, null, 2));

  app.appUser().create({
    anonymous: true
  }).then(function(anonUser) {
    anonUser.product(data.evrythngId).read().then(function(product) {
      addProduct(JSON.stringify(product, null, 2));
    });
  });
}

function scanProduct() {
  clearResults();
  app.scan()
    .then(scanSuccess)
    .catch(scanError);
}
