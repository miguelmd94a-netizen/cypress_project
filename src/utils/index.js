import moment from 'moment';

export function formatPhoneNumber(string, fullString) {
  const cleaned = `${string}`.replace(/\D/g, '');
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    const intlCode = match[1] ? '+1 ' : '';
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }

  if (Array.isArray(string)) {
    return string.join(', ');
  }
  if (
    fullString &&
    fullString.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})/)
  ) {
    return moment(fullString).format('MM/DD/YYYY');
  }
  return string;
}

export function getOrg(location) {
  const org = location.href.split('.')[0].split('//')[1];
  if (org.includes('localhost')) {
    return 'portal-dev';
  }

  return org;
}

export const transformStatus = (status) => status;
