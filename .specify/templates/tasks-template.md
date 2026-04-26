---

description: "Template de tarefas para implementação de features do Front Comanda"
---

# Tarefas: [NOME DA FEATURE]

**Entrada**: Documentos de `/specs/[###-nome-da-feature]/`  
**Pré-requisitos**: `plan.md` e `spec.md`  
**Testes**: incluir tarefas de teste sempre que a mudança alterar comportamento, contrato visual, navegação ou regra de negócio  
**Organização**: agrupar por história de usuário para permitir entrega incremental

## Formato: `[ID] [P?] [HU] Descrição`

- **[P]**: pode ser executada em paralelo
- **[HU]**: referência da história de usuário, como `HU1`, `HU2`
- Descreva sempre o caminho real do arquivo

## Convenções de Caminho

- telas e fluxos: `src/app/features/...`
- serviços, auth e modelos: `src/app/core/...`
- componentes compartilhados: `src/app/shared/...`
- estilos globais: `src/styles.scss`
- documentação do fluxo: `.specify/...` e `README.md`

## Fase 1: Preparação

**Objetivo**: alinhar contexto técnico e pontos de impacto antes da implementação

- [ ] T001 Revisar `spec.md` e mapear telas, componentes, serviços e rotas afetados
- [ ] T002 Confirmar se há componente, modal, pipe ou diretiva reutilizável em `src/app/shared`
- [ ] T003 Confirmar se a feature altera `route.data`, `bottom-nav`, `fab` ou `authGuard`

---

## Fase 2: Base da Feature

**Objetivo**: preparar contratos, serviços e estrutura mínima da entrega

- [ ] T004 Atualizar ou criar interfaces/modelos em `src/app/core/models/` quando necessário
- [ ] T005 Atualizar ou criar métodos de serviço em `src/app/core/services/` quando necessário
- [ ] T006 Definir validações, mensagens e estados de UI exigidos pela especificação

**Checkpoint**: a base técnica da feature está pronta para suportar a interface

---

## Fase 3: História de Usuário 1 - [Título] (Prioridade: P1)

**Objetivo**: entregar a jornada principal da feature  
**Teste independente**: [Descreva como validar esta história isoladamente]

### Testes

- [ ] T007 [P] [HU1] Atualizar ou criar spec do componente/serviço principal em `*.spec.ts`
- [ ] T008 [P] [HU1] Validar cenários de loading, erro, vazio ou sucesso cobertos pela história

### Implementação

- [ ] T009 [HU1] Implementar a tela ou fluxo principal em `src/app/features/...`
- [ ] T010 [HU1] Integrar dados via `src/app/core/services/...`
- [ ] T011 [HU1] Aplicar estados visuais e ações principais da história
- [ ] T012 [HU1] Ajustar layout, navegação ou componentes compartilhados envolvidos

**Checkpoint**: a história principal funciona de forma independente

---

## Fase 4: História de Usuário 2 - [Título] (Prioridade: P2)

**Objetivo**: complementar ou expandir o fluxo principal  
**Teste independente**: [Descreva como validar esta história isoladamente]

### Testes

- [ ] T013 [P] [HU2] Atualizar ou criar spec do componente/serviço relacionado

### Implementação

- [ ] T014 [HU2] Implementar ajustes em `src/app/features/...`
- [ ] T015 [HU2] Reutilizar ou evoluir componentes em `src/app/shared/...`
- [ ] T016 [HU2] Garantir consistência visual e de navegação com a história principal

**Checkpoint**: HU1 e HU2 seguem independentes e compatíveis

---

## Fase 5: História de Usuário 3 - [Título] (Prioridade: P3)

**Objetivo**: entregar refinamentos, exceções ou cenários secundários  
**Teste independente**: [Descreva como validar esta história isoladamente]

### Testes

- [ ] T017 [P] [HU3] Atualizar ou criar spec dos elementos alterados

### Implementação

- [ ] T018 [HU3] Implementar o fluxo complementar em `src/app/features/...`
- [ ] T019 [HU3] Cobrir casos de borda e feedbacks visuais necessários

**Checkpoint**: todas as histórias previstas estão funcionais

---

## Fase Final: Polimento e Consistência

- [ ] T020 Revisar textos da interface em português
- [ ] T021 Revisar comportamento em viewport mobile
- [ ] T022 Revisar consistência com `shared/layout`, `shared/cards` e `shared/modal`
- [ ] T023 Atualizar documentação relacionada se a entrega alterar convenções ou fluxo
- [ ] T024 Executar testes relevantes e registrar pendências

---

## Dependências e Ordem de Execução

- A preparação deve acontecer antes das mudanças de código.
- A base da feature deve estar pronta antes da implementação da primeira história.
- Histórias podem seguir em paralelo somente se não disputarem os mesmos arquivos.
- Polimento acontece após as histórias desejadas estarem concluídas.

## Estratégia de Entrega

### MVP primeiro

1. Concluir preparação
2. Concluir base da feature
3. Entregar HU1
4. Validar HU1 de forma independente

### Entrega incremental

1. HU1 entrega valor principal
2. HU2 amplia a cobertura sem quebrar HU1
3. HU3 fecha refinamentos e cenários secundários

## Notas

- Evite tarefas vagas.
- Cite arquivos reais sempre que possível.
- Reaproveitamento vem antes de duplicação.
- Não considerar a feature pronta sem revisar estados visuais e experiência mobile.
