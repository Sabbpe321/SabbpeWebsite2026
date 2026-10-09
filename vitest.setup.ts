import '@testing-library/jest-dom/vitest';
// Type augmentation for vitest-axe matchers (its auto-extend runtime file is empty in 0.1.0).
import 'vitest-axe/extend-expect';
import { afterEach, expect } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as axeMatchers from 'vitest-axe/matchers';

expect.extend(axeMatchers);
afterEach(cleanup);
