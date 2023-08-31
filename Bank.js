class Bank {
    static id = 0
    static bank = []
    constructor(fullName, Abbrevation) {
        this.id = Bank.id++
        this.fullName = fullName
        this.Abbrevation = Abbrevation
    }

    static createBank(fullName) {
        if (typeof fullName != 'string') {
            throw new Error('Invalid input')
        }
        let abbrevation = fullName.split(' ').map(x => x.charAt(0)).join('')
        let bank = new Bank(fullName, abbrevation)
        let newbank = Bank.bank.push(bank)
        return newbank
    }

    static getAllBank() {
        return Bank.bank
    }
    
    static #findBank(bankid) {
        for (let index = 0; index < Bank.bank.length; index++) {
            if (bankid == Bank.bank[index].id) {
                return [Bank.bank[index], index]
            }
        }
        return [null, -1]
    }

    updateNameandAbbrevation(newValue) {
        if (typeof newValue != 'string') {
            throw new Error('Invalid new content')
        }
        this.fullName = newValue
        this.Abbrevation = newValue.split(' ').map(x => x.charAt(0)).join('')
    }


    static updateBank(bankid, parameter, newValue) {
        if (typeof bankid != 'number') {
            throw new Error('Invalid Input')
        }
        if (typeof parameter != 'string') {
            throw new Error('Invalid Input')
        }
        if (typeof newValue != 'string') {
            throw new Error('Invalid Input')
        }

        let [FoundBank, getindexofbank] = Bank.#findBank(bankid)
        if (FoundBank == null) {
            throw new Error('Bank id  not found')
        }

        switch (parameter) {
            case 'fullName':
                FoundBank.updateNameandAbbrevation(newValue)
                break
            default:
                throw new Error('No such parameter')
        }

    }

    static deleteBank(bankid) {
        if (typeof bankid != 'number') {
            throw new Error('Invalid Input')
        }
        let [FoundBank, getindexofbank] = Bank.#findBank(bankid)

        if (getindexofbank == -1) {
            throw new Error('Bank id  not found')
        }
        Bank.bank.splice(getindexofbank, 1)
    }

    static createAccount(bankid) {
        if (typeof bankid != 'number') {
            throw new Error('Invalid bank id')
        }

        let [FoundBank, getindexofbank] = Bank.#findBank(bankid)
        if (FoundBank == null) {
            throw new Error('Bank id  not found')
        }

        return FoundBank.fullName

    }


}

module.exports = Bank
