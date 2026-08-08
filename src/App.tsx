import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Masters from './components/Masters';
import Gallery from './components/Gallery';
import Booking from './components/Booking';
import Reviews from './components/Reviews';
import InstagramGallery from './components/InstagramGallery';
import Location from './components/Location';
import Footer from './components/Footer';
import MobileBookingBar from './components/MobileBookingBar';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Masters />
        <Gallery />
        <Booking />
        <Reviews />
        <InstagramGallery />
        <Location />
      </main>
      <Footer />
      <MobileBookingBar />
    </>
  );
}
