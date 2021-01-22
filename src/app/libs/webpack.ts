export function importAll<T = unknown>(
  requireContext: __WebpackModuleApi.RequireContext
): Record<string, T> {
  const importCache: Record<string, T> = {};
  requireContext
    .keys()
    .forEach(
      (moduleKey: string) =>
        (importCache[moduleKey] = requireContext(moduleKey))
    );
  return importCache;
}
