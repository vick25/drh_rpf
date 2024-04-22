// import { updateform } from "@/app/lib/actions";
import { fetchFormUniqueData } from "@/lib/data";
import styles from "@/components/dashboard/forms/singleForm/singleForm.module.css";
import Image from "next/image";

const SingleFormPage = async ({ params }) => {

  const { id } = params;
  const formKobo = await fetchFormUniqueData(id);
  console.log(formKobo)

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          {/* <Image src={formKobo.img || "/noavatar.png"} alt="" fill /> */}
        </div>
        {formKobo['group_io1lf88/structure_execution']}
      </div>
      <div className={styles.formContainer}>
        <div className={styles.form}>
          <label for="start">Start:</label>
          <input type="text" id="start" name="start" value="2024-04-16T22:12:31.187+01:00" />
        </div>

        <div className={styles.form}>
          <label for="end">End:</label>
          <input type="text" id="end" name="end" value="2024-04-17T10:25:23.883+01:00" />
        </div>

        <form action={null} className={styles.form}>
          <input type="hidden" name="id" value={formKobo._id} />
          <label>Noms complets</label>
          <input type="text" name="formname" placeholder={formKobo['group_io1lf88/noms_complets']} />
          {/*<label>Email</label>
          <input type="email" name="email" placeholder={formKobo.email} />
          <label>Password</label>
          <input type="password" name="password" />
          <label>Phone</label>
          <input type="text" name="phone" placeholder={formKobo.phone} />
          <label>Address</label>
          <textarea type="text" name="address" placeholder={formKobo.address} />
          <label>Is Admin?</label>
          <select name="isAdmin" id="isAdmin">
            <option value={true} selected={formKobo.isAdmin}>Yes</option>
            <option value={false} selected={!formKobo.isAdmin}>No</option>
          </select>
          <label>Is Active?</label>
          <select name="isActive" id="isActive">
            <option value={true} selected={formKobo.isActive}>Yes</option>
            <option value={false} selected={!formKobo.isActive}>No</option>
          </select> */}
          {/* <button>Update</button> */}
        </form>
      </div>
    </div>
  );
};

export default SingleFormPage;