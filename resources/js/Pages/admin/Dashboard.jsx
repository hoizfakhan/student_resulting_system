import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

// Register the required components with ChartJS
ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

export default function Dashboard({ auth, departmentstudents, newstudents }) {

    // Process data for the pie chart
    const chartData = {
        labels: departmentstudents.map(department => department.name),
        datasets: [
            {
                label: 'Percentage of Students with 90%+',
                data: departmentstudents.map(department => department.percentage_of_high_performing_students),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                    }
                }
            }
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Admin Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 py-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Card for Total Faculty */}
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12h2l-1 9H7l-1-9h2m2 0V7h4v5m1 5h2m-8-5H5m14 0h-2m-6 0h6M5 9h14"></path>
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className='text-white text-xl font-semibold'>
                                    Total students in each department
                                </h3>
                                <ul className='mt-3'>
                                    {departmentstudents.map(department => (
                                        <li key={department.id} className='text-white text-lg'>
                                            {department.name} - <span className=''>{department.student_count}</span> students
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Card for High Performing Students */}
                    <div className="bg-gradient-to-r from-yellow-400 to-red-500 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12h2l-1 9H7l-1-9h2m2 0V7h4v5m1 5h2m-8-5H5m14 0h-2m-6 0h6M5 9h14"></path>
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className='text-white text-xl font-semibold'>
                                    Students with high percentage (90%) in each department
                                </h3>
                                <ul className='mt-3'>
                                    {departmentstudents.map(department => (
                                        <div key={department.id}>
                                            <h4 className='text-white text-lg font-semibold'>{department.name}</h4>
                                            <ul>
                                                {department.high_performing_students.length > 0 ? (
                                                    department.high_performing_students.map(student => (
                                                        <li key={student.name} className='text-white text-base'>
                                                            {student.name} - {student.father_name} - {student.department}
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li className='text-white text-base'>No high-performing students</li>
                                                )}
                                            </ul>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Card for New Registered Students */}
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12h2l-1 9H7l-1-9h2m2 0V7h4v5m1 5h2m-8-5H5m14 0h-2m-6 0h6M5 9h14"></path>
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className='text-white text-xl font-semibold'>
                                    New Registered Students
                                </h3>
                                <p className='text-2xl text-white  mt-3'>
                                    {newstudents}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Static Pie Chart Below the Cards */}
               
            </div>
        </AuthenticatedLayout>
    );
}
