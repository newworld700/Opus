import Image from "next/image";


const CoreValues = () => {

    return (
      <div className="bg-white pt-24">
        <div className="max-w-6xl mx-auto px-4">
          {/* Quality Work Section */}
          <div className="text-center mb-16">
            <h2 className="lg:text-5xl text-4xl text-gray-800 mb-8">Quality Work Through Dedication</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
       
              Discovering the core values of Birla Opus was an exciting journey that was led by our stellar leadership team and fuelled by the passion of our dedicated members.
            </p>
          </div>
  
          {/* Core Values */}
          <div className=" flex items-center justify-center">
  <Image width={1000} height={200} src="/pillers.avif" alt="Pillars" />
</div>

  
          {/* Culture Description */}
          <div className="bg-white rounded-2xl  pb-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Culture and Core Values</h3>
            <p className="text-gray-800 leading-relaxed text-sm">
              Through open discussions and debates over two days, we gathered a wealth of ideas and insights. These were thematically analysed, and we then distilled them into 11 key themes. At the same time, the Group Purpose made its debut, playing a huge role in connecting our budding cultural ideas to the larger Group vision. Next, the Leadership Team took charge, narrowing down those 11 themes to the final 5 pillars that define our extraordinary culture: Agility, Care, Courage, Innovation, and Vibrancy. We do not stop there! We provide the industry's first direct painting service. Our promises are backed by 6 strategically located, fully automatic, and state of the art manufactur plants that will take a quantum leap of 40% in additions to current industry capacity.
            </p>
          </div>
  
          {/* Footer */}
      
        </div>
    
      </div>
    );
  };
  
  export default CoreValues;