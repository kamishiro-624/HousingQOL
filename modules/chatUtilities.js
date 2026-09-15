import settings from "../config";
import { copyText } from "../util/chatUtils";

const plrMessageRegex = /^(?:[\xA7&][0-9a-fk-or])*\s*\+?\s*(?:(?:[\xA7&][0-9a-fk-or])*(?:[A-Za-z]+)\s*>\s*|(?:[\xA7&][0-9a-fk-or])*(?:From|To)\s+)?(?:(?:[\xA7&][0-9a-fk-or])*\[[^\]]+\]\s*)*(?:[\xA7&][0-9a-fk-or])*([A-Za-z0-9_]{1,16})(?:[\xA7&][0-9a-fk-or])*:\s+(.+)$/

register("command", (...textSplit) => {
    const text = textSplit.join(" ")
        .replaceAll("§","&");
    console.log("&aCopied message to clipboard: " + text);
    copyText(text);
    // all this just to copy a msg :/
}).setName("hIcMs");

function addTags(event) {
    if (!settings.settings.chatUtilities) return;

    const chatMessage = ChatLib.getChatMessage(event, true);
    const tags = [];

    if (settings.settings.chatUtilTpPlr) {
        const teleportTag = teleportPlayer(chatMessage);
        if (teleportTag) tags.push(teleportTag, " ");
    }

    if (settings.settings.chatUtilCopyMsg) {
        const copyTag = copyMessage(chatMessage);
        if (copyTag) tags.push(copyTag, " "); // js arraylist
    }

    if (settings.settings.chatUtilHmutePlr) {
        const muteTag = hmutePlayer(chatMessage);
        if (muteTag) tags.push(muteTag, " ");
    }

    if (tags.length === 0) return;

    cancel(event);

    if (!settings.settings.showFormattingInChat) {
        sendMessage(event, tags);
    } else { // I SWEAR THIS TOOK LIKE 5 HOURS WTF?? (I WAS MUTED ON HYPIXEL WHEN MAKING IT TYSM BOAT42 FOR HELPING ME TEST)
        // const message = ChatLib.getChatMessage(event, true);
        const cleanMessage = ChatLib.getChatMessage(event);
        const match = cleanMessage.match(plrMessageRegex);

        // console.log("CM: " + cleanMessage);

        if (!match) {
            sendMessage(event, tags);
            // ChatLib.chat("no match");
            return;
        }

        const playerMessage = match[2];
        // console.log("match2: " + playerMessage);

        if (playerMessage.includes("&")) {
            const messageObj = new Message(event);
            
            // console.log("MO: " + messageObj);

            // const messagePrefixes = cleanMessage.substring(0,cleanMessage.indexOf(match[2]));
            const messageParts = messageObj.getMessageParts();

            // const replacementPart = new TextComponent(replacementText)
            //    .setFormatted(true);

            for (let index = 0; index < messageParts.length; index++) {
                const messagePart = messageParts[index];
                messagePart.setText(messagePart.getText().replace(/&/g, "§").trim());
            }

            // ChatLib.chat("TB: " + messagePrefixes);
            //ChatLib.chat(messageObj);
            
            messageObj.addTextComponent(" ");
            tags.forEach((tag) => messageObj.addTextComponent(tag));
            ChatLib.chat(messageObj);

        } else {
            sendMessage(event, tags);
        }
    }
}

function sendMessage(event, tags) {
    const message = new Message(event);
    message.addTextComponent(" ");
    tags.forEach((tag) => message.addTextComponent(tag));
    ChatLib.chat(message);
}


register("chat", addTags);

/* function formatChatMessage(chatMessage) {
    if (settings.settings.showFormattingInChat) return chatMessage;

    const cleanMessage = chatMessage.removeFormatting();
    const match = cleanMessage.match(plrMessageRegex);
    if (!match) return chatMessage; // the message was already unformatted (how)

    const contentStart = match.index + match[0].lastIndexOf(match[2]);
    const rawContentStart = getRawIndex(cleanMessage, chatMessage, contentStart);

    return chatMessage.slice(0, rawContentStart) + chatMessage.slice(rawContentStart).removeFormatting();
} */

function getRawIndex(cleanMessage, rawMessage, cleanIndex) {
    let rawIndex = 0;
    let currentCleanIndex = 0;

    while (rawIndex < rawMessage.length && currentCleanIndex < cleanIndex) {
        if ((rawMessage[rawIndex] === "&" || rawMessage[rawIndex] === "§") && rawIndex + 1 < rawMessage.length) {
            rawIndex += 2;
        } else {
            rawIndex++;
            currentCleanIndex++;
        }
    }

    return rawIndex;
}

function teleportPlayer(chatMessage) {
    const cleanMessage = chatMessage.removeFormatting();

    const match = cleanMessage.match(plrMessageRegex);
	if (!match) return;

    const player = match[1];
    const message = match[2];

    return new TextComponent("&6[T]").setClick("run_command", "/tp " + player).setHover("show_text", "Click to teleport to &e" + player);
}

function copyMessage(chatMessage) {
    const cleanMessage = chatMessage.removeFormatting();
    let finalMessage = "ERROR COPYING MESSAGE";

    if (settings.settings.addFormattingCopyMsg) {
        finalMessage = chatMessage;
    } else {
        finalMessage = cleanMessage;
    }

    return new TextComponent("&e[C]").setClick("run_command", "/hIcMS " + finalMessage).setHover("show_text", "Click to copy message to clipboard");
}

function hmutePlayer(chatMessage) {
    const cleanMessage = chatMessage.removeFormatting();

    const match = cleanMessage.match(plrMessageRegex);
	if (!match) return;

    const player = match[1];
    const message = match[2];

    return new TextComponent("&c[M]").setClick("run_command", "/h mute " + player).setHover("show_text", "Click to mute &e" + player);
}
