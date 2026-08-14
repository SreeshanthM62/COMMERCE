import React from "react";

const Contact = () => {
  return (
    <div className="bg-white text-gray-800">

      {/* Header */}
      <section className="bg-pink-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-pink-500 mb-4">
            Contact Us
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
            We'd Love to Hear From You
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-gray-600 leading-7">
            Have a question about a product or your order? Get in touch with
            us and we'll be happy to help.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="max-w-5xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-3 gap-6">

          {/* Email */}
          <div className="border border-gray-100 rounded-2xl p-7 text-center shadow-sm">
            <div className="w-12 h-12 mx-auto rounded-full bg-pink-50 flex items-center justify-center text-pink-500 text-xl">
              ✉
            </div>

            <h3 className="font-semibold text-lg mt-5">
              Email
            </h3>

            <a
              href="mailto:sreeshanth252525@gmail.com"
              className="text-sm text-gray-600 mt-2 block hover:text-pink-600"
            >
              sreeshanth252525@gmail.com
            </a>
          </div>

          {/* Phone */}
          <div className="border border-gray-100 rounded-2xl p-7 text-center shadow-sm">
            <div className="w-12 h-12 mx-auto rounded-full bg-pink-50 flex items-center justify-center text-pink-500 text-xl">
              ☎
            </div>

            <h3 className="font-semibold text-lg mt-5">
              Phone
            </h3>

            <p className="text-sm text-gray-600 mt-2">
              7993079650
            </p>
          </div>

          {/* Hours */}
          <div className="border border-gray-100 rounded-2xl p-7 text-center shadow-sm">
            <div className="w-12 h-12 mx-auto rounded-full bg-pink-50 flex items-center justify-center text-pink-500 text-xl">
              ◷
            </div>

            <h3 className="font-semibold text-lg mt-5">
              Support Hours
            </h3>

            <p className="text-sm text-gray-600 mt-2">
              Monday – Saturday
              <br />
              10:00 AM – 6:00 PM
            </p>
          </div>

        </div>

        {/* Business Details */}
        <div className="mt-12 bg-gray-50 rounded-3xl p-8 md:p-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Business Details
          </h2>

          <div className="space-y-4 text-gray-600">
            <p>
              <span className="font-medium text-gray-900">
                Legal / Owner Name:
              </span>{" "}
              MUDUMALA SREESHANTH
            </p>

            <p>
              <span className="font-medium text-gray-900">
                Email:
              </span>{" "}
              sreeshanth252525@gmail.com
            </p>
          </div>
        </div>

      </section>
    </div>
  );
};

export default Contact;