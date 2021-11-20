cl = console.log
var statistiques_globales = {
},
liste_statistiques = [
	"Force",
	"Intelligence",
	"Chance",
	"Agilité",
	"Charisme",
]

// Utilitaires
	function rollDice(max) {
		return Math.floor(Math.random() * max) + 1;
	}

	ajouter_statistique = (statistique) => {
		return {
			element: 'div', className:'d-flex', 
			enfants : [
				{ element : "div", innerText: statistique.nom + ' :', className: "pr-1"},
				{ element : "div", innerText: statistique.valeur}
			]
		}
	}

	function rollStats(){
		document.getElementById('stat_sheet').innerHTML = ""
		for (stat of liste_statistiques){
			let val = rollDice(6)
			statistiques_globales[stat] = val
			print(ajouter_statistique({nom: stat, valeur : val}), document.getElementById('stat_sheet'))
		}
	}

// Formulaires
	function formControl(input){
		return {
			element: 'div', className: 'mb-3',
			enfants: [
				{ 
					element: 'label', 
					for: `input${input.name}`, 
					className: 'form-label', 
					innerText : `${input.text}`
				},
				{ 
					element: 'input', 
					type : `${input.type}`,
					id: `input${input.name}`,
					name: input.name,
					className: 'form-control'
				}
			]
		}
	}

	function formulaireConnexion(){
		return {
			element: 'form',
			method: 'post',
			className: 'm-3',
			enfants : [
				{ element: "h2", innerText:"Connexion", className: "mb-3"},
				formControl({name: "user", type: "text", text: "Nom d'utilisateur"}),
				formControl({name: "password", type: "password", text: "Mot de passe"}),
				{ element: "div", onclick: "connexion()", className: "btn btn-primary", innerText: "Connecter", action: "inscription()"}
			]
		}
	}

	function formulaireCreationPersonnage(){
		const 
			result = {
			element: 'form',
			method: 'post',
			className: 'm-3',
			enfants : [
				{ element: "h2", innerText:"Création de personnage", className: "mb-3"},
				formControl({name: "nom", type: "text", text: "Nom du Personnage"}),
				{ element: "div", innerText : "Ajouter les statistiques", className: "btn btn-primary", "attr/onclick": "rollStats()"},
				{ element: "div", enfants: [], id: "stat_sheet"},
				{ element: "div", /**type: "submit", */ className: "btn btn-primary", innerText: "Créer personnage", "attr/onclick": "creationPersonnage()"},
			]
		}

		for (statistique of liste_statistiques) 
			result.enfants[3].enfants.push(ajouter_statistique({nom: statistique, valeur : "0"}))

		return result;
	}

	function formulaireInscription(){
		return {
			element: 'form',
			method: 'post',
			className: 'm-3',
			enfants : [
				{ element: "h2", innerText:"Inscription", className: "mb-3"},
				formControl({name: "user", type: "text", text: "Nom d'utilisateur"}),
				formControl({name: "password", type: "password", text: "Mot de passe"}),
				formControl({name: "repeat_password", type: "password", text: "Repeter le Mot de passe"}),
				{ element: "div", onclick: "inscription()", className: "btn btn-primary", innerText: "Inscription"},
			]
		}
	}

	function formulaireCreationPartie(){
		return {
			element: 'form',
			method: 'post',
			className: 'm-3',
			enfants : [
				{ element: "h2", innerText:"Créer une partie", className: "mb-3"},
				formControl({name: "nom", type: "text", text: "Donnez un nom à la partie"}),
				formControl({name: "password", type: "password", text: "Définissez un mot de passe"}),
				formControl({name: "repeat_password", type: "password", text: "Repetez le Mot de passe"}),
				{ element: "div", onclick: "creationPartie()", className: "btn btn-primary", innerText: "Valider"},
			]
		}
	}

	// Requetes
	function inscription(){
		if ( encodeURI($('input[name="password"]').val()) != encodeURI($('input[name="repeat_password"]').val()) ) {
			alert('les mots de passe ne correspondent pas !')
			return
		}
		for (field of document.querySelectorAll("input")){
			if (encodeURI(field.value) == "") {
				alert("Tous les champs doivent être remplis !!")
				return
			}
		}
		var data = { 
			nom: encodeURI(document.querySelector('input[name="user"]').value.trim()),
			mdp: encodeURI(document.querySelector('input[name="password"]').value),
		}
		
		$.ajax({
			method: 'POST',
			url: "/store/user/",
			data: data
		})
		.done( res => {
			window.localStorage.setItem('token', res._id)
			page_user()
		})
		.fail( res => cl(res))
	}

	function creationPartie(){
		if ( encodeURI($('input[name="password"]').val()) != encodeURI($('input[name="repeat_password"]').val()) ) {
			alert('les mots de passe ne correspondent pas !')
			return
		}
		if (encodeURI($('input[name="nom"]').val()).trim() == "") {
			alert("Tous les champs doivent être remplis !!")
			return
		}
		var data = { 
			nom: encodeURI(document.querySelector('input[name="nom"]').value.trim()),
			mdp: encodeURI(document.querySelector('input[name="password"]').value),
			characters: [],
			mj: window.localStorage.getItem('token')
		}
		
		$.ajax({
			method: 'POST',
			url: "/store/game/",
			data: data
		})
		.done( res => {
			alert(`Partie ${$('input[name="nom"]').val().trim()} créée avec success !`)
			page_user()
		})
		.fail( res => cl(res))
	}

	function connexion(){
		for (field of document.querySelectorAll("input")){
			if (encodeURI(field.value) == "") {
				alert("Tous les champs doivent être remplis !!")
				return
			}
		}
		var data = { 
			nom: encodeURI(document.querySelector('input[name="user"]').value.trim()),
			mdp: encodeURI(document.querySelector('input[name="password"]').value),
		}
		
		$.ajax({
			method: 'get',
			url: "/store/user/",
			data: data
		})
		.done( res => {
			if (res == "NOT FOUND"){
				alert('Erreur dans les idantifiants')
				return
			}
			cl(res)
			print({ element: "a", innerText : '', href : "/", id:"in" }, Main)
			window.localStorage.setItem('token', res[0]._id)
			page_user()
		})
		.fail( res => cl(res))
	}

	function deconnexion(){
		window.localStorage.removeItem('token')

		page_login()
	}

	function creationPersonnage() {
			if (encodeURI(document.querySelector("input").value) == "") {
				alert("Donnez un nom au personngage !!")
				return
			}
			if (statistiques_globales.Force === 0) {
				alert('Ajoutez les statistiques du personnage !')
				return
			}

			if (!window.localStorage.token) {
				page_login()
				return
			}
	
			personnage = new Personnage(
				encodeURI(document.querySelector('input[name="nom"]').value.trim()),
				'Chevalier', 'Humain', 'Héro',
				statistiques_globales,
				window.localStorage.token
			)
			// cl(personnage)
		
		$.ajax({
			method: 'POST',
			url: "/store/character/",
			data: personnage
		})
		.done( res => cl(res))
		.fail( res => cl(res))
	}

