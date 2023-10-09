const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

searchInput.addEventListener("keyup", () => {
  const searchTerm = searchInput.value;
  if (searchTerm) {
    searchapp(searchTerm);
  } else {
    searchResults.innerHTML = "";
  }
});

async function searchapp(query) {
  try {
    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=${query}`
    );
    const data = await response.json();
    displayResults(data);
  } catch (error) {
    console.error("Greška prilikom dohvaćanja podataka:", error);
  }
}

function displayResults(data) {
  searchResults.innerHTML = "";

  if (data.length === 0) {
    searchResults.innerHTML = "Nema rezultata za ovaj upit.";
    return;
  }

  data.forEach((result) => {
    const show = result.show;
    const showName = show.name;
    const showSummary = show.summary || "Nema dostupnog opisa.";
    const showRating = show.rating?.average || "N/A";
    const showGenres = show.genres.join(", ") || "N/A";

    const showElement = document.createElement("div");
    showElement.innerHTML = `
                    <h2>${showName}</h2>
                    <p><strong>Prosječni rating:</strong> ${showRating}</p>
                    <p><strong>Žanrovi:</strong> ${showGenres}</p>
                    <p>${showSummary}</p>
                `;

    searchResults.appendChild(showElement);
  });
}
