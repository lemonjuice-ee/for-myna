<template>
  <section class="min-h-screen bg-black text-white px-6 py-10">
    <h1 class="text-4xl font-bold mb-8 text-center">🏀 NBA Teams</h1>

    <!-- Teams Grid -->
    <div v-if="teams.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      <div
        v-for="team in teams"
        :key="team.teamId"
        class="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition text-center"
      >
        <img
          :src="`https://a.espncdn.com/i/teamlogos/nba/500/${logoMap[team.abbreviation] || team.abbreviation}.png`"
          :alt="`${team.teamName} logo`"
          class="w-24 h-24 object-contain mx-auto mb-4"
          @error="hideImage($event)"
        />
        <h2 class="text-xl font-semibold mb-2">{{ team.teamName }}</h2>
        <!-- Abbreviation removed here -->
      </div>
    </div>

    <!-- Loading Message -->
    <p v-else class="text-center text-gray-400">Loading teams...</p>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Team {
  teamId: string
  abbreviation: string
  teamName: string
  simpleName: string
  location: string
}

const teams = ref<Team[]>([])

const logoMap: Record<string, string> = {
  UTA: 'UTH', // Jazz
  NOP: 'NO',   // Pelicans
}

function hideImage(event: Event) {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
}

onMounted(async () => {
  try {
    const res = await fetch('https://raw.githubusercontent.com/bttmly/nba/master/data/teams.json')
    if (!res.ok) throw new Error('Failed to fetch teams.')
    teams.value = await res.json()
  } catch (err) {
    console.error('Error loading teams:', err)
  }
})
</script>


