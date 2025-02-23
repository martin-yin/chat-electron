const map = {
  'chat-link': '//45.32.110.124:5001/'
}

export default function hostMap(host: string): string {
  // if (import.meta.env.MODE === 'production') return map[host]
  return map[host]
}
