import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import { cloudinaryService } from "../cloudinary";
import type { Product, Collection } from "@/data/products";

const PRODUCTS_COLLECTION = "products";
const COLLECTIONS_COLLECTION = "collections";

// Products CRUD operations
export const productsService = {
  // Get all products
  async getAll(): Promise<Product[]> {
    const q = query(collection(db, PRODUCTS_COLLECTION), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  },

  // Get product by ID
  async getById(id: string): Promise<Product | null> {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Product;
    }
    return null;
  },

  // Get products by category
  async getByCategory(category: string): Promise<Product[]> {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where("category", "==", category),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  },

  // Add new product
  async create(product: Omit<Product, "id">): Promise<string> {
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
      ...product,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return docRef.id;
  },

  // Update product
  async update(id: string, product: Partial<Omit<Product, "id">>): Promise<void> {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await updateDoc(docRef, {
      ...product,
      updatedAt: new Date().toISOString(),
    });
  },

  // Delete product
  async delete(id: string): Promise<void> {
    // Note: Images in Cloudinary will remain (free tier limitation)
    // To delete images, you'd need a backend with Cloudinary admin API
    // For now, we just delete the product document from Firestore
    
    // Delete product document
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await deleteDoc(docRef);
  },

  // Upload image to Cloudinary
  async uploadImage(file: File, productId?: string): Promise<string> {
    const folder = productId ? `products/${productId}` : "products";
    return await cloudinaryService.uploadImage(file, folder);
  },
};

// Collections CRUD operations
export const collectionsService = {
  // Get all collections
  async getAll(): Promise<Collection[]> {
    const q = query(collection(db, COLLECTIONS_COLLECTION), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Collection[];
  },

  // Get collection by slug
  async getBySlug(slug: string): Promise<Collection | null> {
    const q = query(collection(db, COLLECTIONS_COLLECTION), where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as Collection;
    }
    return null;
  },
};

