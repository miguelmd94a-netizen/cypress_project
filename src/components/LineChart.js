import { Box, Button, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';
import moment from 'moment';

import { Line, defaults } from 'react-chartjs-2';
import { toast } from 'react-toastify';
import exportIcon from '../assets/ExportIcon.png';
import { getTagColorByOption } from '../utils/chartsColors';
import { exportCSVFile } from '../utils/convertToJson';

defaults.global.tooltips.intersect = false;
defaults.global.tooltips.mode = 'index';
defaults.global.legend.labels.fontColor = 'black';
defaults.global.legend.labels.fontFamily = 'Roboto';
defaults.global.legend.position = 'bottom';
defaults.global.legend.labels.fontSize = 14;

const useBuildDataSet = (data) => {
  const labels = data?.map(({ name }) => name);

  const dataset = {};
  const te = data?.map((dt) => {
    const keys = Object.keys(dt).filter((d) => d !== 'name');
    for (const key of keys) {
      if (dataset[key]) {
        dataset[key].data.push(dt[key]);
      } else {
        const color = getTagColorByOption(key);
        dataset[key] = {
          label: key,
          fill: false,
          data: [dt[key]],
          borderColor: color,
          backgroundColor: color,
          borderWidth: 1,
        };
      }
    }
  });
  const datasets = Object.keys(dataset).map((dtset) => dataset[dtset]);
  return { datasets, labels };
};

const useStyles = makeStyles(() => ({
  container: {
    padding: '0 120px',
  },
  content: {
    background: '#FAFBFF',
    borderRadius: 7,
    padding: 16,
  },
  exportIcon: {
    width: 12,
    height: 12,
    objectFit: 'cover',
    marginRight: 5,
  },
  leftBox: {
    width: 350,
    height: 600,
    background: '#4B7BFF',
  },
  appBar: {
    boxShadow: 0,
    '&.MuiPaper-elevation4': {
      boxShadow: 'unset',
    },
  },
  sectionText1: {
    color: '#4B7BFF',
    fontSize: 16,
    fontWeight: 500,
    textTransform: 'capitalize',
  },
  colorItem: {
    color: '#00000099',
    fontSize: 14,
  },
  textTitle: {
    fontWeight: 400,
    paddingTop: 30,
  },
  barContainer: {
    background: '#fff',
    borderRadius: '5px',
    maxHeight: '720px',
    minHeight: 580,
    position: 'relative',
  },
  loading: {
    width: '100%',
    height: '100%',
    background: '#fff',
    zIndex: 2,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
    flexDirection: 'column',
  },
}));

const LineCharts = ({ reports, name, loadingReports }) => {
  const refChart = useRef();
  const classes = useStyles();
  const desktop = useMediaQuery('(min-width:1366px)');

  const [open, setOpen] = useState(false);
  const { datasets, labels } = useBuildDataSet(reports);
  const onSelectOption = (type) => {
    if (type === 'pdf') {
      exportComponentAsPDF(refChart, {
        fileName: `${name}-${moment().format()}`,

        pdfOptions: {
          pdfFormat: [770, 700],
          unit: 'px',
          w: 450,
          h: 400,
          x: 80,
          y: 40,
          orientation: 'l',
        },
      });
    }
    if (type === 'png') {
      exportComponentAsPNG(refChart, {
        fileName: `${name}-${moment().format()}.png`,
      });
    }

    setOpen(false);
  };

  const onExportToCSV = () => {
    const headers = labels.map((label) => label.toString());
    if (name === 'Compliments' || name === 'Complaints') {
      const body = {};
      labels.forEach((label, i) => (body[label] = datasets?.[0]?.data?.[i].toString()));

      exportCSVFile([name, ...headers], [{ 0: 'Number of Cases', ...body }], name);
    } else {
      const exportData = datasets.map((dataset) => {
        const body = {};
        labels.forEach((label, index) => {
          body[label] = dataset?.data?.[index].toString();
        });
        return { 1: dataset.label, ...body };
      });
      exportCSVFile([name, ...headers], exportData, name);
    }

    document.getElementById('downloadLink').click();
  };
  return (
    <>
      <Box
        boxShadow="0px 3px 6px #0000000D"
        width="100%"
        marginLeft={desktop ? '24px' : 0}
        height="100%"
        className={classes.barContainer}
      >
        {loadingReports && (
          <div className={classes.loading}>
            <Typography variant="h6" style={{ marginBottom: 8 }}>
              {name}
            </Typography>
            <h1>loading...</h1>
          </div>
        )}
        <Box
          padding="0px 32px 0"
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          position="relative"
          borderBottom="1px solid rgba(0, 0, 0, 0.12)"
        >
          <Button
            className={classes.sectionText1}
            style={{ cursor: 'pointer' }}
            onClick={() => setOpen(!open)}
            aria-controls="simple-menu-12"
            aria-haspopup="true"
          >
            <img src={exportIcon} className={classes.exportIcon} />
            Download
          </Button>

          <Box
            onClose={() => setOpen(false)}
            boxShadow="0 4px 8px rgba(0,0,0,.1)"
            top="60px"
            right="35px"
            minWidth="100px"
            style={{
              position: 'absolute',
              display: open ? 'block' : 'none',
              background: '#fff',
              borderRadius: 5,
              zIndex: 10,
            }}
          >
            <MenuItem onClick={onExportToCSV}> Data</MenuItem>
            <MenuItem
              onClick={() => {
                if (navigator.userAgent.indexOf('like Mac') !== -1) {
                  toast.error('Please use Safari to export PNG ');
                  return;
                }
                onSelectOption('png');
              }}
            >
              Image
            </MenuItem>
            <MenuItem onClick={() => onSelectOption('pdf')}>PDF</MenuItem>
          </Box>
        </Box>
        <a id="downloadLink" />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          maxWidth={785}
          maxHeight={490}
          height={490}
          ref={refChart}
          marginBottom="20px"
          marginTop="20px"
          margin="auto"
        >
          <Box padding="10px 0">
            <Typography variant="h6">{name}</Typography>
          </Box>
          <Line
            data={{
              labels,
              datasets,
            }}
            width={100}
            height={100}
            options={{
              maintainAspectRatio: false,
              fontSize: 25,
              legend: {
                labels: {
                  usePointStyle: true,
                  boxWidth: 5,
                },
              },
              scales: {
                xAxes: [
                  {
                    position: 'bottom',
                    ticks: {
                      max: 5,
                      min: 0,
                      stepSize: 10,
                    },
                  },
                ],
                yAxes: [
                  {
                    id: 'y-axis-percent',
                    position: 'left',

                    scaleLabel: {
                      display: true,
                      labelString: 'Number of Cases',
                      fontFamily: 'Roboto',
                      fontSize: 14,
                      fontColor: '#000',
                    },
                  },
                ],
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default LineCharts;
