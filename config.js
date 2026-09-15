import Settings from "../Amaterasu/core/Settings";
import DefaultConfig from "../Amaterasu/core/DefaultConfig";

const mainConfig = new DefaultConfig("HousingQOL", "data/settings.json");

  // Auto Updater
mainConfig.addSwitch({
  configName: "autoUpdToggle",
  title: "Auto Updater",
  description: "Automatically updates your version of HousingQOL when new releases are published. Use /hqolupdate to manually check for updates.",
  category: "General",
  value: true
});

  // Sign Fix
mainConfig.addSwitch({
  configName: "signFix",
  title: "Hide \"Unable to locate sign\" messages",
  description: "Toggles visibility of \"Unable to locate sign\" messages.",
  category: "Chat",
  value: true
});
  // Command Aliases
mainConfig.addSwitch({
  configName: "cmdAliases",
  title: "Command Aliases",
  description: "Enables aliases of commonly used Housing commands, full list and syntax in GitHub README.",
  category: "General",
  value: false
});

// Command Aliases CONFIG

mainConfig.addMultiCheckbox({
    configName: "cmdAliasesConfig",
    title: "Toggle Specific Command Aliases",
    description: "Toggle on and off specific aliases for Command Aliases. (You can scroll in the menu.)",
    category: "General",
    placeHolder: "View Commands",
    subcategory: null,

    options: [
      {
        title: "Housing Kick (/hk)",
        configName: "housingKickToggle",
        value: true
      },
      {
        title: "Housing Ban (/hb)",
        configName: "housingBanToggle",
        value: true
      },
      {
        title: "Housing Mute (/hm)",
        configName: "housingMuteToggle",
        value: true
      },
      {
        title: "Housing Unban (/hunban)",
        configName: "housingUnbanToggle",
        value: true
      },
      {
        title: "Housing Unmute (/hunmute)",
        configName: "housingUnmuteToggle",
        value: true
      },
      {
        title: "Test Placeholders (/tph)",
        configName: "testPlaceholdersToggle",
        value: true
      },
      {
        title: "Housing Demote (/hd)",
        configName: "housingDemoteToggle",
        value: true
      },
      {
        title: "Housing Warn (/hw)",
        configName: "housingWarnToggle",
        value: true
      },
      {
        title: "Parkour Reset (/pkr)",
        configName: "parkourResetToggle",
        value: true
      },
      {
        title: "Parkour Checkpoint (/pkc)",
        configName: "parkourCheckpointToggle",
        value: true
      }
    ],

    shouldShow(data) {
      return data.cmdAliases;
    }
});

// Safe Creative
mainConfig.addSwitch({
  configName: "safeCreative",
  title: "Safe Creative Mode",
  description: "Prevents the breaking of specified blocks while in creative mode.",
  category: "Building",
  value: false
});

export const safeCreativeConfigOptions = [
   {
      title: "Chest",
      configName: "Chest",
      value: true
    },
    {
      title: "Trapped Chest",
      configName: "Trapped Chest",
      value: true
    },
    {
      title: "Hopper",
      configName: "Hopper",
      value: true
    },
    {
      title: "Dropper",
      configName: "Dropper",
      value: true
    },
    {
      title: "Dispenser",
      configName: "Dispenser",
      value: true
    },
    {
      title: "Furnace",
      configName: "Furnace",
      value: true
    },
    {
      title: "Sign",
      configName: "Sign",
      value: true
    }
]

mainConfig.addMultiCheckbox({
  configName: "safeCreativeConfig",
  title: "Safe Creative Blocks",
  description: "Toggle a list of preset blocks for Safe Creative. (You can scroll in the menu.)",
  category: "Building",
  placeHolder: "Edit",

  options: safeCreativeConfigOptions,

  shouldShow(data) {
    return data.safeCreative;
  }
})

mainConfig.addTextInput({
  configName: "customSafeCreativeConfig",
  title: "Custom Blacklist",
  description: "Put block names with metadata in the custom blacklist, separated by commas. Check README for block list and more info. (Highly recommended!)",
  category: "Building",
  value: "",
  placeHolder: "Grass Block, Wool:3, Stone:A",

  shouldShow(data) {
    return data.safeCreative;
  }
});

  // Sound Logger
