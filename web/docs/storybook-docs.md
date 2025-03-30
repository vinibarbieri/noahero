# Documentação com Storybook

Este projeto utiliza o Storybook para documentação e desenvolvimento de componentes. O addon-docs foi configurado para permitir a criação de documentação rica para os componentes.

## Configuração

O addon-docs está configurado no arquivo `.storybook/main.ts`:

```typescript
import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|ts|svelte)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-svelte-csf",
    "@storybook/addon-docs",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test"
  ],
  "framework": {
    "name": "@storybook/sveltekit",
    "options": {}
  }
};
export default config;
```

## Criando Documentação

Existem duas formas de criar documentação para os componentes:

### 1. Usando Autodocs

Para usar o recurso de autodocs, adicione a tag `autodocs` ao seu arquivo de stories:

```typescript
const { Story } = defineMeta({
  title: 'Componentes/MeuComponente',
  component: MeuComponente,
  tags: ['autodocs'],
  parameters: {
    // ...
  }
});
```

### 2. Usando Arquivos MDX

Para uma documentação mais personalizada, crie um arquivo MDX ao lado do seu arquivo de stories:

```mdx
import { Meta, Story, Canvas, Controls, Primary } from '@storybook/blocks';
import * as MeuComponenteStories from './MeuComponente.stories.svelte';

<Meta of={MeuComponenteStories} />

# Meu Componente

Descrição do componente...

## Uso Básico

<Primary />

## Propriedades

<Controls />

## Variantes

### Variante 1

<Canvas of={MeuComponenteStories.Variante1} />

### Variante 2

<Canvas of={MeuComponenteStories.Variante2} />
```

**Importante:** Se você criar um arquivo MDX para um componente, remova a tag `autodocs` do arquivo de stories para evitar conflitos.

## Componentes do Blocks

O addon-docs fornece vários componentes para criar documentação:

- `<Meta>`: Define o componente que está sendo documentado
- `<Primary>`: Exibe a story principal
- `<Controls>`: Exibe os controles para as props do componente
- `<Canvas>`: Exibe uma story específica
- `<Story>`: Exibe uma story inline
- `<Source>`: Exibe o código-fonte
- `<Description>`: Exibe a descrição do componente

## Exemplos

Veja os exemplos de documentação nos componentes:

- `src/lib/components/templates/AppLayout/AppLayout.mdx`
- `src/lib/components/templates/AppLayout2/AppLayout2.mdx`
