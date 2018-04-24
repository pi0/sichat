const messages = [
  'سلام چطوری می‌تونم کمکتون کنم؟',
  'سلام! هر سوالی دارید بپرسید',
  'Salam Vaghtetoon bekheir',
];

module.exports = function hello() {
  return messages[Math.round(Math.random() * messages.length)];
};
