// import { cards } from "../lib/data";
import Card from "../../components/dashboard/card/card";
import Chart from "../../components/dashboard/chart/chart";
import styles from "../../components/dashboard/dashboard.module.css";
import { fetchKoboForms } from "@/lib/data";
import Link from "next/link";
// import Rightbar from "../components/dashboard/rightbar/rightbar";
// import Transactions from "../components/dashboard/transactions/transactions";



// DUMMY DATA

export const cards = [
  {
    id: 1,
    title: "Total Forms",
    number: 10.928,
    change: 12,
  },
  {
    id: 2,
    title: "Stock",
    number: 8.236,
    change: -2,
  },
  {
    id: 3,
    title: "Revenue",
    number: 6.642,
    change: 18,
  },
];

const Dashboard = async () => {
  const assetID = process.env.ASSETID;

  const koboForms = await fetchKoboForms();

  const uniqueForm = koboForms.filter((form) => form.uid === assetID);
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
          <Chart />
        }

        <div>
          <h3>Export links</h3>
          {
            uniqueForm.map(uf => (
              uf.export_settings.map(setting => (
                <div key={setting.uid} className="flex justify-around rounded-md border-b mt-2 py-4 text-base leading-7 text-gray-500">
                  <Link className="cursor-pointer hover:text-blue-500" href={setting.data_url_csv} target="_blank" rel="noopener noreferrer">CSV 🔗</Link>
                  <br />
                  <Link className="cursor-pointer hover:text-green-500" href={setting.data_url_xlsx} target="_blank" rel="noopener noreferrer">XLSX 🔗</Link>
                </div>
              ))
            ))
          }
        </div>

      </div>
      {/* <div className={styles.side}>
        <Rightbar />
      </div> */}
    </div>
  );
};

export default Dashboard;
