import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.heroTitle}>Healing Communities, <br/> Restoring Hope.</h1>
          <p className={styles.heroSubtitle}>
            Improving health outcomes and social wellbeing through innovative healthcare interventions, advocacy, and sustainable social support services.
          </p>
          <div className={styles.heroActions}>
            <Link href="/get-involved" className="btn btn-primary">Donate Now</Link>
            <Link href="/programs" className="btn btn-outline">Our Programs</Link>
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <div className={styles.overviewGrid}>
            <div className={styles.overviewText}>
              <h2 className={styles.sectionTitle}>About The Balm</h2>
              <p>
                The Balm Health Initiative and Social Intervention is a nonprofit and humanitarian organization committed to delivering impactful health and social intervention programs targeted at vulnerable and underserved populations.
              </p>
              <p>
                We focus on promoting holistic wellbeing by combining healthcare support with social development initiatives that empower individuals, families, and communities to live healthier, safer, and more productive lives.
              </p>
              <Link href="/about" className="btn btn-primary" style={{ marginTop: '1rem' }}>Read Our Story</Link>
            </div>
            <div className={styles.overviewCards}>
              <div className="glass-card">
                <h3>Healthcare</h3>
                <p>Medical assistance, preventive healthcare campaigns, and emergency response.</p>
              </div>
              <div className="glass-card" style={{ transform: 'translateY(20px)' }}>
                <h3>Social Intervention</h3>
                <p>Rehabilitation, community reintegration, and welfare for vulnerable populations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.impactSection}`}>
        <div className="container">
          <div className={styles.impactContent}>
            <h2 className={styles.sectionTitle}>Our Impact</h2>
            <p>
              Through strategic partnerships, advocacy, and direct community interventions, we seek to bridge gaps in healthcare access and social inclusion across Nigeria.
            </p>
            <div className={styles.statsGrid}>
              <div className={styles.statBox}>
                <span className={styles.statNumber}>35+</span>
                <span className={styles.statLabel}>Years Expertise</span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statNumber}>5</span>
                <span className={styles.statLabel}>Core Thematic Areas</span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statNumber}>100%</span>
                <span className={styles.statLabel}>Commitment</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
