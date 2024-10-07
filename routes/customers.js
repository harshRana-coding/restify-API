// const Server = require('restify/lib/server');
const config = require('../config');
const Customer = require('../models/Customer');
module.exports = server => {
    //Get customers

    server.get('/customers', (req, res, next) => {
        Customer.find().then(customers => {
            if(customers.length == 0){
                res.statusCode = 204;
                res.send("No customers found !");
                next();
            }
            res.statusCode = 200;
            res.send(customers);
            next();
        }).catch(err => console.log(err));
    });

    //Get Single Customer
    server.get('/customers/:id', (req, res, next) => {
        const Id = req.params.id;
        Customer.findById(Id).then(customer => {
            if(!customer){
                res.statusCode = 204;
                res.send(`No User with the ID : ${Id} was found.`);
                next();
            }
            res.statusCode = 200;
            res.send(customer);
            next();
        }).catch(err => {
            console.log(err);
        })
    });

    //Add Customer

    server.post('/customers', (req, res, next) => {
        const name = req.body.name;
        const email = req.body.email;
        const balance = req.body.balance;
        const newCustomer = new Customer({
            name: name,
            email: email,
            balance: balance
        });
        newCustomer.save().then(cust => {
            console.log('New customer added');
            res.statusCode = 201;
            res.send(`A new customer ${name} is added with balance ${balance}`);
            next();
        }).catch(err => console.log(err));
    });

    //Update Customer 
    
    server.put('/customers/:id', (req,res,next) => {
        Customer.findByIdAndUpdate({_id : req.params.id}, req.body).then(mssg => {
            console.log("customer data updated");
            res.send("Updated!!");
            next();
        }).catch(err => console.log(err));
    });

    //delete customer

    server.del('/customers/:id', (req,res,next)=> {
        Customer.findByIdAndDelete(req.params.id).then(mssg => {
            console.log("customer deleted");
            res.statusCode = 204;
            res.send("Customer removed!");
            next();
        }).catch(err => console.log(err));
    })

}