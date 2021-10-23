
// récupérer les infor du perso dans la base

// 

print({element: "h1", innerText: "Users", domclass: "mb-3"}, Main)
print({ element: "div", className: "d-flex flex-wrap players"},Main)
print({element: "h1", innerText: "Items", domclass: "mb-3"}, Main)
print({ element: "div", className: "d-flex flex-wrap items"},Main)

Players = document.querySelector('.players')
Items = document.querySelector('.items')

for (player of liste_personages) print(ficheDePerso(player), Players)

for (item of liste_items) print(ficheItem(item), Items)
// print(ficheItem(Potion), Main)