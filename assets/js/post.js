const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

fetch('./data/posts.json')
  .then(res => res.json())
  .then(posts => {
    const post = posts.find(p => p.id == postId);

    document.getElementById('postTitle').textContent = post.title;
    document.getElementById('postContent').innerHTML = post.content.replace(/\n/g, '</br>');
    document.getElementById('postImage').src = post.image;
    document.getElementById('postImage').alt = post.title;
    document.getElementById('postAuthor').textContent = post.author;
    document.getElementById('date').textContent = post.date;
  });

document.getElementById('postShare').addEventListener('click', function(event) {
    event.preventDefault();
    const link = window.location.href;

    navigator.clipboard.writeText(link);

    const toastElement = document.getElementById('toastNotification');
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
});