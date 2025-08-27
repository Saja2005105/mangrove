// Editable BlockchainPage.jsx with animations, save, and per-user content loading
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SaveButton from "@/components/SaveButton";

function BlockchainPage() {
  const [blockchainData, setBlockchainData] = useState({
    title: "Blockchain Technology",
    description: "Learn how we leverage blockchain technology to ensure transparency and security in ocean conservation.",
    cards: [
      {
        title: "Blockchain Technology",
        image: "Uploads/blockchain.webp",
        text: "Each token represents a unique piece of bio reef, with ownership and impact data permanently recorded on the blockchain. This ensures complete transparency and traceability of your contribution."
      },
      {
        title: "Smart Contracts",
        image: "Uploads/handshake.jpg",
        text: "Our smart contracts automatically track and verify conservation milestones, ensuring that funds are properly allocated and impact is measurable."
      }
    ],
    steps: [
      { title: "Purchase tokens", description: "Buy a token representing your chosen area of bio reef." },
      { title: "Smart Contract", description: "Transaction is recorded and verified on the blockchain." },
      { title: "Implementation", description: "Funds are allocated to bio reef creation and maintenance." },
      { title: "Track Impact", description: "Monitor your contribution's impact through our platform." }
    ]
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("http://localhost:5000/api/get-content?section=blockchainpage", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (data.content) setBlockchainData(data.content);
    };

    fetchData();
  }, []);

  const updateField = (section, index, key, value) => {
    const updated = [...blockchainData[section]];
    updated[index][key] = value;
    setBlockchainData({ ...blockchainData, [section]: updated });
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateField("cards", index, "image", url);
    }
  };

  return (
    <div className="pt-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => setBlockchainData({ ...blockchainData, title: e.target.innerText })}
            className="text-5xl font-bold text-white mb-6"
          >
            {blockchainData.title}
          </h1>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => setBlockchainData({ ...blockchainData, description: e.target.innerText })}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            {blockchainData.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {blockchainData.cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 * i }}
              className="glass-card p-8 rounded-lg"
            >
              <h2
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateField("cards", i, "title", e.target.innerText)}
                className="text-2xl font-bold text-white mb-6"
              >
                {card.title}
              </h2>
              <img
                className="w-full h-64 object-cover rounded-lg mb-4"
                alt={card.title}
                src={card.image}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(i, e)}
                className="text-white text-sm mb-4"
              />
              <p
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateField("cards", i, "text", e.target.innerText)}
                className="text-gray-300"
              >
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass-card p-8 rounded-lg mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {blockchainData.steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{i + 1}</span>
                </div>
                <h3
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => updateField("steps", i, "title", e.target.innerText)}
                  className="text-xl font-bold text-white mb-2"
                >
                  {step.title}
                </h3>
                <p
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => updateField("steps", i, "description", e.target.innerText)}
                  className="text-gray-300"
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="text-center mt-12">
          <SaveButton section="blockchainpage" content={blockchainData} />
        </div>
      </div>
    </div>
  );
}

export default BlockchainPage;