function dashboard(){
	const 
		header = { 
			element : 'nav',
			className : 'navbar navbar-dark bg-primary  px-2',
			enfants: [
				{ 
					element: 'div',
					className: 'container d-flex justify-space-between',
					enfants : [
						{ element: 'h3', innerText: 'Accueil', className:'text-white', onclick: "page_user()" },
						{ element: 'div', innerText: 'Deconnexion', className:'btn btn-outline-light', onclick: "deconnexion()" },
					]
				}
			]
		}
	
		return header
}

function dices(n=1) {
	const arr = []
	do {
		const dice = n > 5 ? 6 : n;
		arr.push({
			element: "i",
			className: `bi bi-dice-${dice} mx-3`,
			style: "transform: scale(2); display: inherit;"
		})
		n -= dice
	} while(n)

	return {
		element: "div",
		className: "d-flex justify-content-center",
		enfants : arr
	}
}

function diceRoller(){

	return {
		element: "div",
		className: "card m-2",
		style:"width: 18rem;",
		enfants: [
			{
				element: "div",
				className: "card-header",
				innerText: "outil"
			},
			{
				element: "div",
				className: "card-body text-center",
				enfants : [
					{ 
						element: 'h5',
						className: 'mb-3',
						innerText: "Lancer le dé",
					},
					{
						element: "div",
						id: "dice-container",
						enfants : [dices()]
					},
					{ element: 'br'},
					{ 
						element: "div",
						className: "btn btn-primary", 
						innerText: "Go!",
						onclick: "print(dices(rollDice(20)), document.getElementById('dice-container'), true)"
					}
				]
			}
		]
	}
}

function accordion(name, list){
	const accordion_item = (item) => {
		// iem {name, title, text}
		return {
			element: "div",
			className: "accordion-item",
			enfants : [
				{ 
					element: "h2",
					className: "accordion-header",
					id: `heading-${item.name}`,
					enfants : [
						{
							element: "button", 
							className: "accordion-button collapsed",
							"attr/type": "button", 
							"attr/data-bts-toggle" : "collapse",
							"attr/data-bs-target" : `collapse${item.name}`,
							"attr/aria-expanded" : "false",
							"attr/aria-controls" : `collapse${item.name}`,
							innerText: item.title
						}
					]
				},
				{
					element: "div",
					id: `collapse${item.name}`,
					className: "accordion-collapse collapse",
					"attr/aria-labelledby": `heading-${item.name}`,
					"attr/data-bs-parent": name,
					enfants : [
						{
							element: "div",
							className: "accordion-body",
							enfants : [
								{ element: "p", innerText: item.text}
							]
						}
					]
				}
			]
		}
	},
	result = {
		element:"div", 
		className: "accordion",
		id: name,
		enfants : []
	}

	for (item of list) result.enfants.push(accordion_item(item))

	return result
}

