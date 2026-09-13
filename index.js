import settings from "./config";

import "./commands/colorCodeRef";
import "./modules/commandAliases";
import "./modules/signFix";
import "./commands/viewVariable";
import "./modules/soundLogger";
import "./modules/noAsterisk";
import "./modules/safeCreative";
import "./modules/chatUtilities";
import "./modules/circleGen";
import "./modules/partyAuto";
import "./commands/hidePlayer";
import "./modules/autoCollect";
import "./modules/nbtLogger";

import "./autoUpdate";

register("command", () => {
    settings.openGui();
}).setName("housingqol").setAliases("hqol", "housingqolsettings", "housingqolconfig");

ChatLib.chat("&6&l[Housing QOL] &r&6Housing QOL has been loaded! Type &e/housingqol &r&6or &e/hqol &r&6to open the configuration GUI.");