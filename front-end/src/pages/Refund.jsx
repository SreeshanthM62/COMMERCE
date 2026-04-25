import React from 'react'

const Refund = () => {
    return (
        <div>
            <div className="min-h-screen bg-pink-50 p-6">
                <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8">
                    <h1 className="text-3xl font-bold text-pink-600 mb-4">Refund & Cancellation Policy</h1>

                    <h2 className="font-semibold">Cancellation</h2>
                    <p>Cancel within 12 hours.</p>

                    <h2 className="font-semibold mt-4">Refund</h2>
                    <p>Only for damaged/incorrect items.</p>

                    <h2 className="font-semibold mt-4">Process</h2>
                    <p>5–7 business days.</p>

                    <h2 className="font-semibold mt-4">Non-refundable</h2>
                    <ul className="list-disc pl-5">
                        <li>Used items</li>
                        <li>Custom orders</li>
                    </ul>

                    <p className="mt-4">sreeshanth0526@gmail.com</p>
                </div>
            </div>
        </div>
    )
}

export default Refund
