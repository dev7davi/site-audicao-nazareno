# Site de Inscrição — Audição Ministerial
### Igreja do Nazareno · São José do Rio Preto

Sistema de inscrição online para audição musical da Igreja do Nazareno. Formulário multi-etapa em React com validação em tempo real, máscara de telefone e envio automático de e-mail via PHP.

**Acesso:** [nazarenorp.com](https://nazarenorp.com)

---

## Sobre o projeto

Sistema desenvolvido para gerenciar as inscrições de candidatos à audição ministerial da Igreja do Nazareno de Rio Preto. O processo de inscrição envolve quatro etapas sequenciais, cada uma com validação própria via `react-hook-form` antes de avançar.

## Etapas do formulário

| # | Etapa | Detalhe |
|---|-------|---------|
| 1 | **Dados pessoais** | Nome completo e WhatsApp com máscara automática `(XX) XXXXX-XXXX` |
| 2 | **Perfil musical** | Área de atuação (vocal, violão, guitarra, baixo, teclado, bateria ou outros) com campos condicionais conforme a seleção |
| 3 | **Vida cristã** | Tempo de congregação, batismo nas águas e histórico de igrejas anteriores (campo condicional — só aparece se o candidato veio de outra igreja) |
| 4 | **Agendamento** | Confirmação de ciência sobre o processo; datas definidas pela liderança, candidato contatado via WhatsApp |

## Funcionamento

Ao concluir, os dados são enviados via `POST` para um endpoint PHP que constrói e envia um e-mail estruturado com **PHPMailer via SMTP**.

O frontend detecta o ambiente automaticamente:
- **Produção** → aponta para o PHP do servidor (`techferrari.com/audicao_tm/api`)
- **Desenvolvimento** → aponta para servidor PHP local na porta `8000`

## Tecnologias

| Frontend | Backend |
|----------|---------|
| React 19 + Vite | PHP |
| react-hook-form | PHPMailer (SMTP) |
| axios | API REST simples |
| date-fns | — |
| lucide-react | — |
| CSS modular + animações | — |

## Estrutura

```
audicao_tm/
├── frontend/              → App React
│   └── src/
│       ├── components/    → Etapas do formulário (wizard)
│       ├── pages/
│       ├── styles/        → CSS modular e animações
│       └── services/      → axios + detecção de ambiente
└── api/                   → Endpoint PHP
    ├── enviar.php         → Recebe POST e envia e-mail
    └── lib/PHPMailer/
```
