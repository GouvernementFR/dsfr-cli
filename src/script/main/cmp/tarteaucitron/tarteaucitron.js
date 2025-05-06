/* eslint-disable */
var scripts = document.getElementsByTagName('script'),
    path = (document.currentScript || scripts[scripts.length - 1]).src.split(
        '?'
    )[0],
    tarteaucitronForceCDN =
        tarteaucitronForceCDN === undefined ? '' : tarteaucitronForceCDN,
    tarteaucitronUseMin =
        tarteaucitronUseMin === undefined ? '' : tarteaucitronUseMin,
    cdn =
        tarteaucitronForceCDN === ''
            ? path.split('/').slice(0, -1).join('/') + '/'
            : tarteaucitronForceCDN,
    alreadyLaunch = alreadyLaunch === undefined ? 0 : alreadyLaunch,
    tarteaucitronForceLanguage =
        tarteaucitronForceLanguage === undefined
            ? ''
            : tarteaucitronForceLanguage,
    tarteaucitronForceExpire =
        tarteaucitronForceExpire === undefined ? '' : tarteaucitronForceExpire,
    tarteaucitronCustomText =
        tarteaucitronCustomText === undefined ? '' : tarteaucitronCustomText,
    // tarteaucitronExpireInDay: true for day(s) value - false for hour(s) value
    tarteaucitronExpireInDay =
        tarteaucitronExpireInDay === undefined ||
        typeof tarteaucitronExpireInDay !== 'boolean'
            ? true
            : tarteaucitronExpireInDay,
    timeExpire = 31536000000,
    tarteaucitronProLoadServices,
    tarteaucitronNoAdBlocker = false;

