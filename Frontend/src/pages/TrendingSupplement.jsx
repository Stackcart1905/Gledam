import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useCart } from '@/context/useCart';
import Footer from '@/components/footer/Footer';

// Simple demo data (can be replaced with real products later)
const demoProducts = Array.from({ length: 24 }, (_, i) => ({
	id: i + 1,
	name: `Product ${i + 1}`,
	price: 199 + (i % 9) * 50,
	inStock: i % 4 !== 0, // 75% in stock
	image:
		'https://www.bing.com/images/search?view=detailV2&ccid=2MRzMtHa&id=4BA3809F1ED480410C855757C265068F18F3B0BE&thid=OIP.2MRzMtHaA4DVmDzWH_1K8AHaHg&mediaurl=https%3a%2f%2fonemg.gumlet.io%2fl_watermark_346%2cw_690%2ch_700%2fa_ignore%2cw_690%2ch_700%2cc_pad%2cq_auto%2cf_auto%2fc4b851abdaa14773afe44eff17ca655f.jpg&exph=700&expw=690&q=beastlife+products&FORM=IRPRST&ck=393C57511AAAE8C9D444AEB968863C2E&selectedIndex=5&itb=1',
	rating: 3.5 + ((i % 5) * 0.3), // ~3.5 to ~4.7
	createdAt: Date.now() - i * 24 * 60 * 60 * 1000, // newer items have smaller i
	sizes: ['250g', '500g', '1kg'],
}));

