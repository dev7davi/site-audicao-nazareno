# Site de Inscrição — Audição Ministerial
## Igreja do Nazareno · Rio Preto

Site desenvolvido para gerenciar inscrições de audição musical.
**Acesso:** [nazarenorp.com](https://nazarenorp.com)

## Funcionalidades

- Formulário multi-etapa (wizard) com 4 etapas:
  - Dados pessoais
  - Perfil musical
  - Vida cristã
  - Agendamento
- Envio automático de e-mail com todas as informações da inscrição (PHPMailer)
- Interface responsiva e animada

## Tecnologias

| Frontend | Backend |
|----------|---------|
| React + Vite | PHP |
| CSS modular | PHPMailer |
| Animações CSS | API REST simples |

## Estrutura

```
audicao_tm/
├── frontend/        → App React (formulário)
│   └── src/
│       ├── components/  → Etapas do formulário
│       ├── pages/
│       └── services/
└── api/             → PHP para envio de e-mail
    └── enviar.php
```
