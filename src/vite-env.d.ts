/// <reference types="vite/client" />

declare module 'virtual:catalog' {
  const catalog: import('./catalog/types').Catalog;
  export default catalog;
}
