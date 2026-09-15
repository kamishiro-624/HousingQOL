// thanks to housinghelper for methods and stuff
export function nbtToItem(nbtString) {
    let nbt = net.minecraft.nbt.JsonToNBT.func_180713_a(nbtString); // stupid obfuscation (gets nbt object)
    let id = nbt.func_74779_i('id'); // string item name
    let count = nbt.func_74771_c('Count'); // amount
    let damage = nbt.func_74765_d('Damage'); // durability damage
    let tag = nbt.func_74781_a('tag'); // get tag (enchants and stuff)
    let item = new Item(id); // item object in CT

    item.setStackSize(count);
    item = item.getItemStack(); // mc object

    item.func_77964_b(damage); // set durability

    if (tag) item.func_77982_d(tag); // set tag
    item = new Item(item); // another ct object
    return item;
}
