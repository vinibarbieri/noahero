<script lang="ts">
  // Props
  let {
    name = '',
    username = '',
    bio = '',
    links = [],
    category = '',
    address = '',
    phone = '',
    workingHours = '',
    history = '',
    website = '',
    instagram = '',
    facebook = '',
    onSave,
    onCancel
  } = $props<{
    name: string;
    username: string;
    bio?: string;
    links?: Array<{url: string, text: string}>;
    category?: string;
    address?: string;
    phone?: string;
    workingHours?: string;
    history?: string;
    website?: string;
    instagram?: string;
    facebook?: string;
    onSave?: (data: ProfileFormData) => void;
    onCancel?: () => void;
  }>();

  // Estado do formulário
  let formName = $state(name);
  let formUsername = $state(username);
  let formBio = $state(bio || '');
  let formLinks = $state<Array<{url: string, text: string, id: number}>>(
    links.map((link: {url: string, text: string}, index: number) => ({ ...link, id: index })) || []
  );
  let formCategory = $state(category || '');
  let formAddress = $state(address || '');
  let formPhone = $state(phone || '');
  let formWorkingHours = $state(workingHours || '');
  let formHistory = $state(history || '');
  let formWebsite = $state(website || '');
  let formInstagram = $state(instagram || '');
  let formFacebook = $state(facebook || '');

  // Definir nextLinkId após a inicialização de formLinks
  let nextLinkId = $state(0);
  $effect(() => {
    nextLinkId = formLinks.length;
  });

  // Interface para os dados do formulário
  interface ProfileFormData {
    name: string;
    username: string;
    bio: string;
    links: Array<{url: string, text: string}>;
    category?: string;
    address?: string;
    phone?: string;
    workingHours?: string;
    history?: string;
    website?: string;
    instagram?: string;
    facebook?: string;
  }

  // Função para adicionar um novo link
  function addLink() {
    formLinks = [...formLinks, { url: '', text: '', id: nextLinkId }];
    nextLinkId++;
  }

  // Função para remover um link
  function removeLink(id: number) {
    formLinks = formLinks.filter(link => link.id !== id);
  }

  // Função para atualizar um link
  function updateLink(id: number, field: 'url' | 'text', value: string) {
    formLinks = formLinks.map(link => {
      if (link.id === id) {
        return { ...link, [field]: value };
      }
      return link;
    });
  }

  // Função para salvar o formulário
  function handleSubmit(event: Event) {
    event.preventDefault();

    if (onSave) {
      // Remover a propriedade id dos links antes de enviar
      const cleanLinks = formLinks.map(({ url, text }) => ({ url, text }));

      onSave({
        name: formName,
        username: formUsername,
        bio: formBio,
        links: cleanLinks,
        category: formCategory,
        address: formAddress,
        phone: formPhone,
        workingHours: formWorkingHours,
        history: formHistory,
        website: formWebsite,
        instagram: formInstagram,
        facebook: formFacebook
      });
    }
  }

  // Função para cancelar a edição
  function handleCancel() {
    if (onCancel) {
      onCancel();
    }
  }

  // Verificar se o formulário é válido
  let isFormValid = $state(true);
  $effect(() => {
    const isNameValid = formName.trim().length > 0;
    const isUsernameValid = formUsername.trim().length > 0;
    const areLinksValid = formLinks.every(link =>
      link.url.trim().length > 0 && link.text.trim().length > 0
    );

    isFormValid = isNameValid && isUsernameValid && areLinksValid;
  });
</script>

