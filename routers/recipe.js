const express = require('express');
const recipeRouter = express.Router();

recipeRouter.get('/', (req, res)=>{
    res.send(`succss get recipe`);
})


recipeRouter.get('/:id', (req, res)=>{
    if(req.user.isAdmin){
        res.send(`succss get recipe id: ${req.params.id}`);

    }else {
        res.send('Not allowed')
    }
})

module.exports = recipeRouter;