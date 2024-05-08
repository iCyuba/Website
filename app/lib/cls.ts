type Falsy = false | null | undefined | 0 | "";

/**
 * Join classes by a space to be used in className prop
 *
 * Inspired by the clsx package, but with a simpler implementation
 * @param classes List of classes to be joined
 * @returns Classes joined by a space
 */
export function cls(...classes: (string | Falsy)[]): string {
  return classes.filter(Boolean).join(" ");
}