const TrendingSupplement = () => {
	// Filters
	const [priceFrom, setPriceFrom] = useState('');
	const [priceTo, setPriceTo] = useState('');
	const [availability, setAvailability] = useState({ in: true, out: true });
	const [openPrice, setOpenPrice] = useState(false);
	const [openAvailability, setOpenAvailability] = useState(false);
	const priceRef = useRef(null);
	const availRef = useRef(null);

	// Sort
	const [sortBy, setSortBy] = useState('featured');
		const { addItem } = useCart();

	// Pagination
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 12; // 4 per row x 3 rows

	const filtered = useMemo(() => {
		let list = [...demoProducts];
		// Price filter
		const from = Number(priceFrom);
		const to = Number(priceTo);
		if (!Number.isNaN(from) && priceFrom !== '') list = list.filter((p) => p.price >= from);
		if (!Number.isNaN(to) && priceTo !== '') list = list.filter((p) => p.price <= to);

		// Availability
		list = list.filter((p) => (p.inStock && availability.in) || (!p.inStock && availability.out));

		// Sorting
		switch (sortBy) {
			case 'price-asc':
				list.sort((a, b) => a.price - b.price);
				break;
			case 'price-desc':
				list.sort((a, b) => b.price - a.price);
				break;
			case 'newest':
				list.sort((a, b) => b.createdAt - a.createdAt);
				break;
			case 'rating-desc':
				list.sort((a, b) => b.rating - a.rating);
				break;
			case 'rating-asc':
				list.sort((a, b) => a.rating - b.rating);
				break;
			case 'name-asc':
				list.sort((a, b) => a.name.localeCompare(b.name));
				break;
			case 'name-desc':
				list.sort((a, b) => b.name.localeCompare(a.name));
				break;
			// 'featured' keeps original order
		}

		return list;
	}, [priceFrom, priceTo, availability, sortBy]);

	// Reset to page 1 whenever filters/sort change
	useEffect(() => {
		setCurrentPage(1);
	}, [priceFrom, priceTo, availability, sortBy]);

	const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
	const pageStart = (currentPage - 1) * pageSize;
	const visible = filtered.slice(pageStart, pageStart + pageSize);

		// Close dropdowns on outside click / Escape
		useEffect(() => {
			const onClick = (e) => {
				if (openPrice && priceRef.current && !priceRef.current.contains(e.target)) {
					setOpenPrice(false);
				}
				if (openAvailability && availRef.current && !availRef.current.contains(e.target)) {
					setOpenAvailability(false);
				}
			};
			const onKey = (e) => {
				if (e.key === 'Escape') {
					setOpenPrice(false);
					setOpenAvailability(false);
				}
			};
			document.addEventListener('mousedown', onClick);
			document.addEventListener('keydown', onKey);
			return () => {
				document.removeEventListener('mousedown', onClick);
				document.removeEventListener('keydown', onKey);
			};
		}, [openPrice, openAvailability]);

	return (
		<div className="w-full bg-white">
			<div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
				{/* Heading */}
				<h3 className="text-2xl sm:text-3xl items-center font-bold text-black mb-6">Trending Supplement</h3>

								{/* Top controls row: filters on left, sort and count on right */}
						<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
							{/* Filters left as inline dropdowns */}
									<div className="relative flex items-center gap-3">
								<span className="text-sm font-semibold text-black">Filter:</span>
								{/* Price dropdown button */}
										<div className="relative" ref={priceRef}>
									<button
												className="text-sm border border-gray-300 rounded px-3 py-1 bg-white hover:bg-gray-50"
												aria-haspopup="dialog"
												aria-expanded={openPrice}
												onClick={() => {
													setOpenPrice((v) => !v);
													setOpenAvailability(false);
												}}
									>
										Price
									</button>
									{openPrice && (
												<div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-20 ring-1 ring-black/5">
													<div className="mb-2 text-sm font-semibold text-black">Price</div>
													<div className="grid grid-cols-2 gap-3">
														<div>
															<label className="block text-xs text-gray-600 mb-1">From (₹)</label>
															<input
																type="number"
																inputMode="numeric"
																placeholder="0"
																value={priceFrom}
																onChange={(e) => setPriceFrom(e.target.value)}
																className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
																min={0}
															/>
														</div>
														<div>
															<label className="block text-xs text-gray-600 mb-1">To (₹)</label>
															<input
																type="number"
																inputMode="numeric"
																placeholder="e.g. 2000"
																value={priceTo}
																onChange={(e) => setPriceTo(e.target.value)}
																className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
																min={0}
															/>
														</div>
													</div>
													{priceFrom !== '' && priceTo !== '' && Number(priceFrom) > Number(priceTo) && (
														<div className="mt-2 text-xs text-red-600">From must be less than or equal to To.</div>
													)}
													<div className="mt-3 flex items-center justify-end gap-2">
														<button
															className="text-xs px-3 py-1 rounded border border-gray-300 hover:bg-gray-50"
															onClick={() => {
																setPriceFrom('');
																setPriceTo('');
																setOpenPrice(false);
															}}
														>
															Clear
														</button>
														<button
															className="text-xs px-3 py-1 rounded text-white"
															style={{ backgroundColor: '#000' }}
															disabled={priceFrom !== '' && priceTo !== '' && Number(priceFrom) > Number(priceTo)}
															onClick={() => setOpenPrice(false)}
														>
															Apply
														</button>
													</div>
										</div>
									)}
								</div>

								{/* Availability dropdown button */}
										<div className="relative" ref={availRef}>
									<button
												className="text-sm border border-gray-300 rounded px-3 py-1 bg-white hover:bg-gray-50"
												aria-haspopup="dialog"
												aria-expanded={openAvailability}
												onClick={() => {
													setOpenAvailability((v) => !v);
													setOpenPrice(false);
												}}
									>
										Availability
									</button>
									{openAvailability && (
												<div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-20 ring-1 ring-black/5">
													<div className="mb-2 text-sm font-semibold text-black">Availability</div>
													<div className="flex flex-col gap-2">
														<label className="flex items-center gap-2 text-sm text-gray-800">
															<input
																type="checkbox"
																checked={availability.in}
																onChange={(e) => setAvailability((s) => ({ ...s, in: e.target.checked }))}
															/>
															In stock
														</label>
														<label className="flex items-center gap-2 text-sm text-gray-800">
															<input
																type="checkbox"
																checked={availability.out}
																onChange={(e) => setAvailability((s) => ({ ...s, out: e.target.checked }))}
															/>
															Out of stock
														</label>
													</div>
													<div className="mt-3 flex items-center justify-end">
														<button
															className="text-xs px-3 py-1 rounded text-white"
															style={{ backgroundColor: '#000' }}
															onClick={() => setOpenAvailability(false)}
														>
															Done
														</button>
													</div>
										</div>
									)}
								</div>
							</div>

							{/* Sort and total on right */}
							<div className="flex items-center gap-4 md:ml-auto">
								<div className="flex items-center gap-2">
									<span className="text-sm font-semibold text-black">Sort by:</span>
									<select
										value={sortBy}
										onChange={(e) => setSortBy(e.target.value)}
										className="border border-gray-300 rounded px-2 py-1 text-sm"
									>
										<option value="featured">Featured</option>
										<option value="newest">Newest</option>
										<option value="rating-desc">Rating: High to Low</option>
										<option value="rating-asc">Rating: Low to High</option>
										<option value="name-asc">Name: A to Z</option>
										<option value="name-desc">Name: Z to A</option>
										<option value="price-asc">Price: Low to High</option>
										<option value="price-desc">Price: High to Low</option>
									</select>
								</div>
								<div className="text-sm text-gray-600 whitespace-nowrap">Total products: {filtered.length}</div>
							</div>
						</div>

						{/* Grid of products */}
						<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
							{visible.map((p) => (
								<div key={p.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
									<div className="bg-gray-100 flex items-center justify-center" style={{ height: 400 }}>
										<img src={p.image} alt={p.name} className="w-full h-full object-contain" />
									</div>
									<div className="p-3">
										<div className="text-sm font-semibold text-black line-clamp-1">{p.name}</div>
										<div className="text-xs text-gray-500 mt-1">Rating: {p.rating.toFixed(1)}/5</div>
										<div className="text-sm font-bold text-black mt-1">₹{p.price}</div>
										<button
											className="mt-2 w-full !text-black text-sm font-semibold py-2 rounded-md focus:outline-none hover:opacity-80 transition-opacity border-none"
											style={{ backgroundColor: '#CCFF00', color: '#000000' }}
											onClick={() => addItem({ id: p.id, name: p.name, price: p.price, image: p.image })}
										>
											Add to cart
										</button>
									</div>
								</div>
							))}
						</div>

						{/* Pagination controls */}
						<div className="mt-8 flex items-center justify-center gap-2">
							<button
								className={`px-3 py-1 rounded border text-sm ${currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-50'}`}
								onClick={() => currentPage > 1 && setCurrentPage((p) => p - 1)}
								disabled={currentPage === 1}
							>
								Prev
							</button>
							{Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
								<button
									key={n}
									className={`px-3 py-1 rounded border text-sm ${n === currentPage ? 'bg-black text-white border-black' : 'hover:bg-gray-50'}`}
									onClick={() => setCurrentPage(n)}
								>
									{n}
								</button>
							))}
							<button
								className={`px-3 py-1 rounded border text-sm ${currentPage === totalPages ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-50'}`}
								onClick={() => currentPage < totalPages && setCurrentPage((p) => p + 1)}
								disabled={currentPage === totalPages}
							>
								Next
							</button>
						</div>

						{/* Divider + Back to Top */}
						<section className="w-full bg-white mt-12">
							<hr className="mt-8 border-t border-black w-full" />
							<div className="mt-6 flex justify-center">
								<button
									type="button"
									onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
									className="inline-flex items-center gap-2 font-semibold text-black hover:underline"
									aria-label="Back to top"
								>
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M12 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
										<path d="M6 11l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
									Back to Top
								</button>
							</div>
						</section>

				</div>
				{/* Footer: full width, no outer padding/margin */}
				<Footer />
			</div>
	);
};

export default TrendingSupplement;
