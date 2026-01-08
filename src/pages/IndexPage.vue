<template>
  <section
     class="min-h-screen font-cute bg-cover bg-center text-black relative flex items-center justify-center"
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
  ref="catEl"
  :src="catImage"
  :class="[
    'mx-auto w-80 transition-all duration-500 rounded-xl',
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
  class="flex flex-row justify-center gap-12 mt-6"
>
  <!-- Feed Button -->
  <div class="flex flex-col items-center">
    <img
      ref="foodEl"
      src="/catfood.png"
      alt="Cat Food"
      @click="flyFood"
      class="w-30 h-30 cursor-pointer hover:scale-110 transition-transform drop-shadow-lg"
    />
    <span class="text-sm text-gray-700 mt-1">Tap to Feed</span>
  </div>

  <!-- Pet Button -->
  <div class="flex flex-col items-center">
    <img
      ref="petEl"
      src="/peticon.png"
      alt="Pet Cat"
      @click="flyPet"
      class="w-30 h-30 cursor-pointer hover:scale-110 transition-transform drop-shadow-lg"
    />
    <span class="text-sm text-gray-700 mt-1">Tap to Pet</span>
  </div>
</div>

      </transition>

      <!-- Reveal Secret -->
      <div class="mt-8 flex justify-center min-h-[50px]">
        <button
  v-show="showSecretButton"
  @click="showSecret = true"
  class="bg-[#fdf5c9] text-[#6b3e26] font-semibold rounded-full min-w-[150px] py-3 flex items-center justify-center gap-2 shadow-lg border-2 border-[#6b3e26] hover:bg-[#fdf0b8] hover:shadow-xl transition-all duration-300 active:scale-95"
>
  <img src="/spark.png" alt="Paw Icon" class="w-6 h-6" /> Reveal a Secret
</button>
      </div>
    </div>

    <!-- Modal -->
<!-- Secret Modal -->
<!-- Secret Modal -->
<div v-if="showSecret" class="fixed inset-0 flex items-center justify-center z-50 bg-black/40">

  <!-- Envelope only -->
  <img
    v-if="!envelopeClicked"
    src="/envelope.png"
    alt="Secret Envelope"
    class="w-140 h-80 cursor-pointer"
    @click="envelopeClicked = true"
  />

  <!-- Secret message -->
  <div v-else class="bg-[#fdf5c9] border-4 border-[#6b3e26] rounded-xl p-6 max-w-lg w-full shadow-lg flex flex-col items-center relative">
<img src="/me.JPG" class="w-60 h-60 rounded-full mx-auto mb-4 object-cover" /> <h2 class="text-2xl font-bold mb-2 text-center">Hey, it&apos;s Fritz</h2> <p class="text-gray-500 mb-4 text-center"> I made this just for you, hope it made you smile! 💗 </p> <p class="text-gray-500 mb-6 text-center"> If you see this and liked it… maybe check out <a href="https://www.instagram.com/lemonjuice_ee/" target="_blank" class="text-pink-600 hover:underline font-semibold">My IG</a> ? </p> <div class="flex justify-center mb-2"> <button @click="alert('Yay! Let’s squad up in Mobile Legends 😎')" class="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all" > Play Mobile Legends with me? 🎮 </button> </div> <div class="flex items-center justify-center mb-6 gap-2"> <p class="text-gray-500 text-center font-semibold"> LemonJuicee: <span id="ml-number">43826446</span> </p> <button @click="copyNumber" class="bg-blue-400 px-3 py-1 rounded-lg text-sm transition-colors" > Copy </button> </div> <div class="flex justify-end"> <button @click="showSecret = false" class="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-lg" > Close </button>
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


const meowFeed = new Audio('/meow1.wav')  // path relative to public
const meowPet  = new Audio('/meow2.wav')
const isFeeding = ref(false)
const petEl = ref(null)
const isPetting = ref(false)

const showSecret = ref(false)       // user clicked "Reveal a Secret"
const envelopeClicked = ref(false)  // user clicked/tapped the envelope


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
const onDragStart = (e) => {
  e.dataTransfer.setData('text/plain', 'food')
  isDragging.value = true
}

const foodEl = ref(null)
const catEl = ref(null)

const flyFood = () => {
  if (isFeeding.value) return
  if (!foodEl.value || !catEl.value) return

  isFeeding.value = true

  const foodRect = foodEl.value.getBoundingClientRect()
  const catRect = catEl.value.getBoundingClientRect()

  const clone = foodEl.value.cloneNode(true)
  document.body.appendChild(clone)

  clone.style.position = 'fixed'
  clone.style.left = foodRect.left + 'px'
  clone.style.top = foodRect.top + 'px'
  clone.style.width = foodRect.width + 'px'
  clone.style.height = foodRect.height + 'px'
  clone.style.transition =
    'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s'
  clone.style.zIndex = 9999

  clone.getBoundingClientRect()

  const targetX =
    catRect.left + catRect.width / 2 - foodRect.left - foodRect.width / 2
  const targetY =
    catRect.top + catRect.height / 2 - foodRect.top - foodRect.height / 2

  clone.style.transform = `translate(${targetX}px, ${targetY}px) scale(0.2)`
  clone.style.opacity = '0'

  setTimeout(() => {
    clone.remove()
    feedCat()
    isFeeding.value = false
  }, 600)
}

const flyPet = () => {
  if (isPetting.value) return
  if (!petEl.value || !catEl.value) return

  isPetting.value = true

  const petRect = petEl.value.getBoundingClientRect()
  const catRect = catEl.value.getBoundingClientRect()

  const clone = petEl.value.cloneNode(true)
  document.body.appendChild(clone)

  clone.style.position = 'fixed'
  clone.style.left = petRect.left + 'px'
  clone.style.top = petRect.top + 'px'
  clone.style.width = petRect.width + 'px'
  clone.style.height = petRect.height + 'px'
  clone.style.transition =
    'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s'
  clone.style.zIndex = 9999

  clone.getBoundingClientRect()

  const targetX =
    catRect.left + catRect.width / 2 - petRect.left - petRect.width / 2
  const targetY =
    catRect.top + catRect.height / 2 - petRect.top - petRect.height / 2

  clone.style.transform = `translate(${targetX}px, ${targetY}px) scale(0.3)`
  clone.style.opacity = '0'

  setTimeout(() => {
    clone.remove()
    petCat()
    isPetting.value = false
  }, 500)
}

const petCat = () => {
  petted.value = true
  fed.value = false
  hasPetted.value = true
  showPulse.value = true
  meowPet.currentTime = 0
  meowPet.play()

  setTimeout(() => (showPulse.value = false), 500)
}

const catImage = computed(() => {
  if (petted.value) return '/catpet.png'
  if (fed.value) return '/cathappy.png'
  return '/cat.png'
})
const isHappy = computed(() => fed.value || petted.value)

const feedCat = () => {
  fed.value = true
  petted.value = false
  hasFed.value = true   // keep for secret unlock logic
  showPulse.value = true
  meowFeed.currentTime = 0
  meowFeed.play()

  setTimeout(() => (showPulse.value = false), 500)
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
section {
  font-family: 'Quicksand', sans-serif;
}
</style>
