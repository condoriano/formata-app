import html2canvas from 'html2canvas'

export async function exportFieldAsJpeg(element: HTMLElement, fileName = 'field.jpg') {
  const canvas = await html2canvas(element, {
    backgroundColor: 'white',
    scale: 2,
  })

  const link = document.createElement('a')
  link.download = fileName
  link.href = canvas.toDataURL('image/jpeg', 1.0)
  link.click()
}
