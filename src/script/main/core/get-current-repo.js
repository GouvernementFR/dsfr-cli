const getCurrentRepo = () => {
  const pathArray = window.location.pathname.split('/');
  return `/${pathArray.splice(1, 2).join('/')}`;
};

export { getCurrentRepo };
