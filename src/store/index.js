import { store } from 'quasar/wrappers';
import { createStore } from 'vuex';
import { auth } from './auth';
import { events } from './events';
import { templates } from './templates';
import { fields } from './fields';
import { members } from './members';
import { buttons } from './buttons';
import { users } from './users';
import { competitions } from './competitions';
import { tasks } from './tasks';
// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(( /* { ssrContext } */ ) => {
    return createStore({
        modules: {
            auth,
            events,
            templates,
            members,
            buttons,
            fields,
            users,
            competitions,
            tasks,
        },

        // enable strict mode (adds overhead!)
        // for dev mode and --debug builds only
        strict: process.env.DEBUGGING,
    });
});
