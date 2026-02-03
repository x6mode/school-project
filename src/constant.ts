const AppRoutes = {
  Main: '/',
  Login: '/auth/login',
  Register: '/auth/register',
  Product: '/product/:id',
  Profile: '/profile',
};

const contactLink = 'https://t.me/Skam228_1448';
const siteCreatorLink = 'https://t.me/geforce3050';

const ThemeStorageKey = 'app-theme';

const MIN_WIDTH_FOR_ANIM_HEADER = '64rem';

// const BASE_URL = 'http://localhost:5000/api';
const BASE_URL = 'http://192.168.3.8:5000/api';

const BackendRoutes = {
  Products: '/products',
  Product: '/products/:id',
  Buyers: '/product/:id/buyers/',
  Photo: '/photos/:id/',
  BuyProduct: '/product/buy/',
  Login: '/auth/login/',
  Register: '/auth/register/',
  Profile: '/auth/profile/',
};

const disableOutsideClickFunctions = {
  onEscapeKeyDown: (e: KeyboardEvent) => e.preventDefault(),
  onPointerDown: (e: React.PointerEvent) => e.preventDefault(),
  onInteractOutside: (e: { preventDefault: () => any }) => e.preventDefault(),
};

const animationNormally = {
  duration: 0.3,
};

export {
  AppRoutes,
  contactLink,
  siteCreatorLink,
  ThemeStorageKey,
  BASE_URL,
  BackendRoutes,
  MIN_WIDTH_FOR_ANIM_HEADER,
  disableOutsideClickFunctions,
  animationNormally,
};
