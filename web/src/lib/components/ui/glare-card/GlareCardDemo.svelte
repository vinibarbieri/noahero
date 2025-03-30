<script lang="ts">
  import { GlareCard } from "$lib/components/ui/glare-card";
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-10">
  <GlareCard className="flex flex-col items-center justify-center">
    <svg
      width="66"
      height="65"
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="h-14 w-14 text-white"
    >
      <path
        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
        stroke="currentColor"
        stroke-width="15"
        stroke-miterlimit="3.86874"
        stroke-linecap="round"
      />
    </svg>
  </GlareCard>
  <GlareCard className="flex flex-col items-center justify-center">
    <img
      class="h-full w-full absolute inset-0 object-cover"
      src="https://images.unsplash.com/photo-1512618831669-521d4b375f5d?q=80&w=3388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Abstract art"
    />
  </GlareCard>
  <GlareCard className="flex flex-col items-start justify-end py-8 px-6">
    <p class="font-bold text-white text-lg">The greatest trick</p>
    <p class="font-normal text-base text-neutral-200 mt-4">
      The greatest trick the devil ever pulled was to convince the world
      that he didn't exist.
    </p>
  </GlareCard>
</div>
