import { Node } from '../../node.js';

class VideoLeafDirective extends Node {
  structure(data) {
    let videoAttributes = {};
    switch (data.properties.provider) {
      case 'youtube':
        videoAttributes = {
          rel: 0,
          controls: 1,
          autoplay: 0,
          mute: 0,
          loop: 0,
          loading: 1,
        };
        break;

      case 'vimeo':
        break;
    }

    data.attributes = {
      ...(data.attributes || {}),
      ...videoAttributes,
      'data-videoid': data.properties.videoId,
      width: data.properties.width || '100%',
      height: data.properties.height || '100%',
    };

    return super.structure(data);
  }

  constructor(data) {
    super(data, 'div');

    this.attributes.addClass('fr-responsive-vid');
    if (data.properties.provider)
      this.attributes.addClass(`${data.properties.provider}_player`);
  }
}

VideoLeafDirective.NAME = 'dsfr-doc-video';

export { VideoLeafDirective };
