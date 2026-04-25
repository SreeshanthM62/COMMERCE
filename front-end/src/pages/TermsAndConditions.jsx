import React from 'react'

const TermsAndConditions = () => {
    return (
        <div>
            <div className="min-h-screen bg-pink-50 p-6">
                <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8">
                    <h1 className="text-3xl font-bold text-pink-600 mb-4">Terms & Conditions</h1>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Use website lawfully.</li>
                        <li>Products subject to availability.</li>
                        <li>Prices in INR (₹).</li>
                        <li>Secure payments only.</li>
                        <li>Content is our property.</li>
                        <li>No liability for indirect damages.</li>
                        <li>Terms may change anytime.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TermsAndConditions
