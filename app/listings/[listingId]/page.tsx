//zapamti nema koriscenja hook-a unutar server 
//komponenti, mozemo koristiti samo akcije

import getCurrentUser from "@/app/actions/getCurrentUser"

import getListingsById from "@/app/actions/getListingById"
import EmptyState from "@/app/components/EmptyState"
import ClientOnly from "@/app/components/navbar/ClientOnly"
import ListingClient from "./ListingClient"

interface IParams {
  listingId?: string
}

const ListingPage = async ({params}: {params: IParams}) => {
const listing = await getListingsById(params)
const currentUser = await getCurrentUser();
 
  if(!listing) {
    return 
      (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
      )
  }

  return (
    <ClientOnly>
        <ListingClient
          listing = {listing}
          currentUser = {currentUser}
        />
      </ClientOnly>
  )
}

export default ListingPage
