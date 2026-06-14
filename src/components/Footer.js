import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.footerCol}>
          <h3 className={styles.footerBrand}>THE BALM</h3>
          <p className={styles.footerDesc}>
            Health Initiative and Social Intervention. Improving health outcomes and enhancing the quality of life of vulnerable individuals and underserved communities.
          </p>
        </div>
        <div className={styles.footerCol}>
          <h4>Quick Links</h4>
          <ul className={styles.footerLinks}>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/programs">Programs</Link></li>
            <li><Link href="/impact">Impact</Link></li>
            <li><Link href="/get-involved">Get Involved</Link></li>
          </ul>
        </div>
        <div className={styles.footerCol}>
          <h4>Contact Us</h4>
          <ul className={styles.footerContact}>
            <li>Progressive Egbusi community, off Oladele</li>
            <li>Bells drive, OTA, Ogun State, Nigeria</li>
            <li>+234 907 852 4319</li>
            <li>thebalmhealthinitiative@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} The Balm Health Initiative and Social Intervention. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
