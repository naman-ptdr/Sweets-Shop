import { Heart, Award, Users, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import heroImage from '@/assets/hero-shop.jpg';

const OurStory = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Our Story"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
        </div>
        
        <div className="container relative z-10 text-center text-white">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            Our Sweet Journey
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
            From a small family kitchen to India's beloved sweet destination - discover the story behind Mithai Mahal
          </p>
        </div>
      </section>

      {/* Story Content */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-gradient">
                Since 1985
              </h2>
              <p className="text-xl text-secondary leading-relaxed">
                A legacy of sweetness that spans generations
              </p>
            </div>

            <div className="space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-6">The Beginning</h3>
                  <p className="text-lg text-secondary leading-relaxed mb-4">
                    It all started in 1985 when our founder, Shri Ramesh Kumar, began making traditional sweets in his small kitchen in Old Delhi. With just a handful of recipes passed down through generations, he had a simple dream - to share the authentic taste of Indian sweets with the world.
                  </p>
                  <p className="text-lg text-secondary leading-relaxed">
                    What began as a small neighborhood sweet shop quickly gained recognition for its exceptional quality and authentic flavors. Word spread, and soon people from across the city were coming to taste our handcrafted delicacies.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold mb-2">Made with Love</h4>
                    <p className="text-secondary">Every sweet crafted with passion and traditional recipes</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold mb-2">Award Winning</h4>
                    <p className="text-secondary">Recognized for excellence in traditional sweet making</p>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <h3 className="text-3xl font-bold mb-6">Growing Recognition</h3>
                  <p className="text-lg text-secondary leading-relaxed mb-4">
                    By the 1990s, Mithai Mahal had become a household name in Delhi. Our commitment to using only the finest ingredients - pure ghee, fresh milk, premium dry fruits, and authentic spices - set us apart from the competition.
                  </p>
                  <p className="text-lg text-secondary leading-relaxed">
                    We received numerous awards for our traditional sweets, including the prestigious "Best Sweet Shop" award from the Delhi Food Association three years in a row.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-6">Modern Innovation</h3>
                  <p className="text-lg text-secondary leading-relaxed mb-4">
                    While staying true to our traditional roots, we embraced modern technology to reach more sweet lovers. In 2020, we launched our online platform, making it possible for people across India to enjoy our authentic sweets.
                  </p>
                  <p className="text-lg text-secondary leading-relaxed">
                    Today, we serve over 10,000 happy customers monthly, with same-day delivery and the same commitment to quality that started it all.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold mb-2">10K+ Customers</h4>
                    <p className="text-secondary">Serving sweet lovers across India with dedication</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Our Values</h2>
            <p className="text-xl text-secondary max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: 'Authenticity',
                description: 'Traditional recipes passed down through generations',
                color: 'from-red-500 to-pink-500'
              },
              {
                icon: Award,
                title: 'Quality',
                description: 'Only the finest ingredients in every sweet we make',
                color: 'from-blue-500 to-indigo-500'
              },
              {
                icon: Users,
                title: 'Family',
                description: 'Treating every customer as part of our extended family',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: Clock,
                title: 'Freshness',
                description: 'Made fresh daily with same-day delivery promise',
                color: 'from-purple-500 to-violet-500'
              }
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="card text-center animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="card-body">
                    <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-secondary leading-relaxed">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Our Journey
            </h2>
            <p className="text-xl text-secondary">
              Key milestones in our sweet journey
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {[
                {
                  year: '1985',
                  title: 'The Beginning',
                  description: 'Started as a small sweet shop in Old Delhi with traditional family recipes.'
                },
                {
                  year: '1995',
                  title: 'First Award',
                  description: 'Received "Best Traditional Sweets" award from Delhi Food Association.'
                },
                {
                  year: '2005',
                  title: 'Expansion',
                  description: 'Opened second location and introduced premium sweet collections.'
                },
                {
                  year: '2015',
                  title: 'Modern Facilities',
                  description: 'Upgraded to state-of-the-art kitchen while maintaining traditional methods.'
                },
                {
                  year: '2020',
                  title: 'Digital Launch',
                  description: 'Launched online platform with same-day delivery across major cities.'
                },
                {
                  year: '2024',
                  title: 'Today',
                  description: 'Serving 10,000+ customers monthly with 50+ varieties of authentic sweets.'
                }
              ].map((milestone, index) => (
                <div key={index} className="flex gap-8 items-center animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">{milestone.year}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{milestone.title}</h3>
                    <p className="text-lg text-secondary leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurStory;