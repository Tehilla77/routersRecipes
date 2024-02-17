const express = require('express');
const recipeRouter = require('./recipe');
const cookiesRouter = express.Router();

const cookiesArr = [{name:'cheese-cookies',recipe:'cheese cookies recipe',id:1},{name:'pinutes-cookies',recipe:'pinutes cookies recipe',id:2},{name:'chocolate-cake',recipe:'chocolate cookies recipe',id:3}];

cookiesRouter.get('/', (req, res)=>{
    res.send(`succss get cookies`);
})
cookiesRouter.get('/list', (req, res, next) => {
    res.render('cookiesList', {cookiesArr:cookiesArr})
})
cookiesRouter.get('/:id', (req, res, next)=>{
    const cookieId = (Number)(req.params.id);
    const ICookie = cookiesArr.find(cid=> cid.id == cookieId);
    if (ICookie)
        {
            res.send(ICookie.recipe);
        }
        else{
            res.status(404).send('the cookies id not found')
        }
    next();
})

cookiesRouter.use('/:id/recipe', recipeRouter)


module.exports = cookiesRouter;