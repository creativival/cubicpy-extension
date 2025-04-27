import BlockType from '../../extension-support/block-type';
import ArgumentType from '../../extension-support/argument-type';
import translations from './translations.json';
import blockIcon from './cubicpy_40x40_transparent.png';

/**
 * Formatter which is used for translation.
 * This will be replaced which is used in the runtime.
 * @param {object} messageData - format-message object
 * @returns {string} - message for the locale
 */
let formatMessage = messageData => messageData.defaultMessage;

/**
 * Setup format-message for this extension.
 */
const setupTranslations = () => {
  const localeSetup = formatMessage.setup();
  if (localeSetup && localeSetup.translations[localeSetup.locale]) {
    Object.assign(
      localeSetup.translations[localeSetup.locale],
      translations[localeSetup.locale]
    );
  }
};

const EXTENSION_ID = 'cubicpy';

/**
 * URL to get this extension as a module.
 * When it was loaded as a module, 'extensionURL' will be replaced a URL which is retrieved from.
 * @type {string}
 */
let extensionURL = 'https://creativival.github.io/cubicpy-extension/dist/cubicpy.mjs';

/**
 * Scratch 3.0 blocks for example of Xcratch.
 */
class ExtensionBlocks {

  /**
   * @return {string} - the name of this extension.
   */
  static get EXTENSION_NAME() {
    return formatMessage({
      id: 'cubicpy.name',
      default: 'CubicPy',
      description: 'name of the extension'
    });
  }

  /**
   * @return {string} - the ID of this extension.
   */
  static get EXTENSION_ID() {
    return EXTENSION_ID;
  }

  /**
   * URL to get this extension.
   * @type {string}
   */
  static get extensionURL() {
    return extensionURL;
  }

  /**
   * Set URL to get this extension.
   * The extensionURL will be changed to the URL of the loading server.
   * @param {string} url - URL
   */
  static set extensionURL(url) {
    extensionURL = url;
  }

  /**
   * Construct a set of blocks for CubicPy.
   * @param {Runtime} runtime - the Scratch 3.0 runtime.
   */
  constructor(runtime) {
    /**
     * The Scratch 3.0 runtime.
     * @type {Runtime}
     */
    this.runtime = runtime;
    this.roomName = '1000'
    this.bodyData = [];
    this.objectType = 'cube';
    this.sizeX = 1.0;
    this.sizeY = 1.0;
    this.sizeZ = 1.0;
    this.mass = 1.0;
    this.rotationH = 0;
    this.rotationP = 0;
    this.rotationR = 0;
    this.basePoint = 0;
    this.isRemovable = true;
    this.velocityX = 0;
    this.velocityY = 0;
    this.velocityZ = 0;
    this.topLeftText = '';
    this.topBottomText = '';
    this.commands = [];

    this.socket = null;
    this.inactivityTimeout = null; // 非アクティブタイマー
    this.inactivityDelay = 2000; // 2秒後に接続を切断

    if (runtime.formatMessage) {
      // Replace 'formatMessage' to a formatter which is used in the runtime.
      formatMessage = runtime.formatMessage;
    }
  }

