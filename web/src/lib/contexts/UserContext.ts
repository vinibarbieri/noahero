import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

// Tipos
export type UserContextType = {
  isOwner: Writable<boolean>;
};

// Chave do contexto
const USER_CONTEXT_KEY = 'user-context';

// Função para criar e definir o contexto
export function setUserContext(initialIsOwner: boolean = false) {
  const isOwner = writable<boolean>(initialIsOwner);

  const context: UserContextType = {
    isOwner
  };

  return setContext<UserContextType>(USER_CONTEXT_KEY, context);
}

// Função para obter o contexto
export function getUserContext() {
  return getContext<UserContextType>(USER_CONTEXT_KEY);
}
