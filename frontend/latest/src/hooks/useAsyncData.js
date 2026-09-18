import { useCallback, useEffect, useState } from 'react';

/**
 * Loads data whenever `deps` change, and again on demand via `reload()`.
 *
 * State is only ever set from the settled promise, never synchronously in the
 * effect body — that is what stops the cascading re-render React warns about,
 * and it means a refetch leaves the current rows on screen instead of flashing
 * the whole table back to a spinner.
 *
 * A result that arrives after the inputs changed, or after the component has
 * gone, is discarded rather than overwriting fresher data.
 */
export function useAsyncData(loader, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: '' });
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let cancelled = false;
    loader()
      .then((data) => !cancelled && setState({ data, loading: false, error: '' }))
      .catch((err) => !cancelled && setState({ data: null, loading: false, error: err.message }));
    return () => {
      cancelled = true;
    };
    // `loader` is recreated on every render by design; `deps` is what decides
    // when a reload is actually needed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, nonce]);

  const reload = useCallback(() => setNonce((n) => n + 1), []);

  return { ...state, reload, setError: (error) => setState((s) => ({ ...s, error })) };
}
