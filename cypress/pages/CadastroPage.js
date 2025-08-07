const cadastroUtils = require("../utils/cadastroUtils");

class CadastroPage {

    realizarCadastro(payload) {
        cy.request({
            method: 'POST',
            url: '/usuarios',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: payload
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.message).to.eq('Cadastro realizado com sucesso');
            expect(response.body._id).to.exist;
        });
    }
}

module.exports = new CadastroPage();