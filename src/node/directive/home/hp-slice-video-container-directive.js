import { Node } from '../../node.js';
class HpSliceVideoContainerDirective extends Node {
  constructor (data) {
    super(data);
  }

  structure (data) {
    const title = data.children[0];
    const categoryLabel = data.properties.category;
    const imgUrl = data.imgUrl;
    const imgDarkUrl = data.imgDarkUrl;
    const buttonLabel = data.properties.button;
    const vimeoUrl = data.properties.vimeo;
    const youtubeUrl = data.properties.youtube;
    const modalId = data.properties.modalId;

    let structureCategoryLabel = {};
    if (categoryLabel) structureCategoryLabel = {
      type: 'paragraph',
      classes: ['dsfr-doc-hp-slice-video__category'],
      children: [
        {
          type: 'text',
          value: categoryLabel
        }
      ]
    };

    const videoAttributes = {
      frameborder: '0',
      allowfullscreen: '',
    };

    if (vimeoUrl) {
      videoAttributes.title= 'Vimeo',
      videoAttributes.allow = 'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media',
      videoAttributes.src = 'https://player.vimeo.com/video/' + vimeoUrl.match(/\/([^\/]+)$/)[1];
    } else if (youtubeUrl) {
      videoAttributes.title= 'Youtube',
      videoAttributes.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
      videoAttributes.referrerpolicy = "strict-origin-when-cross-origin",
      videoAttributes.src = 'https://www.youtube.com/embed/' + youtubeUrl.match(/\/([^\/]+)$/)[1];
    }

    return super.structure({
      type: 'htmlContainer',
      tagName: 'div',
      classes: ['dsfr-doc-hp-slice-video', 'fr-background-contrast--info'],
      attributes: {
        'dsfr-doc-show-on-scroll': ''
      },
      children: [
        {
          type: 'htmlContainer',
          tagName: 'style',
          children: [
            {
              type: 'text',
              value: `
                @media (min-width: 48em) {
                  .dsfr-doc-hp-slice-video > .fr-container::before {
                    background-image: url('${data.imgBgUrl}');
                  }
                }

                [data-fr-theme='dark'] {
                  @media (min-width: 48em) {
                    .dsfr-doc-hp-slice-video > .fr-container::before {
                      background-image: url('${data.imgDarkBgUrl}');
                    }
                  }
                }
              `
            }
          ]
        },
        {
          type: 'htmlContainer',
          tagName: 'div',
          classes: ['fr-container'],
          children: [
            {
              type: 'htmlContainer',
              tagName: 'div',
              classes: ['fr-grid-row', 'fr-grid-row--gutters'],
              children: [
                {
                  type: 'htmlContainer',
                  tagName: 'div',
                  classes: ['dsfr-doc-hp-slice-video__content', 'fr-col-12', 'fr-col-md-5'],
                  children: [
                    structureCategoryLabel,
                    {
                      type: 'htmlContainer',
                      tagName: 'h2',
                      classes: ['dsfr-doc-hp-slice-video__title'],
                      children: title.children
                    },
                    {
                      type: 'htmlContainer',
                      tagName: 'button',
                      classes: ['dsfr-doc-hp-slice-video__btn', 'fr-btn', 'fr-btn--secondary'],
                      attributes: {
                        'data-fr-opened': 'false',
                        'aria-controls': modalId
                      },
                      children: [
                        {
                          type: 'text',
                          value: buttonLabel
                        }
                      ]
                    },
                  ]
                },
                {
                  type: 'htmlContainer',
                  tagName: 'div',
                  classes: ['dsfr-doc-hp-slice-video__img', 'fr-col-12', 'fr-col-md-6', 'fr-col-offset-md-1'],
                  attributes: {
                    'aria-controls': modalId,
                    'data-fr-opened': 'false',
                  },
                  children: [
                    {
                      type: 'image',
                      classes: ['dsfr-doc-hp-slice-video__img--light'],
                      attributes: {
                        src: imgUrl,
                        alt: ''
                      }
                    },
                    {
                      type: 'image',
                      classes: ['dsfr-doc-hp-slice-video__img--dark'],
                      attributes: {
                        src: imgDarkUrl,
                        alt: ''
                      }
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          type: 'htmlContainer',
          tagName: 'dialog',
          classes: ['fr-modal'],
          attributes: {
            id: modalId,
            'aria-labelledby': modalId + '-title',
            role: 'dialog'
          },
          children: [
            {
              type: 'htmlContainer',
              tagName: 'div',
              classes: ['fr-container', 'fr-container--fluid', 'fr-container-md'],
              children: [
                {
                  type: 'htmlContainer',
                  tagName: 'div',
                  classes: ['fr-grid-row', 'fr-grid-row--center'],
                  children: [
                    {
                      type: 'htmlContainer',
                      tagName: 'div',
                      classes: ['fr-col-12', 'fr-col-md-10', 'fr-col-lg-8'],
                      children: [
                        {
                          type: 'htmlContainer',
                          tagName: 'div',
                          classes: ['fr-modal__body'],
                          children: [
                            {
                              type: 'htmlContainer',
                              tagName: 'div',
                              classes: ['fr-modal__header'],
                              children: [
                                {
                                  type: 'htmlContainer',
                                  tagName: 'button',
                                  classes: ['fr-btn', 'fr-btn--close'],
                                  attributes: {
                                    type: 'button',
                                    'aria-controls': modalId,
                                    'title': data.fragments.button.close,
                                  },
                                  children: [
                                    {
                                      type: 'text',
                                      value: data.fragments.button.close
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              type: 'htmlContainer',
                              tagName: 'div',
                              classes: ['fr-modal__content'],
                              children: [
                                {
                                  type: 'htmlContainer',
                                  tagName: 'h3',
                                  classes: ['fr-modal__title'],
                                  attributes: {
                                    id: modalId + '-title'
                                  },
                                  children: [
                                    {
                                      type: 'text',
                                      value: title.children[0].value
                                    }
                                  ]
                                },
                                {
                                  type: 'htmlContainer',
                                  tagName: 'iframe',
                                  classes: ['fr-responsive-vid'],
                                  attributes: {
                                    ...videoAttributes
                                  }
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    });
  }
}

HpSliceVideoContainerDirective.NAME = 'hp-slice-video';

export { HpSliceVideoContainerDirective };
