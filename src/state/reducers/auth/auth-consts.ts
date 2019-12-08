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

export const GET_CURRENT_USER_PENDING = `${authPrefix}/GET_CURRENT_USER${pendingSuffix}`;
export const GET_CURRENT_USER_SUCCESS = `${authPrefix}/GET_CURRENT_USER${successSuffix}`;
export const GET_CURRENT_USER_FAILURE = `${authPrefix}/GET_CURRENT_USER${failureSuffix}`;

export const VALIDATE_TOKEN_PENDING = `${authPrefix}/VALIDATE_TOKEN${pendingSuffix}`;
export const VALIDATE_TOKEN_SUCCESS = `${authPrefix}/VALIDATE_TOKEN${successSuffix}`;
export const VALIDATE_TOKEN_FAILURE = `${authPrefix}/VALIDATE_TOKEN${failureSuffix}`;

export const SIGN_OUT = `${authPrefix}/SIGN_OUT`;