  /**
   * @returns {object} metadata for this extension and its blocks.
   */
  getInfo() {
    setupTranslations();
    return {
      id: ExtensionBlocks.EXTENSION_ID,
      name: ExtensionBlocks.EXTENSION_NAME,
      extensionURL: ExtensionBlocks.extensionURL,
      blockIconURI: blockIcon,
      showStatusButton: false,
      blocks: [
        {
          opcode: 'setRoomName',
          blockType: BlockType.COMMAND,
          text: formatMessage({
            id: 'cubicpy.setRoomName',
            default: 'Set room name to [ROOMNAME]',
            description: 'set room name'
          }),
          arguments: {
            ROOMNAME: {
              type: ArgumentType.STRING,
              defaultValue: '1000'
            }
          }
        },
        {
          opcode: 'setCubeScale',
          blockType: BlockType.COMMAND,
          text: formatMessage({
            id: 'cubicpy.setCubeScale',
            default: 'Set box size to [SIZE_X] [SIZE_Y] [SIZE_Z]',
            description: 'set box size'
          }),
          arguments: {
            SIZE_X: {
              type: ArgumentType.NUMBER,
              defaultValue: 1.0
            },
            SIZE_Y: {
              type: ArgumentType.NUMBER,
              defaultValue: 1.0
            },  
            SIZE_Z: {
              type: ArgumentType.NUMBER,
              defaultValue: 1.0
            }
          }
        },
        {
          opcode: 'setCubeMass',
          blockType: BlockType.COMMAND,
          text: formatMessage({
            id: 'cubicpy.setCubeMass',
            default: 'Set cube mass to [MASS]',
            description: 'set cube mass'
          }),
          arguments: {
            MASS: {
              type: ArgumentType.NUMBER,
              defaultValue: 1.0
            }
          }
        },
        {
          opcode: 'setCubeRotation',
          blockType: BlockType.COMMAND,
          text: formatMessage({
            id: 'cubicpy.setCubeRotation',
            default: 'Set cube h p r rotation to [H] [P] [R]',
            description: 'set cube rotation'
          }),
          arguments: {
            H: {
              type: ArgumentType.NUMBER,
              defaultValue: 0
            },
            P: {
              type: ArgumentType.NUMBER,
              defaultValue: 0
            },
            R: {
              type: ArgumentType.NUMBER,
              defaultValue: 0
            }
          }
        },
        {
          opcode: 'setCubeBasePoint',
          blockType: BlockType.COMMAND,
          text: formatMessage({
            id: 'cubicpy.setCubeBasePoint',
            default: 'Set cube base point to [BASE_POINT]',
            description: 'set cube base point'
          }),
          arguments: {
            BASE_POINT: {
              type: ArgumentType.NUMBER,
              defaultValue: 0
            }
          }
        },
        {
          opcode: 'setCubeRemove',
          blockType: BlockType.COMMAND,
          text: formatMessage({
            id: 'cubicpy.setCubeRemove',
            default: 'Set cube removable to [REMOVE]',
            description: 'set cube remove'
          }),
          arguments: {
            REMOVE: {
              type: ArgumentType.STRING,
              defaultValue: 'off',
              menu: 'onOrOffMenu'
            }
          }
        },
        {
          opcode: 'setCubeVelocity',
          blockType: BlockType.COMMAND,
          text: formatMessage({
            id: 'cubicpy.setCubeVelocity',
            default: 'Set cube velocity to [VELOCITY_X] [VELOCITY_Y] [VELOCITY_Z]',
            description: 'set cube velocity'
          }),
          arguments: {
            VELOCITY_X: {
              type: ArgumentType.NUMBER,
              defaultValue: 0
            },
            VELOCITY_Y: {
              type: ArgumentType.NUMBER,
              defaultValue: 0
            },
            VELOCITY_Z: {
              type: ArgumentType.NUMBER,
              defaultValue: 0
            }
          }
        },
        {
          opcode: 'addCube',
          blockType: BlockType.COMMAND,
          text: formatMessage({
            id: 'cubicpy.addCube',
            default: 'Create box at x: [X] y: [Y] z: [Z] red: [RED] green: [GREEN] blue: [BLUE] alpha: [ALPHA]',
            description: 'create box'
          }),
          arguments: {
            X: {
              type: ArgumentType.NUMBER,
              defaultValue: 0
            },
            Y: {
              type: ArgumentType.NUMBER,
              defaultValue: 0
            },
            Z: {
              type: ArgumentType.NUMBER,
              defaultValue: 0
            },
            RED: {
              type: ArgumentType.NUMBER,
              defaultValue: 0
            },
            GREEN: {
              type: ArgumentType.NUMBER,
              defaultValue: 0
            },
            BLUE: {
              type: ArgumentType.NUMBER,
              defaultValue: 0
            },
            ALPHA: {
              type: ArgumentType.NUMBER,
              defaultValue: 1
            }
          }
        },
        {
          opcode: 'sendData',
          blockType: BlockType.COMMAND,
          text: formatMessage({
            id: 'cubicpy.sendData',
            default: 'Send data',
            description: 'send data to server'
          }),
        },
        {
          opcode: 'clearData',
          blockType: BlockType.COMMAND,
          text: formatMessage({
            id: 'cubicpy.clearData',
            default: 'Clear data',
            description: 'clear data'
          }),
        },
        {
          opcode: 'translate',
          blockType: BlockType.COMMAND,
          text: formatMessage({
            id: 'cubicpy.translate',
            default: 'Set node at x: [X] y: [Y] z: [Z]',
            description: 'set node'
          }),
          arguments: {
            X: {
              type: ArgumentType.NUMBER,
              defaultValue: 0
            },
            Y: {
              type: ArgumentType.NUMBER,
              defaultValue: 0
            },
            Z: {
              type: ArgumentType.NUMBER,
              defaultValue: 0
            },
          }
        },
        {
          opcode: 'rotation',
          blockType: BlockType.COMMAND,
          text: formatMessage({
            id: 'cubicpy.rotation',
            default: 'Set node h p r rotation to [H] [P] [R]',
            description: 'set node'
          }),
          arguments: {
            X: {
              type: ArgumentType.NUMBER,
              defaultValue: 0
            },
            Y: {
              type: ArgumentType.NUMBER,
              defaultValue: 0
            },
            Z: {
              type: ArgumentType.NUMBER,
              defaultValue: 0
            },
            H: {
              type: ArgumentType.NUMBER,
              defaultValue: 0
            },
            P: {
              type: ArgumentType.NUMBER,
              defaultValue: 0
            },
            R: {
              type: ArgumentType.NUMBER,
              defaultValue: 0
            }
          }
        },
        {
          opcode: 'setCommand',
          blockType: BlockType.COMMAND,
          text: formatMessage({
            id: 'cubicpy.setCommand',
            default: 'Set command [COMMAND]',
            description: 'set command'
          }),
          arguments: {
            COMMAND: {
              type: ArgumentType.STRING,
              defaultValue: 'axis'
            }
          }
        },
        {
          opcode: 'setTopLeftText',
          blockType: BlockType.COMMAND,
          text: formatMessage({
            id: 'cubicpy.setTopLeftText',
            default: 'Display top left text: [TEXT]',
            description: 'display game text'
          }),
          arguments: {
            TEXT: {
              type: ArgumentType.STRING,
              defaultValue: 'Hello World',
            }
          }
        },
        {
          opcode: 'pushMatrix',
          blockType: BlockType.COMMAND,
          text: formatMessage({
            id: 'cubicpy.pushMatrix',
            default: 'Push Matrix',
            description: 'push matrix'
          }),
        },
        {
          opcode: 'popMatrix',
          blockType: BlockType.COMMAND,
          text: formatMessage({
            id: 'cubicpy.popMatrix',
            default: 'Pop Matrix',
            description: 'pop matrix'
          }),
        }
      ],
      menus: {
        onOrOffMenu: {
          acceptReporters: false,
          items: [
            {
              text: formatMessage({
                id: 'cubicpy.off',
                default: 'off',
                description: 'Menu item for off'
              }),
              value: 'off'
            },
            {
              text: formatMessage({
                id: 'cubicpy.on',
                default: 'on',
                description: 'Menu item for on'
              }),
              value: 'on'
            }
          ]
        }
      }
    };
  }

