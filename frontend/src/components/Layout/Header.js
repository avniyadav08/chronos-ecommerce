import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/slices/userSlice';
import toast from 'react-hot-toast';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const { cartItems } = useSelector((state) => state.cart);

    const handleLogout = () => {
        dispatch(logoutUser());
        toast.success('Logged out successfully');
        navigate('/login');
    };

    return (
        <header style={styles.header}>
            <div style={styles.container}>
                <Link to="/" style={styles.logo}>
                    <h1>CHRONOUS</h1>
                </Link>

                <nav style={styles.nav}>
                    <Link to="/" style={styles.link}>Home</Link>
                    <Link to="/products" style={styles.link}>Products</Link>
                    
                    {isAuthenticated ? (
                        <>
                            <Link to="/cart" style={styles.link}>
                                Cart ({cartItems.length})
                            </Link>
                            <Link to="/profile" style={styles.link}>
                                {user?.name}
                            </Link>
                            <button onClick={handleLogout} style={styles.button}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" style={styles.button}>
                            Login
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

const styles = {
    header: {
        backgroundColor: '#1a1a1a',
        color: 'white',
        padding: '1rem 0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 1rem'
    },
    logo: {
        color: '#d4af37',
        textDecoration: 'none',
        fontSize: '1.5rem',
        fontWeight: 'bold'
    },
    nav: {
        display: 'flex',
        gap: '1.5rem',
        alignItems: 'center'
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '1rem',
        transition: 'color 0.3s'
    },
    button: {
        backgroundColor: '#d4af37',
        color: '#1a1a1a',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '500',
        textDecoration: 'none',
        display: 'inline-block'
    }
};

export default Header;