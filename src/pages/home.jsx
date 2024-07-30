import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getJobs } from '../services/job';
import { verifyToken } from '../utils/auth';
function Home() {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [authLoading, setAuthLoading] = useState(true);
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            const response = await getJobs({ id: null });
            if (response.status === 200) {
                setJobs(response.data);
            }
            setLoading(false);
        }
        const fetchUser = async () => {
            const response = await verifyToken();
            if (response.status === 200) {
                setUser(response.data);
            }
            setAuthLoading(false);
        }
        fetchJobs();
        fetchUser();
    }, [])
    return (
        <div>
            <h1>Home</h1>
            {loading ? <h1>Loading...</h1> : jobs.map((job) => {
                return (
                    <div key={job._id}>
                        <h1>{job.jobPosition}</h1>
                        <p>{job.companyName}</p>
                        <p>{job.monthlySalary}</p>
                        <p>{job.description}</p>
                        {job.skills.map((skill) => {
                            return <span style={{ marginRight: '10px' }} key={skill}>{skill}</span>
                        })}
                        <button onClick={() => navigate(`/job/${job._id}`)}>View</button>
                        {authLoading || user === null ? <button disabled>Edit</button> : <button onClick={() => navigate(`/edit/${job._id}`)}>Edit</button>}
                    </div>
                )
            })}
        </div>
    );
}


export default Home;