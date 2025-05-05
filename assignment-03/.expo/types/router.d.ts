/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/favorites` | `/favorites`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}${'/(home)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `/+not-found`, params: Router.UnknownInputParams & {  } } | { pathname: `${'/(tabs)'}${'/(home)'}/[title]` | `/[title]`, params: Router.UnknownInputParams & { title: string | number; } };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/favorites` | `/favorites`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}${'/(home)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `/+not-found`, params: Router.UnknownOutputParams & {  } } | { pathname: `${'/(tabs)'}${'/(home)'}/[title]` | `/[title]`, params: Router.UnknownOutputParams & { title: string; } };
      href: Router.RelativePathString | Router.ExternalPathString | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/favorites${`?${string}` | `#${string}` | ''}` | `/favorites${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}${'/(home)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/favorites` | `/favorites`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}${'/(home)'}` | `/`; params?: Router.UnknownInputParams; } | `/+not-found` | `${'/(tabs)'}${'/(home)'}/${Router.SingleRoutePart<T>}` | `/${Router.SingleRoutePart<T>}` | { pathname: `/+not-found`, params: Router.UnknownInputParams & {  } } | { pathname: `${'/(tabs)'}${'/(home)'}/[title]` | `/[title]`, params: Router.UnknownInputParams & { title: string | number; } };
    }
  }
}
