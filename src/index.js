import { Colors } from './js/Colors.js';

const color = new Colors (100, 200, 33, 128);
console.log (color);
console.log (color.toCSS_rgba ());
console.log (color.toCSS_hsl ());
console.log (color.toCSS_hsla ());

console.log (Colors.fromString ('#123456').getRGBA ());