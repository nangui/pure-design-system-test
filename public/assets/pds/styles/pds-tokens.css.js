// Pure Design System - tokens
// Auto-generated - do not edit directly

export const tokens = new CSSStyleSheet();
tokens.replaceSync(`@layer tokens {
       :root {
            /* Colors */
  --color-primary-50: #e8f1fc;
  --color-primary-100: #c3dbfa;
  --color-primary-200: #91bef9;
  --color-primary-300: #60a2f6;
  --color-primary-400: #3085f3;
  --color-primary-500: #1877f2;
  --color-primary-600: #0b5fcc;
  --color-primary-700: #09499b;
  --color-primary-800: #06326b;
  --color-primary-900: #031b3b;
  --color-secondary-50: #d7dade;
  --color-secondary-100: #b8becb;
  --color-secondary-200: #a5a7aa;
  --color-secondary-300: #8b8d92;
  --color-secondary-400: #717478;
  --color-secondary-500: #65676b;
  --color-secondary-600: #4c4e51;
  --color-secondary-700: #333437;
  --color-secondary-800: #252627;
  --color-secondary-900: #19191a;
  --color-accent-50: #fee7eb;
  --color-accent-100: #fdced7;
  --color-accent-200: #ffabbb;
  --color-accent-300: #fe7892;
  --color-accent-400: #fe4569;
  --color-accent-500: #fe2c55;
  --color-accent-600: #f60131;
  --color-accent-700: #c30127;
  --color-accent-800: #90011d;
  --color-accent-900: #5e0013;
  --color-success-50: #d1fad1;
  --color-success-100: #a0f7a0;
  --color-success-200: #6ef76e;
  --color-success-300: #3df43d;
  --color-success-400: #0df10d;
  --color-success-500: #0cd90c;
  --color-success-600: #09a909;
  --color-success-700: #077807;
  --color-success-800: #044804;
  --color-success-900: #033003;
  --color-warning-50: #fef8e7;
  --color-warning-100: #fdebb4;
  --color-warning-200: #ffdf80;
  --color-warning-300: #ffd24d;
  --color-warning-400: #ffc51a;
  --color-warning-500: #FFBF00;
  --color-warning-600: #cc9900;
  --color-warning-700: #997300;
  --color-warning-800: #664c00;
  --color-warning-900: #332600;
  --color-danger-50: #fce8e8;
  --color-danger-100: #f9b9b9;
  --color-danger-200: #f88787;
  --color-danger-300: #f55656;
  --color-danger-400: #f22626;
  --color-danger-500: #f10e0e;
  --color-danger-600: #c10b0b;
  --color-danger-700: #910808;
  --color-danger-800: #600606;
  --color-danger-900: #300303;
  --color-info-50: #e8f1fc;
  --color-info-100: #c3dbfa;
  --color-info-200: #91bef9;
  --color-info-300: #60a2f6;
  --color-info-400: #3085f3;
  --color-info-500: #1877f2;
  --color-info-600: #0b5fcc;
  --color-info-700: #09499b;
  --color-info-800: #06326b;
  --color-info-900: #031b3b;
  --color-gray-50: #fafafa;
  --color-gray-100: #f2f2f3;
  --color-gray-200: #e0e0e1;
  --color-gray-300: #c5c6c9;
  --color-gray-400: #96989c;
  --color-gray-500: #65676b;
  --color-gray-600: #6a707c;
  --color-gray-700: #505663;
  --color-gray-800: #2c313a;
  --color-gray-900: #16181d;
  --color-surface-base: #ffffff;
  --color-surface-subtle: #fafafa;
  --color-surface-elevated: #f5f4f4;
  --color-surface-sunken: #f0efef;
  --color-surface-overlay: #fafafa;
  --color-surface-inverse: #151313;
  --color-surface-hover: color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);;
  --color-surface-fieldset-base: #fafafa;
  --color-surface-fieldset-subtle: #f5f4f4;
  --color-surface-fieldset-elevated: #f0efef;
  --color-surface-fieldset-sunken: #e4e3e3;
  --color-surface-fieldset-overlay: #f5f4f4;
  /* Smart Surface Tokens (context-aware) */
  --surface-base-bg: #ffffff;
  --surface-base-text: #000000;
  --surface-base-text-secondary: #000000;
  --surface-base-text-muted: #666666;
  --surface-base-icon: #000000;
  --surface-base-icon-subtle: #666666;
  --surface-base-shadow: rgba(0, 0, 0, 0.1);
  --surface-base-border: rgba(0, 0, 0, 0.1);
  --surface-subtle-bg: #fafafa;
  --surface-subtle-text: #000000;
  --surface-subtle-text-secondary: #000000;
  --surface-subtle-text-muted: #646464;
  --surface-subtle-icon: #000000;
  --surface-subtle-icon-subtle: #646464;
  --surface-subtle-shadow: rgba(0, 0, 0, 0.1);
  --surface-subtle-border: rgba(0, 0, 0, 0.1);
  --surface-elevated-bg: #f5f4f4;
  --surface-elevated-text: #000000;
  --surface-elevated-text-secondary: #000000;
  --surface-elevated-text-muted: #626262;
  --surface-elevated-icon: #000000;
  --surface-elevated-icon-subtle: #626262;
  --surface-elevated-shadow: rgba(0, 0, 0, 0.1);
  --surface-elevated-border: rgba(0, 0, 0, 0.1);
  --surface-sunken-bg: #f0efef;
  --surface-sunken-text: #000000;
  --surface-sunken-text-secondary: #000000;
  --surface-sunken-text-muted: #606060;
  --surface-sunken-icon: #000000;
  --surface-sunken-icon-subtle: #606060;
  --surface-sunken-shadow: rgba(0, 0, 0, 0.1);
  --surface-sunken-border: rgba(0, 0, 0, 0.1);
  --surface-overlay-bg: #fafafa;
  --surface-overlay-text: #000000;
  --surface-overlay-text-secondary: #000000;
  --surface-overlay-text-muted: #646464;
  --surface-overlay-icon: #000000;
  --surface-overlay-icon-subtle: #646464;
  --surface-overlay-shadow: rgba(0, 0, 0, 0.1);
  --surface-overlay-border: rgba(0, 0, 0, 0.1);
  --surface-inverse-bg: #151313;
  --surface-inverse-text: #ffffff;
  --surface-inverse-text-secondary: #ffffff;
  --surface-inverse-text-muted: #a1a1a1;
  --surface-inverse-icon: #ffffff;
  --surface-inverse-icon-subtle: #a1a1a1;
  --surface-inverse-shadow: rgba(255, 255, 255, 0.25);
  --surface-inverse-border: rgba(255, 255, 255, 0.15);

  /* Semantic Text Colors */
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-600);
  --color-text-muted: var(--color-gray-600);
  --color-border: var(--color-gray-300);
  --color-input-bg: var(--color-surface-base);
  --color-input-disabled-bg: var(--color-gray-50);
  --color-input-disabled-text: var(--color-gray-500);
  --color-code-bg: var(--color-gray-100);
  /* Interactive Colors - optimized for specific use cases */
  --color-primary-fill: #0b5fcc; /* For button backgrounds with white text */
  --color-primary-text: #0b5fcc; /* For links and outline buttons on light surfaces */
  /* Translucent Surface Tokens */
  --color-surface-translucent-25: color-mix(in oklab, var(--color-surface-subtle) 25%, transparent 75%);
  --color-surface-translucent-50: color-mix(in oklab, var(--color-surface-subtle) 50%, transparent 50%);
  --color-surface-translucent-75: color-mix(in oklab, var(--color-surface-subtle) 75%, transparent 25%);
   /* Backdrop tokens - used for modal dialogs, drawers, overlays */

    --backdrop-bg: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.2),
        rgba(255, 255, 255, 0.1)
      );
    --backdrop-blur: 10px;
    --backdrop-saturate: 150%;
    --backdrop-brightness: 0.9;
    --backdrop-filter: blur(var(--backdrop-blur)) saturate(var(--backdrop-saturate)) brightness(var(--backdrop-brightness));
    --backdrop-opacity: 1;
    
    /* Legacy alias for backwards compatibility */
    --backdrop-background: var(--backdrop-bg);
    
  /* Mesh Gradient Backgrounds */
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, #1877f2 25%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, #65676b 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, #fe2c55 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, #1877f2 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, #65676b 24%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, #1877f2 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, #fe2c55 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, #65676b 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, #fe2c55 21%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, #1877f2 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, #65676b 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, #fe2c55 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, #1877f2 19%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, #65676b 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, #fe2c55 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, #1877f2 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, #1877f2 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, #fe2c55 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, #65676b 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, #fe2c55 15%, transparent) 0px, transparent 50%);
    

            /* Spacing */
  --spacing-0: 0;
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 20px;
  --spacing-6: 24px;
  --spacing-7: 28px;
  --spacing-8: 32px;
  --spacing-9: 36px;
  --spacing-10: 40px;
  --spacing-11: 44px;
  --spacing-12: 48px;


            /* Border Radius */
  --radius-none: 0;
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;


            /* Border Widths */
  --border-width-hairline: 0.5px;
  --border-width-thin: 1px;
  --border-width-medium: 2px;
  --border-width-thick: 3px;


            /* Typography */
  --font-family-headings: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-family-body: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-family-mono: ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace;
  --font-size-xs: 10px;
  --font-size-sm: 13px;
  --font-size-base: 15px;
  --font-size-lg: 18px;
  --font-size-xl: 22px;
  --font-size-2xl: 26px;
  --font-size-3xl: 31px;
  --font-size-4xl: 37px;
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-line-height-tight: 1.25;
  --font-line-height-normal: 1.75;
  --font-line-height-relaxed: 1.75;


            /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05);
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);


            /* Layout */
  --layout-max-width: 1200px;
  --layout-max-width-sm: 608px;
  --layout-max-width-md: 736px;
  --layout-max-width-lg: 992px;
  --layout-max-width-xl: 1200px;
  --layout-min-height: 100vh;
  --layout-container-padding: 16px;
  --layout-page-margin: 120px;
  --layout-section-gap: 160px;
  --layout-container-gap: 200px;
  --layout-hero-spacing: 240px;
  --layout-footer-spacing: 160px;


            /* Transitions */
  --transition-fast: 90ms;
  --transition-normal: 150ms;
  --transition-slow: 210ms;


            /* Z-Index */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal: 1040;
  --z-drawer: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
  --z-notification: 1080;


            /* Icon System */
  --icon-set: phosphor;
  --icon-weight: regular;
  --icon-size: 24px;
  --icon-size-xs: 16px;
  --icon-size-sm: 20px;
  --icon-size-md: 24px;
  --icon-size-lg: 32px;
  --icon-size-xl: 48px;
  --icon-size-2xl: 64px;


       }
       
       html[data-theme="dark"] {
    --color-surface-base: #18191a;
    --color-surface-subtle: #131415;
    --color-surface-elevated: #0e0f0f;
    --color-surface-sunken: #141415;
    --color-surface-overlay: #1d1e1f;
    --color-surface-inverse: #f2f2f3;
    --color-surface-hover: color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);;
    --color-surface-fieldset-base: #0e0f0f;
    --color-surface-fieldset-subtle: #1d1e1f;
    --color-surface-fieldset-elevated: #212323;
    --color-surface-fieldset-sunken: #0e0f0f;
    --color-surface-fieldset-overlay: #28292b;
    --color-primary-50: #e7f1fe;
    --color-primary-100: #cde2fe;
    --color-primary-200: #add0ff;
    --color-primary-300: #7ab3ff;
    --color-primary-400: #4796ff;
    --color-primary-500: #2d88ff;
    --color-primary-600: #006cf9;
    --color-primary-700: #0056c6;
    --color-primary-800: #004093;
    --color-primary-900: #002a60;
    --color-secondary-50: #f1f2f4;
    --color-secondary-100: #e2e5e9;
    --color-secondary-200: #d7d8db;
    --color-secondary-300: #bcbec3;
    --color-secondary-400: #a1a5ab;
    --color-secondary-500: #b0b3b8;
    --color-secondary-600: #9599a0;
    --color-secondary-700: #7a7f88;
    --color-secondary-800: #62666d;
    --color-secondary-900: #4a4d52;
    --color-accent-50: #440814;
    --color-accent-100: #680c1e;
    --color-accent-200: #8c1029;
    --color-accent-300: #b11433;
    --color-accent-400: #e9143e;
    --color-accent-500: #ec264d;
    --color-accent-600: #ef4f6e;
    --color-accent-700: #f4768e;
    --color-accent-800: #fabac6;
    --color-accent-900: #fcd1d8;
    --color-gray-50: #fafafa;
    --color-gray-100: #f2f2f3;
    --color-gray-200: #dfe0e2;
    --color-gray-300: #c4c6ca;
    --color-gray-400: #94989e;
    --color-gray-500: #b0b3b8;
    --color-gray-600: #67707f;
    --color-gray-700: #4d5665;
    --color-gray-800: #2b313b;
    --color-gray-900: #15181e;
    --color-success-50: #062306;
    --color-success-100: #093409;
    --color-success-200: #0f570f;
    --color-success-300: #147a14;
    --color-success-400: #17ab17;
    --color-success-500: #1abe1a;
    --color-success-600: #22e122;
    --color-success-700: #49e649;
    --color-success-800: #90f390;
    --color-success-900: #bef6be;
    --color-info-50: #07162b;
    --color-info-100: #0d294e;
    --color-info-200: #133c70;
    --color-info-300: #184e94;
    --color-info-400: #1b66c7;
    --color-info-500: #1e70d9;
    --color-info-600: #3e87e5;
    --color-info-700: #659eea;
    --color-info-800: #b0cff6;
    --color-info-900: #d4e4f8;
    --color-warning-50: #251c04;
    --color-warning-100: #493908;
    --color-warning-200: #6e560c;
    --color-warning-300: #937210;
    --color-warning-400: #c89a10;
    --color-warning-500: #ddaa12;
    --color-warning-600: #eebd2c;
    --color-warning-700: #f1ca54;
    --color-warning-800: #fae4a1;
    --color-warning-900: #fcf1d1;
    --color-danger-50: #230606;
    --color-danger-100: #460c0c;
    --color-danger-200: #691111;
    --color-danger-300: #8c1717;
    --color-danger-400: #be1a1a;
    --color-danger-500: #d11d1d;
    --color-danger-600: #e33636;
    --color-danger-700: #e95d5d;
    --color-danger-800: #f5a7a7;
    --color-danger-900: #f8d4d4;
    /* Smart Surface Tokens (dark mode, context-aware) */
    --surface-base-bg: #18191a;
    --surface-base-text: #ffffff;
    --surface-base-text-secondary: #ffffff;
    --surface-base-text-muted: #a3a3a3;
    --surface-base-icon: #ffffff;
    --surface-base-icon-subtle: #a3a3a3;
    --surface-base-shadow: rgba(255, 255, 255, 0.25);
    --surface-base-border: rgba(255, 255, 255, 0.15);
    --surface-subtle-bg: #131415;
    --surface-subtle-text: #ffffff;
    --surface-subtle-text-secondary: #ffffff;
    --surface-subtle-text-muted: #a1a1a1;
    --surface-subtle-icon: #ffffff;
    --surface-subtle-icon-subtle: #a1a1a1;
    --surface-subtle-shadow: rgba(255, 255, 255, 0.25);
    --surface-subtle-border: rgba(255, 255, 255, 0.15);
    --surface-elevated-bg: #0e0f0f;
    --surface-elevated-text: #ffffff;
    --surface-elevated-text-secondary: #ffffff;
    --surface-elevated-text-muted: #9f9f9f;
    --surface-elevated-icon: #ffffff;
    --surface-elevated-icon-subtle: #9f9f9f;
    --surface-elevated-shadow: rgba(255, 255, 255, 0.25);
    --surface-elevated-border: rgba(255, 255, 255, 0.15);
    --surface-sunken-bg: #141415;
    --surface-sunken-text: #ffffff;
    --surface-sunken-text-secondary: #ffffff;
    --surface-sunken-text-muted: #a1a1a1;
    --surface-sunken-icon: #ffffff;
    --surface-sunken-icon-subtle: #a1a1a1;
    --surface-sunken-shadow: rgba(255, 255, 255, 0.25);
    --surface-sunken-border: rgba(255, 255, 255, 0.15);
    --surface-overlay-bg: #1d1e1f;
    --surface-overlay-text: #ffffff;
    --surface-overlay-text-secondary: #ffffff;
    --surface-overlay-text-muted: #a5a5a5;
    --surface-overlay-icon: #ffffff;
    --surface-overlay-icon-subtle: #a5a5a5;
    --surface-overlay-shadow: rgba(255, 255, 255, 0.25);
    --surface-overlay-border: rgba(255, 255, 255, 0.15);
    --surface-inverse-bg: #f2f2f3;
    --surface-inverse-text: #000000;
    --surface-inverse-text-secondary: #000000;
    --surface-inverse-text-muted: #616161;
    --surface-inverse-icon: #000000;
    --surface-inverse-icon-subtle: #616161;
    --surface-inverse-shadow: rgba(0, 0, 0, 0.1);
    --surface-inverse-border: rgba(0, 0, 0, 0.1);

    --color-text-primary: var(--color-gray-100);
    --color-text-secondary: var(--color-gray-300);
    --color-text-muted: var(--color-gray-400);
    --color-border: var(--color-gray-700);
    --color-input-bg: var(--color-gray-800);
    --color-input-disabled-bg: var(--color-gray-900);
    --color-input-disabled-text: var(--color-gray-600);
    --color-code-bg: var(--color-gray-800);
    /* Interactive Colors - optimized for specific use cases (dark mode) */
    --color-primary-fill: #006cf9; /* For button backgrounds with white text */
    --color-primary-text: #2d88ff; /* For links and outline buttons on dark surfaces */
    /* Backdrop tokens - dark mode */
    --backdrop-bg: linear-gradient(
        135deg,
        rgba(0, 0, 0, 0.6),
        rgba(0, 0, 0, 0.4)
      );
    --backdrop-blur: 10px;
    --backdrop-saturate: 120%;
    --backdrop-brightness: 0.7;
    --backdrop-filter: blur(var(--backdrop-blur)) saturate(var(--backdrop-saturate)) brightness(var(--backdrop-brightness));
    --backdrop-opacity: 1;
    
    /* Legacy alias for backwards compatibility */
    --backdrop-background: var(--backdrop-bg);
    /* Mesh Gradient Variables (Dark Mode) */
    --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, #4796ff 20%, transparent) 0px, transparent 50%),
      radial-gradient(at 97% 21%, color-mix(in oklab, #a1a5ab 16%, transparent) 0px, transparent 50%),
      radial-gradient(at 52% 99%, color-mix(in oklab, #e9143e 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 10% 29%, color-mix(in oklab, #4796ff 10%, transparent) 0px, transparent 50%);
    
    --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, #a1a5ab 18%, transparent) 0px, transparent 50%),
      radial-gradient(at 80% 0%, color-mix(in oklab, #4796ff 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 0% 50%, color-mix(in oklab, #e9143e 12%, transparent) 0px, transparent 50%),
      radial-gradient(at 80% 100%, color-mix(in oklab, #a1a5ab 10%, transparent) 0px, transparent 50%);
    
    --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, #e9143e 15%, transparent) 0px, transparent 50%),
      radial-gradient(at 85% 30%, color-mix(in oklab, #4796ff 17%, transparent) 0px, transparent 50%),
      radial-gradient(at 50% 80%, color-mix(in oklab, #a1a5ab 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 90%, color-mix(in oklab, #e9143e 11%, transparent) 0px, transparent 50%);
    
    --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, #4796ff 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 20% 80%, color-mix(in oklab, #a1a5ab 16%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 60%, color-mix(in oklab, #e9143e 12%, transparent) 0px, transparent 50%),
      radial-gradient(at 30% 40%, color-mix(in oklab, #4796ff 11%, transparent) 0px, transparent 50%);
    
    --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, #4796ff 17%, transparent) 0px, transparent 50%),
      radial-gradient(at 10% 10%, color-mix(in oklab, #e9143e 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 10%, color-mix(in oklab, #a1a5ab 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 50% 90%, color-mix(in oklab, #e9143e 10%, transparent) 0px, transparent 50%);
             }

    }
/* Non-layered dark variables fallback (ensures attribute wins) */
html[data-theme="dark"] {
  --color-surface-base: #18191a;
  --color-surface-subtle: #131415;
  --color-surface-elevated: #0e0f0f;
  --color-surface-sunken: #141415;
  --color-surface-overlay: #1d1e1f;
  --color-surface-inverse: #f2f2f3;
  --color-surface-hover: color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);;
  --color-surface-fieldset-base: #0e0f0f;
  --color-surface-fieldset-subtle: #1d1e1f;
  --color-surface-fieldset-elevated: #212323;
  --color-surface-fieldset-sunken: #0e0f0f;
  --color-surface-fieldset-overlay: #28292b;
  --color-primary-50: #e7f1fe;
  --color-primary-100: #cde2fe;
  --color-primary-200: #add0ff;
  --color-primary-300: #7ab3ff;
  --color-primary-400: #4796ff;
  --color-primary-500: #2d88ff;
  --color-primary-600: #006cf9;
  --color-primary-700: #0056c6;
  --color-primary-800: #004093;
  --color-primary-900: #002a60;
  --color-secondary-50: #f1f2f4;
  --color-secondary-100: #e2e5e9;
  --color-secondary-200: #d7d8db;
  --color-secondary-300: #bcbec3;
  --color-secondary-400: #a1a5ab;
  --color-secondary-500: #b0b3b8;
  --color-secondary-600: #9599a0;
  --color-secondary-700: #7a7f88;
  --color-secondary-800: #62666d;
  --color-secondary-900: #4a4d52;
  --color-accent-50: #440814;
  --color-accent-100: #680c1e;
  --color-accent-200: #8c1029;
  --color-accent-300: #b11433;
  --color-accent-400: #e9143e;
  --color-accent-500: #ec264d;
  --color-accent-600: #ef4f6e;
  --color-accent-700: #f4768e;
  --color-accent-800: #fabac6;
  --color-accent-900: #fcd1d8;
  --color-gray-50: #fafafa;
  --color-gray-100: #f2f2f3;
  --color-gray-200: #dfe0e2;
  --color-gray-300: #c4c6ca;
  --color-gray-400: #94989e;
  --color-gray-500: #b0b3b8;
  --color-gray-600: #67707f;
  --color-gray-700: #4d5665;
  --color-gray-800: #2b313b;
  --color-gray-900: #15181e;
  --color-success-50: #062306;
  --color-success-100: #093409;
  --color-success-200: #0f570f;
  --color-success-300: #147a14;
  --color-success-400: #17ab17;
  --color-success-500: #1abe1a;
  --color-success-600: #22e122;
  --color-success-700: #49e649;
  --color-success-800: #90f390;
  --color-success-900: #bef6be;
  --color-info-50: #07162b;
  --color-info-100: #0d294e;
  --color-info-200: #133c70;
  --color-info-300: #184e94;
  --color-info-400: #1b66c7;
  --color-info-500: #1e70d9;
  --color-info-600: #3e87e5;
  --color-info-700: #659eea;
  --color-info-800: #b0cff6;
  --color-info-900: #d4e4f8;
  --color-warning-50: #251c04;
  --color-warning-100: #493908;
  --color-warning-200: #6e560c;
  --color-warning-300: #937210;
  --color-warning-400: #c89a10;
  --color-warning-500: #ddaa12;
  --color-warning-600: #eebd2c;
  --color-warning-700: #f1ca54;
  --color-warning-800: #fae4a1;
  --color-warning-900: #fcf1d1;
  --color-danger-50: #230606;
  --color-danger-100: #460c0c;
  --color-danger-200: #691111;
  --color-danger-300: #8c1717;
  --color-danger-400: #be1a1a;
  --color-danger-500: #d11d1d;
  --color-danger-600: #e33636;
  --color-danger-700: #e95d5d;
  --color-danger-800: #f5a7a7;
  --color-danger-900: #f8d4d4;
  /* Smart Surface Tokens (dark mode, context-aware) */
  --surface-base-bg: #18191a;
  --surface-base-text: #ffffff;
  --surface-base-text-secondary: #ffffff;
  --surface-base-text-muted: #a3a3a3;
  --surface-base-icon: #ffffff;
  --surface-base-icon-subtle: #a3a3a3;
  --surface-base-shadow: rgba(255, 255, 255, 0.25);
  --surface-base-border: rgba(255, 255, 255, 0.15);
  --surface-subtle-bg: #131415;
  --surface-subtle-text: #ffffff;
  --surface-subtle-text-secondary: #ffffff;
  --surface-subtle-text-muted: #a1a1a1;
  --surface-subtle-icon: #ffffff;
  --surface-subtle-icon-subtle: #a1a1a1;
  --surface-subtle-shadow: rgba(255, 255, 255, 0.25);
  --surface-subtle-border: rgba(255, 255, 255, 0.15);
  --surface-elevated-bg: #0e0f0f;
  --surface-elevated-text: #ffffff;
  --surface-elevated-text-secondary: #ffffff;
  --surface-elevated-text-muted: #9f9f9f;
  --surface-elevated-icon: #ffffff;
  --surface-elevated-icon-subtle: #9f9f9f;
  --surface-elevated-shadow: rgba(255, 255, 255, 0.25);
  --surface-elevated-border: rgba(255, 255, 255, 0.15);
  --surface-sunken-bg: #141415;
  --surface-sunken-text: #ffffff;
  --surface-sunken-text-secondary: #ffffff;
  --surface-sunken-text-muted: #a1a1a1;
  --surface-sunken-icon: #ffffff;
  --surface-sunken-icon-subtle: #a1a1a1;
  --surface-sunken-shadow: rgba(255, 255, 255, 0.25);
  --surface-sunken-border: rgba(255, 255, 255, 0.15);
  --surface-overlay-bg: #1d1e1f;
  --surface-overlay-text: #ffffff;
  --surface-overlay-text-secondary: #ffffff;
  --surface-overlay-text-muted: #a5a5a5;
  --surface-overlay-icon: #ffffff;
  --surface-overlay-icon-subtle: #a5a5a5;
  --surface-overlay-shadow: rgba(255, 255, 255, 0.25);
  --surface-overlay-border: rgba(255, 255, 255, 0.15);
  --surface-inverse-bg: #f2f2f3;
  --surface-inverse-text: #000000;
  --surface-inverse-text-secondary: #000000;
  --surface-inverse-text-muted: #616161;
  --surface-inverse-icon: #000000;
  --surface-inverse-icon-subtle: #616161;
  --surface-inverse-shadow: rgba(0, 0, 0, 0.1);
  --surface-inverse-border: rgba(0, 0, 0, 0.1);

  --color-text-primary: var(--color-gray-100);
  --color-text-secondary: var(--color-gray-300);
  --color-text-muted: var(--color-gray-400);
  --color-border: var(--color-gray-700);
  --color-input-bg: var(--color-gray-800);
  --color-input-disabled-bg: var(--color-gray-900);
  --color-input-disabled-text: var(--color-gray-600);
  --color-code-bg: var(--color-gray-800);
  /* Backdrop tokens - dark mode */
  --backdrop-bg: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.4)
    );
  --backdrop-blur: 10px;
  --backdrop-saturate: 120%;
  --backdrop-brightness: 0.7;
  --backdrop-filter: blur(var(--backdrop-blur)) saturate(var(--backdrop-saturate)) brightness(var(--backdrop-brightness));
  --backdrop-opacity: 1;
  
  /* Legacy alias for backwards compatibility */
  --backdrop-background: var(--backdrop-bg);

  /* Mesh Gradient Backgrounds (Dark Mode) */
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, #4796ff 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, #a1a5ab 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, #e9143e 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, #4796ff 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, #a1a5ab 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, #4796ff 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, #e9143e 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, #a1a5ab 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, #e9143e 15%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, #4796ff 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, #a1a5ab 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, #e9143e 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, #4796ff 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, #a1a5ab 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, #e9143e 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, #4796ff 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, #4796ff 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, #e9143e 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, #a1a5ab 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, #e9143e 10%, transparent) 0px, transparent 50%);
    }
`);

