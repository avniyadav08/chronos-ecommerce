import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../redux/slices/productslice';
import { addToCart } from '../../redux/slices/cartSlice';
import Header from '../../components/Layout/Header';
import toast from 'react-hot-toast';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product, loading } = useSelector((state) => state.products);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        dispatch(getProductDetails(id));
    }, [dispatch, id]);

    const handleAddToCart = () => {
        if (product.stock < 1) {
            toast.error('Product out of stock');
            return;
        }

        dispatch(addToCart({
            product: product._id,
            name: product.name,
            price: product.discountPrice || product.price,
            image: product.images[0]?.url,
            stock: product.stock,
            quantity
        }));
        toast.success('Added to cart!');
    };

    if (loading || !product) {
        return (
            <>
                <Header />
                <div style={styles.loading}>Loading...</div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div style={styles.container}>
                <div style={styles.grid}>
                    <div style={styles.imageSection}>
                        <img 
                            src={product.images[0]?.url || 'https://via.placeholder.com/500'} 
                            alt={product.name}
                            style={styles.image}
                        />
                    </div>

                    <div style={styles.detailsSection}>
                        <h1 style={styles.title}>{product.name}</h1>
                        <p style={styles.brand}>{product.brand}</p>
                        
                        <div style={styles.rating}>
                            ⭐ {product.ratings} ({product.numOfReviews} reviews)
                        </div>

                        <div style={styles.priceSection}>
                            <span style={styles.price}>₹{(product.discountPrice || product.price).toLocaleString()}</span>
                            {product.discountPrice > 0 && (
                                <span style={styles.originalPrice}>₹{product.price.toLocaleString()}</span>
                            )}
                        </div>

                        <p style={styles.description}>{product.description}</p>

                        <div style={styles.specs}>
                            <div style={styles.spec}><strong>Category:</strong> {product.category}</div>
                            <div style={styles.spec}><strong>Movement:</strong> {product.movement}</div>
                            <div style={styles.spec}><strong>Case Material:</strong> {product.caseMaterial}</div>
                            <div style={styles.spec}><strong>Water Resistance:</strong> {product.waterResistance}</div>
                            <div style={styles.spec}><strong>Warranty:</strong> {product.warranty} years</div>
                        </div>

                        <div style={styles.stock}>
                            Status: <span style={product.stock > 0 ? styles.inStock : styles.outOfStock}>
                                {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                            </span>
                        </div>

                        <div style={styles.actions}>
                            <div style={styles.quantitySection}>
                                <button 
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    style={styles.qtyButton}
                                >
                                    -
                                </button>
                                <span style={styles.quantity}>{quantity}</span>
                                <button 
                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                    style={styles.qtyButton}
                                >
                                    +
                                </button>
                            </div>
                            
                            <button 
                                onClick={handleAddToCart}
                                disabled={product.stock < 1}
                                style={styles.addToCartBtn}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '2rem auto',
        padding: '0 1rem'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '3rem'
    },
    imageSection: {
        borderRadius: '8px',
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: 'auto'
    },
    detailsSection: {
        padding: '1rem 0'
    },
    title: {
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '0.5rem'
    },
    brand: {
        fontSize: '1.2rem',
        color: '#6b7280',
        marginBottom: '1rem'
    },
    rating: {
        fontSize: '1rem',
        marginBottom: '1rem'
    },
    priceSection: {
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        marginBottom: '1.5rem'
    },
    price: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#1a1a1a'
    },
    originalPrice: {
        fontSize: '1.5rem',
        color: '#9ca3af',
        textDecoration: 'line-through'
    },
    description: {
        fontSize: '1rem',
        lineHeight: '1.6',
        color: '#4b5563',
        marginBottom: '2rem'
    },
    specs: {
        backgroundColor: '#f9fafb',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '1.5rem'
    },
    spec: {
        padding: '0.5rem 0',
        borderBottom: '1px solid #e5e7eb'
    },
    stock: {
        fontSize: '1.1rem',
        marginBottom: '1.5rem'
    },
    inStock: {
        color: '#10b981',
        fontWeight: 'bold'
    },
    outOfStock: {
        color: '#ef4444',
        fontWeight: 'bold'
    },
    actions: {
        display: 'flex',
        gap: '1rem',
        alignItems: 'center'
    },
    quantitySection: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        border: '1px solid #d1d5db',
        borderRadius: '4px',
        padding: '0.5rem'
    },
    qtyButton: {
        backgroundColor: '#f3f4f6',
        border: 'none',
        padding: '0.5rem 1rem',
        cursor: 'pointer',
        fontSize: '1.2rem',
        borderRadius: '4px'
    },
    quantity: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        minWidth: '30px',
        textAlign: 'center'
    },
    addToCartBtn: {
        backgroundColor: '#1a1a1a',
        color: 'white',
        border: 'none',
        padding: '0.75rem 2rem',
        fontSize: '1.1rem',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: '600'
    },
    loading: {
        textAlign: 'center',
        padding: '3rem',
        fontSize: '1.2rem'
    }
};

export default ProductDetails;