import React, { useState } from "react";
import { useWeb3 } from "../../context/Web3Context";
import customAPI from "../../api";
import { Wallet } from "lucide-react";
import { toast } from "react-toastify";
import { t } from "../../i18n";

const Checkout = ({ courseId, price, selectedCrypto }) => {
  const { account, signer, isConnected, connectWallet } = useWeb3();
  const [loading, setLoading] = useState(false);

  const getPriceInWei = (priceStr) => {
    const numeric = parseFloat(priceStr.replace(/[^0-9.]/g, ""));
    if (isNaN(numeric)) return null;
    return ethers.utils.parseEther(numeric > 100 ? (numeric / 17000).toFixed(6).toString() : numeric.toString());
  };

  const handleCryptoPayment = async () => {
    if (!isConnected) {
      await connectWallet();
      return;
    }

    setLoading(true);
    try {
      const priceWei = getPriceInWei(price);
      if (!priceWei) return toast.error(t("courses.invalidPrice"));

      const tx = await signer.sendTransaction({
        to: "0xReceiverWalletAddressHere",
        value: priceWei,
      });

      await tx.wait();
      const { data } = await customAPI.post("/pay/crypto", {
        courseId,
        transactionHash: tx.hash,
        from: account,
        amount: price,
        currency: selectedCrypto,
      });

      await customAPI.post("/subs/subscribe", {
        courseId,
        paymentMethod: "crypto",
        transactionId: data.data?.id || tx.hash,
      });

      toast.success(t("courses.paymentSuccess"));
    } catch (err) {
      toast.error(err?.response?.data?.meta?.message || err.message || t("courses.transactionFailed"));
    }
    setLoading(false);
  };

  return (
    <div className="text-center">
      <Wallet className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
      <p className="text-base font-semibold text-white mb-1">{t("courses.cryptoCheckout")}</p>
      <p className="text-sm text-gray-400 mb-2">{t("courses.courseId")} {courseId}</p>
      <p className="text-sm text-gray-400 mb-4">{t("courses.price")} {price}</p>
      <button
        onClick={handleCryptoPayment}
        disabled={loading}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-yellow-500 text-utama font-semibold hover:bg-yellow-400 transition-all disabled:opacity-50 cursor-pointer"
      >
        {loading ? t("courses.processing") : !isConnected ? t("courses.connectWallet") : `${t("courses.payWith")} ${selectedCrypto === "ethereum" ? t("courses.eth") : t("courses.usdtLabel")}`}
      </button>
    </div>
  );
};

export default Checkout;