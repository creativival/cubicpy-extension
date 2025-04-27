/**
 * This is an extension for Xcratch.
 */

import iconURL from './cubicpy_logo_600x372.png';
import insetIconURL from './cubicpy_logo_80x80.png';
import translations from './translations.json';

/**
 * Formatter to translate the messages in this extension.
 * This will be replaced which is used in the React component.
 * @param {object} messageData - data for format-message
 * @returns {string} - translated message for the current locale
 */
let formatMessage = messageData => messageData.defaultMessage;

const entry = {
    get name () {
        return formatMessage({
            id: 'cubicpy.entry.name',
            default: 'CubicPy',
            description: 'name of the extension'
        });
    },
    extensionId: 'cubicpy',
    extensionURL: 'https://creativival.github.io/cubicpy-extension/dist/cubicpy.mjs',
    collaborator: 'creativival',
    iconURL: iconURL,
    insetIconURL: insetIconURL,
    get description () {
        return formatMessage({
            defaultMessage: 'Enjoy creating 3D voxel art!',
            description: 'Description for this extension',
            id: 'cubicpy.entry.description'
        });
    },
    featured: true,
    disabled: false,
    bluetoothRequired: false,
    internetConnectionRequired: true,
    helpLink: 'https://creativival.github.io/cubicpy-extension/',
    setFormatMessage: formatter => {
        formatMessage = formatter;
    },
    translationMap: translations
};

export {entry}; // loadable-extension needs this line.
export default entry;
