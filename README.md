# Prime Barber Booking

Crie uma landing page moderna, profissional e totalmente responsiva para uma barbearia chamada “Barbearia Prime”.

OBJETIVO DO SITE

O objetivo principal é apresentar a barbearia, mostrar seus serviços e permitir que o cliente escolha um serviço, uma data e um horário. Ao confirmar, o cliente deve ser redirecionado para o WhatsApp da barbearia com uma mensagem automática já preenchida de acordo com o agendamento escolhido.

ESTILO VISUAL

Visual masculino, moderno e sofisticado.

Cores principais: preto, cinza-escuro, branco e detalhes dourados.

Utilize fontes modernas e fáceis de ler.

Adicione animações suaves ao rolar a página e ao passar o mouse nos botões.

O site precisa funcionar perfeitamente em celular, tablet e computador.

Utilize fotos reais de barbearia retiradas somente do Unsplash.

Para manter a identidade visual consistente, utilize preferencialmente fotos do mesmo fotógrafo ou da mesma coleção.

Não misture imagens com estilos, iluminações ou cores muito diferentes.

Não utilize imagens geradas por IA.

ESTRUTURA DA LANDING PAGE

Cabeçalho

Logotipo textual “Barbearia Prime”.

Menu com links para: Início, Serviços, Sobre, Galeria, Agendamento e Contato.

Botão destacado “Agendar horário”.

No celular, transformar o menu em menu hambúrguer.

Seção principal

Foto de fundo de uma barbearia moderna.

Título: “Seu estilo começa aqui”.

Subtítulo: “Cortes modernos, atendimento de qualidade e o cuidado que você merece.”

Botão principal: “Agendar meu horário”.

Ao clicar, rolar suavemente até a seção de agendamento.

Serviços

Crie cartões com foto, nome, descrição, duração aproximada e preço:

Corte Social — R$ 25,00 — 40 minutos.

Corte Degradê — R$ 30,00 — 45 minutos.

Barba — R$ 20,00 — 30 minutos.

Corte + Barba — R$ 45,00 — 1 hora.

Corte Infantil — R$ 25,00 — 40 minutos.

Ao clicar em “Escolher”, o serviço deve ser automaticamente selecionado no formulário de agendamento.

Sobre a barbearia

Adicione um pequeno texto apresentando a barbearia, destacando atendimento, experiência, conforto, higiene e qualidade.

Galeria

Crie uma galeria elegante com fotos de cortes, barba, equipamentos e ambiente. Todas as imagens devem vir do Unsplash e seguir o mesmo estilo visual.

Agendamento

Crie um formulário funcional contendo:

Nome completo do cliente.

Número de telefone.

Seleção do serviço.

Preço atualizado automaticamente conforme o serviço.

Campo para escolher a data.

Não permitir datas anteriores ao dia atual.

Seleção de horário.

Horários disponíveis visualmente em botões.

Campo opcional de observações.

Botão verde: “Confirmar pelo WhatsApp”.

Utilize estes horários como exemplo:

Segunda a sexta: das 09:00 às 19:00.

Sábado: das 09:00 às 18:00.

Domingo: fechado.

Mostre um aviso próximo ao botão:

“O envio da mensagem não garante a reserva. O horário será confirmado pela barbearia pelo WhatsApp.”

FUNCIONAMENTO DO WHATSAPP

Ao clicar em “Confirmar pelo WhatsApp”, valide se nome, serviço, data e horário foram preenchidos.

Depois, abra o WhatsApp utilizando um link no formato:

https://wa.me/5591981071939?text=MENSAGEM

Deixe o número 5591999999999 em uma variável fácil de encontrar e alterar posteriormente.

A mensagem deve ser criada automaticamente com os dados escolhidos pelo cliente e formatada desta maneira:

Olá! Meu nome é [NOME].

Gostaria de confirmar o seguinte agendamento:

📅 Data: 18/08/2026
🕒 Horário: 15:00
✂️ Serviço: Corte Social
💰 Valor: R$ 25,00

Este horário está disponível?

A data, o horário, o serviço, o preço e o nome devem mudar automaticamente de acordo com o que o cliente selecionou.

Utilize encodeURIComponent para codificar corretamente a mensagem antes de inseri-la no link do WhatsApp.

Abra o WhatsApp em uma nova aba de maneira segura. No celular, deve abrir o aplicativo; no computador, deve abrir o WhatsApp Web.

Avaliações

Adicione três avaliações fictícias claramente apresentadas como exemplos de layout, sem fingir que são avaliações reais verificadas.

Localização e contato

Inclua:

Endereço da barbearia.

Horário de funcionamento.

Número do WhatsApp.

Instagram.

Mapa incorporado como espaço reservado.

Botão “Como chegar”.

Rodapé

Inclua nome da barbearia, contatos, links rápidos, redes sociais e direitos autorais.

REQUISITOS TÉCNICOS

O agendamento deve funcionar no navegador sem precisar de backend ou banco de dados.

Não afirmar que os horários estão realmente disponíveis, pois a disponibilidade será confirmada pelo WhatsApp.

Todos os botões e links devem funcionar.

Criar feedback visual para campos não preenchidos.

Mostrar o preço automaticamente ao selecionar o serviço.

Exibir a data no padrão brasileiro: DD/MM/AAAA.

Utilizar HTML semântico e boas práticas de acessibilidade.

Adicionar textos alternativos nas imagens.

Otimizar as imagens para carregamento rápido.

Adicionar título e descrição para SEO local.

Não usar textos genéricos em inglês.

Entregar o site completo, bonito e funcional, sem deixar seções inacabadas.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://sophisticated-cuts-online.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e3a360e7-6266-4c4c-ba64-50907c14543c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
