const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const cadastroUtils = require("../../utils/cadastroUtils");
const cadastroPage = require("../../pages/CadastroPage");

let payload;
When("o usuário informa os dados obrigatórios corretos", () => {
  payload = cadastroUtils.payloadUsuarioValido();
});

Then("o sistema deve cadastrar o usuário com sucesso", () => {
  cadastroPage.realizarCadastro(payload);
});
