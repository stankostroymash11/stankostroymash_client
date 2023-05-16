export const endpoint = {
  url: typeof window !== "undefined" && window.endpoint ? window.endpoint.url : process.env.NEXT_PUBLIC_API_HOST 
}