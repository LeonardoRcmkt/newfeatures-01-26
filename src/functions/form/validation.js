import * as validationFunctions from './validationFunctions.js';
import { validationRules } from '../../config/validation/validationRules';
import { validationMessages } from '../../config/validation/validationMessages';

export async function validate(name, value) {
  const rules = {
    ...validationRules.base,
    ...validationRules[name],
  };

  const messages = {
    ...validationMessages.base,
    ...validationMessages[name],
  };

  if (typeof value === 'string') {
    value = value.trim();
  }

  if (rules.required && value === '') {
    return messages.required;
  }

  if (
    typeof rules.minLength === 'number' &&
    value.length < rules.minLength &&
    value != ''
  ) {
    return messages.minLength;
  }

  if (typeof rules.maxLength === 'number' && value.length > rules.maxLength) {
    return messages.maxLength;
  }
  if (typeof rules.regex === 'string') {
    const regex = new RegExp(rules.regex);
    if (!regex.test(value)) {
      return messages.regex;
    }
  }

  if (typeof validationFunctions[rules.functionName] === 'function') {
    const res = validationFunctions[rules.functionName](value);
    if (typeof res === 'string') {
      return res;
    }
  }

  if (typeof rules.options === 'object' && !rules.options.includes(value)) {
    return messages.options;
  }

  if (
    typeof rules.equalsTo === 'string' &&
    document.getElementById(rules.equalsTo).value != value
  ) {
    return messages.equalsTo;
  }

  return true;
}
