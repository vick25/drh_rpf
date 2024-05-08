import Image from "next/image";
import Link from "next/link";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";
// import { auth, signOut } from "@/app/auth";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Forms",
        path: "/dashboard/forms",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Maps",
        path: "/dashboard/maps",
        icon: <MdShoppingBag />,
      },
      // {
      //   title: "Transactions",
      //   path: "/dashboard/transactions",
      //   icon: <MdAttachMoney />,
      // },
    ],
  },
  {
    title: "Analytics",
    list: [
      // {
      //   title: "Revenue",
      //   path: "/dashboard/revenue",
      //   icon: <MdWork />,
      // },
      {
        title: "Statistiques",
        path: "/dashboard/reports",
        icon: <MdAnalytics />,
      },
      // {
      //   title: "Teams",
      //   path: "/dashboard/teams",
      //   icon: <MdPeople />,
      // },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Paramètres",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const Sidebar = async () => {
  // const { user } = await auth();
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Link
          className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
          href="/"
        >
          <Image
            className={styles.userImage}
            src={"/logo-medd.jpg" || "/noavatar.png"}
            alt="MEDD"
            width="70"
            height="70"
          />
        </Link>
        <div className={styles.userDetail}>
          <span className={styles.username} title="Direction de Reboisement et Horticulture">DRH</span>
          <span className={styles.userTitle}>Initiatives pour la restauration des Paysages Forestiers</span>
          <span className="text-rose-700 text-opacity-90 font-bold">v. alpha</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      {/* <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className={styles.logout}>
          <MdLogout />
          Logout
        </button>
      </form> */}
    </div>
  );
};

export default Sidebar;
