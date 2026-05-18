import { pagesFixture } from './pages.fixture';
import { resetTodoAppToDefaults } from '../../setup/app-state.helper';

/**
 * Resets localStorage before each test so scenarios start from seeded defaults.
 */
export const test = pagesFixture.extend({
  page: async ({ page }, use) => {
    await resetTodoAppToDefaults(page);
    await use(page);
  },
});
