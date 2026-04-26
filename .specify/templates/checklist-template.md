# Checklist de [TIPO]: [NOME DA FEATURE]

**Objetivo**: Validar se a entrega está alinhada com o padrão do Front Comanda  
**Criado em**: [DATA]  
**Referência**: [link para spec.md, plan.md ou tarefa relacionada]

**Nota**: Este checklist deve ser gerado com base no contexto real da feature. Substitua os exemplos abaixo por itens concretos e rastreáveis.

## Produto e Fluxo

- [ ] CHK001 A feature atende ao fluxo descrito na especificação em português claro.
- [ ] CHK002 Os estados principais da jornada foram cobertos: loading, sucesso, erro e vazio quando aplicável.
- [ ] CHK003 Os critérios de aceite da tela ou fluxo podem ser verificados sem ambiguidade.

## Arquitetura Angular

- [ ] CHK004 Novas telas ou componentes seguem o padrão `standalone: true`.
- [ ] CHK005 Os `imports` do componente foram declarados localmente e sem dependências desnecessárias.
- [ ] CHK006 A feature respeita a organização entre `core`, `shared` e `features`.
- [ ] CHK007 Houve reaproveitamento de componentes, pipes, diretivas ou modais já existentes antes de criar novas abstrações.

## Interface e Estilo

- [ ] CHK008 A interface mantém o padrão visual minimalista do projeto.
- [ ] CHK009 O layout funciona bem em mobile e não quebra em telas maiores.
- [ ] CHK010 Cartões, modais, cabeçalhos, ações e espaçamentos seguem a linguagem visual já usada no app.
- [ ] CHK011 Feedbacks visuais de ação, erro e carregamento estão consistentes com o restante do sistema.

## Dados e Integração

- [ ] CHK012 O fluxo usa os serviços corretos em `core/services` e respeita os contratos esperados pelo frontend.
- [ ] CHK013 Validações de formulário ou regras de exibição foram documentadas quando existirem.
- [ ] CHK014 Rotas, guards e `route.data` foram atualizados corretamente quando a feature alterar navegação, `bottom-nav` ou `fab`.

## Qualidade

- [ ] CHK015 Existem testes unitários relevantes para componentes, serviços, pipes ou diretivas alterados.
- [ ] CHK016 A documentação relacionada foi atualizada quando a feature mudou comportamento, estrutura ou convenção.
- [ ] CHK017 O texto da interface foi mantido em português e sem inconsistências de domínio.

## Notas

- Marque com `[x]` os itens concluídos.
- Registre observações ou riscos diretamente abaixo do item correspondente.
- Numere novos itens em sequência para facilitar revisão e referência.
