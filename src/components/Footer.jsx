import Image from "next/image";


const Footer=()=>{
    return(
        <div className="py-16 bg-[#fef0e3] px-2">
                <div className="text-center ">
            {/* Logo */}
            <div className="flex items-center justify-center space-x-2 mb-6">
           <Image height={120} width={120} src="/birla.png" />
            </div>
  
            <p className="text-gray-900 mb-4 max-w-2xl mx-auto">
              Birla Opus Prime offers tailored solutions for consultants, contractors, and project owners with over 2300 colors and 150+ painting ideas.
            </p>
            
            <div className="text-red-500  mb-2">
              Location : 159, INDUSTRY HOUSE, CHURCHGATE RECLAMATION,
            </div>
            <div className="text-red-500 mb-4">
              MUMBAI, Mumbai, Maharashtra, 400020
            </div>
            
            <p className="text-gray-800 pt-4">
              Email : <span className="">info@birlaopuspartner.site</span>
            </p>
          </div>
        </div>
    )
}


export default Footer;