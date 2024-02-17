const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cakesRouter = require('./routers/cakes.js');
const cookiesRouter = require('./routers/cookies.js');

app.set('view engine','ejs')

function userMiddleWare(req, res, next) {
    const user = {
        id: '326381837',
        name: 'Tehilla',
        isAdmin: true
    }
    req.user = user;
    next();
}
app.get('/',(req,res)=>{
    res.render('home',{title: 'home'});
})
app.use(userMiddleWare);
app.use(dateLogger, urlLogger);

app.use('/cakes', (req, res, next) => {
    console.log("cakes router is called");
    next();
}, cakesRouter, (req, res, next) => {
    console.log("after cakes router is called");
});

app.use('/cookies', cookiesRouter);

function dateLogger(req, res, next) {
    const filePath = path.join(__dirname, 'views', 'logger.txt');
    const writeDate = { date: new Date().toLocaleDateString() };
    fs.appendFileSync(filePath,JSON.stringify(writeDate),(err)=>{
        console.log(err);
    })

    next();
}

function urlLogger(req, res, next) {
    const filePath = path.join(__dirname, 'views', 'logger.txt');
    const writeUser = `User: ${req.user.id} URL: ${req.url}`
    fs.appendFile(filePath, JSON.stringify(writeUser), (err) => {
        if (err) {
            console.log('ERROR!!!', err)
            process.exit(1);
        }
    })
    next();
}

app.use('*', (req, res) => {
    res.render('notFound')
});


app.listen(5000, () => {
    console.log('app is listening on port 5000')
})

