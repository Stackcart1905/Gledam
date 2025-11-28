// Centralized product data helpers backed by backend API.
// Exposes CRUD + analytics utilities for the Admin Dashboard.

import * as productApi from "@/lib/api/products";

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

// Fetch products from backend
export async function getProducts() {
  try {
    const products = await productApi.fetchProducts();
    // Transform backend product data to frontend format if needed
    return products.map(product => ({
      ...product,
      id: product._id, // Map _id to id for frontend consistency
    }));
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

// Add product to backend
export async function addProduct(product) {
  try {
    // Transform frontend product data to backend format if needed
    const productData = {
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock || 0,
      imageUrl: product.imageUrl || '',
      status: product.status || 'active',
    };
    
    const newProduct = await productApi.createProduct(productData);
    return newProduct._id; // Return the backend ID
  } catch (error) {
    console.error("Failed to add product:", error);
    throw error;
  }
}

// Update product in backend
export async function updateProduct(id, patch) {
  try {
    await productApi.patchProduct(id, patch);
    return true;
  } catch (error) {
    console.error("Failed to update product:", error);
    return false;
  }
}

// Delete product from backend
export async function deleteProduct(id) {
  try {
    await productApi.removeProduct(id);
    return true;
  } catch (error) {
    console.error("Failed to delete product:", error);
    return false;
  }
}

export async function getProductsByCategory(category) {
	const products = await getProducts();
	return products.filter(p => p.category === category);
}

export async function getProductsForSection(section) {
	const all = await getProducts();
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

// Basic inventory analytics useful for an initial admin view
export async function getInventoryAnalytics() {
	try {
		const analytics = await productApi.fetchAnalytics();
		return analytics;
	} catch (error) {
		console.error("Failed to fetch analytics:", error);
		return {
			totalProducts: 0,
			totalStock: 0,
			inventoryValue: 0,
			avgPrice: 0,
			byCategory: {},
			lowStock: [],
		};
	}
}

export default {
	CATEGORIES,
	getProducts,
	addProduct,
	updateProduct,
	deleteProduct,
	getProductsByCategory,
	getInventoryAnalytics,
};

