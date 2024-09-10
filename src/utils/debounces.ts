export const debounce = (
  func: (...args: unknown[]) => void,
  wait: number,
): ((...args: unknown[]) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: unknown[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
