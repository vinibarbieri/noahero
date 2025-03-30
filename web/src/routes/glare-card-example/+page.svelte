<script lang="ts">
  import { GlareCard } from "$lib/components/ui/glare-card";
</script>

<div class="container mx-auto p-8">
  <h1 class="text-3xl font-bold mb-8">GlareCard Component</h1>

  <div class="mb-12">
    <h2 class="text-xl font-semibold mb-4">Demo</h2>
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
  </div>

  <div class="mb-12">
    <h2 class="text-xl font-semibold mb-4">Usage</h2>
    <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
      <pre class="text-sm overflow-x-auto">
{`<script lang="ts">
  import { GlareCard } from "$lib/components/ui/glare-card";
</script>

<GlareCard className="flex items-center justify-center">
  <!-- Your content here -->
  <p class="text-white">Hello World</p>
</GlareCard>`}
      </pre>
    </div>
  </div>

  <div>
    <h2 class="text-xl font-semibold mb-4">Props</h2>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg">
        <thead>
          <tr class="bg-gray-100 dark:bg-gray-700">
            <th class="py-2 px-4 border-b text-left">Prop</th>
            <th class="py-2 px-4 border-b text-left">Type</th>
            <th class="py-2 px-4 border-b text-left">Default</th>
            <th class="py-2 px-4 border-b text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="py-2 px-4 border-b">className</td>
            <td class="py-2 px-4 border-b">string</td>
            <td class="py-2 px-4 border-b">""</td>
            <td class="py-2 px-4 border-b">Additional CSS classes to apply to the card content</td>
          </tr>
          <tr>
            <td class="py-2 px-4 border-b">children (slot)</td>
            <td class="py-2 px-4 border-b">-</td>
            <td class="py-2 px-4 border-b">-</td>
            <td class="py-2 px-4 border-b">Content to display inside the card</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
