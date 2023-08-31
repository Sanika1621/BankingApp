const Account = require("./Account.js")
const Bank = require("./Bank.js")

class Customer {

    static newuser = []
    static id = 0
    static InitialBalance = 1000

    constructor(firstName, lastName, isAdmin) {
        this.id = Customer.id++
        this.account = []
        this.firstName = firstName
        this.lastName = lastName
        this.InitialBalance = Customer.InitialBalance
        this.isAdmin = isAdmin
    }

    static newAdmin(firstName, lastName) {

        try {
            if (typeof firstName != 'string') {
                throw new Error('Invalid input')
            }
            if (typeof lastName != 'string') {
                throw new Error('Invalid input')
            }

            return new Customer(firstName, lastName, true)
        } catch (error) {
            console.log(error.message);
        }
    }

    newCustomer(firstName, lastName) {
        try {
            if (!this.isAdmin) {
                throw new Error('You are not admin')
            }
            if (typeof firstName != 'string') {
                throw new Error('Invalid input')
            }
            if (typeof lastName != 'string') {
                throw new Error('Invalid input')
            }
            let newCustomer = new Customer(firstName, lastName, false)
            Customer.newuser.push(newCustomer)
            return newCustomer

        } catch (error) {
            console.log(error.message);
        }
    }

