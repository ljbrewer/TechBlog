console.log("we are here")


const newCommentHandler = async (event) => {

if(!event.target.matches('.newcommentbtn')) {
  return;
}
  // const title = document.querySelector('#comment-title').value.trim();
  event.preventDefault();
  const blog_id = event.target.dataset.id;
  const content = document.querySelector('#comment-content-' + blog_id).value.trim();

  console.log (content) 

    if (content) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({comment: content,blog_id}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to create comment');
    }
  }

};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/comment');
    } else {
      alert('Failed to delete blog');
    }
  }
};
console.log(document.querySelector('.new-comment-form'))

document
  .querySelector('body')
  .addEventListener('click', newCommentHandler);

// document
//   .querySelector('.comment-list')
//   .addEventListener('click', delButtonHandler);
