# CV Analyzer - Design Guidelines

## Visão Geral do Design

**Estilo:** Clean, moderno, profissional  
**Mood:** Confiável, tecnológico, acessível  
**Referências:** Linear, Resend, Vercel, Stripe  

**Princípios de Design:**
1. **Clareza acima de tudo** - Informação deve ser óbvia e imediata
2. **Minimalismo funcional** - Apenas elementos necessários
3. **Hierarquia visual forte** - Usuário sabe onde olhar
4. **Consistência rigorosa** - Padrões repetidos em todo produto

---

## Paleta de Cores

### Cores Principais (Base Dark Theme)

```css
/* Background & Surface */
--background: #0a0a0a;        /* Quase preto - Background principal */
--surface-1: #1a1a1a;         /* Cards, elevação nível 1 */
--surface-2: #262626;         /* Cards hover, elevação nível 2 */
--surface-3: #404040;         /* Elementos interativos inativos */

/* Text */
--text-primary: #fafafa;      /* Texto principal */
--text-secondary: #a3a3a3;    /* Texto secundário */
--text-tertiary: #737373;     /* Labels, hints */
--text-disabled: #404040;     /* Texto desabilitado */

/* Border */
--border-subtle: #262626;     /* Bordas sutis */
--border-default: #404040;    /* Bordas padrão */
--border-strong: #737373;     /* Bordas com ênfase */
```

### Cores de Destaque (Accent Colors)

```css
/* Purple/Pink Gradient (Marca) */
--accent-purple: #a855f7;     /* Purple 500 */
--accent-pink: #ec4899;       /* Pink 500 */
--accent-gradient: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);

/* Uso do gradiente: */
/* - Botões primários */
/* - Headers de destaque */
/* - Elementos de marca (logo, badges) */
/* - Elementos interativos importantes */
```

### Cores Semânticas

```css
/* Success */
--success-bg: #166534;        /* Green 800 - Background */
--success-border: #22c55e;    /* Green 500 - Border */
--success-text: #86efac;      /* Green 300 - Text */

/* Warning */
--warning-bg: #78350f;        /* Orange 900 - Background */
--warning-border: #f97316;    /* Orange 500 - Border */
--warning-text: #fdba74;      /* Orange 300 - Text */

/* Error */
--error-bg: #7f1d1d;          /* Red 900 - Background */
--error-border: #ef4444;      /* Red 500 - Border */
--error-text: #fca5a5;        /* Red 300 - Text */

/* Info */
--info-bg: #1e3a8a;           /* Blue 900 - Background */
--info-border: #3b82f6;       /* Blue 500 - Border */
--info-text: #93c5fd;         /* Blue 300 - Text */
```

### Uso de Cores por Contexto

