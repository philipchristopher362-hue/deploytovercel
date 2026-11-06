"use client"
import { db } from '@/config/db';
import { Users } from '@/config/schema';
import React, { useContext, useEffect, useState } from 'react'
import { UserDetailContext } from '../_context/UserDetailConext';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useUser } from '@clerk/nextjs';
import Script from 'next/script';

const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!;

function BuyCredits() {
    const Options = [
        { id: 1, price: 2000, credits: 10 },
        { id: 2, price: 3000, credits: 30 },
        { id: 3, price: 6000, credits: 75 },
        { id: 4, price: 10000, credits: 150 },
    ];

    const [selectedOption, setSelectedOption] = useState<number>(0);
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const { user } = useUser();
    const router = useRouter();
    const notify = (msg: string) => toast(msg);
    const notifyError = (msg: string) => toast.error(msg);

    const selectedPlan = Options.find(o => o.id === selectedOption);

    const onPaymentSuccess = async () => {
        if (!selectedPlan) return;
        const newCredits = selectedPlan.credits + (userDetail?.credit ?? 0);
        const result = await db.update(Users)
            .set({ credit: newCredits })
            .where(eq(Users.userEmail, userDetail.userEmail));

        if (result) {
            notify('Credits added successfully!');
            setUserDetail((prev: any) => ({ ...prev, credit: newCredits }));
            router.replace('/dashboard');
        } else {
            notifyError('Server error, please try again');
        }
    };

    const handlePaystack = () => {
        if (!selectedPlan) {
            notifyError('Please select a credit package first');
            return;
        }

        const email = user?.primaryEmailAddress?.emailAddress;
        if (!email) {
            notifyError('User email not found');
            return;
        }

        // @ts-ignore — PaystackPop is loaded via CDN script
        const handler = PaystackPop.setup({
            key: PAYSTACK_PUBLIC_KEY,
            email,
            amount: selectedPlan.price * 100, // Paystack expects amount in kobo
            currency: 'NGN',
            ref: `kidso_${Date.now()}`,
            callback: (response: any) => {
                console.log('Paystack success:', response);
                onPaymentSuccess();
            },
            onClose: () => {
                notifyError('Payment cancelled');
            },
        });

        handler.openIframe();
    };

    return (
        <>
            {/* Load Paystack inline JS */}
            <Script src="https://js.paystack.co/v1/inline.js" strategy="beforeInteractive" />

            <div className='min-h-screen p-6 md:p-10 md:px-20 lg:px-40 text-center'>
                <h2 className='text-3xl md:text-4xl font-bold text-primary'>Add More Credits</h2>

                <div className='grid grid-cols-1 md:grid-cols-2 mt-8 md:mt-10 gap-8 md:gap-10 items-start justify-center'>
                    {/* Credit packages */}
                    <div>
                        {Options.map((option) => (
                            <div
                                key={option.id}
                                className={`p-4 md:p-6 my-3 border text-center rounded-lg text-white cursor-pointer
                                hover:scale-105 transition-all
                                ${selectedOption === option.id ? 'bg-black' : 'bg-primary'}`}
                                onClick={() => setSelectedOption(option.id)}
                            >
                                <h2 className='text-base md:text-lg'>Get {option.credits} Credits = {option.credits} {option.credits === 1 ? 'Story' : 'Stories'}</h2>
                                <h2 className='font-bold text-xl md:text-2xl'>&#8358;{option.price.toLocaleString()}</h2>
                            </div>
                        ))}
                    </div>

                    {/* Pay button */}
                    <div className='flex flex-col items-center justify-center gap-6 mt-2 md:mt-4'>
                        {selectedPlan && (
                            <div className='bg-slate-50 border rounded-xl p-6 w-full max-w-sm text-left'>
                                <h3 className='text-lg font-semibold text-primary mb-2'>Order Summary</h3>
                                <p className='text-gray-600'>{selectedPlan.credits} Credits</p>
                                <p className='text-2xl font-bold text-primary mt-1'>&#8358;{selectedPlan.price.toLocaleString()}</p>
                            </div>
                        )}
                        <button
                            onClick={handlePaystack}
                            disabled={!selectedPlan}
                            className={`w-full max-w-sm py-4 rounded-xl text-white font-bold text-lg transition-all
                            ${selectedPlan
                                ? 'bg-primary hover:scale-105 cursor-pointer'
                                : 'bg-gray-300 cursor-not-allowed'}`}
                        >
                            {selectedPlan
                                ? `Pay ₦${selectedPlan.price.toLocaleString()}`
                                : 'Select a Package'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BuyCredits;
