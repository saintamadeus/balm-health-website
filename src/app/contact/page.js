import styles from './page.module.css';

export const metadata = {
  title: 'Contact Us | The Balm Health Initiative',
};

export default function Contact() {
  return (
    <div className="container section">
      <h1 className={styles.pageTitle}>Contact Us</h1>
      
      <div className={styles.contactGrid}>
        <div className={styles.contactInfo}>
          <div className="glass-card">
            <h3>Get in Touch</h3>
            <p className={styles.contactDesc}>
              We would love to hear from you. Whether you want to volunteer, partner with us, or simply learn more about our programs, please reach out.
            </p>
            
            <ul className={styles.infoList}>
              <li>
                <strong>📍 Address:</strong><br/>
                Progressive Egbusi community, off Oladele,<br/>
                Bells drive, OTA, Ogun State, Nigeria.
              </li>
              <li>
                <strong>📞 Phone:</strong><br/>
                +234 907 852 4319
              </li>
              <li>
                <strong>✉️ Email:</strong><br/>
                thebalmhealthinitiative@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.contactFormWrapper}>
          <div className="glass-card">
            <h3>Send a Message</h3>
            <form className={styles.contactForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" placeholder="Enter your full name" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="Enter your email" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" placeholder="What is this regarding?" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea id="message" rows="5" placeholder="Write your message here..." required></textarea>
              </div>
              <button type="button" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
