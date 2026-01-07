<template>
  <section
    class="min-h-screen bg-cover bg-center text-black relative flex items-center justify-center"
    style="background-image: url('/bg.png')"
  >
    <!-- Background blur overlay -->
    <div class="absolute inset-0 backdrop-blur-[2px] bg-white/10"></div>

    <!-- Floating magical paws -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        v-for="paw in paws"
        :key="paw.id"
        class="paw"
        :style="{
          top: paw.top + 'vh',
          left: paw.left + 'vw',
          animationDuration: paw.duration + 's',
          transform: 'rotate(' + paw.rotation + 'deg) scale(' + paw.scale + ')'
        }"
      ></div>
    </div>

    <!-- Main content -->
    <div class="relative z-10 text-center px-6 max-w-xl">

      <!-- Hero -->
      <img
        src="/herotext.png"
        alt="A Little Dopamine for Myna"
        class="mx-auto w-full max-w-[900px] md:max-w-[1100px] lg:max-w-[1300px]"
      />

      <p class="text-gray-700 flex items-center justify-center gap-2
                drop-shadow-[0_1px_0_#fde7f3]
                drop-shadow-[1px_0_0_#fde7f3]
                drop-shadow-[-1px_0_0_#fde7f3]
                drop-shadow-[0_-1px_0_#fde7f3]">
        Because you deserve something soft, cute, and happy today
        <img src="/paws.png" alt="Paw Icon" class="w-6 h-6" />
      </p>

      <!-- Cat -->
      <div class="relative mb-10">
        <img
          :src="catImage"
          :class="[
            'mx-auto w-80 transition-all duration-500',
            isHappy && 'scale-105',
            showPulse && 'animate-bounce-pulse'
          ]"
          alt="Cute Cat"
        />
      </div>

      <!-- Actions -->
      <transition name="fade" appear>
        <div
          v-show="showActions"
          class="flex flex-col sm:flex-row justify-center gap-6 mt-6 min-h-[72px]"
        >
          <!-- Feed Button -->
          <button
            @click="feedCat"
            class="bg-yellow-300 hover:bg-yellow-400 text-yellow-900 font-semibold rounded-full min-w-[150px] py-3 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
          >
            <img src="/catfood.png" alt="Paw Icon" class="w-6 h-6" />Feed the Cat
          </button>

          <!-- Pet Button -->
          <button
            @click="petCat"
            class="bg-pink-300 hover:bg-pink-400 text-pink-900 font-semibold rounded-full min-w-[150px] py-3 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
          >
            <img src="/peticon.png" alt="Paw Icon" class="w-6 h-6" /> Pet the Cat
          </button>
        </div>
      </transition>

      <!-- Reveal Secret -->
      <div class="mt-8 flex justify-center min-h-[50px]">
        <button
          v-show="showSecretButton"
          @click="showSecret = true"
          class="bg-purple-400 hover:bg-purple-500 text-purple-900 font-semibold rounded-full min-w-[150px] py-3 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
        >
          <img src="/spark.png" alt="Paw Icon" class="w-6 h-6" /> Reveal a Secret
        </button>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="showSecret"
      class="fixed inset-0 flex items-center justify-center z-50 bg-black/40"
    >
      <div class="bg-blue-100 rounded-xl p-6 max-w-lg w-full shadow-lg flex flex-col relative">
        <img src="/me.JPG" class="w-60 h-60 rounded-full mx-auto mb-4 object-cover" />
        <h2 class="text-2xl font-bold mb-2 text-center">Hey, it&apos;s Fritz</h2>
        <p class="text-gray-500 mb-4 text-center">
          I made this just for you, hope it made you smile! 💗
        </p>
        <p class="text-gray-500 mb-6 text-center">
          If you see this and liked it… maybe check out 
          <a href="https://www.instagram.com/lemonjuice_ee/" target="_blank" class="text-pink-600 hover:underline font-semibold">My IG</a> ?
        </p>
        <div class="flex justify-center mb-2">
          <button
            @click="alert('Yay! Let’s squad up in Mobile Legends 😎')"
            class="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
          >
            Play Mobile Legends with me? 🎮
          </button>
        </div>
        <div class="flex items-center justify-center mb-6 gap-2">
          <p class="text-gray-500 text-center font-semibold">
            LemonJuicee: <span id="ml-number">43826446</span>
          </p>
          <button
            @click="copyNumber"
            class="bg-blue-400 px-3 py-1 rounded-lg text-sm transition-colors"
          >
            Copy
          </button>
        </div>
        <div class="flex justify-end">
          <button
            @click="showSecret = false"
            class="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const showActions = ref(false)
const fed = ref(false)
const petted = ref(false)
const hasFed = ref(false)
const hasPetted = ref(false)
const showPulse = ref(false)
const showSecret = ref(false)

const meowFeed = new Audio('/meow1.wav')  // path relative to public
const meowPet  = new Audio('/meow2.wav')

onMounted(() => {
  setTimeout(() => showActions.value = true, 1000)
})
// Background music
const bgMusic = new Audio('/bgmusic.mp3')
bgMusic.loop = true        // keep looping
bgMusic.volume = 0.2       // soft volume (0.0 - 1.0)

// Play automatically when page loads
onMounted(() => {
  bgMusic.play().catch(() => {
    // Some browsers block autoplay, so you can wait for first interaction if needed
    console.log("Autoplay blocked, user needs to interact first")
  })
})
const startMusicOnClick = () => bgMusic.play()
window.addEventListener('click', startMusicOnClick, { once: true })

const catImage = computed(() => {
  if (petted.value) return '/catpet.png'
  if (fed.value) return '/cathappy.png'
  return '/cat.png'
})
const isHappy = computed(() => fed.value || petted.value)

const feedCat = () => {
  fed.value = true
  petted.value = false
  hasFed.value = true
  meowFeed.play()  // plays meow1.wav
}

const petCat = () => {
  petted.value = true
  fed.value = false
  hasPetted.value = true
  meowPet.play()   // plays meow2.wav
}
const copyNumber = () => {
  const number = document.getElementById('ml-number').innerText
  navigator.clipboard.writeText(number).then(() => alert('Copied!')).catch(() => alert('Failed'))
}
const showSecretButton = computed(() => hasFed.value && hasPetted.value)

// Magical floating paws
const paws = ref([])
const createPaws = (count = 20) => {
  const newPaws = []
  for (let i = 0; i < count; i++) {
    newPaws.push({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: 20 + Math.random() * 20, // slower and varied
      rotation: Math.random() * 360,
      scale: 0.8 + Math.random() * 0.8 // random scale
    })
  }
  paws.value = newPaws
}
onMounted(() => createPaws(25))
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(20px); }
.fade-enter-to, .fade-leave-from { opacity: 1; transform: translateY(0); }

@keyframes bounce-pulse {
  0%,100%{ transform: scale(1); }
  50%{ transform: scale(1.1); }
}
.animate-bounce-pulse { animation: bounce-pulse 0.5s ease-in-out; }

/* Magical paws animation */
@keyframes float-paw {
  0%   { transform: translate(0, 100vh) rotate(0deg) scale(1); opacity:1; }
  50%  { transform: translate(20px, 50vh) rotate(180deg) scale(1.1); }
  100% { transform: translate(-10px, -10vh) rotate(360deg) scale(0.9); }
}

.paw {
  width: 32px;
  height: 32px;
  position: absolute;
  background-image: url('/pawicon.png');
  background-size: contain;
  background-repeat: no-repeat;
  animation-name: float-paw;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
</style>
