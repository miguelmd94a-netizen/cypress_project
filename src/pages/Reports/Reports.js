import { Box, Container, CssBaseline, LinearProgress, Typography, useMediaQuery } from '@material-ui/core';
import React, { useEffect, useState, useCallback } from 'react';

import moment from 'moment';
import FilterListIcon from '@material-ui/icons/FilterList';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import FilterReports, { unwindByOptions } from './FilterReports';
import { getFormReports, getOptionsDate } from '../../services/unarmed';
import useOrganization from '../../hooks/useOrganization';
import useRadioFilter from '../../hooks/useRadioFilter';
import useGoogleTranslate from '../../hooks/useGoogleTranslate';
import useInput from '../../hooks/useInput';

import LineCharts from '../../components/LineChart';
import FilterMenuMobile from '../../components/FIlterMenuMobile';
import { logEvent } from '../../services/firebase';

const months = moment.monthsShort();

const filterSelectOptions = [
  { text: 'Compliments', value: 0, key: 'compliments' },
  { text: 'Complaints', value: 1, key: 'complaints' },
  { text: 'Complaints By Allegation', value: 3, key: 'complaintsByAllegation' },
  { text: 'Complaints By Discipline', value: 5, key: 'complaintsByDiscipline' },
  {
    text: 'Complaints By Disposition',
    value: 4,
    key: 'complaintsByDisposition',
  },
  {
    text: 'Complaints By Race/Ethnicity',
    value: 2,
    key: 'complaintsByRaceEthnicity',
  },
  {
    text: 'Complaints By Race',
    value: 8,
    key: 'complaintsByRace',
  },
  {
    text: 'Complaints By Ethnicity',
    value: 9,
    key: 'complaintsByEthnicity',
  },
  { text: 'Complaints By Reporter', value: 7, key: 'complaintsByReporter' },
  { text: 'Complaints By Source', value: 6, key: 'complaintsBySource' },
];

