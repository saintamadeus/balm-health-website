import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Get Involved | The Balm Health Initiative',
};

export default function GetInvolved() {
  return (
    <div className="container section">
      <h1 className={styles.pageTitle}>Get Involved</h1>
      <p className={styles.pageSubtitle}>
        Join us in improving health outcomes and strengthening community wellbeing. There are many ways to partner with The Balm Health Initiative.
      </p>

      <div className={styles.involveGrid}>
        <div className="glass-card">
          <div className={styles.iconWrapper}>🤝</div>
          <h3 className={styles.cardTitle}>Strategic Partnerships</h3>
          <p>
            We collaborate with healthcare institutions, government agencies, donor organizations, and civil society actors. Leverage your technical expertise or shared resources for collective action.
          </p>
          <Link href="/contact" className="btn btn-outline" style={{ marginTop: '1rem' }}>Partner With Us</Link>
        </div>

        <div className="glass-card">
          <div className={styles.iconWrapper}>❤️</div>
          <h3 className={styles.cardTitle}>Donate</h3>
          <p>
            Your financial contributions ensure the continuity of our programs and support vulnerable populations who need it most.
          </p>
          <div className={styles.bankDetails}>
            <h4>Bank Details for Partnership</h4>
            <p><strong>Account Name:</strong> The Balm Health Initiative and Social Interventions TBHISI.</p>
            <p><strong>Account Number:</strong> 1312023013</p>
            <p><strong>Bank Name:</strong> Zenith Bank PLC</p>
          </div>
        </div>

        <div className="glass-card">
          <div className={styles.iconWrapper}>🙋‍♀️</div>
          <h3 className={styles.cardTitle}>Volunteer</h3>
          <p>
            We recognize the critical role of skilled personnel and community volunteers. Join our team of community-based facilitators, medical professionals, and advocates.
          </p>
          <Link href="/contact" className="btn btn-outline" style={{ marginTop: '1rem' }}>Join as a Volunteer</Link>
        </div>
      </div>
    </div>
  );
}
