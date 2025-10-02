import ClientParticles from "@/components/ui/particles/ClientParticle";
import {useIsMobile} from "@/utils/useIsMobile";


export default function BlurryParticles(){
    const isMobile = useIsMobile()

    return(
        <div className="fixed -z-10 top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-[#14A3A2] via-[#129190] to-[#107E7D]">
            <ClientParticles
                className="pointer-events-none"
                isMobile={isMobile}
            />
            {/* Blurry mask */}
            {isMobile ?
                <div className="absolute bg-gradient-to-b from-black/25 via-black/15 to-black/25 rounded-2xl -inset-8 pointer-events-none md:backdrop-blur-[1px]"/>
                :
                <div className="absolute bg-black/10 backdrop-blur-[1px] rounded-2xl -inset-8 pointer-events-none sm:backdrop-blur-[2px]"/>
            }
        </div>
    )

}