import { adapterConfig } from '../../config/adapter';

export async function adapter(object) {
  let adaptedObject = object;

  for (const i in object) {
    if (typeof adapterConfig[i] == 'string') {
      adaptedObject = {
        ...adaptedObject,
        [adapterConfig[i]]: object[i],
      };

      delete adaptedObject[i];
    }
  }

  return adaptedObject;
}
