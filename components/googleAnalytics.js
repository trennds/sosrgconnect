import ReactGA from 'react-ga';

export const initGA = () => {
	ReactGA.initialize('216988698');
};

export const logPageView = () => {
	ReactGA.set({ page: window.location.pathname });
	ReactGA.pageview(window.location.pathname);
};
