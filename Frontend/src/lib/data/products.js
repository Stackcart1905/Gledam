// Centralized product data helpers backed by localStorage.
// Keeps initial sample data and exposes CRUD + analytics utilities for the Admin Dashboard.

const STORAGE_KEY = 'gledam.products';
const STORAGE_KEY_COMBOS = 'gledam.combos';

// Canonical categories used across the app (match navbar intent)
export const CATEGORIES = [
	'Creatine',
	'Protein Powder',
	'Mass Gainer',
	'Multivitamins',
	'BCAA',
	'Omega',
	'Magnesium',
	'Peanut Butter',
	'Apparel & Accessories',
  'Super Saver Combo',
];

// Minimal sample data to make category pages and analytics non-empty on first load.
const initialProducts = [
	{
		id: 'p1',
		name: 'Micronized Creatine Monohydrate 250g',
		category: 'Creatine',
		price: 1299,
		stock: 25,
		imageUrl: 'https://images.unsplash.com/photo-1724160167780-1aef4db75030?q=80&w=600&auto=format&fit=crop',
		status: 'active',
	},
	{
		id: 'p2',
		name: 'Whey Protein Isolate 1kg - Chocolate',
		category: 'Protein Powder',
		price: 3999,
		stock: 12,
		imageUrl: 'https://images.unsplash.com/photo-1680265158261-5fd6ba5d9959?q=80&w=600&auto=format&fit=crop',
		status: 'active',
	},
	{
		id: 'p3',
		name: 'Mass Gainer 5lb - Vanilla',
		category: 'Mass Gainer',
		price: 2999,
		stock: 8,
		imageUrl: 'https://m.media-amazon.com/images/I/81EtoZyZJgL._UF1000,1000_QL80_.jpg',
		status: 'active',
	},
	{
		id: 'p4',
		name: 'Daily Multivitamin 60 Tabs',
		category: 'Multivitamins',
		price: 799,
		stock: 40,
		imageUrl: 'https://images.unsplash.com/photo-1665757516805-ead01c014ceb?w=600&auto=format&fit=crop&q=60',
		status: 'active',
	},
	{
		id: 'p5',
		name: 'BCAA 2:1:1 300g - Mango',
		category: 'BCAA',
		price: 1499,
		stock: 18,
		imageUrl: 'https://images.unsplash.com/photo-1709976142888-6dc0ed1ed78c?q=80&w=600&auto=format&fit=crop',
		status: 'active',
	},
		// Wellness and grocery-style add-ons
		{
			id: 'p6',
			name: 'Omega-3 Fish Oil 60 Softgels',
			category: 'Omega',
			price: 999,
			stock: 30,
			imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop',
			status: 'active',
		},
		{
			id: 'p7',
			name: 'Magnesium Glycinate 120 Caps',
			category: 'Magnesium',
			price: 1099,
			stock: 15,
			imageUrl: 'https://images.unsplash.com/photo-1615485737651-6f46d6862331?q=80&w=600&auto=format&fit=crop',
			status: 'active',
		},
			{
				id: 'p8',
				name: 'Natural Peanut Butter 1kg',
				category: 'Peanut Butter',
				price: 499,
				stock: 20,
				imageUrl: 'https://images.unsplash.com/photo-1582659042044-ec8a2d3aa76a?q=80&w=600&auto=format&fit=crop',
				status: 'active',
			},
			// Apparel samples
			{
				id: 'p9',
				name: 'Oversize T-Shirt - Black',
				category: 'Apparel & Accessories',
				price: 799,
				stock: 50,
				imageUrl: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=600&auto=format&fit=crop',
				status: 'active',
			},
			{
				id: 'p10',
				name: 'Wrist Band (Pair)',
				category: 'Apparel & Accessories',
				price: 299,
				stock: 100,
				imageUrl: 'https://images.unsplash.com/photo-1554843071-094a2fdae834?q=80&w=600&auto=format&fit=crop',
				status: 'active',
			},
			{
				id: 'p11',
				name: 'Weight Lifting Belt',
				category: 'Apparel & Accessories',
				price: 1499,
				stock: 15,
				imageUrl: 'https://images.unsplash.com/photo-1596357395104-5d59f0b1721a?q=80&w=600&auto=format&fit=crop',
				status: 'active',
			},
			{
				id: 'p12',
				name: 'Shaker Bottle 700ml',
				category: 'Apparel & Accessories',
				price: 399,
				stock: 60,
				imageUrl: 'https://images.unsplash.com/photo-1610360655722-312723f8bb5b?q=80&w=600&auto=format&fit=crop',
				status: 'active',
			},
];

function safeParse(json, fallback) {
	try {
		const v = JSON.parse(json);
		if (Array.isArray(v)) return v;
		return fallback;
	} catch (_) {
		return fallback;
	}
}

