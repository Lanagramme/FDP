class Personnage {
	constructor(){
		this.nom
		this.niveau
		this.portrait
		this.statistiques
		this.inventaire
	}

	structure = {
		nom: 'string',
		niveau: 'number',
		portrait: 'string',
		statistiques: 'object',
		inventaire: 'array'
	}
}

function ficheDePerso(personnage){
	let nom = {
		type: "h1", class: 'nom',
		innerHtml: personnage.nom
	}
	
	let niveau = {
		type: "div",
		class: 'niveau',
		enfants: [
			{ type: 'span', innerHtml: 'Niveau' },
			{ type: 'h1', innerHtml: personnage.niveau }
		]
	}
	
	let tableauDesStats =()=> {
		obj = { type : 'div', class: 'tableauDesStats', enfants: [] }
		
		for (const [statistique, valeur ] in Personnage.statistiques){
			obj.enfants.push({
				type : 'div', class: 'stat field',
				enfants: [
					{ type: 'div', class: 'num', innerHtml: valeur },
					{ type: 'div', class: 'name', innerHtml: statistique}		
				]
			})
		}
		return obj
	}
	
	let header = {
		type: "header",
		enfants: [
			'nom',
			'niveau'
		],
	
	}

	let bandeauPresentation = {
		type: 'div',
		class: 'bandeauStats',
		enfants: [
			{
				type: 'div',
				class: 'portrait',
				enfant: [
					{
						type: 'img',
						class: 'image',
						href: personnage.portrait
					}
				]
			}, 
			tableauDesStats()
		]
	}

}


		
			




/*
{}{}{}{}{}{}{}






[][][][][][][]



*/
