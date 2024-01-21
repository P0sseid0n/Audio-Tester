<script setup lang="ts">
import { computed, ref, watch } from "vue"
import { useRecognition } from "./recognition"

const { recognition, recording, recognizedTexts, realtimeText } = useRecognition()

const toggleRecordingState = () => recording.value ? recognition.stop() : recognition.start()

const phrase = computed(() => recognizedTexts.value[recognizedTexts.value.length - 1])

let feedbackStream: MediaStream
watch(recording, (value) => {

   if (value) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
         const audio = document.createElement('audio')
         audio.controls = true
         audio.autoplay = true
         audio.srcObject = stream
         feedbackStream = stream
      })
         .catch((err) => {
            console.log('The following getUserMedia error occurred: ' + err)
         })
   } else {
      feedbackStream.getAudioTracks().forEach((track) => track.stop())
   }
})

</script>

<template>
   <main>

      <div id="visualizer"></div>

      <button id="recordButton"
              @click="toggleRecordingState">
         {{ recording ? "Stop" : "Start" }}
      </button>

      <h2 id="recognized">
         {{ phrase }}
      </h2>

      <h1>
         {{ realtimeText }}
      </h1>
   </main>
</template>

<style>
* {
   margin: 0;
   padding: 0;
   box-sizing: border-box;

}

#app {
   font-family: Avenir, Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;


   background: #212836;
   width: 100vw;
   height: 100vh;

   color: white;
}

main {
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   height: 100%;
}

#recordButton {
   background: #30b38f;

   border: none;
   border-radius: 8px;
   margin: 20px;
   color: white;
   font-size: 1.2rem;
   cursor: pointer;

   padding: 8px 32px;
}
</style>
