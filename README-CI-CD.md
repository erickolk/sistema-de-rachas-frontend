# Configuração de CI/CD para o Frontend

Este documento explica como configurar o pipeline de CI/CD para implantar automaticamente o frontend no AWS Amplify usando GitHub Actions.

## Pré-requisitos

1. Um repositório GitHub para o código do frontend
2. Uma conta AWS com o Amplify configurado
3. O aplicativo já criado no AWS Amplify

## Configuração dos Secrets no GitHub

Para permitir que o pipeline de CI/CD interaja com o AWS Amplify, você precisa configurar os seguintes secrets no seu repositório GitHub:

1. Acesse o repositório no GitHub
2. Vá para "Settings" > "Secrets and variables" > "Actions"
3. Clique em "New repository secret"
4. Configure os seguintes secrets:

### Secrets obrigatórios

| Nome do Secret | Descrição | Como obter |
|---------------|-----------|------------|
| `AWS_ACCESS_KEY_ID` | ID da chave de acesso AWS | [Console IAM](https://console.aws.amazon.com/iam/) > Usuários > Seu usuário > Credenciais de segurança > Criar chave de acesso |
| `AWS_SECRET_ACCESS_KEY` | Chave secreta de acesso AWS | Fornecida junto com o ID da chave quando você cria uma nova chave de acesso |
| `AWS_REGION` | Região AWS onde seu app Amplify está hospedado | ex: `us-east-1`, `sa-east-1` |
| `AMPLIFY_APP_ID` | ID do seu aplicativo no Amplify | URL do console Amplify após selecionar seu app (ex: `d1a2b3c4d5e6f`) |

## Como configurar o usuário IAM

Para o deploy funcionar corretamente, você precisa criar um usuário IAM com as permissões necessárias:

1. Acesse o [Console IAM da AWS](https://console.aws.amazon.com/iam/)
2. Crie um novo usuário para CI/CD (ex: `github-actions-amplify`)
3. Anexe a seguinte política:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "amplify:StartDeployment",
                "amplify:GetJob",
                "amplify:GetApp",
                "amplify:GetBranch",
                "amplify:UpdateApp",
                "amplify:GetBackendEnvironment"
            ],
            "Resource": "*"
        }
    ]
}
```

## Funcionamento do Pipeline

O pipeline de CI/CD configurado no arquivo `.github/workflows/amplify-deploy.yml` executa as seguintes etapas:

1. **Build e Teste**:
   - Checkout do código
   - Instalação das dependências
   - Execução do linter
   - Geração dos arquivos estáticos
   - Armazenamento dos artefatos de build

2. **Deploy** (apenas na branch `main`):
   - Configuração das credenciais AWS
   - Download dos artefatos de build
   - Compactação dos arquivos
   - Implantação no AWS Amplify

## Verificação do Deploy

Após configurar o pipeline e fazer um push para a branch `main`, você pode:

1. Verificar o status do deploy nas "Actions" do GitHub
2. Monitorar o deploy no console do AWS Amplify
3. Acessar a URL do seu aplicativo fornecida pelo Amplify para verificar se tudo está funcionando

## Solução de Problemas

Se o deploy falhar, verifique:

1. Os logs nas Actions do GitHub
2. Se todos os secrets estão configurados corretamente
3. Se o usuário IAM tem as permissões necessárias
4. Os logs no console do AWS Amplify 