import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const redirectToWallet = (businessId, path) => {
  cookies.set('current_business', businessId, {
    path: '/',
    domain: 'aoncover.test',
  });
  location.href = `http://wallet.aoncover.test:3022/${path}`;
};
