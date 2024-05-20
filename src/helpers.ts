export const getFileName = (fileName: string) => {
  return `${import.meta.env.VITE_STATIC_URL}/${fileName}`
}
