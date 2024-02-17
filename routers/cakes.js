const express = require('express');
const recipeRouter = require('./recipe');
const cakesRouter = express.Router();

const cakesArr = [{ name: 'cheese-cake', recipe: 'The ingredients for a family cake: 250 grams of Tnuva Canaan cheese 250 grams of Tnuva 5% white cheese 2 containers of sour cream/old cream 250 grams of sugar 50 grams of cornflour 50 grams of instant vanilla pudding 6 eggs', id: 1 }, { name: 'pinutes-cake', recipe: 'pinutes cake recipe', id: 2 }, { name: 'chocolate-cake', recipe: 'The ingredients for one cake: For the cake: 1 and ¾ cups (245 g) white flour ¾ cup (105 g) cocoa powder 1 and ½ cups (300 g) white sugar 1 teaspoon baking soda 1 teaspoon baking powder 1/2 teaspoon salt 1 cup (200 ml) l) sour cream 9% yield ¾ cup (185 ml) oil teaspoon vanilla extract 3 L-sized eggs cup (250 ml) boiling strong coffee (water + 2 tablespoons instant coffee beans) for the chocolate-coffee cream: 450 grams of chocolate bitters 1 and ½ containers (375 ml) sweet cream 32% "The White Chef" 80 grams of butter 2 tablespoons of ground instant coffee', id: 3 }];

cakesRouter.get('/', (req, res, next) => {

    res.send(`succss get cakes`);
    next();
})
cakesRouter.get('/list', (req, res, next) => {
    res.render('cakesList', {cakesArr:cakesArr})
})
cakesRouter.get('/:id', (req, res, next) => {
    const cakeId = (Number)(req.params.id);
    const ICake = cakesArr.find(cid => cid.id == cakeId);
    if (ICake) {
        res.send(ICake.recipe);
    }
    else {
        console.log('not icake number');
        const cakeName = (String)(req.params.id);
        console.log(cakeName);
            const ICakeString = cakesArr.find(cid => cid.name == cakeName);
            console.log(ICakeString);
            if (ICakeString) {
                res.send(ICakeString.recipe);
            }
            else
            {
                res.status(404).send('the cake not found')   
            }
       

        next();
    }})
// cakesRouter.get('/:name', (req, res, next) => {
//     const cakeId = (Number)(req.params.id);
//     const ICake = cakesArr.find(cid => cid.id == cakeId);
//     if (ICake) {
//         res.send(ICake.recipe);
//     }
//     else {
//         res.status(404).send('the cake id not found')
//     }
//     next();
// })



cakesRouter.use('/:id/recipe', recipeRouter)

module.exports = cakesRouter;