# Marathi NLP Research Portal — Design System

## Brand & Style

This design system is built for a high-stakes academic and professional environment focused on Marathi legal and financial analysis. The aesthetic combines the efficiency of a modern SaaS platform with the structural clarity of high-end documentation tools.

The brand personality is **authoritative, premium, and highly organized**. It avoids unnecessary ornamentation, favoring whitespace and a rigorous hierarchy to help researchers navigate complex linguistic data. The emotional response should be one of deep focus, reliability, and intellectual rigor.

**Style Influence:**
- **Minimalism:** Heavy reliance on negative space and a strict grayscale-heavy palette.
- **Corporate/Modern:** Systematic layout structures inspired by developer documentation (GitBook/Notion).
- **Technical Utility:** Functional clarity for displaying scripts, tables, and comparative data.

## Colors

The color strategy uses a deep Navy base to establish authority, paired with an Emerald accent to highlight success states, action items, and data nodes.

- **Primary & Secondary:** Used for structural elements like the sidebar, headers, and primary branding.
- **Accent (Emerald):** Reserved for "Active" states, positive data trends, and primary call-to-action buttons (GitHub/Download).
- **Background:** A cool-toned off-white (#F8FAFC) reduces eye strain during long reading sessions compared to pure white.
- **Surfaces:** Pure white is used exclusively for content cards and data containers to create a "layered" effect against the background.

```yaml
colors:
  surface: '#fcf8fa'
  surface-dim: '#dcd9db'
  surface-bright: '#fcf8fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f5'
  surface-container: '#f0edef'
  surface-container-high: '#eae7e9'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#45464d'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#545f73'
  on-secondary: '#ffffff'
  secondary-container: '#d5e0f8'
  on-secondary-container: '#586377'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#271901'
  on-tertiary-container: '#98805d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d8e3fb'
  secondary-fixed-dim: '#bcc7de'
  on-secondary-fixed: '#111c2d'
  on-secondary-fixed-variant: '#3c475a'
  tertiary-fixed: '#fcdeb5'
  tertiary-fixed-dim: '#dec29a'
  on-tertiary-fixed: '#271901'
  on-tertiary-fixed-variant: '#574425'
  background: '#fcf8fa'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e4'
```

## Typography

The typography system utilizes a three-font strategy to separate intent:
- **Poppins** (Headings): Provides a clean, modern, and slightly geometric look for titles and section headers.
- **Inter** (UI/Body): Used for the majority of the interface and narrative text due to its exceptional legibility.
- **IBM Plex Sans** (Technical): Specifically applied to tabular data, legal citations, and financial figures to provide a "technical documentation" feel that distinguishes data from prose.

**Implementation Note:** Marathi script should be rendered with a fallback to a high-quality regional font (like Mukta) to ensure vertical metrics align with the English Inter/IBM Plex Sans tokens.

```yaml
typography:
  display:
    fontFamily: Poppins
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h1:
    fontFamily: Poppins
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  h1-mobile:
    fontFamily: Poppins
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  h2:
    fontFamily: Poppins
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  h3:
    fontFamily: Poppins
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  code-data:
    fontFamily: IBM Plex Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
```

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for content areas to maintain readability, while the navigation is persistent and fluid.

- **Sidebar Navigation:** A fixed-position sidebar (280px) on the left provides the primary navigational spine. It should be "sticky" to allow users to jump between research sections.
- **The Content Well:** A centered container with a maximum width of 1200px. This prevents line lengths from becoming too long for academic reading.
- **Workflow Diagrams:** These bypass the container width on large screens to allow for horizontal expansion, utilizing an overflow-x scroll when necessary.
- **Breakpoints:**
  - **Desktop (1024px+):** Sidebar visible, 24px gutters.
  - **Tablet (768px - 1023px):** Sidebar collapses into a hamburger menu; margins reduce to 20px.
  - **Mobile (<768px):** Single column stack; headlines use `-mobile` typography tokens.

```yaml
spacing:
  sidebar-width: 280px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
```

## Elevation & Depth

To maintain a clean SaaS aesthetic, this design system uses **Ambient Shadows** and **Tonal Layers** rather than heavy borders.

- **Base Layer:** The #F8FAFC background acts as the canvas.
- **Card Layer:** All primary content (cards, tables, diagrams) sits on pure white (#FFFFFF) backgrounds.
- **Shadow Profile:** Cards utilize a soft, diffused shadow: `0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)`. This creates a subtle lift without appearing dated.
- **Interaction Depth:** On hover, cards may increase their shadow depth slightly and transition the border color to the Primary Navy at 10% opacity.

## Shapes

The shape language is modern and approachable but retains a professional "squareness".

```yaml
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
```

- **Standard Elements:** Buttons, input fields, and small cards use a **0.5rem (8px)** radius.
- **Large Containers:** Expandable cards and diagrams use a **1rem (16px)** radius to soften the appearance of large content blocks.
- **Interactive Triggers:** Search bars and pill-style filters (chips) use a **Full Rounded (Pill)** style to distinguish them from structural content.

## Components

### Buttons & Actions
- **Primary:** Navy Blue (#0F172A) with white text.
- **Action (GitHub/PDF):** Use the Emerald Green (#10B981) for these specific triggers to signal "External Resource" or "Output."
- **Ghost:** Transparent background with Primary color border for secondary navigation within cards.

### Search Bar
A prominent, pill-shaped input at the top of the sidebar or content header. Includes a search icon (prefix) and a "CMD+K" shortcut hint (suffix).

### Expandable Concept Cards
Used for defining NLP terms or legal/financial concepts. They feature a H3 title, a summary line, and a chevron icon. On expansion, they reveal IBM Plex Sans technical documentation text.

### Comparison Tables
- **Header:** Light gray background (#F1F5F9) with Uppercase Label typography.
- **Cells:** Subtle horizontal dividers only (#E2E8F0); no vertical borders. Alternating row highlights are not used; instead, use hover-highlighting.

### Horizontal Workflow Diagrams
Nodes should be white cards with thin #E2E8F0 borders. Connections are rendered in Secondary #1E293B with directional arrows. Labels use the `code-data` typography token.

### Sticky Sidebar
The sidebar uses a hierarchy of bold category labels (Inter Bold) and indented navigation links. Active links are marked with an Emerald Green left-border (4px) and a subtle Navy tint background.
