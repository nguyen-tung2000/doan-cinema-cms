import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { getSeriesByMonth, getSeriesCinemaByMonth } from '../RevenueHelper';

const generateOptions = (props: any) => {
  const { xCategories, data, title, subTitle, byCinemaAll } = props;

  return {
    title: {
      text: title,
    },

    subtitle: {
      text: subTitle,
    },

    yAxis: {
      title: {
        text: 'Doanh số',
      },
    },

    xAxis: {
      categories: xCategories,
    },

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
    },

    series: byCinemaAll ? getSeriesCinemaByMonth(data) : getSeriesByMonth(data),

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
            },
          },
        },
      ],
    },
  };
};

export const LineChart = ({ data }: { data: any }) => {
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={generateOptions(data)} />
    </>
  );
};
