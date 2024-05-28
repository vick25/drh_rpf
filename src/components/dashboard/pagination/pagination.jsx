"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./pagination.module.css";

const Pagination = ({ count, itemsPerPage }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = searchParams.get("page") || 1;

  const params = new URLSearchParams(searchParams);
  // const ITEM_PER_PAGE = 3;

  // const totalPages = Math.ceil(count / itemsPerPage);

  const hasPrev = itemsPerPage * (parseInt(page) - 1) > 0;
  const hasNext = itemsPerPage * (parseInt(page) - 1) + itemsPerPage < count;

  const handleChangePage = (type) => {
    type === "prev"
      ? params.set("page", parseInt(page) - 1)
      : params.set("page", parseInt(page) + 1);
    replace(`${pathname}?${params}`);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => handleChangePage("prev")}
      >
        Précédent
      </button>
      <button
        className={styles.button}
        disabled={!hasNext}
        onClick={() => handleChangePage("next")}
      >
        Suivant
      </button>
    </div>
  );
};

export default Pagination;