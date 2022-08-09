const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const db = require('../database/models');

const User = {
    userListPath: path.resolve(__dirname, '../data/users.json'),
    getAll: function () {
        //const userList = JSON.parse(fs.readFileSync(this.userListPath, 'utf8'));
        const userList = db.Users.findAll({
            where: {
                deletedAt: null
            }
        });

        return userList;
    },
    findAll: function () {
        const userList = this.getAll();
        return userList;
    },
    find: function (pk) {
        // const userList = this.getAll();
        // const user = userList.find(user => user.id == id);
        const user = db.Users.findByPk(pk);
        return user;
    },
    findByField: function (field, value) {
        // const userList = this.getAll();
        // const user = userList.find(user => user[field] == value);
        const user = db.Users.findOne({
            where: {
                [field]: value,
                deletedAt: null
            }
        });

        return user;        
    },
    findAllByField: function (field, value) {
        // const userList = this.getAll();
        // const users = userList.filter(user => user[field] == value);
        const users = Users.findAll({
            where: {
                [field]: value,
                deletedAt: null
            }
        });

        return users;
    },
    validateUser: async function (user) {
        try {
            const currentUser = await this.findByField('email', user.email);

            if (!currentUser) {
                return false;
            }

            const isValid = await bcrypt.compare(user.password, currentUser.password);

            if (!isValid) {
                return false;
            }

            return currentUser;
            
        } catch (error) {
            return Promise.reject(error);
        }
    },
    create: function (user) {
        try {
            let userList = this.findAll();
            let userExists = this.findByField('username', user.username);
            if (userExists) {
                throw new Error('User already exists');
            }
            console.log(userExists);

            let newUser = {
                id: uuid.v4(),
                name: user.name,
                username: user.username,
                password: bcrypt.hashSync(user.password, 10),
                createdAt: new Date(),
                updatedAt: new Date()
            };

            userList.push(newUser);

            fs.writeFileSync(this.userListPath, JSON.stringify(userList, null, 2));
            return newUser;
        } catch (error) {
            return { error, message: 'Error creating user' };
        }
    },
    update: function (id, data) {
        try {
            let currentUser = this.find(id);
            if (currentUser) {
                let userList = this.getAll();
                let userIndex = userList.findIndex(user => user.id == id);
                userList[userIndex] = data;
                fs.writeFileSync(this.userListPath, JSON.stringify(userList, null, 2));
            } else {
                throw new Error('User not found');
            }
            return data;
        } catch (error) {
            return null;
        }
    },
    delete: function (id) {
        try {
            let currentUser = this.find(id);
            if (currentUser) {
                let userList = this.getAll();
                let userIndex = userList.findIndex(user => user.id == id);
                userList.splice(userIndex, 1);
                fs.writeFileSync(this.userListPath, JSON.stringify(userList, null, 2));
            } else {
                throw new Error('User not found');
            }
            return true;
        } catch (error) {
            return false;
        }
    }
}

module.exports = User;