var login_token = ""

function safenav(){
  token = window.localStorage.getItem('token');
  if (token) return true;
  else return false;
}


function page_login(){
  $('.main').html('');
  
  print(formulaireConnexion(), Main)
  print({ element: "div", innerText: "Créer un compte", onclick: "page_signin()", className: "pt-3 text-primary text-decoration-underline"}, Main)

}

function page_signin(){
  $('.main').html('');

  print(formulaireInscription(), Main)
  print({ element: "div", innerText: "Se connecter", onclick: "page_login()", className: "pt-3 text-primary text-decoration-underline"}, Main)
}

function page_user(){
  $('.main').html('');
  if (!safenav()) {
    page_login()
    return
  }

  const 
    bandeau_accueil = {
      element: "div", 
      className: "d-flex justify-content-between mb-3",
      enfants : [
        { element: "button", onclick: "", className: "btn btn-primary", innerText: "Rejoindre une partie" },
        { element: "button", onclick: "", className: "btn btn-primary", innerText: "Créer une partie" },
      ]
    }, 
    persos = {
      element : "div", 
      enfants : [
        {
          element: "h2", innerText: "Mes Persos"
        },
        table([["Personnage", "Monde"],["", ""]])
      ]
    }, 
    parties = {
      element : "div", 
      enfants : [
        {
          element: "h2", innerText: "Mes Parties"
        },
        table_one_column('Personnages',["",""])
      ]
    }

    page = { 
      element : "div", 
      enfants : [
        bandeau_accueil,
        persos,
        parties,
      ]
    }

    print(page, Main)

}

function page_player(){
  $('.main').html('');
  if (!safenav()) {
    page_login()
    return
  }
    
}

function page_mj(){
  $('.main').html('');
  if (!safenav()) {
    page_login()
    return
  }
}

function page_partie_en_cours_mj(){
  $('.main').html('');
  if (!safenav()) {
    page_login()
    return
  }

  print({element: "h1", innerText: "Players", domclass: "mb-3"}, Main)
  print({ element: "div", className: "d-flex flex-wrap", id:"players"},Main)
  print({element: "h1", innerText: "Items", domclass: "mb-3"}, Main)
  print({ element: "div", className: "d-flex flex-wrap", id: "items"},Main)

  Players = document.querySelector('#players')
  Items = document.querySelector('#items')
  
  for (player of liste_personages) print(ficheDePerso(player), Players)
  
  for (item of liste_items) print(ficheItem(item), Items)
  
  // récupérer les infor du perso dans la base
  // $.ajax({
  //   method: 'get',
  //   url: '/store/charters'
  // })
  // .done(function(res){
  //   for (player of liste_personages) print(ficheDePerso(player), Players)
  // })
  // .fail( err => cl(err) )

}

function page_partie_en_cours_player(){
  $('.main').html('');
  if (!safenav()) {
    page_login()
    return
  }

  print(diceRoller(), Main)
  print(formulaireCreationPersonnage(), Main)
  print(ficheDePerso(Arthur), Main)

}