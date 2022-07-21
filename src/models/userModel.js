const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

const User = {
    userListPath: path.resolve(__dirname, '../data/users.json'),
    getAll: function () {
        const userList = JSON.parse(fs.readFileSync(this.userListPath, 'utf8'));
        return userList;
    },
    findAll: function () {
        const userList = this.getAll();
        return userList;
    },
    find: function (id) {
        const userList = this.getAll();
        const user = userList.find(user => user.id == id);
        return user;
    },
    findByField: function (field, value) {
        const userList = this.getAll();
        const user = userList.find(user => user[field] == value);
        return user;
    },
    findAllByField: function (field, value) {
        const userList = this.getAll();
        const users = userList.filter(user => user[field] == value);
        return users;
    },
    validateUser: function (user) {
        const currentUser = this.findByField('username', user.username);
        if (currentUser) {
            if (bcrypt.compareSync(user.password, currentUser.password)) {
                return currentUser;
            }
        }
        throw new Error('Invalid username or password');
    },
    create: function (user) {
        try {
            let userList = this.findAll();
            user.id = uuid.v4();
            user.password = bcrypt.hashSync(user.password, 10);
            userList.push(user);
            fs.writeFileSync(this.userListPath, JSON.stringify(userList, null, 2));
            return user;
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