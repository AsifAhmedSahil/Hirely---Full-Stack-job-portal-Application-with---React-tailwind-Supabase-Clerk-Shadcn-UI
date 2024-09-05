import { Button } from "@/components/ui/button"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Link } from "react-router-dom"
import companies from "@/data/companies.json"
import Autoplay from "embla-carousel-autoplay"


const LandingPage = () => {
  return (
    <main className="flex flex-col py-10 sm:py-20 gap-10 sm:gap-20">
      <section className="text-center">
        <h1 className="flex flex-col items-center justify-center gradient-title text-4xl font-extrabold md:text-6xl lg:text-8xl py-4 tracking-tighter ">Find Your Dream Job {" "} <span>and get Hired</span></h1>

        <p className="text-sm lg:text-xl lg:mt-4 text-gray-300"> 
          Find Thousands Of Job Listing or find the perfect candidates
        </p>
      </section>

      <div className="flex justify-center gap-6">
        <Link to={"/jobs"}><Button variant='blue' size="xl"  >Find Jobs</Button></Link>
        <Link to={"/post-jobs"}><Button variant='destructive' size="xl" >Post a Job</Button></Link>
        
      </div>

      {/* carousel */}
      <Carousel
      plugins={[Autoplay({ delay: 1000})]}
      
      className="w-full py-10"
    >
      <CarouselContent  className="flex gap-6 lg:gap-20 text-center">
        {
          companies.map(({name,id,path}) =>{
            return (
              <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                <img src={path} alt={name} className="h-9 lg:h-14 object-contain" />
              </CarouselItem>
            )
          })
        }
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

    </main>
  )
}

export default LandingPage