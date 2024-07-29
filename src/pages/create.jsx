import { useState } from 'react';
import { createJob } from '../services/job';
import toast from 'react-hot-toast';
const SKILLS = [
    {
        value: 'React',
        label: 'React'
    }, {
        value: 'Node',
        label: 'Node'
    }, {
        value: 'Express',
        label: 'Express'
    }, {
        value: 'MongoDB',
        label: 'MongoDB'
    }, {
        value: 'Python',
        label: 'Python'
    }, {
        varlue: 'Django',
        label: 'Django'
    }, {
        value: 'Flask',
        label: 'Flask'
    }, {
        value: 'Golang',
        label: 'Golang'
    }, {
        value: 'Java',
        label: 'Java'
    }
]

export default function Create() {
    const [formData, setFormData] = useState({
        companyName: null,
        logoUrl: null,
        jobPosition: null,
        monthlySalary: null,
        jobType: null,
        remote: null,
        location: null,
        description: null,
        about: null,
        skills: [],
        information: null
    })
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        if (e.target.name === 'skills') {
            return setFormData({
                ...formData,
                skills: formData.skills.includes(e.target.value) ? formData.skills.filter(skill => skill !== e.target.value) : [...formData.skills, e.target.value]
            })
        }
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const data = { ...formData };
        data.skills = data.skills.join(',');
        try {
            const response = await createJob({ data });
            console.log(response);
            if (response.status === 201) {
                toast.success('Job created successfully');
            }
            else {
                toast.error('Job creation failed');
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
            <h1>Create</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: "40%", gap: "10px" }}>
                <input onChange={handleChange} value={formData.companyName} type="text" name="companyName" id="" placeholder="Company Name" />
                <input onChange={handleChange} value={formData.logoUrl} type="text" name="logoUrl" id="" placeholder="Logo URL" />
                <input onChange={handleChange} value={formData.jobPosition} type="text" name="jobPosition" id="" placeholder="Job Position" />
                <input onChange={handleChange} value={formData.monthlySalary} type="text" name="monthlySalary" id="" placeholder="Monthly Salary" />
                <select onChange={handleChange} value={formData.jobType} name="jobType" id="" placeholder="Job Type">
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                </select>
                <select onChange={handleChange} value={formData.remote} name="remote" id="">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
                <input onChange={handleChange} value={formData.location} type="text" name="location" id="" placeholder="Location" />
                <textarea onChange={handleChange} value={formData.description} name="description" id="" placeholder="Description"></textarea>
                <textarea onChange={handleChange} value={formData.about} name="about" id="" placeholder="About"></textarea>
                <select onChange={handleChange} value={formData.skills} name="skills" id="" multiple  >
                    {SKILLS.map((skill, idx) => (
                        <option key={idx} value={skill.value}>{skill.label}</option>
                    ))}
                </select>
                <input onChange={handleChange} value={formData.information} type="text" name="information" id="" placeholder="Information" />
                <button disabled={loading} type="submit">Submit</button>
            </form>
        </div>
    );
}