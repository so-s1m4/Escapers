export function b64toBlob(dataurl) {
	// разделяем «metadata» и сам base64
	const [meta, b64] = dataurl.split(',')
	// вытаскиваем MIME-тип
	const mime = meta.match(/:(.*?);/)[1]
	// декодируем в бинарный поток
	const byteChars = atob(b64)
	const byteNumbers = new Array(byteChars.length)
	for (let i = 0; i < byteChars.length; i++) {
		byteNumbers[i] = byteChars.charCodeAt(i)
	}
	const byteArray = new Uint8Array(byteNumbers)
	return new Blob([byteArray], { type: mime })
}