**Backgrounds:**
- Página: `--background` (#0a0a0a)
- Cards principais: `--surface-1` (#1a1a1a)
- Cards secundários/nested: `--surface-2` (#262626)

**Texto:**
- Headlines: `--text-primary` (#fafafa)
- Body: `--text-secondary` (#a3a3a3)
- Labels/Caption: `--text-tertiary` (#737373)

**Elementos Interativos:**
- Primário: Gradiente purple/pink
- Secundário: `--surface-2` com borda
- Terciário: Apenas texto com hover

**Bordas:**
- Sutis (divisores): `--border-subtle` (#262626)
- Padrão (cards): `--border-default` (#404040)
- Ênfase (focus): Gradiente ou `--accent-purple`

---

## Tipografia

### Fonts

```css
/* Fonte Principal (Sans-serif) */
--font-sans: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Fonte Display (Serif - Headlines) */
--font-serif: 'Playfair Display', Georgia, serif;

/* Fonte Mono (Código/Data) */
--font-mono: 'Geist Mono', 'SF Mono', Consolas, monospace;
```

**Onde usar cada fonte:**
- **Geist Sans:** Body text, UI elements, botões, labels
- **Playfair Display:** H1, H2 importantes, branding
- **Geist Mono:** Scores numéricos, código, timestamps

### Escala Tipográfica

```css
/* Display (Playfair - Serif) */
--text-display-xl: 64px;  /* 4rem - Hero headlines */
--text-display-lg: 48px;  /* 3rem - Section headlines */
--text-display-md: 36px;  /* 2.25rem - Subsection headlines */

/* Headings (Geist Sans ou Playfair) */
--text-h1: 32px;          /* 2rem */
--text-h2: 24px;          /* 1.5rem */
--text-h3: 20px;          /* 1.25rem */
--text-h4: 18px;          /* 1.125rem */

/* Body (Geist Sans) */
--text-lg: 18px;          /* 1.125rem - Intro paragraphs */
--text-base: 16px;        /* 1rem - Body padrão */
--text-sm: 14px;          /* 0.875rem - Secondary text */
--text-xs: 12px;          /* 0.75rem - Captions, labels */
```

### Font Weights

```css
--font-light: 300;        /* Raramente usado */
--font-normal: 400;       /* Body text padrão */
--font-medium: 500;       /* Emphasis, labels */
--font-semibold: 600;     /* Subheadings */
--font-bold: 700;         /* Headings, CTAs */
--font-black: 900;        /* Display text, números de destaque */
```

### Line Heights

```css
--leading-tight: 1.1;     /* Display text, headlines */
--leading-snug: 1.25;     /* Headings */
--leading-normal: 1.5;    /* Body text */
--leading-relaxed: 1.75;  /* Long-form content */
```

### Uso por Elemento

**Headlines (H1-H2):**
- Font: Playfair Display
- Weight: Bold (700)
- Line-height: Tight (1.1)
- Tracking: -0.02em (ligeiramente negativo)

**Subheadings (H3-H4):**
- Font: Geist Sans
- Weight: Semibold (600) ou Bold (700)
- Line-height: Snug (1.25)

**Body:**
- Font: Geist Sans
- Weight: Normal (400)
- Size: 16px
- Line-height: Normal (1.5)

**Labels/Captions:**
- Font: Geist Sans
- Weight: Medium (500)
- Size: 12-14px
- Tracking: 0.05em (uppercase labels)

**Números/Scores:**
- Font: Geist Mono ou Geist Sans Bold
- Weight: Black (900)
- Size: 48-72px (destaque)

---

## Espaçamento

### Escala de Espaçamento (baseada em 4px)

```css
--space-0: 0px;
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-32: 128px;
```

### Uso por Contexto

**Padding Interno (Cards, Containers):**
- Small: `--space-4` (16px)
- Medium: `--space-6` (24px)
- Large: `--space-8` (32px)

**Gap entre Elementos:**
- Tight: `--space-2` (8px) - Elementos relacionados
- Default: `--space-4` (16px) - Elementos independentes
- Loose: `--space-6` (24px) - Grupos separados

**Margin entre Seções:**
- Mobile: `--space-16` (64px)
- Desktop: `--space-20` ou `--space-24` (80-96px)

**Espaçamento Vertical (Stack):**
```css
/* Dentro de um card/componente */
gap: var(--space-4);  /* 16px entre elementos */

/* Entre seções da página */
gap: var(--space-20); /* 80px entre seções */
```

---

## Border Radius

```css
--radius-sm: 8px;      /* Small elements (badges, tags) */
--radius-md: 12px;     /* Buttons, inputs */
--radius-lg: 16px;     /* Cards, modals */
--radius-xl: 20px;     /* Large cards */
--radius-2xl: 24px;    /* Hero cards, featured elements */
--radius-full: 9999px; /* Pills, avatars */
```

**Uso:**
- **Botões:** `--radius-md` (12px) ou `--radius-lg` (16px)
- **Cards principais:** `--radius-xl` (20px) ou `--radius-2xl` (24px)
- **Inputs:** `--radius-md` (12px)
- **Badges:** `--radius-full` (pill shape)
- **Avatares:** `--radius-full` (circular)

---

## Sombras (Shadows)

### Sombras de Elevação

```css
/* Sombras sutis para dark theme */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.5);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 
             0 2px 4px -2px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 
             0 4px 6px -4px rgba(0, 0, 0, 0.5);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.6), 
             0 8px 10px -6px rgba(0, 0, 0, 0.6);
```

### Sombras Coloridas (Glow Effects)

```css
/* Para elementos com gradiente */
--shadow-purple: 0 8px 24px rgba(168, 85, 247, 0.2);
--shadow-pink: 0 8px 24px rgba(236, 72, 153, 0.2);
--shadow-gradient: 0 8px 24px rgba(168, 85, 247, 0.15),
                   0 4px 12px rgba(236, 72, 153, 0.15);
```

**Uso:**
- **Cards padrão:** `--shadow-md`
- **Cards hover:** `--shadow-lg`
- **Modals/overlays:** `--shadow-xl`
- **Botões primários (gradiente):** `--shadow-gradient`
- **Elementos floating:** `--shadow-lg` + `--shadow-purple`

---

## Componentes (shadcn/ui)

### Componentes a Usar

**Já no Projeto:**
- `Button` - CTAs, ações
- `Card` - Containers de conteúdo
- `Input` - Campos de texto
- `Textarea` - Campos de texto longo
- `Badge` - Labels, tags
- `Progress` - Indicadores de progresso

**A Adicionar (conforme necessário):**
- `Dialog` - Modals, paywall
- `Dropdown Menu` - Menus de ações
- `Tabs` - Navegação entre seções
- `Alert` - Mensagens de erro/sucesso
- `Skeleton` - Loading states
- `Tooltip` - Hints, explicações

### Customização dos Componentes

**Button:**
```tsx
// Variantes
variant: "default"   // Gradiente purple/pink
variant: "secondary" // Surface-2 com borda
variant: "outline"   // Transparente com borda
variant: "ghost"     // Apenas hover state

// Tamanhos
size: "sm"  // 32px altura
size: "md"  // 40px altura (default)
size: "lg"  // 48px altura
```

**Card:**
```tsx
// Sempre usar com:
className="bg-surface-1 border border-border-default rounded-xl p-6"

// Hover state:
className="... hover:bg-surface-2 hover:shadow-lg transition-all"
```

**Input/Textarea:**
```tsx
// Style padrão:
className="bg-surface-1 border-border-default focus:border-accent-purple focus:ring-2 focus:ring-accent-purple/20"
```

**Badge:**
```tsx
// Variantes customizadas:
variant: "default"   // Gradiente sutil
variant: "success"   // Verde
variant: "warning"   // Laranja
variant: "outline"   // Apenas borda
```

---

## Animações e Transições

### Timing Functions

```css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* Bounce */
```

### Durações

```css
--duration-fast: 150ms;     /* Micro-interactions */
--duration-normal: 300ms;   /* Hover, focus states */
--duration-slow: 500ms;     /* Page transitions, modals */
```

### Animações Comuns

**Hover States:**
```css
.button {
  transition: all var(--duration-normal) var(--ease-out);
}

.button:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-gradient);
}
```

**Fade In (Scroll Reveal):**
```css
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: fade-in 0.6s var(--ease-out) forwards;
}
```

**Blob Animation (Background):**
```css
@keyframes blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}
```

**Spin (Loading):**
```css
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
```

### Princípios de Animação

1. **Performance-first:** Apenas animar `transform` e `opacity`
2. **Subtle:** Movimentos pequenos (2-5px translate, 1.02-1.05 scale)
3. **Purposeful:** Animação deve comunicar estado ou guiar atenção
4. **Skipável:** Não bloquear interação durante animação

---

## Ícones e Elementos Visuais

### Política de Ícones

**NÃO usar ícones SVG complexos** (conforme requisito)

**Usar:**
- **Emojis** - Para representação visual leve (✓, 🎯, 💪, etc.)
- **Formas geométricas** - Círculos, quadrados, linhas para indicadores
- **Caracteres especiais** - Setas (→, ↑), bullets (•), checkmarks (✓)
- **Números** - Dentro de círculos/quadrados para steps

### Exemplos de Uso

**Checkmark/Success:**
```tsx
<div className="w-6 h-6 rounded-full bg-success-bg flex items-center justify-center">
  <span className="text-success-text">✓</span>
</div>
```

**Step Indicator:**
```tsx
<div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
  <span className="text-2xl font-bold text-white">1</span>
</div>
```

**Bullet Point:**
```tsx
<div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
```

---

## Layout e Grid

### Container

```css
.container {
  max-width: 1280px;        /* Desktop max */
  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;       /* Mobile padding */
  padding-right: 24px;
}

@media (min-width: 768px) {
  .container {
    padding-left: 40px;     /* Tablet padding */
    padding-right: 40px;
  }
}
```

### Grid System

**2 Colunas (Desktop):**
```tsx
<div className="grid lg:grid-cols-2 gap-8">
  {/* Conteúdo */}
</div>
```

**3 Colunas (Features, Cards):**
```tsx
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Conteúdo */}
</div>
```

**Breakpoints (Tailwind):**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

---

## Estados Interativos

### Hover States

```css
/* Botões */
.button:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-lg);
}

/* Cards */
.card:hover {
  background: var(--surface-2);
  border-color: var(--border-strong);
}

/* Links */
.link:hover {
  color: var(--accent-purple);
  text-decoration: underline;
}
```

### Focus States

```css
/* Inputs */
.input:focus {
  outline: none;
  border-color: var(--accent-purple);
  box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.1);
}

/* Botões */
.button:focus-visible {
  outline: 2px solid var(--accent-purple);
  outline-offset: 2px;
}
```

### Disabled States

```css
.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

### Loading States

```tsx
<button disabled>
  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
  Carregando...
</button>
```

---

## Referências Visuais

### Sites de Inspiração

**Linear (linear.app):**
- Layout limpo e espaçoso
- Gradientes sutis em backgrounds
- Tipografia excelente (Inter + System fonts)
- Animações suaves

**Resend (resend.com):**
- Hero section impactante
- Uso inteligente de código/mono font
- CTAs bem posicionados
- Simplicidade elegante

**Vercel (vercel.com):**
- Dark theme refinado
- Hierarquia visual clara
- Componentes consistentes
- Performance exemplar

**Stripe (stripe.com):**
- Confiança através do design
- Informação clara e direta
- Pricing bem explicado
- Mobile-first execution

### O Que Pegar de Cada Referência

- **Linear:** Espaçamento generoso, gradientes sutis, micro-interações
- **Resend:** Simplicidade, clareza de informação, tipografia
- **Vercel:** Dark theme execution, performance, consistência
- **Stripe:** Confiança, pricing clarity, mobile UX

---

## Checklist de Implementação

### Ao Criar Novo Componente:

- [ ] Usar tokens de cor (não hardcode hex values)
- [ ] Seguir escala de espaçamento (múltiplos de 4px)
- [ ] Aplicar border-radius consistente
- [ ] Adicionar hover/focus states
- [ ] Testar responsividade (mobile, tablet, desktop)
- [ ] Garantir contraste WCAG AA (4.5:1 para texto)
- [ ] Animar apenas `transform` e `opacity`
- [ ] Adicionar loading states se assíncrono

### Ao Criar Nova Página:

- [ ] Usar container max-width 1280px
- [ ] Padding horizontal consistente (24px mobile, 40px desktop)
- [ ] Seções espaçadas (80-96px verticalmente)
- [ ] H1 único e semanticamente correto
- [ ] CTAs acima da dobra (mobile e desktop)
- [ ] Testar com conteúdo real (não lorem ipsum)

---

**Próximo passo:** Usar estas guidelines durante implementação para garantir consistência visual em todo o produto.
