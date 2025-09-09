import React, { useState } from "react";
import emailjs from "emailjs-com";

function Contact() {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    subject: "", 
    message: "" 
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: value 
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Le nom est requis";
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email est invalide";
    }
    if (!formData.subject.trim()) newErrors.subject = "Le sujet est requis";
    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Le message doit contenir au moins 10 caractères";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        "service_id",      // 🔹 Ton ID de service EmailJS
        "template_id",     // 🔹 Ton ID de template EmailJS
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        "user_public_key"  // 🔹 Ta clé publique EmailJS
      );

      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      setErrors({ submit: "Une erreur s'est produite lors de l'envoi. Veuillez réessayer." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="contact">
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h2>Message envoyé avec succès !</h2>
          <p>Merci, je vous répondrai dans les plus brefs délais.</p>
          <button onClick={() => setIsSubmitted(false)} className="btn btn-primary">
            Envoyer un nouveau message
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="contact">
      <div className="contact-container">
        <div className="contact-info">
          <h2>Contactez-moi</h2>
          <p>N'hésitez pas à me contacter pour discuter de vos projets ou pour toute question.</p>
          <div className="contact-details">
            <div className="contact-item">📧 eric.koulodji@example.com</div>
            <div className="contact-item">💼 linkedin.com/in/erickoulodji</div>
            <div className="contact-item">📍 Paris, France</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Votre nom"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "error" : ""}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}

          <input
            type="email"
            name="email"
            placeholder="Votre email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error" : ""}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}

          <input
            type="text"
            name="subject"
            placeholder="Sujet"
            value={formData.subject}
            onChange={handleChange}
            className={errors.subject ? "error" : ""}
          />
          {errors.subject && <span className="error-message">{errors.subject}</span>}

          <textarea
            name="message"
            placeholder="Votre message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className={errors.message ? "error" : ""}
          ></textarea>
          {errors.message && <span className="error-message">{errors.message}</span>}

          {errors.submit && <span className="error-message submit-error">{errors.submit}</span>}

          <button type="submit" disabled={isSubmitting} className="submit-btn">
            {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
