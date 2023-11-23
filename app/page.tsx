import ClientOnly from "./components/navbar/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import getListings from "./actions/getListings";

import ListingCard from "./components/listings/ListingCard";

import getCurrentUser from "./actions/getCurrentUser";

//posto je server side mozemo bazu odmah da zovemo ne trreba nam api call -- actions folder
export default async function Home() {
  //unosimo listings koji smo napravcvili iz prisme:
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  //ovdje cekiramo ako nema liostinga za to sta ispada:
const isEmpty = true;

if(listings.length === 0) {
  return (
    <ClientOnly>
      <EmptyState showReset />
    </ClientOnly>
  )
}

  return (
    <ClientOnly>
      <Container>
        <div className="
          pt-24
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        ">
           {listings.map((listing) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
    // <div className="text-rose-500 text-2xl">Hello</div>
  )
}
