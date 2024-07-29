import { useState } from "react";
import { register } from "../services/auth";
import { useNavigate } from "react-router-dom";
function Register() {
    const [userData, setUserData] = useState({
        name: null,
        email: null,
        password: null
    })
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!userData.name || !userData.email || !userData.password) {
            return;
        }
        try {
            const { name, email, password } = userData;
            const response = await register({ name, email, password })
            console.log(response);
            if (response.status === 200) {
                alert('User created successfully');
                navigate('/login');

            }
        }
        catch (error) {

            console.log(error.message);
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <h1>Create an account</h1>
            <form onSubmit={handleSubmit}>
                <input name="name" value={userData.name} onChange={handleChange} type="text" placeholder="Your name" />
                <input name="email" value={userData.email} onChange={handleChange} type="email" placeholder="Your email" />
                <input name="password" value={userData.password} onChange={handleChange} type="password" placeholder="Your password" />
                <button disabled={loading} type="submit">Submit</button>
            </form>
        </div>
    );
}


export default Register;