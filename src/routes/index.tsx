import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Menu,
  X,
  Scissors,
  MapPin,
  Clock,
  Phone,
  Instagram,
  Star,
  ShieldCheck,
  Sparkles,
  Award,
} from "lucide-react";

/* ============================================================
   NÚMERO DO WHATSAPP DA BARBEARIA (altere aqui quando precisar)
   ============================================================ */
const WHATSAPP_NUMERO = "5511999999999";

const ENDERECO = "Av. Almirante Barroso, 1200 — Marco, Belém — PA";
const INSTAGRAM = "@barbeariaprime";

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

const HERO_IMG = img("photo-1585747860715-2ba37e788b70", 1800);

type Erros = {
  nome?: string;
  servico?: string;
  data?: string;
  horario?: string;
};

type Servico = {
  id: string;
  nome: string;
  descricao: string;
  duracao: string;
  preco: number;
  foto: string;
  alt: string;
};

const SERVICOS: Servico[] = [
  {
    id: "social",
    nome: "Corte Social",
    descricao: "Corte clássico e alinhado, ideal para o dia a dia e o trabalho.",
    duracao: "40 minutos",
    preco: 25,
    foto: img("photo-1599351431202-1e0f0137899a", 800),
    alt: "Corte social clássico masculino bem alinhado",
  },
  {
    id: "degrade",
    nome: "Corte Degradê",
    descricao: "Transição suave nas laterais com acabamento preciso na navalha.",
    duracao: "45 minutos",
    preco: 30,
    foto: img("photo-1621605815971-fbc98d665033", 800),
    alt: "Corte degradê com transição visível nas laterais",
  },
  {
    id: "barba",
    nome: "Barba",
    descricao: "Toalha quente, navalha e hidratação para um acabamento impecável.",
    duracao: "30 minutos",
    preco: 20,
    foto: img("photo-1622286342621-4bd786c2447c", 800),
    alt: "Serviço de aparagem de barba com navalha",
  },
  {
    id: "corte-barba",
    nome: "Corte + Barba",
    descricao: "O combo completo: corte sob medida e barba desenhada.",
    duracao: "1 hora",
    preco: 45,
    foto: img("photo-1503951914875-452162b0f3f1", 800),
    alt: "Cliente recebendo corte e barba na cadeira da barbearia",
  },
  {
    id: "infantil",
    nome: "Corte Infantil",
    descricao: "Atendimento paciente e tranquilo para os pequenos clientes.",
    duracao: "40 minutos",
    preco: 25,
    foto: img("photo-1620331311520-246422fd82f9", 800),
    alt: "Criança cortando o cabelo na barbearia",
  },
];

const GALERIA = [
  { src: img("photo-1512690459411-b9245aed614b", 900), alt: "Ambiente interno da barbearia com cadeiras clássicas" },
  { src: img("photo-1596728325488-58c87691e9af", 900), alt: "Barbeiro fazendo acabamento na nuca do cliente" },
  { src: img("photo-1605497788044-5a32c7078486", 900), alt: "Ferramentas de barbearia: máquina, tesoura e pente" },
  { src: img("photo-1567894340315-735d7c361db0", 900), alt: "Detalhe de barba sendo aparada com navalha" },
  { src: img("photo-1517832606299-7ae9b720a186", 900), alt: "Cadeira de barbeiro em ambiente escuro e elegante" },
  { src: img("photo-1493256338651-d82f7acb2b38", 900), alt: "Barbeiro atendendo cliente em frente ao espelho" },
];

const AVALIACOES = [
  {
    nome: "Rafael M.",
    texto:
      "Atendimento pontual e acabamento perfeito. Saí com o corte exatamente como pedi.",
  },
  {
    nome: "Diego S.",
    texto:
      "Ambiente limpo, climatizado e uma equipe que entende do assunto. Virei cliente fixo.",
  },
  {
    nome: "Lucas F.",
    texto: "Levei meu filho e ele adorou. Paciência e capricho do começo ao fim.",
  },
];

