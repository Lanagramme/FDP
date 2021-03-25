cl = console.log
class Personnage {
	constructor(nom, classe, race, job){
		[ this.nom, this.classe, this.race, this.job ]=[ nom, classe, race, job ]
		this.portrait = ''
		
		this.statistiques = {
			Force : 6,
			Agilité : 6,
			Intelligence : 6,
			Chance : 7,
			Charisme : 6
		}
		
		this.niveau = 1
		this.inventaire = [{ name: 'Epée divine'}]
	}

	structure = {
		nom: 'string',
		niveau: 'number',
		portrait: 'string',
		statistiques: 'object',
		inventaire: 'array',
		classe: 'string',
		race: 'string',
		job: 'string'
	}
}

function ficheDePerso(personnage){
	let nom = {
		type: "h1", 
		className: 'nom',
		innerText: personnage.nom
	}
	
	let niveau = {
		type: "div", 
		className: 'niveau',
		enfants: [
			{ type: 'span', innerText: 'Niveau' },
			{ type: 'h1', innerText: personnage.niveau }
		]
	}
	
	let tableauDesStats =()=> {
		obj = { type : 'div', className: 'tableauDesStats', enfants: [] }
		
		for (const [statistique, valeur ] in personnage.statistiques){
			obj.enfants.push({
				type: 'div', 
				className: 'stat field',
				enfants: [
					{ type: 'div', className: 'num', innerText: valeur },
					{ type: 'div', className: 'name', innerText: statistique}		
				]
			})
		}
		return obj
	}
	
	let tableauDInventaire =()=> {
		let obj ={ type: 'div', enfants: []	}
		
		for (i of personnage.inventaire){
			obj.enfants.push({
				type: 'div', 
				className: 'item field',
				enfants: [
					{ type: 'img', className: 'logo' }, 
					{ type: 'div', className: 'name', enfants: [
							{ type: 'p', innerText: i.name }
						] 
					}
				]
			})
		}
		return obj
	}
	
	let header = { type: "header", enfants: [ nom, niveau ] }
	
	let bandeauPresentation = {
		type: 'div', 
		className: 'bandeauStats',
		enfants: [
			{
				type: 'div', 
				className: 'portrait',
				enfant: [
					{
						type: 'img', 
						className: 'image',
						href: personnage.portrait
					}
				]
			},
			tableauDesStats()
		]
	}
	
	let bandeauIdentite = {
		type: 'div', 
		className: 'bandeauIdentite',
		enfants: [
			{ type: 'div', innerText: personnage.class},
			{ type: 'div', className: 'bl', innerText: personnage.race},
			{ type: 'div', className: 'bl', innerText: personnage.job},
		]
	}
	
	let inventaire = {
		type: 'div', 
		className: 'inventaire',
		enfants: [
			{ type: 'h3', innerText: 'Inventaire' },
			tableauDInventaire()
		]
	}
	
	return {
		type: 'div',
		className: 'ficheDePerso',
		enfants: [
			header,
			bandeauPresentation,
			bandeauIdentite,
			inventaire
		]
	}
}

let Arthur = new Personnage('Arthur', 'Chevalier', 'Humain', 'Héro')
console.log(ficheDePerso(Arthur))

function print(template){
	let element = document.createElement(template.type)

	for (let index in template ){
		if (index == 'type')continue
		else if (index == 'enfants'){}
		else element[index] = template[index]
	}
	element.innerText = 'tesst'

	document.getElementsByClassName('rendu')[0].appendChild(element)
	console.log(element)


}

print(ficheDePerso(Arthur))

/*
{}{}{}{}{}{}{}{}{}
[][][][][][][]
[{},][{},][{},][{},][{},][{},]
*/
 