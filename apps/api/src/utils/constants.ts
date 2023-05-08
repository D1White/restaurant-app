export const SLUG_REGEX = new RegExp(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const MIN_PRICE = 0.01;

export const getRedisKey = (base: string, key?: string) => (key ? `${base}:${key}` : base);
