import { unarmed, unarmedFile, unarmedWithToken } from './axios';

export const getFormType = (orgId) =>
  unarmed().get(`/form-types/available?organizationId=${orgId}`);

export const updateMe = (data) => unarmedWithToken().put('/me', data);

export const getMe = async (token) => unarmedWithToken(token).get('/me');

export const getOrganizationsByState = async (subdomain) => {
  try {
    const { data, headers } = await unarmed().get(
      `/organizations/subdomain/${subdomain}`
    );
    return { data: data[0], headers };
  } catch (error) {}
};

export const uploadFormImg = async (img, setLoaderPorcentage) => {
  try {
    const { data } = await unarmedFile().post('/files', img, {
      onUploadProgress: (progressEvent) => {
        setLoaderPorcentage(
          Math.round((progressEvent.loaded * 100) / progressEvent.total)
        );
      },
    });
    return {
      url: data.url,
      hashId: data.hashid,
      public_url: data.public_url,
      mimetype: data.mimetype,
    };
  } catch (error) {
    throw error;
  }
};

export const signupUser = (data) => unarmed().post('/signup', data);

export const getFormInfo = (id, orgId, token) => {
  if (token) {
    return unarmedWithToken(token).get(`/forms/${id}?organizationId=${orgId}`);
  }

  return unarmed().get(`/forms/${id}?organizationId=${orgId}`);
};

export const getCivilianCases = (id, token, isAdmin, page, limit) => {
  if (isAdmin) {
    return unarmedWithToken(token).get(
      `/forms?userId=${id}&page=${page}&limit=${limit}`
    );
  }

  return unarmedWithToken(token).get(
    `/forms?organizationId=${id}&page=${page}&limit=${limit}`
  );
};

export const attachFormToSocialSignup = (token, formId) =>
  unarmedWithToken(token).post(`/login/social`, { formId });

export const getFormReports = (organizationId, params) =>
  unarmed().get(`/forms/stats?organizationId=${organizationId}&${params}`);

export const onSignupWithSocial = (formId) =>
  unarmedWithToken().post('/signup/social', formId && { formId });

export const getQuestionBank = () => unarmedWithToken().get(`/questions`);

export const onGetFaqs = (organizationId) =>
  unarmedWithToken().get(`/faq?organizationId=${organizationId}`);

export const getSingleFormType = (id) =>
  unarmedWithToken().get(`/form-types/${id}`);

export const createFormType = (form) => unarmedWithToken().post('/forms', form);

export const getOptions = (organizationId, formType, unwindBy) =>
  unarmedWithToken().get(
    `/forms/stats/options?organizationId=${organizationId}&formType=${formType}&unwindBy=${unwindBy}`
  );

export const getOptionsDate = (params) => unarmedWithToken().get(`/forms/stats/options/date?${params}`);

export const changeUserpasswordFromProfile = (data) =>
  unarmedWithToken().put('/me/password', data);

export const getPasswordReset = (email, subdomain) =>
  unarmed().get(`/password/reset`, {
    params: { email, subdomain },
  });

export const onPasswordReset = (data) =>
  unarmed().post('/password/reset', data);