mainConfig.addSwitch({
  configName: "soundLogger",
  title: "Sound Logger",
  description: "Logs sounds played in the game to chat. (Ignores footsteps, digging, and GUI sounds by default.)",
  category: "General",
  value: false
});

mainConfig.addSwitch({
  configName: "soundLoggerIncludeAll",
  title: "Include All Sounds",
  description: "Includes ALL sounds in the chat log. (SPAM!)",
  category: "General",
  value: false,

  shouldShow(data) {
    return data.soundLogger;
  }
});

mainConfig.addSwitch({
  configName: "soundLoggerShowPosition",
  title: "Show Position",
  description: "Displays the position of each logged sound.",
  category: "General",
  value: false,

  shouldShow(data) {
    return data.soundLogger;
  }
});

// No Asterisk
mainConfig.addSwitch({
  configName: "noAsterisk",
  title: "Remove Asterisk from Housing Messages",
  description: "Removes the leading asterisk from incoming housing messages.",
  category: "Chat",
  value: false
});

// Chat Utilities
mainConfig.addSwitch({
  configName: "chatUtilities",
  title: "Chat Utilities",
  description: "Provides various utilities relating to chat messages.",
  category: "Chat",
  value: false
});

mainConfig.addMultiCheckbox({
    configName: "chatUtilConfig",
    title: "Toggle Specific Chat Utilities",
    description: "Toggle on and off specific utilities for Chat Utilities. (You can scroll in the menu.)",
    category: "Chat",
    placeHolder: "View Commands",
    subcategory: null,

    options: [
      {
        title: "Teleport To Player",
        configName: "chatUtilTpPlr",
        value: true
      }, {
        title: "Copy Message",
        configName: "chatUtilCopyMsg",
        value: true
      }, {
        title: "Housing Mute Player",
        configName: "chatUtilHmutePlr",
        value: true
      }
    ],

    shouldShow(data) {
      return data.chatUtilities;
    }
});

mainConfig.addSwitch({
  configName: "addFormattingCopyMsg",
  title: "Add Formatting to Copied Messages",
  description: "Adds formatting tags (color codes) to messages when copying them.",
  category: "Chat",
  value: false,

  shouldShow(data) {
    return data.chatUtilCopyMsg && data.chatUtilities;
  }
});

mainConfig.addSwitch({
  configName: "showFormattingInChat",
  title: "Show formatting in chat",
  description: "Adds formatting (color codes) to messages when they are sent in chat.",
  category: "Chat",
  value: false,

  shouldShow(data) {
    return data.chatUtilities;
  }
});

// Circle Generator
mainConfig.addSwitch({
  configName: "circleGenerator",
  title: "Circle Generator",
  description: "Generates and renders circles given origin and radius.",
  category: "Building",
  value: false
});

mainConfig.addTextInput({
  configName: "circleX",
  title: "Origin X Coordinate",
  description: "X Coordinate for the origin of the circle; leave blank to use player position.",
  category: "Building",
  value: "",
  placeHolder: "X",

  shouldShow(data) {
    return data.circleGenerator;
  }
});

mainConfig.addTextInput({
  configName: "circleY",
  title: "Origin Y Coordinate",
  description: "Y Coordinate for the origin of the circle; leave blank to use player position.",
  category: "Building",
  value: "",
  placeHolder: "Y",

  shouldShow(data) {
    return data.circleGenerator;
  }
});

mainConfig.addTextInput({
  configName: "circleZ",
  title: "Origin Z Coordinate",
  description: "Z Coordinate for the origin of the circle; leave blank to use player position.",
  category: "Building",
  value: "",
  placeHolder: "Z",

  shouldShow(data) {
    return data.circleGenerator;
  }
});

