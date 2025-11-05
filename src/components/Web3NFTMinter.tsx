'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
// import { ethers } from 'ethers'; // Commented out for demo purposes

interface Certificate {
  id: string;
  projectName: string;
  type: 'carbon_reduction' | 'energy_efficiency' | 'sustainability';
  value: number;
  unit: string;
  location: string;
  issuedDate: string;
  expiryDate: string;
  description: string;
  image: string;
}

const sampleCertificates: Certificate[] = [
  {
    id: '1',
    projectName: 'Sahara Solar Complex',
    type: 'carbon_reduction',
    value: 50000,
    unit: 'tons CO2/year',
    location: 'Morocco',
    issuedDate: '2024-06-30',
    expiryDate: '2029-06-30',
    description: 'Carbon credit certificate for sustainable solar energy production',
    image: '/api/placeholder/300/200',
  },
  {
    id: '2',
    projectName: 'Green Building Standard',
    type: 'energy_efficiency',
    value: 85,
    unit: 'LEED Score',
    location: 'Singapore',
    issuedDate: '2024-08-15',
    expiryDate: '2034-08-15',
    description: 'LEED Platinum certification for energy-efficient construction',
    image: '/api/placeholder/300/200',
  },
];

export default function Web3NFTMinter() {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isMinting, setIsMinting] = useState(false);
  const [mintedNFTs, setMintedNFTs] = useState<string[]>([]);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    // Simulate wallet connection for demo purposes
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockAddress = '0x742d35Cc6A2e5F6c8b8F9Aa8a7f1E5c8b9F0a1B2';
      setWalletAddress(mockAddress);
      setWalletConnected(true);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('Failed to connect wallet. Please try again.');
    }
  };

  const mintNFT = async (certificate: Certificate) => {
    if (!walletConnected) {
      alert('Please connect your wallet first.');
      return;
    }

    setIsMinting(true);

    try {
      // Simulate NFT minting process
      await new Promise(resolve => setTimeout(resolve, 3000));

      // In a real implementation, this would interact with a smart contract
      const mockTokenId = `CES-${certificate.id}-${Date.now()}`;
      setMintedNFTs(prev => [...prev, mockTokenId]);

      alert(`NFT minted successfully! Token ID: ${mockTokenId}`);
    } catch (error) {
      console.error('Minting failed:', error);
      alert('Failed to mint NFT. Please try again.');
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-purple-900 to-indigo-900 rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white">Web3 NFT Sustainability Certificates</h3>
            <p className="text-gray-300">Mint blockchain-verified certificates for environmental achievements</p>
          </div>

          {!walletConnected ? (
            <motion.button
              onClick={connectWallet}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Connect Wallet
            </motion.button>
          ) : (
            <div className="text-green-400 font-semibold">
              Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </div>
          )}
        </div>

        {/* Certificate Gallery */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {sampleCertificates.map((cert) => (
            <motion.div
              key={cert.id}
              className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden border border-white/20 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedCertificate(cert)}
            >
              <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-4xl font-bold mb-2">{cert.value}</div>
                  <div className="text-sm">{cert.unit}</div>
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-white font-semibold mb-2">{cert.projectName}</h4>
                <p className="text-gray-300 text-sm mb-2">{cert.description}</p>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{cert.location}</span>
                  <span>{cert.type.replace('_', ' ').toUpperCase()}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Certificate Details */}
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 mb-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">{selectedCertificate.projectName}</h4>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Certificate Type:</span>
                    <span className="text-white capitalize">{selectedCertificate.type.replace('_', ' ')}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-300">Value:</span>
                    <span className="text-white font-semibold">{selectedCertificate.value} {selectedCertificate.unit}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-300">Location:</span>
                    <span className="text-white">{selectedCertificate.location}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-300">Issued:</span>
                    <span className="text-white">{new Date(selectedCertificate.issuedDate).toLocaleDateString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-300">Expires:</span>
                    <span className="text-white">{new Date(selectedCertificate.expiryDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <p className="text-gray-300 mt-4">{selectedCertificate.description}</p>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-white text-center">
                    <div className="text-6xl font-bold mb-2">{selectedCertificate.value}</div>
                    <div className="text-lg">{selectedCertificate.unit}</div>
                    <div className="text-sm mt-2 opacity-80">CES Ltd. Certificate</div>
                  </div>
                </div>

                <motion.button
                  onClick={() => mintNFT(selectedCertificate)}
                  disabled={!walletConnected || isMinting}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                    walletConnected && !isMinting
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                      : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                  }`}
                  whileHover={walletConnected && !isMinting ? { scale: 1.02 } : {}}
                  whileTap={walletConnected && !isMinting ? { scale: 0.98 } : {}}
                >
                  {isMinting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Minting NFT...
                    </div>
                  ) : walletConnected ? (
                    'Mint NFT Certificate'
                  ) : (
                    'Connect Wallet to Mint'
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Minted NFTs */}
        {mintedNFTs.length > 0 && (
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-4">Your Minted NFTs</h4>
            <div className="grid md:grid-cols-3 gap-4">
              {mintedNFTs.map((tokenId, index) => (
                <div key={index} className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-lg">
                  <div className="text-white font-mono text-sm">{tokenId}</div>
                  <div className="text-green-100 text-xs mt-1">✓ Minted on Polygon</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Web3 Info */}
        <div className="mt-8 bg-white/5 rounded-lg p-6">
          <h4 className="text-white font-semibold mb-4">About Web3 Sustainability Certificates</h4>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h5 className="text-green-400 font-semibold mb-2">Blockchain Benefits</h5>
              <ul className="text-gray-300 space-y-1">
                <li>• Immutable certificate records</li>
                <li>• Transparent transaction history</li>
                <li>• Decentralized ownership verification</li>
                <li>• Smart contract automation</li>
              </ul>
            </div>
            <div>
              <h5 className="text-blue-400 font-semibold mb-2">Environmental Impact</h5>
              <ul className="text-gray-300 space-y-1">
                <li>• Tradable carbon credits</li>
                <li>• Verified sustainability claims</li>
                <li>• Incentivized green initiatives</li>
                <li>• Global environmental marketplace</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}