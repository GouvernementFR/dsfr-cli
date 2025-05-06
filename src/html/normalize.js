export const normalize = str => str.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[\s'’]/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--/g, '-')
    .replace(/^-/, '')
    .replace(/-$/, '');

export const normalizeId = str => str.replace(/^\//, '').replace(/[^a-zA-Z0-9 \-_.]/g, '.');
