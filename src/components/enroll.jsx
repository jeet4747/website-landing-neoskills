import React, { useState } from 'react';
import { useEnroll } from '../context/EnrollContext';
import './enroll.css';

export default function Enroll() {
    const { isEnrollOpen, closeEnroll, openPayment } = useEnroll();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        course: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const priceMap = {
            'web-dev': 4999,
            'ai-cyber': 7999,
            'aws': 6999,
            'pm': 3999
        };

        const baseAmount = priceMap[formData.course] || 4999;

        const paymentPayload = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            course: formData.course,
            baseAmount
        };

        setFormData({ name: '', email: '', phone: '', course: '', message: '' });
        closeEnroll();
        openPayment(paymentPayload);
    };

    return (
        <>
            {isEnrollOpen && (
                <div className="modal-overlay" onClick={closeEnroll}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={closeEnroll}>&times;</button>
                        
                        <h2>Enroll in Our Course</h2>
                        
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                            <select
                                name="course"
                                value={formData.course}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select a Course</option>
                                <option value="web-dev">Web Development</option>
                                <option value="ai-cyber">AI in Cybersecurity</option>
                                <option value="aws">AWS / Azure 900</option>
                                <option value="pm">Project Management</option>
                            </select>
                            <textarea
                                name="message"
                                placeholder="Any additional message"
                                value={formData.message}
                                onChange={handleInputChange}
                                rows="4"
                            />
                            <button type="submit" className="submit-btn">Enroll</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}