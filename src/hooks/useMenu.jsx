import { useQuery } from '@tanstack/react-query';

const useMenu = () => {
	// useEffect(() => {
	// 	fetch('https://bistro-boss-server-tobibur2021.vercel.app/menu')
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			setMenu(data);
	// 			setLoading(false);
	// 		});
	// }, []);

	const {
		data: menu = [],
		refetch,
		isLoading: loading,
	} = useQuery({
		queryKey: ['menu'],
		queryFn: async () => {
			const res = await fetch(
				'https://bistro-boss-server-tobibur2021.vercel.app/menu'
			);
			return res.json();
		},
	});
	return [menu, refetch, loading];
};

export default useMenu;
