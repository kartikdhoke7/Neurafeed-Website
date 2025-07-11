/* =================================================================
   MOBILE NAVIGATION LOGIC
   ================================================================= */
const hamburger = document.getElementById('hamburger-icon');
const navLinks = document.getElementById('main-nav-links');
const header = document.querySelector('header');

function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    header.classList.toggle('menu-open');
    document.body.classList.toggle('no-scroll');
}

if (hamburger && navLinks) {
    hamburger.addEventListener('click', toggleMobileMenu);

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    document.addEventListener('click', (event) => {
        if (!navLinks.contains(event.target) && !hamburger.contains(event.target) && navLinks.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            header.classList.remove('menu-open');
            document.body.classList.remove('no-scroll');
        }
    });
}


/* =================================================================
   SANITY.IO DYNAMIC ARTICLE LOADING
   ================================================================= */

document.addEventListener('DOMContentLoaded', () => {
    const articlesContainer = document.getElementById('articles-container');
    
    if (articlesContainer) {
        const projectId = 'humww1pn'; // Your Project ID
        const dataset = 'production';
        
        const query = encodeURIComponent(`*[_type == "article"] | order(_createdAt desc) {
            title,
            "slug": slug.current,
            category,
            excerpt,
            "imageUrl": mainImage.asset->url
        }`);
        
        const url = `https://${projectId}.api.sanity.io/v2021-10-21/data/query/${dataset}?query=${query}`;

        async function fetchArticles() {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const { result } = await response.json();
                renderArticles(result);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
                articlesContainer.innerHTML = '<p>Could not load articles at this time. Please try again later.</p>';
            }
        }

        function renderArticles(articles) {
            if (!articles || articles.length === 0) {
                articlesContainer.innerHTML = '<p>No articles found.</p>';
                return;
            }

            articlesContainer.innerHTML = '';

            articles.forEach(article => {
                const articleCardHTML = `
                    <article class="news-card">
                        <div class="card-image">
                            <img src="${article.imageUrl}?w=800&h=600&fit=crop" alt="${article.title}">
                            <span class="card-badge">${article.category}</span>
                        </div>
                        <div class="card-content">
                            <h3>${article.title}</h3>
                            <p>${article.excerpt}</p>
                            <a href="blog/${article.slug}.html" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                        </div>
                    </article>
                `;
                articlesContainer.innerHTML += articleCardHTML;
            });
        }

        fetchArticles();
    }
});