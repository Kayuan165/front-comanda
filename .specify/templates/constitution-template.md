# Constituição do Projeto: [NOME DO PROJETO]

## Princípios Fundamentais

### I. Componentes Standalone por Padrão

Novas telas, páginas e componentes devem ser criados como componentes Angular standalone, com `imports` declarados localmente. Exceções só são aceitáveis quando houver justificativa técnica explícita.

### II. Reaproveitamento Antes de Duplicação

Antes de criar novos blocos de interface, deve-se verificar se a solução pode ser composta a partir de `shared/layout`, `shared/cards`, `shared/modal`, pipes, diretivas e utilidades já existentes. Duplicação estrutural deve ser tratada como exceção, não como padrão.

### III. UX Mobile-First e Estados Explícitos

Toda feature deve funcionar primeiro em mobile e manter comportamento consistente em desktop. Sempre que aplicável, a interface deve contemplar loading, erro, vazio e sucesso de forma clara para o usuário.

### IV. Formulários e Fluxos Complexos com Clareza

Fluxos com múltiplos campos, validações ou regras de negócio devem preferir formulários reativos. Mensagens, feedbacks e regras de preenchimento precisam ser previsíveis, visíveis e coerentes com o domínio do sistema.

### V. Consistência Visual Minimalista

O projeto deve preservar uma interface clara, objetiva e operacional: superfícies claras, cartões com cantos arredondados, sombra leve, acento azul/índigo, espaçamento consistente e feedback visual discreto. Novas entregas devem se integrar a essa linguagem sem introduzir estilos conflitantes.

## Restrições de Implementação

- A organização principal deve respeitar `src/app/core`, `src/app/shared` e `src/app/features`.
- Serviços de integração ficam em `core/services`; modelos e interfaces em `core/models`.
- Componentes compartilhados devem ter responsabilidades claras e reutilizáveis.
- Textos da interface, histórias e critérios de aceite devem permanecer em português, alinhados ao domínio de pedidos, produtos, usuários, login e dashboard.
- Mudanças de navegação devem considerar `authGuard`, `loadComponent`, `shell`, `bottom-nav` e `fab` quando houver impacto de fluxo.

## Fluxo de Trabalho

- Toda spec deve descrever impacto em interface, navegação, serviços e estados de UI.
- Todo plano deve registrar a estrutura alvo, componentes afetados e riscos visuais ou técnicos.
- Toda lista de tarefas deve permitir entrega incremental por história de usuário.
- Toda revisão deve verificar aderência a componentes standalone, responsividade, reaproveitamento e consistência visual.

## Governança

Esta constituição orienta README, templates do `specify`, specs de features e revisões de implementação. Qualquer exceção deve ser documentada com justificativa técnica e impacto esperado. Quando o código legado divergir destas regras, novas alterações devem aproximar o projeto do padrão definido aqui, sem regressão funcional.

**Versão**: [VERSAO] | **Ratificado em**: [DATA] | **Última atualização**: [DATA]
