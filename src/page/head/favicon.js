import { Renderable } from '../../core/renderable.js';

class Favicon extends Renderable {
  async render () {
    return `
      <meta name="theme-color" content="#000091">
      <link rel="apple-touch-icon" href="/dist/favicon/apple-touch-icon.png">
      <link rel="icon" href="/dist/favicon/favicon.svg" type="image/svg+xml">
      <link rel="shortcut icon" href="/dist/favicon/favicon.ico" type="image/x-icon">
      <link rel="manifest" href="/dist/favicon/manifest.webmanifest" crossorigin="use-credentials">`
  }
}

export { Favicon };
