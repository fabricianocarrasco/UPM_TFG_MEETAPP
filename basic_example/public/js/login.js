window.onload = () => {
  const urlString = window.location.href;
  const url = new URL(urlString);
  const error = url.searchParams.get('error');

  if(error === 'auth'){
    document.getElementById('auth-error').removeAttribute('hidden');
  }else if(error === 'timeout'){
    document.getElementById('timeout-error').removeAttribute('hidden');
  }else{

  }

};