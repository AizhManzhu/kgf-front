import { boot } from 'quasar/wrappers';
import { abilitiesPlugin, Can } from '@casl/vue';
import { Ability } from '@casl/ability';

const ability = new Ability();
export { ability };

export default boot(({ app }) => {
  app.use(abilitiesPlugin, ability, {
    useGlobalProperties: true,
  }).component(Can.name, Can);

  app.config.globalProperties.$ability = ability;
});