    getAllCustomer() {
        try {
            if (!this.isAdmin) {
                throw new Error('You are not admin')
            }
            return Customer.newuser
        } catch (error) {
            console.log(error.message);
        }
    }
    #findCustomerid(customerid) {
        for (let index = 0; index < Customer.newuser.length; index++) {
            if (customerid == Customer.newuser[index].id) {
                return [Customer.newuser[index], index]
            }
        }
        return [null, -1]

    }

    #updateFirstName(newValue, indexofCustomer) {
        if (typeof newValue != 'string') {
            throw new Error('Invalid Parameter')
        }
        Customer.newuser[indexofCustomer].firstName = newValue

    }

    #updateLastName(newValue, indexofCustomer) {
        if (typeof newValue != 'string') {
            throw new Error('Invalid format')
        }
        Customer.newuser[indexofCustomer].lastName = newValue

    }

    updateCustomer(customerid, parameter, newValue) {
        try {
            if (!this.isAdmin) {
                throw new Error('You are not admin')
            }
            if (typeof customerid != 'number') {
                throw new Error('Enter valid input')
            }
            if (typeof parameter != 'string') {
                throw new Error('Enter valid input')
            }

            let [FoundCustomer, indexofCustomer] = this.#findCustomerid(customerid)
            if (indexofCustomer == -1) {
                throw new Error('Customer id not found')
            }
            switch (parameter) {
                case 'firstName':
                    this.#updateFirstName(newValue, indexofCustomer)
                    break;
                case 'lastName':
                    this.#updateLastName(newValue, indexofCustomer)
                    break;
                default:
                    throw new Error('No such parameter')
            }

        } catch (error) {
            throw new Error(error.message)
        }
    }

    deleteCustomer(customerid) {

        try {

            if (!this.isAdmin) {
                throw new Error('You are not admin')
            }
            if (typeof customerid != 'number') {
                throw new Error('Enter valid input')
            }
            let [FoundCustomer, indexofCustomer] = this.#findCustomerid(customerid)
            if (indexofCustomer == -1) {
                throw new Error('Customer id not found')
            }

            Customer.newuser.splice(indexofCustomer, 1)
        } catch (error) {
            throw new Error(error.message)
        }

    }

    createBank(fullname) {
        try {
            if (!this.isAdmin) {
                throw new Error('You are not admin')
            }
            Bank.createBank(fullname)

        } catch (error) {
            throw new Error(error.message)
        }


    }

    getAllBank() {

        try {
            if (!this.isAdmin) {
                throw new Error('You are not admin')
            }

            return Bank.getAllBank()

        } catch (error) {
            throw new Error(error.message)
        }
    }

    updateBank(bankid, parameter, newValue) {

        try {
            if (!this.isAdmin) {
                throw new Error('You are not admin')
            }
            Bank.updateBank(bankid, parameter, newValue)
        } catch (error) {
            throw new Error(error.message)
        }

    }

    deleteBank(bankid) {
        try {
            if (!this.isAdmin) {
                throw new Error('You are not admin')
            }
            Bank.deleteBank(bankid)
        } catch (error) {
            throw new Error(error.message)
        }
    }

    createAccount(bankid) {
        try {
            if (this.isAdmin) {
                throw new Error('Only user can create Account')
            }
            let bankfound = Bank.createAccount(bankid)
            let account = Account.createAccount(bankfound, this.InitialBalance)
            this.account.push(account)
            return account

        } catch (error) {
            throw new Error(error.message)
        }

    }

    getAllAccount() {
        try {
            if (this.isAdmin) {
                throw new Error('Only user can view Account details')
            }
            return this.account
        } catch (error) {
            throw new Error(error.message)
        }
    }

    #findAccount(accountid) {
        for (let index = 0; index < this.account.length; index++) {
            if (accountid == this.account[index].accountNo) {
                return [this.account[index], index]
            }
        }
        return [null, -1]

    }

    deleteAccount(accountid) {
        try {
            if (this.isAdmin) {
                throw new Error('Only user can delete Account')
            }
            let [FoundAccount, indexofAccount] = this.#findAccount(accountid)
            if (indexofAccount == -1) {
                throw new Error('Account No not found')
            }
            this.account.splice(indexofAccount, 1)

        } catch (error) {
            throw new Error(error.message)
        }
    }

    deposit(accountNo, amount) {
        try {
            if (this.isAdmin) {
                throw new Error('Only user can deposit money')
            }
            if (typeof amount != 'number') {
                throw new Error('Invalid Parameter')
            }

            let [FoundAccount, indexofAccount] = this.#findAccount(accountNo)
            if (FoundAccount == null) {
                throw new Error('Account No not found')
            }

            FoundAccount.deposit(amount, accountNo)
        } catch (error) {
            throw new Error(error.message)

        }
    }

    withdraw(accountNo, amount) {
        try {
            if (this.isAdmin) {
                throw new Error('Only user can withdraw money')
            }
            if (typeof amount != 'number') {
                throw new Error('Amount entered should be strictly in numerics')
            }

            let [FoundAccount, indexofAccount] = this.#findAccount(accountNo)
            if (FoundAccount == null) {
                throw new Error('Account No not found')
            }

            FoundAccount.withdraw(amount, accountNo)

        } catch (error) {
            throw new Error(error.message)
        }
    }


    transferTo(amount, senderid, receiverid, customerid) {
        try {
            if (this.isAdmin) {
                throw new Error('Only user can transfer money')
            }
            if (typeof amount != 'number') {
                throw new Error('Invalid parameter')
            }

            let [FoundCustomer, indexofCustomer] = this.#findCustomerid(customerid)
            if (FoundCustomer == null) {
                throw new Error('Customer id not found')
            }

            let [SenderAccount, indexofsender] = this.#findAccount(senderid)
            if (SenderAccount == null) {
                throw new Error('Sender Account No not found')
            }

            let [ReceiverAccount, indexofreceiver] = FoundCustomer.#findAccount(receiverid)
            if (ReceiverAccount == null) {
                throw new Error('Receiver Account No not found')
            }

            SenderAccount.send(amount, senderid, receiverid)
            ReceiverAccount.receive(amount, senderid, receiverid)

        } catch (error) {
            throw new Error(error.message)
        }
    }

    passbook(accountNo) {
        try {
            if (this.isAdmin) {
                throw new Error('Only user can have access to passbook')
            }

            let [FoundAccount, indexofAccount] = this.#findAccount(accountNo)
            if (FoundAccount == null) {
                throw new Error('Account No not found')
            }
            let passbookdetails = FoundAccount.getpassbook()
            return passbookdetails


        } catch (error) {
            console.log(error.message);
        } 
    }

}

module.exports = Customer
