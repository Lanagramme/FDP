const token = localStorage.getItem('token');

if (!token) {
  print({ element: "a", innerText : '', href : "/", id:"out" }, Main);
  $('#out').click()
}