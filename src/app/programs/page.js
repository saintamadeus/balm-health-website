import styles from './page.module.css';

export const metadata = {
  title: 'Our Programs | The Balm Health Initiative',
};

export default function Programs() {
  return (
    <div className="container section">
      <h1 className={styles.pageTitle}>Programs & Thematic Areas</h1>
      <p className={styles.pageSubtitle}>
        Our programs are aligned with national development priorities and global sustainable development goals aimed at improving wellbeing and reducing inequalities.
      </p>

      <div className={styles.programsGrid}>
        <div className="glass-card">
          <h3 className={styles.programTitle}>1. Public Health Promotion</h3>
          <p>
            Promoting preventive healthcare practices and community health awareness through education, sensitization campaigns, screenings, and outreach programs.
          </p>
          <ul className={styles.programList}>
            <li>Community health awareness</li>
            <li>Hygiene and sanitation promotion</li>
            <li>Maternal, newborn, and child health education</li>
          </ul>
        </div>

        <div className="glass-card">
          <h3 className={styles.programTitle}>2. Healthcare Support</h3>
          <p>
            Support initiatives that improve access to healthcare services for vulnerable individuals facing financial, social, or systemic barriers.
          </p>
          <ul className={styles.programList}>
            <li>Medical assistance and referral support</li>
            <li>Support for vulnerable patients and families</li>
            <li>Health emergency response</li>
          </ul>
        </div>

        <div className="glass-card">
          <h3 className={styles.programTitle}>3. Mental Health (MHPSS)</h3>
          <p>
            Recognizing the growing need for mental and emotional wellbeing services through psychosocial support interventions.
          </p>
          <ul className={styles.programList}>
            <li>Mental health awareness campaigns</li>
            <li>Counselling and emotional support</li>
            <li>Rehabilitation and reintegration support</li>
          </ul>
        </div>

        <div className="glass-card">
          <h3 className={styles.programTitle}>4. Vulnerable Population Support</h3>
          <p>
            Prioritizing the protection, empowerment, and wellbeing of women, children, youths, elderly persons, and persons with disabilities.
          </p>
          <ul className={styles.programList}>
            <li>Women and girl-child empowerment</li>
            <li>Child welfare and protection programs</li>
            <li>Support for persons with disabilities</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