  setRoomName(args) {
    this.roomName = args.ROOMNAME;
  }

  clearData() {
    // this.roomName = '1000'; // 初期化しない（明示的に変更されるまで同じ値を使用する）
    this.bodyData = [];
    this.objectType = 'cube';
    this.sizeX = 1.0;
    this.sizeY = 1.0;
    this.sizeZ = 1.0;
    this.mass = 1.0;
    this.rotationH = 0;
    this.rotationP = 0;
    this.rotationR = 0;
    this.basePoint = 0;
    this.isRemovable = true;
    this.velocityX = 0;
    this.velocityY = 0;
    this.velocityZ = 0;
    this.topLeftText = '';
    this.topBottomText = '';
    this.commands = [];
  }

  pushMatrix() {    
    this.bodyData.push({
      type: 'push_matrix',
      pos: [x, y, z]
    })
  }

  popMatrix() {    
    this.bodyData.push({
      type: 'pop_matrix',
      pos: [x, y, z]
    })
  }

  translate(args) {  // method name changed from translate to translate.
    const x = Number(args.X);
    const y = Number(args.Y);
    const z = Number(args.Z);
    
    this.bodyData.push({
      type: 'translate',
      pos: [x, y, z]
    })
  }

  rotation(args) {
    const h = Number(args.H);
    const p = Number(args.P);
    const r = Number(args.R);
    
    this.bodyData.push({
      type: 'rotation',
      hpr: [h, p, r]
    })
  }

  setCubeScale(args) {
    this.sizeX = Number(args.SIZE_X);
    this.sizeY = Number(args.SIZE_Y);
    this.sizeZ = Number(args.SIZE_Z);
  }

  setCubeMass(args) {
    this.mass = Number(args.MASS);
  }

  setCubeRotation(args) {
    this.rotationH = Number(args.H);
    this.rotationP = Number(args.P);
    this.rotationR = Number(args.R);
  }

