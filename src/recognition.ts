import { ref } from 'vue'

export function useRecognition() {
	const recognition = new webkitSpeechRecognition()

	const recognizedTexts = ref<string[]>([])
	const realtimeText = ref('')
	const recording = ref(false)

	recognition.interimResults = true
	recognition.lang = 'pt-BR'
	recognition.continuous = true

	recognition.onresult = function (event) {
		Array.from(event.results).forEach((result, index) => {
			if (index === event.results.length - 1) {
				realtimeText.value = result[0].transcript
			} else {
				recognizedTexts.value.push(result[0].transcript)
			}
		})
	}

	recognition.onend = () => (recording.value = false)
	recognition.onstart = () => {
		recognizedTexts.value = []
		recording.value = true
	}

	return { recording, recognizedTexts, recognition, realtimeText }
}
