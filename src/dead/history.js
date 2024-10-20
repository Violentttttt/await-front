import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';

export const history = createBrowserHistory();

export const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history,
  // Можно добавить опции, если нужно, например: ключ состояния или чтение и запись из хранилища
});