
// Mock data and functions as specified in requirements

const mode1Cards = [
  "Circle", "Square", "Triangle", "Star", "Heart", "Diamond", "Arrow", "House",
  "Tree", "Sun", "Moon", "Cloud", "Mountain", "River", "Flower", "Car",
  "Book", "Key", "Clock", "Phone", "Camera", "Music", "Paint", "Pencil",
  "Rocket", "Planet", "Fire", "Water", "Earth", "Wind", "Thunder", "Snow",
  "Rainbow", "Butterfly", "Fish", "Bird", "Cat", "Dog", "Lion", "Elephant",
  "Apple", "Orange", "Banana", "Grape", "Strawberry", "Watermelon", "Pizza", "Burger",
  "Coffee", "Tea", "Cake", "Cookie", "Ice Cream", "Sandwich", "Salad", "Soup"
];

const mode2Cards = [
  "Laptop", "Monitor", "Keyboard", "Mouse", "Headphones", "Speaker", "Microphone", "Router",
  "Database", "Server", "Cloud Storage", "Network", "Security", "Firewall", "Backup", "Update",
  "Algorithm", "Function", "Variable", "Array", "Object", "Class", "Method", "Property",
  "Loop", "Condition", "Boolean", "String", "Number", "Integer", "Float", "Character",
  "Input", "Output", "Process", "Memory", "Storage", "CPU", "GPU", "RAM",
  "Binary", "Hexadecimal", "ASCII", "Unicode", "Encryption", "Compression", "Protocol", "API",
  "Frontend", "Backend", "Database", "Framework", "Library", "Package", "Module", "Component"
];

export const getCardTexts = (mode: 'mode1' | 'mode2', count: number, gameType: 'random' | 'review' = 'random'): string[] => {
  if (gameType === 'review') {
    // Import from localStorage utility
    const { getWrongAnswers } = require('./localStorage');
    const wrongAnswers = getWrongAnswers(mode);
    
    if (wrongAnswers.length === 0) return [];
    
    // Shuffle and take up to 10 from wrong answers
    const shuffled = [...wrongAnswers].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(10, wrongAnswers.length));
  }
  
  const cards = mode === 'mode1' ? mode1Cards : mode2Cards;
  const shuffled = [...cards].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const getSvg = (text: string): string => {
  // Generate a simple SVG based on the text
  // This is a mock implementation - in real use, this would be your actual getSvg function
  
  const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];
  const color = colors[text.length % colors.length];
  
  // Create different simple shapes based on text
  const shapes = [
    `<circle cx="50" cy="50" r="30" fill="${color}" />`,
    `<rect x="20" y="20" width="60" height="60" fill="${color}" />`,
    `<polygon points="50,20 80,70 20,70" fill="${color}" />`,
    `<ellipse cx="50" cy="50" rx="40" ry="25" fill="${color}" />`,
    `<path d="M50 20 L80 50 L50 80 L20 50 Z" fill="${color}" />`
  ];
  
  const shape = shapes[text.charCodeAt(0) % shapes.length];
  
  return `
    <svg width="120" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      ${shape}
      <text x="50" y="95" text-anchor="middle" font-size="8" fill="#666">${text}</text>
    </svg>
  `;
};
