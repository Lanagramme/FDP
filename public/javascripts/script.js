cl = console.log

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
		nom: encodeURI(document.querySelector('input[name="user"]').value),
		mdp: encodeURI(document.querySelector('input[name="password"]').value),
	}
	
	$.ajax({
		method: 'POST',
		url: "/inscription",
		data: data
	})
	.done( () => window.location = "/" )
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