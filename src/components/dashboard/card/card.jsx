import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css";

const Card = ({ item }) => {

  // console.log(uniqueForm[0].settings.description);
  // console.log(uniqueForm[0].name);
  // console.log(uniqueForm[0].deployment__submission_count);
  // console.log(uniqueForm[0].version_id);

  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle size={24} />

      <div className={styles.texts}>
        <span className={styles.title}>{item.name}</span>
        <span className={styles.detail}>{item.settings.description}</span>
        <span className={styles.number}>
          <span className={item.deployment__submission_count > 0 ? styles.positive : styles.negative}>
            {item.deployment__submission_count}
          </span>{" "}
          {item.deployment__submission_count > 1 ? "formulaires collectés" : "formulaire collecté"}.
        </span>
      </div>
    </div>
  );
};

export default Card;