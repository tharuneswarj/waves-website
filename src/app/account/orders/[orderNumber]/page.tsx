"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/lib/auth-store";
import { getCustomerOrders, ShopifyOrder } from "@/lib/customer";

export default function OrderPage({ params }: { params: Promise<{ orderNumber: string }> }) {
  const { orderNumber } = use(params);
  const router = useRouter();
  const { accessToken, customer } = useAuthStore();
  const [order, setOrder] = useState<ShopifyOrder | null | undefined>(undefined);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !accessToken) {
      router.replace("/");
    }
  }, [isClient, accessToken, router]);

  useEffect(() => {
    if (!accessToken) return;
    const fetchOrder = async () => {
      const orders = await getCustomerOrders(accessToken);
      const matched = orders.find((o) => o.orderNumber.toString() === String(orderNumber));
      if (orders.length > 0 && !matched) {
        router.replace("/account");
      } else {
        setOrder(matched || null);
      }
    };
    fetchOrder();
  }, [accessToken, orderNumber, router]);

  if (!isClient || !accessToken) return null;

  if (order === undefined) {
    return (
      <div className="mx-auto max-w-3xl px-6 pt-24 pb-24 md:pt-32">
        <div className="h-6 w-24 animate-pulse rounded bg-primary/10 mb-8" />
        <div className="h-10 w-48 animate-pulse rounded bg-primary/10 mb-4" />
        <div className="h-40 animate-pulse rounded-xl bg-primary/5 mt-10" />
      </div>
    );
  }

  if (order === null) return null;

  const date = new Date(order.processedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-3xl px-6 pt-24 pb-24 md:pt-32">
      <Link href="/account" className="mb-8 inline-block font-sans text-sm text-primary/50 transition-colors hover:text-primary">
        &larr; Back to account
      </Link>

      <div>
        <h1 className="font-serif text-3xl text-primary">Order #{order.orderNumber}</h1>
        <p className="mt-1 font-sans text-sm font-light text-primary/50">{date}</p>
      </div>

      <div className="mt-4 flex gap-2">
        <StatusBadge status={order.financialStatus} />
        <StatusBadge status={order.fulfillmentStatus} />
      </div>

      <div className="mt-6">
        {order.fulfillmentStatus === "FULFILLED" ? (
          <a
            href={order.statusUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-primary bg-transparent px-6 py-2.5 font-sans text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-surface"
          >
            Track your order &rarr;
          </a>
        ) : (
          <p className="font-mono text-xs text-primary/40">Your order is being prepared.</p>
        )}
      </div>

      <div className="mt-10">
        <h2 className="mb-4 font-mono text-[10px] uppercase tracking-widest text-primary/40">Items</h2>
        <div className="space-y-4">
          {order.lineItems.edges.map(({ node }, i) => (
            <div key={i} className="flex items-start gap-4 border-b border-primary/10 py-4 last:border-0">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-primary/5">
                {node.variant?.image?.url ? (
                  <Image src={node.variant.image.url} alt={node.variant.image.altText || node.title} fill className="object-cover" />
                ) : (
                  <div className="h-full w-full bg-primary/10" />
                )}
              </div>
              <div>
                <div className="font-sans text-sm font-medium text-primary">{node.title}</div>
                {node.variant && <div className="mt-0.5 font-mono text-xs text-primary/50">{node.variant.title}</div>}
                <div className="mt-1 font-mono text-xs text-primary/50">
                  Qty: {node.quantity} &middot; {node.variant?.price.amount} {node.variant?.price.currencyCode}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-start justify-between gap-8 border-t border-primary/10 pt-6">
        <div>
          {order.shippingAddress && (
            <>
              <h2 className="mb-2 font-mono text-[10px] uppercase tracking-widest text-primary/40">Shipped to</h2>
              <div className="font-sans text-sm font-light text-primary/70">
                {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                <br />
                {order.shippingAddress.address1}
                {order.shippingAddress.address2 ? `, ${order.shippingAddress.address2}` : ""}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.province} {order.shippingAddress.zip}
                <br />
                {order.shippingAddress.country}
              </div>
            </>
          )}
        </div>
        <div className="text-right">
          <h2 className="mb-1 font-mono text-[10px] uppercase tracking-widest text-primary/40">Order total</h2>
          <div className="font-mono text-lg text-primary">
            {order.totalPrice.amount} {order.totalPrice.currencyCode}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  let bg = "bg-primary/8 text-primary";
  if (status === "PENDING" || status === "PARTIALLY_FULFILLED") bg = "bg-highlight/20 text-primary/70";
  if (status === "UNFULFILLED") bg = "bg-accent/10 text-accent";

  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest ${bg}`}>
      {status.replace("_", " ")}
    </span>
  );
}
