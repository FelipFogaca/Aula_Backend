class User {
    constructor() {
        this.users = []
        this.idCounter = 1;
    }

    getAll() {
        return this.users;
    }

    getById(id) {
        return this.users.find(u => u.id === id);
    }

    create(email, password, name) {
        const newUser = {
            id: this.idCounter++,
            email,
            password,
            name
        };
        this.users.push(newUser);

        return newUser;
    } 

    update(id, email, password, name) {
        const index = this.users.findIndex(u => u.id === id);

        if (index
            === -1) {
            return null;
        };
        this.users[index] = {
            ...this.users[index],
            email,
            password,
            name
        };

        return this.users[index];
    }

    delete(id) {
        const index = this.users.findIndex(u => u.id === id);

        if (index === -1) {
            return null;
        };

        this.users.splice(index, 1);
        return null;
    }

}

module.exports = new User(); // Exporta a classe