import axios from "axios";

interface Props {
  orderId: string;
  amount: number;
}

export default function PaymeButton({ orderId, amount }: Props) {
  const handlePayment = async () => {
    try {
      const res = await axios.post("/api/payme/create", { orderId, amount });
      window.location.href = res.data.url;
    } catch (err) {
      console.error("To'lov xatosi:", err);
      alert("To'lovda xatolik!");
    }
  };

  return (
    <button onClick={handlePayment}>
      💳 Payme orqali to'lash ({amount.toLocaleString()} so'm)
    </button>
  );
}