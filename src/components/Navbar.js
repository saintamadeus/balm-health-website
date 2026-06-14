import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          <Image src="/logo.png" alt="The Balm Logo" width={40} height={40} />
          <span className={styles.logoText}>
            <span className={styles.brandName}>THE BALM</span>
          </span>
        </Link>
        <ul className={styles.navLinks}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About Us</Link></li>
          <li><Link href="/programs">Programs</Link></li>
          <li><Link href="/impact">Impact</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
        <Link href="/get-involved" className="btn btn-primary">Get Involved</Link>
      </div>
    </nav>
  );
}
