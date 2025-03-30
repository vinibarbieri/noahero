<script lang="ts">
  // Import the SVG file
  import logoSrc from '$lib/assets/noah-logo.svg';

  // Props
  let {
    width = '200',
    height = '60',
    color = 'currentColor',
    className = '',
    darkMode = false
  } = $props<{
    width?: string;
    height?: string;
    color?: string;
    className?: string;
    darkMode?: boolean;
  }>();
</script>

<div
  class={`inline-block ${className}`}
  style={`width: ${width}px; height: ${height}px;`}
>
  <img
    src={logoSrc}
    alt="Noah logo"
    class="w-full h-full"
    style={`filter: ${color !== 'currentColor' ? `invert(1) sepia(1) saturate(0) hue-rotate(175deg) brightness(${color === 'var(--color-primary-200)' || darkMode ? 10 : 0})` : ''}; stroke-width: 8px;`}
  />
</div>

<style>
  /* Estilo para engrossar o traço da logo no header */
  :global(.logo-header img) {
    filter: contrast(1.3) !important;
    -webkit-filter: contrast(1.3) !important;
    transform: scale(1.05);
  }

  /* Aplicar um leve efeito de sombra para destacar a logo */
  :global(.logo-header) {
    filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.1));
    overflow: visible;
  }
</style>
