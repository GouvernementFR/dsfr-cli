import { replaceFragment } from '../../core/replace-fragments.js';

export default function (tarteaucitron, legalNoticeLink) {
    return {
        ...tarteaucitron,
        alertBigPrivacy: {
            title: tarteaucitron?.alertBigPrivacy?.title,
            content: replaceFragment(
                tarteaucitron?.alertBigPrivacy?.content,
                legalNoticeLink
            ),
        },
    };
}
