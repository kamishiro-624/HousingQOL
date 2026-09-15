// I couldn't find any good documentation or examples for the CT player object so theres a LOT of commented debug code 
import settings from "../config";
import { nbtToItem } from "../util/creativeUtils";
import { copyText } from "../util/chatUtils";

const C10PacketCreativeInventoryAction = Java.type("net.minecraft.network.play.client.C10PacketCreativeInventoryAction");

const detectedItems = new Map();
let nextCheckTime = 0;

// TODO: Hide self NBT tagging < nbtHideSelf >
// Hide other player's logs < nbtIgnoreList >

register("command", (...textSplit) => {
    const text = textSplit.join(" ");
    console.log("&aCopied message to clipboard: " + text);
    copyText(text);
}).setName("hIcM");

function sendNBT(playerInstance, playerName, itemName, itemNBT, heldItem) { // send the NBT data in chat
    
    let ignoredPlayers = settings.settings.nbtIgnoreList.split(", ").map((player) => player.trim().toLowerCase());

    const options = new Message();
    const copyNBT = new TextComponent("&e[Copy NBT]").setClick("run_command", "/hIcM " + itemNBT).setHover("show_text", "&eClick to copy item NBT!");
    const encodedNBT = encodeURIComponent(itemNBT);
    const giveItem = new TextComponent("&d[Give Item]").setClick("run_command", "/internal-hqol_giveItem " + encodedNBT + " " + itemName).setHover("show_text", "&eClick to give item in inventory!");
    
    const itemStack = heldItem.getItemStack();
    const itemTags = itemStack.func_77978_p(); // ItemStack.getTagCompound()

    if (itemTags == null) {
        if (!settings.settings.nbtAllItems) {
            // console.log("Vanilla item was not logged: " + itemName);
            return;
        }
    }

    if (settings.settings.nbtHideSelf) {
        if (Player.getName() === playerName) {
            // console.log("Hid self-log!");
            return;
        }
    }

    if (settings.settings.nbtIgnoreList) {
        // ChatLib.chat(ignoredPlayers.join(", "));
        if (ignoredPlayers.includes(playerName)) {
            // console.log("Hid log from ignored player!");
            return;
        }
    }

    if (settings.settings.chatUtilities && settings.settings.chatUtilCopyMsg) {
        const msg = "&6&l[Housing QOL] &e" + playerName + " &6is holding [&e" + itemName + "&6]!"
        const cleanmsg = "[Housing QOL] " + playerName + " is holding [" + itemName + "]!"

        const initial = new TextComponent(msg);
        const copyTag = new TextComponent("&e[C]").setClick("run_command", "/hIcM " + cleanmsg).setHover("show_text", "&eClick to copy message to clipboard");
        const messageWithCopyTag = new Message(initial, " ", copyTag); // didnt know you could do it like this lol

        ChatLib.chat(messageWithCopyTag);
    } else {
    ChatLib.chat("&6&l[Housing QOL] &e" + playerName + " &6is holding [&e" + itemName + "&6]!");
    }

    options.addTextComponent(copyNBT)
        .addTextComponent(" ")
        .addTextComponent(giveItem);
    ChatLib.chat(options);
}

register("command", (nbtString, ...itemNameSplit) => {
    if (!Player.asPlayerMP().player.field_71075_bZ.field_75098_d) { // stupid obfuscation
        ChatLib.chat("&6&l[Housing QOL] &cYou must be in creative mode to recieve this item!");
        return;
    }

    const giveItem = nbtToItem(decodeURIComponent(nbtString));
    let targetInventoryIndex;
    const inventory = Player.asPlayerMP().player.field_71071_by;

    const itemName = itemNameSplit.join(" ");

    for (let i = 0; i < 9; i++) {
        if (inventory.field_70462_a[i] == null) { // first available slot
            targetInventoryIndex = i;
            break;
        }
    }

    if (targetInventoryIndex !== undefined) {
        let slotId = targetInventoryIndex + 36; // correction factor
        Client.sendPacket(new C10PacketCreativeInventoryAction(slotId, giveItem.getItemStack()));
        ChatLib.chat("&6&l[Housing QOL] &r&6You have been given [&e" + itemName + "&6]!");
    } else {
        ChatLib.chat("&6&l[Housing QOL] &r&cPlease free up a space in your hotbar to recieve the item!");
    }
}).setName("internal-hqol_giveItem");



