import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const redirectToWallet = (businessId, path) => {
  cookies.set('current_business', businessId, {
    path: '/',
    domain: 'aoncover.test',
  });
  console.log(cookies.get('current_business'));
  if (cookies.get('current_business')) {
    location.href = `http://wallet.aoncover.test/${path}`;
  }
};
