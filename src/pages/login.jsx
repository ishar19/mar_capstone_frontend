import { useState } from "react";
import { login } from "../services/auth";
import toast from "react-hot-toast";
export default function Login() {
    const [userData, setUserData] = useState({
        email: null,
        password: null
    })
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (!userData.email || !userData.password) {
            return;
        }
        try {
            const { email, password } = userData;
            const response = await login({ email, password })
            console.log(response);
            if (response.status === 200) {
                const { data } = response;
                localStorage.setItem('token', data.token);
                toast.success('User logged in successfully');
            }
        }
        catch (error) {
            toast.error("login failed");
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input name="email" value={userData.email} onChange={handleChange} type="email" placeholder="Your email" />
                <input name="password" value={userData.password} onChange={handleChange} type="password" placeholder="Your password" />
                <button disabled={loading} type="submit">Submit</button>
            </form>
        </div>
    );
}
