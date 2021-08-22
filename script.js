cl = console.log
class Personnage {
	constructor(nom, classe, race, job){
		[ this.nom, this.classe, this.race, this.job ]=[ nom, classe, race, job ]
		this.portrait = ''
		this.niveau = 1
		this.inventaire = [{ name: 'Epée divine'}]
		
		this.statistiques = {
			Force : 6,
			Agilité : 6,
			Intelligence : 6,
			Chance : 7,
			Charisme : 6
		}
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

class Item {
	constructor (nom, illustration, description, prix, usage){
		[this.nom,this.illustration,this.description ,this.prix, this.usate] = [nom, illustration, description, prix, usage]
	}
}

function ficheDePerso(personnage){
	const 
		nom = {
			type: "h1", 
			className: 'nom',
			innerText: personnage.nom
		},
		niveau = {
			type: "div", 
			className: 'niveau',
			enfants: [
				{ type: 'span', innerText: 'Niveau' },
				{ type: 'h1', innerText: personnage.niveau }
			]
		},
		tableauDesStats =()=> {
			obj = { type : 'div', className: 'tableauDesStats', enfants: [] }
			obj.enfants.push(
				{
					type: 'div', className:'life', enfants:[{type: 'div', className: 'bar'}]
				}
			)
			
			for (const [statistique, valeur ] of Object.entries(personnage.statistiques)){
				obj.enfants.push({
					type: 'div', 
					className: 'stat field',
					enfants: [
						{ type: 'div', className: 'name', innerText: statistique}	,	
						{ type: 'div', className: 'num', innerText: valeur },
					]
				})
			}
			return obj
		},
		tableauDInventaire =()=> {
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
		},
		header = { type: "header", enfants: [ nom, niveau ] },
		bandeauPresentation = {
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
		},
		bandeauIdentite = {
			type: 'div', 
			className: 'bandeauIdentite',
			enfants: [
				{ type: 'div', innerText: personnage.classe},
				{ type: 'div', className: 'bl', innerText: personnage.race},
				{ type: 'div', className: 'bl', innerText: personnage.job},
			]
		},
		inventaire = {
			type: 'div', 
			className: 'inventaire',
			enfants: [
				{ type: 'h3', innerText: 'Inventaire' },
				tableauDInventaire()
			]
		}

	return {
		type: 'div',
		className: 'FicheDePerso',
		enfants: [
			header,
			bandeauPresentation,
			bandeauIdentite,
			inventaire
		]
	}
}

function ficheItem(item){
	const header = {
		type: "header",
		enfants: [
			{
				type: 'h3',
				innerText: item.nom
			}
		]
	},
	illustration = {
		type: 'img',
		className : 'illustration',
		href: item.illustration
	},
	desctiption = {
		type: 'p',
		innerText: item.description
	},
	prix = 	{
		type: 'div',
		className: 'prix',
		enfants: [
			{
				type: 'h3',
				innerText: item.prix
			}
		]
	}

	return {
		type: 'div',
		className: 'FicheItem',
		enfants: [
			header,
			illustration,
			desctiption,
			prix
		]
	}
}

let Arthur = new Personnage('Arthur', 'Chevalier', 'Humain', 'Héro')
let Potion = new Item('Potion','#', 'Une petite potion de soin', '1Go')
let Bandages = new Item('Bandages', '#', 'Bandelettes de gaze. Rends 5pv', '5Go', )
function print(template, parent){
	// cl(template)
	let element = document.createElement(template.type)

	for (let index in template ){
		if (index == 'type')continue
		else if (index == 'enfants'){ template[index].forEach( child => print( child, element) ) }
		//here be the magic
		else element[index] = template[index]
	}
	//element.innerText = 'tesst'

	parent.appendChild(element)
}

print(ficheDePerso(Arthur), document.getElementsByClassName('rendu')[0])
print(ficheItem(Potion), document.getElementsByClassName('rendu')[0])