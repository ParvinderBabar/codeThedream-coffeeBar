document.addEventListener('DOMContentLoaded', function() {
    // Initially fetch the hot coffee menu or leave it empty
    // fetchDataAndAppend('hot'); 
});

function fetchDataAndAppend(type) {
    let apiUrl;

    if (type === 'hot') {
        apiUrl = 'https://api.sampleapis.com/coffee/hot';
    } else if (type === 'iced') {
        apiUrl = 'https://api.sampleapis.com/coffee/iced';
    }

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('not working ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('container');
            if (container) {
                container.innerHTML = ''; // Clear previous content
                data.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'coffee-card';
                    
                    const img = document.createElement('img');
                    img.src = item.image || 'https://via.placeholder.com/200'; // Placeholder image if none
                    img.alt = item.title;

                    const title = document.createElement('h3');
                    title.textContent = item.title;

                    const description = document.createElement('p');
                    description.textContent = item.description || 'No description available.';

                    const ingredients = document.createElement('p');
                    ingredients.textContent = `Ingredients: ${item.ingredients.join(', ')}`;

                    card.appendChild(img);
                    card.appendChild(title);
                    card.appendChild(description);
                    card.appendChild(ingredients);

                    container.appendChild(card);
                });
            } else {
                console.error('Container element not found');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
