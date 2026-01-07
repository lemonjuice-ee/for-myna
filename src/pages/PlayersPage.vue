<template>
  <section class="min-h-screen bg-black text-white px-6 py-10">
    <h1 class="text-4xl font-bold mb-6 text-center">🏀 NBA Players</h1>

    <!-- Search & Filter -->
    <div class="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 mb-8 justify-center">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by name..."
        class="w-full sm:w-1/2 px-4 py-2 rounded bg-gray-700 text-white"
      />
      <select
        v-model="selectedTeam"
        class="w-full sm:w-1/2 px-4 py-2 rounded bg-gray-700 text-white"
      >
        <option value="">All Teams</option>
        <option v-for="(name, id) in teamNameMap" :key="id" :value="id">{{ name }}</option>
      </select>
    </div>

    <!-- Players Grid -->
    <div v-if="filteredPlayers.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-6">
      <div
        v-for="player in filteredPlayers"
        :key="player.playerId"
        class="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition text-center"
      >
        <!-- Player Headshot -->
        <img
          :src="getPlayerImage(player)"
          :alt="`${player.firstName} ${player.lastName}`"
          class="w-24 h-24 object-contain mx-auto mb-3 "
          @error="hideImage"
        />

        <!-- Name -->
        <h2 class="text-lg font-semibold">{{ player.firstName }} {{ player.lastName }}</h2>

        <!-- Team Name & Logo -->
        <div class="flex items-center justify-center mt-2 gap-2">
          <img
            v-if="teamAbbrMap[player.teamId]"
            :src="getTeamLogo(player.teamId)"
            alt="Team Logo"
            class="w-6 h-6 object-contain"
          />
          <span class="text-gray-400 text-sm">{{ teamNameMap[player.teamId] || 'Free Agent' }}</span>
        </div>
      </div>
    </div>

    <!-- Loading / Empty State -->
    <p v-else class="text-center text-gray-400">Loading players...</p>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Player {
  playerId: number
  firstName: string
  lastName: string
  teamId: number
}

interface Team {
  teamId: number
  abbreviation: string
  teamName: string
  location: string
}

const players = ref<Player[]>([])
const teamAbbrMap = ref<Record<number, string>>({})
const teamNameMap = ref<Record<number, string>>({})
const searchQuery = ref('')
const selectedTeam = ref<number | ''>('')

// Fix for Pelicans and Jazz logos on ESPN CDN
const logoMap: Record<string, string> = {
  NOP: 'NO',   // Pelicans
  UTA: 'UTH',  // Jazz
}

// Return ESPN logo based on mapped abbreviation
const getTeamLogo = (teamId: number) => {
  const abbr = teamAbbrMap.value[teamId]
  const logoCode = logoMap[abbr] || abbr
  return `https://a.espncdn.com/i/teamlogos/nba/500/${logoCode}.png`
}

// Return NBA headshot URL (some may not exist)
const getPlayerImage = (player: Player) => {
  return `https://cdn.nba.com/headshots/nba/latest/1040x760/${player.playerId}.png`
}

// Filter players by name and selected team
const filteredPlayers = computed(() => {
  return players.value.filter((p) => {
    const name = `${p.firstName} ${p.lastName}`.toLowerCase()
    const matchesName = name.includes(searchQuery.value.toLowerCase())
    const matchesTeam = selectedTeam.value === '' || p.teamId === selectedTeam.value
    return matchesName && matchesTeam
  })
})

// Hide broken images
const hideImage = (e: Event) => {
  const img = e.target as HTMLImageElement
  img.style.display = 'none'
}

onMounted(async () => {
  try {
    // Load teams
    const teamRes = await fetch('https://raw.githubusercontent.com/bttmly/nba/master/data/teams.json')
    const teams: Team[] = await teamRes.json()
    teamNameMap.value = Object.fromEntries(teams.map(t => [t.teamId, t.teamName]))
    teamAbbrMap.value = Object.fromEntries(teams.map(t => [t.teamId, t.abbreviation]))

    // Load players
    const playerRes = await fetch('https://raw.githubusercontent.com/bttmly/nba/master/data/players.json')
    players.value = await playerRes.json()
  } catch (err) {
    console.error('❌ Failed to load players or teams:', err)
  }
})
</script>
