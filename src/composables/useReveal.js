import { onMounted, onUnmounted } from 'vue'

export function useReveal() {
  let observer
  function refresh() {
    observer?.disconnect()
    const elements = document.querySelectorAll('[data-reveal]:not(.revealed)')
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach(el => el.classList.add('revealed'))
      return
    }
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        }
      }
    }, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' })
    elements.forEach(el => observer.observe(el))
  }
  onMounted(refresh)
  onUnmounted(() => observer?.disconnect())
  return { refresh }
}
