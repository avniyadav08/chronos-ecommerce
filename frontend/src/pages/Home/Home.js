import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../redux/slices/productslice';
import ProductCard from '../../components/Product/ProductCard';
import Header from '../../components/Layout/Header';

const Home = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    return (
        <>
            <Header />
            <div style={styles.container}>
                <div style={styles.hero}>
                    <h1 style={styles.heroTitle}>Discover Premium Timepieces</h1>
                    <p style={styles.heroSubtitle}>Luxury watches for the discerning collector</p>
                </div>

                <div style={styles.productsSection}>
                    <h2 style={styles.sectionTitle}>Featured Collection</h2>
                    
                    {loading ? (
                        <p style={styles.loading}>Loading products...</p>
                    ) : (
                        <div style={styles.grid}>
                            {products && products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem'
    },
    hero: {
        textAlign: 'center',
        padding: '3rem 0',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        marginBottom: '3rem'
    },
    heroTitle: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: '1rem'
    },
    heroSubtitle: {
        fontSize: '1.2rem',
        color: '#6b7280'
    },
    productsSection: {
        marginTop: '2rem'
    },
    sectionTitle: {
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '2rem',
        color: '#1a1a1a'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '2rem'
    },
    loading: {
        textAlign: 'center',
        fontSize: '1.2rem',
        color: '#6b7280',
        padding: '3rem 0'
    }
};

export default Home;