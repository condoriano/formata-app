import { ref, watch, onMounted } from 'vue'

const LOGO_STORAGE_KEY = 'formata-logo'

export function useLogo() {
  const logoUrl = ref('')
  const logoInputRef = ref<HTMLInputElement | null>(null)

  const triggerLogoUpload = () => {
    logoInputRef.value?.click()
  }

  const onLogoUpload = (event: Event) => {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]

    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      logoUrl.value = String(reader.result ?? '')
    }
    reader.readAsDataURL(file)
  }

  const removeLogo = () => {
    logoUrl.value = ''
    if (logoInputRef.value) {
      logoInputRef.value.value = ''
    }
  }

  onMounted(() => {
    const savedLogo = localStorage.getItem(LOGO_STORAGE_KEY)
    if (savedLogo) {
      logoUrl.value = savedLogo
    }
  })

  watch(logoUrl, (newVal) => {
    if (newVal) {
      localStorage.setItem(LOGO_STORAGE_KEY, newVal)
    } else {
      localStorage.removeItem(LOGO_STORAGE_KEY)
    }
  })

  return {
    logoUrl,
    logoInputRef,
    triggerLogoUpload,
    onLogoUpload,
    removeLogo,
  }
}
