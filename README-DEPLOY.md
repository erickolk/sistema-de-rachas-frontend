# Deploy no AWS Amplify

Este documento contém instruções para implantar o projeto frontend no AWS Amplify.

## Pré-requisitos

- Conta na AWS
- Repositório Git com o código do frontend (GitHub, GitLab, Bitbucket, AWS CodeCommit)

## Passo a passo

### 1. Preparando o código

1. Verifique se o arquivo `nuxt.config.ts` está configurado com:
   - `ssr: false` - para evitar problemas com APIs do navegador
   - URL da API correta em `runtimeConfig.public.apiUrl`

2. Certifique-se de que o projeto está funcionando localmente:
   ```bash
   yarn install
   yarn generate
   ```

### 2. Implantação no AWS Amplify

1. Acesse o [Console do AWS Amplify](https://console.aws.amazon.com/amplify/home)

2. Clique em "New app" > "Host web app"

3. Selecione seu provedor de repositório Git (GitHub, GitLab, etc.) e autorize o acesso

4. Selecione o repositório e a branch para implantação

5. Na tela de configuração da compilação, use as seguintes configurações:

   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - yarn install
       build:
         commands:
           - yarn generate
     artifacts:
       baseDirectory: .output/public
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
         - .nuxt/**/*
         - .output/**/*
   ```

6. Em "Advanced settings", adicione a variável de ambiente:
   - Nome: `API_URL`
   - Valor: `http://15.228.16.62:3002` (ou a URL do seu backend)

7. Clique em "Save and deploy"

### 3. Configuração de roteamento

Para garantir que a aplicação de página única (SPA) funcione corretamente, adicione as seguintes regras de redirecionamento no console do Amplify após a implantação:

1. Vá para "Rewrites and redirects" no menu lateral
2. Adicione uma nova regra:
   - Source address: `/<*>`
   - Target address: `/index.html`
   - Type: `200 (Rewrite)`

### 4. Verificação

1. Após a conclusão do deploy, acesse a URL gerada pelo Amplify para verificar se a aplicação está funcionando corretamente.

2. Verifique as seguintes funcionalidades:
   - Navegação entre páginas
   - Conexão com a API backend
   - Login e autenticação
   - Funcionalidades principais do aplicativo

## Atualizações

Para atualizar a aplicação, simplesmente envie as alterações para a branch configurada. O Amplify detectará automaticamente as alterações e iniciará um novo deploy. 