export const tokensCSS = `@layer tokens {
       :root {
            /* Colors */
  --color-primary-50: #e8f1fc;
  --color-primary-100: #c3dbfa;
  --color-primary-200: #91bef9;
  --color-primary-300: #60a2f6;
  --color-primary-400: #3085f3;
  --color-primary-500: #1877f2;
  --color-primary-600: #0b5fcc;
  --color-primary-700: #09499b;
  --color-primary-800: #06326b;
  --color-primary-900: #031b3b;
  --color-secondary-50: #d7dade;
  --color-secondary-100: #b8becb;
  --color-secondary-200: #a5a7aa;
  --color-secondary-300: #8b8d92;
  --color-secondary-400: #717478;
  --color-secondary-500: #65676b;
  --color-secondary-600: #4c4e51;
  --color-secondary-700: #333437;
  --color-secondary-800: #252627;
  --color-secondary-900: #19191a;
  --color-accent-50: #fee7eb;
  --color-accent-100: #fdced7;
  --color-accent-200: #ffabbb;
  --color-accent-300: #fe7892;
  --color-accent-400: #fe4569;
  --color-accent-500: #fe2c55;
  --color-accent-600: #f60131;
  --color-accent-700: #c30127;
  --color-accent-800: #90011d;
  --color-accent-900: #5e0013;
  --color-success-50: #d1fad1;
  --color-success-100: #a0f7a0;
  --color-success-200: #6ef76e;
  --color-success-300: #3df43d;
  --color-success-400: #0df10d;
  --color-success-500: #0cd90c;
  --color-success-600: #09a909;
  --color-success-700: #077807;
  --color-success-800: #044804;
  --color-success-900: #033003;
  --color-warning-50: #fef8e7;
  --color-warning-100: #fdebb4;
  --color-warning-200: #ffdf80;
  --color-warning-300: #ffd24d;
  --color-warning-400: #ffc51a;
  --color-warning-500: #FFBF00;
  --color-warning-600: #cc9900;
  --color-warning-700: #997300;
  --color-warning-800: #664c00;
  --color-warning-900: #332600;
  --color-danger-50: #fce8e8;
  --color-danger-100: #f9b9b9;
  --color-danger-200: #f88787;
  --color-danger-300: #f55656;
  --color-danger-400: #f22626;
  --color-danger-500: #f10e0e;
  --color-danger-600: #c10b0b;
  --color-danger-700: #910808;
  --color-danger-800: #600606;
  --color-danger-900: #300303;
  --color-info-50: #e8f1fc;
  --color-info-100: #c3dbfa;
  --color-info-200: #91bef9;
  --color-info-300: #60a2f6;
  --color-info-400: #3085f3;
  --color-info-500: #1877f2;
  --color-info-600: #0b5fcc;
  --color-info-700: #09499b;
  --color-info-800: #06326b;
  --color-info-900: #031b3b;
  --color-gray-50: #fafafa;
  --color-gray-100: #f2f2f3;
  --color-gray-200: #e0e0e1;
  --color-gray-300: #c5c6c9;
  --color-gray-400: #96989c;
  --color-gray-500: #65676b;
  --color-gray-600: #6a707c;
  --color-gray-700: #505663;
  --color-gray-800: #2c313a;
  --color-gray-900: #16181d;
  --color-surface-base: #ffffff;
  --color-surface-subtle: #fafafa;
  --color-surface-elevated: #f5f4f4;
  --color-surface-sunken: #f0efef;
  --color-surface-overlay: #fafafa;
  --color-surface-inverse: #151313;
  --color-surface-hover: color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);;
  --color-surface-fieldset-base: #fafafa;
  --color-surface-fieldset-subtle: #f5f4f4;
  --color-surface-fieldset-elevated: #f0efef;
  --color-surface-fieldset-sunken: #e4e3e3;
  --color-surface-fieldset-overlay: #f5f4f4;
  /* Smart Surface Tokens (context-aware) */
  --surface-base-bg: #ffffff;
  --surface-base-text: #000000;
  --surface-base-text-secondary: #000000;
  --surface-base-text-muted: #666666;
  --surface-base-icon: #000000;
  --surface-base-icon-subtle: #666666;
  --surface-base-shadow: rgba(0, 0, 0, 0.1);
  --surface-base-border: rgba(0, 0, 0, 0.1);
  --surface-subtle-bg: #fafafa;
  --surface-subtle-text: #000000;
  --surface-subtle-text-secondary: #000000;
  --surface-subtle-text-muted: #646464;
  --surface-subtle-icon: #000000;
  --surface-subtle-icon-subtle: #646464;
  --surface-subtle-shadow: rgba(0, 0, 0, 0.1);
  --surface-subtle-border: rgba(0, 0, 0, 0.1);
  --surface-elevated-bg: #f5f4f4;
  --surface-elevated-text: #000000;
  --surface-elevated-text-secondary: #000000;
  --surface-elevated-text-muted: #626262;
  --surface-elevated-icon: #000000;
  --surface-elevated-icon-subtle: #626262;
  --surface-elevated-shadow: rgba(0, 0, 0, 0.1);
  --surface-elevated-border: rgba(0, 0, 0, 0.1);
  --surface-sunken-bg: #f0efef;
  --surface-sunken-text: #000000;
  --surface-sunken-text-secondary: #000000;
  --surface-sunken-text-muted: #606060;
  --surface-sunken-icon: #000000;
  --surface-sunken-icon-subtle: #606060;
  --surface-sunken-shadow: rgba(0, 0, 0, 0.1);
  --surface-sunken-border: rgba(0, 0, 0, 0.1);
  --surface-overlay-bg: #fafafa;
  --surface-overlay-text: #000000;
  --surface-overlay-text-secondary: #000000;
  --surface-overlay-text-muted: #646464;
  --surface-overlay-icon: #000000;
  --surface-overlay-icon-subtle: #646464;
  --surface-overlay-shadow: rgba(0, 0, 0, 0.1);
  --surface-overlay-border: rgba(0, 0, 0, 0.1);
  --surface-inverse-bg: #151313;
  --surface-inverse-text: #ffffff;
  --surface-inverse-text-secondary: #ffffff;
  --surface-inverse-text-muted: #a1a1a1;
  --surface-inverse-icon: #ffffff;
  --surface-inverse-icon-subtle: #a1a1a1;
  --surface-inverse-shadow: rgba(255, 255, 255, 0.25);
  --surface-inverse-border: rgba(255, 255, 255, 0.15);

  /* Semantic Text Colors */
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-600);
  --color-text-muted: var(--color-gray-600);
  --color-border: var(--color-gray-300);
  --color-input-bg: var(--color-surface-base);
  --color-input-disabled-bg: var(--color-gray-50);
  --color-input-disabled-text: var(--color-gray-500);
  --color-code-bg: var(--color-gray-100);
  /* Interactive Colors - optimized for specific use cases */
  --color-primary-fill: #0b5fcc; /* For button backgrounds with white text */
  --color-primary-text: #0b5fcc; /* For links and outline buttons on light surfaces */
  /* Translucent Surface Tokens */
  --color-surface-translucent-25: color-mix(in oklab, var(--color-surface-subtle) 25%, transparent 75%);
  --color-surface-translucent-50: color-mix(in oklab, var(--color-surface-subtle) 50%, transparent 50%);
  --color-surface-translucent-75: color-mix(in oklab, var(--color-surface-subtle) 75%, transparent 25%);
   /* Backdrop tokens - used for modal dialogs, drawers, overlays */

    --backdrop-bg: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.2),
        rgba(255, 255, 255, 0.1)
      );
    --backdrop-blur: 10px;
    --backdrop-saturate: 150%;
    --backdrop-brightness: 0.9;
    --backdrop-filter: blur(var(--backdrop-blur)) saturate(var(--backdrop-saturate)) brightness(var(--backdrop-brightness));
    --backdrop-opacity: 1;
    
    /* Legacy alias for backwards compatibility */
    --backdrop-background: var(--backdrop-bg);
    
  /* Mesh Gradient Backgrounds */
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, #1877f2 25%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, #65676b 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, #fe2c55 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, #1877f2 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, #65676b 24%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, #1877f2 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, #fe2c55 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, #65676b 15%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, #fe2c55 21%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, #1877f2 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, #65676b 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, #fe2c55 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, #1877f2 19%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, #65676b 22%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, #fe2c55 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, #1877f2 16%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, #1877f2 23%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, #fe2c55 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, #65676b 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, #fe2c55 15%, transparent) 0px, transparent 50%);
    

            /* Spacing */
  --spacing-0: 0;
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 20px;
  --spacing-6: 24px;
  --spacing-7: 28px;
  --spacing-8: 32px;
  --spacing-9: 36px;
  --spacing-10: 40px;
  --spacing-11: 44px;
  --spacing-12: 48px;


            /* Border Radius */
  --radius-none: 0;
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;


            /* Border Widths */
  --border-width-hairline: 0.5px;
  --border-width-thin: 1px;
  --border-width-medium: 2px;
  --border-width-thick: 3px;


            /* Typography */
  --font-family-headings: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-family-body: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-family-mono: ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace;
  --font-size-xs: 10px;
  --font-size-sm: 13px;
  --font-size-base: 15px;
  --font-size-lg: 18px;
  --font-size-xl: 22px;
  --font-size-2xl: 26px;
  --font-size-3xl: 31px;
  --font-size-4xl: 37px;
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-line-height-tight: 1.25;
  --font-line-height-normal: 1.75;
  --font-line-height-relaxed: 1.75;


            /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05);
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);


            /* Layout */
  --layout-max-width: 1200px;
  --layout-max-width-sm: 608px;
  --layout-max-width-md: 736px;
  --layout-max-width-lg: 992px;
  --layout-max-width-xl: 1200px;
  --layout-min-height: 100vh;
  --layout-container-padding: 16px;
  --layout-page-margin: 120px;
  --layout-section-gap: 160px;
  --layout-container-gap: 200px;
  --layout-hero-spacing: 240px;
  --layout-footer-spacing: 160px;


            /* Transitions */
  --transition-fast: 90ms;
  --transition-normal: 150ms;
  --transition-slow: 210ms;


            /* Z-Index */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal: 1040;
  --z-drawer: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
  --z-notification: 1080;


            /* Icon System */
  --icon-set: phosphor;
  --icon-weight: regular;
  --icon-size: 24px;
  --icon-size-xs: 16px;
  --icon-size-sm: 20px;
  --icon-size-md: 24px;
  --icon-size-lg: 32px;
  --icon-size-xl: 48px;
  --icon-size-2xl: 64px;


       }
       
       html[data-theme="dark"] {
    --color-surface-base: #18191a;
    --color-surface-subtle: #131415;
    --color-surface-elevated: #0e0f0f;
    --color-surface-sunken: #141415;
    --color-surface-overlay: #1d1e1f;
    --color-surface-inverse: #f2f2f3;
    --color-surface-hover: color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);;
    --color-surface-fieldset-base: #0e0f0f;
    --color-surface-fieldset-subtle: #1d1e1f;
    --color-surface-fieldset-elevated: #212323;
    --color-surface-fieldset-sunken: #0e0f0f;
    --color-surface-fieldset-overlay: #28292b;
    --color-primary-50: #e7f1fe;
    --color-primary-100: #cde2fe;
    --color-primary-200: #add0ff;
    --color-primary-300: #7ab3ff;
    --color-primary-400: #4796ff;
    --color-primary-500: #2d88ff;
    --color-primary-600: #006cf9;
    --color-primary-700: #0056c6;
    --color-primary-800: #004093;
    --color-primary-900: #002a60;
    --color-secondary-50: #f1f2f4;
    --color-secondary-100: #e2e5e9;
    --color-secondary-200: #d7d8db;
    --color-secondary-300: #bcbec3;
    --color-secondary-400: #a1a5ab;
    --color-secondary-500: #b0b3b8;
    --color-secondary-600: #9599a0;
    --color-secondary-700: #7a7f88;
    --color-secondary-800: #62666d;
    --color-secondary-900: #4a4d52;
    --color-accent-50: #440814;
    --color-accent-100: #680c1e;
    --color-accent-200: #8c1029;
    --color-accent-300: #b11433;
    --color-accent-400: #e9143e;
    --color-accent-500: #ec264d;
    --color-accent-600: #ef4f6e;
    --color-accent-700: #f4768e;
    --color-accent-800: #fabac6;
    --color-accent-900: #fcd1d8;
    --color-gray-50: #fafafa;
    --color-gray-100: #f2f2f3;
    --color-gray-200: #dfe0e2;
    --color-gray-300: #c4c6ca;
    --color-gray-400: #94989e;
    --color-gray-500: #b0b3b8;
    --color-gray-600: #67707f;
    --color-gray-700: #4d5665;
    --color-gray-800: #2b313b;
    --color-gray-900: #15181e;
    --color-success-50: #062306;
    --color-success-100: #093409;
    --color-success-200: #0f570f;
    --color-success-300: #147a14;
    --color-success-400: #17ab17;
    --color-success-500: #1abe1a;
    --color-success-600: #22e122;
    --color-success-700: #49e649;
    --color-success-800: #90f390;
    --color-success-900: #bef6be;
    --color-info-50: #07162b;
    --color-info-100: #0d294e;
    --color-info-200: #133c70;
    --color-info-300: #184e94;
    --color-info-400: #1b66c7;
    --color-info-500: #1e70d9;
    --color-info-600: #3e87e5;
    --color-info-700: #659eea;
    --color-info-800: #b0cff6;
    --color-info-900: #d4e4f8;
    --color-warning-50: #251c04;
    --color-warning-100: #493908;
    --color-warning-200: #6e560c;
    --color-warning-300: #937210;
    --color-warning-400: #c89a10;
    --color-warning-500: #ddaa12;
    --color-warning-600: #eebd2c;
    --color-warning-700: #f1ca54;
    --color-warning-800: #fae4a1;
    --color-warning-900: #fcf1d1;
    --color-danger-50: #230606;
    --color-danger-100: #460c0c;
    --color-danger-200: #691111;
    --color-danger-300: #8c1717;
    --color-danger-400: #be1a1a;
    --color-danger-500: #d11d1d;
    --color-danger-600: #e33636;
    --color-danger-700: #e95d5d;
    --color-danger-800: #f5a7a7;
    --color-danger-900: #f8d4d4;
    /* Smart Surface Tokens (dark mode, context-aware) */
    --surface-base-bg: #18191a;
    --surface-base-text: #ffffff;
    --surface-base-text-secondary: #ffffff;
    --surface-base-text-muted: #a3a3a3;
    --surface-base-icon: #ffffff;
    --surface-base-icon-subtle: #a3a3a3;
    --surface-base-shadow: rgba(255, 255, 255, 0.25);
    --surface-base-border: rgba(255, 255, 255, 0.15);
    --surface-subtle-bg: #131415;
    --surface-subtle-text: #ffffff;
    --surface-subtle-text-secondary: #ffffff;
    --surface-subtle-text-muted: #a1a1a1;
    --surface-subtle-icon: #ffffff;
    --surface-subtle-icon-subtle: #a1a1a1;
    --surface-subtle-shadow: rgba(255, 255, 255, 0.25);
    --surface-subtle-border: rgba(255, 255, 255, 0.15);
    --surface-elevated-bg: #0e0f0f;
    --surface-elevated-text: #ffffff;
    --surface-elevated-text-secondary: #ffffff;
    --surface-elevated-text-muted: #9f9f9f;
    --surface-elevated-icon: #ffffff;
    --surface-elevated-icon-subtle: #9f9f9f;
    --surface-elevated-shadow: rgba(255, 255, 255, 0.25);
    --surface-elevated-border: rgba(255, 255, 255, 0.15);
    --surface-sunken-bg: #141415;
    --surface-sunken-text: #ffffff;
    --surface-sunken-text-secondary: #ffffff;
    --surface-sunken-text-muted: #a1a1a1;
    --surface-sunken-icon: #ffffff;
    --surface-sunken-icon-subtle: #a1a1a1;
    --surface-sunken-shadow: rgba(255, 255, 255, 0.25);
    --surface-sunken-border: rgba(255, 255, 255, 0.15);
    --surface-overlay-bg: #1d1e1f;
    --surface-overlay-text: #ffffff;
    --surface-overlay-text-secondary: #ffffff;
    --surface-overlay-text-muted: #a5a5a5;
    --surface-overlay-icon: #ffffff;
    --surface-overlay-icon-subtle: #a5a5a5;
    --surface-overlay-shadow: rgba(255, 255, 255, 0.25);
    --surface-overlay-border: rgba(255, 255, 255, 0.15);
    --surface-inverse-bg: #f2f2f3;
    --surface-inverse-text: #000000;
    --surface-inverse-text-secondary: #000000;
    --surface-inverse-text-muted: #616161;
    --surface-inverse-icon: #000000;
    --surface-inverse-icon-subtle: #616161;
    --surface-inverse-shadow: rgba(0, 0, 0, 0.1);
    --surface-inverse-border: rgba(0, 0, 0, 0.1);

    --color-text-primary: var(--color-gray-100);
    --color-text-secondary: var(--color-gray-300);
    --color-text-muted: var(--color-gray-400);
    --color-border: var(--color-gray-700);
    --color-input-bg: var(--color-gray-800);
    --color-input-disabled-bg: var(--color-gray-900);
    --color-input-disabled-text: var(--color-gray-600);
    --color-code-bg: var(--color-gray-800);
    /* Interactive Colors - optimized for specific use cases (dark mode) */
    --color-primary-fill: #006cf9; /* For button backgrounds with white text */
    --color-primary-text: #2d88ff; /* For links and outline buttons on dark surfaces */
    /* Backdrop tokens - dark mode */
    --backdrop-bg: linear-gradient(
        135deg,
        rgba(0, 0, 0, 0.6),
        rgba(0, 0, 0, 0.4)
      );
    --backdrop-blur: 10px;
    --backdrop-saturate: 120%;
    --backdrop-brightness: 0.7;
    --backdrop-filter: blur(var(--backdrop-blur)) saturate(var(--backdrop-saturate)) brightness(var(--backdrop-brightness));
    --backdrop-opacity: 1;
    
    /* Legacy alias for backwards compatibility */
    --backdrop-background: var(--backdrop-bg);
    /* Mesh Gradient Variables (Dark Mode) */
    --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, #4796ff 20%, transparent) 0px, transparent 50%),
      radial-gradient(at 97% 21%, color-mix(in oklab, #a1a5ab 16%, transparent) 0px, transparent 50%),
      radial-gradient(at 52% 99%, color-mix(in oklab, #e9143e 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 10% 29%, color-mix(in oklab, #4796ff 10%, transparent) 0px, transparent 50%);
    
    --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, #a1a5ab 18%, transparent) 0px, transparent 50%),
      radial-gradient(at 80% 0%, color-mix(in oklab, #4796ff 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 0% 50%, color-mix(in oklab, #e9143e 12%, transparent) 0px, transparent 50%),
      radial-gradient(at 80% 100%, color-mix(in oklab, #a1a5ab 10%, transparent) 0px, transparent 50%);
    
    --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, #e9143e 15%, transparent) 0px, transparent 50%),
      radial-gradient(at 85% 30%, color-mix(in oklab, #4796ff 17%, transparent) 0px, transparent 50%),
      radial-gradient(at 50% 80%, color-mix(in oklab, #a1a5ab 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 90%, color-mix(in oklab, #e9143e 11%, transparent) 0px, transparent 50%);
    
    --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, #4796ff 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 20% 80%, color-mix(in oklab, #a1a5ab 16%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 60%, color-mix(in oklab, #e9143e 12%, transparent) 0px, transparent 50%),
      radial-gradient(at 30% 40%, color-mix(in oklab, #4796ff 11%, transparent) 0px, transparent 50%);
    
    --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, #4796ff 17%, transparent) 0px, transparent 50%),
      radial-gradient(at 10% 10%, color-mix(in oklab, #e9143e 14%, transparent) 0px, transparent 50%),
      radial-gradient(at 90% 10%, color-mix(in oklab, #a1a5ab 13%, transparent) 0px, transparent 50%),
      radial-gradient(at 50% 90%, color-mix(in oklab, #e9143e 10%, transparent) 0px, transparent 50%);
             }

    }
/* Non-layered dark variables fallback (ensures attribute wins) */
html[data-theme="dark"] {
  --color-surface-base: #18191a;
  --color-surface-subtle: #131415;
  --color-surface-elevated: #0e0f0f;
  --color-surface-sunken: #141415;
  --color-surface-overlay: #1d1e1f;
  --color-surface-inverse: #f2f2f3;
  --color-surface-hover: color-mix(in oklab, var(--color-surface-base) 92%, var(--color-text-primary) 8%);;
  --color-surface-fieldset-base: #0e0f0f;
  --color-surface-fieldset-subtle: #1d1e1f;
  --color-surface-fieldset-elevated: #212323;
  --color-surface-fieldset-sunken: #0e0f0f;
  --color-surface-fieldset-overlay: #28292b;
  --color-primary-50: #e7f1fe;
  --color-primary-100: #cde2fe;
  --color-primary-200: #add0ff;
  --color-primary-300: #7ab3ff;
  --color-primary-400: #4796ff;
  --color-primary-500: #2d88ff;
  --color-primary-600: #006cf9;
  --color-primary-700: #0056c6;
  --color-primary-800: #004093;
  --color-primary-900: #002a60;
  --color-secondary-50: #f1f2f4;
  --color-secondary-100: #e2e5e9;
  --color-secondary-200: #d7d8db;
  --color-secondary-300: #bcbec3;
  --color-secondary-400: #a1a5ab;
  --color-secondary-500: #b0b3b8;
  --color-secondary-600: #9599a0;
  --color-secondary-700: #7a7f88;
  --color-secondary-800: #62666d;
  --color-secondary-900: #4a4d52;
  --color-accent-50: #440814;
  --color-accent-100: #680c1e;
  --color-accent-200: #8c1029;
  --color-accent-300: #b11433;
  --color-accent-400: #e9143e;
  --color-accent-500: #ec264d;
  --color-accent-600: #ef4f6e;
  --color-accent-700: #f4768e;
  --color-accent-800: #fabac6;
  --color-accent-900: #fcd1d8;
  --color-gray-50: #fafafa;
  --color-gray-100: #f2f2f3;
  --color-gray-200: #dfe0e2;
  --color-gray-300: #c4c6ca;
  --color-gray-400: #94989e;
  --color-gray-500: #b0b3b8;
  --color-gray-600: #67707f;
  --color-gray-700: #4d5665;
  --color-gray-800: #2b313b;
  --color-gray-900: #15181e;
  --color-success-50: #062306;
  --color-success-100: #093409;
  --color-success-200: #0f570f;
  --color-success-300: #147a14;
  --color-success-400: #17ab17;
  --color-success-500: #1abe1a;
  --color-success-600: #22e122;
  --color-success-700: #49e649;
  --color-success-800: #90f390;
  --color-success-900: #bef6be;
  --color-info-50: #07162b;
  --color-info-100: #0d294e;
  --color-info-200: #133c70;
  --color-info-300: #184e94;
  --color-info-400: #1b66c7;
  --color-info-500: #1e70d9;
  --color-info-600: #3e87e5;
  --color-info-700: #659eea;
  --color-info-800: #b0cff6;
  --color-info-900: #d4e4f8;
  --color-warning-50: #251c04;
  --color-warning-100: #493908;
  --color-warning-200: #6e560c;
  --color-warning-300: #937210;
  --color-warning-400: #c89a10;
  --color-warning-500: #ddaa12;
  --color-warning-600: #eebd2c;
  --color-warning-700: #f1ca54;
  --color-warning-800: #fae4a1;
  --color-warning-900: #fcf1d1;
  --color-danger-50: #230606;
  --color-danger-100: #460c0c;
  --color-danger-200: #691111;
  --color-danger-300: #8c1717;
  --color-danger-400: #be1a1a;
  --color-danger-500: #d11d1d;
  --color-danger-600: #e33636;
  --color-danger-700: #e95d5d;
  --color-danger-800: #f5a7a7;
  --color-danger-900: #f8d4d4;
  /* Smart Surface Tokens (dark mode, context-aware) */
  --surface-base-bg: #18191a;
  --surface-base-text: #ffffff;
  --surface-base-text-secondary: #ffffff;
  --surface-base-text-muted: #a3a3a3;
  --surface-base-icon: #ffffff;
  --surface-base-icon-subtle: #a3a3a3;
  --surface-base-shadow: rgba(255, 255, 255, 0.25);
  --surface-base-border: rgba(255, 255, 255, 0.15);
  --surface-subtle-bg: #131415;
  --surface-subtle-text: #ffffff;
  --surface-subtle-text-secondary: #ffffff;
  --surface-subtle-text-muted: #a1a1a1;
  --surface-subtle-icon: #ffffff;
  --surface-subtle-icon-subtle: #a1a1a1;
  --surface-subtle-shadow: rgba(255, 255, 255, 0.25);
  --surface-subtle-border: rgba(255, 255, 255, 0.15);
  --surface-elevated-bg: #0e0f0f;
  --surface-elevated-text: #ffffff;
  --surface-elevated-text-secondary: #ffffff;
  --surface-elevated-text-muted: #9f9f9f;
  --surface-elevated-icon: #ffffff;
  --surface-elevated-icon-subtle: #9f9f9f;
  --surface-elevated-shadow: rgba(255, 255, 255, 0.25);
  --surface-elevated-border: rgba(255, 255, 255, 0.15);
  --surface-sunken-bg: #141415;
  --surface-sunken-text: #ffffff;
  --surface-sunken-text-secondary: #ffffff;
  --surface-sunken-text-muted: #a1a1a1;
  --surface-sunken-icon: #ffffff;
  --surface-sunken-icon-subtle: #a1a1a1;
  --surface-sunken-shadow: rgba(255, 255, 255, 0.25);
  --surface-sunken-border: rgba(255, 255, 255, 0.15);
  --surface-overlay-bg: #1d1e1f;
  --surface-overlay-text: #ffffff;
  --surface-overlay-text-secondary: #ffffff;
  --surface-overlay-text-muted: #a5a5a5;
  --surface-overlay-icon: #ffffff;
  --surface-overlay-icon-subtle: #a5a5a5;
  --surface-overlay-shadow: rgba(255, 255, 255, 0.25);
  --surface-overlay-border: rgba(255, 255, 255, 0.15);
  --surface-inverse-bg: #f2f2f3;
  --surface-inverse-text: #000000;
  --surface-inverse-text-secondary: #000000;
  --surface-inverse-text-muted: #616161;
  --surface-inverse-icon: #000000;
  --surface-inverse-icon-subtle: #616161;
  --surface-inverse-shadow: rgba(0, 0, 0, 0.1);
  --surface-inverse-border: rgba(0, 0, 0, 0.1);

  --color-text-primary: var(--color-gray-100);
  --color-text-secondary: var(--color-gray-300);
  --color-text-muted: var(--color-gray-400);
  --color-border: var(--color-gray-700);
  --color-input-bg: var(--color-gray-800);
  --color-input-disabled-bg: var(--color-gray-900);
  --color-input-disabled-text: var(--color-gray-600);
  --color-code-bg: var(--color-gray-800);
  /* Backdrop tokens - dark mode */
  --backdrop-bg: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.4)
    );
  --backdrop-blur: 10px;
  --backdrop-saturate: 120%;
  --backdrop-brightness: 0.7;
  --backdrop-filter: blur(var(--backdrop-blur)) saturate(var(--backdrop-saturate)) brightness(var(--backdrop-brightness));
  --backdrop-opacity: 1;
  
  /* Legacy alias for backwards compatibility */
  --backdrop-background: var(--backdrop-bg);

  /* Mesh Gradient Backgrounds (Dark Mode) */
  --background-mesh-01: radial-gradient(at 27% 37%, color-mix(in oklab, #4796ff 20%, transparent) 0px, transparent 50%),
    radial-gradient(at 97% 21%, color-mix(in oklab, #a1a5ab 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 52% 99%, color-mix(in oklab, #e9143e 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 29%, color-mix(in oklab, #4796ff 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-02: radial-gradient(at 40% 20%, color-mix(in oklab, #a1a5ab 18%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 0%, color-mix(in oklab, #4796ff 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 0% 50%, color-mix(in oklab, #e9143e 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 80% 100%, color-mix(in oklab, #a1a5ab 10%, transparent) 0px, transparent 50%);
  
  --background-mesh-03: radial-gradient(at 15% 50%, color-mix(in oklab, #e9143e 15%, transparent) 0px, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklab, #4796ff 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 80%, color-mix(in oklab, #a1a5ab 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 90%, color-mix(in oklab, #e9143e 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-04: radial-gradient(at 70% 15%, color-mix(in oklab, #4796ff 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 20% 80%, color-mix(in oklab, #a1a5ab 16%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 60%, color-mix(in oklab, #e9143e 12%, transparent) 0px, transparent 50%),
    radial-gradient(at 30% 40%, color-mix(in oklab, #4796ff 11%, transparent) 0px, transparent 50%);
  
  --background-mesh-05: radial-gradient(at 50% 50%, color-mix(in oklab, #4796ff 17%, transparent) 0px, transparent 50%),
    radial-gradient(at 10% 10%, color-mix(in oklab, #e9143e 14%, transparent) 0px, transparent 50%),
    radial-gradient(at 90% 10%, color-mix(in oklab, #a1a5ab 13%, transparent) 0px, transparent 50%),
    radial-gradient(at 50% 90%, color-mix(in oklab, #e9143e 10%, transparent) 0px, transparent 50%);
    }
`;