<form onsubmit={handleSubmit} class="space-y-6">
  <!-- Nome -->
  <div>
    <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      Nome
    </label>
    <input
      type="text"
      id="name"
      bind:value={formName}
      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
      placeholder="Nome da empresa ou usuário"
      required
    />
  </div>

  <!-- Username -->
  <div>
    <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      Nome de usuário
    </label>
    <div class="flex">
      <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
        @
      </span>
      <input
        type="text"
        id="username"
        bind:value={formUsername}
        class="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
        placeholder="username"
        required
      />
    </div>
  </div>

  <!-- Category -->
  <div>
    <label for="category" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      Categoria
    </label>
    <input
      type="text"
      id="category"
      bind:value={formCategory}
      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
      placeholder="Ex: Eletrônicos, Decoração, Pet..."
    />
  </div>

  <!-- Bio -->
  <div>
    <label for="bio" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      Bio
    </label>
    <textarea
      id="bio"
      bind:value={formBio}
      rows="4"
      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
      placeholder="Descreva sua empresa ou perfil"
    ></textarea>
  </div>

  <!-- Contact Information -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- Address -->
    <div>
      <label for="address" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Endereço
      </label>
      <input
        type="text"
        id="address"
        bind:value={formAddress}
        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
        placeholder="Ex: Rua da Cruz, 522 – Centro, São Luís – MA"
      />
    </div>

    <!-- Phone -->
    <div>
      <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Telefone
      </label>
      <input
        type="text"
        id="phone"
        bind:value={formPhone}
        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
        placeholder="Ex: (98) 3312-3472"
      />
    </div>
  </div>

  <!-- Working Hours -->
  <div>
    <label for="workingHours" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      Horário de Funcionamento
    </label>
    <input
      type="text"
      id="workingHours"
      bind:value={formWorkingHours}
      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
      placeholder="Ex: Segunda a Sexta das 08h às 18h; Sábado das 08h às 13h"
    />
  </div>

  <!-- History -->
  <div>
    <label for="history" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      História da Empresa
    </label>
    <textarea
      id="history"
      bind:value={formHistory}
      rows="3"
      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
      placeholder="Conte a história da sua empresa..."
    ></textarea>
  </div>

  <!-- Social Media -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <!-- Website -->
    <div>
      <label for="website" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Website
      </label>
      <input
        type="text"
        id="website"
        bind:value={formWebsite}
        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
        placeholder="Ex: www.casaarruda.com.br"
      />
    </div>

    <!-- Instagram -->
    <div>
      <label for="instagram" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Instagram
      </label>
      <input
        type="text"
        id="instagram"
        bind:value={formInstagram}
        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
        placeholder="Ex: @casaarruda"
      />
    </div>

    <!-- Facebook -->
    <div>
      <label for="facebook" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Facebook
      </label>
      <input
        type="text"
        id="facebook"
        bind:value={formFacebook}
        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
        placeholder="Ex: Casa Arruda no Facebook"
      />
    </div>
  </div>

  <!-- Links -->
  <div>
    <div class="flex justify-between items-center mb-2">
      <label for="links-section" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Links
      </label>
      <button
        type="button"
        onclick={addLink}
        class="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
        Adicionar Link
      </button>
    </div>

    {#if formLinks.length === 0}
      <p class="text-sm text-gray-500 dark:text-gray-400 italic">
        Nenhum link adicionado. Clique em "Adicionar Link" para incluir links ao seu perfil.
      </p>
    {:else}
      <div class="space-y-3" aria-labelledby="links-label">
        {#each formLinks as link (link.id)}
          <div class="flex flex-col sm:flex-row gap-2">
            <div class="flex-1">
              <input
                type="text"
                value={link.text}
                oninput={(e: Event) => updateLink(link.id, 'text', (e.target as HTMLInputElement).value)}
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="Texto do link"
                required
              />
            </div>
            <div class="flex-1">
              <input
                type="url"
                value={link.url}
                oninput={(e: Event) => updateLink(link.id, 'url', (e.target as HTMLInputElement).value)}
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="https://exemplo.com"
                required
              />
            </div>
            <button
              type="button"
              onclick={() => removeLink(link.id)}
              class="inline-flex items-center justify-center w-8 h-8 rounded-md text-red-500 hover:bg-red-100 dark:hover:bg-red-900 focus:outline-none"
              aria-label="Remover link"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Botões -->
  <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
    <button
      type="button"
      onclick={handleCancel}
      class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
    >
      Cancelar
    </button>
    <button
      type="submit"
      disabled={!isFormValid}
      class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Salvar Alterações
    </button>
  </div>
</form>
