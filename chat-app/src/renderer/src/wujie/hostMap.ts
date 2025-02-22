const map = {
  'chat-link': '//localhost:5001/'
}

export default function hostMap(host: string): string {
  // if (import.meta.env.MODE === 'production') return map[host]
  return map[host]
}
