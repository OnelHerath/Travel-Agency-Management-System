import React, { useState, useEffect } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
} from 'recharts';
import axios from 'axios';
import Footer from '../home/Footer';
import NavBar from '../home/NavBar';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AllReports = () => {
    const [enquiryVolumeData, setEnquiryVolumeData] = useState([]);
    const [distributionData, setDistributionData] = useState([]);
    const [enquiryTypeData, setEnquiryTypeData] = useState([]);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [volumeRes, distributionRes, typeRes] = await Promise.all([
                    axios.get('http://localhost:5557/enquiries/reports/EnquiryVolumeReport', { params: { startDate: '2024-01-01', endDate: '2024-12-31' } }),
                    axios.get('http://localhost:5557/enquiries/reports/DistributionReport'),
                    axios.get('http://localhost:5557/enquiries/reports/EnquiryTypeBreakdownReport'),
                ]);

                setEnquiryVolumeData(volumeRes.data.data || []);
                setDistributionData(distributionRes.data.data || []);
                setEnquiryTypeData(typeRes.data.data || []);
            } catch (error) {
                console.error('Error fetching report data', error);
            }
        };

        fetchData();
    }, []);

    const downloadPDF = () => {
        const input = document.getElementById('charts-section');
        html2canvas(input, { scale: 2 })  // Higher scale for better resolution
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');  // A4 size
                const imgWidth = 210;  // A4 page width
                const pageHeight = 295;  // A4 page height
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                let heightLeft = imgHeight;
                let position = 0;

                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft > 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }

                pdf.save('charts-report.pdf');
            })
            .catch((error) => {
                console.error('Error generating PDF', error);
            });
    };

    const downloadPNG = () => {
        const input = document.getElementById('charts-section');
        html2canvas(input, { scale: 2 })  // Higher scale for better resolution
            .then((canvas) => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = 'charts-report.png';
                link.click();
            })
            .catch((error) => {
                console.error('Error generating PNG', error);
            });
    };

    return (
        <div>
            <NavBar setFilters={setFilters} />

            <div style={{ paddingTop: '85px' }}>
                <div id="charts-section" style={styles.chartsSection}>
                    {/* Enquiry Type Breakdown Report */}
                    <div style={styles.card}>
                        <h3 style={{fontSize:'23px',marginBottom:'20px', fontWeight:600}}>Enquiry Type Breakdown Report</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={enquiryTypeData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="type" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Distribution Report */}
                    <div style={styles.card}>
                        <h3 style={{fontSize:'23px',marginBottom:'20px', fontWeight:600}}>Distribution Report</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={distributionData.map(entry => ({
                                        name: entry.name,
                                        count: entry.count
                                    }))}
                                    dataKey="count"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    label={({ name, count }) => `${name}: ${count}`}
                                >
                                    {distributionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value, name) => [value, `${name} Count`]} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div style={styles.buttonContainer}>
                    <button onClick={downloadPDF} style={styles.downloadButton}>
                        Download as PDF
                    </button>
                    <button onClick={downloadPNG} style={styles.downloadButton}>
                        Download as PNG
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

const styles = {
    chartsSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto',
        width: '100%',
        maxWidth: '900px', // Limit the maximum width of charts section for better alignment
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '40px',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
        width: '100%',
        maxWidth: '800px',
        margin: '20px auto',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginBottom: '20px',
    },
    downloadButton: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#120443',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default AllReports;
