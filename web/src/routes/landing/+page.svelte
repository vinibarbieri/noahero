<script lang="ts">
  import { AuroraBackground } from '$lib/components/atoms/AuroraBackground';
  import { NoahLogo } from '$lib/components/atoms/NoahLogo';
  import { TextRotate } from '$lib/components/atoms/TextRotate';
  import { HeroText } from '$lib/components/molecules/HeroText';
  import { onMount } from 'svelte';

  // Estado para controlar o modal de login/signup
  let showLoginModal = $state(false);
  let isSignup = $state(false); // false = login, true = signup

  // Estado para controlar a visibilidade do header
  let isHeaderVisible = $state(true);
  let lastScrollY = $state(0);
  let scrollThreshold = 50; // Quantidade de pixels para considerar uma rolagem significativa
  let isAtTop = $state(true); // Indica se o usuário está no topo da página

  // Função para abrir o modal de login
  function openLogin() {
    isSignup = false;
    showLoginModal = true;
  }

  // Função para controlar a visibilidade do header durante a rolagem
  function handleScroll() {
    const currentScrollY = window.scrollY;

    // Determina a direção da rolagem
    if (currentScrollY > lastScrollY + scrollThreshold) {
      // Rolando para baixo
      isHeaderVisible = false;
      lastScrollY = currentScrollY;
    } else if (currentScrollY < lastScrollY - scrollThreshold) {
      // Rolando para cima
      isHeaderVisible = true;
      lastScrollY = currentScrollY;
    }

    // Se estiver no topo da página, sempre mostra o header
    if (currentScrollY <= 10) {
      isHeaderVisible = true;
      isAtTop = true;
    } else {
      isAtTop = false;
    }
  }

  // Configurar o listener de rolagem quando o componente for montado
  onMount(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Limpar o listener quando o componente for desmontado
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  // Função para abrir o modal de signup
  function openSignup() {
    isSignup = true;
    showLoginModal = true;
  }

  // Função para fechar o modal
  function closeModal() {
    showLoginModal = false;
  }

  // Marcas parceiras
  const brands = [
    { name: 'Google', logo: '/images/brands/google.svg' },
    { name: 'Spotify', logo: '/images/brands/spotify.svg' },
    { name: 'Netflix', logo: '/images/brands/netflix.svg' },
    { name: 'Amazon', logo: '/images/brands/amazon.svg' },
    { name: 'Uber', logo: '/images/brands/uber.svg' },
    { name: 'Walmart', logo: '/images/brands/walmart.svg' }
  ];

  // Passos do processo
  const steps = [
    {
      title: 'Gaste com cartão de débito',
      description: 'Vincule seu cartão de débito ao nosso app e efetivamente ganhe recompensas enquanto você gasta.',
      icon: '💳'
    },
    {
      title: 'Jogue nossos jogos',
      description: 'Aumente suas recompensas com nossos jogos cativantes.',
      icon: '🎮'
    },
    {
      title: 'Resgate em gift cards',
      description: 'Transforme seus ganhos em gift cards que mantêm você ganhando recompensas a cada compra.',
      icon: '🎁'
    }
  ];

  // Textos rotativos para o hero
  const heroTexts = [
    "Recompensas",
    "Prêmios",
    "Benefícios",
    "Cashback"
  ];
</script>

<!-- Header -->
<header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'} {isAtTop ? 'bg-transparent' : 'bg-white/90 backdrop-blur-sm shadow-sm'}">
  <div class="container mx-auto px-4 py-5 flex items-center justify-between">
    <div class="flex items-center">
      <div class="{isAtTop ? 'bg-white/90 backdrop-blur-sm' : 'bg-white'} p-2 rounded-lg transition-all duration-300">
        <NoahLogo className="h-8 w-auto" />
      </div>
    </div>

    <nav class="hidden md:flex items-center space-x-6">
      <a href="#features" class="text-sm font-medium {isAtTop ? 'text-primary-500 hover:text-primary-700' : 'text-zinc-800 hover:text-primary-600'} px-3 py-1 rounded-full transition-all duration-300">Recursos</a>
      <a href="#brands" class="text-sm font-medium {isAtTop ? 'text-primary-500 hover:text-primary-700' : 'text-zinc-800 hover:text-primary-600'} px-3 py-1 rounded-full transition-all duration-300">Parceiros</a>
      <a href="#steps" class="text-sm font-medium {isAtTop ? 'text-primary-500 hover:text-primary-700' : 'text-zinc-800 hover:text-primary-600'} px-3 py-1 rounded-full transition-all duration-300">Como Funciona</a>
    </nav>

    <div class="flex items-center space-x-3">
      <button
        onclick={openLogin}
        class="text-sm font-medium {isAtTop ? 'text-primary-500 hover:text-primary-700' : 'text-zinc-800 hover:text-primary-600'} px-3 py-1 rounded-full transition-all duration-300"
      >
        Login
      </button>
      <button
        onclick={openSignup}
        class="text-xs px-3 py-1.5 rounded-md font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 {isAtTop ? 'bg-white border-white text-primary-600 hover:bg-white/90 hover:text-primary-700' : 'bg-primary-600 hover:bg-primary-700 text-white border-transparent'}"
      >
        Cadastre-se
      </button>
    </div>
  </div>
</header>

<!-- Hero Section -->
<AuroraBackground forceLightMode={true}>
  <div class="container mx-auto px-4 pt-32 pb-16">
    <div class="flex flex-col items-center justify-center text-center" style="position: relative; z-index: 20;">
      <div class="inline-flex items-center justify-center px-3 py-1 mb-6 text-xs font-medium rounded-full bg-primary-100 text-primary-800">
        <span class="mr-1">🚀</span>
        Anunciando nosso mais recente produto
      </div>

      <h1 class="text-4xl md:text-6xl font-bold mb-6 text-zinc-900">
        Do Checkout Ao <span class="text-primary-600">
          <TextRotate
            texts={heroTexts}
            staggerDuration={0.03}
            rotationInterval={2000}
          />
        </span>
      </h1>

      <div style="width: 100%; margin-top: 3rem; margin-bottom: 3rem; position: relative; z-index: 30;">
        <HeroText className="mt-4 mb-8" />
      </div>

      <p class="text-lg md:text-xl text-zinc-600 mb-8 max-w-2xl">
        Compre o que você quiser. E seja recompensado por isso.
      </p>

      <button
        onclick={openSignup}
        class="text-base px-6 py-3 rounded-lg font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 bg-primary-600 hover:bg-primary-700 text-white border-transparent"
      >
        Comece Agora
      </button>
    </div>

    <!-- Features Grid -->
    <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white dark:bg-zinc-800 rounded-xl shadow-sm p-6 flex flex-col items-center">
        <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">+20.000 pontos</div>
        <div class="text-sm text-zinc-500 dark:text-zinc-400">+45%</div>
        <div class="mt-4 w-full h-16 bg-zinc-100 dark:bg-zinc-700 rounded-lg overflow-hidden">
          <div class="h-full w-full bg-gradient-to-r from-primary-200 to-primary-400 dark:from-primary-700 dark:to-primary-500 opacity-70"></div>
        </div>
      </div>

      <div class="bg-white dark:bg-zinc-800 rounded-xl shadow-sm p-6 flex flex-col items-center relative">
        <div class="absolute -top-10 left-1/2 transform -translate-x-1/2 w-64 h-64">
          <img src="/images/app-screenshot.png" alt="App Screenshot" class="w-full h-auto" />
        </div>
      </div>

      <div class="bg-white dark:bg-zinc-800 rounded-xl shadow-sm p-6 flex flex-col items-center">
        <div class="text-sm text-zinc-500 dark:text-zinc-400 mb-2">Ganhe 5%</div>
        <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">$750</div>
        <div class="mt-4 w-full h-16 bg-zinc-100 dark:bg-zinc-700 rounded-lg overflow-hidden">
          <div class="h-full w-3/4 bg-gradient-to-r from-primary-200 to-primary-400 dark:from-primary-700 dark:to-primary-500 opacity-70"></div>
        </div>
      </div>
    </div>
  </div>
</AuroraBackground>

<!-- Brands Section -->
<section id="brands" class="py-16 bg-zinc-50">
  <div class="container mx-auto px-4">
    <h2 class="text-2xl font-bold text-center mb-10 text-zinc-900">
      Compre nas suas marcas favoritas
    </h2>

    <div class="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
      {#each brands as brand}
        <div class="grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
          <img src={brand.logo} alt={brand.name} class="h-8 md:h-10 w-auto" />
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Steps Section -->
<section id="steps" class="py-16 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-2 text-zinc-900">
      Três Passos Simples
    </h2>
    <p class="text-center text-zinc-600 mb-12">
      Apenas Gaste, Jogue e Ganhe - É Muito Fácil!
    </p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {#each steps as step}
        <div class="flex flex-col items-center text-center">
          <div class="text-5xl mb-4">{step.icon}</div>
          <h3 class="text-xl font-bold mb-2 text-zinc-900">{step.title}</h3>
          <p class="text-zinc-600">{step.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Benefits Section -->
<section class="py-16 bg-zinc-50">
  <div class="container mx-auto px-4">
    <div class="flex flex-col md:flex-row items-center">
      <div class="md:w-1/2 mb-8 md:mb-0">
        <h2 class="text-3xl font-bold mb-4 text-zinc-900">
          Benefícios
        </h2>
        <p class="text-zinc-600 mb-6">
          Por que nossos membros amam Noah?
        </p>
        <ul class="space-y-3">
          <li class="flex items-center">
            <span class="mr-2 text-primary-600">✓</span>
            <span class="text-zinc-700">Ganhe pontos em todas as compras</span>
          </li>
          <li class="flex items-center">
            <span class="mr-2 text-primary-600">✓</span>
            <span class="text-zinc-700">Resgate em gift cards de suas marcas favoritas</span>
          </li>
          <li class="flex items-center">
            <span class="mr-2 text-primary-600">✓</span>
            <span class="text-zinc-700">Sem taxas anuais ou mensais</span>
          </li>
          <li class="flex items-center">
            <span class="mr-2 text-primary-600">✓</span>
            <span class="text-zinc-700">Jogos divertidos para aumentar seus ganhos</span>
          </li>
        </ul>
      </div>
      <div class="md:w-1/2">
        <img src="/images/benefits-illustration.svg" alt="Benefícios" class="w-full h-auto" />
      </div>
    </div>
  </div>
</section>

<!-- Footer -->
<footer class="py-8 bg-zinc-800 text-zinc-200">
  <div class="container mx-auto px-4">
    <div class="flex flex-col md:flex-row justify-between items-center">
      <div class="mb-4 md:mb-0">
        <NoahLogo className="h-8 w-auto" />
      </div>
      <div class="text-sm">
        &copy; {new Date().getFullYear()} Noah. Todos os direitos reservados.
      </div>
    </div>
  </div>
</footer>

<!-- Login/Signup Modal -->
{#if showLoginModal}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
    <div class="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
      <button
        onclick={closeModal}
        class="absolute top-4 right-4 text-zinc-500 hover:text-zinc-700"
        aria-label="Fechar modal"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div class="text-center mb-6">
        <NoahLogo className="h-10 w-auto mx-auto mb-4" />
        <h2 class="text-2xl font-bold text-zinc-900">
          {isSignup ? 'Crie sua conta' : 'Bem-vindo de volta'}
        </h2>
        <p class="text-zinc-600">
          {isSignup ? 'Preencha os dados abaixo para começar' : 'Entre com suas credenciais para continuar'}
        </p>
      </div>

      <form class="space-y-4">
        {#if isSignup}
          <div>
            <label for="name" class="block text-sm font-medium text-zinc-700 mb-1">Nome</label>
            <input
              type="text"
              id="name"
              class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="Seu nome completo"
            />
          </div>
        {/if}

        <div>
          <label for="email" class="block text-sm font-medium text-zinc-700 mb-1">Email</label>
          <input
            type="email"
            id="email"
            class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-zinc-700 mb-1">Senha</label>
          <input
            type="password"
            id="password"
            class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            placeholder="••••••••"
          />
        </div>

        {#if isSignup}
          <div>
            <label for="confirm-password" class="block text-sm font-medium text-zinc-700 mb-1">Confirmar Senha</label>
            <input
              type="password"
              id="confirm-password"
              class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="••••••••"
            />
          </div>
        {/if}

        <button
          class="w-full text-base px-6 py-3 rounded-lg font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 bg-primary-600 hover:bg-primary-700 text-white border-transparent"
        >
          {isSignup ? 'Criar Conta' : 'Entrar'}
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-sm text-zinc-600">
          {isSignup ? 'Já tem uma conta?' : 'Ainda não tem uma conta?'}
          <button
            onclick={() => isSignup = !isSignup}
            class="text-primary-600 font-medium hover:underline"
          >
            {isSignup ? 'Faça login' : 'Cadastre-se'}
          </button>
        </p>
      </div>
    </div>
  </div>
{/if}
