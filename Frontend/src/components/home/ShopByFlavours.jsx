import React from 'react';

const rawDummyImage = 'https://www.bing.com/images/search?view=detailV2&ccid=Ef84%2fvxH&id=8E32B583D87D6DD5142F47C20BC501A46A4148EB&thid=OIP.Ef84_vxHZD3m_AaZlLc27gHaE8&mediaurl=https%3a%2f%2fjfwonline.com%2fwp-content%2fuploads%2f2017%2f02%2fchoco.jpeg&exph=1067&expw=1600&q=choclate&FORM=IRPRST&ck=8EC482520130D0BA181904811CE9108F&selectedIndex=11&itb=0';
const resolveImageSrc = (url) => {
  try {
    const u = new URL(url);
    const media = u.searchParams.get('mediaurl');
    return media ? decodeURIComponent(media) : url;
  } catch {
    return url;
  }
};
const dummyImage = resolveImageSrc(rawDummyImage);

const flavours = [
  'Chocolate',
  'Coffee',
  'Cookies & Cream',
  'Kesar Pista',
  'Mango',
  'Vanilla',
  'Strawberry Banana',
];

const ShopByFlavours = () => {
  return (
    <section className="w-full bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6">
          <h2 className="text-4xl font-bold tracking-tight">
            <span style={{ color: '#CCFF00' }}>|</span> <span className="text-black">Shop by Flavours</span>
          </h2>
        </div>

        <div className="flex gap-4 justify-between items-center overflow-hidden">
          {flavours.map((name) => (
            <div key={name} className="flex flex-col items-center flex-none">
              <div className="rounded-full bg-gray-100 overflow-hidden flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
                <img
                  src={dummyImage}
                  alt={name}
                  className="object-cover w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-3 text-sm font-semibold text-black text-center">{name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByFlavours;
