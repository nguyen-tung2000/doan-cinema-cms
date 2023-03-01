import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { getTotalMovie } from '@/features/revenue';

type GenerateOptionsColumnType = {
  data: any;
  xCategories: string[];
  text: string;
  type?: string;
};

const generateOptions = (props: GenerateOptionsColumnType) => {
  const { data, xCategories, text, type } = props;
  let seriesData: any;

  switch (type) {
    case 'Full':
      seriesData = [
        {
          name: 'Doanh thu',
          data: xCategories.map((x) => getTotalMovie(data, x)),
        },
      ];
      break;
    case 'ByMovie':
      seriesData = [
        {
          name: 'Doanh thu vé',
          data: data.map((value: any) => value.totalTicket),
        },
        {
          name: 'Doanh thu thức ăn',
          data: data.map((value: any) => value.totalFood),
        },
        {
          name: 'Doanh thu cả hai',
          data: data.map((value: any) => value.totalPrice),
        },
      ];
      break;

    default:
      seriesData = [];
  }

  return {
    chart: {
      type: 'column',
    },
    title: {
      text: text,
    },
    xAxis: {
      categories: xCategories,
    },
    credits: {
      enabled: false,
    },
    series: seriesData,
  };
};

export const ColumnChart = ({ data }: { data: GenerateOptionsColumnType }) => {
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={generateOptions(data)} />
    </>
  );
};
