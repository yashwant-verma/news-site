const nav = document.querySelector('.nav')
window.addEventListener('scroll', fixNav)

function fixNav() {
    if(window.scrollY > nav.offsetHeight + 150) {
        nav.classList.add('active')
    } else {
        nav.classList.remove('active')
    }
}

 const apiKey = '';
 const url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=9&apiKey=${apiKey}`;

 async function fetchNews() {
     try {
         const response = await fetch(url);
         if (!response.ok) {
             throw new Error('Network response was not ok');
         }
         const data = await response.json();
         displayNews(data.articles);
     } catch (error) {
         console.error('There was a problem with the fetch operation:', error);
         document.getElementById('news').innerHTML = '<p>Failed to load news. Please try again later.</p>';
     }
 }

 
 function displayNews(articles) {
     const newsContainer = document.getElementById('news');
     newsContainer.innerHTML = '';

     if (articles.length === 0) {
         newsContainer.innerHTML = '<p>No news articles found.</p>';
         return;
     }

     articles.forEach(article => {
         const articleElement = document.createElement('div');
         articleElement.className = 'news-box';
         articleElement.innerHTML = `
             <h2>${article.title}</h2>
             <p>${article.description || ''}</p>
             <a href="${article.url}" target="_blank">Read more</a>
         `;
         newsContainer.appendChild(articleElement);
     });
 }

 
 fetchNews();


 setInterval(fetchNews, 60000);
