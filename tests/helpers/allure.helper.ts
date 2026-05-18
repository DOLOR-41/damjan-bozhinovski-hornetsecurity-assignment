import { step as allureStep } from 'allure-js-commons';

/** Wraps a block as an Allure step (shown in the report hierarchy). */
export async function step<T>(name: string, body: () => Promise<T>): Promise<T> {
  return allureStep(name, body);
}
