// UIStore para gerenciar o estado global da UI
export const uiState = $state({
  // Tema
  theme: 'light', // 'light' ou 'dark'
  
  // Estado de modais
  activeModals: {
    balanceDialog: false,
    profileEditDialog: false,
    shareDialog: false
  },
  
  // Estado de navegação
  navigation: {
    activeTab: 'offers',
    activeFilter: 'for-you',
    activeNavigationItem: 'shop',
    searchValue: ''
  }
});

// Ações para manipular o estado da UI
export function toggleTheme() {
  uiState.theme = uiState.theme === 'light' ? 'dark' : 'light';
  
  // Aplicar o tema ao documento
  if (typeof document !== 'undefined') {
    if (uiState.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}

export function setActiveTab(tab: string) {
  uiState.navigation.activeTab = tab;
}

export function setActiveFilter(filter: string) {
  uiState.navigation.activeFilter = filter;
}

export function setActiveNavigationItem(item: string) {
  uiState.navigation.activeNavigationItem = item;
}

export function setSearchValue(value: string) {
  uiState.navigation.searchValue = value;
}

export function openModal(modalName: keyof typeof uiState.activeModals) {
  uiState.activeModals[modalName] = true;
}

export function closeModal(modalName: keyof typeof uiState.activeModals) {
  uiState.activeModals[modalName] = false;
}
