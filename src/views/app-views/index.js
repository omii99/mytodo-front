import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig';

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover='content' />}>
      <Switch>
        {/* <Route
          exact
          path={`${APP_PREFIX_PATH}/home`}
          component={lazy(() => import(`./home`))}
        /> */}
        
        <Route
          exact
          path={`${APP_PREFIX_PATH}/todo/list`}
          component={lazy(() =>
            import(`./todo/todo-list/todoMain`)
          )}
        />
        <Route
          exact
          path={`${APP_PREFIX_PATH}/todo/list/add`}
          component={lazy(() =>
            import(
              `./todo/todo-list/todo-listTable/addTodo`
            )
          )}
        />
        <Route
          exact
          path={`${APP_PREFIX_PATH}/todo/list/edit/:id`}
          component={lazy(() =>
            import(
              `./todo/todo-list/todo-listTable/editTodo`
            )
          )}
        />
       
       
      
       
       
       
       
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/home`} />;
      </Switch>
    </Suspense>
  );
};

export default React.memo(AppViews);