  setCubeBasePoint(args) {
    this.basePoint = Number(args.BASE_POINT);
  }

  setCubeRemove(args) {
    this.isRemovable = args.REMOVE;
    if (this.isRemovable === 'on') {
      this.isRemovable = true;
    } else {
      this.isRemovable = false;
    }
  }

  setCubeVelocity(args) {
    this.velocityX = Number(args.VELOCITY_X);
    this.velocityY = Number(args.VELOCITY_Y);
    this.velocityZ = Number(args.VELOCITY_Z);
  }

  addCube(args) {
    let x = Number(args.X);
    let y = Number(args.Y);
    let z = Number(args.Z);
    let scaleX = this.sizeX;
    let scaleY = this.sizeY;
    let scaleZ = this.sizeZ;
    let red = Number(args.RED);
    let green = Number(args.GREEN);
    let blue = Number(args.BLUE);
    let alpha = Number(args.ALPHA);
    let h = this.rotationH;
    let p = this.rotationP;
    let r = this.rotationR;
    let basePoint = this.basePoint;
    let isRemovable = this.isRemovable;
    let velocityX = this.velocityX;
    let velocityY = this.velocityY;
    let velocityZ = this.velocityZ;

    this.bodyData.push({
      type: 'cube',
      pos: [x, y, z],
      scale: [scaleX, scaleY, scaleZ],
      color: [red, green, blue],
      color_alpha: alpha,
      hpr: [h, p, r],
      basePoint: basePoint,
      remove: isRemovable,
      velocity: [velocityX, velocityY, velocityZ]
    });
  }

  // テキストを表示する
  setTopLeftText(args) {
    const text = args.TEXT;

    this.topLeftText = text;
  }

  setBottomLeftText(args) {
    const text = args.TEXT;

    this.bottomLeftText = text;
  }

  setCommand(args) {
    const command = args.COMMAND;
    this.commands.push(command);
  }

  sendData() {
    console.log('Sending data...');
    const date = new Date();
    const dataToSend = {
      bodyData: this.bodyData,
      date: date.toISOString()
    };

    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(dataToSend));
      console.log('Sent data to server (existing connection):', dataToSend);
      this.startInactivityTimer(); // タイマーを開始
    } else if (this.socket && this.socket.readyState === WebSocket.CONNECTING) {
      this.socket.onopen = () => {
        this.socket.send(this.roomName);
        console.log(`Joined room: ${this.roomName}`);
        this.socket.send(JSON.stringify(dataToSend));
        console.log('Sent data to server (connected):', dataToSend);
        this.startInactivityTimer(); // タイマーを開始
      };
    } else {
      this.socket = new WebSocket('wss://websocket.voxelamming.com');

      this.socket.onopen = () => {
        this.socket.send(this.roomName);
        console.log(`Joined room: ${this.roomName}`);
        this.socket.send(JSON.stringify(dataToSend));
        console.log('Sent data to server (new connection):', dataToSend);
        this.startInactivityTimer(); // タイマーを開始
      };

      this.socket.onerror = error => {
        console.error(`WebSocket error: ${error}`);
      };

      this.socket.onclose = () => {
        console.log('WebSocket connection closed.');
      };
    }
  }

  startInactivityTimer() {
    this.clearInactivityTimer(); // 既存のタイマーをクリア
    this.inactivityTimeout = setTimeout(() => {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        console.log('No data sent for 2 seconds. Closing WebSocket connection.');
        this.socket.close();
      }
    }, this.inactivityDelay);
  }

  clearInactivityTimer() {
    if (this.inactivityTimeout) {
      clearTimeout(this.inactivityTimeout);
      this.inactivityTimeout = null;
    }
  }

  roundNumbers(num_list) {
    if (this.isAllowedFloat) {
      return num_list.map(val => parseFloat(val.toFixed(2)));
    } else {
      return num_list.map(val => Math.floor(parseFloat(val.toFixed(1))));
    }
  }

  roundTwoDecimals(num_list) {
    return num_list.map(val => parseFloat(val.toFixed(2)));
  }

  insertAt(arr, index, value) {
    // 配列が必要な長さに達していない場合、空の要素を追加
    while (arr.length <= index) {
      arr.push(""); // 必要に応じて空の文字列を追加
    }
    arr[index] = value; // 指定した位置に値を挿入
  }
}

export {
  ExtensionBlocks as default,
  ExtensionBlocks as blockClass
};
