import '../styles/Home.css'
import Product from './Product'

function Home() {

  return(
    <div className='home'>
      <div className='home__container'>
        <img
          className='home__image'
          src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg'
          alt='banner'
        />

        <div className='home__row'>
          <Product
            id='12321431'
            title='The lean startup'
            price='29.99'
            image='https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg'
            rating={5}
          />
          <Product
            id='49538094'
            title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with k-beater, Dough Hook and Whisk, 5 Litre Glass Bowl"
            price={239.00}
            rating={4}
            image='https://dam.kenwoodworld.com/562x468/assets/148434'
          />
        </div>

        <div className='home__row'>
          <Product
            id='345643647'
            title='Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcal Fabric'
            price={98.99}
            rating={5}
            image='https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6287/6287974cv13d.jpg'
          />
          <Product
            id='98877899'
            title='New Apple iPad Pro'
            price={700.00}
            rating={3}
            image='https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-select-wifi-silver-202104_FMT_WHH?wid=1945&hei=2000&fmt=jpeg&qlt=95&.v=1617126635000'
          />
          <Product
            id='4534634636346'
            title='Xbox One'
            price={400.00}
            rating={4}
            image='https://media.gamestop.com/i/gamestop/10115705/Microsoft-Xbox-One-500GB-Console-Black-with-Original-Controller?$pdp$'

          />
        </div>

        <div className='home__row'>
          <Product
            id='8675309'
            title='Glass Dildo'
            price={50}
            rating={1}
            image='https://www.adameve.com/cms/image/540566-581196-0x0.jpg'
          />
        </div>

      </div>
    </div>
  )
}

export default Home;
