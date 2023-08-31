class Transaction {
    static id = 0
    constructor(date, amount, senderid, receiverid,Typeoftransaction, currentbalance) {
        this.transactionid = Transaction.id++
        this.date = date
        this.amount = amount
        this.senderid = senderid
        this.receiverid = receiverid
        this.Typeoftransaction = Typeoftransaction
        this.currentbalance = currentbalance
        
    }

    static createTransaction(date, amount, senderid, receiverid,typeoftransaction,currentbalance) {
        return new Transaction(date, amount, senderid, receiverid,typeoftransaction,currentbalance)
    }



}

module.exports = Transaction
