import React from 'react';
import MasterCard from '@/components/icons/master-card.svg';
const AccountSubscriptionBillingPage = () => {
    return (
        <div className="p-6 md:p-12 flex flex-col gap-10 rounded-2.5xl md:rounded-4xl bg-white/16 backdrop-blur-[48px] max-w-[calc(100%-3rem)] lg:max-w-none mx-auto shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]">
            <div className="flex md:flex-row flex-col items-start gap-8 pb-8 border-b border-white/12">
                <div className="w-full md:flex-[0.45] text-lg font-medium text-surface-0">Subscription Plan</div>
                <div className="w-full md:flex-[0.55] flex gap-2 items-start">
                    <div className="text-surface-0 flex-1">Pro Plan</div>
                    <button className="button-blur h-auto py-1 px-3 text-sm">Change Plan</button>
                </div>
            </div>
            <div className="flex md:flex-row flex-col items-start gap-8 pb-8 border-b border-white/12">
                <div className="w-full md:flex-[0.45] text-lg font-medium text-surface-0">Payment Methods</div>
                <div className="w-full md:flex-[0.55] flex flex-col items-end">
                    <div className="w-full flex gap-2 items-start">
                        <div className="text-surface-0 flex-1">Master Card ** 1089</div>
                        <MasterCard />
                    </div>
                    <button className="mt-4 button-blur h-auto py-1 px-3 text-sm">Change Methods</button>
                </div>
            </div>
            <div className="flex md:flex-row flex-col items-start gap-8 pb-8">
                <div className="w-full md:flex-[0.45] text-lg font-medium text-surface-0">Billing History</div>
                <div className="w-full md:flex-[0.55] flex flex-col gap-4">
                    {Array(5)
                        .fill(null)
                        .map((_, i) => (
                            <div key={i} className="flex flex-wrap gap-2 items-start justify-between">
                                <div className="text-surface-0">03/05/2024 - payment.pdf</div>
                                <button className="button-blur h-auto py-1 px-3 text-sm">
                                    Download
                                    <i className="pi pi-cloud-download leading-none text-base"></i>
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default AccountSubscriptionBillingPage;
