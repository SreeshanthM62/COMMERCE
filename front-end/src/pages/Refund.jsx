import React from 'react'

const Refund = () => {
    return (
    <div className="bg-white text-gray-800">

      <section className="bg-pink-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl font-semibold text-gray-900">
            Returns, Refunds & Cancellation
          </h1>

          <p className="mt-4 text-gray-600">
            Please review our policy before placing an order.
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-6 py-14 space-y-10">

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Order Cancellation
          </h2>

          <p className="text-gray-600 leading-7">
            Cancellation requests should be made as soon as possible after
            placing an order. Once an order has entered processing or
            preparation, cancellation may not be possible.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Damaged or Incorrect Products
          </h2>

          <p className="text-gray-600 leading-7">
            If you receive a damaged or incorrect product, please contact us
            with your order details and relevant photographs so that we can
            review the issue and determine the appropriate resolution.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Handmade Products
          </h2>

          <p className="text-gray-600 leading-7">
            Because some products are handmade, minor variations in appearance
            may occur. Such variations are a natural part of handmade
            products and may not be considered defects.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Refunds
          </h2>

          <p className="text-gray-600 leading-7">
            If a refund is approved, the applicable refund amount will be
            processed through the appropriate payment method, subject to the
            circumstances of the order.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Contact Us
          </h2>

          <p className="text-gray-600 leading-7">
            For cancellation, return, or refund requests, contact:
          </p>

          <a
            href="mailto:sreeshanth252525@gmail.com"
            className="inline-block mt-2 text-pink-600"
          >
            sreeshanth252525@gmail.com
          </a>
        </section>

      </main>
    </div>
  );
}

export default Refund
