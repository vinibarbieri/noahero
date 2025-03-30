# Storybook Svelte CSF (Component Story Format)

## Instalação

```bash
npm install -D @storybook/addon-svelte-csf
```

## Configuração

Adicione o addon ao arquivo `.storybook/main.js`:

```js
module.exports = {
  addons: ['@storybook/addon-svelte-csf'],
};
```

## Formato de Histórias para Svelte

O formato CSF (Component Story Format) para Svelte permite escrever histórias de forma mais natural e compatível com o Svelte.

### Exemplo Básico

```svelte
<script>
  import MyComponent from './MyComponent.svelte';
  
  // Metadata da história
  export let component = MyComponent;
  
  // Exportação das histórias
  export const Default = {
    args: {
      // Props para o componente
      text: 'Hello World',
      count: 42
    }
  };
  
  export const WithError = {
    args: {
      text: 'Error State',
      error: true
    }
  };
</script>

<!-- Template da história -->
<MyComponent {...$$props} />
```

### Usando Controles

```svelte
<script>
  import Button from './Button.svelte';
  
  export let component = Button;
  
  // Configuração de argTypes para controles
  export let argTypes = {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large']
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger']
    }
  };
  
  export const Primary = {
    args: {
      variant: 'primary',
      label: 'Primary Button'
    }
  };
</script>

<Button {...$$props} />
```

### Decoradores

```svelte
<script>
  import Card from './Card.svelte';
  
  export let component = Card;
  
  // Decorador para envolver todas as histórias
  export let decorators = [
    (story) => {
      return {
        Component: story.Component,
        props: story.props,
        template: `
          <div style="padding: 1rem; background-color: #f0f0f0;">
            <svelte:component this={Component} {...props} />
          </div>
        `
      };
    }
  ];
  
  export const Default = {
    args: {
      title: 'Card Title',
      content: 'Card Content'
    }
  };
</script>

<Card {...$$props} />
```

## Melhores Práticas

1. Use `{...$$props}` para passar todos os argumentos para o componente
2. Organize histórias relacionadas em um único arquivo
3. Use argTypes para configurar controles personalizados
4. Use decoradores para contextos compartilhados
5. Documente seus componentes usando JSDoc ou blocos de comentários

## Recursos Adicionais

- [Documentação oficial do Storybook](https://storybook.js.org/docs)
- [Repositório do addon-svelte-csf](https://github.com/storybookjs/addon-svelte-csf)
