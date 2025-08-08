Feature: Cadastro

    Scenario Outline: Validar cadastro de usuário com dados válidos
        Given o usuário informa os dados obrigatórios corretos
        Then o sistema deve tentar cadastrar o usuário

    Scenario Outline: Validar tentativa de cadastro de usuário com dados vazios
        Given o usuário não informa os dados obrigatórios
        Then o sistema deve tentar cadastrar o usuário

    Scenario Outline: Validar tentativa de cadastro de usuário com dados inválidos
        Given o usuário informa os dados obrigatórios incorretos
        Then o sistema deve tentar cadastrar o usuário

    Scenario Outline: Validar tentativa de cadastro de usuário com email já cadastrado
        Given o usuário informa um email já cadastrado
        Then o sistema deve tentar cadastrar o usuário