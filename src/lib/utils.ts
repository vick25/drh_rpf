// import { Revenue } from './definitions';
type DataItem = {
  "group_io1lf88/structure_execution": string;
  "group_hs1kr38/province": string;
  "group_hs1kr38/territoire_ville": string;
  "group_hs1kr38/secteur_chefferie_commune"?: string;
  "group_up0wa79/superficie_ha": string;
  "group_zo3pb27/opportunites_restauration"?: string;
};

type ProvinceData = {
  structure_execution: string;
  superficie_ha: string;
  opportunites_restauration?: string;
};

type ProvincesData = {
  [province: string]: ProvinceData[];
};

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = "en-US"
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generateChartData = (formsData: any) => {
  try {
    const chartData: any = [];

    formsData.map((item: any) => {
      const {
        "group_io1lf88/structure_execution": name,
        "group_up0wa79/superficie_ha": superficie_ha,
        "group_zo3pb27/opportunites_restauration": restauration_ha,
      } = item;

      const Superficie = Number(superficie_ha);
      const Restauration = Number(restauration_ha);

      chartData.push({ name, Superficie, Restauration });
    });

    return chartData;
  } catch (parseError) {
    console.error("Error parsing file:", parseError);
  }
};

export const generateChartDataByProvince = (formsData: any) => {
  try {
    const chartData: ProvincesData = formsData.reduce((acc: any, item: any) => {
      const {
        "group_io1lf88/structure_execution": name,
        "group_hs1kr38/province": province,
        "group_hs1kr38/territoire_ville": territoireVille,
        "group_up0wa79/superficie_ha": superficie_ha,
        "group_zo3pb27/opportunites_restauration": restauration_ha,
      } = item;

      if (!acc[province]) {
        acc[province] = [];
      }
      acc[province].push({
        name,
        Territoire: territoireVille,
        Superficie: Number(superficie_ha),
        Restauration: Number(restauration_ha),
      });
      return acc;
    }, {} as ProvincesData);

    return chartData;
  } catch (parseError) {
    console.error("Error parsing file:", parseError);
  }
};

export function generateNumberRanges(
  totalNumber: number,
  groupNumber: number
): string[] {
  const ranges = [];

  for (let i = 0; i < groupNumber; i++) {
    const start = Math.floor(i * (totalNumber / groupNumber));
    const end = Math.floor((i + 1) * (totalNumber / groupNumber) - 1);
    ranges.push(`${start}-${end}`);
  }

  return ranges;
}
// export const generateYAxis = (revenue: Revenue[]) => {
//   // Calculate what labels we need to display on the y-axis
//   // based on highest record and in 1000s
//   const yAxisLabels = [];
//   const highestRecord = Math.max(...revenue.map((month) => month.revenue));
//   const topLabel = Math.ceil(highestRecord / 1000) * 1000;

//   for (let i = topLabel; i >= 0; i -= 1000) {
//     yAxisLabels.push(`$${i / 1000}K`);
//   }

//   return { yAxisLabels, topLabel };
// };

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
