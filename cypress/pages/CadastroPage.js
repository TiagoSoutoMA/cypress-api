const cadastroUtils = require("../utils/cadastroUtils");

class CadastroPage {

    realizarCadastro(payload) {
        cy.request({
            method: 'POST',
            url: '/usuarios',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: payload,
            failOnStatusCode: false
        }).then((response) => {
            if (response.status === 201) {
                expect(response.status).to.eq(201);
                expect(response.body.message).to.eq('Cadastro realizado com sucesso');
                expect(response.body._id).to.exist;
            } 
            else if (response.status === 400) {
                expect(response.status).to.eq(400);
                if (response.body.message) {
                    expect(response.body.message).to.eq('Este email já está sendo usado');
                } 
                else if (response.body.email.includes('email deve ser um email válido')) {
                    expect(response.body.email).to.eq('email deve ser um email válido');
                }
                else {
                    expect(response.body.nome).to.eq('nome não pode ficar em branco');
                    expect(response.body.email).to.eq('email não pode ficar em branco');
                    expect(response.body.password).to.eq('password não pode ficar em branco');
                    expect(response.body.administrador).to.eq("administrador deve ser 'true' ou 'false'");
                }
            }
        });
    }
}

module.exports = new CadastroPage();