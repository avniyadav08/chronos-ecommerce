import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div style={styles.card}>
            <Link to={`/product/${product._id}`} style={styles.link}>
                <img 
                    src={product.images[0]?.url || 'https://via.placeholder.com/300'} 
                    alt={product.name}
                    style={styles.image}
                />
                <div style={styles.content}>
                    <h3 style={styles.name}>{product.name}</h3>
                    <p style={styles.brand}>{product.brand}</p>
                    <div style={styles.priceSection}>
                        <span style={styles.price}>₹{product.price.toLocaleString()}</span>
                        {product.discountPrice > 0 && (
                            <span style={styles.discount}>₹{product.discountPrice.toLocaleString()}</span>
                        )}
                    </div>
                    <div style={styles.rating}>
                        ⭐ {product.ratings} ({product.numOfReviews} reviews)
                    </div>
                </div>
            </Link>
        </div>
    );
};

const styles = {
    card: {
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'transform 0.3s, box-shadow 0.3s',
        backgroundColor: 'white',
        cursor: 'pointer'
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    },
    image: {
        width: '100%',
        height: '300px',
        objectFit: 'cover'
    },
    content: {
        padding: '1rem'
    },
    name: {
        fontSize: '1.1rem',
        fontWeight: '600',
        marginBottom: '0.5rem',
        color: '#1a1a1a'
    },
    brand: {
        color: '#6b7280',
        fontSize: '0.9rem',
        marginBottom: '0.5rem'
    },
    priceSection: {
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
        marginBottom: '0.5rem'
    },
    price: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: '#1a1a1a'
    },
    discount: {
        fontSize: '1rem',
        color: '#9ca3af',
        textDecoration: 'line-through'
    },
    rating: {
        fontSize: '0.9rem',
        color: '#6b7280'
    }
};

export default ProductCard;