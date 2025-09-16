import { unarmedWithToken } from './axios';

export async function getStatesOfCountry() {
  try {
    const { data } = await unarmedWithToken().get(`/states`);
    return data;
  } catch (error) {
    console.log('error', error);
  }
}
export async function getCitiesOfState(stateIsoCode) {
  try {
    const { data } = await unarmedWithToken()
      .get(`/states/${stateIsoCode}/cities
    `);
    return data;
  } catch (error) {
    console.log('error', error);
  }
}
