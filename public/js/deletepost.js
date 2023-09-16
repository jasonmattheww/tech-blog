const deletepostFormHandler = async (event) => {
  event.preventDefault();
  const response = await fetch(`/api/post/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to delete post');
  }
};

document.querySelector('#delete-post').addEventListener('submit', deletepostFormHandler);