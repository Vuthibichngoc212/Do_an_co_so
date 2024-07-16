import { PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { IDashboardState } from './features/dashboard.slice';

export const dashboardPersistConfig: PersistConfig<IDashboardState> = {
  key: 'dashboard',
  storage
};
