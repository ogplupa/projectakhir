// URL dari web service REST API (gunakan URL yang sesuai)
const API_URL = 'https://api.example.com/places';

// Menampilkan daftar tempat wisata di halaman utama
function loadPlaces() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('places-container');
            container.innerHTML = ''; // Bersihkan konten lama
            
            data.places.forEach(place => {
                const card = `
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <img src="${place.image}" class="card-img-top" alt="${place.name}">
                            <div class="card-body">
                                <h5 class="card-title">${place.name}</h5>
                                <p class="card-text">${place.shortDescription}</p>
                                <a href="detail.html?id=${place.id}" class="btn btn-primary">Lihat Detail</a>
                            </div>
                        </div>
                    </div>
                `;
                container.innerHTML += card;
            });
        })
        .catch(error => console.error('Error fetching places:', error));
}

// Menampilkan detail tempat wisata di halaman detail
function loadPlaceDetail() {
    const params = new URLSearchParams(window.location.search);
    const placeId = params.get('id');

    fetch(`${API_URL}/${placeId}`)
        .then(response => response.json())
        .then(place => {
            document.getElementById('place-image').src = place.image;
            document.getElementById('place-name').textContent = place.name;
            document.getElementById('place-description').textContent = place.description;
        })
        .catch(error => console.error('Error fetching place details:', error));
}

// Menentukan halaman yang sedang dimuat
if (document.getElementById('places-container')) {
    loadPlaces();
} else if (document.getElementById('place-name')) {
    loadPlaceDetail();
}
