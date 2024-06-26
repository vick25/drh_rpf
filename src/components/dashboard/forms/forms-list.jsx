'use client'

import styles from "@/components/dashboard/forms/forms.module.css";
import Pagination from "@/components/dashboard/pagination/pagination";
import Search from "@/components/dashboard/search/search";
import Link from "next/link";
import { useState, useEffect, useContext } from 'react';
import { FormsContext } from "@/contexts/formsContext";

const FormsList = ({ q, page, itemsPerPage }) => {
    const { state: { selectedForm } } = useContext(FormsContext);

    const [count, setCount] = useState(0);
    const [paginatedData, setPaginatedData] = useState([]);

    useEffect(() => {
        // console.log(page, selectedForm);
        const regex = new RegExp(q, 'i');

        if (selectedForm.length > 0) {
            const forms = selectedForm.filter(obj => regex.test(obj['group_hs1kr38/province']));
            setCount(forms.length);

            const paginated = forms.slice(
                (page - 1) * itemsPerPage,
                page * itemsPerPage
            );
            setPaginatedData(paginated);
        } else {
            const forms = JSON.parse(localStorage.getItem('forms'));
            setCount(forms.length);

            const paginated = forms.slice(
                (page - 1) * itemsPerPage,
                page * itemsPerPage
            );
            setPaginatedData(paginated);
        }
    }, [q, page, itemsPerPage, selectedForm]);

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Recherche par province ..." />
                {/* <Link href="/dashboard/forms/add">
          <button className={styles.addButton} disabled>New Form</button>
        </Link> */}
            </div>

            <table className="w-full table-auto py-4 mt-6">
                <thead className="bg-gray-100 dark:bg-gray-800 rounded-sm">
                    <tr>
                        {/* {heads.map(key => (
              <th key={key}>{key}</th>
            ))} */}
                    </tr>
                    <tr>
                        <th>Noms</th>
                        <th>Date</th>
                        <th>Sexe</th>
                        <th>Structure</th>
                        <th>Fonction</th>
                        <th>Province</th>
                        <th>Territoire</th>
                        <th>Superficie</th>
                        <th>Geolocalisation</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {paginatedData.map((form) => (
                        <tr key={form._id}>
                            <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                                {form['group_io1lf88/noms_complets']}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{form['group_io1lf88/entrevue_date']}</td>
                            <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{form['group_io1lf88/sexe']}</td>
                            <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{form['group_io1lf88/structure_execution']}</td>
                            <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{form['group_io1lf88/fonction_enquete_structure']}</td>
                            <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{form['group_hs1kr38/province']}</td>
                            <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{form['group_hs1kr38/territoire_ville']}</td>
                            <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{form['group_up0wa79/superficie_ha']}</td>
                            <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{form['group_hs1kr38/geolocation']}</td>
                            {/* <td>{form.isAdmin ? "Admin" : "Client"}</td>
              <td>{form.isActive ? "active" : "passive"}</td> */}
                            {<td>
                                <div className={styles.buttons}>
                                    {<Link href={`/dashboard/forms/${form['_id']}`}>
                                        <button className={`${styles.button} ${styles.view} text-sm`} title="Voir plus de détails">
                                            Afficher
                                        </button>
                                    </Link>
                                        //className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-50"
                                        //className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
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

            <Pagination count={count} itemsPerPage={itemsPerPage} />
        </div>
    )
}

export default FormsList