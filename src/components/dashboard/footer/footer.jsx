import styles from "./footer.module.css";

const Footer = () => {
  const date = new Date();

  return (
    <div className={styles.container}>
      <div className={styles.logo}>Vick Dev</div>
      <div className={styles.text}>© {date.getFullYear()} All rights reserved.</div>
    </div>
  );
};

export default Footer;