var login_token = "",
global_user_games = []

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
        { element: "button", onclick: "", className: "btn btn-primary", innerText: "Rejoindre une partie", onclick: "join()" },
        { element: "button", onclick: "page_creation_partie()", className: "btn btn-primary", innerText: "Créer une partie" },
      ]
    }, 
    persos = {
      element : "div", 
      enfants : [
        { element: "h2", innerText: "Mes Persos" },
        { element: "div", id: "mes_persos", enfants:[
          table([["Personnage", "Monde"],["Loading", "Loading"]])
        ]}
      ]
    }, 
    parties = {
      element : "div", 
      enfants : [
        {
          element: "h2", innerText: "Mes Parties"
        },
        {
          element: "div", 
          id: 'games',
          enfants : [
            table([['Partie', "mdp"],["",""]])
          ]
        }
      ]
    }

    page = { 
      element : "div", 
      enfants : [
        { element: "div", id: "modals"},
        bandeau_accueil,
        persos,
        parties,
      ]
    }

    modal_test_info = {
      nom:"modal_test",
      titre:"test",
      body: [{
        element: "p", innerText: "thit is a test"
      }],
      button: 'test'
    }

    print(page, Main)
    print(modal(modal_test_info), document.querySelector('#modals'))
    print(modal_buttons(modal_test_info), Main)

    


    $.ajax({
      method: 'get',
      url: "/store/character/",
      data: {user : window.localStorage.token}
    })
    .done( 
      res => {
        if (res == 'NOT FOUND') {
          print(table([["Personnage", "Monde"],["", ""]]), document.getElementById('mes_persos'))
          return
        }
        // let liste_personages = []
        // cl(res)
        // for (perso of res){
        //   liste_personages.push([
        //     perso.nom, 
        //     { element: "button", className: "btn btn-primary", innerText: "Afficher", onclick: "page_partie_en_cours_player()"}
        //   ]) 
        // }
        let liste_personages = res.map ( perso => [decodeURI(perso.nom), { element: "button", className: "btn btn-primary", innerText: "Afficher", onclick: "page_partie_en_cours_player()"}])
        $('#mes_persos').html('')
        print(table([["Personnage", "Monde"],...liste_personages]), document.getElementById('mes_persos'))
      }
    )


    $.ajax({
      method: 'get',
      url: "/store/game/",
      data: { mj: window.localStorage.token}
    })
    .done( res => {
      const launcher = (id) => {
        return {
          elements: "button",
          className: "btn btn-primary", 
          innerText: "Afficher",
          onclick: "page_partie_en_cours_mj(" +id+")"
        }
      }

      global_user_games = res

      dom_games = document.querySelector('#games')
      dom_games.innerHTML = ""
      games = res.map( game => [decodeURI(game.nom), decodeURI(game.mdp) == "" ? "aucun mot de passe" : decodeURI(game.mdp), launcher(game._id)])
      print(table([['Partie', "mdp", "launch"],...games]), dom_games)
    })
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

function page_partie_en_cours_mj(partie_id){
  $('.main').html('');
  if (!safenav()) {
    page_login()
    return
  }

  partie_globale = partie_id

  buttons_control = {
    element: "div",
    className: "d-flex justify-content-between mb-3",
    enfants : [
      { element: 'button', className: 'btn btn-primary', innerText: "Ouvrir la partie", onclick: "update_status_partie(" + partie_id + ", 'ouvert')"},
      { element: 'button', className: 'btn btn-danger', innerText: "Fermer la partie", onclick: "update_status_partie(" + partie_id + ", 'ferme')"},
      { element: 'button', className: 'btn btn-secondary', innerText: "Terminer la partie", onclick: "update_status_partie(" + partie_id + ", 'fini')"},
    ]
  }
  print(buttons_control, Main)
  print({element: "h1", innerText: "Players", className: "mb-3"}, Main)
  print({ element: "div", className: "d-flex flex-wrap", id:"players"},Main)
  print({element: "h1", innerText: "Items", className: "mb-3"}, Main)
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

function page_creation_partie(){
  $('.main').html('');
  if (!safenav()) {
    page_login()
    return
  }
  const lien_retour = {
    element : "span",
    className: "m-3",
    enfants : [
      {
        element : "i",
        className: "bi bi-arrow-bar-left"
      },
      { 
        element : 'span',
        className: 'test-primary text-decoration-underline',
        onclick : 'page_user()',
        innerText: "retour"
      }
    ]
  }
  print(lien_retour, Main)
  print(formulaireCreationPartie(), Main)
}

function page_creation_personnage(){
  $('.main').html('');
  if (!safenav()) {
    page_login()
    return
  }
  print(formulaireCreationPersonnage(), Main)
}

function update_status_partie(id, status){

  $.ajax({
    method: 'patch',
    url: '/store/game/'+id,
    data: { status: status }
  })
  .done(function(res){
    if (res == "NOT FOUND") alert('Erreur de server !')
    else {
      global_game = global_user_games.find( x => x._id == id)
    }
  })
}
