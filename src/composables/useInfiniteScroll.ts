import { onMounted, onUnmounted } from 'vue'
export function useInfiniteScroll(callback: () => void, treeshold = 100) {
  const onScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    if (scrollTop + clientHeight >= scrollHeight - treeshold) {
      callback()
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })
}
