import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, addToCart } from '../../redux/slices/cartSlice';
import Header from '../../components/Layout/Header';
import toast from 'react-hot-toast';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { isAuthenticated } = useSelector((state) => state.user);

    const increaseQuantity = (item) => {
        const newQty = item.quantity + 1;
        if (newQty > item.stock) {
            toast.error('Max stock reached');
            return;
        }
        dispatch(addToCart({ ...item, quantity: newQty }));
    };

    const decreaseQuantity = (item) => {
        const newQty = item.quantity - 1;
        if (newQty < 1) return;
        dispatch(addToCart({ ...item, quantity: newQty }));
    };

    const removeItem = (id) => {
        dispatch(removeFromCart(id));
        toast.success('Item removed from cart');
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.18;
    const total = subtotal + tax;

    const checkoutHandler = () => {
        if (!isAuthenticated) {
            navigate('/login');
            toast.error('Please login to checkout');
            return;
        }
        navigate('/shipping');
    };

    if (cartItems.length === 0) {
        return (
            <>
                <Header />
                <div style={styles.empty}>
                    <h2>Your Cart is Empty</h2>
                    <Link to="/" style={styles.link}>Continue Shopping</Link>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div style={styles.container}>
                <h1 style={styles.title}>Shopping Cart</h1>
                
                <div style={styles.grid}>
                    <div style={styles.itemsSection}>
                        {cartItems.map((item) => (
                            <div key={item.product} style={styles.item}>
                                <img src={item.image} alt={item.name} style={styles.image} />
                                
                                <div style={styles.details}>
                                    <h3>{item.name}</h3>
                                    <p style={styles.price}>₹{item.price.toLocaleString()}</p>
                                </div>

                                <div style={styles.quantitySection}>
                                    <button onClick={() => decreaseQuantity(item)} style={styles.qtyBtn}>-</button>
                                    <span style={styles.qty}>{item.quantity}</span>
                                    <button onClick={() => increaseQuantity(item)} style={styles.qtyBtn}>+</button>
                                </div>

                                <p style={styles.subtotal}>₹{(item.price * item.quantity).toLocaleString()}</p>

                                <button onClick={() => removeItem(item.product)} style={styles.removeBtn}>
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div style={styles.summary}>
                        <h2>Order Summary</h2>
                        <div style={styles.summaryItem}>
                            <span>Subtotal:</span>
                            <span>₹{subtotal.toLocaleString()}</span>
                        </div>
                        <div style={styles.summaryItem}>
                            <span>Tax (18%):</span>
                            <span>₹{tax.toLocaleString()}</span>
                        </div>
                        <div style={styles.summaryTotal}>
                            <span>Total:</span>
                            <span>₹{total.toLocaleString()}</span>
                        </div>
                        <button onClick={checkoutHandler} style={styles.checkoutBtn}>
                            Proceed to Checkout
                        </button>
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
    title: {
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '2rem'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '2rem'
    },
    itemsSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
    },
    image: {
        width: '100px',
        height: '100px',
        objectFit: 'cover',
        borderRadius: '4px'
    },
    details: {
        flex: 1
    },
    price: {
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: '#1a1a1a'
    },
    quantitySection: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    },
    qtyBtn: {
        backgroundColor: '#f3f4f6',
        border: 'none',
        padding: '0.25rem 0.75rem',
        cursor: 'pointer',
        fontSize: '1rem',
        borderRadius: '4px'
    },
    qty: {
        padding: '0 1rem',
        fontWeight: 'bold'
    },
    subtotal: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        minWidth: '120px',
        textAlign: 'right'
    },
    removeBtn: {
        backgroundColor: '#ef4444',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    summary: {
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        height: 'fit-content'
    },
    summaryItem: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.75rem 0',
        borderBottom: '1px solid #e5e7eb'
    },
    summaryTotal: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem 0',
        fontSize: '1.3rem',
        fontWeight: 'bold'
    },
    checkoutBtn: {
        width: '100%',
        backgroundColor: '#1a1a1a',
        color: 'white',
        border: 'none',
        padding: '0.75rem',
        borderRadius: '4px',
        fontSize: '1.1rem',
        fontWeight: '600',
        cursor: 'pointer',
        marginTop: '1rem'
    },
    empty: {
        textAlign: 'center',
        padding: '4rem 0'
    },
    link: {
        display: 'inline-block',
        marginTop: '1rem',
        backgroundColor: '#1a1a1a',
        color: 'white',
        padding: '0.75rem 1.5rem',
        borderRadius: '4px',
        textDecoration: 'none'
    }
};

export default Cart;