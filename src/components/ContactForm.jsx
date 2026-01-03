import React from 'react';
import './ContactForm.css';

const ContactForm = () => {
    return (
        <section className="section-container">
            <h2 className="section-title">Lets Connect</h2>

            <div className="contact-wrapper">
                <div className="contact-banner">
                    <h3>Do you have a bright idea?</h3>
                    <div className="banner-overlay"></div>
                    {/* Background image could go here via CSS */}
                </div>

                <div className="form-container">
                    <p className="form-intro">Feel free to drop me a message & I Will Keep Contact!</p>

                    <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label htmlFor="name" className="sr-only">Your Name</label>
                            <input type="text" id="name" placeholder="Your Name" className="form-input" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="sr-only">Your Email</label>
                            <input type="email" id="email" placeholder="Your Email" className="form-input" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject" className="sr-only">Subject</label>
                            <input type="text" id="subject" placeholder="Subject" className="form-input" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message" className="sr-only">Message</label>
                            <textarea id="message" rows="5" placeholder="Message" className="form-input"></textarea>
                        </div>

                        <button type="submit" className="submit-btn">Send Message</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
