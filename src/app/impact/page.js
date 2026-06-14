import styles from './page.module.css';

export const metadata = {
  title: 'Our Impact | The Balm Health Initiative',
};

export default function Impact() {
  return (
    <div className="container section">
      <h1 className={styles.pageTitle}>Our Impact</h1>
      <p className={styles.pageSubtitle}>
        Delivering impactful health and social intervention programs to vulnerable and underserved communities across Nigeria.
      </p>

      <div className={styles.impactGrid}>
        <div className="glass-card">
          <h3 className={styles.cardTitle}>Geographic Coverage</h3>
          <p>
            We operate within Nigeria, adopting a community-based implementation approach that prioritizes areas with limited access to healthcare services, social support systems, and development opportunities.
          </p>
          <p>
            Our programs reach both urban and rural settings, targeting communities that need our interventions the most.
          </p>
        </div>

        <div className="glass-card">
          <h3 className={styles.cardTitle}>Target Beneficiaries</h3>
          <ul className={styles.beneficiaryList}>
            <li>Women and girls</li>
            <li>Children and adolescents</li>
            <li>Youths and elderly persons</li>
            <li>Persons with disabilities</li>
            <li>Low-income households</li>
            <li>Vulnerable and marginalized communities</li>
          </ul>
        </div>
      </div>

      <div className={styles.melSection}>
        <h2 className={styles.sectionTitle}>Monitoring, Evaluation & Learning (MEL)</h2>
        <p>
          We recognize MEL as a critical component of effective program implementation, accountability, organizational growth, and sustainable impact. Our structured framework ensures that our interventions respond effectively to the evolving needs of our target communities.
        </p>
      </div>
    </div>
  );
}
