const express = require('express');
const morgan = require('morgan');
const path = require('path')
const app = express();
//database
const products = [{
    id: 1,
    name: 'Laptop',
}, {
    id: 2,
    name: 'Laptop2',
}, ];

app.set('port', process.env.PORT || 3000);

//middleware
app.use(morgan('dev'))
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())
//routes
app.get('/products', (req, res) => {
    res.json(products)
})
app.post('/products', (req, res) => {
    const { name } = req.body //solo quiero el dato nombre del body 
    products.push({
        id:products.length+1,
        name:name
    })
    res.json('Success create')
})
app.put('/products/:id',(req,res)=>{
    const{ id }= req.params
    const {name}= req.body
    products.forEach((product,id)=>{
        if (product.id ==id){
            product.name = name;
        }
    })
    res.json('Success update')
})
app.delete('/products/:id',(req,res)=>{
    const { id }= req.params;
    products.forEach((product, i)=>{
        if(product.id ==id){
            products.splice(i,1)
        }
    })
    res.json('Sucess delete')
})
app.use(express.static(path.join(__dirname, '/public')))
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
})