import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import Avatar from './Avatar.svelte';

describe('Avatar', () => {
  it('renderiza com nome', () => {
    render(Avatar, { props: { name: 'Empresa Teste' } });
    expect(screen.getByText('ET')).toBeInTheDocument();
  });

  it('renderiza com ícone', () => {
    const icon = 'https://via.placeholder.com/150';
    render(Avatar, { props: { name: 'Empresa Teste', icon } });
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', icon);
    expect(img).toHaveAttribute('alt', 'Empresa Teste');
  });

  it('renderiza com link', () => {
    render(Avatar, { props: { name: 'Empresa Teste', href: '/empresa' } });
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/empresa');
  });

  it('aplica classe de ativo quando isActive é true', () => {
    render(Avatar, { props: { name: 'Empresa Teste', isActive: true } });
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveClass('ring-2');
  });

  it('aplica tamanho correto baseado na prop size', () => {
    render(Avatar, { props: { name: 'Empresa Teste', size: 'lg' } });
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveClass('w-12 h-12');
  });
}); 