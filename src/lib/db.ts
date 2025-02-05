import { useState, useEffect } from "react";

const API_URL = "http://localhost:8080/songbook/";

export interface Product {
  _id: string;
  title: string;
  artist: string;
  lyrics: string;
}

export function useProducts(search: string, offset: number) {
  const [products, setProducts] = useState<Product[]>([]);
  const [newOffset, setNewOffset] = useState<number | null>(offset);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (search) {
          setProducts(data);
          setNewOffset(null);
          setTotalProducts(0);
        } else {
          setProducts(data);
          setNewOffset(data.length >= 5 ? offset + 5 : null);
          setTotalProducts(data.length);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [search, offset]);

  return { products, newOffset, totalProducts, loading };
}
