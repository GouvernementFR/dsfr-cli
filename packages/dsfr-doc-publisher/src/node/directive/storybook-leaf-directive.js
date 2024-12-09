import { Node } from '../node.js';

class StorybookLeafDirective extends Node {

  // TODO:
  //  - script externe pour le resize de l'iframe
  //  - apossibilité de multiple storybook (baser sur id de la story ?)
  //  - bug resize down
  //  - bouton communication avec iframe pour changer le theme exemple
  //  - changement theme iframe en fonction theme parent
  async render() {
    return `<div class="storybook-leaf"><iframe id="storybook" ${this.renderAttributes()}></iframe></div>
<script>  
const renderStorybook = () => {
  requestAnimationFrame(renderStorybook);
  const iframe = document.getElementById('storybook');
  if (!iframe) return;
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  if (!iframeDoc) return;
  // iframe.style.height = '100%';
const height = iframeDoc?.body?.scrollHeight ?? iframeDoc?.documentElement?.scrollHeight;
iframe.style.height = isNaN(height) || !height ?'100%' : height + 'px';

};
renderStorybook();
</script>`;
  }
}

StorybookLeafDirective.NAME = 'dsfr-doc-storybook';

export { StorybookLeafDirective };
