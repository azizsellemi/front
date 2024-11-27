import React from "react";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

const links = [
  { name: "Link 1", href: "#" },
  { name: "Link 2", href: "#" },
  { name: "Link 3", href: "#" },
  { name: "Link 4", href: "#" },
];

const stats = [
  { name: "Users", value: "100K" },
  { name: "Rides Offered", value: "50K" },
  { name: "Cities Covered", value: "300" },
  { name: "Happy Travelers", value: "99%" },
];

export default function Hero() {
  return (
    <>
      <div
        className="bg-cover bg-center h-screen"
        style={{ backgroundImage: "url('/carride.jpg')" }}
      >
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            {/* Background animation or effect */}
          </div>
          <div className="mx-auto max-w-7xl py-32 sm:py-48 lg:py-20 mt-12 relative rounded-2xl px-3 py-1 text-sm leading-6 text-gray-600 bg-white/50 py-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-blue-900 sm:text-6xl">
                Share more than your ride
              </h1>
              <p className="mt-6 text-lg leading-8 text-black">
                Post or find trips, book your seat, and travel with confidence
                through our trusted community of users.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-y-4">
                <div className="flex gap-x-6">
                  <a
                    href="/Offer"
                    className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
                  >
                    Offer a Ride
                  </a>
                  <a
                    href="/Find"
                    className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-500 shadow-sm hover:bg-white/50"
                  >
                    Find a Ride
                  </a>
                </div>
                <a
                  className="text-indigo-800 hover:underline mt-4 border rounded-full px-3 py-1"
                  href="/Login"
                >
                  Sign in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative isolate overflow-hidden bg-green-500 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              About Our Carpooling App
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Our carpooling app connects travelers looking for shared rides,
              making transportation more affordable, efficient, and
              environmentally friendly.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
              {links.map((link) => (
                <a key={link.name} href={link.href}>
                  {link.name} <span aria-hidden="true">&rarr;</span>
                </a>
              ))}
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.name} className="flex flex-col-reverse">
                  <dt className="text-base leading-7 text-gray-300">{stat.name}</dt>
                  <dd className="text-2xl font-bold leading-9 tracking-tight text-white">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
