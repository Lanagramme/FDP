
class Personnage {
	constructor(nom, classe, race, job, statistiques){
		[ this.nom, this.classe, this.race, this.job, this.statistiques ]=[ nom, classe, race, job, statistiques ]
		this.portrait = ''
		this.niveau = 1
		this.inventaire = []
		this.or = 0
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
	empoche(x){
		this.inventaire.push(x)
		this.inventaire.sort((a, b) => (a.nom > b.nom) ? 1 : -1)
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
			element: "h1", 
			className: 'nom',
			innerText: personnage.nom
		},
		niveau = {
			element: "div", 
			className: 'niveau',
			enfants: [
				{ element: 'span', innerText: 'Niveau' },
				{ element: 'h1', innerText: personnage.niveau }
			]
		},
		tableauDesStats =()=> {
			obj = { element : 'div', className: 'tableauDesStats', enfants: [] }
			obj.enfants.push(
				{
					element: 'div', className:'life', enfants:[{element: 'div', className: 'bar'}]
				}
			)
			for (const [statistique, valeur ] of Object.entries(personnage.statistiques)){
				obj.enfants.push({
					element: 'div', 
					className: 'stat field',
					enfants: [
						{ element: 'div', className: 'name', innerText: statistique}	,	
						{ element: 'div', className: 'num', innerText: valeur },
					]
				})
			}
			return obj
		},
		tableauDInventaire =()=> {
			let obj ={ element: 'div', enfants: []	}
			
			for (i of personnage.inventaire){
				obj.enfants.push({
					element: 'div', 
					className: 'item field',
					enfants: [
						{ element: 'img', className: 'logo' }, 
						{ element: 'div', className: 'name', enfants: [
								{ element: 'p', innerText: i.nom }
							] 
						}
					]
				})
			}
			return obj
		},
		header = { element: "header", enfants: [ nom, niveau ] },
		bandeauPresentation = {
			element: 'div', 							
			className: 'bandeauStats',
			enfants: [
				{
					element: 'div', 
					className: 'portrait',
					enfant: [
						{
							element: 'img', 
							className: 'image',
							href: personnage.portrait
						}
					]
				},
				tableauDesStats()
			]
		},
		bandeauIdentite = {
			element: 'div', 
			className: 'bandeauIdentite',
			enfants: [
				{ element: 'div', innerText: personnage.classe},
				{ element: 'div', className: 'bl', innerText: personnage.race},
				{ element: 'div', className: 'bl', innerText: personnage.job},
			]
		},
		inventaire = {
			element: 'div', 
			className: 'inventaire',
			enfants: [
				{ element: 'h3', innerText: 'Inventaire' },
				tableauDInventaire()
			]
		}

	return {
		element: 'div',
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
		element: "header",
		enfants: [
			{
				element: 'h3',
				innerText: item.nom
			}
		]
	},
	illustration = {
		element: 'img',
		className : 'illustration',
		href: item.illustration
	},
	desctiption = {
		element: 'p',
		innerText: item.description
	},
	prix = 	{
		element: 'div',
		className: 'prix',
		enfants: [
			{
				element: 'h3',
				innerText: item.prix
			}
		]
	}

	return {
		element: 'div',
		className: 'FicheItem',
		enfants: [
			header,
			illustration,
			desctiption,
			prix 
		]
	}
}

let stat_arthur =  {
	Force : 6,
	Agilité : 6,
	Intelligence : 6,
	Chance : 7,
	Charisme : 6
}
let Arthur = new Personnage('Arthur', 'Chevalier', 'Humain', 'Héro', stat_arthur)
let Alice = new Personnage('Alice', 'Chevalier', 'Humaine', 'Epeiste', stat_arthur)
let Alastar = new Personnage('Alastar', 'Paysan mage', 'Humaine', 'Boulanger', stat_arthur)
let Potion = new Item('Potion','#', 'Une petite potion de soin', '1Go')
let Bandages = new Item('Bandages', '#', 'Bandelettes de gaze. Rends 5pv', '5Go', )
let Epee_divine = new Item('Epée divine', '#', `Selon la légende elle peut trancher le ciel`, '50000Go', )
let Rapiere = new Item('Rapière', '#', `Légère et élégante, un arme digne d'un noble`, '500Go', )

Arthur.empoche(Epee_divine)
Alice.empoche(Rapiere)
Alastar.empoche(Potion)
Alastar.empoche(Bandages)


const liste_personages = [Arthur, Alastar, Alice]
const liste_items = [Potion, Bandages, Epee_divine, Rapiere]

liste_items.sort((a, b) => (a.nom > b.nom) ? 1 : -1)
liste_personages.sort((a, b) => (a.nom > b.nom) ? 1 : -1)

