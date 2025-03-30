# Principais Mudanças no Svelte 5

## Reativos

### Antes (Svelte 4)
```svelte
<script>
  let count = 0;
  
  function increment() {
    count += 1;
  }
  
  $: doubled = count * 2;
</script>
```

### Depois (Svelte 5)
```svelte
<script>
  let count = $state(0);
  
  function increment() {
    count += 1;
  }
  
  let doubled = $derived(count * 2);
</script>
```

## Slots

### Antes (Svelte 4)
```svelte
<!-- ParentComponent.svelte -->
<script>
  import ChildComponent from './ChildComponent.svelte';
</script>

<ChildComponent>
  <h1 slot="header">Header</h1>
  <p>Default slot content</p>
  <div slot="footer">Footer</div>
</ChildComponent>

<!-- ChildComponent.svelte -->
<div>
  <slot name="header">Default header</slot>
  <slot>Default content</slot>
  <slot name="footer">Default footer</slot>
</div>
```

### Depois (Svelte 5)
```svelte
<!-- ParentComponent.svelte -->
<script>
  import ChildComponent from './ChildComponent.svelte';
  
  let header = () => <h1>Header</h1>;
  let default = () => <p>Default slot content</p>;
  let footer = () => <div>Footer</div>;
</script>

<ChildComponent>
  {@render header()}
  {@render default()}
  {@render footer()}
</ChildComponent>

<!-- ChildComponent.svelte -->
<script>
  let { header, default: defaultSlot, footer } = $props();
</script>

<div>
  {@render header?.() ?? <div>Default header</div>}
  {@render defaultSlot?.() ?? <div>Default content</div>}
  {@render footer?.() ?? <div>Default footer</div>}
</div>
```

## Importante: Não Misturar Sintaxes

No Svelte 5, você não pode misturar a sintaxe antiga de slots (`<slot>`) com a nova sintaxe de renderização (`{@render ...}`). Você deve escolher uma abordagem e usá-la consistentemente em um componente.

## Propriedades

### Antes (Svelte 4)
```svelte
<script>
  export let name = 'world';
  export let count = 0;
</script>
```

### Depois (Svelte 5)
```svelte
<script>
  let { name = 'world', count = 0 } = $props();
</script>
```

## Contexto

### Antes (Svelte 4)
```svelte
<script>
  import { setContext, getContext } from 'svelte';
  
  // Definindo contexto
  setContext('key', value);
  
  // Obtendo contexto
  const value = getContext('key');
</script>
```

### Depois (Svelte 5)
```svelte
<script>
  // Definindo contexto
  let value = $context('key');
  
  // Obtendo contexto
  const value = $context('key');
</script>
```

## Stores

### Antes (Svelte 4)
```svelte
<script>
  import { writable } from 'svelte/store';
  
  const count = writable(0);
  
  function increment() {
    $count += 1;
  }
</script>

<button on:click={increment}>{$count}</button>
```

### Depois (Svelte 5)
```svelte
<script>
  import { writable } from 'svelte/store';
  
  const count = writable(0);
  
  function increment() {
    count.update(n => n + 1);
  }
</script>

<button onclick={increment}>{$count}</button>
```

## Eventos

### Antes (Svelte 4)
```svelte
<button on:click={handleClick}>Click me</button>
```

### Depois (Svelte 5)
```svelte
<button onclick={handleClick}>Click me</button>
```

## Regras Importantes

1. Não use `$slots` como nome de variável (é ilegal no Svelte 5)
2. Não misture `<slot>` e `{@render ...}` no mesmo componente
3. Use `onclick` em vez de `on:click` para eventos
4. Use `$state()`, `$derived()` e `$props()` para reativos
5. Use `$context()` para contexto