mainConfig.addTextInput({
  configName: "circleR",
  title: "Circle Radius",
  description: "Radius of the circle. Do not leave blank.",
  category: "Building",
  value: "",
  placeHolder: "10",

  shouldShow(data) {
    return data.circleGenerator;
  }
});

mainConfig.addButton({
  configName: "circleRenderBtn",
  title: "Render Circle",
  description: "Click to toggle rendering the circle.",
  category: "Building",

  onClick() {
    ChatLib.command("rendercircle", true);
  },
  shouldShow(data) {
    return data.circleGenerator;
  }
})

mainConfig.addSwitch({
  configName: "circleUpright",
  title: "Upright Circle",
  description: "Causes the circle to be rendered upright instead of on the ground. Do not change X Y Z values. You may or may not need to re-render the circle.",
  category: "Building",
  value: false,

  shouldShow(data) {
    return data.circleGenerator;
  }
});

mainConfig.addSwitch({
  configName: "circleRotate",
  title: "Rotated Circle",
  description: "Rotates the circle 90 degrees. You may or may not need to re-render the circle.",
  category: "Building",
  value: false,

  shouldShow(data) {
    return data.circleGenerator;
  }
});

// Auto Accept Party
mainConfig.addSwitch({
  configName: "pAutoAccept",
  title: "Party Auto-Accept",
  description: "Automatically accepts party invites from all people. Can be configured to whitelist selected people.",
  category: "Chat",
  value: false,
});

mainConfig.addSwitch({
  configName: "pWhitelistToggle",
  title: "Party Whitelist",
  description: "Ignores all party requests except for ones sent by whitelisted people.",
  category: "Chat",
  value: false,

  shouldShow(data) {
    return data.pAutoAccept;
  }
});

mainConfig.addTextInput({
  configName: "paaWhitelist",
  title: "Edit Whitelist",
  description: "Provide players to whitelist, seperated by commas.",
  category: "Chat",
  value: "",
  placeHolder: "<player>, <player2>, ...",

  shouldShow(data) {
    return data.pWhitelistToggle;
  }
});

mainConfig.addSwitch({
  configName: "autoCollect",
  title: "Auto Collect",
  description: "Automatically runs /collect on Cuhtails' Freebuild during Coin Collect Challenges",
  category: "Miscellaneous",
  value: false
});

mainConfig.addSwitch({
  configName: "nbtLogger",
  title: "NBT Logger",
  description: "Logs held items' NBT in chat.",
  category: "General",
  value: false
});

mainConfig.addTextInput({
  configName: "nbtCheckFrequency",
  title: "Check Frequency",
  description: "How many times to check for NBT per second, default is 10. Do not make this too high or you may crash.",
  category: "General",
  value: "",
  placeHolder: "10",

  shouldShow(data) {
    return data.nbtLogger;
  }
});

mainConfig.addSwitch({
  configName: "nbtAllItems",
  title: "Log All Items",
  description: "Logs all items in chat, including vanilla items with no custom NBT changes.",
  category: "General",
  value: false,

  shouldShow(data) {
    return data.nbtLogger;
  }
});

mainConfig.addSwitch({
  configName: "nbtHideSelf",
  title: "Hide Self Logs",
  description: "Ignores logs from yourself.",
  category: "General",
  value: false,

  shouldShow(data) {
    return data.nbtLogger;
  }
});

mainConfig.addTextInput({
  configName: "nbtIgnoreList",
  title: "Ignored Players",
  description: "Players in this list will not have their held items' NBT data logged in chat. Seperate by commas.",
  category: "General",
  value: "",
  placeHolder: "<player1>, <player2>",

  shouldShow(data) {
    return data.nbtLogger;
  }
});


const settings = new Settings("HousingQOL", mainConfig, "data/ColorScheme.json");

settings.onCloseGui(() => settings.configsClass._saveToFile());

// This code block was genuinely confusing, I still don't really know how it works but hopefully I can get a better grasp on it soon...
settings.setCategorySort((a, b) => {
  const order = ["General", "Chat", "Building", "Miscellaneous"];
  return order.indexOf(a.category) - order.indexOf(b.category);
}).apply();

export default settings;