"use strict";

export const Api = (code, msg) => {
  return {
    code: code,
    message: msg,
  };
};

export const success = (code, msg, playload) => (
    {
        code: code,
        message: msg,
        result : playload
    }
)