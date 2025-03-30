/**
 * Utility function to conditionally join class names together
 * Similar to the clsx or classnames libraries in React
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes
    .filter(Boolean)
    .join(' ')
    .trim()
    .replace(/\s+/g, ' ');
}
