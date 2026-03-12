"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/lib/auth-store";
import {
  getCustomerOrders,
  getCustomerAddresses,
  customerAddressCreate,
  customerAddressUpdate,
  customerAddressDelete,
  customerUpdate,
  ShopifyOrder,
  ShopifyAddress,
} from "@/lib/customer";

export default function AccountPage() {
  const router = useRouter();
  const { accessToken, customer, logout, refreshCustomer } = useAuthStore();
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "details">("orders");

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !accessToken) {
      router.replace("/");
    }
  }, [isClient, accessToken, router]);

  if (!isClient || !accessToken) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  return (
    <div className="mx-auto max-w-3xl px-6 pt-24 pb-24 md:pt-32">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-4xl text-primary">Your account</h1>
          <p className="mt-2 font-sans text-lg font-light text-primary/60">
            Hello, {customer?.firstName}.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="font-sans text-xs text-primary/40 transition-colors hover:text-primary/70"
        >
          Logout
        </button>
      </div>

      <div className="mb-8 mt-10 flex border-b border-primary/10">
        {(["orders", "addresses", "details"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`mr-8 border-b-2 pb-2 font-sans text-sm font-medium capitalize transition-colors ${
              activeTab === tab
                ? "border-primary text-primary"
                : "border-transparent text-primary/40 hover:text-primary/60"
            }`}
          >
            {tab === "details" ? "Account Details" : tab}
          </button>
        ))}
      </div>

      <div className="min-h-[400px]">
        {activeTab === "orders" && <OrdersTab accessToken={accessToken} />}
        {activeTab === "addresses" && <AddressesTab accessToken={accessToken} />}
        {activeTab === "details" && <AccountDetailsTab accessToken={accessToken} refreshCustomer={refreshCustomer} />}
      </div>
    </div>
  );
}

// ── Orders Tab ────────────────────────────────────────

function OrdersTab({ accessToken }: { accessToken: string }) {
  const [orders, setOrders] = useState<ShopifyOrder[] | null>(null);

  useEffect(() => {
    getCustomerOrders(accessToken).then(setOrders);
  }, [accessToken]);

  if (!orders) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl bg-primary/5" />
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-xl border border-primary/10 p-10 text-center font-mono text-sm text-primary/40">
        No orders yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const date = new Date(order.processedAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });

        return (
          <Link href={`/account/orders/${order.orderNumber}`} key={order.id} className="block">
            <div className="cursor-pointer rounded-xl border border-primary/10 p-5 transition-colors hover:border-primary/30">
              <div className="flex items-start justify-between">
                <span className="font-sans text-sm font-medium text-primary">Order #{order.orderNumber}</span>
                <span className="font-mono text-xs text-primary/50">{date}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <StatusBadge status={order.financialStatus} />
                  <StatusBadge status={order.fulfillmentStatus} />
                </div>
                <span className="font-mono text-sm text-primary">
                  {order.totalPrice.amount} {order.totalPrice.currencyCode}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  let bg = "bg-primary/8 text-primary";
  if (status === "PENDING" || status === "PARTIALLY_FULFILLED") bg = "bg-highlight/20 text-primary/70";
  if (status === "UNFULFILLED") bg = "bg-accent/10 text-accent";

  return (
    <span className={`mr-2 rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest ${bg}`}>
      {status.replace("_", " ")}
    </span>
  );
}

// ── Addresses Tab ──────────────────────────────────────

