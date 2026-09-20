import settings from "../config";

const jlRegex = /^(?:\[([^\]]+)\]\s+)?(\w+)\s+(entered|left)\s+the\s+world\.$/;
let botJoinStart = 0;
let possibleBotJoins = 0;
let suppressUntil = 0;

function checkMessage(_msgPartsDirect, event) {
    if (!settings.settings.botHider) return;

    const message = ChatLib.getChatMessage(event);
    const msgParts = message.match(jlRegex);
    if (!msgParts) return;

    const now = Date.now();
    const hasRank = msgParts[1] !== undefined;
    const jlEvent = msgParts[3];

    if (now - botJoinStart > 4000) {
        botJoinStart = now;
        possibleBotJoins = 0;
    }

    if (!hasRank && jlEvent === "entered") {
        possibleBotJoins++;
        if (possibleBotJoins >= 4) {
            suppressUntil = now + 4000; // wait!
        }
    }

    if (!hasRank && now < suppressUntil) {
        cancel(event);
    }
}

register("chat", checkMessage).setCriteria("${msgPartsDirect} the world.");