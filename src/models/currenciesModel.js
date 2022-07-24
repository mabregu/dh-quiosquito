const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const CurrencyModel = {
    currencyListPath: path.resolve(__dirname, '../data/currencies.json'),
    getAll: function () {
        const currencyList = JSON.parse(fs.readFileSync(this.currencyListPath, 'utf8'));
        return currencyList;
    },
    findAll: function () {
        const currencyList = this.getAll();
        return currencyList;
    },
    find: function (id) {
        const currencyList = this.getAll();
        const currency = currencyList.find(currency => currency.id == id);
        return currency;
    },
    findByField: function (field, value) {
        const currencyList = this.getAll();
        const currency = currencyList.find(currency => currency[field] == value);
        return currency;
    },
    findAllByField: function (field, value) {
        const currencyList = this.getAll();
        const currencies = currencyList.filter(currency => currency[field] == value);
        return currencies;
    },
    create: function (currency) {
        try {
            let currencyList = this.findAll();
            currency.id = uuid.v4();
            currencyList.push(currency);
            fs.writeFileSync(this.currencyListPath, JSON.stringify(currencyList, null, 2));
            return currency;
        } catch (error) {
            return { error, message: 'Error creating currency' };
        }
    },
    update: function (id, data) {
        try {
            let currentCurrency = this.find(id);
            if (currentCurrency) {
                let currencyList = this.getAll();
                let currencyIndex = currencyList.findIndex(currency => currency.id == id);
                currencyList[currencyIndex] = data;
                fs.writeFileSync(this.currencyListPath, JSON.stringify(currencyList, null, 2));
            } else {
                return { error: 'Currency not found' };
            }
        } catch (error) {
            return { error, message: 'Error updating currency' };
        }
    },
    delete: function (id) {
        try {
            let currentCurrency = this.find(id);
            if (currentCurrency) {
                let currencyList = this.getAll();
                let currencyIndex = currencyList.findIndex(currency => currency.id == id);
                currencyList.splice(currencyIndex, 1);
                fs.writeFileSync(this.currencyListPath, JSON.stringify(currencyList, null, 2));
            } else {
                return { error: 'Currency not found' };
            }
        } catch (error) {
            return { error, message: 'Error deleting currency' };
        }
    }
}

module.exports = CurrencyModel;