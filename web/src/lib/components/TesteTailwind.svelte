<!-- Componente de teste para verificar funcionalidade do Tailwind -->
<script lang="ts">
  export let titulo = "Teste do Tailwind";
</script>

<div class="p-6 max-w-sm mx-auto shadow-lg flex items-center space-x-4 my-4 animate-fade-in rounded-4xl bg-surface dark:bg-dark-surface border border-border dark:border-dark-border">
  <div class="shrink-0">
    <div class="h-12 w-12 rounded-full flex items-center justify-center bg-primary-500 dark:bg-dark-primary-500">
      <span class="text-white text-xl font-display">T</span>
    </div>
  </div>
  <div>
    <h4 class="text-xl font-medium font-display text-text dark:text-dark-text">
      {titulo}
    </h4>
    <p class="text-text-secondary dark:text-dark-text-secondary font-sans">
      Verificando se o Tailwind está funcionando
    </p>
  </div>
</div>

<div class="space-y-4 mt-4 animate-slide-in">
  <button class="bg-primary-500 dark:bg-dark-primary-500 text-white font-bold font-sans py-2 px-4 rounded-lg transition-colors hover:opacity-90">
    Botão Primário
  </button>
  
  <button class="bg-secondary-500 dark:bg-dark-secondary-500 text-white font-bold font-sans py-2 px-4 rounded-lg transition-colors hover:opacity-90">
    Botão Secundário
  </button>
  
  <div class="p-4 rounded-lg bg-primary-50 dark:bg-dark-primary-50 text-primary-700 dark:text-dark-primary-700 border border-primary-200 dark:border-dark-primary-200">
    <p class="text-xxs uppercase font-bold tracking-wider mb-1">
      Novo!
    </p>
    <p class="font-sans">
      Alerta com as novas cores do tema
    </p>
  </div>
  
  <div class="p-4 rounded-lg bg-secondary-50 dark:bg-dark-secondary-50 text-secondary-700 dark:text-dark-secondary-700 border border-secondary-200 dark:border-dark-secondary-200">
    <p class="text-xxs uppercase font-bold tracking-wider mb-1">
      Importante
    </p>
    <p class="font-sans">
      Usando cores secundárias
    </p>
  </div>
  
  <p class="text-lg font-display text-text dark:text-dark-text transition-colors hover:opacity-80">
    Texto com hover effect usando a fonte display
  </p>
  
  <div class="grid grid-cols-3 gap-2">
    {#each Array(3) as _, i}
      <div class="h-8 rounded transition-all hover:scale-105" 
           class:bg-primary-300={i === 0}
           class:bg-primary-500={i === 1}
           class:bg-primary-700={i === 2}
           class:dark:bg-dark-primary-300={i === 0}
           class:dark:bg-dark-primary-500={i === 1}
           class:dark:bg-dark-primary-700={i === 2}></div>
    {/each}
  </div>
</div> 