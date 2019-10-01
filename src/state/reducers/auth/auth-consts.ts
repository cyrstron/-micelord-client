import {
  rootPrefix,
  pendingSuffix,
  successSuffix,
  failureSuffix,
} from '../../consts';

export const authPrefix = `${rootPrefix}/auth`;

export const SIGN_UP_PENDING = `${authPrefix}/SIGN_UP${pendingSuffix}`;
export const SIGN_UP_SUCCESS = `${authPrefix}/SIGN_UP${successSuffix}`;
export const SIGN_UP_FAILURE = `${authPrefix}/SIGN_UP${failureSuffix}`;

export const SIGN_IN_PENDING = `${authPrefix}/SIGN_IN${pendingSuffix}`;
export const SIGN_IN_SUCCESS = `${authPrefix}/SIGN_IN${successSuffix}`;
export const SIGN_IN_FAILURE = `${authPrefix}/SIGN_IN${failureSuffix}`;

export const SET_PENDING = `${authPrefix}/SET_PENDING`;

export const SET_TOKEN = `${authPrefix}/SET_TOKEN`;
export const RESET_TOKEN = `${authPrefix}/RESET_TOKEN`;

export const SET_ERROR = `${authPrefix}/SET_ERROR`;
export const RESET_ERROR = `${authPrefix}/RESET_ERROR`;