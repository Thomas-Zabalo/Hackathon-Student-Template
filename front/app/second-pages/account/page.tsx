import React from 'react';
import GenesisRegularLogo from '@/components/icons/genesis-regular.svg';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
const AccountPage = () => {
    return (
        <div className="p-6 md:p-12 rounded-2.5xl lg:rounded-4xl bg-white/16 backdrop-blur-[48px] max-w-[calc(100%-3rem)] lg:max-w-none mx-auto shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]">
            <div className="pb-10 border-b border-white/12 flex md:flex-row flex-col items-start gap-4">
                <div className="md:flex-[0.45] flex flex-col gap-1">
                    <span className="text-xl font-medium text-surface-0">Your Photo</span>
                    <span className="text-white/64">This will be displayed on your profile.</span>
                </div>
                <div className="md:flex-[0.55] flex items-center gap-4">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/16 shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]">
                        <GenesisRegularLogo />
                    </div>
                    <button className="text-surface-0 hover:text-surface-200">Update</button>
                    <button className="text-red-400 hover:text-red-500">Delete</button>
                </div>
            </div>
            <div className="py-10 border-b border-white/12 flex flex-col gap-10">
                <div className="flex flex-col sm:flex-row gap-2 items-start">
                    <div className="sm:flex-[0.45] text-lg text-surface-0 font-medium">Username</div>
                    <div className="sm:flex-[0.55] w-full">
                        <Input className="w-full px-5 py-3" placeholder="@genesis" />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 items-start">
                    <div className="sm:flex-[0.45] text-lg text-surface-0 font-medium">Email</div>
                    <div className="sm:flex-[0.55] w-full">
                        <Input className="w-full px-5 py-3" placeholder="genesis@gmail.com " />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 items-start">
                    <div className="sm:flex-[0.45] text-lg text-surface-0 font-medium">Bio</div>
                    <div className="sm:flex-[0.55] w-full">
                        <Textarea className="w-full px-5 py-3 rounded-xl sm:rounded-3xl" placeholder="Write bio" />
                    </div>
                </div>
            </div>
            <div className="py-10 border-b border-white/12 flex flex-col gap-10">
                <div className="flex flex-col sm:flex-row gap-2 items-start">
                    <div className="sm:flex-[0.45] text-lg text-surface-0 font-medium">Change Password</div>
                    <div className="sm:flex-[0.55] w-full">
                        <Input className="w-full px-5 py-3" type="password" placeholder="*******" />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 items-start">
                    <div className="sm:flex-[0.45] text-lg text-surface-0 font-medium">Enter Password Again</div>
                    <div className="sm:flex-[0.55] w-full">
                        <Input className="w-full px-5 py-3" type="password" placeholder="*******" />
                    </div>
                </div>
            </div>
            <div className="pt-10 flex justify-end">
                <button className="button-regular px-5 py-3 min-w-40">Save</button>
            </div>
        </div>
    );
};

export default AccountPage;
