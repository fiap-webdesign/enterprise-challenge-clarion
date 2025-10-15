fetch('./data/posts.json')
    .then(response => response.json())
    .then(posts => {
        const container = document.getElementById('postsContainer');
        posts.forEach(post => {
            const card = document.createElement('a');
            card.classList.add('post');
            card.href = `post.html?id=${post.id}`;
            card.innerHTML = `
                <article>
                <img src="${post.image}" alt="${post.title}">
                <div class="post-content">
                <h3 class="post-title">${post.title}</h3>
                <hr>
                <p class="text-secondary mb-0">${post.content}</p>
                </div>
                </article>
            `;
            container.appendChild(card);
        });
    });