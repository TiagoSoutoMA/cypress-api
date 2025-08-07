Feature: Cadastro

    Scenario Outline: Validar cadastro de usuário com dados válidos
        Given o usuário informa os dados obrigatórios corretos
        Then o sistema deve cadastrar o usuário com sucesso

    Scenario Outline: Validar tentativa de cadastro de usuário com dados inválidos
        Given o usuário informa os dados obrigatórios corretos
        Then o sistema deve cadastrar o usuário com sucesso