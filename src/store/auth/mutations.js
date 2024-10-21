/* eslint-disable */
export function someMutation(/* state */) {
  function AUTH_REQUEST(state) {
    console.log(state);
  }

  function AUTH_SUCCESS(state, token) {
    console.log(state, token);
  }

  function AUTH_ERROR(state) {
    console.log(state);
  }
}
