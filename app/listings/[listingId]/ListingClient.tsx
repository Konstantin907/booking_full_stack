"use client"

import Container from "@/app/components/Container"
import ListingHead from "@/app/components/listings/ListingHead"
import ListingInfo from "@/app/components/listings/ListingInfo"
import { categories } from "@/app/components/navbar/Categories"
import { SafeListing, SafeUser } from "@/app/types"
import { Reservation } from "@prisma/client"
import { useMemo } from "react"

interface ListingClientProps {
    reservations?: Reservation[]
    listing: SafeListing & {
        user: SafeUser //
    }
    currentUser?: SafeUser | null
}

const ListingClient: React.FC<ListingClientProps> = ({
    reservations,
    listing,
    currentUser,

    

}) => {
    //sada moramo ekstrakovati i kategorije a ona ima 
    //icon 
    const category = useMemo(()=>{
        return categories.find((item) => 
        item.label === listing.category)
    }, [listing.category])
  return (
    <div>
        <Container>
        <div 
        className="
          max-w-screen-lg 
          mx-auto
        "
      >
        <div className="flex flex-col gap-6">
            <ListingHead
                 title={listing.title}
                 imageSrc={listing.imageSrc}
                 locationValue={listing.locationValue}
                 id={listing.id}
                 currentUser={currentUser}
            />
            <div className="
            grid
            grid-cols-1
            md:grid-cols-7
            md:gap-10
            mt-6
            ">
                <ListingInfo
                //ovo dolazi listing. sve iz db
                    user= {listing.user}
                    category= {category}
                    description= {listing.description}
                    roomCount= {listing.roomCount}
                    guestCount= {listing.guestCount}
                    bathroomCount= {listing.bathroomCount}
                    locationValue= {listing.locationValue}
                />
            </div>
        </div>

      </div>

        </Container>
    </div>
  )
}

export default ListingClient
