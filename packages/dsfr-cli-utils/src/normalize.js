export const normalize = (str) => str.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[\s'’]/g, '-')
    .replace(/--/g, '-')
    .replace(/[^a-z0-9-]/g, '');
