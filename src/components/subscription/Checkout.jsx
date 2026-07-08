import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useWeb3 } from '../../context/Web3Context';
import { FiHexagon, FiZap, FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Checkout = () => {
    const { subscriptionId } = useParams();
    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [paying, setPaying] = useState(false);
    const { isConnected, account, connectWallet, signMessage } = useWeb3();

    useEffect(() => {
        const fetchSubscription = async () => {
            try {
                const response = await axios.get(`/subscriptions/${subscriptionId}`);
                setSubscription(response.data);
            } catch (error) {
                console.error('Error fetching subscription:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSubscription();
    }, [subscriptionId]);

    const handleCryptoPayment = async () => {
        if (!isConnected) {
            await connectWallet();
            if (!account) return;
        }

        setPaying(true);
        try {
            const message = `CryptoClass Payment\nSubscription: ${subscriptionId}\nWallet: ${account}\nTimestamp: ${Date.now()}`;
            const signature = await signMessage(message);

            if (!signature) {
                toast.error('Signature required for payment');
                setPaying(false);
                return;
            }

            const response = await axios.post('/api/v1/pay/crypto-checkout', {
                subscriptionId,
                walletAddress: account,
                signature,
            });

            if (response.data.txHash) {
                toast.success(`Payment sent! TX: ${response.data.txHash.slice(0, 10)}...`);
                window.open(`https://etherscan.io/tx/${response.data.txHash}`, '_blank');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Payment failed');
        } finally {
            setPaying(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-utama pt-24 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#06F8D0] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!subscription) {
        return (
            <div className="min-h-screen bg-utama pt-24 pb-12">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <div className="glass-card rounded-2xl p-12">
                        <FiHexagon className="text-5xl text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400">Subscription not found</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-utama pt-24 pb-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/classview" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                    <FiArrowLeft /> Back to plans
                </Link>

                <div className="glass-card rounded-2xl p-8 lg:p-12 animate-in">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#06F8D0]/20 to-[#7C3AED]/20 flex items-center justify-center mx-auto mb-6">
                            <FiHexagon className="text-3xl text-[#06F8D0]" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Checkout</h1>
                        <p className="text-gray-400">Complete your subscription payment</p>
                    </div>

                    <div className="space-y-4 mb-8 p-6 rounded-xl bg-white/5">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Course</span>
                            <span className="text-white font-semibold">{subscription.courseId?.title || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Price</span>
                            <span className="text-2xl font-bold bg-gradient-to-r from-[#06F8D0] to-[#7C3AED] bg-clip-text text-transparent">
                                Rp {subscription.courseId?.price || 0}/month
                            </span>
                        </div>
                        {isConnected && (
                            <div className="flex justify-between items-center pt-4 border-t border-white/5">
                                <span className="text-gray-400">Wallet</span>
                                <span className="text-sm font-mono text-[#06F8D0]">
                                    {account.slice(0, 6)}...{account.slice(-4)}
                                </span>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleCryptoPayment}
                        disabled={paying}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#06F8D0] to-[#7C3AED] text-utama font-bold py-4 px-6 rounded-xl hover:shadow-lg hover:shadow-[#06F8D0]/20 transition-all duration-300 disabled:opacity-50 text-lg"
                    >
                        {paying ? (
                            <>
                                <div className="w-5 h-5 border-2 border-utama border-t-transparent rounded-full animate-spin" />
                                Processing...
                            </>
                        ) : !isConnected ? (
                            <>
                                <FiZap />
                                Connect Wallet to Pay
                            </>
                        ) : (
                            <>
                                <FiZap />
                                Pay with Crypto
                            </>
                        )}
                    </button>

                    {!isConnected && (
                        <p className="text-center text-gray-500 text-sm mt-4">
                            Connect your MetaMask wallet to complete the payment
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Checkout;
