<template>
  <section class="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
    <div class="container mx-auto px-6 py-20 text-center">
      <h1 class="text-5xl font-bold mb-6">🏀 NBA Stats Tracker</h1>
      <p class="text-lg text-gray-300 mb-10">
        Explore team rosters, player stats, and match updates — all in one place.
      </p>

      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <RouterLink to="/teams" class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-lg">
          View Teams
        </RouterLink>
        <RouterLink to="/players" class="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg text-lg">
          Search Players
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
// No script needed yet
</script>
