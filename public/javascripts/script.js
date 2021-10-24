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
		return Math.floor(Math.random() * max) +1;
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
				{ element: "button", /**type: "submit", */ className: "btn btn-primary", innerText: "Connecter", action: "inscription()"}
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
			url: "/store/users/",
			data: data
		})
		.done( res => cl(res))
		.fail( res => cl(res))
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
	
			personnage = new Personnage(
				encodeURI(document.querySelector('input[name="nom"]').value.trim()),
				'Chevalier', 'Humain', 'Héro',
				statistiques_globales
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
			className : 'navbar navbar-dark bg-primary d-flex flex-row-reverse px-2',
			enfants: [
				{ element: 'a', innerText: 'Deconnexion', className:'btn btn-outline-light', href: '/' },
			]
		}
	
		return header
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
						element: "i",
						className: "bi bi-dice-2",
						style: "transform: scale(2); display: inherit;"
					},
					{ element: 'br'},
					{ 
						element: "div",
						className: "btn btn-primary", 
						innerText: "Go!"
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
				element: 'td', 
				innerText: item
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
						{ element: 'tr', enfants: []}
					]
				}
			]
		}

	for (let item of list) result.enfants[2].enfants.push(row(item))

	return result
}

function print(template, parent){
	// cl(template)
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
print({element: "div", className:"container main"}, Root)

const Main = document.querySelector('.main')