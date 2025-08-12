const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const cadastroUtils = require("../../utils/cadastroUtils");
const cadastroPage = require("../../pages/CadastroPage");

let payload;
let email;

When("o usuário informa os dados obrigatórios corretos", () => {
  payload = cadastroUtils.payloadUsuarioValido();
  email = payload.email; 
});

When("o usuário não informa os dados obrigatórios", () => {
  payload = cadastroUtils.payloadUsuarioVazio();
});

When("o usuário informa os dados obrigatórios incorretos", () => {
  payload = cadastroUtils.payloadUsuarioInvalido();
});

When("o usuário informa um email já cadastrado", () => {
  payload = cadastroUtils.payloadUsuarioEmailJaCadastrado(email);
});

Then("o sistema deve tentar cadastrar o usuário", () => {
  cadastroPage.realizarCadastro(payload);
});
