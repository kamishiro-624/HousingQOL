import { drawTracer } from "../util/tracer";

let tracerX;
let tracerY;
let tracerZ;
let tracingPlayer = false;
let traceTargetName;

register("renderWorld", () => {
    if (!tracingPlayer) return;

    const player = World.getAllPlayers().find((player) => player.getName().toLowerCase() === traceTargetName);
    if (player) {
        tracerX = player.getX();
        tracerY = player.getY();
        tracerZ = player.getZ();
    }

    if (tracerX && tracerY && tracerZ) {
        drawTracer(tracerX, tracerY, tracerZ, 0, 1, 0, 1, 3);
    }
});

function internalDrawTracer(playerName) {
    ChatLib.chat(`&6&l[Housing QOL] &r&6Drawing a tracer to &e${playerName}`);
    ChatLib.chat(`&6&l[Housing QOL] &r&6Run &e/stoptracer &r&6to stop drawing the tracer.`);
    tracingPlayer = true;
    traceTargetName = playerName.toLowerCase();
}

function stopTracer() {
    tracerX = null;
    tracerY = null;
    tracerZ = null;
    tracingPlayer = false;
    ChatLib.chat("&6&l[Housing QOL] &r&6Stopped drawing the tracer.");
}

function findPlayer(...args) {
    if (args === undefined || args.length !== 1 || args.every((arg) => arg.trim() === "")) {
        ChatLib.chat("&6&l[Housing QOL] &r&6Usage: &e/hlocate <playerName>&r");
        return;
    }

    const playerName = args[0].toLowerCase();
    const players = World.getAllPlayers();

    const foundPlayer = players.find((player) => player.getName().toLowerCase() === playerName);
    if (foundPlayer) {
        const playerPos = foundPlayer;
        ChatLib.chat(`&6&l[Housing QOL] &r&6Player &e${foundPlayer.getName()} &r&6is located at: &eX: ${playerPos.getX()}, Y: ${playerPos.getY()}, Z: ${playerPos.getZ()}`);

        const message = new Message(
            new TextComponent(`&6&l[Housing QOL] &r&6Would you like to draw a tracer to &e${foundPlayer.getName()}&r&6? `),
                new TextComponent("&a[Yes]").setClick("run_command", `/internal-hqol_drawtracer ${foundPlayer.getName()}`).setHoverValue("&7Click to draw a tracer to this player."),
            )

        ChatLib.chat(message);
    }
}

register("command", stopTracer).setName("stoptracer").setAliases("stoptrace", "st");
register(`command`, internalDrawTracer).setName("internal-hqol_drawtracer");
register("command", findPlayer).setName("hlocate").setAliases("hloc", "hlocateplayer");