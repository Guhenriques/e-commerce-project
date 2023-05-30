import keyboard from './images/new-keyboard-minor.webp';
import mouse from './images/mouse.png';
import monitor from './images/monitor-minor.webp';
import headset from './images/headset-minor.webp';
import mousepad from './images/mousepad2-minor.webp';
import soundbar from './images/pc-soundbar-minor.png';
import microphone from './images/microphone-minor.webp';
import webcam from './images/webcam-minor.png';

// for now, later add fetch to every product in the database

export const PRODUCTS = [
  { id: 1, productName: 'Razer Gaming Mouse', description: 'Description 1', price: 10, productImage: mouse },
  { id: 2, productName: 'Samsung Monitor', description: 'Description 2', price: 20, productImage: monitor },
  { id: 3, productName: 'Logitech Gaming Keyboard', description: 'Description 3', price: 30, productImage: keyboard },
  { id: 4, productName: 'Razer Headset', description: 'Description 4', price: 40, productImage: headset },
  { id: 5, productName: 'Coolermaster Mousepad', description: 'Description 5', price: 50, productImage: mousepad },
  { id: 6, productName: 'TCL Soundbar', description: 'Description 6', price: 60, productImage: soundbar },
  { id: 7, productName: 'Hyperx Microphone', description: 'Description 7', price: 70, productImage: microphone },
  { id: 8, productName: 'Logitech Webcam', description: 'Description 8', price: 80, productImage: webcam },
];

