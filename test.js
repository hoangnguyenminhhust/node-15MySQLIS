const faker = require('faker');
var mysql = require('mysql');
const con = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "",
    database: "theanh"
})

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
        process.nextTick(auto_insert, index);
    } else {
        console.log(Date.now() - startTime)
    }
}

auto_insert(1000)