import module from 'module';
export const getPackagePath = (pckName) => {
  const pnp = module.findPnpApi('');
  return pnp.resolveToUnqualified(pckName,'./');
};
