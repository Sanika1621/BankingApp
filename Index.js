const Customer = require("./Customer.js");

let g1 = Customer.newAdmin('Sanika', 'Shinde')
//console.log(admin)

let user1 = g1.newCustomer('Gaurav', 'Som')
let user2 = g1.newCustomer('Richa', 'singh')

console.log(g1.getAllCustomer());

// g1.updateCustomer(2, 'firstName', 'Deep')
// console.log(g1.getAllCustomer());

// g1.deleteCustomer(2)
// console.log(g1.getAllCustomer());

g1.createBank('State Bank of India')
g1.createBank('Housing Development Finance Corporation')
// g1.createBank('Icici Bank')
//console.log(g1.getAllBank());
// g1.deleteBank(1)
// console.log(g1.getAllBank());

//update bankname
g1.updateBank(1, 'fullName', 'Punjab National Bank')
console.log(g1.getAllBank());
//customer
user1.createAccount(0)
user2.createAccount(1)
//console.log(user1.getAllAccount())
//console.log(user2.getAllAccount())

//deposit
user1.deposit(0, 2000)
console.log(user1.getAllAccount())
user2.deposit(1, 3000)
console.log(user2.getAllAccount())

//withdraw
user2.withdraw(1, 500)
console.log(user2.getAllAccount())

//transfer
user1.transferTo(500, 0, 1, 2)
console.log(user1.getAllAccount())
console.log(user2.getAllAccount())

//passbook
// console.log(user1.passbook(0));
