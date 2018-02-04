export default async function preRenderMiddleware(store: any, components: any, params: any) {
  const dispatch = store.dispatch;
  const state = store.getState();
  return Promise.all(
    components
      .reduce((previous: any, current: any) => {
        return (current.need || []).concat(previous);
      }, [])
      .map((need: any) => {
        return dispatch(need(params, state));
      }),
  );
}
