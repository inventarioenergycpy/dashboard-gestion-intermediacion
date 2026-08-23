import { DOC_TEMPLATES } from '../js/templates/doc-templates.js';
import { store, DEFAULT_USERS, DEFAULT_PROJECTS, DEFAULT_INTERLOCUTORS, DEFAULT_DEALS } from '../js/store.js';

console.log('✅ DOC_TEMPLATES count:', Object.keys(DOC_TEMPLATES).length);
console.log('✅ DEFAULT_USERS count:', DEFAULT_USERS.length);
console.log('✅ DEFAULT_PROJECTS count:', DEFAULT_PROJECTS.length);
console.log('✅ DEFAULT_INTERLOCUTORS count:', DEFAULT_INTERLOCUTORS.length);
console.log('✅ DEFAULT_DEALS count:', DEFAULT_DEALS.length);

// Verify users Javier & Daniel
const javier = DEFAULT_USERS.find(u => u.email === 'inventario.energycpy@gmail.com');
const daniel = DEFAULT_USERS.find(u => u.email === 'gonzalezmarcelo2105ypf@gmail.com');

if (!javier || !daniel) {
  throw new Error('Users Javier or Daniel not configured properly!');
}
console.log('✅ Authorized users verified:', javier.name, `(${javier.email})`, 'and', daniel.name, `(${daniel.email})`);

// Verify legal templates
['nda_bilateral', 'ncnda_broker', 'mandato_overprice_dueño', 'cobrokering_fee_sharing', 'mfpa_broker_fondo', 'client_registration_sheet', 'deal_specific_addendum'].forEach(k => {
  if (!DOC_TEMPLATES[k]) {
    throw new Error(`Missing doc template: ${k}`);
  }
});
console.log('✅ All 3-layer legal templates verified successfully!');
