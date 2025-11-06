'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
// import { ethers } from 'ethers'; // Commented out for demo purposes
import { useInnovationInsights } from '@/hooks/useInnovationInsights';

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

  const certificateContext = selectedCertificate ?? sampleCertificates[0];
  const {
    data: web3Insights,
    loading: web3Loading,
    error: web3Error,
    refresh: refreshWeb3Insights,
  } = useInnovationInsights('web3-nft', {
    certificate: certificateContext?.projectName ?? 'Sustainability certificate',
    chain: 'Polygon',
    benefit: certificateContext?.description ?? 'Tokenized ESG record',
  });
  const mintDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    mintedNFTs.forEach(token => {
      const segments = token.split('-');
      if (segments.length >= 3) {
        const id = segments[1];
        counts[id] = (counts[id] ?? 0) + 1;
      }
    });
    return sampleCertificates.map(cert => ({
      id: cert.id,
      name: cert.projectName,
      minted: counts[cert.id] ?? 0,
    }));
  }, [mintedNFTs]);
  const pieChartData = useMemo(() => {
    const allZero = mintDistribution.every(item => item.minted === 0);
    return mintDistribution.map(item => ({
      name: item.name,
      value: allZero ? 1 : item.minted,
      minted: item.minted,
    }));
  }, [mintDistribution]);
  const pieColors = ['#38bdf8', '#f97316', '#22c55e', '#a855f7', '#facc15', '#ec4899'];

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

        <div className="mb-8 rounded-2xl border border-white/15 bg-white/10 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-200">
              Mint Distribution
            </p>
            <span className="text-[11px] text-blue-100">
              {mintDistribution.reduce((sum, item) => sum + item.minted, 0)} on-chain attestations
            </span>
          </div>
          <div className="mt-3 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="60%"
                  outerRadius="90%"
                  paddingAngle={3}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #cbd5f5',
                    borderRadius: '8px',
                    color: '#0f172a',
                  }}
                  formatter={(value: number, name, props) => [`${props.payload.minted} minted`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 grid gap-2 text-xs text-blue-100 md:grid-cols-2">
            {mintDistribution.map((item, index) => (
              <div key={item.id} className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: pieColors[index % pieColors.length] }}
                  />
                  {item.name}
                </span>
                <span className="text-white/80">{item.minted} minted</span>
              </div>
            ))}
          </div>
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

                <div className="mt-4 w-full rounded-2xl border border-white/15 bg-white/5 p-4 text-xs text-blue-100">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-blue-200">
                      AI Certificate Brief
                    </p>
                    <button
                      type="button"
                      onClick={refreshWeb3Insights}
                      disabled={web3Loading}
                      className={`text-[10px] font-semibold rounded-full border px-3 py-1 transition ${
                        web3Loading
                          ? 'border-white/20 bg-white/5 text-blue-200 cursor-not-allowed'
                          : 'border-purple-400/30 bg-purple-500/10 text-purple-100 hover:bg-purple-500/20'
                      }`}
                    >
                      {web3Loading ? 'Refreshing…' : 'Refresh'}
                    </button>
                  </div>

                  {web3Insights && (
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-blue-200">
                      <span
                        className={`inline-flex items-center gap-2 ${
                          web3Insights.source === 'openrouter' ? 'text-emerald-200' : 'text-blue-200'
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            web3Insights.source === 'openrouter' ? 'bg-emerald-400' : 'bg-blue-400'
                          }`}
                        />
                        {web3Insights.source === 'openrouter' ? 'Live OpenRouter' : 'Fallback cache'}
                      </span>
                    </div>
                  )}

                  {web3Error && (
                    <p className="mt-3 rounded-lg border border-red-500/30 bg-red-500/20 px-3 py-2 text-[11px] text-red-200">
                      {web3Error}
                    </p>
                  )}

                  {web3Insights ? (
                    <div className="mt-3 space-y-2 leading-relaxed">
                      <p className="text-sm text-white font-semibold">{web3Insights.summary}</p>
                      {web3Insights.highlights.length > 0 && (
                        <ul className="space-y-1">
                          {web3Insights.highlights.map(item => (
                            <li key={item} className="flex items-start gap-2">
                              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-300" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {web3Insights.actions.length > 0 && (
                        <div className="mt-2">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white">
                            Action Plan
                          </p>
                          <ul className="mt-2 space-y-1">
                            {web3Insights.actions.map(action => (
                              <li key={action} className="rounded-lg border border-purple-400/30 bg-purple-500/10 px-3 py-2">
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {web3Insights.metadata && typeof web3Insights.metadata === 'object' && (
                        <div className="mt-3 space-y-1">
                          {Object.entries(web3Insights.metadata)
                            .slice(0, 4)
                            .map(([key, value]) => (
                              <div key={key} className="flex items-center justify-between gap-2 text-[11px]">
                                <span className="uppercase tracking-[0.2em] text-purple-200">{key}</span>
                                <span className="text-white/80">
                                  {typeof value === 'number' ? value.toLocaleString() : String(value)}
                                </span>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    !web3Loading && (
                      <p className="mt-3 text-[11px] text-blue-100">
                        AI certificate guidance appears here after the first refresh.
                      </p>
                    )
                  )}
                </div>
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
