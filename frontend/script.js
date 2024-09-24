// Fonction pour ajouter un trajet au panier
function addToCart(tripId) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  localStorage.setItem("cart", JSON.stringify([...cart, tripId]));
  alert(`Voyage ${tripId} ajouté au panier`)
  }

document.getElementById('search-form').addEventListener('submit', async (e) => { e.preventDefault();

  const departure = document.querySelector('#departure').value;
  const date = document.querySelector('#date').value;
  const arrival = document.querySelector('#arrival').value;

  const response = await fetch(`/trips/search?departure=${departure}&arrival=${arrival}`)
  const result = await response.json();

  const resultsDiv = document.getElementById('results');

  resultsDiv.innerHTML = "";

  if (response.ok) {
    result.foundTrips.forEach( trip => {
      const tripDiv = document.createElement('div');
      tripDiv.className = "trip";
      tripDiv.innerHTML = `
      <p>${trip.departure} à ${trip.arrival} le ${new Date(trip.date).toLocaleDateString()} - $ ${trip.price}</p>
      <button onclick="addToCart(${trip._id})"> Add to Cart</button>
      `;
      resultsDiv.appendChild(tripDiv)

    });
  } else { 
    resultsDiv.innerHTML = `<p> ${result.message} </p>`;
    }
  });


document.querySelectorAll('.add-to-cart-btn').forEach( button => {
  button.addEventListener('click', function () {
    const tripId = this.getAttribute('data-trip-id');
    addToCart(tripId)
  })
})