const NAV = [
  { href: "#inicio", label: "Início" },
  { href: "#servicos", label: "Serviços" },
  { href: "#sobre", label: "Sobre" },
  { href: "#galeria", label: "Galeria" },
  { href: "#agendamento", label: "Agendamento" },
  { href: "#contato", label: "Contato" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Barbearia Prime — Cortes, barba e agendamento em Belém" },
      {
        name: "description",
        content:
          "Barbearia Prime em Belém: corte social, degradê, barba e combo. Escolha serviço, data e horário e confirme pelo WhatsApp.",
      },
      { property: "og:title", content: "Barbearia Prime — Seu estilo começa aqui" },
      {
        property: "og:description",
        content:
          "Cortes modernos, atendimento de qualidade e agendamento rápido pelo WhatsApp.",
      },
      { property: "og:image", content: HERO_IMG },
      { name: "twitter:image", content: HERO_IMG },
    ],
  }),
  component: LandingPage,
});

/* ---------- utilitários ---------- */

const formatarPreco = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const hojeLocal = () => {
  const d = new Date();
  return { ano: d.getFullYear(), mes: d.getMonth() + 1, dia: d.getDate() };
};

const hojeISO = () => {
  const { ano, mes, dia } = hojeLocal();
  return `${ano}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
};

const dataLimiteISO = () => {
  const hoje = new Date();
  const limite = new Date(hoje.getFullYear() + 1, hoje.getMonth(), hoje.getDate());
  return `${limite.getFullYear()}-${String(limite.getMonth() + 1).padStart(2, "0")}-${String(limite.getDate()).padStart(2, "0")}`;
};

const dataBR = (iso: string) => {
  if (!iso) return "";
  const [a, m, d] = iso.split("-");
  return `${d}/${m}/${a}`;
};

const diaSemana = (iso: string) => {
  if (!iso) return -1;
  const p = iso.split("-").map(Number);
  return new Date(p[0] ?? 0, (p[1] ?? 1) - 1, p[2] ?? 1).getDay(); // 0 = domingo
};

const dataEhValida = (iso: string) => {
  if (!iso) return false;
  const p = iso.split("-").map(Number);
  const escolhida = new Date(p[0] ?? 0, (p[1] ?? 1) - 1, p[2] ?? 1);
  const hoje = new Date();
  const hojeMeiaNoite = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
  const limite = new Date(hoje.getFullYear() + 1, hoje.getMonth(), hoje.getDate());
  return escolhida >= hojeMeiaNoite && escolhida < limite;
};

function gerarHorarios(iso: string): string[] {
  const dia = diaSemana(iso);
  if (dia === 0) return [];
  const fim = dia === 6 ? 18 : 19;
  const lista: string[] = [];
  for (let h = 9; h < fim; h++) {
    lista.push(`${String(h).padStart(2, "0")}:00`);
    lista.push(`${String(h).padStart(2, "0")}:30`);
  }
  return lista;
}

/* ---------- animação ao rolar ---------- */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- página ---------- */

function LandingPage() {
  useReveal();
  const [menuAberto, setMenuAberto] = useState(false);

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [servicoId, setServicoId] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [obs, setObs] = useState("");
  const [erros, setErros] = useState<Erros>({});

  const nomeRef = useRef<HTMLInputElement>(null);

  const servico = useMemo(
    () => SERVICOS.find((s) => s.id === servicoId) ?? null,
    [servicoId],
  );
  const horarios = useMemo(() => gerarHorarios(data), [data]);

  useEffect(() => {
    if (horario && !horarios.includes(horario)) setHorario("");
  }, [horarios, horario]);

  const escolherServico = (id: string) => {
    setServicoId(id);
    setErros((e) => ({ ...e, servico: "" }));
    document.getElementById("agendamento")?.scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => nomeRef.current?.focus(), 600);
  };

  const confirmar = (e: React.FormEvent) => {
    e.preventDefault();
    const novos: Erros = {};
    if (!nome.trim()) novos["nome"] = "Informe seu nome completo.";
    if (!servico) novos["servico"] = "Escolha um serviço.";
    if (!data) novos["data"] = "Escolha uma data.";
    else if (diaSemana(data) === 0) novos["data"] = "Aos domingos a barbearia está fechada.";
    if (!horario) novos["horario"] = "Selecione um horário.";
    setErros(novos);
    if (Object.keys(novos).length > 0) {
      const primeiro = document.querySelector<HTMLElement>("[data-erro='true']");
      primeiro?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const linhas = [
      `Olá! Meu nome é ${nome.trim()}.`,
      "",
      "Gostaria de confirmar o seguinte agendamento:",
      "",
      `📅 Data: ${dataBR(data)}`,
      `🕒 Horário: ${horario}`,
      `✂️ Serviço: ${servico!.nome}`,
      `💰 Valor: ${formatarPreco(servico!.preco)}`,
      ...(telefone.trim() ? ["", `📱 Telefone: ${telefone.trim()}`] : []),
      ...(obs.trim() ? ["", `📝 Observações: ${obs.trim()}`] : []),
      "",
      "Este horário está disponível?",
    ];
    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(linhas.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const campoBase =
    "w-full rounded-md border bg-secondary/60 px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/40";

  return (
    <div className="min-h-screen bg-background">
      {/* Cabeçalho */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <a href="#inicio" className="flex items-center gap-2">
            <Scissors className="h-5 w-5 text-gold" aria-hidden="true" />
            <span className="font-display text-2xl tracking-wide">
              Barbearia <span className="gold-text">Prime</span>
            </span>
          </a>

          <nav aria-label="Menu principal" className="hidden items-center gap-7 lg:flex">
            {NAV.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#agendamento"
              className="btn-gold rounded-md px-5 py-2.5 text-sm font-semibold"
            >
              Agendar horário
            </a>
          </nav>

          <button
            type="button"
            className="rounded-md border border-border p-2 text-foreground lg:hidden"
            aria-expanded={menuAberto}
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuAberto((v) => !v)}
          >
            {menuAberto ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuAberto && (
          <nav
            aria-label="Menu mobile"
            className="border-t border-border/60 bg-background px-4 pb-5 pt-2 lg:hidden"
          >
            <ul className="flex flex-col">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setMenuAberto(false)}
                    className="block border-b border-border/40 py-3 text-base text-muted-foreground transition-colors hover:text-gold"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#agendamento"
              onClick={() => setMenuAberto(false)}
              className="btn-gold mt-4 block rounded-md px-5 py-3 text-center text-sm font-semibold"
            >
              Agendar horário
            </a>
          </nav>
        )}
      </header>

      <main>
        {/* Hero */}
        <section id="inicio" className="relative flex min-h-[92vh] items-center pt-20">
          <img
            src={HERO_IMG}
            alt="Interior de uma barbearia moderna com iluminação quente"
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
          <div className="relative mx-auto w-full max-w-6xl px-4 py-24">
            <p className="reveal mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-gold">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Barbearia Prime
            </p>
            <h1 className="reveal max-w-3xl text-5xl leading-[0.95] sm:text-7xl lg:text-8xl">
              Seu estilo <span className="gold-text">começa aqui</span>
            </h1>
            <p className="reveal mt-6 max-w-xl text-lg text-muted-foreground">
              Cortes modernos, atendimento de qualidade e o cuidado que você merece.
            </p>
            <div className="reveal mt-9 flex flex-wrap gap-4">
              <a
                href="#agendamento"
                className="btn-gold rounded-md px-8 py-4 text-base font-semibold"
              >
                Agendar meu horário
              </a>
              <a
                href="#servicos"
                className="rounded-md border border-border px-8 py-4 text-base font-semibold text-foreground transition-colors hover:border-gold hover:text-gold"
              >
                Ver serviços
              </a>
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section id="servicos" className="mx-auto max-w-6xl px-4 py-24">
          <header className="reveal mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Nossos serviços</p>
            <h2 className="mt-3 text-4xl sm:text-5xl">Escolha o seu</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Preços transparentes e tempo médio de atendimento para você se planejar.
            </p>
          </header>

          <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICOS.map((s) => (
              <li
                key={s.id}
                className={`reveal group overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 ${
                  servicoId === s.id ? "border-gold" : "border-border"
                }`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={s.foto}
                    alt={s.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-2xl">{s.nome}</h3>
                    <span className="font-display text-2xl text-gold">
                      {formatarPreco(s.preco)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{s.descricao}</p>
                  <p className="mt-4 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                    <Clock className="h-4 w-4 text-gold" aria-hidden="true" /> {s.duracao}
                  </p>
                  <button
                    type="button"
                    onClick={() => escolherServico(s.id)}
                    className="btn-gold mt-6 w-full rounded-md px-5 py-3 text-sm font-semibold"
                  >
                    {servicoId === s.id ? "Selecionado" : "Escolher"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Sobre */}
        <section id="sobre" className="border-y border-border bg-surface/40">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 lg:grid-cols-2">
            <div className="reveal overflow-hidden rounded-xl border border-border">
              <img
                src={img("photo-1503951914875-452162b0f3f1", 1100)}
                alt="Barbeiro da Barbearia Prime atendendo um cliente"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="reveal">
              <p className="text-xs uppercase tracking-[0.3em] text-gold">Sobre nós</p>
              <h2 className="mt-3 text-4xl sm:text-5xl">Tradição com acabamento moderno</h2>
              <p className="mt-6 text-muted-foreground">
                A Barbearia Prime nasceu do gosto por um trabalho bem feito. Mais de dez
                anos de estrada nos ensinaram que um bom corte começa pela conversa: a
                gente entende o seu tipo de cabelo, o formato do rosto e a sua rotina antes
                de encostar a máquina.
              </p>
              <p className="mt-4 text-muted-foreground">
                O ambiente é climatizado, confortável e pensado para você relaxar. Todo o
                material é higienizado a cada atendimento e as lâminas são descartáveis —
                sua segurança vem antes de qualquer coisa.
              </p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { icon: Award, t: "10+ anos", d: "de experiência" },
                  { icon: ShieldCheck, t: "Higiene", d: "material esterilizado" },
                  { icon: Star, t: "Conforto", d: "ambiente climatizado" },
                ].map((i) => (
                  <li key={i.t} className="rounded-lg border border-border bg-card p-4">
                    <i.icon className="h-5 w-5 text-gold" aria-hidden="true" />
                    <p className="mt-2 font-display text-xl">{i.t}</p>
                    <p className="text-xs text-muted-foreground">{i.d}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Galeria */}
        <section id="galeria" className="mx-auto max-w-6xl px-4 py-24">
          <header className="reveal mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Galeria</p>
            <h2 className="mt-3 text-4xl sm:text-5xl">Nosso trabalho e o ambiente</h2>
          </header>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GALERIA.map((g) => (
              <figure
                key={g.src}
                className="reveal group overflow-hidden rounded-xl border border-border"
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </figure>
            ))}
          </div>
        </section>

        {/* Agendamento */}
        <section id="agendamento" className="border-y border-border bg-surface/40">
          <div className="mx-auto max-w-3xl px-4 py-24">
            <header className="reveal mb-10 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-gold">Agendamento</p>
              <h2 className="mt-3 text-4xl sm:text-5xl">Reserve seu horário</h2>
              <p className="mt-4 text-muted-foreground">
                Preencha os dados abaixo e envie o pedido direto para o nosso WhatsApp.
              </p>
            </header>

            <form
              onSubmit={confirmar}
              noValidate
              className="reveal space-y-6 rounded-xl border border-border bg-card p-6 sm:p-8"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div data-erro={Boolean(erros["nome"])}>
                  <label htmlFor="nome" className="mb-2 block text-sm font-medium">
                    Nome completo *
                  </label>
                  <input
                    id="nome"
                    ref={nomeRef}
                    value={nome}
                    maxLength={100}
                    onChange={(e) => {
                      setNome(e.target.value);
                      setErros((x) => ({ ...x, nome: "" }));
                    }}
                    placeholder="Seu nome"
                    aria-invalid={Boolean(erros["nome"])}
                    className={`${campoBase} ${erros["nome"] ? "border-destructive" : "border-border"}`}
                  />
                  {erros["nome"] && (
                    <p className="mt-1.5 text-sm text-destructive">{erros["nome"]}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="telefone" className="mb-2 block text-sm font-medium">
                    Telefone (opcional)
                  </label>
                  <input
                    id="telefone"
                    type="tel"
                    inputMode="tel"
                    maxLength={20}
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="(91) 98000-0000"
                    className={`${campoBase} border-border`}
                  />
                </div>
              </div>

              <div data-erro={Boolean(erros["servico"])}>
                <label htmlFor="servico" className="mb-2 block text-sm font-medium">
                  Serviço *
                </label>
                <select
                  id="servico"
                  value={servicoId}
                  onChange={(e) => {
                    setServicoId(e.target.value);
                    setErros((x) => ({ ...x, servico: "" }));
                  }}
                  aria-invalid={Boolean(erros["servico"])}
                  className={`${campoBase} ${erros["servico"] ? "border-destructive" : "border-border"}`}
                >
                  <option value="">Selecione um serviço</option>
                  {SERVICOS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nome} — {formatarPreco(s.preco)} ({s.duracao})
                    </option>
                  ))}
                </select>
                {erros["servico"] && (
                  <p className="mt-1.5 text-sm text-destructive">{erros["servico"]}</p>
                )}
                <p className="mt-3 flex items-center justify-between rounded-md border border-border bg-secondary/50 px-4 py-3 text-sm">
                  <span className="text-muted-foreground">Valor do serviço</span>
                  <span className="font-display text-xl text-gold">
                    {servico ? formatarPreco(servico.preco) : "—"}
                  </span>
                </p>
              </div>

              <div data-erro={Boolean(erros["data"])}>
                <label htmlFor="data" className="mb-2 block text-sm font-medium">
                  Data *
                </label>
                <input
                  id="data"
                  type="date"
                  value={data}
                  min={hojeISO()}
                  onChange={(e) => {
                    setData(e.target.value);
                    setErros((x) => ({ ...x, data: "" }));
                  }}
                  aria-invalid={Boolean(erros["data"])}
                  className={`${campoBase} ${erros["data"] ? "border-destructive" : "border-border"}`}
                />
                {data && !erros["data"] && (
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    Data escolhida: {dataBR(data)}
                  </p>
                )}
                {erros["data"] && (
                  <p className="mt-1.5 text-sm text-destructive">{erros["data"]}</p>
                )}
              </div>

              <fieldset data-erro={Boolean(erros["horario"])}>
                <legend className="mb-2 block text-sm font-medium">Horário *</legend>
                {!data && (
                  <p className="text-sm text-muted-foreground">
                    Escolha uma data para ver os horários de atendimento.
                  </p>
                )}
                {data && horarios.length === 0 && (
                  <p className="text-sm text-destructive">
                    Aos domingos a barbearia está fechada. Escolha outro dia.
                  </p>
                )}
                {horarios.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                    {horarios.map((h) => (
                      <button
                        key={h}
                        type="button"
                        aria-pressed={horario === h}
                        onClick={() => {
                          setHorario(h);
                          setErros((x) => ({ ...x, horario: "" }));
                        }}
                        className={`rounded-md border px-2 py-2.5 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-gold ${
                          horario === h
                            ? "border-gold bg-gold text-primary-foreground"
                            : "border-border bg-secondary/50 text-foreground"
                        }`}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                )}
                {erros["horario"] && (
                  <p className="mt-1.5 text-sm text-destructive">{erros["horario"]}</p>
                )}
              </fieldset>

              <div>
                <label htmlFor="obs" className="mb-2 block text-sm font-medium">
                  Observações (opcional)
                </label>
                <textarea
                  id="obs"
                  rows={3}
                  maxLength={500}
                  value={obs}
                  onChange={(e) => setObs(e.target.value)}
                  placeholder="Ex.: prefiro máquina 2 nas laterais"
                  className={`${campoBase} border-border resize-none`}
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-whats px-6 py-4 text-base font-semibold text-whats-foreground transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
              >
                Confirmar pelo WhatsApp
              </button>
              <p className="text-center text-xs text-muted-foreground">
                O envio da mensagem não garante a reserva. O horário será confirmado pela
                barbearia pelo WhatsApp.
              </p>
            </form>
          </div>
        </section>

        {/* Avaliações */}
        <section className="mx-auto max-w-6xl px-4 py-24">
          <header className="reveal mb-4 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Avaliações</p>
            <h2 className="mt-3 text-4xl sm:text-5xl">O que dizem por aí</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Depoimentos fictícios, exibidos apenas como exemplo de layout.
            </p>
          </header>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {AVALIACOES.map((a) => (
              <li
                key={a.nome}
                className="reveal rounded-xl border border-border bg-card p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex gap-1" aria-label="Cinco estrelas (exemplo)">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
                  ))}
                </div>
                <p className="mt-4 text-muted-foreground">“{a.texto}”</p>
                <p className="mt-4 font-display text-lg">{a.nome}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Contato */}
        <section id="contato" className="border-t border-border bg-surface/40">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-24 lg:grid-cols-2">
            <div className="reveal">
              <p className="text-xs uppercase tracking-[0.3em] text-gold">Contato</p>
              <h2 className="mt-3 text-4xl sm:text-5xl">Onde nos encontrar</h2>
              <ul className="mt-8 space-y-5">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                  <span>{ENDERECO}</span>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                  <span>
                    Segunda a sexta: 09:00 às 19:00
                    <br />
                    Sábado: 09:00 às 18:00
                    <br />
                    Domingo: fechado
                  </span>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMERO}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-gold"
                  >
                    WhatsApp: (91) 98107-1939
                  </a>
                </li>
                <li className="flex gap-3">
                  <Instagram className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                  <a
                    href="https://instagram.com/barbeariaprime"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-gold"
                  >
                    {INSTAGRAM}
                  </a>
                </li>
              </ul>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ENDERECO)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold mt-8 inline-block rounded-md px-7 py-3.5 text-sm font-semibold"
              >
                Como chegar
              </a>
            </div>

            <div className="reveal overflow-hidden rounded-xl border border-border">
              <iframe
                title="Mapa da localização da Barbearia Prime"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(ENDERECO)}&output=embed`}
                loading="lazy"
                className="h-80 w-full lg:h-full"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Rodapé */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-3">
          <div>
            <p className="font-display text-2xl">
              Barbearia <span className="gold-text">Prime</span>
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Cortes modernos, barba clássica e atendimento que respeita o seu tempo.
            </p>
          </div>
          <nav aria-label="Links rápidos">
            <p className="font-display text-lg">Links rápidos</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-gold">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="font-display text-lg">Contato</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>{ENDERECO}</li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMERO}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold"
                >
                  (91) 98107-1939
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/barbeariaprime"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold"
                >
                  {INSTAGRAM}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Barbearia Prime. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
