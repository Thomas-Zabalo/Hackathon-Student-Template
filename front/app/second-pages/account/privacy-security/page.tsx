import React from 'react';

const AccountPrivacySecurityPage = () => {
    return (
        <div className="p-6 md:p-12 flex flex-col gap-10 rounded-2.5xl md:rounded-4xl bg-white/16 backdrop-blur-[48px] max-w-[calc(100%-3rem)] lg:max-w-none mx-auto shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]">
            <div className="flex items-start gap-8 pb-8 border-b border-white/12">
                <div className="flex-[0.45] text-lg font-medium text-surface-0">Account Open to Everyone</div>
                <div className="flex-[0.55] flex gap-2 items-start"></div>
            </div>
            <div className="flex md:flex-row flex-col items-start gap-8 pb-8 border-b border-white/12">
                <div className="md:flex-[0.45] text-lg font-medium text-surface-0">Activity Log</div>
                <div className="md:flex-[0.55] flex flex-col gap-4 w-full">
                    {Array(2)
                        .fill(null)
                        .map((_, i) => (
                            <div key={i} className="flex flex-wrap gap-2 items-start justify-between">
                                <div className="text-surface-0">Profile updated</div>
                                <span className="text-sm text-white/64">03/05/2024 - 11:46 AM</span>
                            </div>
                        ))}
                </div>
            </div>
            <div className="flex md:flex-row flex-col items-start gap-8 pb-8 border-b border-white/12">
                <div className="md:flex-[0.45] text-lg font-medium text-surface-0">Blocked User</div>
                <div className="md:flex-[0.55] flex flex-col gap-4 w-full">
                    {Array(2)
                        .fill(null)
                        .map((_, i) => (
                            <div key={i} className="flex flex-wrap gap-2 items-start justify-between">
                                <div className="text-surface-0">@jenniferlow</div>
                                <button className="button-blur h-auto py-1 px-3 text-sm">Remove</button>
                            </div>
                        ))}
                </div>
            </div>
            <div className="flex md:flex-row flex-col items-start gap-8 pb-8">
                <div className="md:flex-[0.45] text-lg font-medium text-surface-0">Login History</div>
                <div className="md:flex-[0.55] flex flex-col gap-4 w-full">
                    {Array(4)
                        .fill(null)
                        .map((_, i) => (
                            <div key={i} className="flex flex-wrap gap-2 items-start justify-between">
                                <div className="text-surface-0">Login</div>
                                <span className="text-sm text-white/64">03/05/2024 - 11:46 AM</span>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default AccountPrivacySecurityPage;
