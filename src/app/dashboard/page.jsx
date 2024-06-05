// import { cards } from "../lib/data";
import { fetchKoboForms, getFormDatas } from "@/lib/data";
import Link from "next/link";
import Card from "../../components/dashboard/card/card";
import Chart from "../../components/dashboard/chart/chart";
import styles from "../../components/dashboard/dashboard.module.css";
// import Rightbar from "../components/dashboard/rightbar/rightbar";
// import Transactions from "../components/dashboard/transactions/transactions";

export const metadata = {
  title: 'Dashboard | DRH Restauration',
};

const Dashboard = async () => {
  const assetID = process.env.ASSETID;
  const [koboForms, formDatas] = await Promise.allSettled([
    fetchKoboForms(),
    getFormDatas()
  ]);

  const uniqueForm = koboForms.value.filter((form) => form.uid === assetID);
  // console.log(uniqueForm[0].settings.description);
  // console.log(uniqueForm[0].name);
  // console.log(uniqueForm[0].deployment__submission_count);
  // console.log(uniqueForm[0].version_id);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          {uniqueForm.map((item) => (
            <Card item={item} key={item.version_id} />
          ))}
        </div>

        {/* <Transactions />*/
          <Chart formDatas={formDatas.value} />
        }

        <hr className="my-4 border-gray-400" />

        <div className="w-full">
          <h3 className="text-base">Liens d&apos;exportation</h3>
          {
            uniqueForm.map(uf => (
              uf.export_settings.map(setting => (
                <div key={setting.uid} className="flex gap-3 text-center justify-around rounded-md border-b mt-2 py-4 text-base leading-7 text-gray-500">

                  <Link className="w-full rounded bg-blue-100 cursor-pointer font-bold hover:text-blue-500" href={setting.data_url_csv} target="_blank" rel="noopener noreferrer">CSV 🔗</Link>

                  <Link className=" w-full rounded bg-green-100 hover:text-green-500 cursor-pointer font-bold" href={setting.data_url_xlsx} target="_blank" rel="noopener noreferrer">XLSX 🔗</Link>
                </div>
              ))
            ))
          }
        </div>

      </div>
    </div>
  );
};

export default Dashboard;