import { useEffect, useState } from 'react';
import JobListing from './JobListing'
import Spinners from './Spinners'

// eslint-disable-next-line react/prop-types
const JobListings = ({ isHomePage = false }) => {
    const [Jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            const apiUrl = isHomePage ? '/api/jobs?_limit=3' : '/api/jobs';
            try {
                const res = await fetch(apiUrl);
                const data = await res.json();
                setJobs(data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            } finally {
                setLoading(false);
            }
        };


        fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <section className="bg-blue-50 px-4 py-10">
            <div className="container-xl lg:container m-auto">
                <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
                    {isHomePage ? 'Recent Jobs' : 'Browse Jobs'}
                </h2>

                {loading ? (
                    <Spinners loading={loading} />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Jobs.map((job) => (
                            <JobListing key={job.id} job={job} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default JobListings