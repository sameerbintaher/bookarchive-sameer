document.getElementById('error-message').style.display = 'none';
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';
    if (searchText == '') {
        document.getElementById('error-message').style.display = 'block';
    }
    else {
        // load data
        const url = `http://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs))
            .catch(error => displayError(error));
    }
}

const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}

const displaySearchResult = docs => {
    const countResult = document.getElementById('count-result');
    document.getElementById('count-result').style.display = 'block';
    countResult.innerText = `Total search result: ${docs.length}`;
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    docs.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p><span class="text-primary">Author: </span>${book.author_name}</p>
                    <p><span class="text-primary">Publisher: </span>${book.publisher}</p>
                    <p><span class="text-primary">Publish-Date: </span>${book.publish_date}</p>
                </div>
            </div>
        `;
        searchResult.appendChild(div);
    })

        .catch(error => {
            document.getElementById("search-result").innerHTML = `
            <h3 class="text-danger">Sorry!!! Try with another one please..</h3>
        `
        });
}