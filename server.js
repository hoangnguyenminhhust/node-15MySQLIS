var mysql = require('mysql');
var faker = require('faker')
var express = require('express');
const test = require('./test')
var app = express();

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "theanh"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!!!")

});

var index = 0

var startTime = Date.now()

async function auto_insert(a) {

    let username = faker.name.lastName()
    let phone = faker.phone.phoneNumber()
    let name = faker.name.findName()
    let age = faker.random.number(90)
    let country = faker.address.country()
    let address = faker.address.streetAddress()
    let $Sql = 'INSERT INTO User(username,phone,name,age,country,address)VALUES("' + username + '","' + phone + '","' + name + '",' + age + ',"' + country + '","' + address + '")';

    await con.query($Sql)
    if (index < a) {
        index += 1
        process.nextTick(auto_insert, a);
    } else {
        console.log(Date.now() - startTime)
    }
}
auto_insert(1000)

app.listen(3000, function () {
    console.log('Node server running @ http://localhost:3000')
})