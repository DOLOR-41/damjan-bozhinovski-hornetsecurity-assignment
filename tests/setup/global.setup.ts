import { mkdir } from 'fs/promises';
import path from 'path';

/** Ensures report output directories exist before the test run. */
export default async function globalSetup(): Promise<void> {
  await mkdir(path.join('reports', 'html'), { recursive: true });
  await mkdir(path.join('reports', 'allure-results'), { recursive: true });
}
