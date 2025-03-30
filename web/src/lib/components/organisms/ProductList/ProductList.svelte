<script lang="ts">
  import { ProductCard } from '$lib/components/molecules/ProductCard';

  // Props
  let { products, onFavoriteToggle, onSpend } = $props<{
    products: Array<{
      id: string;
      title: string;
      imageUrl: string;
      price: number;
      points: number;
      tag?: string;
      tagVariant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
      isFavorite?: boolean;
    }>;
    onFavoriteToggle?: (productId: string) => void;
    onSpend?: (productId: string) => void;
  }>();

  function handleFavoriteToggle(productId: string) {
    if (onFavoriteToggle) onFavoriteToggle(productId);
  }

  function handleSpend(productId: string) {
    if (onSpend) onSpend(productId);
  }
</script>

<div class="space-y-3">
  {#each products as product}
    <ProductCard 
      title={product.title}
      imageUrl={product.imageUrl}
      price={product.price}
      points={product.points}
      tag={product.tag}
      tagVariant={product.tagVariant}
      isFavorite={product.isFavorite}
      onFavoriteToggle={() => handleFavoriteToggle(product.id)}
      onSpend={() => handleSpend(product.id)}
    />
  {/each}
</div>
