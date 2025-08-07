const faker = require("@faker-js/faker").faker;

class cadastroUtils {
    payloadUsuarioValido() {
        return {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            password: "teste123",
            administrador: "true"
        };
    }
}

module.exports = new cadastroUtils();