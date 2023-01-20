require('dotenv').config();
// Crater is a external service that is used to generate invoices and send them to the customer.
const url = process.env.API_CRATER || 'http://localhost:8080';
const email = process.env.API_CRATER_EMAIL;
const password = process.env.API_CRATER_PASSWORD;
const crater = {
    auth: function() {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        let raw = JSON.stringify({
            "username": email,
            "password": password,
            "device_name": "plataforma-web-quiosquito"
        });
        
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        
        return fetch(url + "/api/v1/auth/login", requestOptions)
    },
    checkToken: function() {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + process.env.API_CRATER_TOKEN);
        
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        
        return fetch(url + "/api/v1/auth/check", requestOptions)
    },
    createCustomer: function(customer) {
        if (! this.checkToken()) {
            this.auth();
        }
        
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + process.env.API_CRATER_TOKEN);
        myHeaders.append("Content-Type", "application/json");
        
        let raw = JSON.stringify({
            "name": customer.name,
            "email": customer.email,
            "password": customer.password,
            "enable_portal": true,
            "currency_id": 25,
            "billing": [],
            "shipping": []
        });
        
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        
        return fetch(url + "/api/v1/customers", requestOptions)
    },
}

module.exports = crater;