function getNBT() {
    if (!settings.settings.nbtLogger) return;

    const frequency = Math.max(1, Number(settings.settings.nbtCheckFrequency) || 10); // fallback to 10
    const currentTime = Date.now();
    if (currentTime < nextCheckTime) return;
    nextCheckTime = currentTime + (1000 / frequency); // idk why i had to do this but the function step time wouldnt change soo

    const playerArray = World.getAllPlayers();
    // console.log(playerArray);
    // ChatLib.chat("Logged to console!");

    playerArray.forEach(player => {
        const heldItem = player.getItemInSlot(0);
        const itemName = heldItem ? heldItem.getName().removeFormatting() : "Empty Hand"; // cool if else ? : thing 
        const playerName = player.getName();
        const playeruuid = player.getUUID().toString();
        const itemNBT = heldItem ? heldItem.getNBT().toString() : "null";

        const playerInstance = player;

        // console.log(playerName + " is holding [" + itemName + "]!");
        // console.log("Item NBT: " + itemNBT);
        // ChatLib.chat("Dumped held item NBT data to console!");

        const savedItemNBT = detectedItems.get(playeruuid);
        // ChatLib.chat("Found item in set for " + playerName + ": " + savedItemNBT);

        if (savedItemNBT === itemNBT) return; // same item
        // ChatLib.chat(playerName + "'s held item NBT: " + itemNBT);
        if (savedItemNBT === undefined) { // no item stored in map
            detectedItems.set(playeruuid, itemNBT);
            // ChatLib.chat("Stored initial data in Map!");
            if (itemName !== "Empty Hand") sendNBT(playerInstance, playerName, itemName, itemNBT, heldItem);
            return;
        }
        // item must be new
        detectedItems.set(playeruuid, itemNBT);
        // ChatLib.chat("Stored new data in Map!");
        if (itemName !== "Empty Hand") sendNBT(playerInstance, playerName, itemName, itemNBT, heldItem);
        return;
    });

    /*
    console.log("Dumping map contents below: ");
    detectedItems.forEach((value, key) => {
        console.log(`${key} >> ${value}`);
    });
    */
}

register("step", getNBT).setFps(20);

/*
register("command", () => {
    const playerArray = World.getAllPlayers();
    console.log(playerArray);
    // ChatLib.chat("Logged to console!");

    playerArray.forEach(player => {
        const heldItem = player.getItemInSlot(0);
        const itemName = heldItem ? heldItem.getName().removeFormatting() : "Empty Hand";
        const playerName = player.getName();
        const playeruuid = player.getUUID().toString();
        const itemNBT = heldItem ? heldItem.getNBT().toString() : "null";

        console.log(playerName + " is holding [" + itemName + "]!");
        console.log("Item NBT: " + itemNBT);
        // ChatLib.chat("Dumped held item NBT data to console!");

        const savedItemNBT = detectedItems.get(playeruuid);
        // ChatLib.chat("Found item in set for " + playerName + ": " + savedItemNBT);

        if (savedItemNBT === itemNBT) return; // same item
        // ChatLib.chat(playerName + "'s held item NBT: " + itemNBT);
        if (savedItemNBT === undefined) { // no item stored in map
            detectedItems.set(playeruuid, itemNBT);
            // ChatLib.chat("Stored initial data in Map!");
            if (itemName !== "Empty Hand") ChatLib.chat("&6&l[Housing QOL] &e" + playerName + " &6is holding [&e" + itemName + "&6]!");
            return;
        }
        // item must be new
        detectedItems.set(playeruuid, itemNBT);
        // ChatLib.chat("Stored new data in Map!");
        if (itemName !== "Empty Hand") ChatLib.chat("&6&l[Housing QOL] &e" + playerName + " &6is holding [&e" + itemName + "&6]!");
        return;
    });

    console.log("Dumping map contents below: ");
    detectedItems.forEach((value, key) => {
        console.log(`${key} >> ${value}`);
    });
}).setName("getplayers");
*/