import React, { useState } from 'react';
import { ContactFormData, FormErrors, SubmitStatus } from '../types';
import './ContactForm.css';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Simulate form submission - replace with actual form handling
      // For Netlify forms, you would use:
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          ...formData
        }).toString()
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="contact-form-container">
      <form 
        className="contact-form" 
        onSubmit={handleSubmit} 
        name="contact" 
        data-netlify="true"
        noValidate
      >
        <input type="hidden" name="form-name" value="contact" />
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`form-input ${errors.name ? 'error' : ''}`}
              aria-describedby={errors.name ? 'name-error' : undefined}
              aria-invalid={errors.name ? 'true' : 'false'}
              disabled={isSubmitting}
            />
            {errors.name && (
              <span id="name-error" className="form-error" role="alert">
                {errors.name}
              </span>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`form-input ${errors.email ? 'error' : ''}`}
              aria-describedby={errors.email ? 'email-error' : undefined}
              aria-invalid={errors.email ? 'true' : 'false'}
              disabled={isSubmitting}
            />
            {errors.email && (
              <span id="email-error" className="form-error" role="alert">
                {errors.email}
              </span>
            )}
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="subject" className="form-label">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            className="form-input"
            disabled={isSubmitting}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            className={`form-textarea ${errors.message ? 'error' : ''}`}
            aria-describedby={errors.message ? 'message-error' : undefined}
            aria-invalid={errors.message ? 'true' : 'false'}
            disabled={isSubmitting}
            placeholder="Tell me about your project or opportunity..."
          />
          {errors.message && (
            <span id="message-error" className="form-error" role="alert">
              {errors.message}
            </span>
          )}
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`submit-btn ${isSubmitting ? 'loading' : ''}`}
          aria-describedby="submit-status"
        >
          {isSubmitting ? (
            <>
              <span className="loading-spinner"></span>
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
        
        {submitStatus === 'success' && (
          <div id="submit-status" className="form-message success" role="alert">
            <span className="success-icon">✓</span>
            Message sent successfully! I'll get back to you soon.
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div id="submit-status" className="form-message error" role="alert">
            <span className="error-icon">✗</span>
            Failed to send message. Please try again or reach out via email.
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;