const Reports = () => {
  const [value, setValue] = useState(0);
  const { organizationData } = useOrganization();
  const dateRange = useRadioFilter('year');
  const filterSelectOption = useInput('All');

  const desktop = useMediaQuery('(min-width:1150px)');

  const caseType = useRadioFilter('All');

  const startYear = useInput(2015, null, null, parseInt);
  const endYear = useInput(parseInt(moment().format('YYYY')), null, null, parseInt);
  const startMonth = useInput(0, null, null, parseInt);
  const endMonth = useInput(parseInt(months.indexOf(moment().format('MMM'))), null, null, parseInt);

  const [startDate, setStartDate] = useState({
    year: 0,
    month: 0,
  });

  const [openFilter, setOpenFilter] = useState(false);
  const [reports, setReports] = useState([]);
  const [dateFromType, setDateFromType] = useState({
    year: 0,
    month: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectOptions, setSelectedOption] = useState([]);

  const onGetFormsReports = useCallback(
    async (params) => {
      try {
        const { data } = await getFormReports(organizationData?._id, params);
        let formattedData = null;
        if (value === 0) {
          if (dateRange.radio === 'year') {
            formattedData = data.map((dt) => ({
              name: dt._id?.year,
              Compliments: dt.count,
            }));
          }
          if (dateRange.radio === 'month') {
            formattedData = data.map((dt) => ({
              name: `${dt._id?.month} / ${dt?._id?.year?.toString().split('').slice(2).join('')}`,
              Compliments: dt.count,
            }));
          }
        }

        if (value === 1) {
          if (dateRange.radio === 'year') {
            formattedData = data.map((dt) => ({
              name: dt._id?.year,
              Complaints: dt.count,
            }));
          }
          if (dateRange.radio === 'month') {
            formattedData = data.map((dt) => ({
              name: `${dt._id?.month} / ${dt?._id?.year?.toString().split('').slice(2).join('')}`,
              Complaints: dt.count,
            }));
          }
        }

        if (
          value === 2 ||
          value === 3 ||
          value === 4 ||
          value === 5 ||
          value === 6 ||
          value === 7 ||
          value === 8 ||
          value === 9
        ) {
          if (dateRange.radio === 'year' && filterSelectOption.value === 'All') {
            formattedData = data.map((dt) => {
              const obj = { ...dt };
              delete obj._id;
              return {
                name: dt._id?.year,
                ...obj,
              };
            });
          }
          if (dateRange.radio === 'month' && filterSelectOption.value === 'All') {
            formattedData = data.map((dt) => {
              const obj = { ...dt };
              delete obj._id;
              return {
                name: `${dt._id?.month} / ${dt?._id?.year?.toString().split('').slice(2).join('')}`,
                ...obj,
              };
            });
          }
          if (filterSelectOption.value !== 'All' && dateRange.radio === 'year') {
            formattedData = data.map((dt) => ({
              name: dt?._id?.year,
              [filterSelectOption.value]: dt.count,
            }));
          }
          if (filterSelectOption.value !== 'All' && dateRange.radio === 'month') {
            formattedData = data.map((dt) => {
              const obj = { ...dt };
              delete obj._id;
              return {
                name: `${dt._id?.month} / ${dt?._id?.year?.toString().split('').slice(2).join('')}`,
                [filterSelectOption.value]: dt.count,
              };
            });
          }
        }

        setReports(formattedData);
      } catch (error) {
        console.log(error);
      }
    },
    [value, dateRange.radio, filterSelectOption.value, organizationData?._id]
  );

  const onGetFormsReportsFromFilters = useCallback(
    // eslint-disable-next-line no-shadow
    ({ startYear, endYear, startMonth, endMonth, mode }) => {
      const filterSelected = filterSelectOption.value;

      if (organizationData?._id && mode === 'year' && value === 0) {
        onGetFormsReports(`rangeType=year&formType=COMPLIMENT&startYear=${startYear}&endYear=${endYear}`);
      }

      if (organizationData?._id && mode === 'year' && value === 1) {
        onGetFormsReports(`rangeType=year&formType=COMPLAINT&startYear=${startYear}&endYear=${endYear}`);
      }

      if (organizationData?._id && mode === 'month' && value === 0) {
        onGetFormsReports(
          `rangeType=month&formType=COMPLIMENT&startYear=${startYear}&endYear=${endYear}&startMonth=${
            startMonth + 1
          }&endMonth=${endMonth + 1}`
        );
      }

      if (organizationData?._id && mode === 'month' && value === 1) {
        onGetFormsReports(
          `rangeType=month&formType=COMPLAINT&startYear=${startYear}&endYear=${endYear}&startMonth=${
            startMonth + 1
          }&endMonth=${endMonth + 1}`
        );
      }

      if (organizationData?._id && mode === 'year' && value === 2) {
        onGetFormsReports(
          `rangeType=year&formType=COMPLAINT&startYear=${startYear}&endYear=${endYear}&unwindBy=raceEthnicity&unwindByValue=${filterSelected}`
        );
      }

      if (organizationData?._id && mode === 'month' && value === 2) {
        onGetFormsReports(
          `rangeType=month&formType=COMPLAINT&startYear=${startYear}&endYear=${endYear}&startMonth=${
            startMonth + 1
          }&endMonth=${endMonth + 1}&unwindBy=raceEthnicity&unwindByValue=${filterSelected}`
        );
      }

      if (organizationData?._id && mode === 'year' && value === 3) {
        onGetFormsReports(
          `rangeType=year&formType=COMPLAINT&startYear=${startYear}&endYear=${endYear}&unwindBy=allegations&unwindByValue=${filterSelected}`
        );
      }

      if (organizationData?._id && mode === 'month' && value === 3) {
        onGetFormsReports(
          `rangeType=month&formType=COMPLAINT&startYear=${startYear}&endYear=${endYear}&startMonth=${
            startMonth + 1
          }&endMonth=${endMonth + 1}&unwindBy=allegations&unwindByValue=${filterSelected}`
        );
      }

      if (organizationData?._id && mode === 'year' && value === 4) {
        onGetFormsReports(
          `rangeType=year&formType=COMPLAINT&startYear=${startYear}&endYear=${endYear}&unwindBy=dispositions&unwindByValue=${filterSelected}`
        );
      }

      if (organizationData?._id && mode === 'month' && value === 4) {
        onGetFormsReports(
          `rangeType=month&formType=COMPLAINT&startYear=${startYear}&endYear=${endYear}&startMonth=${
            startMonth + 1
          }&endMonth=${endMonth + 1}&unwindBy=dispositions&unwindByValue=${filterSelected}`
        );
      }

      if (organizationData?._id && mode === 'year' && value === 5) {
        onGetFormsReports(
          `rangeType=year&formType=COMPLAINT&startYear=${startYear}&endYear=${endYear}&unwindBy=discipline&unwindByValue=${filterSelected}`
        );
      }

      if (organizationData?._id && mode === 'month' && value === 5) {
        onGetFormsReports(
          `rangeType=month&formType=COMPLAINT&startYear=${startYear}&endYear=${endYear}&startMonth=${
            startMonth + 1
          }&endMonth=${endMonth + 1}&unwindBy=discipline&unwindByValue=${filterSelected}`
        );
      }

      if (organizationData?._id && mode === 'year' && value === 6) {
        onGetFormsReports(
          `rangeType=year&formType=COMPLAINT&startYear=${startYear}&endYear=${endYear}&unwindBy=source&unwindByValue=${filterSelected}`
        );
      }

      if (organizationData?._id && mode === 'month' && value === 6) {
        onGetFormsReports(
          `rangeType=month&formType=COMPLAINT&startYear=${startYear}&endYear=${endYear}&startMonth=${
            startMonth + 1
          }&endMonth=${endMonth + 1}&unwindBy=source&unwindByValue=${filterSelected}`
        );
      }

      if (organizationData?._id && mode === 'year' && value === 7) {
        onGetFormsReports(
          `rangeType=year&formType=COMPLAINT&startYear=${startYear}&endYear=${endYear}&unwindBy=reporter&unwindByValue=${filterSelected}`
        );
      }

      if (organizationData?._id && mode === 'month' && value === 7) {
        onGetFormsReports(
          `rangeType=month&formType=COMPLAINT&startYear=${startYear}&endYear=${endYear}&startMonth=${
            startMonth + 1
          }&endMonth=${endMonth + 1}&unwindBy=reporter&unwindByValue=${filterSelected}`
        );
      }

      if (organizationData?._id && mode === 'year' && value === 8) {
        onGetFormsReports(
          `rangeType=year&formType=COMPLAINT&startYear=${startYear}&endYear=${endYear}&unwindBy=race&unwindByValue=${filterSelected}`
        );
      }

      if (organizationData?._id && mode === 'month' && value === 8) {
        onGetFormsReports(
          `rangeType=month&formType=COMPLAINT&startYear=${startYear}&endYear=${endYear}&startMonth=${
            startMonth + 1
          }&endMonth=${endMonth + 1}&unwindBy=race&unwindByValue=${filterSelected}`
        );
      }

      if (organizationData?._id && mode === 'year' && value === 9) {
        onGetFormsReports(
          `rangeType=year&formType=COMPLAINT&startYear=${startYear}&endYear=${endYear}&unwindBy=ethnicity&unwindByValue=${filterSelected}`
        );
      }

      if (organizationData?._id && mode === 'month' && value === 9) {
        onGetFormsReports(
          `rangeType=month&formType=COMPLAINT&startYear=${startYear}&endYear=${endYear}&startMonth=${
            startMonth + 1
          }&endMonth=${endMonth + 1}&unwindBy=ethnicity&unwindByValue=${filterSelected}`
        );
      }
    },
    [value, organizationData, filterSelectOption.value, onGetFormsReports]
  );

  const onGetOptionsDate = useCallback(() => {
    if (organizationData) {
      const formType = value > 0 ? 'COMPLAINT' : 'COMPLIMENT';

      const unwindByValue = filterSelectOption.value;
      const unwindBy = unwindByOptions[value];

      const paramsData = {
        formType,
        unwindByValue,
        organizationId: organizationData?._id,
        ...(unwindBy ? { unwindBy } : {}),
      };
      const params = new URLSearchParams(paramsData).toString();

      setLoading(true);
      getOptionsDate(params).then((res) => {
        const { data } = res;

        const newStartYear = data.year;
        const newStartMonth = data.month - 1;

        if (newStartYear === startYear.value && newStartMonth === startMonth.value) {
          onGetFormsReportsFromFilters({
            startYear: startYear.value,
            endYear: endYear.value,
            startMonth: startMonth.value,
            endMonth: endMonth.value,
            mode: dateRange.radio,
          });
        } else {
          setStartDate({
            year: newStartYear,
            month: newStartMonth,
          });
        }

        startYear.setValue(newStartYear);
        startMonth.setValue(newStartMonth);
        setDateFromType(data);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, organizationData, startMonth, endMonth, startYear, endYear, dateRange.radio, filterSelectOption.value]);

  useEffect(() => {
    if (organizationData?.features) {
      const availableOptions = filterSelectOptions.filter((currentOption) =>
        organizationData?.features?.data[currentOption.key] ? currentOption : undefined
      );

      setValue(availableOptions[0].value);
      setSelectedOption(availableOptions);
    }
  }, [organizationData]);

  useGoogleTranslate();

  useEffect(() => {
    if (openFilter) {
      window.document.body.style.overflow = 'hidden';
    } else {
      window.document.body.style.overflow = 'visible';
    }

    onGetOptionsDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, organizationData, filterSelectOption.value]);

  useEffect(() => {
    if (startYear.value === dateFromType.year && startMonth.value < dateFromType.month - 1) {
      startMonth.setValue(dateFromType.month - 1);
    }
  }, [startMonth, startYear, dateFromType]);

  useEffect(() => {
    onGetFormsReportsFromFilters({
      startYear: startDate.year,
      endYear: endYear.value,
      startMonth: startDate.month,
      endMonth: endMonth.value,
      mode: dateRange.radio,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endYear.value, endMonth.value, dateRange.radio]);

  useEffect(() => {
    if (value) {
      const reportType = filterSelectOptions.find((selection) => selection.value === value);
      logEvent('data_report', {
        filter_by: reportType.text,
      });
    }
  }, [value]);

  const chartNames = [
    {
      name: 'Compliments',
      chartName: 'Compliment',
    },
    {
      name: 'Complaints',
    },
    {
      name: 'Complaints by Race/Ethnicity',
    },
    {
      name: 'Complaints by Allegation',
    },
    {
      name: 'Complaints By Disposition',
    },
    {
      name: 'Complaints By Discipline',
    },
    {
      name: 'Complaints By Source',
    },
    {
      name: 'Complaints By Reporter',
    },
    {
      name: 'Complaints by Race',
    },
    {
      name: 'Complaints Ethnicity',
    },
  ];

  const chartName = chartNames[value] || { name: '', chartName: '' };

  return (
    <>
      <Layout>
        <CssBaseline />
        {loading ? <LinearProgress /> : <div style={{ height: 4, backgroundColor: '#364F74' }} />}
        <Header />
        <Box style={{ background: '#FAFBFF' }} minHeight="100vh">
          <Container style={{ position: 'relative' }}>
            <Box
              style={{ paddingTop: 30 }}
              display="flex"
              flexDirection={desktop ? 'row' : 'column'}
              justifyContent="space-between"
            >
              {!desktop && (
                <Box display="flex" alignItems="center" justifyContent="flex-end" padding="10px 0">
                  <FilterListIcon
                    htmlColor="#333"
                    style={{ marginRight: 10, cursor: 'pointer' }}
                    onClick={() => setOpenFilter(true)}
                  />
                  <Typography style={{ fontWeight: 500, cursor: 'pointer' }} onClick={() => setOpenFilter(true)}>
                    Filter
                  </Typography>
                </Box>
              )}
              {desktop && (
                <FilterReports
                  value={value}
                  organizationId={organizationData?._id}
                  loading={loading}
                  dateFromType={dateFromType}
                  setValue={setValue}
                  dateRange={dateRange}
                  optionValue={filterSelectOption}
                  caseType={caseType}
                  startYear={{
                    ...startYear,
                    onChange: (e) => {
                      setStartDate((dates) => ({
                        ...dates,
                        year: parseInt(e.target.value),
                      }));
                      startYear.onChange(e);
                    },
                  }}
                  startMonth={{
                    ...startMonth,
                    onChange: (e) => {
                      setStartDate((dates) => ({
                        ...dates,
                        month: parseInt(e.target.value),
                      }));
                      startMonth.onChange(e);
                    },
                  }}
                  endYear={endYear}
                  endMonth={endMonth}
                  endMonthIndex={months.indexOf(moment().format('MMM'))}
                  selectOptions={selectOptions}
                />
              )}
              <LineCharts
                reports={reports}
                name={chartName.name}
                chartName={chartName.chartName}
                dateRange={dateRange.radio}
              />
            </Box>
          </Container>
        </Box>
      </Layout>
      {openFilter && !desktop && (
        <FilterMenuMobile>
          <FilterReports
            value={value}
            organizationId={organizationData?._id}
            loading={loading}
            dateFromType={dateFromType}
            setValue={setValue}
            dateRange={dateRange}
            optionValue={filterSelectOption}
            caseType={caseType}
            startYear={startYear}
            startMonth={startMonth}
            endYear={endYear}
            endMonth={endMonth}
            onClose={() => setOpenFilter(false)}
            features={organizationData?.features}
            endMonthIndex={months.indexOf(moment().format('MMM'))}
            selectOptions={selectOptions}
          />
        </FilterMenuMobile>
      )}
    </>
  );
};

export default Reports;
