import { tarteaucitron } from './tarteaucitron/tarteaucitron';
import { getCurrentRepo } from '../core/get-current-repo';
import config from './tarteaucitron/config';
import tacLang from './tarteaucitron/lang';

import {
    youtube,
    vimeo,
    // dailymotion,
    // twitterembed,
    // instagram,
    // facebook,
} from './tarteaucitron/services';

class ConsentManagementPlatform {
    constructor(data) {
        this._data = data;
        this._legalNoticeLink =
            getCurrentRepo() + this._data?.tarteaucitron?.legalNoticeLink;
        this._services = [
            youtube,
            vimeo,
            // dailymotion,
            // twitterembed,
            // instagram,
            // facebook,
        ];
        this.tac = tarteaucitron;
    }

    get services() {
        return this._services.map((service) => service.key);
    }

    get tacConfig() {
        return config(this._legalNoticeLink);
    }

    addServices() {
        this._services.forEach(
            (service) => (this.tac.services[service.key] = service)
        );
    }

    addJobs() {
        this.tac.job = this.tac.job || [];
        this._services.forEach((service) => {
            if (!this.tac.job.includes(service.key))
                this.tac.job.push(service.key);
        });
    }

    loadLang() {
        Object.assign(
            this.tac.lang,
            tacLang(this._data?.tarteaucitron, this._legalNoticeLink)
        );
    }

    initTac() {
        this.loadLang();
        this.tac.init(this.tacConfig);
    }

    init() {
        this.addServices();
        this.addJobs();
        this.initTac();
    }
}

export { ConsentManagementPlatform };
