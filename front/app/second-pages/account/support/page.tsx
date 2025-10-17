import { Input } from '@/components/ui/input';
import React from 'react';

const AccountSupportPage = () => {
    return (
        <div className="p-6 md:p-10  rounded-2.5xl md:rounded-4xl bg-white/16 backdrop-blur-[48px] max-w-[calc(100%-3rem)] lg:max-w-none mx-auto shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]">
            <h1 className="text-3xl md:text-5xl font-medium text-surface-0 text-center max-w-lg leading-tight mx-auto">Advice and answers from the Genesis Team</h1>
            <p className="text-white/64 mt-3.5 text-center">Get valuable advice and expert answers directly from the Genesis team.</p>
            <div className="mt-8 mx-auto w-full max-w-xs">
                <Input type="search" placeholder="Search" className="w-full" />
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
                {accountSupportData.map((item, index) => (
                    <div key={index} className="px-4 pb-4 pt-3 rounded-2xl md:rounded-4xl bg-white/16 backdrop-blur-[48px] shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]">
                        <div className="p-4 flex items-center gap-3 text-surface-0 border-b border-white/24">
                            <i className={item.icon + ' text-lg'}></i>
                            <span className="text-xl font-medium">{item.title}</span>
                        </div>
                        <ul className="mt-4 p-4 flex flex-col gap-5">
                            {item.includes.map((inc, k) => (
                                <li key={k} className="text-white/64 flex items-center gap-2">
                                    <i className="pi pi-info-circle"></i>
                                    <span>{inc}</span>
                                </li>
                            ))}
                        </ul>
                        <button className="mt-4 px-5 py-4 w-full text-surface-0 flex items-center justify-between gap-2 rounded-full bg-white/16 hover:bg-white/20 transition-all backdrop-blur-[48px] shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]">
                            <span className="font-semibold">View all</span>
                            <i className="pi pi-arrow-right"></i>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AccountSupportPage;

const accountSupportData = [
    {
        title: 'Billing',
        icon: 'pi pi-money-bill',
        includes: ['View your invoices', 'Update payment methods', 'Manage billing cycles', 'Access billing history', 'Resolve payment issues'],
        to: ''
    },
    {
        title: 'Getting Started',
        icon: 'pi pi-power-off',
        includes: ['Create your first account', 'Navigate the dashboard', 'Set up user preferences', 'Explore key features', 'Get help with onboarding'],
        to: ''
    },
    {
        title: 'Integrations',
        icon: 'pi pi-database',
        includes: ['Connect third-party apps', 'Manage API keys', 'Sync data with tools', 'Set up webhooks', 'Resolve integration issues'],
        to: ''
    },
    {
        title: 'Transactions',
        icon: 'pi pi-arrows-h',
        includes: ['Track recent transactions', 'View transaction history', 'Dispute a charge', 'Export transaction data', 'Filter transactions by date'],
        to: ''
    },
    {
        title: 'Security',
        icon: 'pi pi-shield',
        includes: ['Enable two-factor authentication', 'Reset your password', 'Review security logs', 'Manage authorized devices', 'Learn about security updates'],
        to: ''
    },
    {
        title: 'Profile',
        icon: 'pi pi-user',
        includes: ['Update your profile info', 'Change your avatar', 'Manage email preferences', 'Set account visibility', 'Customize notifications'],
        to: ''
    }
];
