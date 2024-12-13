import { Renderable } from '../../core/renderable.js';

class Highlight extends Renderable {
  async render () {
    return `
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/highlight.min.js" integrity="sha512-6yoqbrcLAHDWAdQmiRlHG4+m0g/CT/V9AGyxabG8j7Jk8j3r3K6due7oqpiRMZqcYe9WM2gPcaNNxnl2ux+3tA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/languages/javascript.min.js" integrity="sha512-XrpvbK+zc0wErJG1VptH0H4w4zyiniHOBR35DJ1VISA+cqYxhksvqFwZk0M8lX9ylaIjTXoMYolOPb93zdrGpg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/languages/xml.min.js" integrity="sha512-dG+W2e5Wf51XUF9HqsX31z5+nTTuxe8wpOEC3/1gCJImJusP1FZS1PHxiH3NjBUQJ6oDpVRKKXH7+aCVd+wkDA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/languages/scss.min.js" integrity="sha512-fhGqLFbE7MvF94wQ72OFn5VsWhqnvxciu8Zq2omUg641h1LxrluzrmGBXEF0Bhlev3p5Am9kpLfunqGw5JaRtA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/languages/css.min.js" integrity="sha512-fpDUuCO8gpUPZ7TzS3mjJsopogeCbFf94kXHQNzOdEQXksHWOiOHaynatkhBRQraX1GMVtLlU5Z/8NWuK8TLLw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/languages/bash.min.js" integrity="sha512-4ea7XTSjSgnYA2UCmeriRmmIfJ5iXR562Y8faBB+y3BKcwftFMofy6ff0wX4A4UmR155PlFghb5np+WrAVIoaw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/languages/json.min.js" integrity="sha512-hWf27MxSv3ZoSOnIh0STq7QrN5YWaGxD53WCPl8GS7WboKLvz+x/FK6431QNwZ6vz6tigXSw1D1z9gz1WwoObg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/languages/yaml.min.js" integrity="sha512-10TmDDlpvsCOKvlpApa381uvcDbBL4WeJw0txuN8c786A6kMyS/Ts93o4XbtDtBnzXzdqtTbBb1xiDW5YP3x9w==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>
      hljs.highlightAll();
    </script>


`;
  }
}

export { Highlight };
