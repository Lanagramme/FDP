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

function rollDice(max) {
  return Math.floor(Math.random() * max) +1;
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
			{ element: "div", innerText : "Ajouter les statistiques", className: "btn btn-primary", onclick: "rollStats()"},
			{ element: "div", enfants: [], id: "stat_sheet"},
			{ element: "div", /**type: "submit", */ className: "btn btn-primary", innerText: "Créer personnage", onclick: "creationPersonnage()"},
		]
	}

	for (statistique of liste_statistiques) 
		result.enfants[3].enfants.push(ajouter_statistique({nom: statistique, valeur : "0"}))

	return result;
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
		cl(personnage)
	
	// $.ajax({
	// 	method: 'POST',
	// 	url: "/store/character/",
	// 	data: personnage
	// })
	// .done( res => cl(res))
	// .fail( res => cl(res))
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
		url: "/inscription",
		data: data
	})
	.done( res => cl(res))
	.fail( res => cl(res))
}

function print(template, parent){
	// cl(template)
	let element = document.createElement(template.element)

	for (let index in template ){
		if (index == 'element')continue
		else if (index == 'enfants'){ template[index].forEach( child => print( child, element) ) }
		// here be the magic
		else if (index == 'onclick') { element.setAttribute('onclick', template[index])}
		else element[index] = template[index]
	}
	//element.innerText = 'tesst'

	parent.appendChild(element)
}

const Root = document.querySelector('.rendu')
print(dashboard(), Root)
print({element: "div", className:"container main"}, Root)

const Main = document.querySelector('.main')