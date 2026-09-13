import settings from "../config";

const detectedItems = new Map();
let nextCheckTime = 0;

function getNBT() {
    if (!settings.settings.nbtLogger) return;

    const frequency = Math.max(1, Number(settings.settings.nbtCheckFrequency) || 1); // fallback to 1
    const currentTime = Date.now();
    if (currentTime < nextCheckTime) return;
    nextCheckTime = currentTime + (1000 / frequency); // idk why i had to do this but the function step time wouldnt change soo

    const playerArray = World.getAllPlayers();
    // console.log(playerArray);
    // ChatLib.chat("Logged to console!");

    playerArray.forEach(player => {
        const heldItem = player.getItemInSlot(0);
        const itemName = heldItem ? heldItem.getName().removeFormatting() : "Empty Hand";
        const playerName = player.getName();
        const playeruuid = player.getUUID().toString();
        const itemNBT = heldItem ? heldItem.getNBT().toString() : "null";

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
            if (itemName !== "Empty Hand") ChatLib.chat("&6&l[Housing QOL] &e" + playerName + " &6is holding [&e" + itemName + "&6]!");
            return;
        }
        // item must be new
        detectedItems.set(playeruuid, itemNBT);
        // ChatLib.chat("Stored new data in Map!");
        if (itemName !== "Empty Hand") ChatLib.chat("&6&l[Housing QOL] &e" + playerName + " &6is holding [&e" + itemName + "&6]!");
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