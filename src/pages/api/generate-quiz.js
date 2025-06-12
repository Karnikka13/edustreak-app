export default function handler(req, res) {
  const quiz = [
    {
      question: "What does CPU stand for?",
      options: ["Central Processing Unit", "Computer Personal Unit", "Central Processor Utility", "Control Panel Unit"],
      answer: "Central Processing Unit"
    },
    {
      question: "What is the smallest unit of memory?",
      options: ["Bit", "Byte", "Nibble", "Word"],
      answer: "Bit"
    },
    {
      question: "Which language runs in a web browser?",
      options: ["Java", "C", "Python", "JavaScript"],
      answer: "JavaScript"
    }
  ];

  res.status(200).json({ quiz });
}
