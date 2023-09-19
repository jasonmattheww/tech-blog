const commentFormHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#comment').value.trim();
  const post_id = document.querySelector('#postId').value;

  const response = await fetch('/api/comment', {
    method: 'POST',
    body: JSON.stringify({ comment, post_id }),
    headers: { 'Content-Type': 'application/json' },
  });


  if (response.ok) {
    document.location.reload();
  } else {
    alert('Falied to add a comment');
  }
};

document.querySelector('#submitBtn').addEventListener('click', commentFormHandler);