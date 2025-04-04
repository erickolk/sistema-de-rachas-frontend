# Frontend do Sistema de Rachas

Este projeto contém o frontend do Sistema de Rachas, desenvolvido com Nuxt 3, Vue.js e PrimeVue.

## Tecnologias

- **Nuxt 3**: Framework baseado em Vue.js para desenvolvimento de aplicações
- **Vue.js 3**: Framework JavaScript progressivo
- **TypeScript**: Superset tipado de JavaScript
- **TailwindCSS**: Framework de CSS utilitário
- **PrimeVue**: Biblioteca de componentes UI para Vue.js

## Setup

Certifique-se de instalar as dependências:

```bash
# npm
npm install

# yarn
yarn install
```

## Desenvolvimento

Inicie o servidor de desenvolvimento em `http://localhost:3000`:

```bash
# npm
npm run dev

# yarn
yarn dev
```

## Produção

Compile a aplicação para produção:

```bash
# npm
npm run build

# yarn
yarn build
```

Visualize localmente a build de produção:

```bash
# npm
npm run preview

# yarn
yarn preview
```

## Geração de arquivos estáticos

Para gerar os arquivos estáticos para implantação no AWS Amplify:

```bash
# npm
npm run generate

# yarn
yarn generate
```

## Implantação

### AWS Amplify

O projeto está configurado para ser implantado no AWS Amplify. Para detalhes completos sobre a implantação, consulte:

- [Guia de Implantação no AWS Amplify](./README-DEPLOY.md)
- [Configuração de CI/CD](./README-CI-CD.md)

### Principais características da configuração para AWS Amplify

- **SSR desativado**: A aplicação é configurada com `ssr: false` para evitar problemas com APIs do navegador
- **Geração estática**: Usamos `yarn generate` para criar arquivos estáticos
- **Configuração de URLs**: A API pode ser configurada via variável de ambiente `API_URL`
- **CI/CD**: Configuração automática via GitHub Actions para deploy contínuo

## Desenvolvimento

### Estrutura de Diretórios

```
frontend_sistema_de_rachas/
├── assets/            # Arquivos estáticos (CSS, imagens)
├── components/        # Componentes Vue reutilizáveis
├── composables/       # Funções e hooks reutilizáveis
├── layouts/           # Layouts para as páginas
├── middleware/        # Middleware do Nuxt
├── pages/             # Páginas (rotas)
├── plugins/           # Plugins Vue e Nuxt
├── public/            # Arquivos públicos
├── services/          # Serviços para comunicação com a API
├── types/             # Definições de tipos TypeScript
└── utils/             # Utilitários diversos
```

### Scripts Disponíveis

- `yarn dev`: Inicia o servidor de desenvolvimento
- `yarn build`: Compila a aplicação para produção
- `yarn generate`: Gera arquivos estáticos para implantação
- `yarn preview`: Visualiza a build de produção localmente
- `yarn lint`: Verifica o código com ESLint
- `yarn lint:fix`: Corrige problemas de lint automaticamente
- `yarn deploy`: Alias para `yarn generate`
