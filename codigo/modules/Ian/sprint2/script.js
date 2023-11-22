var map;
var currentMarker = null;
var directionsRenderer;
const apiUrl = 'https://backup-json.joaoantonio78.repl.co/atividades';
var atividadesCarregadas = new Set();

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: { lat: -19.912998, lng: -43.940933 },
  });

  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);
  carregarAtividades();
}

function carregarAtividades() {
  atividadesCarregadas.clear();

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      limparMarcacaoErota();
      var enderecoList = document.getElementById('endereco-list');

      if (data.length === 0) {
        enderecoList.innerHTML = '<p>Ainda não existem atividades cadastradas.</p>';
      } else {
        data.forEach(function(atividade) {
          if (atividade.categoria && atividade.categoria.toLowerCase() === "presencial") {
            var enderecoCompleto = atividade.endereco;
            var nome = atividade.nome;

            if (!atividadesCarregadas.has(nome)) {
              atividadesCarregadas.add(nome);
              adicionarAtividadeNoMapa(enderecoCompleto, nome);
            }
          }
        });
      }
    })
    .catch(error => {
      console.error('Erro ao ler atividades via API JSONServer:', error);
      displayMessage("Erro ao ler atividades");
    });
}

function adicionarAtividadeNoMapa(enderecoCompleto, nome) {
  geocodeEndereco(enderecoCompleto, function(lat, lng) {
    var li = document.createElement('li');
    li.innerHTML = nome + '<br>' +
      '<button class="marcar-no-mapa" onclick="marcarNoMapa(' + lat + ', ' + lng + ')">📍 Marcar no Mapa</button>' +
      '<button class="tracar-rota" onclick="tracarRota(' + lat + ', ' + lng + ')">🚘 Traçar Rota</button>';

    if (!document.getElementById('endereco-list').innerHTML.includes(nome)) {
      document.getElementById('endereco-list').appendChild(li);
    }
  });
}

function limparMarcacaoErota() {
  if (currentMarker) {
    currentMarker.setMap(null);
  }

  directionsRenderer.setDirections({ routes: [] });
}

function geocodeEndereco(endereco, callback) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'address': endereco }, function (results, status) {
    if (status === 'OK' && results[0]) {
      var location = results[0].geometry.location;
      var lat = location.lat();
      var lng = location.lng();
      callback(lat, lng);
    } else {
      console.error('Erro ao geocodificar o endereço:', status);
      displayMessage("Erro ao geocodificar o endereço");
    }
  });
}

function marcarNoMapa(lat, lng) {
  limparMarcacaoErota();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var origem = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      var destino = new google.maps.LatLng(lat, lng);
      map.setZoom(13);
      map.setCenter(destino);
      var marker = new google.maps.Marker({
        map: map,
        position: destino
      });
      currentMarker = marker;
    }, function(error) {
      alert('OPS! Você precisa permitir a localização no seu navegador para podermos marcar no mapa.');
    });
  } else {
    alert('Seu navegador não suporta geolocalização.');
  }
}

function tracarRota(destLat, destLng) {
  limparMarcacaoErota();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var origem = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      var destino = new google.maps.LatLng(destLat, destLng);
      var directionsService = new google.maps.DirectionsService();
      var request = {
        origin: origem,
        destination: destino,
        travelMode: 'DRIVING'
      };
      directionsService.route(request, function (result, status) {
        if (status === 'OK') {
          directionsRenderer.setDirections(result);
        } else {
          alert('Não foi possível traçar a rota: ' + status);
        }
      });
    }, function(error) {
      alert('OPS! Você precisa permitir a localização no seu navegador para podermos traçar a rota.');
    });
  } else {
    alert('Seu navegador não suporta geolocalização.');
  }
}

window.addEventListener('load', function() {
  initMap();
});