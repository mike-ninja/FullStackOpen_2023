export const isNotNumber = (arg: string): Boolean => {
  if (isNaN(Number(arg))) {
    return false
  }
  return true
}
