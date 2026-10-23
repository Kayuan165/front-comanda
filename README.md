# Front Comanda

Frontend do sistema de gestão de comandas, pedidos, produtos e usuários. O projeto foi construído com Angular 20 e segue uma abordagem mobile-first, com componentes standalone, Angular Material customizado e uma linguagem visual minimalista voltada para operação diária.

## Visão Geral

O aplicativo cobre os fluxos principais do sistema interno:

- autenticação
- dashboard com métricas
- listagem e criação de produtos
- listagem e criação de pedidos
- listagem e criação de usuários

A navegação é estruturada para uso rápido em telas menores, com `top-navbar`, `bottom-nav` e `fab` controlados por metadados de rota.

## Stack

- Angular 20
- TypeScript
- Angular Material / CDK
- SCSS
- RxJS
- Express para SSR
- Docker + Nginx para empacotamento e entrega

## Arquitetura

O código-fonte principal fica em `src/app` e está organizado em três áreas:

- `core/`: autenticação, interceptors, modelos e serviços de acesso a dados
- `shared/`: layout, cards, modais, pipes e diretivas reutilizáveis
- `features/`: páginas e fluxos por domínio, como `produto`, `pedidos`, `usuarios` e `pages`

### Padrões adotados

- componentes Angular `standalone: true`
- carregamento de telas com `loadComponent`
- proteção de navegação com `authGuard`
- formulários complexos com `ReactiveFormsModule`
- imports declarados localmente em cada componente
- composição de interface via componentes reutilizáveis em `shared`

## Padrão Visual

O projeto usa uma estética clara e funcional, com foco em legibilidade e toque rápido:

- superfícies claras com fundo neutro
- cartões brancos com cantos arredondados
- sombras leves e feedback visual discreto
- acento principal em azul/índigo
- borda lateral ou detalhes de cor para destacar estado e prioridade
- estados explícitos de carregamento, erro, vazio e sucesso
- modais e navegação adaptados para mobile

Esse padrão deve ser preservado em novas telas e componentes.

## Estrutura de Pastas

```text
src/
├── app/
│   ├── core/
│   │   ├── auth/
│   │   ├── models/
│   │   └── services/
│   ├── features/
│   │   ├── pages/
│   │   ├── pedidos/
│   │   ├── produto/
│   │   └── usuarios/
│   └── shared/
│       ├── cards/
│       ├── directives/
│       ├── layout/
│       ├── modal/
│       └── pipes/
├── styles.scss
├── main.ts
├── main.server.ts
└── server.ts
```

## Scripts

### Desenvolvimento

```bash
npm start
```

Inicia o servidor Angular em modo de desenvolvimento.

### Build

```bash
npm run build
```

Gera o build de produção em `dist/`.

### Watch

```bash
npm run watch
```

Compila em modo de desenvolvimento com rebuild automático.

### Testes

```bash
npm test
```

Executa os testes unitários com Karma.

### SSR

```bash
npm run serve:ssr:front-comanda
```

Sobe a aplicação compilada com o servidor SSR gerado em `dist/front-comanda/server/server.mjs`.

## Docker e Nginx

O repositório já inclui suporte para containerização e entrega:

- `Dockerfile`: imagem base para execução do projeto
- `Dockerfile.prod`: build voltado para produção
- `docker-compose.yml`: orquestração local
- `nginx.conf`: configuração de entrega do frontend

Antes de usar os artefatos de produção, gere o build do projeto.

## Convenções Para Novas Implementações

- Crie novos componentes como standalone sempre que não houver motivo forte para outra abordagem.
- Prefira organizar fluxos em `features` e abstrações reutilizáveis em `shared`.
- Use SCSS por componente ou feature, mantendo o estilo encapsulado e consistente com a interface atual.
- Reaproveite primeiro `shared/layout`, `shared/cards`, `shared/modal`, pipes e diretivas antes de criar novas abstrações.
- Mantenha os textos da interface em português, alinhados ao domínio do produto.
- Em telas de listagem e formulário, documente e implemente estados de loading, erro, vazio e sucesso.
- Preserve o comportamento mobile-first e os padrões de navegação existentes.

## Tokens de design compartilhados

Os tokens visuais comuns aos dois frontends ficam em
`src/styles/tokens/_design-tokens.scss` e são documentados em
`src/styles/tokens/design-tokens.md`. O `front-usuario` mantém uma cópia com os
mesmos nomes e valores em sua própria árvore, sem introduzir um monorepo.

Novos estilos devem preferir as CSS custom properties documentadas, como
`--cor-acento`, `--cor-fundo`, `--espaco-4` e `--border-radius`, evitando
espalhar novos valores visuais diretamente nos componentes.

## Specify

O projeto usa a pasta `.specify/` para padronizar specs, planos, tarefas e checklists. Os templates foram ajustados para refletir o contexto real deste frontend Angular, então novas especificações devem:

- usar exemplos e caminhos reais do projeto
- descrever impacto em componentes, rotas, serviços e estados de UI
- considerar responsividade e consistência visual como parte do escopo
- registrar critérios de aceite em português

## Observações

- Há suporte a SSR no projeto, mas o fluxo principal documentado aqui é o frontend operacional.
- Parte do código atual ainda possui pequenas inconsistências legadas; a documentação passa a representar o padrão esperado para evolução do projeto.
