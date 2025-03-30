import { fireEvent, render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import AvatarList from './AvatarList.svelte';

describe('AvatarList', () => {
  const mockItems = [
    { name: 'Empresa A', href: '#', status: 'story' },
    { name: 'Empresa B', href: '#', isActive: true, status: 'live' },
    { name: 'Empresa C', href: '#' }
  ];

  it('renderiza a lista de avatares', () => {
    render(AvatarList, { props: { items: mockItems } });
    const list = screen.getByTestId('avatar-list');
    expect(list).toBeInTheDocument();
    expect(list.children).toHaveLength(3);
  });

  it('aplica o tamanho correto nos avatares', () => {
    render(AvatarList, { props: { items: mockItems, size: 'lg' } });
    const avatars = screen.getAllByTestId('avatar');
    avatars.forEach(avatar => {
      expect(avatar).toHaveClass('w-12 h-12');
    });
  });

  it('aplica o espaçamento correto entre os avatares', () => {
    render(AvatarList, { props: { items: mockItems, gap: 'lg' } });
    const list = screen.getByTestId('avatar-list');
    expect(list).toHaveClass('gap-4');
  });

  it('renderiza avatares com links quando href é fornecido', () => {
    render(AvatarList, { props: { items: mockItems } });
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    links.forEach(link => {
      expect(link).toHaveAttribute('href', '#');
    });
  });

  it('marca corretamente o avatar ativo', () => {
    render(AvatarList, { props: { items: mockItems } });
    const avatars = screen.getAllByTestId('avatar');
    expect(avatars[1]).toHaveClass('outline-2'); // O segundo item está marcado como ativo
  });

  it('aplica corretamente o status de story', () => {
    render(AvatarList, { props: { items: mockItems } });
    const avatars = screen.getAllByTestId('avatar');
    expect(avatars[0]).toHaveClass('ring-emerald-500');
  });

  it('aplica corretamente o status de live', () => {
    render(AvatarList, { props: { items: mockItems } });
    const avatars = screen.getAllByTestId('avatar');
    expect(avatars[1]).toHaveClass('ring-red-500');
  });

  it('dispara evento de seleção ao clicar em um avatar', async () => {
    const mockSelect = vi.fn();
    const { component } = render(AvatarList, { 
      props: { 
        items: mockItems,
        on: {
          select: mockSelect
        }
      } 
    });

    const avatars = screen.getAllByTestId('avatar');
    await fireEvent.click(avatars[0]);

    expect(mockSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: { item: mockItems[0] }
      })
    );
  });
}); 