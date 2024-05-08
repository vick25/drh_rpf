import Pagination from "@/components/dashboard/pagination/pagination";
import Search from "@/components/dashboard/search/search";
import styles from "@/components/dashboard/forms/forms.module.css";
import Link from "next/link";
import { fetchFormData } from "@/lib/data";

const assetID = process.env.ASSETID;

const FormsPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const ITEM_PER_PAGE = 3;
  // const { count, forms } = await fetchforms(q, page);

  const { count, paginatedData } = await fetchFormData(assetID, q, page, ITEM_PER_PAGE);
  // console.log(count, Object.keys(paginatedData[0] || {}).map(key => key).filter(item => {
  //   return item.startsWith('_id') ||
  //     item.startsWith('group') ||
  //     item === 'nom_enqueteur' ||
  //     item === '_geolocation' ||
  //     item === '_attachments';
  // }));
  // console.log(paginatedData[0]._geolocation, paginatedData[0]['group_do9po75/avantages_socioeconomiques'])

  // const heads = Object.keys(paginatedData[0] || {}).map(key => key).filter(item => {
  //   return item.startsWith('_id') ||
  //     item.startsWith('group') ||
  //     item === 'nom_enqueteur' ||
  //     item === '_geolocation' ||
  //     item === '_attachments';
  // });

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a form province ..." />
        {/* <Link href="/dashboard/forms/add">
          <button className={styles.addButton} disabled>New Form</button>
        </Link> */}
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            {/* {heads.map(key => (
              <th key={key}>{key}</th>
            ))} */}
          </tr>
          <tr>
            <td>Name</td>
            <td>Date</td>
            <td>Sexe</td>
            <td>Structure</td>
            <td>Fonction</td>
            <td>Province</td>
            <td>Territoire</td>
            <td>Superficie</td>
            <td>Geolocalisation</td>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((form) => (
            <tr key={form._id}>
              <td>
                {form['group_io1lf88/noms_complets']}
              </td>
              <td>{form['group_io1lf88/entrevue_date']}</td>
              <td>{form['group_io1lf88/sexe']}</td>
              <td>{form['group_io1lf88/structure_execution']}</td>
              <td>{form['group_io1lf88/fonction_enquete_structure']}</td>
              <td>{form['group_hs1kr38/province']}</td>
              <td>{form['group_hs1kr38/territoire_ville']}</td>
              <td>{form['group_up0wa79/superficie_ha']}</td>
              <td>{form['group_hs1kr38/geolocation']}</td>
              {/* <td>{form.isAdmin ? "Admin" : "Client"}</td>
              <td>{form.isActive ? "active" : "passive"}</td> */}
              {<td>
                <div className={styles.buttons}>
                  {<Link href={`/dashboard/forms/${form['_id']}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                    /*<form action={deleteform}>
                      <input type="hidden" name="id" value={(form.id)} />
                      <button className={`${styles.button} ${styles.delete}`}>
                        Delete
                      </button>
                    </form> */
                  }
                </div>
              </td>}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} itemsPerPage={ITEM_PER_PAGE} />
    </div>
  );
};

export default FormsPage;