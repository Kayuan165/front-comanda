# Plano de Implementação: [FEATURE]

**Branch**: `[###-nome-da-feature]` | **Data**: [DATA] | **Spec**: [link]  
**Entrada**: Especificação localizada em `/specs/[###-nome-da-feature]/spec.md`

## Resumo

[Resuma a solução escolhida, o fluxo principal e a abordagem técnica.]

## Contexto Técnico

**Stack base**: Angular 20, TypeScript, SCSS, Angular Material, RxJS  
**Estrutura alvo**: `src/app/core`, `src/app/shared`, `src/app/features`  
**Tipo de projeto**: frontend web com SSR disponível  
**Padrão de componentes**: standalone com `loadComponent`, `templateUrl` e `styleUrl`  
**Formulários**: template-driven ou reativos, preferindo reativos em fluxos complexos  
**Testes**: specs unitárias em arquivos `*.spec.ts`  
**Plataformas-alvo**: mobile-first, com suporte funcional em desktop  
**Restrições**: preservar consistência visual, navegação existente e linguagem da interface em português

## Checagem de Constituição

Verifique antes de implementar:

- A solução usa componente standalone por padrão?
- A feature reaproveita `shared` antes de criar novas abstrações?
- O fluxo considera estados de loading, erro, vazio e sucesso?
- A interface respeita UX mobile-first e o padrão visual claro/minimalista?
- Formulários complexos usam abordagem reativa?
- Há cobertura de testes unitários planejada para todas as funções criadas e impactadas?
- Existe um plano de revisão de estilos `.scss` para arquivos novos ou alterados?
- A documentação será atualizada automaticamente quando a feature alterar comportamento, fluxo ou contratos?
- O plano não depende de criação automática de branches ou commits pelo SpecKit?

Se alguma resposta for “não”, registrar justificativa ainda neste plano.

## Estrutura Prevista

```text
src/app/
├── core/
│   ├── auth/
│   ├── models/
│   └── services/
├── features/
│   ├── pages/
│   ├── pedidos/
│   ├── produto/
│   └── usuarios/
└── shared/
    ├── cards/
    ├── directives/
    ├── layout/
    ├── modal/
    └── pipes/
```

**Decisão de estrutura**: [Indique exatamente onde a feature será implementada e por quê.]

## Mudanças de Implementação

### Interface

- [Tela, seção ou componente a criar/alterar]
- [Estado visual importante a contemplar]
- [Ajustes de navegação, `bottom-nav`, `fab` ou layout shell]

### Dados e Integração

- [Serviço existente a reutilizar ou novo serviço em `core/services`]
- [Modelos, interfaces ou DTOs envolvidos]
- [Validações e contratos consumidos pelo frontend]

### Componentização

- [Componente compartilhado a reutilizar]
- [Novo componente, modal, pipe ou diretiva somente se necessário]
- [Regras de responsabilidade entre `features` e `shared`]

## Impactos em Interfaces Públicas

- **Rotas**: [novas rotas, alteração em `route.data`, guardas, redirecionamentos]
- **Componentes compartilhados**: [inputs, outputs, contratos visuais]
- **Serviços/Modelos**: [assinaturas, novos métodos, novos tipos]
- **Documentação**: [README, templates, checklist, fluxos]

## Plano de Testes

- Validar a história principal manualmente em viewport mobile.
- Verificar estados de loading, erro, vazio e sucesso quando aplicáveis.
- Atualizar ou criar `*.spec.ts` para componentes, serviços, pipes ou diretivas alterados.
- Confirmar que a navegação e os textos em português permanecem corretos.
- Validar regressão visual básica em telas relacionadas.

## Riscos e Observações

- [Risco técnico ou visual]
- [Dependência de API ou contrato]
- [Limitação conhecida ou decisão consciente]
