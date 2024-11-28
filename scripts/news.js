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


fetch(RSS_URL)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
    .then(data => {
        const items = data.querySelectorAll('item');
        if (items.length > 0) {
            // Extract the top news item
            const topItem = items[0];
            const title = topItem.querySelector('title').innerHTML;
            const link = topItem.querySelector('link').innerHTML;
            const pubDate = topItem.querySelector('pubDate').innerHTML;

            // Update the top news div
            const topNewsHTML = `
                <h3><a href="${link}" target="_blank">${title}</a></h3>
                <p class="pub-date">${pubDate}</p>
            `;
            document.getElementById('top-news').innerHTML = topNewsHTML;
        }
    })
    .catch(error => console.error('Error fetching top news:', error));
