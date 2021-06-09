export function IngredData() {
    return [
        { "title": "shrimp"},
        { "title": "onion"},
        { "title": "bacon"},
        { "title": "cornstarch"},
        { "title": "salt"},
        { "title": "pepper"},
        { "title": "vegtable oil"},
        { "title": "coconut milk"},
        { "title": "condensed milk"},
        { "title": "mayonaise"},
        { "title": "marinara sauce"},
        { "title": "cheese ravioli"},
        { "title": "mozzarella cheese"},
        { "title": "ground beef"},
        { "title": "garlic"},
        { "title": "dried oregano"},
        { "title": "ricotta cheese"},
        { "title": "egg"},
        { "title": "parsley"},
        { "title": "soy sauce"},
        { "title": "parmesan cheese"},
        { "title": "oyster sauce"},
        { "title": "rice vinegar"},
        { "title": "sesame oil"},
        { "title": "brown sugar"},
        { "title": "sriracha sauce"},
        { "title": "water"},
        { "title": "broccoli"},
        { "title": "green onion"},
        { "title": "sesame seeds"},
        { "title": "chicken breasts"},
        { "title": "italian seasoning"},
        { "title": "garlic powder"},
        { "title": "yellow onion"},
        { "title": "pasta"},
        { "title": "olive oil"},
        { "title": "white wine"},
        { "title": "lemon juice"},
        { "title": "butter"},
        { "title": "linguini"},
        { "title": "cream of chicken soup"},
        { "title": "sour cream"},
        { "title": "chicken broth"},
        { "title": "active dry yeast"},
        { "title": "plain yogurt"},
        { "title": "bread flour"},
        { "title": "cilantro"},
        { "title": "milk"},
        { "title": "egg yolks"},
        { "title": "vanilla extract"},
        { "title": "flour"},
        { "title": "sugar"}
    ]
}

export function renderIngredName(state, val) {
    return (
        state.title.toLowerCase().indexOf(val.toLowerCase()) !== -1
    );
}