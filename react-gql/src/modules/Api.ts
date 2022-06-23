import React from 'react';
import { useSearchParams } from 'react-router-dom';

interface Options<A> {
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';
  path: string | ((param: A) => string);
  params?: (param: A) => Record<string, string | number | boolean | undefined | null>;
  body?: (param: A) => unknown;
}
export default class Api<A, R> {
  constructor(private readonly options: Options<A>) {}

  public url(arg: A): string {
    const { path, params } = this.options;
    let url = typeof path === 'string' ? path : path(arg);
    if (params) {
      const querystring = Object.entries(params(arg))
        .filter(([,v])=> v != null && v !== '')
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
        .join('&');
      url += `?${querystring}`;
    }
    return url;
  }

  public async exec(arg: A): Promise<R> {
    const xhr = await fetch(this.url(arg), {
      method: this.options.method,
      body: this.options.body ? JSON.stringify(this.options.body(arg)) : undefined,
    });
    if (xhr.ok) {
      return (await xhr.json()) as R;
    }
    throw new Error('fail');
  }
}

export const getUser = new Api<{ id: string, age?: number }, { id: string; name: string }>({
  method: 'GET',
  path: ({ id }) => `/api/user/${id}`,
  params: x=> ({age: x.age}),
});

export function useApiQuery<A, R>(
  api: Api<A, R>,
  params: A,
): { loading: boolean; error: Error | null; data?: R } {
  const [, refresh] = React.useReducer((x: number) => x + 1, 0);
  const ref = React.useRef<{ loading: boolean; error: Error | null; data?: R; key: string | null }>(
    {
      key: null,
      loading: true,
      error: null,
      data: undefined,
    },
  );
  const url = api.url(params);
  React.useEffect(() => {
    ref.current.key = url;
    if (!ref.current.loading || ref.current.error) {
      ref.current.loading = true;
      ref.current.error = null;
      refresh();
    }
    fetch(url)
      .then((xhr) => {
        if (!xhr.ok) return Promise<never>.reject('fail');
        return xhr.json() as Promise<R>;
      })
      .then((v) => {
        if (ref.current.key === url) {
          ref.current.loading = false;
          ref.current.data = v;
        }
      })
      .catch((err: Error) => {
        if (ref.current.key === url) {
          ref.current.loading = false;
          ref.current.error = err;
        }
      });
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ref.current.key = null;
    };
  }, [url]);
  return ref.current;
}
export type ApiParam<T> = T extends Api<infer P, unknown> ? P : never;
export type ApiReturn<T> = T extends Api<unknown, infer R> ? R : never;
// type B = ReturnType<typeof useUser>
export const useUser = ()=> {
  const [params] = useSearchParams();
  const id = params.get('id') || '';
  const query: ApiParam<typeof getUser> = { id }
  return useApiQuery(getUser, query)
}