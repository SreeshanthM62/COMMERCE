import React from "react";

const About = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero */}
      <section className="bg-pink-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-pink-500 mb-4">
            About Us
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
            Thoughtful Gifts, Made With Care
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-gray-600 leading-7">
            We create and curate handmade products designed to make special
            moments more memorable. From handmade flowers to thoughtful
            gifting accessories, every product is selected with care.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-5">
              Who We Are
            </h2>

            <p className="text-gray-600 leading-7 mb-4">
              Welcome to our store, where creativity, care, and thoughtful
              gifting come together.
            </p>

            <p className="text-gray-600 leading-7 mb-4">
              We offer handmade flowers, bouquets, mini flower pots, keychains,
              flower cards, magnets, and other decorative gifting products.
              Our products are designed for birthdays, celebrations,
              anniversaries, friendship gifts, and everyday moments.
            </p>

            <p className="text-gray-600 leading-7">
              Our goal is to provide attractive and meaningful products while
              keeping the shopping experience simple and convenient.
            </p>
          </div>

          <div className="bg-pink-50 rounded-3xl p-10">
            <h3 className="text-2xl font-semibold text-gray-900 mb-5">
              Our Mission
            </h3>

            <p className="text-gray-600 leading-7">
              Our mission is to make thoughtful gifting simple by offering
              creative handmade products that combine beauty, personalization,
              and affordability.
            </p>
          </div>
        </div>
      </section>

      {/* Business Information */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-10">
            Business Information
          </h2>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Legal / Owner Name
                </p>
                <p className="font-medium text-gray-900">
                  MUDUMALA SREESHANTH
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Email
                </p>
                <a
                  href="mailto:sreeshanth252525@gmail.com"
                  className="font-medium text-pink-600 hover:text-pink-700"
                >
                  sreeshanth252525@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;