export const getLink = () => {
  if (import.meta.env.VITE_DEV_URL) {
    return import.meta.env.VITE_DEV_URL;
  }
  
  return import.meta.env.VITE_PROD_URL;
}