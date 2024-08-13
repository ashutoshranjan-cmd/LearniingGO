import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export const useLogin = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // const navigate = useNavigate();

    const login = async (email:any , password:any) => {
        // setIsLoading(true);
        // setError(null);

        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const result = await response.json();
                setError(result.message || 'An error occurred. Please try again.');
                // Cookies.remove('user'); // Clear cookies on failure
                // return; // Exit early on error
            }

            const result = await response.json();
            Cookies.set('user', JSON.stringify(result)); // Set cookie on success
            setError(null); // Clear any previous errors
            // navigate('/'); // Redirect or handle successful login
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
            // Cookies.remove('user'); // Clear cookies on unexpected error
        }
    };

    return { login, isLoading, error };
};
