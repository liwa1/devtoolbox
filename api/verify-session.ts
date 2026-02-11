import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const sessionId = req.query.session_id as string;

  if (!sessionId) {
    return res.status(400).json({ error: "Missing session_id parameter" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      return res.status(200).json({
        success: true,
        customer_email: session.customer_details?.email || null,
        subscription_id: session.subscription,
        status: session.status,
      });
    }

    return res.status(200).json({ success: false, status: session.payment_status });
  } catch (err: any) {
    console.error("Stripe verify error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
