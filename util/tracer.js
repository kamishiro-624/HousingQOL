/**
 * Draws a tracer line to specified coordinates.
 * 
 * @param {number} x - The X coordinate.
 * @param {number} y - The Y coordinate.
 * @param {number} z - The Z coordinate.
 * @param {number} r - The red component of the color.
 * @param {number} g - The green component of the color.
 * @param {number} b - The blue component of the color.
 * @param {number} a - The alpha component of the color.
 * @param {number} width - The width of the tracer line.
 */

export function drawTracer(x, y, z, r, g, b, a, width) {
    const dx = x - Player.getRenderX();
    const dy = y - Player.getRenderY();
    const dz = z - Player.getRenderZ();

    // for start position
    const yaw = Player.getYaw() * Math.PI / 180;
    const pitch = Player.getPitch() * Math.PI / 180;
    const eye = Player.isSneaking() ? 1.54 : 1.62;
    const sx = -Math.sin(yaw) * Math.cos(pitch) * 0.1;
    const sy = eye - Math.sin(pitch) * 0.1;
    const sz = Math.cos(yaw) * Math.cos(pitch) * 0.1;

    GL11.glPushMatrix();
    GL11.glDisable(GL11.GL_TEXTURE_2D);
    GL11.glDisable(GL11.GL_LIGHTING);
    GL11.glDisable(GL11.GL_DEPTH_TEST); // draw through walls
    GL11.glEnable(GL11.GL_BLEND);
    GL11.glBlendFunc(GL11.GL_SRC_ALPHA, GL11.GL_ONE_MINUS_SRC_ALPHA);
    GL11.glEnable(GL11.GL_LINE_SMOOTH);
    GL11.glLineWidth(width);
    GL11.glColor4f(r, g, b, a);

    GL11.glBegin(GL11.GL_LINES);
    GL11.glVertex3d(sx, sy, sz);
    GL11.glVertex3d(dx, dy, dz);
    GL11.glEnd();

    GL11.glEnable(GL11.GL_DEPTH_TEST);
    GL11.glDisable(GL11.GL_LINE_SMOOTH);
    GL11.glDisable(GL11.GL_BLEND);
    GL11.glEnable(GL11.GL_TEXTURE_2D);
    GL11.glColor4f(1, 1, 1, 1);
    GL11.glPopMatrix();
}