export var tarteaucitron = {
    version: 20230203,
    cdn: cdn,
    user: {},
    lang: {},
    services: {},
    added: [],
    idprocessed: [],
    state: {},
    launch: [],
    parameters: {},
    isAjax: false,
    reloadThePage: false,
    events: {
        init: function () {},
        load: function () {},
    },
    init: function (params) {
        'use strict';
        var origOpen;

        tarteaucitron.parameters = params;
        if (alreadyLaunch === 0) {
            alreadyLaunch = 1;
            if (window.addEventListener) {
                window.addEventListener(
                    'load',
                    function () {
                        tarteaucitron.initEvents.loadEvent(false);
                    },
                    false
                );
                window.addEventListener(
                    'scroll',
                    function () {
                        tarteaucitron.initEvents.scrollEvent();
                    },
                    false
                );

                window.addEventListener(
                    'keydown',
                    function (evt) {
                        tarteaucitron.initEvents.keydownEvent(false, evt);
                    },
                    false
                );
                window.addEventListener(
                    'hashchange',
                    function () {
                        tarteaucitron.initEvents.hashchangeEvent();
                    },
                    false
                );
                window.addEventListener(
                    'resize',
                    function () {
                        tarteaucitron.initEvents.resizeEvent();
                    },
                    false
                );
            } else {
                window.attachEvent('onload', function () {
                    tarteaucitron.initEvents.loadEvent(true);
                });
                window.attachEvent('onscroll', function () {
                    tarteaucitron.initEvents.scrollEvent();
                });
                window.attachEvent('onkeydown', function (evt) {
                    tarteaucitron.initEvents.keydownEvent(true, evt);
                });
                window.attachEvent('onhashchange', function () {
                    tarteaucitron.initEvents.hashchangeEvent();
                });
                window.attachEvent('onresize', function () {
                    tarteaucitron.initEvents.resizeEvent();
                });
            }

            if (typeof XMLHttpRequest !== 'undefined') {
                origOpen = XMLHttpRequest.prototype.open;
                XMLHttpRequest.prototype.open = function () {
                    if (window.addEventListener) {
                        this.addEventListener(
                            'load',
                            function () {
                                if (
                                    typeof tarteaucitronProLoadServices ===
                                    'function'
                                ) {
                                    tarteaucitronProLoadServices();
                                }
                            },
                            false
                        );
                    } else if (typeof this.attachEvent !== 'undefined') {
                        this.attachEvent('onload', function () {
                            if (
                                typeof tarteaucitronProLoadServices ===
                                'function'
                            ) {
                                tarteaucitronProLoadServices();
                            }
                        });
                    } else {
                        if (
                            typeof tarteaucitronProLoadServices === 'function'
                        ) {
                            setTimeout(tarteaucitronProLoadServices, 1000);
                        }
                    }

                    try {
                        origOpen.apply(this, arguments);
                    } catch (err) {}
                };
            }
        }

        if (tarteaucitron.events.init) {
            tarteaucitron.events.init();
        }
    },
    initEvents: {
        loadEvent: function (isOldBrowser) {
            tarteaucitron.load();
            tarteaucitron.fallback(
                ['tarteaucitronOpenPanel'],
                function (elem) {
                    if (isOldBrowser) {
                        elem.attachEvent('onclick', function (event) {
                            tarteaucitron.userInterface.openPanel();
                            event.preventDefault();
                        });
                    } else {
                        elem.addEventListener(
                            'click',
                            function (event) {
                                tarteaucitron.userInterface.openPanel();
                                event.preventDefault();
                            },
                            false
                        );
                    }
                },
                true
            );
        },
        keydownEvent: function (isOldBrowser, evt) {
            if (
                document.querySelector('.tarteaucitron-modal-open') &&
                evt.code === 'Escape'
            ) {
                tarteaucitron.userInterface.closePanel();
            }

            if (isOldBrowser) {
                if (
                    evt.keyCode === 9 &&
                    focusableEls.indexOf(evt.target) >= 0
                ) {
                    if (evt.shiftKey) {
                        /* shift + tab */ if (
                            document.activeElement === firstFocusableEl
                        ) {
                            lastFocusableEl.focus();
                            evt.preventDefault();
                        }
                    } /* tab */ else {
                        if (document.activeElement === lastFocusableEl) {
                            firstFocusableEl.focus();
                            evt.preventDefault();
                        }
                    }
                }
            }
        },
        hashchangeEvent: function () {
            if (
                document.location.hash === tarteaucitron.hashtag &&
                tarteaucitron.hashtag !== ''
            ) {
                tarteaucitron.userInterface.openPanel();
            }
        },
        resizeEvent: function () {
            var tacElem = document.getElementById('tarteaucitron');
            var tacCookieContainer = document.getElementById(
                'tarteaucitronCookiesListContainer'
            );

            if (tacElem && tacElem.style.display === 'block') {
                tarteaucitron.userInterface.jsSizing('main');
            }

            if (
                tacCookieContainer &&
                tacCookieContainer.style.display === 'block'
            ) {
                tarteaucitron.userInterface.jsSizing('cookie');
            }
        },
        scrollEvent: function () {
            var scrollPos =
                window.pageYOffset || document.documentElement.scrollTop;
            var heightPosition;
            var tacPercentage = document.getElementById(
                'tarteaucitronPercentage'
            );
            var tacAlertBig = document.getElementById('tarteaucitronAlertBig');

            if (tacAlertBig && !tarteaucitron.highPrivacy) {
                if (tacAlertBig.style.display === 'block') {
                    heightPosition = tacAlertBig.offsetHeight + 'px';

                    if (scrollPos > screen.height * 2) {
                        tarteaucitron.userInterface.respondAll(true);
                    } else if (scrollPos > screen.height / 2) {
                        document.getElementById(
                            'tarteaucitronDisclaimerAlert'
                        ).innerHTML =
                            '<strong>' +
                            tarteaucitron.lang.alertBigScroll +
                            '</strong> ' +
                            tarteaucitron.lang.alertBig;
                    }

                    if (tacPercentage) {
                        if (tarteaucitron.orientation === 'top') {
                            tacPercentage.style.top = heightPosition;
                        } else {
                            tacPercentage.style.bottom = heightPosition;
                        }
                        tacPercentage.style.width =
                            (100 / (screen.height * 2)) * scrollPos + '%';
                    }
                }
            }
        },
    },
    load: function () {
        'use strict';
        var cdn = tarteaucitron.cdn,
            language = tarteaucitron.getLanguage(),
            useMinifiedJS =
                cdn.indexOf('cdn.jsdelivr.net') >= 0 ||
                path.indexOf('.min.') >= 0 ||
                tarteaucitronUseMin !== '',
            pathToLang =
                cdn +
                'lang/tarteaucitron.' +
                language +
                (useMinifiedJS ? '.min' : '') +
                '.js',
            pathToServices =
                cdn +
                'tarteaucitron.services' +
                (useMinifiedJS ? '.min' : '') +
                '.js',
            linkElement = document.createElement('link'),
            defaults = {
                adblocker: false,
                hashtag: '#tarteaucitron',
                cookieName: 'tarteaucitron',
                highPrivacy: true,
                orientation: 'middle',
                bodyPosition: 'bottom',
                removeCredit: false,
                showAlertSmall: false,
                showDetailsOnClick: true,
                showIcon: true,
                iconPosition: 'BottomRight',
                cookieslist: false,
                handleBrowserDNTRequest: false,
                DenyAllCta: true,
                AcceptAllCta: true,
                moreInfoLink: true,
                privacyUrl: '',
                useExternalCss: false,
                useExternalJs: false,
                mandatory: true,
                mandatoryCta: true,
                closePopup: false,
                groupServices: false,
                serviceDefaultState: 'wait',
            },
            params = tarteaucitron.parameters;

        // Don't show the middle bar if we are on the privacy policy or more page
        if (
            ((tarteaucitron.parameters.readmoreLink !== undefined &&
                window.location.href ==
                    tarteaucitron.parameters.readmoreLink) ||
                window.location.href == tarteaucitron.parameters.privacyUrl) &&
            tarteaucitron.parameters.orientation == 'middle'
        ) {
            tarteaucitron.parameters.orientation = 'bottom';
        }

        // Step -1
        if (typeof tarteaucitronCustomPremium !== 'undefined') {
            tarteaucitronCustomPremium();
        }

        // Step 0: get params
        if (params !== undefined) {
            for (var k in defaults) {
                if (!tarteaucitron.parameters.hasOwnProperty(k)) {
                    tarteaucitron.parameters[k] = defaults[k];
                }
            }
        }

        // global
        tarteaucitron.orientation = tarteaucitron.parameters.orientation;
        tarteaucitron.hashtag = tarteaucitron.parameters.hashtag;
        tarteaucitron.highPrivacy = tarteaucitron.parameters.highPrivacy;
        tarteaucitron.handleBrowserDNTRequest =
            tarteaucitron.parameters.handleBrowserDNTRequest;
        tarteaucitron.customCloserId = tarteaucitron.parameters.customCloserId;

        // Step 1: load css
        if (!tarteaucitron.parameters.useExternalCss) {
            linkElement.rel = 'stylesheet';
            linkElement.type = 'text/css';
            linkElement.href =
                cdn +
                'css/tarteaucitron' +
                (useMinifiedJS ? '.min' : '') +
                '.css';
            document.getElementsByTagName('head')[0].appendChild(linkElement);
        }
        // Step 2: load language and services
        tarteaucitron.addInternalScript(pathToLang, '', function () {
            if (tarteaucitronCustomText !== '') {
                tarteaucitron.lang = tarteaucitron.AddOrUpdate(
                    tarteaucitron.lang,
                    tarteaucitronCustomText
                );
            }
            tarteaucitron.addInternalScript(pathToServices, '', function () {
                // disable the expand option if services grouped by category
                if (tarteaucitron.parameters.groupServices == true) {
                    tarteaucitron.parameters.showDetailsOnClick = true;
                }

                var body = document.body,
                    div = document.createElement('div'),
                    html = '',
                    index,
                    orientation = 'Top',
                    modalAttrs = '',
                    cat = [
                        'ads',
                        'analytic',
                        'api',
                        'comment',
                        'social',
                        'support',
                        'video',
                        'other',
                    ],
                    i;

                cat = cat.sort(function (a, b) {
                    if (
                        tarteaucitron.lang[a].title >
                        tarteaucitron.lang[b].title
                    ) {
                        return 1;
                    }
                    if (
                        tarteaucitron.lang[a].title <
                        tarteaucitron.lang[b].title
                    ) {
                        return -1;
                    }
                    return 0;
                });

                // Step 3: prepare the html
                html += `
                    <div role="heading" aria-level="1" id="tac_title" class="tac_visually-hidden fr-hidden">
                        ${tarteaucitron.lang.title}
                    </div>
                    <div id="tarteaucitronPremium"></div>
                    <dialog id="consent-modal" class="fr-modal" role="dialog" aria-labelledby="fr-consent-modal-title">
                        <div id="tarteaucitronBack" aria-hidden="true" aria-controls="consent-modal"></div>
                        <div class="fr-container fr-container--fluid fr-container-md">
                            <div class="fr-grid-row fr-grid-row--center">
                                <div class="fr-col-12 fr-col-md-10 fr-col-lg-8">
                                    <div class="fr-modal__body">
                                        <div class="fr-modal__header">
                                            <button type="button" id="tarteaucitronClosePanel" class="fr-btn--close fr-btn" aria-controls="consent-modal" title="${
                                                tarteaucitron.lang.close +
                                                (tarteaucitron.reloadThePage
                                                    ? ' (' +
                                                      tarteaucitron.lang
                                                          .reload +
                                                      ')'
                                                    : '')
                                            }">
                                                ${tarteaucitron.lang.close}
                                            </button>
                                        </div>
                                        <div class="fr-modal__content">
                                            <h3 class="fr-modal__title fr-h3" id="fr-consent-modal-title">
                                                ${tarteaucitron.lang.title}
                                            </h3>
                                            <div class="fr-consent-manager">
                                                <div class="fr-consent-service fr-consent-manager__header">
                                                    <fieldset class="fr-fieldset fr-fieldset--inline">
                                                        <legend id="finality-legend" class="fr-consent-service__title">
                                                            ${
                                                                tarteaucitron
                                                                    .lang
                                                                    .disclaimer
                                                                    ? `<p class="fr-mb-0">${tarteaucitron.lang.disclaimer}</p>`
                                                                    : ''
                                                            }
                                                            ${
                                                                tarteaucitron
                                                                    .parameters
                                                                    .privacyUrl !==
                                                                ''
                                                                    ? `<a class="fr-link" id="tarteaucitronPrivacyUrlDialog" href="${tarteaucitron.parameters.privacyUrl}" title="${tarteaucitron.lang.privacyUrl} (${tarteaucitron.lang.newWindow})">${tarteaucitron.lang.privacyUrl}</a>`
                                                                    : ''
                                                            }
                                                            ${
                                                                tarteaucitron
                                                                    .lang
                                                                    .all !== ''
                                                                    ? `<p class="fr-mt-3w fr-mb-0">${tarteaucitron.lang.all}</p>`
                                                                    : ''
                                                            }
                                                        </legend>
                                                        <div class="fr-consent-service__radios">
                                                            <div class="fr-radio-group">
                                                                <input type="radio" id="tarteaucitronAllAllowed" name="consent-all" class="tarteaucitronAllow">
                                                                <label class="fr-label" for="tarteaucitronAllAllowed">
                                                                    ${
                                                                        tarteaucitron
                                                                            .lang
                                                                            .allowAll
                                                                    }
                                                                </label>
                                                            </div>
                                                            <div class="fr-radio-group">
                                                                <input type="radio" id="tarteaucitronAllDenied" name="consent-all" class="tarteaucitronDeny">
                                                                <label class="fr-label" for="tarteaucitronAllDenied">
                                                                    ${
                                                                        tarteaucitron
                                                                            .lang
                                                                            .denyAll
                                                                    }
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                </div>`;
                if (tarteaucitron.parameters.mandatory == true) {
                    html += `
                                                <div class="fr-consent-service">
                                                    <fieldset aria-labelledby="tarteaucitronServicesTitle_mandatory finality-mandatory-desc" role="group" class="fr-fieldset fr-fieldset--inline">
                                                        <legend id="tarteaucitronServicesTitle_mandatory" class="fr-consent-service__title">
                                                            ${tarteaucitron.lang.mandatoryTitle}
                                                        </legend>`;
                    if (tarteaucitron.parameters.mandatoryCta == true) {
                        html += `<div class="fr-consent-service__radios" id="tarteaucitronServices_mandatory">
                                                            <div class="fr-radio-group">
                                                                <input disabled checked type="radio" class="tarteaucitronAllow" id="consent-finality-mandatory-accept" name="consent-finality-mandatory">
                                                                <label class="fr-label" for="consent-finality-mandatory-accept">
                                                                    ${tarteaucitron.lang.allow}
                                                                </label>
                                                            </div>
                                                            <div class="fr-radio-group">
                                                                <input disabled type="radio" class="tarteaucitronDeny" id="consent-finality-mandatory-refuse" name="consent-finality-mandatory">
                                                                <label class="fr-label" for="consent-finality-mandatory-refuse">
                                                                    ${tarteaucitron.lang.deny}
                                                                </label>
                                                            </div>
                                                        </div>`;
                    }
                    html += `
                                                        <p id="finality-mandatory-desc" class="fr-consent-service__desc">${tarteaucitron.lang.mandatoryText}</p>
                                                    </fieldset>
                                                </div>`;
                }
                for (i = 0; i < cat.length; i += 1) {
                    html += `
                                                <div class="fr-consent-service tarteaucitronHidden fr-hidden" id="tarteaucitronServicesTitle_${
                                                    cat[i]
                                                }">
                                                    <fieldset aria-labelledby="finality-${
                                                        cat[i]
                                                    }-legend finality-${
                                                        cat[i]
                                                    }-desc" role="group" class="fr-fieldset fr-fieldset--inline">
                                                        <legend id="finality-${
                                                            cat[i]
                                                        }-legend" class="fr-consent-service__title fr-h4 fr-pb-0">
                                                            ${
                                                                tarteaucitron
                                                                    .parameters
                                                                    .showDetailsOnClick
                                                                    ? '<button aria-describedby="finality-' +
                                                                      cat[i] +
                                                                      '-decription" aria-controls="tarteaucitronDetails' +
                                                                      cat[i] +
                                                                      '" type="button" class="fr-btn catToggleBtn" aria-expanded="false" data-cat="tarteaucitronDetails' +
                                                                      cat[i] +
                                                                      '">' +
                                                                      tarteaucitron
                                                                          .lang[
                                                                          cat[i]
                                                                      ].title +
                                                                      '</button>'
                                                                    : tarteaucitron
                                                                          .lang[
                                                                          cat[i]
                                                                      ].title
                                                            }
                                                            ${
                                                                !tarteaucitron
                                                                    .parameters
                                                                    .showDetailsOnClick &&
                                                                tarteaucitron
                                                                    .lang[
                                                                    cat[i]
                                                                ].details
                                                                    ? `
                                                                <button class="fr-btn--tooltip fr-btn" aria-describedby="tooltip-modal-${
                                                                    cat[i]
                                                                }" id="button-tooltip-${
                                                                    cat[i]
                                                                }">
                                                                    ${
                                                                        tarteaucitron
                                                                            .lang
                                                                            .cookieDetail
                                                                    }
                                                                </button>
                                                                <span class="fr-tooltip fr-placement fr-text--regular" id="tooltip-modal-${
                                                                    cat[i]
                                                                }" role="tooltip">
                                                                    ${
                                                                        tarteaucitron
                                                                            .lang[
                                                                            cat[
                                                                                i
                                                                            ]
                                                                        ]
                                                                            .details
                                                                    }
                                                                </span>`
                                                                    : ''
                                                            }
                                                            </legend>`;
                    if (tarteaucitron.parameters.showDetailsOnClick) {
                        html += `
                                                        <div id="tarteaucitronDetails${
                                                            cat[i]
                                                        }" class="tarteaucitronDetails fr-collapse">
                                                            <p id="finality-${
                                                                cat[i]
                                                            }-desc" class="fr-consent-service__desc fr-mt-2w">
                                                                ${
                                                                    tarteaucitron
                                                                        .lang[
                                                                        cat[i]
                                                                    ].details
                                                                }
                                                            </p>
                                                        </div>
                                                        <div class="fr-consent-service__collapse fr-mt-1w">
                                                            <button class="fr-consent-service__collapse-btn" aria-expanded="false" aria-describedby="finality-${
                                                                cat[i]
                                                            }-legend" aria-controls="finality-${
                                                                cat[i]
                                                            }-collapse">${tarteaucitron.lang.cookieDetail}</button>
                                                        </div>`;
                    }
                    html += `
                                                        <div class="fr-mt-0 fr-consent-services${
                                                            tarteaucitron
                                                                .parameters
                                                                .showDetailsOnClick
                                                                ? ' fr-collapse'
                                                                : ''
                                                        }" id="finality-${
                                                            cat[i]
                                                        }-collapse">
                                                            <div id="tarteaucitronServices_${
                                                                cat[i]
                                                            }"></div>
                                                        </div>
                                                    </fieldset>
                                                </div>`;
                }
                html += `
                                                <div id="tarteaucitronNoServicesTitle" class="tarteaucitronLine">
                                                ${tarteaucitron.lang.noServices}
                                                </div>
                                            </div>
                                        </div>`;

                html += `
                                       <div class="tarteaucitronHidden tarteaucitron-spacer-20" id="tarteaucitronScrollbarChild"></div>`;
                if (tarteaucitron.parameters.removeCredit === false) {
                    html += `<a class="tarteaucitronSelfLink" href="https://tarteaucitron.io/" rel="nofollow noreferrer noopener" target="_blank" title="tarteaucitron '${tarteaucitron.lang.newWindow}"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAAeCAYAAAAWwoEYAAADl0lEQVRoge1Y0W3bQAx9CjKARlC+9GVUmqDJBHEmiDyB6wkcTxBngtgTxJ0gzgQW4C/9aYOmE6g4lTQo+k6y3Rb94QOERNQd+cjj8XiGwWAwGAwGg8FgMBgMBoPB8F8RNRXe+whEKe7c36ZCAeCRxC9Rig2PUd8kPgAsoxSfQ3YAzAA8D/HwYYCb05kBKKO0teFkmbC1jlKsAnq/Abjn+QBqAIsoRS30ttwG/HNz1wH/XIxWTicLdvtW7xTAGEAMtP685CNsBTe2d/BLydfXAG57SEnMAST0zgYZSUCPk02bCvkJduIzuJzDLfPolbY+tLKmar+/8+IRePy4qdpE03qHuH8fipFb4N2+XdA3AJ/0vaQxt7s9FvkIS2XvtqnwM0rxpOQfbnE5G2LhTCmUO2fHIngOmcv+KG3HafDchB6ntwjYqenR2PqC7sOZ3E7FXHB0vqxoFyUyLh7OEH7LOGouvhhN3eIBeKXv0n5MsufdHqXcwYR5U2EbpV35lSspVPJmQj4TcgRK7jTg5IzmPUhhwM5a2WHUFCx+NgiDucmgh7idikLovHFlL0pxQ9xzX+IIP9Y6FrJsqhjlQpZRAkFVDCjZfcCHt6bqJDmuh5ylCWx0RVnk3oumaknqTH5sqrY0fBWyULaHUIgAgxb46MxV3DbieAhxOxUxjSuljig9lMQ/Bcfoi9BTEv9aLORSndVxYOH525sUDC6u2gWxcNzBNRxPanyh3ktKinOgy3WoxPbtUM0t6RkbQnzBnFPgi9GCOEubY9UffIryz9iKRe8s/FUfEWosJJGxagp85bpUO3VywQ46lOtAWfNxKwa4JXQ+628+bpxYGXXMzp5rXH401VEyXwIdowXFaKWSMFHvMTVmGnc+P3oXV2QOiBCfgex8QtcQCbcQE/H+eoHzrkFo1KM7zVO4jVVj5s6lRiWF7zyXyfRMc97J3tzj87mYqZ7E2YjzUct9GUi4tjHLR8dVkBLjQcuHFleWvQfRNEhFR7uX7pkctOwvZXsft7sAtyldEUIN2UTeLxnEfxKYswzdi88BdbZ8hifUoSMftQvP+muRwN6+Q3DeqqRExP9QmTtcheiHh0Ot1x2i2km1bP9pbufw5zZdyWsOrh7vQae5OZWbsMv30pi7cd/CKj3coPEVaCP4Zhx4eQWhOZ1Y9MTXGyP8/iGjEyfa1T4fO/4Lea9vBoPBYDAYDAaDwWAwGAwGwz8GgF8siXCCbrSRhgAAAABJRU5ErkJggg==" alt="tarteaucitron.io" /></a>`;
                }
                html += `
                                    </div>
                                </div>
                            </div>
                        </div>
                    </dialog>`;

                if (tarteaucitron.parameters.orientation === 'bottom') {
                    orientation = 'Bottom';
                }

                if (
                    tarteaucitron.parameters.orientation === 'middle' ||
                    tarteaucitron.parameters.orientation === 'popup'
                ) {
                    modalAttrs =
                        'role="dialog" aria-modal="true" aria-labelledby="tac_title"';
                }

                // That condition does not respect the DSFR, as 3 buttons should always be visible.
                if (
                    tarteaucitron.parameters.highPrivacy &&
                    !tarteaucitron.parameters.AcceptAllCta
                ) {
                    html += `<div tabindex="-1" id="tarteaucitronAlertBig" class="fr-consent-banner" ${modalAttrs}>`;
                    html += `<h3 class="fr-h6">${tarteaucitron.lang.alertBigPrivacy.title}</h3>`;
                    html += `<div id="tarteaucitronDisclaimerAlert" class="fr-consent-banner__content"><p class="fr-text--sm">${tarteaucitron.lang.alertBigPrivacy.content}</p></div>`;
                    html += `<ul class="fr-consent-banner__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-sm">`;
                    html += `<li><button class="fr-btn fr-btn--secondary" data-fr-opened="false" aria-controls="consent-modal" aria-label="${tarteaucitron.lang.personalize} ${tarteaucitron.lang.modalWindow}" title="${tarteaucitron.lang.personalize} ${tarteaucitron.lang.modalWindow}" type="button" id="tarteaucitronPersonalize">${tarteaucitron.lang.personalize}</button></li>`;
                    html += '</ul></div>';
                } else {
                    html += `<div tabindex="-1" id="tarteaucitronAlertBig" class="fr-consent-banner" ${modalAttrs}>`;
                    html += `<h3 class="fr-h6">${tarteaucitron.lang.alertBigPrivacy.title}</h3>`;
                    html += `<div id="tarteaucitronDisclaimerAlert" class="fr-consent-banner__content"><p class="fr-text--sm">${
                        tarteaucitron.parameters.highPrivacy
                            ? tarteaucitron.lang.alertBigPrivacy.content
                            : tarteaucitron.lang.alertBigClick +
                              tarteaucitron.lang.alertBig
                    }</p></div>`;
                    html += `<ul class="fr-consent-banner__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-sm">`;
                    html += `<li><button class="fr-btn tarteaucitronCTAButton tarteaucitronAllow" type="button" id="tarteaucitronPersonalize2" aria-label="${tarteaucitron.lang.acceptAll}" title="${tarteaucitron.lang.acceptAll}">${tarteaucitron.lang.acceptAll}</button></li>`;
                    if (tarteaucitron.parameters.DenyAllCta) {
                        const denyText = tarteaucitron.reloadThePage
                            ? `${tarteaucitron.lang.denyAll} (${tarteaucitron.lang.reload})`
                            : tarteaucitron.lang.denyAll;
                        html += `<li><button class="fr-btn tarteaucitronCTAButton tarteaucitronDeny" type="button" id="tarteaucitronAllDenied2" aria-label="${denyText}" title="${denyText}">${tarteaucitron.lang.denyAll}</button></li>`;
                    }

                    html += `<li><button class="fr-btn fr-btn--secondary" aria-label="${tarteaucitron.lang.personalize} ${tarteaucitron.lang.modalWindow}" data-link="#tarteaucitron" aria-controls="consent-modal" type="button" id="tarteaucitronCloseAlert" data-fr-opened="false" title="${tarteaucitron.lang.personalize} ${tarteaucitron.lang.modalWindow}">
                            ${tarteaucitron.lang.personalize}
                        </button></li>`;
                    html += '</ul></div>';
                    html += '<div id="tarteaucitronPercentage"></div>';
                }

                if (tarteaucitron.parameters.showIcon === true) {
                    html +=
                        '<div id="tarteaucitronIcon" class="tarteaucitronIcon' +
                        tarteaucitron.parameters.iconPosition +
                        '" style="display: block">';
                    html +=
                        '   <button type="button" id="tarteaucitronManager" aria-label="' +
                        tarteaucitron.lang.icon +
                        ' ' +
                        tarteaucitron.lang.modalWindow +
                        '" title="' +
                        tarteaucitron.lang.icon +
                        ' ' +
                        tarteaucitron.lang.modalWindow +
                        '">';
                    html +=
                        '       <img src="' +
                        (tarteaucitron.parameters.iconSrc
                            ? tarteaucitron.parameters.iconSrc
                            : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAGA0lEQVRoge1a207bWBRdBtJwLYZhKDMVmlSK1LxNkPo+ZH6g8B6p5AuALwC+APoFoVLeoT8whPeRSt+CZKmZVu3AiIsRlEtCktGyjy8xzuXYhvahS0JJHJ/4rLP3XnuffcAPfGdQ7mM6jRLSAF4BxqsbewB2lRS2o35mpEQaJcwCyANIdLi1DGBNSWEzqmdHRqRRwjqAJclhtExOSUEP+/xIiDRKhhUWfL7ShTtBuJnqcw+/z4Ql0xNmMEwSSz4kuNIzSgpjSsqYJP/GeE185wYJroedRyiLNEpGLLzzrHSuk+83SgbxvOcyyRaDziWsRVZkSRDinpzPbwVGWIucuohsKynMS47fAQyls/BMSRmKJo3AFhG5wm2N1wF+Zs3zebbFfR0RxrXcJHQlgH+LMW616pR/WiIMEXfW3mtzXyeEGWsjKot8c4TOI98L+iKaR5PS6IUk88RLAO9F8UjrbYoYMOosNavpfmODIiwRXRR/G3ohaWVo1RU/c30jV8ab2mV8qVGzHWBOLyTLZiWs5Rolg/C3ySOi0tXP/k4aEwOwSBKPJs7Rp16ABJTe+p1xVX0It/owqqdDEMRoqd3RFxqDPh20Ig6VEPVC0i5RSCD+6wl6HlW7GksSlUMV11/GrUs5NasFLusDE9ELSVphXemtJwaT/8JyIRvxNNCfBmIiNdR04LII3DSrbe0yjqvyJF/ppptqVlt+MCLCEh/oOkPPP6N38Mb5cnQBGFsEqmXg5j3QMwoMzwGnr4HYbybBq13gZAOom/FO63zdf2qQArCsZrUN2TlJy69eSDKYV+6Q4MpP75ivHzPA53ngaBW4eGuSOt0A/lsGPmXMz0+3TFJcTfFbPfFbfnwlhON+iQhlWmA82CQ4ocQ7c6KcfL3DHuls0yT6Sx4YnLXJDCQOIRRv5yGIJBgP8Sdisj2qubpc5UGJmo+W49ifVmzL8HcpGhQPvZCUKiCliIhEN0tr2OCqHuSA8gwQ/92MkU7gxEmeVqGrTTgpxPXbUrtGWYus0I9thRIraagRQUIDf7Qn4yZhKRiFQIyhfMfUr3yblokVWSJ6k8xSnc7eNN/RjowfCYiFoDUFer1S3gW6JiJ8Nt30EMbEhU+vzSIztuRYjRLsR8IHLjlf7HZ+MrWWEXxNmbvapt4jGSqZRYSkGUetSNTPzHsui5YMQ2ajJUNks6mw4wT54Ok2ShnzzIPCUGshzawCRKy5FqvrTZe0RWzQGvw79m67XZjKmxJrLsICjtZa55gxXy+6F4sYsEtxTqhXdRTLC8ulSDaWoCLsolfN+8YUhOsJV709H7Cudr0LlVEtzqBcN+shEyThdR941OnAbF8pirKJqXyupTRTtQSReiVmXW1j7oBErB0d9xM2WEd5J9ZKYtuR4WKwwBSoORbpGrJ5ZI9lt71irJmGX1px0JYE26uNErawr2zfIcP4OHEKXm66PA3wjpCNEfpJunI4muifPjKvsFCkGjExTq63yxMJsZNMYF/J4HmDC5A3Yq36jy0ClePHVhwuu/b1HSFlEfHD5ZtD1bEK44Qu1mWys6tbWmZyPWckzlPTGiRw/XHCuk+q4Rek+mVrVL/UppwrdDEGNV2kpyuhccgc5Oxm9vWnn+19vJrVpLor0kTUrGacMplb1CfOFyTD4o9uNrHqr2Z+ZMSp1c2XcVSORnh9Q81q3k599ETgkNnjg0nGzi10K7rX+bZpHbrblPcY5A4Zxk2xcjzCvTpd9027Aa0QtouyyrKFRR6D/04DwkFGvHPXM3Qda/Jb4nPgI7hQLVM1q5HIBt2MzQNa57Z1DiiLAGa5Mi+O4Sz3Mpp6laPHO6InII3ITnX1QtI+EOX+m9ZxleOZ/j9PiuKoLi3aqXPuEoSye/Vhkm+LalbLtHhMS0R6zu7aZ3vP2jOjL7QVv4McxhcDnZIelAQibGIbULOapf3PuE1Vs9qeaOTdkVKr00gCQiw4NlBzDvf1Lxx+uP5r3Dgv5KQZRzWn+GRwz8jmDS8itUg7iB6vLuJCF5Uty4A9mVKkFR6MiJDachST/oHvHgD+B4SoUIitpF05AAAAAElFTkSuQmCC') +
                        '" alt="' +
                        tarteaucitron.lang.icon +
                        ' ' +
                        tarteaucitron.lang.modalWindow +
                        '" title="' +
                        tarteaucitron.lang.icon +
                        ' ' +
                        tarteaucitron.lang.modalWindow +
                        '">';
                    html += '   </button>';
                    html += '</div>';
                }

                if (tarteaucitron.parameters.showAlertSmall === true) {
                    html +=
                        '<div id="tarteaucitronAlertSmall" class="tarteaucitronAlertSmall' +
                        orientation +
                        '">';
                    html +=
                        '   <button type="button" id="tarteaucitronManager" aria-label="' +
                        tarteaucitron.lang.alertSmall +
                        ' ' +
                        tarteaucitron.lang.modalWindow +
                        '" title="' +
                        tarteaucitron.lang.alertSmall +
                        ' ' +
                        tarteaucitron.lang.modalWindow +
                        '">';
                    html += '       ' + tarteaucitron.lang.alertSmall;
                    html += '       <span id="tarteaucitronDot">';
                    html +=
                        '           <span id="tarteaucitronDotGreen"></span>';
                    html +=
                        '           <span id="tarteaucitronDotYellow"></span>';
                    html += '           <span id="tarteaucitronDotRed"></span>';
                    html += '       </span>';
                    if (tarteaucitron.parameters.cookieslist === true) {
                        html += '   </button><!-- @whitespace';
                        html +=
                            '   --><button type="button" id="tarteaucitronCookiesNumber" aria-expanded="false" aria-controls="tarteaucitronCookiesListContainer">0</button>';
                        html +=
                            '   <div id="tarteaucitronCookiesListContainer">';
                        if (tarteaucitron.reloadThePage) {
                            html +=
                                '       <button type="button" id="tarteaucitronClosePanelCookie" aria-label="' +
                                tarteaucitron.lang.close +
                                ' (' +
                                tarteaucitron.lang.reload +
                                ')" title="' +
                                tarteaucitron.lang.close +
                                ' (' +
                                tarteaucitron.lang.reload +
                                ')">';
                        } else {
                            html +=
                                '       <button type="button" id="tarteaucitronClosePanelCookie">';
                        }
                        html += '           ' + tarteaucitron.lang.close;
                        html += '       </button>';
                        html +=
                            '       <div class="tarteaucitronCookiesListMain" id="tarteaucitronCookiesTitle">';
                        html +=
                            '            <span class="tarteaucitronH2" role="heading" aria-level="2" id="tarteaucitronCookiesNumberBis">0 cookie</span>';
                        html += '       </div>';
                        html +=
                            '       <div id="tarteaucitronCookiesList"></div>';
                        html += '    </div>';
                    } else {
                        html += '   </div>';
                    }
                    html += '</div>';
                }

                tarteaucitron.addInternalScript(
                    tarteaucitron.cdn +
                        'advertising' +
                        (useMinifiedJS ? '.min' : '') +
                        '.js',
                    '',
                    function () {
                        if (
                            tarteaucitronNoAdBlocker === true ||
                            tarteaucitron.parameters.adblocker === false
                        ) {
                            // create a wrapper container at the same level than tarteaucitron so we can add an aria-hidden when tarteaucitron is opened
                            /*var wrapper = document.createElement('div');
                        wrapper.id = "tarteaucitronContentWrapper";

                        while (document.body.firstChild)
                        {
                            wrapper.appendChild(document.body.firstChild);
                        }

                        // Append the wrapper to the body
                        document.body.appendChild(wrapper);*/

                            div.id = 'tarteaucitronRoot';
                            if (
                                tarteaucitron.parameters.bodyPosition === 'top'
                            ) {
                                // Prepend tarteaucitron: #tarteaucitronRoot first-child of the body for better accessibility
                                var bodyFirstChild = body.firstChild;
                                body.insertBefore(div, bodyFirstChild);
                            } else {
                                // Append tarteaucitron: #tarteaucitronRoot last-child of the body
                                body.appendChild(div, body);
                            }

                            div.setAttribute('data-nosnippet', 'true');
                            div.setAttribute('lang', language);
                            div.setAttribute('role', 'region');
                            div.setAttribute('aria-labelledby', 'tac_title');

                            div.innerHTML = html;

                            //ie compatibility
                            var tacRootAvailableEvent;
                            if (typeof Event === 'function') {
                                tacRootAvailableEvent = new Event(
                                    'tac.root_available'
                                );
                            } else if (
                                typeof document.createEvent === 'function'
                            ) {
                                tacRootAvailableEvent =
                                    document.createEvent('Event');
                                tacRootAvailableEvent.initEvent(
                                    'tac.root_available',
                                    true,
                                    true
                                );
                            }
                            //end ie compatibility

                            if (typeof window.dispatchEvent === 'function') {
                                window.dispatchEvent(tacRootAvailableEvent);
                            }

                            if (tarteaucitron.job !== undefined) {
                                tarteaucitron.job = tarteaucitron.cleanArray(
                                    tarteaucitron.job
                                );
                                for (
                                    index = 0;
                                    index < tarteaucitron.job.length;
                                    index += 1
                                ) {
                                    tarteaucitron.addService(
                                        tarteaucitron.job[index]
                                    );
                                }
                            } else {
                                tarteaucitron.job = [];
                            }

                            if (tarteaucitron.job.length === 0) {
                                tarteaucitron.userInterface.closeAlert();
                            }

                            tarteaucitron.isAjax = true;

                            tarteaucitron.job.push = function (id) {
                                // ie <9 hack
                                if (
                                    typeof tarteaucitron.job.indexOf ===
                                    'undefined'
                                ) {
                                    tarteaucitron.job.indexOf = function (
                                        obj,
                                        start
                                    ) {
                                        var i,
                                            j = this.length;
                                        for (i = start || 0; i < j; i += 1) {
                                            if (this[i] === obj) {
                                                return i;
                                            }
                                        }
                                        return -1;
                                    };
                                }

                                if (tarteaucitron.job.indexOf(id) === -1) {
                                    Array.prototype.push.call(this, id);
                                }
                                tarteaucitron.launch[id] = false;
                                tarteaucitron.addService(id);
                            };

                            if (
                                document.location.hash ===
                                    tarteaucitron.hashtag &&
                                tarteaucitron.hashtag !== ''
                            ) {
                                tarteaucitron.userInterface.openPanel();
                            }

                            tarteaucitron.cookie.number();
                            setInterval(tarteaucitron.cookie.number, 60000);
                        }
                    },
                    tarteaucitron.parameters.adblocker
                );

                if (tarteaucitron.parameters.adblocker === true) {
                    setTimeout(function () {
                        // The setimeout at 1500 ms will prevent the location.reload event to be properly binded...
                        if (tarteaucitronNoAdBlocker === false) {
                            html = `<div id="tarteaucitronAlertBig" class="fr-consent-banner tarteaucitronAlertBig tarteaucitron-display-block" role="alert" aria-live="polite">`;
                            html += `<h3 class="fr-h6">${tarteaucitron.lang.adblock}</h3>`;
                            html += `<div id="tarteaucitronDisclaimerAlert" class="fr-consent-banner__content"><p class="fr-text--sm">${tarteaucitron.lang.adblock_call}</p></div>`;
                            html += `<ul class="fr-consent-banner__buttons fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-sm">`;
                            html += `<li><button class="fr-btn tarteaucitronCTAButton" aria-label="${tarteaucitron.lang.reload}" title="${tarteaucitron.lang.reload}" type="button" id="tarteaucitronCTAButton">${tarteaucitron.lang.reload}</button></li>`;
                            html += '</ul></div>';
                            html +=
                                '<div role="heading" aria-level="1" id="tac_title" class="tac_visually-hidden">' +
                                tarteaucitron.lang.title +
                                '</div>';
                            html += '<div id="tarteaucitronPremium"></div>';

                            div.id = 'tarteaucitronRoot';
                            if (
                                tarteaucitron.parameters.bodyPosition === 'top'
                            ) {
                                // Prepend tarteaucitron: #tarteaucitronRoot first-child of the body for better accessibility
                                var bodyFirstChild = body.firstChild;
                                body.insertBefore(div, bodyFirstChild);
                            } else {
                                // Append tarteaucitron: #tarteaucitronRoot last-child of the body
                                body.appendChild(div, body);
                            }

                            div.setAttribute('data-nosnippet', 'true');
                            div.setAttribute('lang', language);
                            div.setAttribute('role', 'region');
                            div.setAttribute('aria-labelledby', 'tac_title');

                            div.innerHTML = html;
                        }
                    }, 1500);
                }
                if (tarteaucitron.parameters.closePopup === true) {
                    setTimeout(function () {
                        var closeElement = document.getElementById(
                                'tarteaucitronAlertBig'
                            ),
                            closeSpan = document.createElement('span');
                        if (closeElement) {
                            closeSpan.textContent = 'X';
                            closeSpan.setAttribute(
                                'id',
                                'tarteaucitronCloseCross'
                            );
                            closeElement.insertBefore(
                                closeSpan,
                                closeElement.firstElementChild
                            );
                        }
                    }, 100);
                }

                if (tarteaucitron.parameters.groupServices === true) {
                    var tac_group_style = document.createElement('style');
                    tac_group_style.innerHTML =
                        '.tarteaucitronTitle{display:none}';
                    document.head.appendChild(tac_group_style);
                    var cats = document.querySelectorAll(
                        '[id^="tarteaucitronServicesTitle_"]'
                    );
                    Array.prototype.forEach.call(cats, function (item) {
                        var cat = item
                            .getAttribute('id')
                            .replace(/^(tarteaucitronServicesTitle_)/, '');
                        if (cat !== 'mandatory') {
                            var html = '';
                            html += '<li class="tarteaucitronLine">';
                            html += '   <div class="tarteaucitronName">';
                            html +=
                                '       <span class="tarteaucitronH3" role="heading" aria-level="2">' +
                                tarteaucitron.lang[cat].title +
                                '</span>';
                            html +=
                                '       <span>' +
                                tarteaucitron.lang[cat].details +
                                '</span>';
                            html +=
                                '   <button type="button" aria-expanded="false" class="tarteaucitron-toggle-group" id="tarteaucitron-toggle-group-' +
                                cat +
                                '">' +
                                tarteaucitron.lang.alertSmall +
                                ' (' +
                                document.getElementById(
                                    'tarteaucitronServices_' + cat
                                ).childElementCount +
                                ')</button>';
                            html += '   </div>';
                            html +=
                                '   <div class="tarteaucitronAsk" id="tarteaucitron-group-' +
                                cat +
                                '">';
                            html +=
                                '       <button type="button" aria-label="' +
                                tarteaucitron.lang.allow +
                                ' ' +
                                tarteaucitron.lang[cat].title +
                                '" class="tarteaucitronAllow" id="tarteaucitron-accept-group-' +
                                cat +
                                '">';
                            html +=
                                '           <span class="tarteaucitronCheck" aria-hidden="true"></span> ' +
                                tarteaucitron.lang.allow;
                            html += '       </button> ';
                            html +=
                                '       <button type="button" aria-label="' +
                                tarteaucitron.lang.deny +
                                ' ' +
                                tarteaucitron.lang[cat].title +
                                '" class="tarteaucitronDeny" id="tarteaucitron-reject-group-' +
                                cat +
                                '">';
                            html +=
                                '           <span class="tarteaucitronCross" aria-hidden="true"></span> ' +
                                tarteaucitron.lang.deny;
                            html += '       </button>';
                            html += '   </div>';
                            html += '</li>';
                            var ul = document.createElement('ul');
                            ul.innerHTML = html;
                            item.insertBefore(
                                ul,
                                item.querySelector(
                                    '#tarteaucitronServices_' + cat + ''
                                )
                            );
                            document.querySelector(
                                '#tarteaucitronServices_' + cat
                            ).style.display = 'none';
                            tarteaucitron.addClickEventToId(
                                'tarteaucitron-toggle-group-' + cat,
                                function () {
                                    tarteaucitron.userInterface.toggle(
                                        'tarteaucitronServices_' + cat
                                    );
                                    if (
                                        document.getElementById(
                                            'tarteaucitronServices_' + cat
                                        ).style.display == 'block'
                                    ) {
                                        tarteaucitron.userInterface.addClass(
                                            'tarteaucitronServicesTitle_' + cat,
                                            'tarteaucitronIsExpanded'
                                        );
                                        document
                                            .getElementById(
                                                'tarteaucitron-toggle-group-' +
                                                    cat
                                            )
                                            .setAttribute(
                                                'aria-expanded',
                                                'true'
                                            );
                                    } else {
                                        tarteaucitron.userInterface.removeClass(
                                            'tarteaucitronServicesTitle_' + cat,
                                            'tarteaucitronIsExpanded'
                                        );
                                        document
                                            .getElementById(
                                                'tarteaucitron-toggle-group-' +
                                                    cat
                                            )
                                            .setAttribute(
                                                'aria-expanded',
                                                'false'
                                            );
                                    }
                                    //tarteaucitron.initEvents.resizeEvent();
                                }
                            );
                            tarteaucitron.addClickEventToId(
                                'tarteaucitron-accept-group-' + cat,
                                function () {
                                    tarteaucitron.userInterface.respondAll(
                                        true,
                                        cat
                                    );
                                }
                            );
                            tarteaucitron.addClickEventToId(
                                'tarteaucitron-reject-group-' + cat,
                                function () {
                                    tarteaucitron.userInterface.respondAll(
                                        false,
                                        cat
                                    );
                                }
                            );
                        }
                    });
                }
                tarteaucitron.userInterface.color('', true);

                // add a little timeout to be sure everything is accessible
                setTimeout(function () {
                    // Setup events
                    tarteaucitron.addClickEventToId(
                        'tarteaucitronCloseCross',
                        function () {
                            tarteaucitron.userInterface.closeAlert();
                        }
                    );
                    tarteaucitron.addClickEventToId(
                        'tarteaucitronPersonalize',
                        function () {
                            tarteaucitron.userInterface.openPanel();
                        }
                    );
                    tarteaucitron.addClickEventToId(
                        'tarteaucitronPersonalize2',
                        function () {
                            tarteaucitron.userInterface.respondAll(true);
                        }
                    );
                    tarteaucitron.addClickEventToId(
                        'tarteaucitronManager',
                        function () {
                            tarteaucitron.userInterface.openPanel();
                        }
                    );
                    tarteaucitron.addClickEventToId(
                        'tarteaucitronBack',
                        function () {
                            tarteaucitron.userInterface.closePanel();
                        }
                    );
                    tarteaucitron.addClickEventToId(
                        'tarteaucitronClosePanel',
                        function () {
                            tarteaucitron.userInterface.closePanel();
                        }
                    );
                    tarteaucitron.addClickEventToId(
                        'tarteaucitronClosePanelCookie',
                        function () {
                            tarteaucitron.userInterface.closePanel();
                        }
                    );
                    tarteaucitron.addClickEventToId(
                        'tarteaucitronPrivacyUrl',
                        function () {
                            document.location =
                                tarteaucitron.parameters.privacyUrl;
                        }
                    );
                    tarteaucitron.addClickEventToId(
                        'tarteaucitronPrivacyUrlDialog',
                        function () {
                            document.location =
                                tarteaucitron.parameters.privacyUrl;
                        }
                    );
                    tarteaucitron.addClickEventToId(
                        'tarteaucitronCookiesNumber',
                        function () {
                            tarteaucitron.userInterface.toggleCookiesList();
                        }
                    );
                    tarteaucitron.addClickEventToId(
                        'tarteaucitronAllAllowed',
                        function () {
                            tarteaucitron.userInterface.respondAll(true);
                        }
                    );
                    tarteaucitron.addClickEventToId(
                        'tarteaucitronAllDenied',
                        function () {
                            tarteaucitron.userInterface.respondAll(false);
                        }
                    );
                    tarteaucitron.addClickEventToId(
                        'tarteaucitronAllDenied2',
                        function () {
                            tarteaucitron.userInterface.respondAll(
                                false,
                                '',
                                true
                            );
                            if (tarteaucitron.reloadThePage === true) {
                                window.location.reload();
                            }
                        }
                    );
                    tarteaucitron.addClickEventToId(
                        'tarteaucitronCloseAlert',
                        function (e) {
                            tarteaucitron.userInterface.addClass(
                                e.currentTarget.id,
                                'focusA11yButton'
                            );
                            tarteaucitron.userInterface.openPanel();
                        }
                    );
                    tarteaucitron.addClickEventToId(
                        'fr-nav-footer-legal-id-#tarteaucitron',
                        function () {
                            tarteaucitron.userInterface.openPanel();
                        }
                    );
                    tarteaucitron.addClickEventToId(
                        'tarteaucitronCTAButton',
                        function () {
                            location.reload();
                        }
                    );
                    var toggleBtns =
                            document.getElementsByClassName('catToggleBtn'),
                        i;
                    for (i = 0; i < toggleBtns.length; i++) {
                        toggleBtns[i].dataset.index = i;
                        tarteaucitron.addClickEventToElement(
                            toggleBtns[i],
                            function () {
                                if (
                                    !tarteaucitron.parameters.showDetailsOnClick
                                )
                                    return false;
                                tarteaucitron.userInterface.toggle(
                                    'tarteaucitronDetails' +
                                        cat[this.dataset.index],
                                    'tarteaucitronInfoBox'
                                );
                                if (
                                    document.getElementById(
                                        'tarteaucitronDetails' +
                                            cat[this.dataset.index]
                                    ).style.display === 'block'
                                ) {
                                    this.setAttribute('aria-expanded', 'true');
                                } else {
                                    this.setAttribute('aria-expanded', 'false');
                                }
                                return false;
                            }
                        );
                    }

                    // accessibility: on click on "Allow" in the site (not in TAC module), move focus to the loaded service's parent
                    var allowBtnsInSite = document.querySelectorAll(
                        '.tarteaucitronAllow:not(#tarteaucitronRoot .tarteaucitronAllow)'
                    );
                    for (i = 0; i < allowBtnsInSite.length; i++) {
                        tarteaucitron.addClickEventToElement(
                            allowBtnsInSite[i],
                            function () {
                                if (
                                    this.closest('.tac_activate') !== null &&
                                    this.closest('.tac_activate').parentNode !==
                                        null
                                ) {
                                    this.closest(
                                        '.tac_activate'
                                    ).parentNode.setAttribute('tabindex', '-1');
                                    this.closest(
                                        '.tac_activate'
                                    ).parentNode.focus();
                                }
                            }
                        );
                    }

                    var allowBtns =
                        document.getElementsByClassName('tarteaucitronAllow');
                    for (i = 0; i < allowBtns.length; i++) {
                        tarteaucitron.addClickEventToElement(
                            allowBtns[i],
                            function () {
                                tarteaucitron.userInterface.respond(this, true);
                            }
                        );
                    }
                    var denyBtns =
                        document.getElementsByClassName('tarteaucitronDeny');
                    for (i = 0; i < denyBtns.length; i++) {
                        tarteaucitron.addClickEventToElement(
                            denyBtns[i],
                            function () {
                                tarteaucitron.userInterface.respond(
                                    this,
                                    false
                                );
                            }
                        );
                    }
                    if (tarteaucitron.events.load) {
                        tarteaucitron.events.load();
                    }
                }, 500);
            });
        });
    },
    addService: function (serviceId) {
        'use strict';
        var html = '',
            s = tarteaucitron.services,
            service = s[serviceId],
            cookie = tarteaucitron.cookie.read(),
            hostname = document.location.hostname,
            hostRef = document.referrer.split('/')[2],
            isNavigating =
                hostRef === hostname &&
                window.location.href !== tarteaucitron.parameters.privacyUrl,
            isAutostart = !service.needConsent,
            isWaiting = cookie.indexOf(service.key + '=wait') >= 0,
            isDenied = cookie.indexOf(service.key + '=false') >= 0,
            isAllowed =
                cookie.indexOf(service.key + '=true') >= 0 ||
                (!service.needConsent &&
                    cookie.indexOf(service.key + '=false') < 0),
            isResponded =
                cookie.indexOf(service.key + '=false') >= 0 ||
                cookie.indexOf(service.key + '=true') >= 0,
            isDNTRequested =
                navigator.doNotTrack === '1' ||
                navigator.doNotTrack === 'yes' ||
                navigator.msDoNotTrack === '1' ||
                window.doNotTrack === '1',
            currentStatus = isAllowed
                ? tarteaucitron.lang.allowed
                : tarteaucitron.lang.disallowed,
            state =
                undefined !== service.defaultState
                    ? service.defaultState
                    : undefined !== tarteaucitron.parameters.serviceDefaultState
                      ? tarteaucitron.parameters.serviceDefaultState
                      : 'wait';

        if (tarteaucitron.added[service.key] !== true) {
            tarteaucitron.added[service.key] = true;

            html += `
            <div id="${service.key}Line" class="fr-consent-service fr-mt-2w tarteaucitronLine">
                <fieldset class="fr-fieldset fr-fieldset--inline">
                    <legend id="finality-${service.key}-legend" class="fr-consent-service__title fr-pb-1v">
                        ${service.name}
                    </legend>
                    <div>
                        <p class="fr-mb-1v">
                            <span class="tacCurrentStatus fr-hidden" id="tacCurrentStatus${service.key}">${currentStatus}</span>
                            <span id="tacCL${service.key}" class="tarteaucitronListCookies"></span>
                        </p>`;
            if (tarteaucitron.parameters.moreInfoLink == true) {
                let link =
                    'https://tarteaucitron.io/service/' + service.key + '/';
                if (
                    service.readmoreLink !== undefined &&
                    service.readmoreLink !== ''
                ) {
                    link = service.readmoreLink;
                }
                if (
                    tarteaucitron.parameters.readmoreLink !== undefined &&
                    tarteaucitron.parameters.readmoreLink !== ''
                ) {
                    link = tarteaucitron.parameters.readmoreLink;
                }
                html += `
                        <p class="fr-mb-1w">
                            <a href="${link}" target="_blank" rel="noreferrer noopener nofollow" title="${
                                tarteaucitron.lang.more
                            } : ${tarteaucitron.lang.cookieDetail.toLowerCase()} ${
                                service.name
                            } ${tarteaucitron.lang.ourSite} ${
                                tarteaucitron.lang.newWindow
                            }" class="tarteaucitronReadmoreInfo fr-link fr-text-default--grey" id="consent-link-private-${
                                service.key
                            }">
                                ${tarteaucitron.lang.more}
                            </a>
                            <span class="tarteaucitronReadmoreSeparator fr-mx-1w"> - </span>
                            <a href="${
                                service.uri
                            }" target="_blank" rel="noreferrer noopener" title="${
                                tarteaucitron.lang.source
                            } ${service.name} ${
                                tarteaucitron.lang.newWindow
                            }" class="tarteaucitronReadmoreOfficial fr-link fr-text-default--grey" id="consent-link-partner-${
                                service.key
                            }">
                                ${tarteaucitron.lang.source}
                            </a>
                        </p>`;
            }
            html += `</div>
                    <div class="fr-consent-service__radios fr-fieldset--inline">
                        <div class="fr-radio-group">
                            <input type="radio" id="${service.key}Allowed" class="tarteaucitronAllow" name="consent-${service.key}-radio" data-fr-analytics-action="false">
                            <label for="${service.key}Allowed" class="fr-label">
                                ${tarteaucitron.lang.allow}
                            </label>
                        </div>
                        <div class="fr-radio-group">
                            <input type="radio" id="${service.key}Denied" class="tarteaucitronDeny" name="consent-${service.key}-radio" data-fr-analytics-action="false">
                            <label for="${service.key}Denied" class="fr-label">
                                ${tarteaucitron.lang.deny}
                            </label>
                        </div>
                    </div>
                </fieldset>
            </div>`;

            tarteaucitron.userInterface.css(
                'tarteaucitronServicesTitle_' + service.type,
                'display',
                'block'
            );

            tarteaucitron.userInterface.removeClass(
                'tarteaucitronServicesTitle_' + service.type,
                'fr-hidden'
            );

            if (
                document.getElementById(
                    'tarteaucitronServices_' + service.type
                ) !== null
            ) {
                document.getElementById(
                    'tarteaucitronServices_' + service.type
                ).innerHTML += html;
            }

            tarteaucitron.userInterface.css(
                'tarteaucitronNoServicesTitle',
                'display',
                'none'
            );

            tarteaucitron.userInterface.order(service.type);

            tarteaucitron.addClickEventToId(
                service.key + 'Allowed',
                function () {
                    tarteaucitron.userInterface.respond(this, true);
                }
            );

            tarteaucitron.addClickEventToId(
                service.key + 'Denied',
                function () {
                    tarteaucitron.userInterface.respond(this, false);
                }
            );
        }

        tarteaucitron.pro('!' + service.key + '=' + isAllowed);

        // allow by default for non EU
        if (isResponded === false && tarteaucitron.user.bypass === true) {
            isAllowed = true;
            tarteaucitron.cookie.create(service.key, true);
        }

        if (
            (!isResponded &&
                (isAutostart || (isNavigating && isWaiting)) &&
                !tarteaucitron.highPrivacy) ||
            isAllowed
        ) {
            if (
                !isAllowed ||
                (!service.needConsent &&
                    cookie.indexOf(service.key + '=false') < 0)
            ) {
                tarteaucitron.cookie.create(service.key, true);
            }
            if (tarteaucitron.launch[service.key] !== true) {
                tarteaucitron.launch[service.key] = true;
                if (
                    typeof tarteaucitronMagic === 'undefined' ||
                    tarteaucitronMagic.indexOf('_' + service.key + '_') < 0
                ) {
                    service.js();
                }
                tarteaucitron.sendEvent(service.key + '_loaded');
            }
            tarteaucitron.state[service.key] = true;
            tarteaucitron.userInterface.color(service.key, true);
        } else if (isDenied) {
            if (typeof service.fallback === 'function') {
                if (
                    typeof tarteaucitronMagic === 'undefined' ||
                    tarteaucitronMagic.indexOf('_' + service.key + '_') < 0
                ) {
                    service.fallback();
                }
            }
            tarteaucitron.state[service.key] = false;
            tarteaucitron.userInterface.color(service.key, false);
        } else if (
            !isResponded &&
            isDNTRequested &&
            tarteaucitron.handleBrowserDNTRequest
        ) {
            tarteaucitron.cookie.create(service.key, 'false');
            if (typeof service.fallback === 'function') {
                if (
                    typeof tarteaucitronMagic === 'undefined' ||
                    tarteaucitronMagic.indexOf('_' + service.key + '_') < 0
                ) {
                    service.fallback();
                }
            }
            tarteaucitron.state[service.key] = false;
            tarteaucitron.userInterface.color(service.key, false);
        } else if (!isResponded) {
            tarteaucitron.cookie.create(service.key, state);
            if (
                typeof tarteaucitronMagic === 'undefined' ||
                tarteaucitronMagic.indexOf('_' + service.key + '_') < 0
            ) {
                if (true === state && typeof service.js === 'function') {
                    service.js();
                } else if (typeof service.fallback === 'function') {
                    service.fallback();
                }
            }

            tarteaucitron.userInterface.color(service.key, state);

            if ('wait' === state) {
                tarteaucitron.userInterface.openAlert();
            }
        }

        tarteaucitron.cookie.checkCount(service.key);
        tarteaucitron.sendEvent(service.key + '_added');
    },
    sendEvent: function (event_key) {
        if (event_key !== undefined) {
            //ie compatibility
            var send_event_item;
            if (typeof Event === 'function') {
                send_event_item = new Event(event_key);
            } else if (typeof document.createEvent === 'function') {
                send_event_item = document.createEvent('Event');
                send_event_item.initEvent(event_key, true, true);
            }
            //end ie compatibility

            document.dispatchEvent(send_event_item);
        }
    },
    cleanArray: function cleanArray(arr) {
        'use strict';
        var i,
            len = arr.length,
            out = [],
            obj = {},
            s = tarteaucitron.services;

        for (i = 0; i < len; i += 1) {
            if (!obj[arr[i]]) {
                obj[arr[i]] = {};
                if (tarteaucitron.services[arr[i]] !== undefined) {
                    out.push(arr[i]);
                }
            }
        }

        out = out.sort(function (a, b) {
            if (s[a].type + s[a].key > s[b].type + s[b].key) {
                return 1;
            }
            if (s[a].type + s[a].key < s[b].type + s[b].key) {
                return -1;
            }
            return 0;
        });

        return out;
    },
    userInterface: {
        css: function (id, property, value) {
            'use strict';
            if (document.getElementById(id) !== null) {
                if (
                    property == 'display' &&
                    value == 'none' &&
                    (id == 'tarteaucitron' ||
                        id == 'tarteaucitronBack' ||
                        id == 'tarteaucitronAlertBig')
                ) {
                    document.getElementById(id).style['opacity'] = '0';

                    /*setTimeout(function() {*/ document.getElementById(
                        id
                    ).style[property] = value; /*}, 200);*/
                } else {
                    document.getElementById(id).style[property] = value;

                    if (
                        property == 'display' &&
                        value == 'block' &&
                        (id == 'tarteaucitron' || id == 'tarteaucitronAlertBig')
                    ) {
                        document.getElementById(id).style['opacity'] = '1';
                    }

                    if (
                        property == 'display' &&
                        value == 'block' &&
                        id == 'tarteaucitronBack'
                    ) {
                        document.getElementById(id).style['opacity'] = '0.7';
                        document.getElementById(id).style['width'] = '100%';
                        document.getElementById(id).style['height'] = '100%';
                        document.getElementById(id).style['position'] = 'fixed';
                        document.getElementById(id).style['top'] = '0';
                        document.getElementById(id).style['left'] = '0';
                        document.getElementById(id).style['backgroundColor'] =
                            'transparent';
                    }
                }
            }
        },
        addClass: function (id, className) {
            'use strict';
            if (
                document.getElementById(id) !== null &&
                document.getElementById(id).classList !== undefined
            ) {
                document.getElementById(id).classList.add(className);
            }
        },
        removeClass: function (id, className) {
            'use strict';
            if (
                document.getElementById(id) !== null &&
                document.getElementById(id).classList !== undefined
            ) {
                document.getElementById(id).classList.remove(className);
            }
        },
        respondAll: function (status, type, allowSafeAnalytics) {
            'use strict';
            var s = tarteaucitron.services,
                service,
                key,
                index = 0;

            for (index = 0; index < tarteaucitron.job.length; index += 1) {
                if (
                    typeof type !== 'undefined' &&
                    type !== '' &&
                    s[tarteaucitron.job[index]].type !== type
                ) {
                    continue;
                }

                if (
                    allowSafeAnalytics &&
                    typeof s[tarteaucitron.job[index]].safeanalytic !==
                        'undefined' &&
                    s[tarteaucitron.job[index]].safeanalytic === true
                ) {
                    continue;
                }

                service = s[tarteaucitron.job[index]];
                key = service.key;
                if (tarteaucitron.state[key] !== status) {
                    if (
                        status === false &&
                        tarteaucitron.launch[key] === true
                    ) {
                        tarteaucitron.reloadThePage = true;
                        if (
                            tarteaucitron.checkIfExist(
                                'tarteaucitronClosePanel'
                            )
                        ) {
                            var ariaCloseValue =
                                document
                                    .getElementById('tarteaucitronClosePanel')
                                    .textContent.trim() +
                                ' (' +
                                tarteaucitron.lang.reload +
                                ')';
                            document
                                .getElementById('tarteaucitronClosePanel')
                                .setAttribute('aria-label', ariaCloseValue);
                            document
                                .getElementById('tarteaucitronClosePanel')
                                .setAttribute('title', ariaCloseValue);
                        }
                    }
                    if (tarteaucitron.launch[key] !== true && status === true) {
                        tarteaucitron.pro('!' + key + '=engage');

                        tarteaucitron.launch[key] = true;
                        if (
                            typeof tarteaucitronMagic === 'undefined' ||
                            tarteaucitronMagic.indexOf('_' + key + '_') < 0
                        ) {
                            tarteaucitron.services[key].js();
                        }
                        tarteaucitron.sendEvent(key + '_loaded');
                    }
                    var itemStatusElem = document.getElementById(
                        'tacCurrentStatus' + key
                    );
                    tarteaucitron.state[key] = status;
                    tarteaucitron.cookie.create(key, status);
                    tarteaucitron.userInterface.color(key, status);
                    if (status == true) {
                        itemStatusElem.innerHTML = tarteaucitron.lang.allowed;
                        tarteaucitron.sendEvent(key + '_allowed');
                    } else {
                        itemStatusElem.innerHTML =
                            tarteaucitron.lang.disallowed;
                        tarteaucitron.sendEvent(key + '_disallowed');
                    }
                }
            }
        },
        respond: function (el, status) {
            'use strict';
            if (el.id === '') {
                return;
            }
            var key = el.id.replace(
                new RegExp('(Eng[0-9]+|Allow|Deni)ed', 'g'),
                ''
            );

            if (key.substring(0, 13) === 'tarteaucitron' || key === '') {
                return;
            }

            // return if same state
            if (tarteaucitron.state[key] === status) {
                return;
            }

            if (status === false && tarteaucitron.launch[key] === true) {
                tarteaucitron.reloadThePage = true;
                if (tarteaucitron.checkIfExist('tarteaucitronClosePanel')) {
                    var ariaCloseValue =
                        document
                            .getElementById('tarteaucitronClosePanel')
                            .textContent.trim() +
                        ' (' +
                        tarteaucitron.lang.reload +
                        ')';
                    document
                        .getElementById('tarteaucitronClosePanel')
                        .setAttribute('aria-label', ariaCloseValue);
                    document
                        .getElementById('tarteaucitronClosePanel')
                        .setAttribute('title', ariaCloseValue);
                }
            }

            // if not already launched... launch the service
            if (status === true) {
                if (tarteaucitron.launch[key] !== true) {
                    tarteaucitron.pro('!' + key + '=engage');

                    tarteaucitron.launch[key] = true;
                    if (
                        typeof tarteaucitronMagic === 'undefined' ||
                        tarteaucitronMagic.indexOf('_' + key + '_') < 0
                    ) {
                        tarteaucitron.services[key].js();
                    }
                    tarteaucitron.sendEvent(key + '_loaded');
                }
            }
            var itemStatusElem = document.getElementById(
                'tacCurrentStatus' + key
            );
            tarteaucitron.state[key] = status;
            tarteaucitron.cookie.create(key, status);
            tarteaucitron.userInterface.color(key, status);
            if (status == true) {
                itemStatusElem.innerHTML = tarteaucitron.lang.allowed;
                tarteaucitron.sendEvent(key + '_allowed');
            } else {
                itemStatusElem.innerHTML = tarteaucitron.lang.disallowed;
                tarteaucitron.sendEvent(key + '_disallowed');
            }

            const allDecide = document.querySelector(
                '.tarteaucitronIsSelected'
            );
            if (allDecide) {
                allDecide.checked = true;
            } else {
                document
                    .querySelectorAll(
                        '#tarteaucitronAllAllowed, #tarteaucitronAllDenied'
                    )
                    .forEach((item) => {
                        item.checked = false;
                        item.setAttribute('aria-pressed', 'false');
                    });
            }
        },
        color: function (key, status) {
            'use strict';
            var c = 'tarteaucitron',
                nbDenied = 0,
                nbPending = 0,
                nbAllowed = 0,
                sum = tarteaucitron.job.length,
                index,
                s = tarteaucitron.services;

            if (key !== '') {
                if (status === true) {
                    tarteaucitron.userInterface.addClass(
                        key + 'Line',
                        'tarteaucitronIsAllowed'
                    );
                    tarteaucitron.userInterface.removeClass(
                        key + 'Line',
                        'tarteaucitronIsDenied'
                    );
                    document
                        .getElementById(key + 'Denied')
                        .removeAttribute('checked');
                    document
                        .getElementById(key + 'Allowed')
                        .setAttribute('checked', 'true');
                } else if (status === false) {
                    tarteaucitron.userInterface.removeClass(
                        key + 'Line',
                        'tarteaucitronIsAllowed'
                    );
                    tarteaucitron.userInterface.addClass(
                        key + 'Line',
                        'tarteaucitronIsDenied'
                    );
                    document
                        .getElementById(key + 'Allowed')
                        .removeAttribute('checked');
                    document
                        .getElementById(key + 'Denied')
                        .setAttribute('checked', 'true');
                } else {
                    document
                        .getElementById(key + 'Allowed')
                        .removeAttribute('checked');
                    document
                        .getElementById(key + 'Denied')
                        .removeAttribute('checked');
                }

                // check if all services are allowed
                var sumToRemove = 0;
                for (index = 0; index < sum; index += 1) {
                    if (
                        typeof s[tarteaucitron.job[index]].safeanalytic !==
                            'undefined' &&
                        s[tarteaucitron.job[index]].safeanalytic === true
                    ) {
                        sumToRemove += 1;
                        continue;
                    }

                    if (
                        tarteaucitron.state[tarteaucitron.job[index]] === false
                    ) {
                        nbDenied += 1;
                    } else if (
                        tarteaucitron.state[tarteaucitron.job[index]] ===
                        undefined
                    ) {
                        nbPending += 1;
                    } else if (
                        tarteaucitron.state[tarteaucitron.job[index]] === true
                    ) {
                        nbAllowed += 1;
                    }
                }
                sum -= sumToRemove;

                tarteaucitron.userInterface.css(
                    c + 'DotGreen',
                    'width',
                    (100 / sum) * nbAllowed + '%'
                );
                tarteaucitron.userInterface.css(
                    c + 'DotYellow',
                    'width',
                    (100 / sum) * nbPending + '%'
                );
                tarteaucitron.userInterface.css(
                    c + 'DotRed',
                    'width',
                    (100 / sum) * nbDenied + '%'
                );

                if (nbDenied === 0 && nbPending === 0) {
                    tarteaucitron.userInterface.removeClass(
                        c + 'AllDenied',
                        c + 'IsSelected'
                    );
                    tarteaucitron.userInterface.addClass(
                        c + 'AllAllowed',
                        c + 'IsSelected'
                    );

                    tarteaucitron.userInterface.addClass(
                        c + 'MainLineOffset',
                        c + 'IsAllowed'
                    );
                    tarteaucitron.userInterface.removeClass(
                        c + 'MainLineOffset',
                        c + 'IsDenied'
                    );

                    document
                        .getElementById(c + 'AllDenied')
                        .removeAttribute('checked');
                    document
                        .getElementById(c + 'AllAllowed')
                        .setAttribute('checked', 'true');
                } else if (nbAllowed === 0 && nbPending === 0) {
                    tarteaucitron.userInterface.removeClass(
                        c + 'AllAllowed',
                        c + 'IsSelected'
                    );
                    tarteaucitron.userInterface.addClass(
                        c + 'AllDenied',
                        c + 'IsSelected'
                    );

                    tarteaucitron.userInterface.removeClass(
                        c + 'MainLineOffset',
                        c + 'IsAllowed'
                    );
                    tarteaucitron.userInterface.addClass(
                        c + 'MainLineOffset',
                        c + 'IsDenied'
                    );

                    document
                        .getElementById(c + 'AllAllowed')
                        .removeAttribute('checked');
                    document
                        .getElementById(c + 'AllDenied')
                        .setAttribute('checked', 'true');
                } else {
                    tarteaucitron.userInterface.removeClass(
                        c + 'AllAllowed',
                        c + 'IsSelected'
                    );
                    tarteaucitron.userInterface.removeClass(
                        c + 'AllDenied',
                        c + 'IsSelected'
                    );

                    tarteaucitron.userInterface.removeClass(
                        c + 'MainLineOffset',
                        c + 'IsAllowed'
                    );
                    tarteaucitron.userInterface.removeClass(
                        c + 'MainLineOffset',
                        c + 'IsDenied'
                    );

                    document
                        .getElementById(c + 'AllAllowed')
                        .removeAttribute('checked');
                    document
                        .getElementById(c + 'AllDenied')
                        .removeAttribute('checked');
                }

                // close the alert if all service have been reviewed
                if (nbPending === 0) {
                    tarteaucitron.userInterface.closeAlert();
                }

                if (
                    tarteaucitron.services[key].cookies.length > 0 &&
                    status === false
                ) {
                    tarteaucitron.cookie.purge(
                        tarteaucitron.services[key].cookies
                    );
                }

                if (status === true) {
                    if (document.getElementById('tacCL' + key) !== null) {
                        document.getElementById('tacCL' + key).innerHTML =
                            '...';
                    }
                    setTimeout(function () {
                        tarteaucitron.cookie.checkCount(key);
                    }, 2500);
                } else {
                    tarteaucitron.cookie.checkCount(key);
                }
            }

            // groups
            var cats = document.querySelectorAll(
                '[id^="tarteaucitronServicesTitle_"]'
            );
            Array.prototype.forEach.call(cats, function (item) {
                var cat = item
                        .getAttribute('id')
                        .replace(/^(tarteaucitronServicesTitle_)/, ''),
                    total = document.getElementById(
                        'tarteaucitronServices_' + cat
                    ).childElementCount;
                var doc = document.getElementById(
                        'tarteaucitronServices_' + cat
                    ),
                    groupdenied = 0,
                    groupallowed = 0;
                for (var ii = 0; ii < doc.children.length; ii++) {
                    if (
                        doc.children[ii].className ==
                        'tarteaucitronLine tarteaucitronIsDenied'
                    ) {
                        groupdenied++;
                    }
                    if (
                        doc.children[ii].className ==
                        'tarteaucitronLine tarteaucitronIsAllowed'
                    ) {
                        groupallowed++;
                    }
                }
                if (total === groupallowed) {
                    tarteaucitron.userInterface.removeClass(
                        'tarteaucitron-group-' + cat,
                        'tarteaucitronIsDenied'
                    );
                    tarteaucitron.userInterface.addClass(
                        'tarteaucitron-group-' + cat,
                        'tarteaucitronIsAllowed'
                    );

                    if (
                        document.getElementById(
                            'tarteaucitron-reject-group-' + cat
                        )
                    ) {
                        document
                            .getElementById('tarteaucitron-reject-group-' + cat)
                            .setAttribute('aria-pressed', 'false');
                        document
                            .getElementById('tarteaucitron-accept-group-' + cat)
                            .setAttribute('aria-pressed', 'true');
                    }
                }
                if (total === groupdenied) {
                    tarteaucitron.userInterface.addClass(
                        'tarteaucitron-group-' + cat,
                        'tarteaucitronIsDenied'
                    );
                    tarteaucitron.userInterface.removeClass(
                        'tarteaucitron-group-' + cat,
                        'tarteaucitronIsAllowed'
                    );

                    if (
                        document.getElementById(
                            'tarteaucitron-reject-group-' + cat
                        )
                    ) {
                        document
                            .getElementById('tarteaucitron-reject-group-' + cat)
                            .setAttribute('aria-pressed', 'true');
                        document
                            .getElementById('tarteaucitron-accept-group-' + cat)
                            .setAttribute('aria-pressed', 'false');
                    }
                }
                if (total !== groupdenied && total !== groupallowed) {
                    tarteaucitron.userInterface.removeClass(
                        'tarteaucitron-group-' + cat,
                        'tarteaucitronIsDenied'
                    );
                    tarteaucitron.userInterface.removeClass(
                        'tarteaucitron-group-' + cat,
                        'tarteaucitronIsAllowed'
                    );

                    if (
                        document.getElementById(
                            'tarteaucitron-reject-group-' + cat
                        )
                    ) {
                        document
                            .getElementById('tarteaucitron-reject-group-' + cat)
                            .setAttribute('aria-pressed', 'false');
                        document
                            .getElementById('tarteaucitron-accept-group-' + cat)
                            .setAttribute('aria-pressed', 'false');
                    }
                }
                groupdenied = 0;
                groupallowed = 0;
            });
        },
        openPanel: function () {
            'use strict';

            tarteaucitron.userInterface.css(
                'tarteaucitronBack',
                'display',
                'block'
            );
            tarteaucitron.userInterface.css(
                'tarteaucitronCookiesListContainer',
                'display',
                'none'
            );
            if (
                document.getElementsByTagName('body')[0].classList !== undefined
            ) {
                document
                    .getElementsByTagName('body')[0]
                    .classList.add('tarteaucitron-modal-open');
            }
            tarteaucitron.userInterface.jsSizing('main');

            //ie compatibility
            var tacOpenPanelEvent;
            if (typeof Event === 'function') {
                tacOpenPanelEvent = new Event('tac.open_panel');
            } else if (typeof document.createEvent === 'function') {
                tacOpenPanelEvent = document.createEvent('Event');
                tacOpenPanelEvent.initEvent('tac.open_panel', true, true);
            }
            //end ie compatibility

            if (typeof window.dispatchEvent === 'function') {
                window.dispatchEvent(tacOpenPanelEvent);
            }
        },
        closePanel: function () {
            'use strict';
            if (document.location.hash === tarteaucitron.hashtag) {
                if (window.history) {
                    window.history.replaceState(
                        '',
                        document.title,
                        window.location.pathname + window.location.search
                    );
                } else {
                    document.location.hash = '';
                }
            }
            if (tarteaucitron.checkIfExist('tarteaucitron')) {
                // accessibility: manage focus on close panel
                if (!document.querySelector('.focusA11yButton')) {
                    document
                        .getElementById('fr-nav-footer-legal-id-#tarteaucitron')
                        .focus();
                } else if (tarteaucitron.checkIfExist('tarteaucitronManager')) {
                    document.getElementById('tarteaucitronManager').focus();
                } else if (
                    tarteaucitron.customCloserId &&
                    tarteaucitron.checkIfExist(tarteaucitron.customCloserId)
                ) {
                    document
                        .getElementById(tarteaucitron.customCloserId)
                        .focus();
                }
                tarteaucitron.userInterface.removeClass(
                    'tarteaucitronCloseAlert',
                    'focusA11yButton'
                );
            }

            if (
                tarteaucitron.checkIfExist(
                    'tarteaucitronCookiesListContainer'
                ) &&
                tarteaucitron.checkIfExist('tarteaucitronCookiesNumber')
            ) {
                // accessibility: manage focus on close cookies list
                document.getElementById('tarteaucitronCookiesNumber').focus();
                document
                    .getElementById('tarteaucitronCookiesNumber')
                    .setAttribute('aria-expanded', 'false');
                tarteaucitron.userInterface.css(
                    'tarteaucitronCookiesListContainer',
                    'display',
                    'none'
                );
            }

            tarteaucitron.fallback(
                ['tarteaucitronInfoBox'],
                function (elem) {
                    elem.style.display = 'none';
                },
                true
            );

            if (tarteaucitron.reloadThePage === true) {
                window.location.reload();
            } else {
                tarteaucitron.userInterface.css(
                    'tarteaucitronBack',
                    'display',
                    'none'
                );
            }
            if (
                document.getElementsByTagName('body')[0].classList !== undefined
            ) {
                document
                    .getElementsByTagName('body')[0]
                    .classList.remove('tarteaucitron-modal-open');
            }

            //ie compatibility
            var tacClosePanelEvent;
            if (typeof Event === 'function') {
                tacClosePanelEvent = new Event('tac.close_panel');
            } else if (typeof document.createEvent === 'function') {
                tacClosePanelEvent = document.createEvent('Event');
                tacClosePanelEvent.initEvent('tac.close_panel', true, true);
            }
            //end ie compatibility

            if (typeof window.dispatchEvent === 'function') {
                window.dispatchEvent(tacClosePanelEvent);
            }
        },
        openAlert: function () {
            'use strict';
            var c = 'tarteaucitron';
            tarteaucitron.userInterface.css(
                c + 'Percentage',
                'display',
                'block'
            );
            tarteaucitron.userInterface.css(
                c + 'AlertSmall',
                'display',
                'none'
            );
            tarteaucitron.userInterface.css(c + 'Icon', 'display', 'none');
            tarteaucitron.userInterface.css(c + 'AlertBig', 'display', 'block');
            tarteaucitron.userInterface.addClass(
                c + 'Root',
                'tarteaucitronBeforeVisible'
            );

            //ie compatibility
            var tacOpenAlertEvent;
            if (typeof Event === 'function') {
                tacOpenAlertEvent = new Event('tac.open_alert');
            } else if (typeof document.createEvent === 'function') {
                tacOpenAlertEvent = document.createEvent('Event');
                tacOpenAlertEvent.initEvent('tac.open_alert', true, true);
            }
            //end ie compatibility

            if (
                document.getElementById('tarteaucitronAlertBig') !== null &&
                tarteaucitron.parameters.orientation === 'middle'
            ) {
                document.getElementById('tarteaucitronAlertBig').focus();
            }

            if (typeof window.dispatchEvent === 'function') {
                window.dispatchEvent(tacOpenAlertEvent);
            }
        },
        closeAlert: function () {
            'use strict';
            var c = 'tarteaucitron';
            tarteaucitron.userInterface.css(
                c + 'Percentage',
                'display',
                'none'
            );
            tarteaucitron.userInterface.css(
                c + 'AlertSmall',
                'display',
                'block'
            );
            tarteaucitron.userInterface.css(c + 'Icon', 'display', 'block');
            tarteaucitron.userInterface.css(c + 'AlertBig', 'display', 'none');
            tarteaucitron.userInterface.removeClass(
                c + 'Root',
                'tarteaucitronBeforeVisible'
            );
            tarteaucitron.userInterface.jsSizing('box');

            //ie compatibility
            var tacCloseAlertEvent;
            if (typeof Event === 'function') {
                tacCloseAlertEvent = new Event('tac.close_alert');
            } else if (typeof document.createEvent === 'function') {
                tacCloseAlertEvent = document.createEvent('Event');
                tacCloseAlertEvent.initEvent('tac.close_alert', true, true);
            }
            //end ie compatibility

            if (typeof window.dispatchEvent === 'function') {
                window.dispatchEvent(tacCloseAlertEvent);
            }
        },
        toggleCookiesList: function () {
            'use strict';
            var div = document.getElementById(
                    'tarteaucitronCookiesListContainer'
                ),
                togglediv = document.getElementById(
                    'tarteaucitronCookiesNumber'
                );

            if (div === null) {
                return;
            }

            if (div.style.display !== 'block') {
                tarteaucitron.cookie.number();
                div.style.display = 'block';
                togglediv.setAttribute('aria-expanded', 'true');
                tarteaucitron.userInterface.jsSizing('cookie');
                tarteaucitron.userInterface.css(
                    'tarteaucitron',
                    'display',
                    'none'
                );
                tarteaucitron.userInterface.css(
                    'tarteaucitronBack',
                    'display',
                    'block'
                );
                tarteaucitron.fallback(
                    ['tarteaucitronInfoBox'],
                    function (elem) {
                        elem.style.display = 'none';
                    },
                    true
                );
            } else {
                div.style.display = 'none';
                togglediv.setAttribute('aria-expanded', 'false');
                tarteaucitron.userInterface.css(
                    'tarteaucitron',
                    'display',
                    'none'
                );
                tarteaucitron.userInterface.css(
                    'tarteaucitronBack',
                    'display',
                    'none'
                );
            }
        },
        toggle: function (id, closeClass) {
            'use strict';
            var div = document.getElementById(id);

            if (div === null) {
                return;
            }

            if (closeClass !== undefined) {
                tarteaucitron.fallback(
                    [closeClass],
                    function (elem) {
                        if (elem.id !== id) {
                            elem.style.display = 'none';
                        }
                    },
                    true
                );
            }

            if (div.style.display !== 'block') {
                div.style.display = 'block';
            } else {
                div.style.display = 'none';
            }
        },
        order: function (id) {
            'use strict';
            var main = document.getElementById('tarteaucitronServices_' + id),
                allDivs,
                store = [],
                i;

            if (main === null) {
                return;
            }

            allDivs = main.childNodes;

            if (
                typeof Array.prototype.map === 'function' &&
                typeof Enumerable === 'undefined'
            ) {
                Array.prototype.map
                    .call(main.children, Object)
                    .sort(function (a, b) {
                        //var mainChildren = Array.from(main.children);
                        //mainChildren.sort(function (a, b) {
                        if (
                            tarteaucitron.services[a.id.replace(/Line/g, '')]
                                .name >
                            tarteaucitron.services[b.id.replace(/Line/g, '')]
                                .name
                        ) {
                            return 1;
                        }
                        if (
                            tarteaucitron.services[a.id.replace(/Line/g, '')]
                                .name <
                            tarteaucitron.services[b.id.replace(/Line/g, '')]
                                .name
                        ) {
                            return -1;
                        }
                        return 0;
                    })
                    .forEach(function (element) {
                        main.appendChild(element);
                    });
            }
        },
        jsSizing: function (type) {
            'use strict';
            var scrollbarMarginRight = 10,
                e = window,
                a = 'inner',
                cookiesListHeight,
                cookiesCloseHeight,
                cookiesTitleHeight,
                paddingBox,
                alertSmallHeight,
                cookiesNumberHeight;

            if (type === 'box') {
                if (
                    document.getElementById('tarteaucitronAlertSmall') !==
                        null &&
                    document.getElementById('tarteaucitronCookiesNumber') !==
                        null
                ) {
                    // reset
                    tarteaucitron.userInterface.css(
                        'tarteaucitronCookiesNumber',
                        'padding',
                        '0px 10px'
                    );

                    // calculate
                    alertSmallHeight = document.getElementById(
                        'tarteaucitronAlertSmall'
                    ).offsetHeight;
                    cookiesNumberHeight = document.getElementById(
                        'tarteaucitronCookiesNumber'
                    ).offsetHeight;
                    paddingBox = (alertSmallHeight - cookiesNumberHeight) / 2;

                    // apply
                    tarteaucitron.userInterface.css(
                        'tarteaucitronCookiesNumber',
                        'padding',
                        paddingBox + 'px 10px'
                    );
                }
            } else if (type === 'main') {
                // get the real window width for media query
                if (window.innerWidth === undefined) {
                    a = 'client';
                    e = document.documentElement || document.body;
                }

                // align the main allow/deny button depending on scrollbar width
                if (
                    document.getElementById('tarteaucitronScrollbarChild') !==
                    null
                ) {
                    // media query
                    if (e[a + 'Width'] <= 479) {
                        //tarteaucitron.userInterface.css('tarteaucitronScrollbarAdjust', 'marginLeft', '11px');
                    } else if (e[a + 'Width'] <= 767) {
                        scrollbarMarginRight = 12;
                    }
                }
            } else if (type === 'cookie') {
                // put cookies list at bottom
                if (
                    document.getElementById('tarteaucitronAlertSmall') !== null
                ) {
                    tarteaucitron.userInterface.css(
                        'tarteaucitronCookiesListContainer',
                        'bottom',
                        document.getElementById('tarteaucitronAlertSmall')
                            .offsetHeight + 'px'
                    );
                }

                // height of cookies list
                if (
                    document.getElementById(
                        'tarteaucitronCookiesListContainer'
                    ) !== null
                ) {
                    // reset
                    tarteaucitron.userInterface.css(
                        'tarteaucitronCookiesList',
                        'height',
                        'auto'
                    );

                    // calculate
                    cookiesListHeight = document.getElementById(
                        'tarteaucitronCookiesListContainer'
                    ).offsetHeight;
                    cookiesCloseHeight = document.getElementById(
                        'tarteaucitronClosePanelCookie'
                    ).offsetHeight;
                    cookiesTitleHeight = document.getElementById(
                        'tarteaucitronCookiesTitle'
                    ).offsetHeight;

                    // apply
                    tarteaucitron.userInterface.css(
                        'tarteaucitronCookiesList',
                        'height',
                        cookiesListHeight -
                            cookiesCloseHeight -
                            cookiesTitleHeight -
                            2 +
                            'px'
                    );
                }
            }
        },
    },
    cookie: {
        owner: {},
        create: function (key, status) {
            'use strict';

            if (tarteaucitronForceExpire !== '') {
                // The number of day(s)/hour(s) can't be higher than 1 year
                if (
                    (tarteaucitronExpireInDay &&
                        tarteaucitronForceExpire < 365) ||
                    (!tarteaucitronExpireInDay &&
                        tarteaucitronForceExpire < 8760)
                ) {
                    if (tarteaucitronExpireInDay) {
                        // Multiplication to tranform the number of days to milliseconds
                        timeExpire = tarteaucitronForceExpire * 86400000;
                    } else {
                        // Multiplication to tranform the number of hours to milliseconds
                        timeExpire = tarteaucitronForceExpire * 3600000;
                    }
                }
            }

            var d = new Date(),
                time = d.getTime(),
                expireTime = time + timeExpire, // 365 days
                regex = new RegExp('!' + key + '=(wait|true|false)', 'g'),
                cookie = tarteaucitron.cookie.read().replace(regex, ''),
                value =
                    tarteaucitron.parameters.cookieName +
                    '=' +
                    cookie +
                    '!' +
                    key +
                    '=' +
                    status,
                domain =
                    tarteaucitron.parameters.cookieDomain !== undefined &&
                    tarteaucitron.parameters.cookieDomain !== ''
                        ? '; domain=' + tarteaucitron.parameters.cookieDomain
                        : '',
                secure = location.protocol === 'https:' ? '; Secure' : '';

            d.setTime(expireTime);
            document.cookie =
                value +
                '; expires=' +
                d.toGMTString() +
                '; path=/' +
                domain +
                secure +
                '; samesite=lax';

            tarteaucitron.sendEvent('tac.consent_updated');
        },
        read: function () {
            'use strict';
            var nameEQ = tarteaucitron.parameters.cookieName + '=',
                ca = document.cookie.split(';'),
                i,
                c;

            for (i = 0; i < ca.length; i += 1) {
                c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length, c.length);
                }
            }
            return '';
        },
        purge: function (arr) {
            'use strict';
            var i;

            for (i = 0; i < arr.length; i += 1) {
                var rgxpCookie = new RegExp(
                    '^(.*;)?\\s*' + arr[i] + '\\s*=\\s*[^;]+(.*)?$'
                );
                if (document.cookie.match(rgxpCookie)) {
                    document.cookie =
                        arr[i] +
                        '=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/;';
                    document.cookie =
                        arr[i] +
                        '=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/; domain=.' +
                        location.hostname +
                        ';';
                    document.cookie =
                        arr[i] +
                        '=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/; domain=.' +
                        location.hostname.split('.').slice(-2).join('.') +
                        ';';
                }
            }
        },
        checkCount: function (key) {
            'use strict';
            var arr = tarteaucitron.services[key].cookies,
                nb = arr.length,
                nbCurrent = 0,
                html = '',
                i,
                status = document.cookie.indexOf(key + '=true');

            if (status >= 0 && nb === 0) {
                html += tarteaucitron.lang.useNoCookie;
            } else if (status >= 0) {
                for (i = 0; i < nb; i += 1) {
                    if (document.cookie.indexOf(arr[i] + '=') !== -1) {
                        nbCurrent += 1;
                        if (tarteaucitron.cookie.owner[arr[i]] === undefined) {
                            tarteaucitron.cookie.owner[arr[i]] = [];
                        }
                        if (
                            tarteaucitron.cookie.crossIndexOf(
                                tarteaucitron.cookie.owner[arr[i]],
                                tarteaucitron.services[key].name
                            ) === false
                        ) {
                            tarteaucitron.cookie.owner[arr[i]].push(
                                tarteaucitron.services[key].name
                            );
                        }
                    }
                }

                if (nbCurrent > 0) {
                    html +=
                        tarteaucitron.lang.useCookieCurrent +
                        ' ' +
                        nbCurrent +
                        ' cookie';
                    if (nbCurrent > 1) {
                        html += 's';
                    }
                    html += '.';
                } else {
                    html += tarteaucitron.lang.useNoCookie;
                }
            } else if (nb === 0) {
                html = tarteaucitron.lang.noCookie;
            } else {
                html += tarteaucitron.lang.useCookie + ' ' + nb + ' cookie';
                if (nb > 1) {
                    html += 's';
                }
                html += '.';
            }

            if (document.getElementById('tacCL' + key) !== null) {
                document.getElementById('tacCL' + key).innerHTML = html;
            }
        },
        crossIndexOf: function (arr, match) {
            'use strict';
            var i;
            for (i = 0; i < arr.length; i += 1) {
                if (arr[i] === match) {
                    return true;
                }
            }
            return false;
        },
        number: function () {
            'use strict';
            var cookies = document.cookie.split(';'),
                nb = document.cookie !== '' ? cookies.length : 0,
                html = '',
                i,
                name,
                namea,
                nameb,
                c,
                d,
                s = nb > 1 ? 's' : '',
                savedname,
                regex = /^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i,
                regexedDomain =
                    tarteaucitron.cdn.match(regex) !== null
                        ? tarteaucitron.cdn.match(regex)[1]
                        : tarteaucitron.cdn,
                host =
                    tarteaucitron.domain !== undefined
                        ? tarteaucitron.domain
                        : regexedDomain;

            cookies = cookies.sort(function (a, b) {
                namea = a.split('=', 1).toString().replace(/ /g, '');
                nameb = b.split('=', 1).toString().replace(/ /g, '');
                c =
                    tarteaucitron.cookie.owner[namea] !== undefined
                        ? tarteaucitron.cookie.owner[namea]
                        : '0';
                d =
                    tarteaucitron.cookie.owner[nameb] !== undefined
                        ? tarteaucitron.cookie.owner[nameb]
                        : '0';
                if (c + a > d + b) {
                    return 1;
                }
                if (c + a < d + b) {
                    return -1;
                }
                return 0;
            });

            if (document.cookie !== '') {
                for (i = 0; i < nb; i += 1) {
                    name = cookies[i]
                        .split('=', 1)
                        .toString()
                        .replace(/ /g, '');
                    if (
                        tarteaucitron.cookie.owner[name] !== undefined &&
                        tarteaucitron.cookie.owner[name].join(' // ') !==
                            savedname
                    ) {
                        savedname =
                            tarteaucitron.cookie.owner[name].join(' // ');
                        html += '<div class="tarteaucitronHidden">';
                        html +=
                            '     <span class="tarteaucitronTitle tarteaucitronH3" role="heading" aria-level="3">';
                        html +=
                            '        ' +
                            tarteaucitron.cookie.owner[name].join(' // ');
                        html += '    </span>';
                        html += '</div><ul class="cookie-list">';
                    } else if (
                        tarteaucitron.cookie.owner[name] === undefined &&
                        host !== savedname
                    ) {
                        savedname = host;
                        html += '<div class="tarteaucitronHidden">';
                        html +=
                            '     <span class="tarteaucitronTitle tarteaucitronH3" role="heading" aria-level="3">';
                        html += '        ' + host;
                        html += '    </span>';
                        html += '</div><ul class="cookie-list">';
                    }
                    html += '<li class="tarteaucitronCookiesListMain">';
                    html +=
                        '    <div class="tarteaucitronCookiesListLeft"><button type="button" class="purgeBtn" data-cookie="' +
                        tarteaucitron.fixSelfXSS(cookies[i].split('=', 1)) +
                        '"><strong>&times;</strong></button> <strong>' +
                        tarteaucitron.fixSelfXSS(name) +
                        '</strong>';
                    html += '    </div>';
                    html +=
                        '    <div class="tarteaucitronCookiesListRight">' +
                        tarteaucitron.fixSelfXSS(
                            cookies[i].split('=').slice(1).join('=')
                        ) +
                        '</div>';
                    html += '</li>';
                }
                html += '</ul>';
            } else {
                html += '<div class="tarteaucitronCookiesListMain">';
                html +=
                    '    <div class="tarteaucitronCookiesListLeft"><strong>-</strong></div>';
                html += '    <div class="tarteaucitronCookiesListRight"></div>';
                html += '</div>';
            }

            html +=
                '<div class="tarteaucitronHidden tarteaucitron-spacer-20"></div>';

            if (document.getElementById('tarteaucitronCookiesList') !== null) {
                document.getElementById('tarteaucitronCookiesList').innerHTML =
                    html;
            }

            if (
                document.getElementById('tarteaucitronCookiesNumber') !== null
            ) {
                document.getElementById(
                    'tarteaucitronCookiesNumber'
                ).innerHTML = nb;
                document
                    .getElementById('tarteaucitronCookiesNumber')
                    .setAttribute(
                        'aria-label',
                        nb +
                            ' cookie' +
                            s +
                            ' - ' +
                            tarteaucitron.lang.toggleInfoBox
                    );
                document
                    .getElementById('tarteaucitronCookiesNumber')
                    .setAttribute(
                        'title',
                        nb +
                            ' cookie' +
                            s +
                            ' - ' +
                            tarteaucitron.lang.toggleInfoBox
                    );
            }

            if (
                document.getElementById('tarteaucitronCookiesNumberBis') !==
                null
            ) {
                document.getElementById(
                    'tarteaucitronCookiesNumberBis'
                ).innerHTML = nb + ' cookie' + s;
            }

            var purgeBtns = document.getElementsByClassName('purgeBtn');
            for (i = 0; i < purgeBtns.length; i++) {
                tarteaucitron.addClickEventToElement(purgeBtns[i], function () {
                    tarteaucitron.cookie.purge([this.dataset.cookie]);
                    tarteaucitron.cookie.number();
                    tarteaucitron.userInterface.jsSizing('cookie');
                    return false;
                });
            }

            for (i = 0; i < tarteaucitron.job.length; i += 1) {
                tarteaucitron.cookie.checkCount(tarteaucitron.job[i]);
            }
        },
    },
    fixSelfXSS: function (html) {
        return html
            .toString()
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    },
    getLanguage: function () {
        'use strict';

        var availableLanguages =
                'ar,bg,ca,cn,cs,da,de,et,el,en,es,fi,fr,hu,it,ja,lb,lt,lv,nl,no,oc,pl,pt,ro,ru,se,sk,sv,tr,uk,vi,zh',
            defaultLanguage = 'en';

        if (tarteaucitronForceLanguage !== '') {
            if (availableLanguages.indexOf(tarteaucitronForceLanguage) !== -1) {
                return tarteaucitronForceLanguage;
            }
        }

        // get the html lang
        if (
            availableLanguages.indexOf(
                document.documentElement.getAttribute('lang').substr(0, 2)
            ) !== -1
        ) {
            return document.documentElement.getAttribute('lang').substr(0, 2);
        }

        if (!navigator) {
            return defaultLanguage;
        }

        var lang =
                navigator.language ||
                navigator.browserLanguage ||
                navigator.systemLanguage ||
                navigator.userLang ||
                null,
            userLanguage = lang ? lang.substr(0, 2) : null;

        if (availableLanguages.indexOf(userLanguage) !== -1) {
            return userLanguage;
        }

        return defaultLanguage;
    },
    getLocale: function () {
        'use strict';
        if (!navigator) {
            return 'en_US';
        }

        var lang =
                navigator.language ||
                navigator.browserLanguage ||
                navigator.systemLanguage ||
                navigator.userLang ||
                null,
            userLanguage = lang ? lang.substr(0, 2) : null;

        if (userLanguage === 'fr') {
            return 'fr_FR';
        } else if (userLanguage === 'en') {
            return 'en_US';
        } else if (userLanguage === 'de') {
            return 'de_DE';
        } else if (userLanguage === 'es') {
            return 'es_ES';
        } else if (userLanguage === 'it') {
            return 'it_IT';
        } else if (userLanguage === 'pt') {
            return 'pt_PT';
        } else if (userLanguage === 'nl') {
            return 'nl_NL';
        } else if (userLanguage === 'el') {
            return 'el_EL';
        } else {
            return 'en_US';
        }
    },
    addScript: function (
        url,
        id,
        callback,
        execute,
        attrName,
        attrVal,
        internal
    ) {
        'use strict';
        var script,
            done = false;

        if (execute === false) {
            if (typeof callback === 'function') {
                callback();
            }
        } else {
            script = document.createElement('script');
            if (id !== undefined) {
                script.id = id;
            }
            script.async = true;
            script.src = url;

            if (attrName !== undefined && attrVal !== undefined) {
                script.setAttribute(attrName, attrVal);
            }

            if (typeof callback === 'function') {
                if (!tarteaucitron.parameters.useExternalJs || !internal) {
                    script.onreadystatechange = script.onload = function () {
                        var state = script.readyState;
                        if (
                            !done &&
                            (!state || /loaded|complete/.test(state))
                        ) {
                            done = true;
                            callback();
                        }
                    };
                } else {
                    callback();
                }
            }

            if (!tarteaucitron.parameters.useExternalJs || !internal) {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        }
    },
    addInternalScript: function (
        url,
        id,
        callback,
        execute,
        attrName,
        attrVal
    ) {
        tarteaucitron.addScript(
            url,
            id,
            callback,
            execute,
            attrName,
            attrVal,
            true
        );
    },
    checkIfExist: function (elemId) {
        'use strict';
        return (
            document.getElementById(elemId) !== null &&
            document.getElementById(elemId).offsetWidth !== 0 &&
            document.getElementById(elemId).offsetHeight !== 0
        );
    },
    makeAsync: {
        antiGhost: 0,
        buffer: '',
        init: function (url, id) {
            'use strict';
            var savedWrite = document.write,
                savedWriteln = document.writeln;

            document.write = function (content) {
                tarteaucitron.makeAsync.buffer += content;
            };
            document.writeln = function (content) {
                tarteaucitron.makeAsync.buffer += content.concat('\n');
            };

            setTimeout(function () {
                document.write = savedWrite;
                document.writeln = savedWriteln;
            }, 20000);

            tarteaucitron.makeAsync.getAndParse(url, id);
        },
        getAndParse: function (url, id) {
            'use strict';
            if (tarteaucitron.makeAsync.antiGhost > 9) {
                tarteaucitron.makeAsync.antiGhost = 0;
                return;
            }
            tarteaucitron.makeAsync.antiGhost += 1;
            tarteaucitron.addInternalScript(url, '', function () {
                if (document.getElementById(id) !== null) {
                    document.getElementById(id).innerHTML +=
                        "<span class='tarteaucitron-display-none'>&nbsp;</span>" +
                        tarteaucitron.makeAsync.buffer;
                    tarteaucitron.makeAsync.buffer = '';
                    tarteaucitron.makeAsync.execJS(id);
                }
            });
        },
        execJS: function (id) {
            /* not strict because third party scripts may have errors */
            var i, scripts, childId, type;

            if (document.getElementById(id) === null) {
                return;
            }

            scripts = document
                .getElementById(id)
                .getElementsByTagName('script');
            for (i = 0; i < scripts.length; i += 1) {
                type =
                    scripts[i].getAttribute('type') !== null
                        ? scripts[i].getAttribute('type')
                        : '';
                if (type === '') {
                    type =
                        scripts[i].getAttribute('language') !== null
                            ? scripts[i].getAttribute('language')
                            : '';
                }
                if (
                    scripts[i].getAttribute('src') !== null &&
                    scripts[i].getAttribute('src') !== ''
                ) {
                    childId = id + Math.floor(Math.random() * 99999999999);
                    document.getElementById(id).innerHTML +=
                        '<div id="' + childId + '"></div>';
                    tarteaucitron.makeAsync.getAndParse(
                        scripts[i].getAttribute('src'),
                        childId
                    );
                } else if (type.indexOf('javascript') !== -1 || type === '') {
                    // eval(scripts[i].innerHTML);
                    const scriptContent = scripts[i].innerHTML;
                    const scriptElement = document.createElement('script');
                    scriptElement.textContent = scriptContent;
                    document.body.appendChild(scriptElement);
                }
            }
        },
    },
    fallback: function (matchClass, content, noInner) {
        'use strict';
        var elems = document.getElementsByTagName('*'),
            i,
            index = 0;

        for (i in elems) {
            if (elems[i] !== undefined) {
                for (index = 0; index < matchClass.length; index += 1) {
                    if (
                        (' ' + elems[i].className + ' ').indexOf(
                            ' ' + matchClass[index] + ' '
                        ) > -1
                    ) {
                        if (typeof content === 'function') {
                            if (noInner === true) {
                                content(elems[i]);
                            } else {
                                elems[i].innerHTML = content(elems[i]);
                            }
                        } else {
                            elems[i].innerHTML = content;
                        }
                    }
                }
            }
        }
    },
    engage: function (id) {
        'use strict';
        let r = Math.floor(Math.random() * 100000),
            engage = `${tarteaucitron.services[id].name} ${tarteaucitron.lang.fallback}`;

        if (tarteaucitron.lang['engage-' + id] !== undefined) {
            engage = tarteaucitron.lang['engage-' + id];
        }

        let html = `<div class="fr-consent-placeholder tac_activate tac_activate_${id}">`;
        html += `<h4 class="fr-h6">${engage}</h4>`;
        html += `<p>${tarteaucitron.lang.allowFeature}</p>`;
        html += `<button class="fr-btn tarteaucitronAllow" type="button" id="Eng${r}ed${id}" title="${tarteaucitron.lang.allowService} ${tarteaucitron.services[id].name}">${tarteaucitron.lang.allow}</button>`;
        html += `</div>`;
        return html;
    },
    extend: function (a, b) {
        'use strict';
        var prop;
        for (prop in b) {
            if (b.hasOwnProperty(prop)) {
                a[prop] = b[prop];
            }
        }
    },
    proTemp: '',
    proTimer: function () {
        'use strict';
        setTimeout(
            tarteaucitron.proPing,
            Math.floor(Math.random() * (1200 - 500 + 1)) + 500
        );
    },
    pro: function (list) {
        'use strict';
        tarteaucitron.proTemp += list;
        clearTimeout(tarteaucitron.proTimer);
        tarteaucitron.proTimer = setTimeout(
            tarteaucitron.proPing,
            Math.floor(Math.random() * (1200 - 500 + 1)) + 500
        );
    },
    proPing: function () {
        'use strict';
        if (
            tarteaucitron.uuid !== '' &&
            tarteaucitron.uuid !== undefined &&
            tarteaucitron.proTemp !== '' &&
            tarteaucitronStatsEnabled
        ) {
            var div = document.getElementById('tarteaucitronPremium'),
                timestamp = new Date().getTime(),
                url = 'https://tarteaucitron.io/log/?';

            if (div === null) {
                return;
            }

            url += 'account=' + tarteaucitron.uuid + '&';
            url += 'domain=' + tarteaucitron.domain + '&';
            url += 'status=' + encodeURIComponent(tarteaucitron.proTemp) + '&';
            url += '_time=' + timestamp;

            div.innerHTML =
                '<img src="' +
                url +
                '" class="tarteaucitron-display-none" alt="" />';

            tarteaucitron.proTemp = '';
        }

        tarteaucitron.cookie.number();
    },
    AddOrUpdate: function (source, custom) {
        /**
         Utility function to Add or update the fields of obj1 with the ones in obj2
         */
        for (var key in custom) {
            if (custom[key] instanceof Object) {
                source[key] = tarteaucitron.AddOrUpdate(
                    source[key],
                    custom[key]
                );
            } else {
                source[key] = custom[key];
            }
        }
        return source;
    },
    getElemWidth: function (elem) {
        return elem.getAttribute('width') || elem.clientWidth;
    },
    getElemHeight: function (elem) {
        return elem.getAttribute('height') || elem.clientHeight;
    },
    getElemAttr: function (elem, attr) {
        var attribute =
            elem.getAttribute('data-' + attr) || elem.getAttribute(attr);

        if (typeof attribute === 'string') {
            return tarteaucitron.fixSelfXSS(attribute);
        }

        return '';
    },
    addClickEventToId: function (elemId, func) {
        tarteaucitron.addClickEventToElement(
            document.getElementById(elemId),
            func
        );
    },
    addClickEventToElement: function (e, func) {
        if (e) {
            if (e.addEventListener) {
                e.addEventListener('click', func);
            } else {
                e.attachEvent('onclick', func);
            }
        }
    },
    triggerJobsAfterAjaxCall: function () {
        tarteaucitron.job.forEach(function (e) {
            tarteaucitron.job.push(e);
        });
        var i;
        var allowBtns = document.getElementsByClassName('tarteaucitronAllow');
        for (i = 0; i < allowBtns.length; i++) {
            tarteaucitron.addClickEventToElement(allowBtns[i], function () {
                tarteaucitron.userInterface.respond(this, true);
            });
        }
        var denyBtns = document.getElementsByClassName('tarteaucitronDeny');
        for (i = 0; i < denyBtns.length; i++) {
            tarteaucitron.addClickEventToElement(denyBtns[i], function () {
                tarteaucitron.userInterface.respond(this, false);
            });
        }
    },
};
