// Renvoie automatique ves la page d'accueil des utilisteurs non connectés

const token = localStorage.getItem('token');

if (!token) {
  print({ element: "a", innerText : '', href : "/", id:"out" }, Main);
  $('#out').click()
}