function table_one_column(name, list){
	const 
		row = (item) => {
			return { 
				element: 'tr', 
				enfants: [
					{
						element: 'td', 
						innerText: item
					}
				]
			}
		},
		result = {
			element: 'table',
			className: 'table',
			enfants : [
				{
					element: 'thead',
					enfants : [
						{
							element: 'tr',
							enfants : [
								{
									element: 'th',
									"attr/scope": "col",
									innerText: name,
								}
							]
						}
					]
				},
				{
					element: 'tbody',
					enfants : [
						
					]
				}
			]
		}

	for (let item of list) result.enfants[1].enfants.push(row(item))

	return result
}

function table(list){
	const 
		row = (items) => {
			const row = {
				element: 'tr', 
				enfants : [ ]
			},
			row_item = (item)=> {
				this_row = {
					element: 'td', 
					"attr/scope" : "col",
				}

				if (typeof item === 'string') {
					return {
						element: 'td', 
						"attr/scope" : "col",
						innerText : item
					}
				} else {
					return {
						element: 'td', 
						"attr/scope" : "col",
						enfants: [ item ]
					}
				}
				
				return this_row
			}
			for (item of items) row.enfants.push(row_item(item))
			return row
		},
		head = (items) => {
			const head_row = {
				element: 'tr', 
				enfants : [ ]
			},
			head_item = (item)=> {
				return {
					element: 'th', 
					"attr/scope" : "col",
					innerText : item
				}
			}
			for (item of items) head_row.enfants.push(head_item(item))
			return head_row
		},
		result = {
			element: 'table',
			className: 'table',
			enfants : [
				{
					element: 'thead',
					enfants : [ ]
				},
				{
					element: 'tbody',
					enfants : [ ]
				}
			]
		}

	let index = 0

	for (items of list) {
		if (index == 0) {
			result.enfants[0].enfants.push(head(items))
			index++
			continue
		}
		result.enfants[1].enfants.push(row(items))
	}

	return result
}


function modal_selection_partie(){

}

function modal(modal_info){
  const modal = { 
    element: "div",
    className: "modal fade",
    id: modal_info.nom, 
    tabindex:"-1", 
    "attr/aria-labelledby":modal_info.nom, 
    "attr/aria-hidden":"true",
    enfants : [
      {
        element:'div',
        className: 'modal-dialog',
        enfants : [ 
          {
            element:'div',
            className: 'modal-content',
            enfants : [
              {
                element:'div',
                className: 'modal-header',
                enfants: [
                  {
                    element: 'h5',
                    className: 'modal-title', 
                    id: modal_info.nom+'label', 
                    innerText: modal_info.titre
                  },
                  {
                    element:"button", 
                    classname: "btn-close", 
                    "attr/data-bs-dismiss":"modal", 
                    "attr/aria-label":"Close"
                  }
                ]
              },
              {
                element:"div",
                className: "modal-body",
                enfants : [ ...modal_info.body]
              },
              {
                element:"div",
                className: "modal-footer",
                enfants : [
                  {
                    element: "button", 
                    className: "btn btn-secondary",
                    "attr/data-bs-dismiss": "modal", 
                    innerText: "Annuler"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
  return modal
}

function modal_scrolable(modal_info){
  result = modal(modal_info)
  result.enfants[0].className = "modal-dialog modal-dialog-scrollable"
  return result
}

function modal_buttons(modal_info){
	return {
		element: "button", 
		type: "button", 
		className: "btn btn-primary", 
		"attr/data-bs-toggle": "modal", 
		"attr/data-bs-target": "#"+modal_info.nom,
		innerHTML: modal_info.button
	}
}

function print(template, parent, flush){
	// cl(template)
	if (flush) parent.innerText = ""
	let element = document.createElement(template.element)

	for (let index in template ){
		if (index == 'element')continue
		else if (index == 'enfants'){ template[index].forEach( child => print( child, element) ) }
		// here be the magic
		else if (index == 'onclick') { element.setAttribute('onclick', template[index])}
		else if (index.split('/').length == 2) { element.setAttribute(index.split('/')[1], template[index])}
		else element[index] = template[index]
	}
	//element.innerText = 'tesst'

	parent.appendChild(element)
}

const Root = document.querySelector('.rendu')
print(dashboard(), Root)
print({element: "div", className:"container main mt-5"}, Root)

const Main = document.querySelector('.main')

page_login()