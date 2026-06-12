varying float vHeight;

void main() {
    float h = (vHeight + 1.0) * 0.5; // remap to 0..1
    gl_FragColor = vec4(h, h, h, 1.0);
}