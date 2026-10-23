# Tokens de design

Este arquivo documenta os tokens compartilhados com `front-usuario`. Os dois
fronts mantêm os mesmos nomes e valores para permitir uma futura extração para
um pacote compartilhado, sem criar um monorepo nesta etapa.

| Grupo | Tokens principais | Valor de referência |
| --- | --- | --- |
| Cores | `--cor-fundo`, `--cor-card`, `--cor-acento` | `#f8f9fa`, `#ffffff`, `#3f51b5` |
| Texto | `--cor-texto-principal`, `--cor-texto-secundario` | `#2c3e50`, `#6c757d` |
| Estado | `--cor-sucesso`, `--cor-alerta`, `--cor-perigo` | `#10b981`, `#f59e0b`, `#ef4444` |
| Espaçamento | `--espaco-1` a `--espaco-6` | `4px` a `24px` |
| Raios | `--border-radius`, `--border-radius-lg` | `8px`, `16px` |
| Elevação | `--shadow-card` | `0 2px 5px rgba(0, 0, 0, 0.05)` |
| Tipografia | `--font-family-base` | `Roboto, "Helvetica Neue", sans-serif` |
| Breakpoints Sass | `$breakpoint-xs`, `$breakpoint-sm`, `$breakpoint-md`, `$breakpoint-lg` | `360px`, `480px`, `768px`, `900px` |

Os componentes existentes ainda possuem alguns valores legados diretamente no
SCSS. A migração deve ser gradual, sem redesenhar telas já entregues.
