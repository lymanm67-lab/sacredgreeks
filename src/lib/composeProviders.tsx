import { ComponentType, ReactNode } from "react";

type Provider = ComponentType<{ children: ReactNode }>;

/**
 * Composes multiple React context providers into a single wrapper,
 * eliminating deeply nested JSX trees in App.tsx.
 */
export function composeProviders(...providers: Provider[]): Provider {
  return providers.reduce(
    (Accumulated, Current) =>
      ({ children }: { children: ReactNode }) => (
        <Accumulated>
          <Current>{children}</Current>
        </Accumulated>
      ),
    ({ children }: { children: ReactNode }) => <>{children}</>
  );
}
