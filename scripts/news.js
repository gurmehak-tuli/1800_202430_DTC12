const RSS_URL = 'https://cors-anywhere.herokuapp.com/commons.bcit.ca/news/feed/';
fetch(RSS_URL)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
    .then(data => {
        const items = data.querySelectorAll('item');
        let html = '';
        items.forEach(item => {
            const title = item.querySelector('title').innerHTML;
            const link = item.querySelector('link').innerHTML;
            const pubDate = item.querySelector('pubDate').innerHTML;
            html += `
                <div class="news-item">
                    <h2><a href="${link}" target="_blank">${title}</a></h2>
                    <p class="pub-date">${pubDate}</p>
                </div>
            `;
        });
        document.getElementById('news-container').insertAdjacentHTML('beforeend', html);
    })
    .catch(error => console.error('Error:', error));