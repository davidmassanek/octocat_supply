export interface CatProfile {
  name: string;
  emoji: string;
  distance: string;
  status: 'online' | 'idle' | 'offline';
  email: string;
}

export const nearbyCats: CatProfile[] = [
  { name: 'Whiskers McFluff', emoji: '🐱', distance: '0.2 mi', status: 'online', email: 'whiskers@catmail.meow' },
  { name: 'Captain Mittens', emoji: '🐈', distance: '0.5 mi', status: 'online', email: 'captain@catmail.meow' },
  { name: 'Luna Pawsworth', emoji: '😻', distance: '0.8 mi', status: 'idle', email: 'luna@catmail.meow' },
  { name: 'Sir Pounce-a-Lot', emoji: '😺', distance: '1.1 mi', status: 'online', email: 'pounce@catmail.meow' },
  { name: 'Noodle', emoji: '🐈‍⬛', distance: '1.4 mi', status: 'offline', email: 'noodle@catmail.meow' },
  { name: 'Duchess Fluffington', emoji: '👑', distance: '2.0 mi', status: 'idle', email: 'duchess@catmail.meow' },
];

export const previewMessages = [
  { sender: 'Sir Pounce-a-Lot', content: 'Is this the right app? Looking for cats who enjoy midnight adventures and knocking things off tables...', time: '2m ago' },
  { sender: 'Noodle', content: 'Where are all the hot cats in my area that the ads promised??', time: '5m ago' },
  { sender: 'Whiskers McFluff', content: 'Showed a cute tabby my smart feeder and she stayed for dinner. Better than Tindpurr tbh.', time: '8m ago' },
];