export function getProducts() {
	if (typeof window === 'undefined') return [...initialProducts];
	const raw = window.localStorage.getItem(STORAGE_KEY);
	const parsed = safeParse(raw, null);
	if (!parsed) {
		// Seed once
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
		return [...initialProducts];
	}
	return parsed;
}

export function saveProducts(list) {
	if (typeof window === 'undefined') return;
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function addProduct(product) {
	const products = getProducts();
	const id = product.id || `p_${Date.now()}`;
	const next = [{ ...product, id }, ...products];
	saveProducts(next);
	return id;
}

export function updateProduct(id, patch) {
	const products = getProducts();
	const idx = products.findIndex(p => p.id === id);
	if (idx === -1) return false;
	products[idx] = { ...products[idx], ...patch };
	saveProducts(products);
	return true;
}

export function deleteProduct(id) {
	const products = getProducts();
	const next = products.filter(p => p.id !== id);
	saveProducts(next);
}

export function getProductsByCategory(category) {
	const products = getProducts();
	return products.filter(p => p.category === category);
}

export function getProductsForSection(section) {
	const all = getProducts();
	switch (section) {
		case 'bestseller':
			return all; // naive bestseller = all for now
		case 'creatine':
			return all.filter(p => p.category === 'Creatine');
		case 'protein':
			return all.filter(p => p.category === 'Protein Powder');
		case 'wellness':
			return all.filter(p => ['Multivitamins', 'Omega', 'Magnesium'].includes(p.category));
		default:
			return all;
	}
}

	// Combos store (for Super Saver Combos)
	function safeParseObj(json, fallback) {
		try {
			const v = JSON.parse(json);
			if (Array.isArray(v)) return v;
			return fallback;
		} catch (_) {
			return fallback;
		}
	}

	export function getCombos() {
		if (typeof window === 'undefined') return [];
		const raw = window.localStorage.getItem(STORAGE_KEY_COMBOS);
		return safeParseObj(raw, []);
	}

	export function saveCombos(list) {
		if (typeof window === 'undefined') return;
		window.localStorage.setItem(STORAGE_KEY_COMBOS, JSON.stringify(list));
	}

	export function addCombo(combo) {
		const combos = getCombos();
		const id = combo.id || `c_${Date.now()}`;
		const next = [{ ...combo, id }, ...combos];
		saveCombos(next);
		return id;
	}

	export function updateCombo(id, patch) {
		const combos = getCombos();
		const idx = combos.findIndex(c => c.id === id);
		if (idx === -1) return false;
		combos[idx] = { ...combos[idx], ...patch };
		saveCombos(combos);
		return true;
	}

	export function deleteCombo(id) {
		const combos = getCombos();
		saveCombos(combos.filter(c => c.id !== id));
	}

	export function computeComboPricing(combo) {
		const products = getProducts();
		const list = (combo.productIds || []).map(pid => products.find(p => p.id === pid)).filter(Boolean);
		const mrp = list.reduce((n, p) => n + (Number(p.price) || 0), 0);
		const price = Math.max(0, Math.round(mrp * (1 - (Number(combo.discountPct) || 0) / 100)));
		return { mrp, price };
	}

// Basic inventory analytics useful for an initial admin view
export function getInventoryAnalytics() {
	const products = getProducts();
	const totalProducts = products.length;
	const totalStock = products.reduce((n, p) => n + (Number(p.stock) || 0), 0);
	const inventoryValue = products.reduce((n, p) => n + (Number(p.price) || 0) * (Number(p.stock) || 0), 0);
	const avgPrice = totalProducts ? (products.reduce((n, p) => n + (Number(p.price) || 0), 0) / totalProducts) : 0;

	const byCategory = CATEGORIES.reduce((acc, c) => {
		const list = products.filter(p => p.category === c);
		acc[c] = {
			count: list.length,
			stock: list.reduce((n, p) => n + (Number(p.stock) || 0), 0),
			value: list.reduce((n, p) => n + (Number(p.price) || 0) * (Number(p.stock) || 0), 0),
		};
		return acc;
	}, {});

	// find low stock products
	const lowStock = products.filter(p => (Number(p.stock) || 0) <= 5).slice(0, 10);

	return {
		totalProducts,
		totalStock,
		inventoryValue,
		avgPrice,
		byCategory,
		lowStock,
	};
}

export function resetToInitialProducts() {
	saveProducts(initialProducts);
}

export default {
	CATEGORIES,
	getProducts,
	saveProducts,
	addProduct,
	updateProduct,
	deleteProduct,
	getProductsByCategory,
	getInventoryAnalytics,
	resetToInitialProducts,
};

