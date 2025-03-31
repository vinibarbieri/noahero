<script lang="ts">
  import { TextRotate } from '$lib/components/atoms/TextRotate';

  // Props
  let {
    className = ''
  } = $props<{
    className?: string;
  }>();

  // Textos rotativos
  const dynamicTexts = [
    "melhores ainda",
    "com muito mais vantagem",
    "te dando muita economia",
    "com itens exclusivos"
  ];
</script>

<div class="flex flex-col items-center text-center {className}" style="position: relative; z-index: 50;">
  <div class="text-2xl md:text-3xl lg:text-4xl font-bold w-full" style="position: relative; z-index: 50;">
    <span class="block mb-4 text-zinc-800">
      As empresas que você ama
    </span>

    <div class="flex justify-center items-center h-16 md:h-20" style="position: relative; z-index: 50;">
      <!-- Glow effect -->
      <div style="position: absolute; inset: 0; background: linear-gradient(to right, rgba(99, 102, 241, 0.2), rgba(79, 70, 229, 0.2)); filter: blur(16px); border-radius: 0.75rem;" class="animate-pulse"></div>

      <!-- Text container -->
      <div style="position: relative; background: linear-gradient(to right, rgb(99, 102, 241), rgb(79, 70, 229)); color: white; padding: 0.75rem 1.5rem; border-radius: 0.75rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); transform: translateZ(0); transition: all 0.3s;" class="hover:scale-105 hover:shadow-xl">
        <TextRotate
          texts={dynamicTexts}
          staggerDuration={0.04}
          rotationInterval={3000}
          className="font-bold"
        />
      </div>
    </div>
  </div>
</div>
