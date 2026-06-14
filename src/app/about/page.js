import styles from './page.module.css';

export const metadata = {
  title: 'About Us | The Balm Health Initiative',
};

export default function About() {
  return (
    <div className="container section">
      <h1 className={styles.pageTitle}>About The Balm</h1>
      
      <div className={styles.aboutGrid}>
        <div className={styles.storySection}>
          <h2>Our Story</h2>
          <p>
            The Balm Health Initiative and Social Intervention is a duly established nonprofit and humanitarian organization committed to delivering impactful health and social intervention programs targeted at vulnerable and underserved populations.
          </p>
          <p>
            Established in response to the growing need for accessible healthcare support, social welfare services, advocacy, and community-based interventions for people facing health, economic, and social challenges.
          </p>
        </div>

        <div className={styles.valuesSection}>
          <h2>Core Values (B.A.L.M)</h2>
          <ul className={styles.valuesList}>
            <li>
              <strong>B - Benevolence:</strong> Committed to showing compassion, care, and humanitarian support.
            </li>
            <li>
              <strong>A - Accountability:</strong> Upholding transparency, integrity, and responsible management.
            </li>
            <li>
              <strong>L - Life & Dignity:</strong> Valuing and protecting human life by promoting equitable access to healthcare.
            </li>
            <li>
              <strong>M - Mutual Collaboration:</strong> Building strong partnerships with healthcare providers, government agencies, and communities.
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.leadershipSection}>
        <h2>Leadership</h2>
        <div className="glass-card">
          <div className={styles.founderGrid}>
            <div className={styles.founderImage}>
              {/* Note: In a real app, replace with the founder's image. For now, a placeholder shape */}
              <div className={styles.imagePlaceholder}></div>
            </div>
            <div className={styles.founderInfo}>
              <h3>Comfort Oluremilekun Samuel</h3>
              <p className={styles.founderTitle}>Founder / Executive Director</p>
              <p>
                Comfort Oluremilekun Samuel is a seasoned public service professional, humanitarian, and experienced Medical Social Worker with over three decades of dedicated service in healthcare administration, patient support services, and social welfare interventions in Nigeria.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
