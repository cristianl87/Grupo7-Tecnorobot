const fs = require('fs');
const path = require('path');

const folderData = path.join(__dirname, '../data');

const usersJSON = fs.readFileSync(folderData + '/user.json', 'utf-8');
let allUsers = JSON.parse(usersJSON);

const User = {
    getAllUsers: function() {
        return allUsers;
    },
    findByField: function(field, text) {
        let users = this.getAllUsers();
        let user = users.filter(user => user[field] === text);
        return user;
    },
    create: function(userInfo) {
        let users = this.getAllUsers();
        users.push(userInfo);
        const usersString = JSON.stringify(users, null, " ");
        fs.writeFileSync(folderData + '/user.json', usersString);

        return true;
    },
    edit: function(req) {
        let users = this.getAllUsers();
        console.log(req.session.userLogueado.email)
        let userToEdit = users.find((user) =>{
            return user.email == req.session.userLogueado.email;
        })
        let image;
        if(req.file) {
            image = req.file.filename;
        }else {
            image = userToEdit.image
        }
        userToEdit.name = req.body.username;
        userToEdit.email = req.body.email;
        userToEdit.celular = req.body.tel;
<<<<<<< HEAD
        userToEdit.image = req.file.filename || userToEdit.image ;
=======
        userToEdit.image = image;
>>>>>>> f86079513b4d2fc183d582a22cf8a5a72a571a81

        req.session.userLogueado = userToEdit

        let usersJSON = JSON.stringify(users, null, " ")
        fs.writeFileSync(folderData + '/user.json', usersJSON);
    }
}

module.exports = User;