function AddressesTab({ accessToken }: { accessToken: string }) {
  const [addresses, setAddresses] = useState<(ShopifyAddress & { id: string })[] | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchAddresses = async () => setAddresses(await getCustomerAddresses(accessToken));

  useEffect(() => {
    fetchAddresses();
  }, [accessToken]);

  const handleDelete = async (id: string) => {
    await customerAddressDelete(accessToken, id);
    setDeletingId(null);
    fetchAddresses();
  };

  if (!addresses) {
    return <div className="h-40 animate-pulse rounded-xl bg-primary/5" />;
  }

  return (
    <div className="space-y-4">
      {addresses.map((address) => (
        <div key={address.id}>
          {editingId === address.id ? (
            <AddressForm
              accessToken={accessToken}
              initialData={address}
              onClose={() => setEditingId(null)}
              onSuccess={fetchAddresses}
            />
          ) : (
            <div className="rounded-xl border border-primary/10 p-5 space-y-1">
              <div className="font-sans text-sm font-medium text-primary">
                {address.firstName} {address.lastName}
              </div>
              <div className="font-sans text-sm font-light text-primary/70">
                {address.address1}
                {address.address2 ? `, ${address.address2}` : ""}
                <br />
                {address.city}, {address.province} {address.zip}
                <br />
                {address.country}
              </div>
              {address.phone && (
                <div className="font-mono text-xs text-primary/50">{address.phone}</div>
              )}
              
              <div className="mt-3">
                {deletingId === address.id ? (
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-xs text-primary">Remove this address?</span>
                    <button onClick={() => handleDelete(address.id)} className="font-sans text-xs text-accent hover:text-accent-dark">Yes, remove</button>
                    <span className="text-primary/50 text-xs">·</span>
                    <button onClick={() => setDeletingId(null)} className="font-sans text-xs text-primary/50">Cancel</button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <button onClick={() => setEditingId(address.id)} className="font-sans text-xs text-primary/50 hover:text-primary">Edit</button>
                    <span className="text-primary/50 text-xs">·</span>
                    <button onClick={() => setDeletingId(address.id)} className="font-sans text-xs text-primary/50 hover:text-primary">Delete</button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      {showAddForm ? (
        <AddressForm
          accessToken={accessToken}
          onClose={() => setShowAddForm(false)}
          onSuccess={() => { setShowAddForm(false); fetchAddresses(); }}
        />
      ) : (
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full rounded-xl border border-dashed border-primary/20 p-5 text-center font-sans text-sm text-primary/50 transition-colors hover:border-primary/40 hover:text-primary"
        >
          + Add address
        </button>
      )}
    </div>
  );
}

function AddressForm({ accessToken, initialData, onClose, onSuccess }: { accessToken: string, initialData?: ShopifyAddress & { id: string }, onClose: () => void, onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    address1: initialData?.address1 || "",
    address2: initialData?.address2 || "",
    city: initialData?.city || "",
    province: initialData?.province || "",
    zip: initialData?.zip || "",
    country: initialData?.country || "",
    phone: initialData?.phone || "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (initialData?.id) {
      await customerAddressUpdate(accessToken, initialData.id, formData);
    } else {
      await customerAddressCreate(accessToken, formData);
    }
    setLoading(false);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 space-y-3 rounded-xl border border-primary/20 p-5">
      <div className="grid grid-cols-2 gap-3">
        <input required type="text" placeholder="First name" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="addr-input" />
        <input required type="text" placeholder="Last name" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="addr-input" />
      </div>
      <input required type="text" placeholder="Address line 1" value={formData.address1} onChange={(e) => setFormData({...formData, address1: e.target.value})} className="addr-input w-full" />
      <input type="text" placeholder="Apartment, floor, etc. (optional)" value={formData.address2} onChange={(e) => setFormData({...formData, address2: e.target.value})} className="addr-input w-full" />
      <div className="grid grid-cols-2 gap-3">
        <input required type="text" placeholder="City" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="addr-input" />
        <input required type="text" placeholder="State/Province" value={formData.province} onChange={(e) => setFormData({...formData, province: e.target.value})} className="addr-input" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input required type="text" placeholder="PIN code" value={formData.zip} onChange={(e) => setFormData({...formData, zip: e.target.value})} className="addr-input" />
        <input required type="text" placeholder="Country" value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} className="addr-input" />
      </div>
      <input type="tel" placeholder="Phone (optional)" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="addr-input w-full" />
      
      <div className="pt-2">
        <button type="submit" disabled={loading} className="rounded-full bg-accent px-6 py-2.5 font-sans text-sm font-medium text-white hover:bg-accent-dark">
          {loading ? "Saving..." : "Save address"}
        </button>
        <button type="button" onClick={onClose} className="ml-4 font-sans text-sm text-primary/50 hover:text-primary">
          Cancel
        </button>
      </div>
      <style jsx>{`
        .addr-input {
          @apply rounded-lg border border-primary/20 px-4 py-2.5 font-sans text-sm focus:border-primary focus:outline-none bg-transparent;
        }
      `}</style>
    </form>
  );
}

// ── Account Details Tab ────────────────────────────────

function AccountDetailsTab({ accessToken, refreshCustomer }: { accessToken: string, refreshCustomer: () => Promise<void> }) {
  const { customer } = useAuthStore();
  const [details, setDetails] = useState({ firstName: customer?.firstName || "", lastName: customer?.lastName || "", email: customer?.email || "" });
  const [passwords, setPasswords] = useState({ newPassword: "", confirmPassword: "" });
  
  const [detailsStatus, setDetailsStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [detailsError, setDetailsError] = useState("");
  
  const [passStatus, setPassStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [passError, setPassError] = useState("");

  const handleUpdateDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setDetailsStatus("loading");
    const res = await customerUpdate(accessToken, details);
    if (res.errors.length > 0) {
      setDetailsError(res.errors[0].message);
      setDetailsStatus("error");
    } else {
      await refreshCustomer();
      setDetailsStatus("success");
      setTimeout(() => setDetailsStatus("idle"), 3000);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setPassError("Passwords do not match.");
      setPassStatus("error");
      return;
    }
    setPassStatus("loading");
    const res = await customerUpdate(accessToken, { password: passwords.newPassword });
    if (res.errors.length > 0) {
      setPassError(res.errors[0].message);
      setPassStatus("error");
    } else {
      setPassStatus("success");
      setPasswords({ newPassword: "", confirmPassword: "" });
      setTimeout(() => setPassStatus("idle"), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-primary/10 p-6">
        <h3 className="mb-4 font-sans text-sm font-medium text-primary">Personal details</h3>
        <form onSubmit={handleUpdateDetails} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input required type="text" placeholder="First name" value={details.firstName} onChange={(e) => setDetails({...details, firstName: e.target.value})} className="rounded-lg border border-primary/20 px-4 py-2.5 font-sans text-sm focus:border-primary focus:outline-none bg-transparent" />
            <input required type="text" placeholder="Last name" value={details.lastName} onChange={(e) => setDetails({...details, lastName: e.target.value})} className="rounded-lg border border-primary/20 px-4 py-2.5 font-sans text-sm focus:border-primary focus:outline-none bg-transparent" />
          </div>
          <input required type="email" placeholder="Email address" value={details.email} onChange={(e) => setDetails({...details, email: e.target.value})} className="w-full rounded-lg border border-primary/20 px-4 py-2.5 font-sans text-sm focus:border-primary focus:outline-none bg-transparent" />
          
          {detailsStatus === "success" && <div className="font-mono text-xs text-primary/60 mt-2">Details updated.</div>}
          {detailsStatus === "error" && <div className="font-mono text-xs text-accent mt-2">{detailsError}</div>}
          
          <div className="pt-2">
            <button type="submit" disabled={detailsStatus === "loading"} className="rounded-full bg-accent px-6 py-2.5 font-sans text-sm font-medium text-white hover:opacity-90">
              {detailsStatus === "loading" ? "Updating..." : "Update details"}
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-xl border border-primary/10 p-6">
        <h3 className="mb-4 font-sans text-sm font-medium text-primary">Change password</h3>
        <form onSubmit={handleChangePassword} className="space-y-3">
          <input required type="password" placeholder="New password" value={passwords.newPassword} onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})} className="w-full rounded-lg border border-primary/20 px-4 py-2.5 font-sans text-sm focus:border-primary focus:outline-none bg-transparent" />
          <input required type="password" placeholder="Confirm new password" value={passwords.confirmPassword} onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})} className="w-full rounded-lg border border-primary/20 px-4 py-2.5 font-sans text-sm focus:border-primary focus:outline-none bg-transparent" />
          
          {passStatus === "success" && <div className="font-mono text-xs text-primary/60 mt-2">Password updated.</div>}
          {passStatus === "error" && <div className="font-mono text-xs text-accent mt-2">{passError}</div>}
          
          <div className="pt-2">
            <button type="submit" disabled={passStatus === "loading"} className="rounded-full bg-accent px-6 py-2.5 font-sans text-sm font-medium text-white hover:opacity-90">
              {passStatus === "loading" ? "Updating..." : "Change password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
